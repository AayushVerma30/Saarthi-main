import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building2,
  Video,
  Layers,
  ChevronRight
} from 'lucide-react';
import { adminStore, EventRecord, EventCategory, EventDeliveryMode } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EVENT_CATEGORIES: EventCategory[] = [
  'Alumni Reunion',
  'Technical Symposium',
  'Career Fair & Placement',
  'Industry Leadership Panel',
  'Distinguished Alumni Lecture',
  'Mentorship Round Table'
];

export const AdminEventsView: React.FC = () => {
  const [events, setEvents] = useState<EventRecord[]>(adminStore.getEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | EventCategory>('All');
  const [modeFilter, setModeFilter] = useState<'All' | EventDeliveryMode>('All');

  // Add Event Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Alumni Reunion' as EventCategory,
    date: '2026-11-15',
    time: '10:00 AM - 04:00 PM IST',
    venue: 'Sir M. Visvesvaraya Auditorium',
    deliveryMode: 'On-Campus' as EventDeliveryMode,
    capacity: 500,
    status: 'Scheduled' as 'Scheduled' | 'Completed' | 'Draft',
    description: '',
    organizer: 'Institutional Alumni Secretariat',
  });

  // Edit Event Modal
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setEvents(adminStore.getEvents());
    });
  }, []);

  const totalAttendees = events.reduce((acc, curr) => acc + curr.registeredAttendees, 0);
  const totalCapacity = events.reduce((acc, curr) => acc + curr.capacity, 0);
  const overallOccupancy = totalCapacity > 0 ? Math.round((totalAttendees / totalCapacity) * 100) : 0;

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || ev.category === categoryFilter;
    const matchesMode = modeFilter === 'All' || ev.deliveryMode === modeFilter;
    return matchesSearch && matchesCat && matchesMode;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    adminStore.addEvent(newEvent);
    setIsAddModalOpen(false);
    setNewEvent({
      title: '',
      category: 'Alumni Reunion',
      date: '2026-11-15',
      time: '10:00 AM - 04:00 PM IST',
      venue: 'Sir M. Visvesvaraya Auditorium',
      deliveryMode: 'On-Campus',
      capacity: 500,
      status: 'Scheduled',
      description: '',
      organizer: 'Institutional Alumni Secretariat',
    });
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    adminStore.updateEvent(editingEvent.id, editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove event "${title}"?`)) {
      adminStore.deleteEvent(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-brand-btn" />
            Institutional Event Secretariat
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Coordinate alumni reunions, university job fairs, guest lectures, and student networking symposiums.
          </p>
        </div>

        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-deep hover:bg-brand-btn text-white rounded-xl shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Institutional Event
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Scheduled Events
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{events.length}</div>
          <p className="text-xs text-slate-400 mt-1">Across all formats and faculties</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Confirmed Attendees
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{totalAttendees}</div>
          <p className="text-xs text-slate-400 mt-1">RSVP registrations logged</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average Venue Capacity Fill
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{overallOccupancy}%</div>
          <p className="text-xs text-slate-400 mt-1">{totalAttendees} of {totalCapacity} aggregate seats</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search event title, venue or agenda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50/70 border-slate-200 rounded-xl text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value as any)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 focus:outline-none"
          >
            <option value="All">All Formats</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Virtual">Virtual</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => {
          const occupancyRate = ev.capacity > 0 ? Math.round((ev.registeredAttendees / ev.capacity) * 100) : 0;
          return (
            <div 
              key={ev.id} 
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-btn bg-brand-surface px-2.5 py-1 rounded-md">
                      {ev.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 leading-snug">{ev.title}</h3>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                    ev.deliveryMode === 'On-Campus' ? 'bg-emerald-50 text-emerald-800' :
                    ev.deliveryMode === 'Virtual' ? 'bg-blue-50 text-blue-800' :
                    'bg-purple-50 text-purple-800'
                  }`}>
                    {ev.deliveryMode}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {ev.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-btn shrink-0" />
                    <span className="font-semibold text-slate-800">{ev.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{ev.venue}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-500">Organized by {ev.organizer}</span>
                  </div>
                </div>

                {/* Registration & Occupancy Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Registrations</span>
                    <span className="font-semibold text-slate-800">
                      {ev.registeredAttendees} / {ev.capacity} ({occupancyRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-brand-btn h-full rounded-full transition-all"
                      style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">ID: {ev.id}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingEvent(ev)}
                    className="h-8 text-xs border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg px-3"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteEvent(ev.id, ev.title)}
                    className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-lg px-3"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                  </Button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500 space-y-2">
            <Calendar className="w-10 h-10 mx-auto text-slate-400" />
            <h4 className="text-base font-bold text-slate-800">No events found</h4>
            <p className="text-xs text-slate-400">Try changing search keywords or category filters.</p>
          </div>
        )}
      </div>

      {/* Schedule Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Schedule Institutional Event</h3>
                <p className="text-xs text-slate-500 mt-0.5">Post an official alumni or academic event</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                <Input 
                  required 
                  placeholder="e.g. Annual Alumni Convocation Dinner 2026"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventCategory })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    {EVENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Format</label>
                  <select 
                    value={newEvent.deliveryMode}
                    onChange={(e) => setNewEvent({ ...newEvent, deliveryMode: e.target.value as EventDeliveryMode })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    <option value="On-Campus">On-Campus</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <Input 
                    type="date"
                    required 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Range</label>
                  <Input 
                    required 
                    placeholder="10:00 AM - 04:00 PM IST"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Seat Capacity</label>
                  <Input 
                    type="number"
                    required 
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Venue / Physical Location</label>
                  <Input 
                    required 
                    placeholder="Sir M. Visvesvaraya Auditorium, Campus East"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organizing Body / Cell</label>
                  <Input 
                    required 
                    placeholder="e.g. Office of Alumni Relations"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description & Agenda</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Outline the symposium objective, keynote speakers, and session schedule..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-glow/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-brand-deep hover:bg-brand-btn text-white"
                >
                  Publish Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Edit Event</h3>
                <p className="text-xs text-slate-500 mt-0.5">Modifying {editingEvent.title}</p>
              </div>
              <button 
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                <Input 
                  required 
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as EventCategory })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    {EVENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Format</label>
                  <select 
                    value={editingEvent.deliveryMode}
                    onChange={(e) => setEditingEvent({ ...editingEvent, deliveryMode: e.target.value as EventDeliveryMode })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    <option value="On-Campus">On-Campus</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <Input 
                    type="date"
                    required 
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
                  <Input 
                    required 
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity</label>
                  <Input 
                    type="number"
                    required 
                    value={editingEvent.capacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, capacity: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venue</label>
                <Input 
                  required 
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-glow/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-brand-deep hover:bg-brand-btn text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
