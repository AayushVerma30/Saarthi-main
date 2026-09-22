import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Briefcase, 
  GraduationCap, 
  X, 
  UserCheck, 
  Send,
  AlertCircle
} from 'lucide-react';
import { adminStore, Mentor, MentorshipRequest } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MentorshipPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [mentors, setMentors] = useState<Mentor[]>(adminStore.getMentors());
  const [requests, setRequests] = useState<MentorshipRequest[]>(adminStore.getMentorshipRequests());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'my-requests' | 'incoming'>('browse');

  // Request Modal State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestTopic, setRequestTopic] = useState('Career Roadmap & Interview Prep');
  const [requestMessage, setRequestMessage] = useState('');

  // Become a Mentor Modal State (For Alumni)
  const [isBecomeMentorOpen, setIsBecomeMentorOpen] = useState(false);
  const [mentorForm, setMentorForm] = useState({
    role: currentUser.designationOrDegree || 'Senior Engineer',
    company: currentUser.organizationOrCampus || 'Tech Innovators',
    expertise: 'System Architecture, Resume Review, Career Planning',
    bio: currentUser.bio || 'Passionate alumnus eager to guide institutional juniors.',
    availableSlots: 3,
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setMentors(adminStore.getMentors());
      setRequests(adminStore.getMentorshipRequests());
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !requestMessage.trim()) return;

    adminStore.requestMentorship({
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      studentId: currentUser.id,
      studentName: currentUser.fullName,
      studentEmail: currentUser.email,
      topic: requestTopic,
      message: requestMessage.trim(),
    });

    setSelectedMentor(null);
    setRequestMessage('');
    showToast(`Mentorship request submitted to ${selectedMentor.name}!`);
    setActiveTab('my-requests');
  };

  const handleBecomeMentor = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.addMentor({
      userId: currentUser.id,
      name: currentUser.fullName,
      email: currentUser.email,
      role: mentorForm.role,
      company: mentorForm.company,
      expertise: mentorForm.expertise,
      department: currentUser.department || 'Engineering',
      batch: currentUser.batch || 2020,
      bio: mentorForm.bio,
      availableSlots: mentorForm.availableSlots,
    });

    setIsBecomeMentorOpen(false);
    showToast('You are now listed in the Institutional Mentors Directory!');
  };

  const handleUpdateStatus = (requestId: string, status: 'Accepted' | 'Declined') => {
    const note = status === 'Accepted' 
      ? 'Looking forward to our first session! Reach me via email to set up a Google Meet.'
      : 'Currently at full mentee capacity for this quarter. Wishing you all the best!';
    adminStore.updateMentorshipStatus(requestId, status, note);
    showToast(`Mentorship inquiry ${status.toLowerCase()}!`);
  };

  const mySentRequests = requests.filter(
    (r) => r.studentId === currentUser.id || r.studentEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const incomingRequests = requests.filter(
    (r) => r.mentorName.toLowerCase() === currentUser.fullName.toLowerCase() || currentUser.role === 'admin'
  );

  const filteredMentors = mentors.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.expertise.toLowerCase().includes(q)
    );
  });

  const isAlumni = currentUser.role === 'alumni' || currentUser.role === 'admin';

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041D14] text-white border border-[#F5C347] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#B8E986] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-[#0a3324] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100">
              1-on-1 Guidance Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Persistent Institutional Mentorship Hub
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Institutional Mentorship Network
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Bridge academic ambitions with industry leadership through direct alumni guidance.
          </p>
        </div>

        {isAlumni && (
          <Button
            onClick={() => setIsBecomeMentorOpen(true)}
            className="rounded-full bg-[#0a3324] hover:bg-[#124935] text-white px-5 py-2.5 shadow-md flex items-center gap-2 font-semibold"
          >
            <UserCheck className="w-4 h-4 text-[#F5C347]" /> Offer Mentorship
          </Button>
        )}
      </div>

      {/* TABS & SEARCH */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Browse Mentors ({mentors.length})
          </button>
          
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my-requests'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            My Requests ({mySentRequests.length})
          </button>

          {isAlumni && (
            <button
              onClick={() => setActiveTab('incoming')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'incoming'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Incoming Inquiries ({incomingRequests.length})
            </button>
          )}
        </div>

        {activeTab === 'browse' && (
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by expertise, company, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 rounded-full text-sm"
            />
          </div>
        )}
      </div>

      {/* TAB 1: BROWSE MENTORS */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div 
              key={mentor.id} 
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-[#F5C347] flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-lg">{mentor.name}</h3>
                    <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {mentor.role} at {mentor.company}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      Class of {mentor.batch} • {mentor.department}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {mentor.expertise.split(',').map((skill, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  ⚡ <strong className="text-slate-800">{mentor.availableSlots}</strong> slots remaining
                </span>
                
                <Button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white text-xs px-5 py-2 font-semibold shadow-sm"
                >
                  Request Mentorship ↗
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MY SENT REQUESTS */}
      {activeTab === 'my-requests' && (
        <div className="flex flex-col gap-4">
          {mySentRequests.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-6">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No mentorship requests sent yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Browse our alumni mentors directory and send your first guidance request!
              </p>
              <Button 
                onClick={() => setActiveTab('browse')}
                className="mt-4 rounded-full bg-[#0a3324] text-white text-xs font-semibold"
              >
                Browse Mentors
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySentRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-500">
                        Mentor: <strong className="text-slate-900">{req.mentorName}</strong>
                      </span>
                      <span className={`text-[0.7rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        req.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : req.status === 'Declined'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-1">{req.topic}</h4>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-2xl italic">
                      "{req.message}"
                    </p>

                    {req.reviewerNotes && (
                      <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <strong>Mentor Response:</strong> {req.reviewerNotes}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Submitted on: {req.createdAt}</span>
                    <span>Saarthi Mentorship System</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INCOMING INQUIRIES (For Mentors / Alumni) */}
      {activeTab === 'incoming' && (
        <div className="flex flex-col gap-4">
          {incomingRequests.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-6">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No pending mentee inquiries</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                When students request guidance on your listed topics, their requests will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomingRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{req.studentName}</h4>
                        <span className="text-xs text-slate-500">{req.studentEmail}</span>
                      </div>
                      <span className={`text-[0.7rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        req.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Declined'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-emerald-800 mb-1 mt-2">
                      Topic: {req.topic}
                    </div>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-2xl leading-relaxed">
                      "{req.message}"
                    </p>
                  </div>

                  {req.status === 'Pending' ? (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <Button
                        onClick={() => handleUpdateStatus(req.id, 'Accepted')}
                        className="flex-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2"
                      >
                        Accept Request
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStatus(req.id, 'Declined')}
                        className="flex-1 rounded-full border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold py-2"
                      >
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      Status updated to <strong className="text-slate-800">{req.status}</strong>.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REQUEST MENTORSHIP DIALOG */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Request Mentorship</h3>
                <p className="text-xs text-slate-500">with {selectedMentor.name} ({selectedMentor.role})</p>
              </div>
              <button 
                onClick={() => setSelectedMentor(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Focus Area / Topic *</label>
                <Input
                  value={requestTopic}
                  onChange={(e) => setRequestTopic(e.target.value)}
                  placeholder="e.g. System Design Mock Interview or Career Roadmap"
                  required
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Introduction & Goals *</label>
                <textarea
                  rows={4}
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Introduce yourself, your current academic year, and specific questions or milestones you need guidance with..."
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedMentor(null)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BECOME A MENTOR MODAL */}
      {isBecomeMentorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Offer Mentorship</h3>
                <p className="text-xs text-slate-500">Join the verified institutional mentor roster</p>
              </div>
              <button 
                onClick={() => setIsBecomeMentorOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBecomeMentor} className="mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Role</label>
                  <Input
                    value={mentorForm.role}
                    onChange={(e) => setMentorForm({ ...mentorForm, role: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                  <Input
                    value={mentorForm.company}
                    onChange={(e) => setMentorForm({ ...mentorForm, company: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Areas of Expertise (comma-separated)</label>
                <Input
                  value={mentorForm.expertise}
                  onChange={(e) => setMentorForm({ ...mentorForm, expertise: e.target.value })}
                  placeholder="System Design, APM prep, Cloud, Career Growth"
                  required
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio & Mentoring Philosophy</label>
                <textarea
                  rows={3}
                  value={mentorForm.bio}
                  onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })}
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Available Mentee Slots</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={mentorForm.availableSlots}
                  onChange={(e) => setMentorForm({ ...mentorForm, availableSlots: parseInt(e.target.value, 10) || 3 })}
                  className="rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsBecomeMentorOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Save & Publish Roster
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
