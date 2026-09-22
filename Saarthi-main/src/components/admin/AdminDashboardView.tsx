import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Check, 
  FileText, 
  Plus,
  UserCheck,
  Building2
} from 'lucide-react';
import { adminStore, UserRecord, VerificationRequest, AuditLogRecord } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';

interface AdminDashboardViewProps {
  onNavigateTab: (tab: 'dashboard' | 'users' | 'verification' | 'events' | 'reports') => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigateTab }) => {
  const [metrics, setMetrics] = useState(adminStore.getDashboardMetrics());
  const [verifications, setVerifications] = useState<VerificationRequest[]>(adminStore.getVerifications());
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(adminStore.getAuditLogs());
  const [users, setUsers] = useState<UserRecord[]>(adminStore.getUsers());

  const refreshData = () => {
    setMetrics(adminStore.getDashboardMetrics());
    setVerifications(adminStore.getVerifications());
    setAuditLogs(adminStore.getAuditLogs());
    setUsers(adminStore.getUsers());
  };

  useEffect(() => {
    return adminStore.subscribe(refreshData);
  }, []);

  const pendingRequests = verifications.filter(v => v.status === 'Pending');

  const handleQuickApprove = (id: string) => {
    adminStore.approveVerification(id, 'Quick approved from Admin Dashboard oversight panel.');
  };

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-brand-deep via-brand-mid to-brand-btn rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse"></span>
            Institutional Governance Active
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-tight">
            Saarthi Administrative Oversight & Registry
          </h1>
          <p className="mt-2 text-slate-200 text-sm md:text-base leading-relaxed">
            Monitor real-time verification queues, institutional alumni directories, upcoming academic symposiums, and compliance analytics across all university departments.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button 
              onClick={() => onNavigateTab('verification')}
              className="bg-brand-glow hover:bg-emerald-500 text-brand-deep font-semibold shadow-md rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Review Pending Verifications ({pendingRequests.length})
            </Button>
            <Button 
              onClick={() => onNavigateTab('events')}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Manage Events
            </Button>
            <Button 
              onClick={() => adminStore.exportUsersCSV()}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export Roster (CSV)
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Members */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Members
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{metrics.totalUsers}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                {metrics.alumniCount} Alumni
              </span>
              <span>•</span>
              <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
                {metrics.studentCount} Students
              </span>
            </div>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className={`bg-white rounded-2xl p-5 border shadow-sm transition-shadow ${
          metrics.pendingVerifications > 0 ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Approvals
            </span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              metrics.pendingVerifications > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-slate-900">{metrics.pendingVerifications}</div>
              {metrics.pendingVerifications > 0 && (
                <span className="text-xs text-amber-700 font-semibold bg-amber-100/80 px-2 py-0.5 rounded-full">
                  Action Required
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Identity & academic credentials awaiting review
            </p>
          </div>
        </div>

        {/* Scheduled Events */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Events
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{metrics.activeEvents}</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{metrics.totalAttendees} total registered attendees</span>
            </div>
          </div>
        </div>

        {/* Verification Compliance Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verification Rate
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <div className="text-3xl font-bold text-slate-900">{metrics.verificationRate}%</div>
              <span className="text-xs text-slate-500 font-medium">({metrics.verifiedUsers} verified)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-brand-glow h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.verificationRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Department Distribution & Verification Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Roster Distribution (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-btn" />
                Departmental Representation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribution of verified alumni and active students across academic faculties
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigateTab('users')}
              className="text-xs text-brand-btn hover:text-brand-deep font-semibold"
            >
              View Directory <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {metrics.departmentList.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-800 font-semibold">{dept.name}</span>
                  <span className="text-slate-600 text-xs font-mono">
                    {dept.count} members ({dept.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-brand-btn h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(dept.percentage, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">Alumni Chapter</span>
              <p className="text-lg font-bold text-slate-900 mt-1">{metrics.alumniCount}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">Enrolled Scholars</span>
              <p className="text-lg font-bold text-slate-900 mt-1">{metrics.studentCount}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">Faculty Mentors</span>
              <p className="text-lg font-bold text-slate-900 mt-1">{metrics.facultyCount}</p>
            </div>
          </div>
        </div>

        {/* Urgent Verification Queue (Right 1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  Verification Queue
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest credential review requests
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {pendingRequests.length} Pending
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingRequests.slice(0, 3).map((req) => (
                <div key={req.id} className="py-3.5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{req.applicantName}</h4>
                      <p className="text-xs text-slate-500">{req.enrollmentNumber}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {req.applicantRole}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{req.documentType}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Submitted {req.submissionDate}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => handleQuickApprove(req.id)}
                      className="h-7 text-xs bg-brand-deep hover:bg-brand-btn text-white rounded-lg px-2.5"
                    >
                      <Check className="w-3 h-3 mr-1" /> Approve
                    </Button>
                  </div>
                </div>
              ))}

              {pendingRequests.length === 0 && (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <UserCheck className="w-8 h-8 mx-auto text-emerald-500" />
                  <p className="text-sm font-medium text-slate-600">All submissions verified</p>
                  <p className="text-xs">No pending verification requests in queue.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigateTab('verification')}
              className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 rounded-xl"
            >
              Open Full Verification Console
            </Button>
          </div>
        </div>

      </div>

      {/* Institutional Audit Activity Trail */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-700" />
              Administrative Audit Log
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of verified accounts, policy updates, and scheduled events
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Live Audit Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Action Type</th>
                <th className="px-4 py-3">Target Entity</th>
                <th className="px-4 py-3">Executive Actor</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.slice(0, 6).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-slate-500 font-mono">{log.timestamp}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{log.action}</td>
                  <td className="px-4 py-3 text-slate-600">{log.target}</td>
                  <td className="px-4 py-3 text-slate-500">{log.actor}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'Success' ? 'bg-emerald-50 text-emerald-700' :
                      log.status === 'Warning' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
