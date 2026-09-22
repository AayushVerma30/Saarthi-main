import { useState, useEffect } from 'react';
import { 
  Heart, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  Users, 
  Calendar, 
  ShieldCheck, 
  X,
  CreditCard,
  Gift
} from 'lucide-react';
import { adminStore, GivingCampaign, DonationRecord } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000, 50000];

export default function GivingPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [campaigns, setCampaigns] = useState<GivingCampaign[]>(adminStore.getCampaigns());
  const [donations, setDonations] = useState<DonationRecord[]>(adminStore.getDonations());

  // Contribute Modal State
  const [selectedCampaign, setSelectedCampaign] = useState<GivingCampaign | null>(null);
  const [amount, setAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorMessage, setDonorMessage] = useState('Proud to give back to the university!');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NetBanking' | 'Card'>('UPI');

  // Start Campaign Modal State
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    category: 'Scholarships & Grants',
    description: '',
    goal: 1000000,
    endDate: '2026-12-31',
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setCampaigns(adminStore.getCampaigns());
      setDonations(adminStore.getDonations());
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const finalAmount = customAmount ? parseInt(customAmount, 10) : amount;
    if (!finalAmount || finalAmount <= 0) return;

    adminStore.donateToCampaign({
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      donorName: isAnonymous ? 'Anonymous Alumnus' : currentUser.fullName,
      donorEmail: currentUser.email,
      amount: finalAmount,
      message: donorMessage.trim() || undefined,
      isAnonymous,
    });

    setSelectedCampaign(null);
    setCustomAmount('');
    setDonorMessage('Proud to give back to the university!');
    showToast(`Thank you! Your contribution of ₹${finalAmount.toLocaleString('en-IN')} has been recorded.`);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title.trim() || !newCampaign.goal) return;

    adminStore.addCampaign({
      title: newCampaign.title.trim(),
      category: newCampaign.category,
      description: newCampaign.description.trim(),
      goal: Number(newCampaign.goal),
      endDate: newCampaign.endDate,
    });

    setIsNewCampaignOpen(false);
    setNewCampaign({
      title: '',
      category: 'Scholarships & Grants',
      description: '',
      goal: 1000000,
      endDate: '2026-12-31',
    });
    showToast('Fundraising campaign created and published!');
  };

  const totalRaisedAcrossCampaigns = campaigns.reduce((acc, c) => acc + c.raised, 0);
  const totalDonorsCount = campaigns.reduce((acc, c) => acc + c.donors, 0);

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
              Institutional Endowment & Giving
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Real-time LocalStorage Philanthropy Hub
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Giving Back to Alma Mater
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Fund scholarships for underprivileged scholars, sponsor cutting-edge labs, and power campus milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsNewCampaignOpen(true)}
            className="rounded-full bg-[#0a3324] hover:bg-[#124935] text-white px-5 py-2.5 shadow-md flex items-center gap-2 font-semibold"
          >
            <Plus className="w-4 h-4 text-[#F5C347]" /> Start a Cause
          </Button>
        </div>
      </div>

      {/* IMPACT METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-2xl">
            ₹
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Raised</span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              ₹{totalRaisedAcrossCampaigns.toLocaleString('en-IN')}
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">Verified endowment records</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Heart className="w-7 h-7 text-[#F5C347]" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Generous Donors</span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {totalDonorsCount}
            </h3>
            <span className="text-xs text-amber-700 font-semibold">Alumni & faculty contributors</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-purple-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active Campaigns</span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {campaigns.length}
            </h3>
            <span className="text-xs text-purple-600 font-semibold">Scholarships & Infrastructure</span>
          </div>
        </div>
      </div>

      {/* CAMPAIGNS GRID */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Active Philanthropic Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const percentage = Math.min(100, Math.round((camp.raised / camp.goal) * 100));

            return (
              <div 
                key={camp.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {camp.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{camp.donors} Donors</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors line-clamp-2">
                    {camp.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-emerald-800 font-extrabold">
                        ₹{camp.raised.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-500 font-medium">
                        Goal: ₹{camp.goal.toLocaleString('en-IN')} ({percentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                      <div 
                        className="bg-gradient-to-r from-emerald-600 to-[#1FAF73] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Ends: {camp.endDate}
                    </span>
                    <span>100% Tax Exempt</span>
                  </div>

                  <Button 
                    onClick={() => setSelectedCampaign(camp)}
                    className="mt-2 w-full rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white font-bold text-xs py-2.5 shadow-sm"
                  >
                    Contribute Now ↗
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT DONATIONS FEED */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mt-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-800" />
            <h3 className="text-lg font-bold text-slate-900">Recent Institutional Contributions</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Updated live in LocalStorage</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donations.slice(0, 6).map((don) => (
            <div key={don.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">{don.donorName}</span>
                  <span className="font-extrabold text-emerald-800">
                    ₹{don.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[0.7rem] text-slate-500 font-medium truncate">
                  {don.campaignTitle}
                </p>
                {don.message && (
                  <p className="text-xs text-slate-600 italic mt-2 line-clamp-2">
                    "{don.message}"
                  </p>
                )}
              </div>
              <div className="mt-3 text-[0.68rem] text-slate-400 text-right">
                {don.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTRIBUTE MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Support Initiative</h3>
                <p className="text-xs text-slate-500">{selectedCampaign.title}</p>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDonate} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Contribution Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        amount === preset && !customAmount
                          ? 'bg-[#0a3324] text-white border-[#0a3324] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Or Enter Custom Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 15000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dedication / Message</label>
                <textarea
                  rows={2}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="Leave a short note of encouragement for scholars..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                />
                <label htmlFor="anonCheck" className="text-xs text-slate-700 cursor-pointer font-medium">
                  Make my donation anonymous on public leaderboards
                </label>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold text-slate-800 block">Simulated Payment Mode</span>
                <div className="flex gap-2">
                  {(['UPI', 'NetBanking', 'Card'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMethod(mode)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold border ${
                        paymentMethod === mode
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedCampaign(null)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Confirm Contribution
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* START CAMPAIGN MODAL */}
      {isNewCampaignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Start a Philanthropic Campaign</h3>
                <p className="text-xs text-slate-500">Initiate a scholarship or infrastructure campaign</p>
              </div>
              <button 
                onClick={() => setIsNewCampaignOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Title *</label>
                <Input
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="e.g. CSE 2018 Batch Merit Scholarship Fund"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCampaign.category}
                    onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Scholarships & Grants">Scholarships & Grants</option>
                    <option value="Campus Infrastructure">Campus Infrastructure</option>
                    <option value="Digital Inclusion">Digital Inclusion</option>
                    <option value="Sports & Athletics">Sports & Athletics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fundraising Target (₹) *</label>
                  <Input
                    type="number"
                    value={newCampaign.goal}
                    onChange={(e) => setNewCampaign({ ...newCampaign, goal: parseInt(e.target.value, 10) || 500000 })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                <Input
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Purpose & Vision *</label>
                <textarea
                  rows={3}
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Describe the impact this scholarship or facility will create for future batches..."
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewCampaignOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-6 font-semibold"
                >
                  Launch Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
