import React from 'react';
import { Link } from 'react-router-dom';

export default function AlumniDashboard() {
  return (
    <div className="alumni-dashboard-container" style={{ background: 'var(--bg-deep-forest)', color: 'var(--text-cream)' }}>
      {/* SECTION A: SPLIT HERO */}
      <main className="hero-section">
        <div className="hero-container">
          <div className="hero-text-col">
            <div className="pill-badge">✦ Institutional Alumni Network</div>
            <h1 className="dashboard-hero-title">Empowering the Next Generation Through <em>Lifelong Connection.</em></h1>
            <p className="hero-subtext">
              Saarthi bridges the gap between institutional graduates and ambitious students. 
              Mentor rising talent, share exclusive career openings, relive campus milestones, and give back to your alma mater.
            </p>
            <div className="hero-cta-group">
              <Link to="/mentorship" className="btn-primary-glow">Explore Mentorship Requests ↗</Link>
              <Link to="/opportunities" className="btn-outline-glass">Post a Job or Internship</Link>
            </div>
            <div className="hero-footer-note mt-8 text-sm text-[#94a3b8]">
              <strong className="text-white block mb-1">Founded on tradition, driven by community.</strong>
              <p>Reconnecting 12,000+ graduates across 38 global chapters.</p>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="image-mask-frame">
              {/* Using a high-quality Unsplash portrait placeholder as requested */}
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Alumni Portrait" 
                className="hero-img-clean" 
              />
            </div>
          </div>
        </div>
      </main>

      {/* SECTION B: ALUMNI IMPACT STATS MARQUEE */}
      <section className="stats-marquee">
        <div className="stat-item">
          <h3>12,500+</h3>
          <p>Verified Alumni Worldwide</p>
        </div>
        <div className="stat-item">
          <h3>450+</h3>
          <p>Active 1-on-1 Mentorships</p>
        </div>
        <div className="stat-item">
          <h3>1,280+</h3>
          <p>Campus Jobs Posted</p>
        </div>
        <div className="stat-item">
          <h3>₹2.4 Cr</h3>
          <p>Raised in Scholarship Funds</p>
        </div>
      </section>

      {/* SECTION C: COMMUNITY SHOWCASE GRID */}
      <section className="community-grid">
        <div className="showcase-card">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="Convocation Cap Toss" 
            className="showcase-img"
          />
          <div className="showcase-content">
            <span className="showcase-tag">Institutional Legacy</span>
            <h4>Celebrating milestones</h4>
            <p>Transitions from student life into industry leaders.</p>
          </div>
        </div>

        <div className="showcase-card">
          <img 
            src="https://images.unsplash.com/photo-1523580846011-d3a5ce25c59a?q=80&w=2070&auto=format&fit=crop" 
            alt="Group Mentorship" 
            className="showcase-img"
          />
          <div className="showcase-content">
            <span className="showcase-tag">Mentorship Spotlight</span>
            <h4>Guide Tomorrow's Engineers & Leaders.</h4>
            <Link to="/mentorship" className="btn-primary-glow mt-4 text-center w-full justify-center">Accept Mentorship Invites (3 Pending)</Link>
          </div>
        </div>
      </section>

      {/* SECTION D: QUICK ACTION TILES */}
      <section className="quick-actions">
        <Link to="/events" className="action-tile">
          <h4>Host an Alumni Event</h4>
          <p>Register campus reunions, virtual webinars, and batch meetups.</p>
        </Link>
        <Link to="/opportunities" className="action-tile">
          <h4>Career Exchange</h4>
          <p>Share hiring referrals and internship roles directly with students.</p>
        </Link>
        <Link to="/giving" className="action-tile">
          <h4>Scholarship Giving</h4>
          <p>Support the Student Support and Infrastructure Development campaigns.</p>
        </Link>
      </section>
    </div>
  );
}
