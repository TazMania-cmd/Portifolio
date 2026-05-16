import React from 'react';
import Navbar from './components/Navbar';
import { AuroraBackground, Sidebar, ProjectCard } from './components/VisualElements';

function App() {
  const projects = [
    {
      title: "SYNTHESIS OS - UI/UX DESIGN",
      description: "A comprehensive UI system for next-gen smart devices, focusing on accessibility and seamless interaction.",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop",
      featured: true
    },
    {
      title: "AETHER PLATFORM - WEB DESIGN",
      description: "Responsive web experience for a decentralized cloud service.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
      featured: false
    },
    {
      title: "NEBULA MOBILE APP",
      description: "FinTech app UI with data visualization and glassmorphism.",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop",
      featured: false
    },
    {
      title: "DIGITAL AGENCY PORTFOLIO",
      description: "Award-winning design for a creative studio.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
      featured: false
    }
  ];

  return (
    <div className="app-container">
      <AuroraBackground />
      <Navbar />

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Crafting Futuristic<br />
            Digital Experiences
          </h1>
          <p className="hero-subtitle">
            Award-Winning UI/UX Designer specialized in creating elegant,
            intuitive, and innovative digital interfaces for global brands.
          </p>
        </section>

        <section className="portfolio-layout">
          <Sidebar />
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: '80px 0 40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <p>© 2026 Gabriel W. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default App;
