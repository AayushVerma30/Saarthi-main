import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const mockMentors = [
  { id: 1, name: 'Priya Patel', role: 'Senior SDE at Google', expertise: 'System Design, Career Growth' },
  { id: 2, name: 'Vikram Singh', role: 'Product Manager at Microsoft', expertise: 'Product Strategy, Interviews' },
];

export default function MentorshipPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">Mentorship System</h1>
        <p className="text-slate-500">Request and track mentorship from experienced alumni.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMentors.map((mentor) => (
          <div key={mentor.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-surface text-brand-deep flex items-center justify-center font-bold text-lg">
                {mentor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{mentor.name}</h3>
                <p className="text-sm text-brand-glow font-medium">{mentor.role}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Expertise: {mentor.expertise}</p>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="mt-2 bg-brand-deep hover:bg-brand-btn text-white w-full rounded-full">
                  Request Mentorship
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request Mentorship</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <p className="text-sm text-slate-500">Introduce yourself and explain what you hope to achieve with {mentor.name}.</p>
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-slate-50 focus:outline-none focus:border-brand-btn transition-colors resize-none text-sm"
                    placeholder="Hello, I am looking for guidance on..."
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
                  <Button onClick={() => setIsOpen(false)} className="bg-brand-deep hover:bg-brand-btn text-white rounded-full">
                    Send Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
