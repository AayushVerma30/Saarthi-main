import { Briefcase, Building, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockJobs = [
  { id: 1, title: 'Frontend Engineer', company: 'Google', location: 'Bengaluru', type: 'Full-time', posted: '2 days ago' },
  { id: 2, title: 'Product Intern', company: 'Microsoft', location: 'Remote', type: 'Internship', posted: '5 days ago' },
];

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">Opportunities</h1>
        <p className="text-slate-500">Exclusive job and internship postings from the alumni network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-deep">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-brand-surface text-brand-deep rounded-full">
                {job.type}
              </span>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
              <div className="flex items-center gap-1 text-slate-600 mt-1">
                <Building className="w-4 h-4" />
                <span className="font-medium text-sm">{job.company}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {job.posted}
              </div>
            </div>

            <Button className="mt-4 bg-brand-deep hover:bg-brand-btn text-white w-full rounded-full">
              Apply Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
