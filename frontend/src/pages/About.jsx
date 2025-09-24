// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

// Import placeholder images (you'll replace these with actual images)
import aboutHero from '../assets/images/about-hero.jpg';
import historyTimeline from '../assets/images/history-timeline.jpg';
import ourValues from '../assets/images/our-values.jpg';
import teamPhoto from '../assets/images/team-photo.jpg';

const About = () => {
  return (
    <div className="about-page">
      {/* Navigation Header (same as Home page) */}
      <header className="about-header">
        <nav className="about-nav">
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
            <Link to="/about" className="active">About Us</Link>
            <Link to="/branches">Our Branches</Link>
            <Link to="/leadership">Leadership</Link>
            <Link to="/membership">Membership</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="nav-link">Member Login</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About NationalOrg</h1>
            <p className="hero-subtitle">
              For over 50 years, we've been dedicated to building stronger communities 
              through organized leadership and collective action.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 1974, NationalOrg began as a small community initiative with a big vision: 
                to create a nationwide network of leaders committed to positive change. What started 
                as a local movement has grown into a national organization with 25 branches and 
                over 10,000 active members.
              </p>
              <p>
                Our journey has been marked by significant milestones - from establishing our first 
                branch in 1980 to launching our national leadership program in 1995. Through decades 
                of service, we've remained true to our founding principles while adapting to meet 
                the evolving needs of our communities.
              </p>
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Years of Service</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">25</span>
                  <span className="stat-label">Branches Nationwide</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Active Members</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Community Projects</span>
                </div>
              </div>
            </div>
            <div className="story-visual">
              <div className="photo-placeholder large">
                <span>📜 Our Historical Journey</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mission">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To empower communities through organized leadership, fostering sustainable development, 
                and creating opportunities for meaningful engagement at all levels of society.
              </p>
              <ul>
                <li>Promote community-led development initiatives</li>
                <li>Develop leadership capabilities across generations</li>
                <li>Facilitate cross-sector collaboration</li>
                <li>Advocate for positive social change</li>
              </ul>
            </div>
            
            <div className="mv-card vision">
              <div className="mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>
                A nation where every community thrives through effective leadership, active citizen 
                participation, and sustainable development practices that create lasting positive impact.
              </p>
              <ul>
                <li>Nationwide network of empowered communities</li>
                <li>Intergenerational leadership pipeline</li>
                <li>Sustainable community development models</li>
                <li>Inclusive growth and opportunity for all</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide our actions and decisions</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Collaboration</h4>
              <p>We believe in the power of working together across boundaries to achieve common goals.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h4>Excellence</h4>
              <p>We strive for the highest standards in all our initiatives and operations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h4>Sustainability</h4>
              <p>We commit to long-term solutions that benefit both current and future generations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h4>Inclusion</h4>
              <p>We embrace diversity and ensure all voices are heard and valued.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h4>Innovation</h4>
              <p>We continuously seek new and better ways to serve our communities.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h4>Integrity</h4>
              <p>We maintain the highest ethical standards in all our dealings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey Through Time</h2>
            <p>Key milestones in our organization's history</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1974</div>
              <div className="timeline-content">
                <h4>Foundation Established</h4>
                <p>NationalOrg founded by community leaders with a vision for nationwide impact</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1980</div>
              <div className="timeline-content">
                <h4>First Branch Launched</h4>
                <p>Expanded beyond headquarters with our first regional branch</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1995</div>
              <div className="timeline-content">
                <h4>Leadership Program</h4>
                <p>Launched national leadership development program</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2005</div>
              <div className="timeline-content">
                <h4>National Recognition</h4>
                <p>Received national award for community development excellence</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2015</div>
              <div className="timeline-content">
                <h4>Digital Transformation</h4>
                <p>Implemented member portal and digital management systems</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h4>50th Anniversary</h4>
                <p>Celebrating 50 years of community service and leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-content">
            <div className="impact-text">
              <h2>Our National Impact</h2>
              <p>
                Through decades of dedicated service, NationalOrg has made significant contributions 
                to communities across the nation. Our work touches lives and creates lasting change.
              </p>
              <div className="impact-stats">
                <div className="impact-stat">
                  <span className="impact-number">250+</span>
                  <span className="impact-label">Communities Served</span>
                </div>
                <div className="impact-stat">
                  <span className="impact-number">5,000+</span>
                  <span className="impact-label">Leaders Trained</span>
                </div>
                <div className="impact-stat">
                  <span className="impact-number">$10M+</span>
                  <span className="impact-label">Community Investment</span>
                </div>
              </div>
            </div>
            <div className="impact-visual">
              <div className="photo-placeholder large">
                <span>🌍 Our National Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="team-preview">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Leadership</h2>
            <p>Dedicated professionals guiding our organization forward</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder small">
                  <span>👨‍💼</span>
                </div>
              </div>
              <h4>National Chairperson</h4>
              <p>Leading our national strategy and vision</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder small">
                  <span>👩‍💼</span>
                </div>
              </div>
              <h4>Executive Director</h4>
              <p>Overseeing daily operations and management</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder small">
                  <span>👨‍🎓</span>
                </div>
              </div>
              <h4>Program Director</h4>
              <p>Managing community initiatives and programs</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder small">
                  <span>👩‍💻</span>
                </div>
              </div>
              <h4>Branch Coordinator</h4>
              <p>Supporting our nationwide branch network</p>
            </div>
          </div>
          <div className="team-cta">
            <Link to="/leadership" className="btn btn-primary">
              View Full Leadership Team
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Become part of our story and help us build stronger communities for the next 50 years.
            </p>
            <div className="cta-actions">
              <Link to="/membership" className="btn btn-primary btn-large">
                Learn About Membership
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (same as Home page) */}
      <footer className="about-footer">
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

export default About;