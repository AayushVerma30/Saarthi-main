import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function ProfilePage() {
  const { role } = useOutletContext<{ role?: string }>() || { role: 'alumni' };
  const isAdmin = role === 'admin';
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] overflow-hidden py-4 px-4">
      <div className={`w-full ${isAdmin ? 'max-w-2xl' : 'max-w-4xl'} bg-[var(--emerald-card)] rounded-[3.5rem] p-8 relative profile-card flex flex-col`}>
        
        {/* Role Badge / Switch */}
        <h2 className="title" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--card-cream)' }}>
          {isAdmin ? 'Admin Profile' : 'Alumni Profile'}
        </h2>

        {/* Profile Picture Upload */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold mb-2" style={{ color: 'var(--card-cream)' }}>Profile Picture</label>
          <div className="flex items-center gap-6">
            <div 
              className="relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer"
              style={{ borderColor: 'var(--gold-highlight)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-6 h-6" style={{ color: 'var(--gold-highlight)' }} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold hover:underline" 
                style={{ color: 'var(--gold-highlight)' }}
              >
                Upload new image
              </button>
              <span className="text-xs text-slate-300">JPG, PNG, WEBP</span>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept=".jpg,.png,.webp" 
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Edit Form */}
        <form className="actual-form" onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Full Name - Hidden for Admin */}
            {!isAdmin && (
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Full Name</label>
                <div className="input-wrapper">
                  <input type="text" defaultValue="Tanvy Pandey" placeholder="Enter Your Name" />
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <input type="email" defaultValue={isAdmin ? "admin@saarthi.edu" : "tanvypandey@gmail.com"} placeholder="Enter Your Email" />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="field relative" style={{ marginBottom: 0 }}>
              <label>Password</label>
              <div className="input-wrapper">
                <input type={showPassword ? "text" : "password"} defaultValue="" placeholder="Min. 8 chars" />
                <button type="button" className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Number - Hidden for Admin */}
            {!isAdmin && (
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <input type="text" defaultValue="" placeholder="+91 9876543210" />
                </div>
              </div>
            )}
          </div>

          {!isAdmin && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Batch */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Batch</label>
                <div className="input-wrapper">
                  <input type="text" defaultValue="" placeholder="2023" />
                </div>
              </div>

              {/* Course */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Course</label>
                <div className="input-wrapper">
                  <input type="text" defaultValue="" placeholder="BTech" />
                </div>
              </div>

              {/* Department */}
              <div className="field relative" style={{ marginBottom: 0 }}>
                <label>Department</label>
                <div className="input-wrapper">
                  <input type="text" defaultValue="" placeholder="CSE" />
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full text-white font-bold py-3 rounded-xl transition-all"
            style={{ backgroundColor: 'var(--bg-deep-forest)' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--gold-highlight)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-deep-forest)'}
          >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
}
