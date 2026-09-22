import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { adminStore } from '@/lib/adminStore';

export default function AlumniDashboard() {
  const context = useOutletContext<{ role?: string }>() || {};
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [metrics, setMetrics] = useState(adminStore.getDashboardMetrics());

  useEffect(() => {
    return adminStore.subscribe(() => {
      setCurrentUser(adminStore.getCurrentUser());
      setMetrics(adminStore.getDashboardMetrics());
    });
  }, []);

  const effectiveRole = currentUser.role || context.role || 'alumni';
  const base = effectiveRole === 'student' ? '/student' : '/alumni';
  const isStudent = effectiveRole === 'student';

  const formattedFunds = metrics.totalFundsRaised >= 10000000
    ? `₹${(metrics.totalFundsRaised / 10000000).toFixed(1)} Cr`
    : `₹${(metrics.totalFundsRaised / 100000).toFixed(1)} Lakhs`;

  return (
    <div className="alumni-dashboard-container" style={{ background: 'var(--bg-deep-forest)', color: 'var(--text-cream)' }}>
      {/* SECTION A: SPLIT HERO */}
      <main className="hero-section">
        <div className="hero-container">
          <div className="hero-text-col">
            <div className="pill-badge">
              ✦ Institutional {isStudent ? 'Scholar' : 'Alumni'} Network
            </div>
            <h1 className="dashboard-hero-title">
              {isStudent ? (
                <>Accelerate Your Career with <em>Alumni Mentors.</em></>
              ) : (
                <>Empowering the Next Generation Through <em>Lifelong Connection.</em></>
              )}
            </h1>
            <p className="hero-subtext">
              {isStudent ? (
                `Welcome back, ${currentUser.fullName}! Connect with verified graduates, find exclusive campus job referrals, prepare for placement rounds, and join active university meetups.`
              ) : (
                `Welcome back, ${currentUser.fullName}! Mentor rising talent, share exclusive career openings from your organization, relive campus milestones, and give back to your alma mater.`
              )}
            </p>
            <div className="hero-cta-group">
              <Link to={`${base}/mentorship`} className="btn-primary-glow">
                {isStudent ? 'Find an Alumni Mentor ↗' : 'Explore Mentorship Requests ↗'}
              </Link>
              <Link to={`${base}/jobs`} className="btn-outline-glass">
                {isStudent ? 'Explore Campus Openings' : 'Post a Job or Internship'}
              </Link>
            </div>
            <div className="hero-footer-note mt-8 text-sm text-[#94a3b8]">
              <strong className="text-white block mb-1">Founded on tradition, driven by community.</strong>
              <p>Reconnecting {metrics.totalUsers}+ registered members across global chapters.</p>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="image-mask-frame">
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
          <h3>{metrics.verifiedUsers}+</h3>
          <p>Verified Alumni Worldwide</p>
        </div>
        <div className="stat-item">
          <h3>{metrics.activeMentorships}</h3>
          <p>Active 1-on-1 Mentorships</p>
        </div>
        <div className="stat-item">
          <h3>{metrics.totalOpportunities}</h3>
          <p>Campus Opportunities Posted</p>
        </div>
        <div className="stat-item">
          <h3>{formattedFunds}</h3>
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
            <p>From student matriculation to industry leadership.</p>
            <Link to={`${base}/events`} className="btn-outline-glass mt-3 inline-block text-xs py-1.5 px-3">
              View Upcoming Events ↗
            </Link>
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
            <Link to={`${base}/mentorship`} className="btn-primary-glow mt-4 text-center w-full justify-center">
              {isStudent ? 'Request Mentorship Guidance' : 'Review Mentorship Inquiries'}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION D: QUICK ACTION TILES */}
      <section className="quick-actions">
        <Link to={`${base}/events`} className="action-tile">
          <h4>Institutional Calendar</h4>
          <p>Register for campus reunions, virtual symposia, and batch meetups.</p>
        </Link>
        <Link to={`${base}/jobs`} className="action-tile">
          <h4>Career Exchange</h4>
          <p>Explore opportunities and share hiring referrals directly with students.</p>
        </Link>
        <Link to={`${base}/fundraising`} className="action-tile">
          <h4>Scholarship Giving</h4>
          <p>Support student scholarship funds and makerspace infrastructure drives.</p>
        </Link>
      </section>
    </div>
  );
}
