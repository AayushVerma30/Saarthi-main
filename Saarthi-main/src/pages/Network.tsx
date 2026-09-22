import { useState } from 'react';
import { Search, MapPin, BookOpen, GraduationCap, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockAlumni = [
  { id: 1, name: 'Aarav Sharma', course: 'B.Tech', dept: 'CSE', batch: 2020, city: 'Bengaluru', email: 'aarav@example.com' },
  { id: 2, name: 'Priya Patel', course: 'MBA', dept: 'Finance', batch: 2018, city: 'Mumbai', email: 'priya@example.com' },
  { id: 3, name: 'Vikram Singh', course: 'B.Tech', dept: 'ECE', batch: 2021, city: 'Delhi', email: 'vikram@example.com' },
  { id: 4, name: 'Neha Gupta', course: 'B.Des', dept: 'Design', batch: 2019, city: 'Pune', email: 'neha@example.com' },
];

export default function NetworkPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Alumni Directory</h1>
          <p className="text-slate-500">Connect with verified alumni across the globe.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name, city, dept..." 
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white">Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAlumni.map((alumnus) => (
          <div key={alumnus.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-surface text-brand-deep flex items-center justify-center font-bold text-lg">
                {alumnus.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{alumnus.name}</h3>
                <p className="text-sm text-brand-glow font-medium">Batch of {alumnus.batch}</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                {alumnus.course} in {alumnus.dept}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                {alumnus.city}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button className="flex-1 bg-brand-deep hover:bg-brand-btn text-white rounded-full">
                Connect
              </Button>
              <Button variant="outline" size="icon" className="rounded-full shrink-0">
                <Mail className="w-4 h-4 text-slate-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
