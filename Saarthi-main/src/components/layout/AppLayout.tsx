import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

export default function AppLayout({ role = 'alumni' }: { role?: 'admin' | 'alumni' | 'student' }) {
  return (
    <div className="min-h-screen bg-brand-surface text-foreground font-sans flex flex-col">
      <TopNav role={role} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet context={{ role }} />
      </main>
    </div>
  );
}
