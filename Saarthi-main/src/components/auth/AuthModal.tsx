import React, { useState } from 'react';
import './auth-blade.css';

type AuthMode = 'signin' | 'signup';
type Role = 'student' | 'alumni' | 'admin';

export default function AuthModal() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [role, setRole] = useState<Role>('student');

  const handleRoleChange = (newRole: Role) => setRole(newRole);

  const toggleAuthMode = (targetMode: AuthMode) => {
    setMode(targetMode);
  };

  return (
    <div className="auth_container font-sans">
      {/* Role Selector Switcher */}
      <div className="role_switch_group">
        {(['student', 'alumni', 'admin'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            className={`role_chip ${role === r ? 'active' : ''}`}
            onClick={() => handleRoleChange(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="auth_card" id="authCard" data-mode={mode}>
        {/* Left Pane: Sign In Form */}
        <div
          className="card_pane pane_signin"
          id="paneSignIn"
          style={{ opacity: mode === 'signin' ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: mode === 'signin' ? 'auto' : 'none' }}
        >
          <div className="pane_content">
            <h2 className="form_title">Sign in to Saarthi</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input_field">
                <label>Username or email</label>
                <div className="input_wrap">
                  <input type="text" placeholder="name@domain.edu" required />
                  <svg className="field_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              </div>
              <div className="input_field">
                <label>Password</label>
                <div className="input_wrap">
                  <input type="password" placeholder="••••••••" required />
                  <svg className="field_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
              <div className="form_meta">
                <label className="checkbox_label">
                  <input type="checkbox" defaultChecked /> Keep me signed in
                </label>
                <a href="#forgot" className="link_muted">Forgot password?</a>
              </div>
              <button type="submit" className="btn_emerald_solid">Sign in</button>
            </form>
            <p className="switch_prompt">
              New to Saarthi?{' '}
              <button type="button" className="btn_link_bold" onClick={() => toggleAuthMode('signup')}>
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Right Pane: Sign Up Form */}
        <div
          className="card_pane pane_signup"
          id="paneSignUp"
          style={{ opacity: mode === 'signup' ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: mode === 'signup' ? 'auto' : 'none' }}
        >
          <div className="pane_content">
            <h2 className="form_title">Create Account</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid_2_col">
                <div className="input_field"><label>Full Name</label><input type="text" placeholder="Aarav Sharma" required /></div>
                <div className="input_field"><label>Email</label><input type="email" placeholder="aarav@alumni.edu" required /></div>
              </div>
              <div className="grid_2_col">
                <div className="input_field"><label>Phone</label><input type="tel" placeholder="+91 98765 43210" required /></div>
                <div className="input_field"><label>City</label><input type="text" placeholder="Raipur" required /></div>
              </div>
              <div className="grid_3_col">
                <div className="input_field"><label>Course</label><input type="text" placeholder="B.Tech" required /></div>
                <div className="input_field"><label>Department</label><input type="text" placeholder="CSE" required /></div>
                <div className="input_field"><label>Batch</label><input type="number" placeholder="2024" required /></div>
              </div>
              <div className="input_field"><label>Create Password</label><input type="password" placeholder="Min. 8 characters" required /></div>
              <p className="notice_text">Notice: Registration requires Administrator review before verification.</p>
              <button type="submit" className="btn_emerald_solid">Register to Saarthi</button>
            </form>
            <p className="switch_prompt">
              Already have an account?{' '}
              <button type="button" className="btn_link_bold" onClick={() => toggleAuthMode('signin')}>
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* The Animated Skew Blade Overlay */}
        <div className="auth_band" id="authBand">
          <span className="band_edge band_edge--lead"></span>
          <div className="band_inner">
            <div className="band_page band_page--signin">
              <span className="brand_micro">SAARTHI</span>
              <h3 className="welcome_title">Welcome <em>back.</em></h3>
              <p className="welcome_sub">Your batches, alumni mentors, and opportunities are waiting right where you left them.</p>
            </div>
            <div className="band_page band_page--signup">
              <span className="brand_micro">JOIN THE CIRCLE</span>
              <h3 className="welcome_title">Begin your <em>journey.</em></h3>
              <p className="welcome_sub">Connect with verified institutional alumni and launch your career milestones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
