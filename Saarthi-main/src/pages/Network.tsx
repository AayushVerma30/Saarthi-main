import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Building2, 
  CheckCircle2, 
  UserPlus, 
  UserCheck, 
  Filter, 
  ShieldCheck, 
  X,
  Phone,
  Sparkles
} from 'lucide-react';
import { adminStore, UserRecord, UserRole } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DEPARTMENTS = [
  'All Departments',
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Management Studies',
  'Mechanical Engineering',
  'Civil Engineering',
];

export default function NetworkPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [users, setUsers] = useState<UserRecord[]>(adminStore.getUsers());
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [selectedMember, setSelectedMember] = useState<UserRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setUsers(adminStore.getUsers());
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleConnect = (targetUserId: string, targetName: string) => {
    const status = adminStore.getConnectionStatus(currentUser.id, targetUserId);
    if (status === 'Connected') {
      adminStore.disconnectUser(currentUser.id, targetUserId);
      showToast(`Disconnected from ${targetName}.`);
    } else {
      adminStore.connectWithUser(currentUser.id, targetUserId);
      showToast(`Connected with ${targetName}! Connection saved to local storage.`);
    }
  };

  const filteredMembers = users.filter((u) => {
    // Exclude current user from their own directory browse
    if (u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase()) {
      return false;
    }

    const q = search.toLowerCase();
    const matchesSearch = 
      u.fullName.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.organizationOrCampus.toLowerCase().includes(q) ||
      u.designationOrDegree.toLowerCase().includes(q);

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesDept = deptFilter === 'All Departments' || u.department === deptFilter;

    return matchesSearch && matchesRole && matchesDept;
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
              Institutional Member Roster
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified Directory Synced with LocalStorage
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Institutional Alumni Directory
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Search, connect, and collaborate with verified graduates and students across global chapters.
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by member name, company, department, city..." 
            className="pl-10 bg-slate-50 border-slate-200 rounded-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Roles</option>
            <option value="Alumni">Alumni Only</option>
            <option value="Student">Students Only</option>
            <option value="Faculty">Faculty Only</option>
          </select>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[200px] truncate"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DIRECTORY GRID */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No members match your search</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try resetting your search query or department filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const connStatus = adminStore.getConnectionStatus(currentUser.id, member.id);
            const isConnected = connStatus === 'Connected';

            return (
              <div 
                key={member.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-[#F5C347] flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.fullName} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        member.fullName.charAt(0)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-950 transition-colors truncate">
                          {member.fullName}
                        </h3>
                        {member.verificationStatus === 'Verified' && (
                          <span title="Verified Member">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                        Class of {member.batch} • {member.role}
                      </p>
                      
                      <p className="text-xs text-slate-600 font-medium truncate mt-1">
                        {member.designationOrDegree}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{member.organizationOrCampus}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{member.department}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{member.city}</span>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-slate-500 mt-3 line-clamp-2 italic bg-slate-50 p-2.5 rounded-xl">
                      "{member.bio}"
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    onClick={() => handleToggleConnect(member.id, member.fullName)}
                    className={`flex-1 rounded-full text-xs font-bold py-2.5 transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-[#0a3324] hover:bg-[#144b35] text-white'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 text-[#F5C347]" />
                        Connect
                      </>
                    )}
                  </Button>

                  <a
                    href={`mailto:${member.email}?subject=Saarthi Institutional Connection`}
                    className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shrink-0"
                    title={`Email ${member.fullName}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  <Button
                    variant="outline"
                    onClick={() => setSelectedMember(member)}
                    className="rounded-full text-xs px-3 py-2 text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    Profile
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MEMBER PROFILE MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-[#F5C347] flex items-center justify-center font-bold text-2xl shadow-sm">
                  {selectedMember.avatar ? (
                    <img src={selectedMember.avatar} alt={selectedMember.fullName} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    selectedMember.fullName.charAt(0)
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{selectedMember.fullName}</h3>
                    {selectedMember.verificationStatus === 'Verified' && (
                      <span className="text-[0.65rem] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">{selectedMember.designationOrDegree}</p>
                  <p className="text-xs text-emerald-800 font-medium">{selectedMember.organizationOrCampus}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-800">{selectedMember.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class Batch:</span>
                  <span className="font-semibold text-slate-800">{selectedMember.batch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Institutional ID:</span>
                  <span className="font-semibold text-slate-800">{selectedMember.enrollmentNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">City & Region:</span>
                  <span className="font-semibold text-slate-800">{selectedMember.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Email:</span>
                  <span className="font-semibold text-slate-800">{selectedMember.email}</span>
                </div>
              </div>

              {selectedMember.bio && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">About & Professional Focus</h4>
                  <p className="text-slate-600 leading-relaxed bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/60">
                    {selectedMember.bio}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-3 border-t border-slate-100">
              <a
                href={`mailto:${selectedMember.email}?subject=Saarthi Institutional Connection`}
                className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 py-2.5 text-xs font-semibold shadow-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#F5C347]" /> Send Direct Message
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
