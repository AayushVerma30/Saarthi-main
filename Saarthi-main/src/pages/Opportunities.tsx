import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle2, 
  X, 
  FileText, 
  Send,
  DollarSign
} from 'lucide-react';
import { adminStore, Opportunity, JobApplication } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JOB_TYPES = ['All', 'Full-time', 'Internship', 'Part-time', 'Remote'] as const;

export default function OpportunitiesPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [opportunities, setOpportunities] = useState<Opportunity[]>(adminStore.getOpportunities());
  const [applications, setApplications] = useState<JobApplication[]>(adminStore.getJobApplications());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'browse' | 'applications'>('browse');

  // Apply Modal State
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [resumeUrl, setResumeUrl] = useState('https://linkedin.com/in/' + (currentUser.fullName.toLowerCase().replace(/\s+/g, '') || 'applicant'));
  const [coverNote, setCoverNote] = useState('');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');

  // Post Opportunity Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newOpp, setNewOpp] = useState({
    title: '',
    company: currentUser.organizationOrCampus || 'Institutional Partner',
    location: currentUser.city || 'Bengaluru',
    type: 'Full-time' as 'Full-time' | 'Internship' | 'Part-time' | 'Remote',
    stipendOrSalary: '₹10 - 14 LPA',
    description: '',
    requirements: '',
    applyLinkOrEmail: currentUser.email,
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setOpportunities(adminStore.getOpportunities());
      setApplications(adminStore.getJobApplications());
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    adminStore.applyForJob({
      opportunityId: selectedOpp.id,
      jobTitle: selectedOpp.title,
      company: selectedOpp.company,
      applicantId: currentUser.id,
      applicantName: currentUser.fullName,
      applicantEmail: currentUser.email,
      applicantPhone: phone,
      resumeUrlOrText: resumeUrl,
      coverNote: coverNote.trim(),
    });

    setSelectedOpp(null);
    setCoverNote('');
    showToast(`Application submitted successfully for ${selectedOpp.title}!`);
    setActiveTab('applications');
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpp.title.trim() || !newOpp.company.trim()) return;

    adminStore.addOpportunity({
      ...newOpp,
      postedBy: `${currentUser.fullName} (${currentUser.role === 'alumni' ? 'Alumni' : 'Institutional Member'})`,
    });

    setIsPostModalOpen(false);
    setNewOpp({
      title: '',
      company: currentUser.organizationOrCampus || 'Institutional Partner',
      location: currentUser.city || 'Bengaluru',
      type: 'Full-time',
      stipendOrSalary: '₹10 - 14 LPA',
      description: '',
      requirements: '',
      applyLinkOrEmail: currentUser.email,
    });
    showToast('Career opening published to the institutional exchange!');
  };

  const myApplications = applications.filter(
    (a) => a.applicantId === currentUser.id || a.applicantEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const filteredOpportunities = opportunities.filter((opp) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      opp.title.toLowerCase().includes(q) ||
      opp.company.toLowerCase().includes(q) ||
      opp.location.toLowerCase().includes(q) ||
      opp.requirements.toLowerCase().includes(q);
    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
              Campus & Alumni Career Board
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified Job & Internship Exchange
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Opportunities & Internships
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Exclusive openings, referrals, and apprentice programs posted directly by alumni leaders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsPostModalOpen(true)}
            className="rounded-full bg-[#0a3324] hover:bg-[#124935] text-white px-5 py-2.5 shadow-md flex items-center gap-2 font-semibold"
          >
            <Plus className="w-4 h-4 text-[#F5C347]" /> Post an Opportunity
          </Button>
        </div>
      </div>

      {/* CONTROLS: TABS & FILTERS */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Openings ({opportunities.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'applications'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              My Applications ({myApplications.length})
            </button>
          </div>

          {activeTab === 'browse' && (
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search job title, company, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 rounded-full text-sm"
              />
            </div>
          )}
        </div>

        {/* Type Filter Pills */}
        {activeTab === 'browse' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {JOB_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  typeFilter === type
                    ? 'bg-[#0a3324] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: BROWSE OPENINGS */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((job) => {
            const hasApplied = adminStore.hasAppliedForJob(job.id, currentUser.id);

            return (
              <div 
                key={job.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {job.type}
                      </span>
                      {hasApplied && (
                        <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Applied
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-950 transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm mt-1">
                      <Building className="w-4 h-4 text-emerald-700" />
                      <span>{job.company}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {job.stipendOrSalary}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-3.5 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700">
                    <strong className="text-slate-900 block mb-0.5">Key Requirements:</strong>
                    <p className="line-clamp-2">{job.requirements}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
                    <span>Posted: {job.postedDate}</span>
                    <span className="truncate max-w-[150px]">{job.postedBy}</span>
                  </div>

                  <Button 
                    onClick={() => setSelectedOpp(job)}
                    disabled={hasApplied}
                    className={`mt-2 w-full rounded-full font-bold text-xs py-2.5 transition-all shadow-sm ${
                      hasApplied
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-[#0a3324] hover:bg-[#144b35] text-white'
                    }`}
                  >
                    {hasApplied ? 'Application Submitted' : 'Apply Now ↗'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: MY APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="flex flex-col gap-4">
          {myApplications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-6">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No applications submitted yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Explore the job and internship exchange to submit applications with your profile!
              </p>
              <Button 
                onClick={() => setActiveTab('browse')}
                className="mt-4 rounded-full bg-[#0a3324] text-white text-xs font-semibold"
              >
                Browse Openings
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myApplications.map((app) => (
                <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-800">{app.company}</span>
                      <span className="text-[0.7rem] px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {app.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-lg">{app.jobTitle}</h4>
                    <p className="text-xs text-slate-500 mt-1">Applied on: {app.appliedAt}</p>

                    <div className="mt-3 p-3 bg-slate-50 rounded-2xl text-xs text-slate-700">
                      <span className="font-bold block mb-1">Resume / Portfolio:</span>
                      <a href={app.resumeUrlOrText} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                        {app.resumeUrlOrText}
                      </a>
                    </div>

                    {app.coverNote && (
                      <div className="mt-2 text-xs text-slate-600 italic">
                        "{app.coverNote}"
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[0.72rem] text-slate-400 flex items-center justify-between">
                    <span>Applicant: {app.applicantName}</span>
                    <span>Institutional Candidate</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APPLY MODAL */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Apply for Position</h3>
                <p className="text-xs text-slate-500">{selectedOpp.title} at {selectedOpp.company}</p>
              </div>
              <button 
                onClick={() => setSelectedOpp(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="mt-4 flex flex-col gap-4">
              <div className="p-3 bg-emerald-50 rounded-2xl text-xs text-emerald-900">
                <strong>Applicant Info:</strong> {currentUser.fullName} ({currentUser.email})
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Resume Link / Portfolio URL *</label>
                <Input
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://drive.google.com/your-resume or LinkedIn"
                  required
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brief Cover Note / Pitch</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Mention relevant projects, technical skills, or why you'd be a great match for this role..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedOpp(null)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST OPPORTUNITY MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Post an Opportunity</h3>
                <p className="text-xs text-slate-500">Share jobs and internships with alumni & students</p>
              </div>
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job / Internship Title *</label>
                <Input
                  value={newOpp.title}
                  onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                  placeholder="e.g. Associate Cloud Architect or AI Research Intern"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
                  <Input
                    value={newOpp.company}
                    onChange={(e) => setNewOpp({ ...newOpp, company: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / Remote *</label>
                  <Input
                    value={newOpp.location}
                    onChange={(e) => setNewOpp({ ...newOpp, location: e.target.value })}
                    placeholder="Bengaluru / Remote"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={newOpp.type}
                    onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Compensation / Stipend</label>
                  <Input
                    value={newOpp.stipendOrSalary}
                    onChange={(e) => setNewOpp({ ...newOpp, stipendOrSalary: e.target.value })}
                    placeholder="e.g. ₹12 LPA or ₹40,000/mo"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description *</label>
                <textarea
                  rows={3}
                  value={newOpp.description}
                  onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                  placeholder="Outline responsibilities, team culture, and day-to-day work..."
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Requirements & Qualifications *</label>
                <textarea
                  rows={2}
                  value={newOpp.requirements}
                  onChange={(e) => setNewOpp({ ...newOpp, requirements: e.target.value })}
                  placeholder="e.g. Python, Docker, React, B.Tech 2025/2026 batches..."
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Contact / Apply Link</label>
                <Input
                  value={newOpp.applyLinkOrEmail}
                  onChange={(e) => setNewOpp({ ...newOpp, applyLinkOrEmail: e.target.value })}
                  placeholder="careers@company.com or application link"
                  className="rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsPostModalOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Publish Role
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
