import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { adminStore, CurrentUser } from '@/lib/adminStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User, LogOut } from 'lucide-react';

export default function TopNav({ role = 'alumni' }: { role?: 'student' | 'alumni' | 'admin' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(adminStore.getCurrentUser());
  const [pendingCount, setPendingCount] = useState(adminStore.getPendingVerificationsCount());

  useEffect(() => {
    return adminStore.subscribe(() => {
      setCurrentUser(adminStore.getCurrentUser());
      setPendingCount(adminStore.getPendingVerificationsCount());
    });
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    adminStore.logout();
    navigate('/');
  };

  const effectiveRole = currentUser.role || role;
  const base = effectiveRole === 'student' ? '/student' : '/alumni';
  
  interface NavItem {
    name: string;
    path: string;
    badge?: string;
  }

  const userLinks: NavItem[] = [
    { name: 'Home', path: `${base}/home` },
    { name: 'Events', path: `${base}/events` },
    { name: 'Mentorship', path: `${base}/mentorship` },
    { name: 'Jobs & Internships', path: `${base}/jobs` },
    { name: 'Networking', path: `${base}/networking` },
    { name: 'Messages', path: `${base}/messages` },
    { name: 'Fundraising', path: `${base}/fundraising` },
  ];

  const adminLinks: NavItem[] = [
    { name: 'Home', path: '/admin/home' },
    { name: 'Users', path: '/admin/users' },
    { 
      name: 'Verifications', 
      path: '/admin/verifications', 
      badge: pendingCount > 0 ? String(pendingCount) : undefined 
    },
    { name: 'Events', path: '/admin/events' },
    { name: 'Reports', path: '/admin/reports' },
  ];

  const navLinks = effectiveRole === 'admin' ? adminLinks : userLinks;

  const updateIndicator = (element: HTMLElement | null) => {
    if (!element || !trackRef.current) return;
    const linkRect = element.getBoundingClientRect();
    const trackRect = trackRef.current.getBoundingClientRect();
    setIndicatorStyle({
      width: linkRect.width,
      left: linkRect.left - trackRect.left,
      opacity: 1
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (trackRef.current) {
        const activeEl = trackRef.current.querySelector('.nav-item.active') as HTMLElement;
        if (activeEl) {
          updateIndicator(activeEl);
        } else {
          setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
      }
    }, 100);
    
    const handleResize = () => {
      const activeEl = trackRef.current?.querySelector('.nav-item.active') as HTMLElement;
      updateIndicator(activeEl);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  const handleMouseLeave = () => {
    const activeEl = trackRef.current?.querySelector('.nav-item.active') as HTMLElement;
    if (activeEl) {
      updateIndicator(activeEl);
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  const initials = currentUser.fullName
    ? currentUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : (effectiveRole === 'admin' ? 'AD' : 'SA');

  const homePath = effectiveRole === 'admin' ? '/admin/home' : `${base}/home`;

  return (
    <header className="navbar-wrapper">
      <nav className="saarthi-nav">
        {/* LEFT: BRAND */}
        <Link to={homePath} className="saarthi-brand-link">
          <div className="icon-crop-viewport">
            <img 
              src="/logo.png" 
              alt="Saarthi Emblem" 
              className="cropped-chariot-icon" 
            />
          </div>
          <span className="brand-text-heading">Saarthi</span>
        </Link>
        
        {/* CENTER: LINKS */}
        <ul className="nav-links" ref={trackRef} onMouseLeave={handleMouseLeave}>
          <span 
            className="nav-indicator" 
            style={{
              width: indicatorStyle.width,
              transform: `translateX(${indicatorStyle.left}px)`,
              opacity: indicatorStyle.opacity
            }}
          />
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <span className="roll-wrapper">
                    <span className="roll-text">
                      {link.name} 
                      {link.badge && <span className="ml-2 bg-[#F5C347] text-[#041d14] text-[0.72rem] font-extrabold px-2 py-0.5 rounded-full">{link.badge}</span>}
                    </span>
                    <span className="roll-text roll-clone" aria-hidden="true">
                      {link.name}
                      {link.badge && <span className="ml-2 bg-[#F5C347] text-[#041d14] text-[0.72rem] font-extrabold px-2 py-0.5 rounded-full">{link.badge}</span>}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: PROFILE */}
        <div className="nav-actions">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center justify-center cursor-pointer text-decoration-none focus:outline-none bg-transparent border-none">
                <Avatar className="w-8 h-8 mb-1 shadow-md">
                  {currentUser.avatar && <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />}
                  <AvatarFallback className="bg-[var(--btn-emerald)] text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[0.65rem] text-[#64748b] tracking-widest uppercase font-semibold">
                  {effectiveRole}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" collisionPadding={24} className="w-60 p-2 rounded-2xl mt-2 border border-slate-100 shadow-xl bg-white">
              <div className="flex flex-col items-center p-4">
                <Avatar className="w-16 h-16 mb-3 shadow-sm border-2 border-slate-50">
                  {currentUser.avatar && <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />}
                  <AvatarFallback className="bg-[#0f4c3a] text-white text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900 line-clamp-1">
                    {currentUser.fullName}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 justify-center mt-1 font-medium truncate max-w-[200px]">
                    <User className="w-3 h-3 shrink-0" /> {currentUser.email}
                  </p>
                  <span className="mt-1.5 inline-block text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    {currentUser.designationOrDegree || (effectiveRole === 'student' ? 'Student Scholar' : 'Verified Alumnus')}
                  </span>
                </div>
              </div>
              <DropdownMenuSeparator className="my-1 border-dashed" />
              <DropdownMenuItem 
                className="cursor-pointer text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors"
                onClick={() => navigate(`/${effectiveRole}/profile`)}
              >
                <User className="w-4 h-4 mr-2 text-slate-500" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-dashed" />
              <DropdownMenuItem 
                className="cursor-pointer text-sm font-bold py-2.5 px-3 rounded-lg text-rose-600 hover:bg-rose-50 focus:bg-rose-50 transition-colors justify-center mt-1"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogContent className="rounded-3xl max-w-[400px] border-none shadow-2xl p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <LogOut className="w-5 h-5 text-[#1FAF73]" /> Log Out
                </AlertDialogTitle>
                <AlertDialogDescription className="text-slate-500 text-sm font-medium pt-2 pb-6">
                  Are you sure you want to end your current Saarthi session?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex items-center gap-3 sm:space-x-0 sm:justify-end">
                <AlertDialogCancel className="rounded-full px-6 py-2.5 border-[#1FAF73]/30 bg-[#1FAF73]/10 hover:bg-[#1FAF73]/20 text-[#1FAF73] border font-semibold m-0 mt-0 h-auto">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleLogout} 
                  className="rounded-full px-6 py-2.5 bg-[#f40f46] hover:bg-[#d60d3d] text-white font-semibold m-0 h-auto shadow-md shadow-red-200"
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>
    </header>
  );
}
