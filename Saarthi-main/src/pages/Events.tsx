import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Video, 
  Building2, 
  Layers, 
  BookmarkCheck,
  X,
  Share2
} from 'lucide-react';
import { adminStore, EventRecord, EventCategory, EventDeliveryMode } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Alumni Reunion',
  'Technical Symposium',
  'Career Fair & Placement',
  'Industry Leadership Panel',
  'Distinguished Alumni Lecture',
  'Mentorship Round Table'
];

export default function EventsPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [events, setEvents] = useState<EventRecord[]>(adminStore.getEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | EventCategory>('All');
  const [modeFilter, setModeFilter] = useState<'All' | EventDeliveryMode>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'registered'>('all');

  // New Event Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Alumni Reunion' as EventCategory,
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM - 02:00 PM IST',
    venue: 'Main Academic Campus Lawn',
    deliveryMode: 'On-Campus' as EventDeliveryMode,
    capacity: 250,
    status: 'Scheduled' as 'Scheduled' | 'Completed' | 'Draft',
    description: '',
    organizer: currentUser.fullName || 'Alumni Chapter Council',
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setEvents(adminStore.getEvents());
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleRSVP = (event: EventRecord) => {
    const isRegistered = adminStore.isRegisteredForEvent(event.id, currentUser.id);
    if (isRegistered) {
      adminStore.unregisterFromEvent(event.id, currentUser.id);
      showToast(`You have cancelled your registration for "${event.title}".`);
    } else {
      adminStore.registerForEvent(event.id, currentUser);
      showToast(`Success! You are now registered for "${event.title}".`);
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date) return;

    adminStore.addEvent({
      ...newEvent,
      organizer: newEvent.organizer || currentUser.fullName,
    });

    setIsModalOpen(false);
    setNewEvent({
      title: '',
      category: 'Alumni Reunion',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM - 02:00 PM IST',
      venue: 'Main Academic Campus Lawn',
      deliveryMode: 'On-Campus',
      capacity: 250,
      status: 'Scheduled',
      description: '',
      organizer: currentUser.fullName || 'Alumni Chapter Council',
    });
    showToast('Event created and published to institutional schedule!');
  };

  const registeredEvents = events.filter((ev) => 
    adminStore.isRegisteredForEvent(ev.id, currentUser.id)
  );

  const displayedList = activeTab === 'registered' ? registeredEvents : events;

  const filteredEvents = displayedList.filter((ev) => {
    const matchesSearch = 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesMode = modeFilter === 'All' || ev.deliveryMode === modeFilter;
    return matchesSearch && matchesCat && matchesMode;
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041D14] text-white border border-[#F5C347] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#B8E986] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-[#0a3324] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100">
              Campus Calendar & Meetups
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Synced with Institutional Storage
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Institutional Events & Reunions
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Participate in alumni reunions, tech symposiums, placement drives, and round tables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[#0a3324] hover:bg-[#124935] text-white px-5 py-2.5 shadow-md flex items-center gap-2 font-semibold"
          >
            <Plus className="w-4 h-4 text-[#F5C347]" /> Host an Event
          </Button>
        </div>
      </div>

      {/* CONTROLS: TABS & SEARCH */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* View Mode Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'registered'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              My Registered ({registeredEvents.length})
            </button>
          </div>

          {/* Search & Delivery Mode */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search events, venues, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 rounded-full text-sm"
              />
            </div>

            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as any)}
              className="px-3.5 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto"
            >
              <option value="All">All Delivery Modes</option>
              <option value="On-Campus">On-Campus</option>
              <option value="Virtual">Virtual Stream</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a3324] text-[#FAF7EE] shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-center px-4">
          <Calendar className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No events found</h3>
          <p className="text-slate-500 text-sm max-w-md mt-1">
            {activeTab === 'registered' 
              ? 'You have not registered for any events yet. Browse "All Events" and reserve your spot!' 
              : 'Try adjusting your search criteria or host the first event for your alumni cohort.'}
          </p>
          {activeTab === 'registered' && (
            <Button 
              onClick={() => setActiveTab('all')} 
              className="mt-4 rounded-full bg-[#0a3324] text-white font-semibold text-xs"
            >
              Browse All Events
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const isRegistered = adminStore.isRegisteredForEvent(evt.id, currentUser.id);
            const spotsRemaining = Math.max(0, evt.capacity - evt.registeredAttendees);
            const isAlmostFull = spotsRemaining <= 30 && spotsRemaining > 0;
            const isFull = spotsRemaining === 0;

            return (
              <div 
                key={evt.id} 
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Mode & Category Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[0.72rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {evt.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                      {evt.deliveryMode === 'Virtual' ? (
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                      ) : evt.deliveryMode === 'Hybrid' ? (
                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                      ) : (
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>{evt.deliveryMode}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors line-clamp-2">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Details Section */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-semibold">{evt.date}</span>
                    <span className="text-slate-400">•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-800">{evt.registeredAttendees}</span>
                      <span>/ {evt.capacity} attendees</span>
                    </div>

                    {isAlmostFull && (
                      <span className="text-[0.68rem] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Only {spotsRemaining} spots left!
                      </span>
                    )}
                    {isFull && (
                      <span className="text-[0.68rem] text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        At Capacity
                      </span>
                    )}
                  </div>

                  {/* Organizer Footer */}
                  <div className="text-[0.72rem] text-slate-400 mt-1">
                    Organized by: <span className="font-medium text-slate-600">{evt.organizer}</span>
                  </div>

                  {/* RSVP Action */}
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      onClick={() => handleToggleRSVP(evt)}
                      disabled={!isRegistered && isFull}
                      className={`flex-1 rounded-full font-bold text-sm py-2.5 transition-all shadow-sm ${
                        isRegistered
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#0a3324] hover:bg-[#154e38] text-white'
                      }`}
                    >
                      {isRegistered ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Registered (Click to Cancel)
                        </span>
                      ) : isFull ? (
                        'Event Full'
                      ) : (
                        'RSVP & Reserve Seat'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* HOST / PROPOSE EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xl font-bold text-slate-900">Host an Institutional Event</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                <Input 
                  placeholder="e.g. 2018 Batch Reunion & Career Networking Dinner"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Mode</label>
                  <select
                    value={newEvent.deliveryMode}
                    onChange={(e) => setNewEvent({ ...newEvent, deliveryMode: e.target.value as EventDeliveryMode })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="On-Campus">On-Campus</option>
                    <option value="Virtual">Virtual Stream</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                  <Input 
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time & Timezone</label>
                  <Input 
                    placeholder="10:00 AM - 04:00 PM IST"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Venue / Platform Link</label>
                  <Input 
                    placeholder="e.g. Auditorium 1 or Zoom Link"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Capacity</label>
                  <Input 
                    type="number"
                    min="10"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value, 10) || 100 })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Host / Organizing Entity</label>
                <Input 
                  placeholder="e.g. CSE Alumni Chapter or Student Council"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Agenda</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the objective, key speakers, schedule, and who should attend..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full px-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#154e38] text-white px-6 font-semibold"
                >
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
