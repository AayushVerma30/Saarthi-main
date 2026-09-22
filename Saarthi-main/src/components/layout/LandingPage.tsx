import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, GraduationCap, Briefcase, Calendar, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-6 mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-glow/30 text-brand-deep text-sm font-semibold tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-glow"></span>
          </span>
          #1 Alumni Network & Mentorship Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-sans font-bold text-slate-900 tracking-tight leading-[1.1]">
          Connect, Grow, and <br className="hidden md:block"/> Give Back with <span className="text-brand-deep font-serif italic font-normal">Saarthi.</span>
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Join the exclusive institutional network. Find verified alumni mentors, discover exclusive career opportunities, and support your alma mater.
        </p>

        <div className="flex items-center gap-4 mt-4">
          <Link to="/auth">
            <Button size="lg" className="rounded-full bg-brand-deep hover:bg-brand-btn text-white px-8">
              Join Saarthi <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-50">
            Find Alumni Mentor
          </Button>
        </div>
      </section>

      {/* Stats Marquee (Static layout for now) */}
      <section className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {[
            { label: 'Verified Alumni', value: '10,000+' },
            { label: 'Placed Students', value: '5,000+' },
            { label: 'Active Mentors', value: '1,200+' },
            { label: 'Campaign Funds', value: '$2.5M+' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center gap-1 border-r last:border-r-0 border-slate-100">
              <span className="text-3xl font-bold text-brand-deep">{stat.value}</span>
              <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Module Previews */}
      <section className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Platform Modules</h2>
          <p className="text-slate-500 mt-2">Everything you need to succeed, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Networking', icon: Users, desc: 'Connect with verified institutional alumni.' },
            { title: 'Mentorship', icon: GraduationCap, desc: 'Request and track mentorship statuses.' },
            { title: 'Job Portal', icon: Briefcase, desc: 'Exclusive opportunities with Apply actions.' },
            { title: 'Events', icon: Calendar, desc: 'Single-click RSVP and duplicate protection.' },
            { title: 'Philanthropy', icon: Heart, desc: 'Contribute to Student & Infrastructure funds.' },
            { title: 'Profile Center', icon: Users, desc: 'Manage your verified academic credentials.' },
          ].map((mod, i) => (
            <div key={i} className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-brand-glow/30 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-surface flex items-center justify-center text-brand-deep group-hover:scale-110 transition-transform">
                <mod.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{mod.title}</h3>
                <p className="text-slate-500 mt-1">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
