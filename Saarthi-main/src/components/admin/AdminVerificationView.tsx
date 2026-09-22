import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  X, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Building2, 
  GraduationCap, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { adminStore, VerificationRequest, VerificationStatus } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AdminVerificationView: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationRequest[]>(adminStore.getVerifications());
  const [statusTab, setStatusTab] = useState<'Pending' | 'Approved' | 'Rejected' | 'All'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Rejection modal
  const [rejectingItem, setRejectingItem] = useState<VerificationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Approval notes modal (optional)
  const [approvingItem, setApprovingItem] = useState<VerificationRequest | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');

  useEffect(() => {
    return adminStore.subscribe(() => {
      setVerifications(adminStore.getVerifications());
    });
  }, []);

  const pendingCount = verifications.filter((v) => v.status === 'Pending').length;
  const approvedCount = verifications.filter((v) => v.status === 'Approved').length;
  const rejectedCount = verifications.filter((v) => v.status === 'Rejected').length;

  const filteredVerifications = verifications.filter((item) => {
    const matchesTab = statusTab === 'All' || item.status === statusTab;
    const matchesSearch = 
      item.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applicantEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentReferenceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleApproveConfirm = () => {
    if (!approvingItem) return;
    adminStore.approveVerification(approvingItem.id, approvalNotes || 'Credentials verified against official academic registrar.');
    setApprovingItem(null);
    setApprovalNotes('');
  };

  const handleRejectConfirm = () => {
    if (!rejectingItem) return;
    adminStore.rejectVerification(rejectingItem.id, rejectionReason || 'Institutional documentation failed verification.');
    setRejectingItem(null);
    setRejectionReason('');
  };

  const handleBatchApprove = () => {
    if (window.confirm(`Are you sure you want to approve all ${pendingCount} pending verification requests?`)) {
      adminStore.batchApprovePending();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-brand-btn" />
            Credential Verification Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Authenticate university degree certificates, student identity cards, and academic enrollment credentials.
          </p>
        </div>

        {pendingCount > 0 && (
          <Button 
            onClick={handleBatchApprove}
            className="bg-brand-deep hover:bg-brand-btn text-white rounded-xl shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Batch Approve All ({pendingCount})
          </Button>
        )}
      </div>

      {/* Status Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-xl">
          <button
            onClick={() => setStatusTab('Pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              statusTab === 'Pending'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Pending Review</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              pendingCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setStatusTab('Approved')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              statusTab === 'Approved'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Approved</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {approvedCount}
            </span>
          </button>

          <button
            onClick={() => setStatusTab('Rejected')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              statusTab === 'Rejected'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Rejected</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
              {rejectedCount}
            </span>
          </button>

          <button
            onClick={() => setStatusTab('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusTab === 'All'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({verifications.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search candidate, roll ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50/70 border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Verification Queue List */}
      <div className="space-y-4">
        {filteredVerifications.map((req) => (
          <div 
            key={req.id} 
            className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Applicant & Credential Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-900">{req.applicantName}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                    req.applicantRole === 'Alumni' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'
                  }`}>
                    {req.applicantRole}
                  </span>
                  <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    Enrollment: {req.enrollmentNumber}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                    req.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {req.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {req.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                    {req.status === 'Rejected' && <AlertCircle className="w-3.5 h-3.5" />}
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{req.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Graduation Class of {req.batch}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Submitted on {req.submissionDate}</span>
                  </div>
                </div>

                {/* Document Information Badge */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="w-4 h-4 text-brand-btn" />
                    <span className="font-semibold">{req.documentType}</span>
                    <span className="text-slate-400 font-mono">({req.documentReferenceNumber})</span>
                  </div>
                  <span className="text-slate-500 font-medium">
                    Contact: {req.applicantEmail}
                  </span>
                </div>

                {/* Reviewer Notes if Approved or Rejected */}
                {req.reviewerNotes && (
                  <div className="text-xs text-slate-600 bg-slate-100/70 p-2.5 rounded-lg border-l-2 border-brand-btn flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Review Note:</span> {req.reviewerNotes}
                      {req.verifiedAt && (
                        <span className="text-slate-400 ml-2 font-mono">({req.verifiedAt})</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center lg:flex-col justify-end gap-2 shrink-0 pt-2 lg:pt-0">
                {req.status === 'Pending' ? (
                  <>
                    <Button 
                      size="sm"
                      onClick={() => setApprovingItem(req)}
                      className="bg-brand-deep hover:bg-brand-btn text-white rounded-xl text-xs h-9 px-4 font-semibold shadow-sm w-full"
                    >
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      Approve Credential
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectingItem(req)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 rounded-xl text-xs h-9 px-4 font-semibold w-full"
                    >
                      <X className="w-3.5 h-3.5 mr-1.5" />
                      Reject Credential
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (req.status === 'Approved') {
                        setRejectingItem(req);
                      } else {
                        setApprovingItem(req);
                      }
                    }}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs h-9 px-4"
                  >
                    Change Review Decision
                  </Button>
                )}
              </div>

            </div>
          </div>
        ))}

        {filteredVerifications.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500 space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <h4 className="text-base font-bold text-slate-800">No verification items</h4>
            <p className="text-xs text-slate-400">
              There are no verification requests matching the active filter.
            </p>
          </div>
        )}
      </div>

      {/* Approval Confirmation Modal */}
      {approvingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Confirm Credential Approval
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Approving this credential will mark {approvingItem.applicantName} ({approvingItem.enrollmentNumber}) as verified across the platform.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verification Audit Note (Optional)
                </label>
                <Input 
                  placeholder="e.g. Cross-verified with Central Exam Controller registry"
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <Button 
                variant="outline" 
                onClick={() => setApprovingItem(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApproveConfirm}
                className="bg-brand-deep hover:bg-brand-btn text-white font-semibold"
              >
                Confirm Verification
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold font-serif text-slate-900 text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Reject Credential Submission
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Specify the institutional verification failure reason for {rejectingItem.applicantName}.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Rejection
                </label>
                <textarea 
                  required
                  rows={3}
                  placeholder="e.g. Enrollment ID not found in academic graduation roll; provided marksheet is illegible."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <Button 
                variant="outline" 
                onClick={() => setRejectingItem(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRejectConfirm}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
