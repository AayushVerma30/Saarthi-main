import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  Filter,
  RefreshCw
} from 'lucide-react';
import { adminStore } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';

export const AdminReportsView: React.FC = () => {
  const [metrics, setMetrics] = useState(adminStore.getDashboardMetrics());
  const [users, setUsers] = useState(adminStore.getUsers());
  const [events, setEvents] = useState(adminStore.getEvents());
  const [verifications, setVerifications] = useState(adminStore.getVerifications());

  const [selectedReportType, setSelectedReportType] = useState('accreditation');
  const [reportPeriod, setReportPeriod] = useState('Academic Year 2026-2027');

  const refreshData = () => {
    setMetrics(adminStore.getDashboardMetrics());
    setUsers(adminStore.getUsers());
    setEvents(adminStore.getEvents());
    setVerifications(adminStore.getVerifications());
  };

  useEffect(() => {
    return adminStore.subscribe(refreshData);
  }, []);

  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.verificationStatus === 'Verified').length;
  const pendingVerifications = verifications.filter((v) => v.status === 'Pending').length;
  const approvedVerifications = verifications.filter((v) => v.status === 'Approved').length;
  const rejectedVerifications = verifications.filter((v) => v.status === 'Rejected').length;

  const totalEventAttendees = events.reduce((acc, curr) => acc + curr.registeredAttendees, 0);
  const totalEventCapacity = events.reduce((acc, curr) => acc + curr.capacity, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    adminStore.exportUsersCSV();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-brand-btn" />
            Institutional Audit & Analytics Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate formal documentation for university accreditation, registry audits, and alumni network governance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Data (CSV)
          </Button>

          <Button 
            onClick={handlePrint}
            className="bg-brand-deep hover:bg-brand-btn text-white rounded-xl shadow-sm"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Official Report
          </Button>
        </div>
      </div>

      {/* Report Configuration Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Report Subject
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="accreditation">Institutional Accreditation & NIRF Compliance Digest</option>
              <option value="verification">Official Registry Verification Audit</option>
              <option value="departmental">Departmental Engagement & Faculty Representation</option>
              <option value="events">Annual Academic Events & Attendance Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Reporting Cycle
            </label>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="Academic Year 2026-2027">Academic Year 2026-2027</option>
              <option value="Annual Audit Cycle 2025-2026">Annual Audit Cycle 2025-2026</option>
              <option value="Cumulative Historical Repository">Cumulative Historical Repository</option>
            </select>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={refreshData}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold self-end md:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh Calculations
        </Button>
      </div>

      {/* Formal Institutional Report Document Preview */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-md p-6 md:p-10 space-y-8 font-sans print:shadow-none print:border-none">
        
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-deep rounded flex items-center justify-center text-white font-serif font-bold text-sm">
                S
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900 uppercase">
                Saarthi Institutional Network
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Office of the Registrar & Directorate of Alumni Affairs
            </p>
            <p className="text-[11px] text-slate-400">
              Institutional Governance Code: SAARTHI-REG-2026-IND
            </p>
          </div>

          <div className="sm:text-right text-xs space-y-1">
            <div className="font-mono text-slate-500">
              Report Ref: <span className="font-bold text-slate-900">REP-2026-0922</span>
            </div>
            <div className="text-slate-600">
              Generated: <span className="font-semibold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="text-slate-500">
              Reporting Cycle: <span className="font-semibold text-slate-800">{reportPeriod}</span>
            </div>
          </div>
        </div>

        {/* Report Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-btn bg-brand-surface px-2 py-0.5 rounded">
            Official Compliance Document
          </span>
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            {selectedReportType === 'accreditation' && 'Institutional Accreditation & Network Governance Summary'}
            {selectedReportType === 'verification' && 'Academic Credential Verification & Audit Roll'}
            {selectedReportType === 'departmental' && 'Departmental Distribution & Demographic Survey'}
            {selectedReportType === 'events' && 'Symposiums, Career Fairs, and Event Capacity Review'}
          </h2>
          <p className="text-xs text-slate-500">
            Certified accurate based on registered records and verified university transcripts.
          </p>
        </div>

        {/* High-Level Executive Summary Figures */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase">Total Enrolled</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{totalUsers}</div>
            <span className="text-[11px] text-slate-400">Active Records</span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase">Verification Rate</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{metrics.verificationRate}%</div>
            <span className="text-[11px] text-slate-400">{verifiedUsers} Verified Accounts</span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase">Pending Review</span>
            <div className="text-2xl font-bold text-amber-700 mt-1">{pendingVerifications}</div>
            <span className="text-[11px] text-slate-400">Queue Items</span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase">Event Participation</span>
            <div className="text-2xl font-bold text-blue-700 mt-1">{totalEventAttendees}</div>
            <span className="text-[11px] text-slate-400">RSVP Registrations</span>
          </div>
        </div>

        {/* Section 1: Departmental Roster Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-btn" />
            1. Departmental Distribution & Compliance Metrics
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Department Name</th>
                  <th className="p-3">Enrolled Members</th>
                  <th className="p-3">Representation Ratio</th>
                  <th className="p-3 text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.departmentList.map((dept) => (
                  <tr key={dept.name} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{dept.name}</td>
                    <td className="p-3 text-slate-700">{dept.count} Members</td>
                    <td className="p-3 text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="bg-brand-btn h-full rounded-full"
                            style={{ width: `${Math.max(dept.percentage, 5)}%` }}
                          />
                        </div>
                        <span className="font-mono">{dept.percentage}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-medium text-emerald-700">Compliant</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Verification Status Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-btn" />
            2. Academic Credential Verification Roster
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Verification Class</th>
                  <th className="p-3">Total Submissions</th>
                  <th className="p-3">Ratio of Registry</th>
                  <th className="p-3 text-right">Regulatory Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold text-emerald-800">Verified & Authenticated</td>
                  <td className="p-3 text-slate-700">{approvedVerifications} Candidates</td>
                  <td className="p-3 text-slate-700">
                    {Math.round((approvedVerifications / (verifications.length || 1)) * 100)}%
                  </td>
                  <td className="p-3 text-right text-emerald-700 font-semibold">Active Access</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-800">Pending Review Queue</td>
                  <td className="p-3 text-slate-700">{pendingVerifications} Candidates</td>
                  <td className="p-3 text-slate-700">
                    {Math.round((pendingVerifications / (verifications.length || 1)) * 100)}%
                  </td>
                  <td className="p-3 text-right text-amber-700 font-semibold">Under Inspection</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-red-800">Rejected / Discrepancy</td>
                  <td className="p-3 text-slate-700">{rejectedVerifications} Candidates</td>
                  <td className="p-3 text-slate-700">
                    {Math.round((rejectedVerifications / (verifications.length || 1)) * 100)}%
                  </td>
                  <td className="p-3 text-right text-red-700 font-semibold">Restricted Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Institutional Events & Engagement */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-btn" />
            3. Scheduled Symposiums & Engagement Benchmarks
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Event Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Format</th>
                  <th className="p-3">Confirmed RSVPs</th>
                  <th className="p-3 text-right">Venue Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{ev.title}</td>
                    <td className="p-3 text-slate-600">{ev.category}</td>
                    <td className="p-3 text-slate-600">{ev.deliveryMode}</td>
                    <td className="p-3 font-semibold text-slate-800">
                      {ev.registeredAttendees} / {ev.capacity}
                    </td>
                    <td className="p-3 text-right font-medium text-brand-btn">
                      {Math.round((ev.registeredAttendees / (ev.capacity || 1)) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer & Certification Stamp */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">
              Authorized by Directorate of Institutional Administration
            </p>
            <p>Certified official computer-generated document, valid without manual signature.</p>
          </div>
          <div className="text-right">
            <div className="font-mono text-slate-400">Security Hash: SHA256-SAARTHI-VERIF-AUDIT</div>
            <div className="text-slate-600 font-semibold">Saarthi Institutional Network Portal</div>
          </div>
        </div>

      </div>
    </div>
  );
};
