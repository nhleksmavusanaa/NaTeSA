// src/pages/About.jsx
import React, { useState } from "react";

const About = () => {
  const [leadersVisible, setLeadersVisible] = useState(false);

  const leaders = [
    { name: "Thabo Mthembu", role: "Chairperson" },
    { name: "Lindiwe Khumalo", role: "Deputy Chairperson" },
    { name: "Sanele Dlamini", role: "Secretary" },
    { name: "Zanele Ntuli", role: "Deputy Secretary" },
    { name: "Mxolisi Zulu", role: "Treasurer" },
    { name: "Nqobile Zungu", role: "Organizer" },
    { name: "Mlindeli Manzini", role: "Project Officer" },
    { name: "Fezile Mzobe", role: "Public Relations" },
    { name: "Senamile Zulu", role: "1st Additional Member" },
    { name: "Sthelo Dube", role: "2nd Additional Member" }
  ];

  const handleLoadLeadership = () => {
    setLeadersVisible(true);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8f9fa", color: "#333" }}>
      <header style={{ backgroundColor: "#006400", color: "white", padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>About NaTeSA</h1>
        <p style={{ fontSize: "18px" }}>Empowering Tertiary Students of the Nazareth Baptist Church EBuhleni</p>
      </header>

      <section style={{ padding: "40px 20px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#006400" }}>📚 Our Story</h2>
        <p>
          The <span style={{ fontWeight: "bold", color: "#444" }}>Nazareth Tertiary Students Association (NaTeSA)</span> is a non-profit organization formed in 2000. 
          It began through the unification of various student societies across South African tertiary institutions, all of which shared a common commitment to the spiritual and academic development of students within the <span style={{ fontWeight: "bold", color: "#444" }}>Nazareth Baptist Church EBuhleni</span>.
        </p>
        <p>
          Since its inception, NaTeSA has become a platform for unity, faith, education, and leadership — providing mentorship, organizing outreach programs, and cultivating a culture of excellence among its members.
        </p>
      </section>

      <section style={{ padding: "40px 20px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#006400" }}>🎯 Our Mission</h2>
        <p>
          At NaTeSA, we believe in <span style={{ fontWeight: "bold", color: "#444" }}>education as a powerful weapon against poverty</span>. Our mission is to inspire and uplift students by nurturing both their academic and spiritual growth — following the teachings and legacy of <span style={{ fontWeight: "bold", color: "#444" }}>Prophet Isaiah Shembe</span>.
        </p>
      </section>

      <section style={{ backgroundColor: "#e9f5ec", padding: "30px", borderRadius: "10px", marginTop: "20px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#006400" }}>👥 Leadership Team</h2>
        <p>Our leadership team is composed of dedicated and visionary students and alumni who serve the community with integrity and faith.</p>
        <button
          style={{
            backgroundColor: "#006400",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
          onClick={handleLoadLeadership}
        >
          📖 Read from Database
        </button>
        {leadersVisible && (
          <div style={{ marginTop: "20px" }}>
            <ul>
              {leaders.map((l, index) => (
                <li key={index}><strong>{l.name}</strong> – {l.role}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section style={{ padding: "40px 20px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#006400" }}>🏆 Our Achievements & Impact</h2>
        <p>Over the years, NaTeSA has proudly:</p>
        <ul style={{ marginTop: "15px", paddingLeft: "20px" }}>
          <li>Organized annual National Student Conferences and Leadership Retreats</li>
          <li>Launched mentorship programs for new tertiary students</li>
          <li>Created academic support groups and tutoring sessions</li>
          <li>Partnered with alumni to provide bursaries and scholarships</li>
          <li>Established spiritual growth seminars and worship programs</li>
        </ul>
      </section>

      <section style={{ padding: "40px 20px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#006400" }}>📸 Photo Gallery</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <img src="https://via.placeholder.com/300x200?text=Conference+2023" alt="Conference 2023" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
          <img src="https://i.imgur.com/YOUR_IMAGE.jpg" alt="Mentorship Program" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
          <img src="https://via.placeholder.com/300x200?text=Retreat+Weekend" alt="Retreat" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
          <img src="https://via.placeholder.com/300x200?text=Campus+Outreach" alt="Outreach" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#006400", color: "white" }}>
        &copy; 2025 NaTeSA – Nazareth Tertiary Students Association
      </footer>
    </div>
  );
};

export default About;
