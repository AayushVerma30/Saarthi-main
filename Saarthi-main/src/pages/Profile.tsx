import { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { adminStore, CurrentUser } from '@/lib/adminStore';

export default function ProfilePage() {
  const context = useOutletContext<{ role?: string }>() || {};
  const [currentUser, setCurrentUser] = useState<CurrentUser>(adminStore.getCurrentUser());
  const effectiveRole = currentUser.role || context.role || 'alumni';
  const isAdmin = effectiveRole === 'admin';

  const [avatar, setAvatar] = useState<string | null>(currentUser.avatar || null);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [fullName, setFullName] = useState(currentUser.fullName || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [batch, setBatch] = useState(currentUser.batch?.toString() || '2022');
  const [course, setCourse] = useState(currentUser.course || 'B.Tech');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science and Engineering');
  const [designation, setDesignation] = useState(currentUser.designationOrDegree || '');
  const [bio, setBio] = useState(currentUser.bio || '');

  useEffect(() => {
    const user = adminStore.getCurrentUser();
    setCurrentUser(user);
    setFullName(user.fullName || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setBatch(user.batch?.toString() || '2022');
    setCourse(user.course || 'B.Tech');
    setDepartment(user.department || 'Computer Science and Engineering');
    setDesignation(user.designationOrDegree || '');
    setBio(user.bio || '');
    setAvatar(user.avatar || null);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        const result = uploadEvt.target?.result as string;
        setAvatar(result);
        adminStore.updateProfile({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateProfile({
      fullName,
      email,
      phone,
      batch: parseInt(batch, 10) || 2024,
      course,
      department,
      designationOrDegree: designation,
      bio,
      avatar: avatar || undefined,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  const roleLabel = isAdmin 
    ? 'Institutional Administrator' 
    : effectiveRole === 'student' 
    ? 'Student Scholar Profile' 
    : 'Alumni Profile';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8 px-4">
      <div className={`w-full ${isAdmin ? 'max-w-2xl' : 'max-w-4xl'} bg-[var(--emerald-card)] rounded-[2.5rem] p-8 md:p-10 relative profile-card flex flex-col shadow-2xl border border-emerald-900/50`}>
        
        {/* Header with Role Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B8E986] font-bold">
              Institutional Credential Hub
            </span>
            <h2 className="title" style={{ fontSize: '1.85rem', color: 'var(--card-cream)', marginTop: '0.25rem' }}>
              {roleLabel}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-[#F5C347]" />
            <span>Persistent LocalStorage Record</span>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 p-3 mb-6 bg-emerald-900/80 border border-emerald-500 text-emerald-100 rounded-2xl text-sm font-semibold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#B8E986] shrink-0" />
            <span>Changes successfully saved to institutional LocalStorage database!</span>
          </div>
        )}

        {/* Profile Picture Upload */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold mb-2" style={{ color: 'var(--card-cream)' }}>
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div 
              className="relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer group shadow-lg"
              style={{ borderColor: 'var(--gold-highlight)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#F5C347]">
                  <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[0.65rem] mt-1 font-bold">Photo</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold hover:underline text-left" 
                style={{ color: 'var(--gold-highlight)' }}
              >
                {avatar ? 'Change photo' : 'Upload profile picture'}
              </button>
              <span className="text-xs text-slate-300">JPG, PNG, WEBP saved directly to browser memory</span>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept=".jpg,.png,.webp,image/*" 
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Edit Form */}
        <form className="actual-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Name" 
                  required 
                />
                <span className="input-icon">
                  <User className="w-4 h-4 text-emerald-800" />
                </span>
              </div>
            </div>

            {/* Email Address */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email" 
                  required 
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>Phone Number</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210" 
                />
              </div>
            </div>

            {/* Designation / Role */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>{isAdmin ? 'Administrative Title' : effectiveRole === 'student' ? 'Current Major / Year' : 'Professional Designation'}</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder={effectiveRole === 'student' ? 'Final Year B.Tech Scholar' : 'Senior Software Engineer'} 
                />
              </div>
            </div>
          </div>

          {!isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Batch */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Graduating Batch</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    value={batch} 
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="2024" 
                  />
                </div>
              </div>

              {/* Course */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Degree / Course</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="BTech / MBA" 
                  />
                </div>
              </div>

              {/* Department */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Department</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={department} 
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Computer Science" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="field relative mb-6">
            <label>Professional Bio & Campus Background</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share a brief overview of your background, career interests, or areas you mentor in..."
              rows={3}
              className="w-full p-3.5 rounded-2xl border border-emerald-900 bg-white/95 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C347] transition-all resize-none shadow-inner"
            />
          </div>

          <button 
            type="submit" 
            className="w-full text-[#041D14] font-bold py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl text-base flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--gold-highlight)' }}
          >
            <CheckCircle2 className="w-5 h-5 text-[#041D14]" />
            Save Profile to LocalStorage
          </button>
        </form>

      </div>
    </div>
  );
}
