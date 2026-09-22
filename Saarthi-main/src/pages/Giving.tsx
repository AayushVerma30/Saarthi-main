import { Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockCampaigns = [
  { id: 1, title: 'Student Scholarship Fund 2026', raised: 45000, goal: 100000, donors: 120 },
  { id: 2, title: 'New Library Infrastructure', raised: 200000, goal: 500000, donors: 35 },
];

export default function GivingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">Giving Back</h1>
        <p className="text-slate-500">Support campaigns and initiatives that empower the next generation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCampaigns.map((camp) => (
          <div key={camp.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-xl">{camp.title}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                  <Heart className="w-4 h-4 text-brand-glow" />
                  <span>{camp.donors} Donors</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-brand-deep">${camp.raised.toLocaleString()} raised</span>
                <span className="text-slate-500">Goal: ${camp.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-brand-glow h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (camp.raised / camp.goal) * 100)}%` }}
                />
              </div>
            </div>

            <Button className="mt-4 bg-brand-deep hover:bg-brand-btn text-white w-full rounded-full">
              Contribute Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
