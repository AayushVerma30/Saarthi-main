import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminStore } from '@/lib/adminStore';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const [email, setEmail] = useState('admin@saarthi.edu');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.login(email.trim() || 'admin@saarthi.edu', 'admin', password);
    navigate('/admin/home');
  };

  return (
    <div className="auth-viewport">
      <div className="auth-container" data-view="signin">
        
        {/* FORMS LAYER */}
        <div className="forms-wrapper">
          
          {/* SIGN IN FORM */}
          <div className="form-panel form-signin">
            <h2 className="title">Sign in as Admin</h2>

            <div className="mb-4">
              <span className="inline-block text-[0.75rem] px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 font-semibold rounded-full">
                🔒 Institutional Administrative Portal
              </span>
            </div>

            <form className="actual-form" onSubmit={handleLogin}>
              <div className="field relative">
                <label>Admin Email</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    placeholder="admin@saarthi.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                </div>
              </div>
              <div className="field relative">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showSigninPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="input-icon" 
                    onClick={() => setShowSigninPassword(!showSigninPassword)}
                  >
                    {showSigninPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="meta-row" style={{ gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> Remember Admin Session
                </label>
              </div>
              <button type="submit" className="submit-action">Sign in as Admin</button>
            </form>

            <div className="bottom-links">
              <p className="bottom-cta">
                <Link to="/" className="link-btn golden-underline">Back to Student / Alumni Login</Link>
              </p>
            </div>
          </div>

        </div>

        {/* SLIDING EMERALD OVERLAY */}
        <div className="sliding-overlay">
          <div className="overlay-track">
            
            <div className="overlay-panel overlay-signin-text">
              <div className="blade-brand-lockup">
                <div className="blade-icon-frame">
                  <img 
                    src="/logo-auth.png" 
                    alt="Saarthi Emblem" 
                    className="blade-chariot-scaled" 
                  />
                </div>
                <span className="blade-brand-title">Saarthi</span>
              </div>
              <h3 className="hero-title">Welcome back, <em>Admin.</em></h3>
              <p className="hero-desc">Access your institutional dashboard to verify accounts, monitor active events, and manage reports.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
