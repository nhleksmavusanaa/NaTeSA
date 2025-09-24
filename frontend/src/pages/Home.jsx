// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/home.css';

// Import placeholder images (you'll replace these with actual images)
import organizationHero from '../assets/images/org-hero.jpg';
import teamMeeting from '../assets/images/team-meeting.jpg';
import branchNetwork from '../assets/images/branch-network.jpg';
import adminDashboard from '../assets/images/admin-dashboard.jpg';
import necMeeting from '../assets/images/nec-meeting.jpg';
import becEvent from '../assets/images/bec-event.jpg';
import memberActivities from '../assets/images/member-activities.jpg';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="home-page">
      {/* Navigation Header */}
      <header className="home-header">
        <nav className="home-nav">
          <div className="nav-brand">
            <Link to="/">
              <div className="logo">
                <span className="logo-icon">🏛️</span>
                NationalOrg
              </div>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/branches">Our Branches</Link>
            <Link to="/leadership">Leadership</Link>
            <Link to="/membership">Membership</Link>
            <Link to="/contact">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-button">Member Portal</Link>
                <button onClick={logout} className="nav-button logout-btn">
                  Logout
                </button>
                <span className="user-greeting">Welcome, {user?.name}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Member Login</Link>
                <Link to="/register" className="nav-button primary">Join Our Organization</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Building Stronger Communities Through Organized Leadership
            </h1>
            <p className="hero-subtitle">
              Welcome to NationalOrg - where dedicated administrators, NEC members, BEC leaders, 
              and active members work together to create meaningful impact across our nation.
            </p>
            
            <div className="hero-actions">
              {isAuthenticated ? (
                <div className="auth-actions">
                  <Link to="/dashboard" className="btn btn-primary btn-large">
                    Access Member Portal
                  </Link>
                  <Link to="/profile" className="btn btn-secondary">
                    My Profile
                  </Link>
                </div>
              ) : (
                <div className="guest-actions">
                  <Link to="/register" className="btn btn-primary btn-large">
                    Become a Member
                  </Link>
                  <Link to="/about" className="btn btn-secondary">
                    Learn About Us
                  </Link>
                </div>
              )}
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Years Serving</span>
              </div>
              <div className="stat">
                <span className="stat-number">25</span>
                <span className="stat-label">Branches Nationwide</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Members</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="organization-photo">
              <div className="photo-placeholder">
                <span>🏛️ Organization Headquarters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission & Vision</h2>
              <p>
                For over 50 years, NationalOrg has been dedicated to fostering community development, 
                promoting leadership excellence, and creating opportunities for meaningful engagement 
                across all levels of our organization.
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <span className="point-icon">🌟</span>
                  <h4>Community Development</h4>
                  <p>Empowering local communities through organized initiatives and programs</p>
                </div>
                <div className="mission-point">
                  <span className="point-icon">👥</span>
                  <h4>Leadership Growth</h4>
                  <p>Nurturing future leaders through structured mentorship and training</p>
                </div>
                <div className="mission-point">
                  <span className="point-icon">🌍</span>
                  <h4>National Impact</h4>
                  <p>Creating positive change at local, regional, and national levels</p>
                </div>
              </div>
            </div>
            <div className="mission-photo">
              <div className="photo-placeholder large">
                <span>📸 Our Team in Action</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Structure Section */}
      <section className="structure-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Organizational Structure</h2>
            <p>A well-defined leadership hierarchy ensuring effective governance and member representation</p>
          </div>
          
          <div className="structure-grid">
            <div className="structure-level national">
              <div className="level-header">
                <h3>National Executive Committee (NEC)</h3>
                <span className="level-badge">National Leadership</span>
              </div>
              <div className="level-content">
                <div className="level-photo">
                  <div className="photo-placeholder">
                    <span>⚡ NEC Leadership Team</span>
                  </div>
                </div>
                <div className="level-responsibilities">
                  <h4>Key Responsibilities:</h4>
                  <ul>
                    <li>National strategy and policy development</li>
                    <li>Oversight of all branch operations</li>
                    <li>National-level decision making</li>
                    <li>Inter-organizational relations</li>
                    <li>Annual general meeting planning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="structure-level branch">
              <div className="level-header">
                <h3>Branch Executive Committees (BEC)</h3>
                <span className="level-badge">Regional Leadership</span>
              </div>
              <div className="level-content">
                <div className="level-photo">
                  <div className="photo-placeholder">
                    <span>🏢 Branch Leadership</span>
                  </div>
                </div>
                <div className="level-responsibilities">
                  <h4>Key Responsibilities:</h4>
                  <ul>
                    <li>Local branch management and operations</li>
                    <li>Member recruitment and engagement</li>
                    <li>Community outreach programs</li>
                    <li>Local event coordination</li>
                    <li>Branch-level reporting to NEC</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="structure-level members">
              <div className="level-header">
                <h3>General Membership</h3>
                <span className="level-badge">Foundation of Our Organization</span>
              </div>
              <div className="level-content">
                <div className="level-photo">
                  <div className="photo-placeholder">
                    <span>👥 Our Members</span>
                  </div>
                </div>
                <div className="level-responsibilities">
                  <h4>Member Activities:</h4>
                  <ul>
                    <li>Participate in organizational events</li>
                    <li>Community service initiatives</li>
                    <li>Leadership development programs</li>
                    <li>Networking opportunities</li>
                    <li>Voting in organizational matters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="roles-section">
        <div className="container">
          <div className="section-header">
            <h2>Member Portal Access Levels</h2>
            <p>Our secure online portal provides tailored experiences based on your role within the organization</p>
          </div>
          
          <div className="roles-grid">
            <div className="role-card admin-role">
              <div className="role-header">
                <div className="role-icon">👑</div>
                <div className="role-info">
                  <h3>System Administrators</h3>
                  <span className="role-type">Technical Management</span>
                </div>
              </div>
              <div className="role-photo">
                <div className="photo-placeholder small">
                  <span>🔧 Admin Tools</span>
                </div>
              </div>
              <ul className="role-features">
                <li>Full system configuration and maintenance</li>
                <li>User account management and security</li>
                <li>Database management and backups</li>
                <li>System analytics and reporting</li>
                <li>Technical support coordination</li>
              </ul>
              <div className="role-cta">
                <span className="role-access">Full System Access</span>
              </div>
            </div>
            
            <div className="role-card nec-role">
              <div className="role-header">
                <div className="role-icon">⚡</div>
                <div className="role-info">
                  <h3>NEC Members</h3>
                  <span className="role-type">National Leadership</span>
                </div>
              </div>
              <div className="role-photo">
                <div className="photo-placeholder small">
                  <span>📊 National Overview</span>
                </div>
              </div>
              <ul className="role-features">
                <li>National membership overview</li>
                <li>Branch performance monitoring</li>
                <li>Strategic decision-making tools</li>
                <li>National event planning</li>
                <li>Executive reporting dashboards</li>
              </ul>
              <div className="role-cta">
                <span className="role-access">Executive Portal</span>
              </div>
            </div>
            
            <div className="role-card bec-role">
              <div className="role-header">
                <div className="role-icon">🏢</div>
                <div className="role-info">
                  <h3>BEC Members</h3>
                  <span className="role-type">Branch Leadership</span>
                </div>
              </div>
              <div className="role-photo">
                <div className="photo-placeholder small">
                  <span>📍 Branch Management</span>
                </div>
              </div>
              <ul className="role-features">
                <li>Branch member management</li>
                <li>Local event coordination</li>
                <li>Branch reporting tools</li>
                <li>Member communication systems</li>
                <li>Local resource management</li>
              </ul>
              <div className="role-cta">
                <span className="role-access">Branch Portal</span>
              </div>
            </div>
            
            <div className="role-card member-role">
              <div className="role-header">
                <div className="role-icon">👍</div>
                <div className="role-info">
                  <h3>General Members</h3>
                  <span className="role-type">Organization Foundation</span>
                </div>
              </div>
              <div className="role-photo">
                <div className="photo-placeholder small">
                  <span>🤝 Member Network</span>
                </div>
              </div>
              <ul className="role-features">
                <li>Personal profile management</li>
                <li>Event registration and calendar</li>
                <li>Member directory access</li>
                <li>Resource library</li>
                <li>Communication forums</li>
              </ul>
              <div className="role-cta">
                <span className="role-access">Member Portal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Organization in Action</h2>
            <p>See how our members are making a difference across the nation</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="photo-placeholder gallery">
                <span>🎉 Annual Conference</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="photo-placeholder gallery">
                <span>🏆 Awards Ceremony</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="photo-placeholder gallery">
                <span>🌱 Community Project</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="photo-placeholder gallery">
                <span>🎓 Leadership Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Join Our Mission?</h2>
              <p>Become part of a legacy that's been building stronger communities for over 50 years</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-large">
                  Apply for Membership
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="logo-icon">🏛️</span>
                NationalOrg
              </div>
              <p>Building stronger communities through organized leadership since 1974.</p>
              <div className="contact-info">
                <p>📞 (555) 123-ORG1</p>
                <p>✉️ info@nationalorg.org</p>
                <p>🏛️ 123 Leadership Avenue, Capital City</p>
              </div>
            </div>
            <div className="footer-section">
              <h5>Our Organization</h5>
              <Link to="/about">About Us</Link>
              <Link to="/leadership">Our Leadership</Link>
              <Link to="/branches">Branch Network</Link>
              <Link to="/history">Our History</Link>
            </div>
            <div className="footer-section">
              <h5>Get Involved</h5>
              <Link to="/membership">Membership</Link>
              <Link to="/volunteer">Volunteer</Link>
              <Link to="/events">Events</Link>
              <Link to="/donate">Support Us</Link>
            </div>
            <div className="footer-section">
              <h5>Member Resources</h5>
              <Link to="/login">Member Login</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/news">News & Updates</Link>
              <Link to="/help">Help Center</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 1974-2024 NationalOrg. All rights reserved. | Building Community, Developing Leaders</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;