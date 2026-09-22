import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [loginRole, setLoginRole] = useState<'alumni' | 'student'>('alumni');
  const [regRole, setRegRole] = useState<'alumni' | 'student'>('alumni');
  
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', loginRole);
    window.location.href = `/${loginRole}/home`;
  };

  return (
    <div className="auth-viewport">
      <div className="auth-container" id="authBox" data-view={view}>
        
        {/* FORMS LAYER (Underneath) */}
        <div className="forms-wrapper">
          
          {/* SIGN IN FORM (Always positioned in the Left Half) */}
          <div className="form-panel form-signin">
            <h2 className="title">Sign in</h2>
            <div className="role-switch">
              <button 
                type="button" 
                className={`role-btn ${loginRole === 'alumni' ? 'active' : ''}`}
                onClick={() => setLoginRole('alumni')}
              >
                Alumni
              </button>
              <button 
                type="button" 
                className={`role-btn ${loginRole === 'student' ? 'active' : ''}`}
                onClick={() => setLoginRole('student')}
              >
                Student
              </button>
            </div>

            <form className="actual-form" onSubmit={handleSignIn}>
              <div className="field relative">
                <label>Username or email</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Enter Your Email" required />
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
                  <input type="checkbox" defaultChecked /> Keep me signed in
                </label>
              </div>
              <button type="submit" className="submit-action">Sign in</button>
            </form>

            <div className="bottom-links">
              <p className="bottom-cta">
                New to Saarthi? <button type="button" className="link-btn golden-underline" onClick={() => setView('signup')}>Create an account</button>
              </p>
              <p className="bottom-cta mt-2">
                <Link to="/admin/login" className="link-btn golden-underline">Login as Admin</Link>
              </p>
            </div>
          </div>

          {/* CREATE ACCOUNT FORM (Always positioned in the Right Half) */}
          <div className="form-panel form-signup">
            <h2 className="title">Create account</h2>
            <div className="role-switch">
              <button 
                type="button" 
                className={`role-btn ${regRole === 'alumni' ? 'active' : ''}`}
                onClick={() => setRegRole('alumni')}
              >
                ALUMNI
              </button>
              <button 
                type="button" 
                className={`role-btn ${regRole === 'student' ? 'active' : ''}`}
                onClick={() => setRegRole('student')}
              >
                STUDENT
              </button>
            </div>

            <form className="actual-form" onSubmit={(e) => e.preventDefault()}>
              <div className="row-2">
                <div className="field relative">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="Enter Your Name" required />
                    <span className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                  </div>
                </div>
                <div className="field relative">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <input type="email" placeholder="Enter Your Email" required />
                    <span className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row-2">
                <div className="field relative">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <input 
                      type={showSignupPassword ? "text" : "password"} 
                      placeholder="Min. 8 chars" 
                      required 
                    />
                    <button 
                      type="button" 
                      className="input-icon" 
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="field"><label>Phone Number</label><input type="tel" placeholder="+91 9876543210" required /></div>
              </div>
              <div className="row-3">
                <div className="field"><label>Batch</label><input type="text" placeholder="2023" required /></div>
                <div className="field"><label>Course</label><input type="text" placeholder="BTech" required /></div>
                <div className="field"><label>Department</label><input type="text" placeholder="CSE" required /></div>
              </div>


              <button type="submit" className="submit-action">Register & Submit Verification</button>
            </form>

            <p className="bottom-cta">
              Already have an account? <button type="button" className="link-btn golden-underline" onClick={() => setView('signin')}>Sign in</button>
            </p>
          </div>

        </div>

        {/* SLIDING EMERALD OVERLAY (Moves on top without clipping text) */}
        <div className="sliding-overlay">
          <div className="overlay-track">
            
            {/* Visible when in Sign Up Mode (Left Side) */}
            <div className="overlay-panel overlay-signup-text">
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
              <h3 className="hero-title">Start Your <em>Journey.</em></h3>
              <p className="hero-desc">Join the institutional network, find mentors, and explore career milestones.</p>
            </div>

            {/* Visible when in Sign In Mode (Right Side) */}
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
              <h3 className="hero-title">Welcome <em>back.</em></h3>
              <p className="hero-desc">Your boards, your drafts and your people are exactly where you left them.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
