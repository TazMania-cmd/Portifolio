import React from 'react';

export const AuroraBackground = () => (
  <div className="aurora-container">
    <div className="blob blob-1"></div>
    <div className="blob blob-2"></div>
    <div className="blob blob-3"></div>
  </div>
);

export const Sidebar = () => {
  const skills = ["Figma", "UI/UX", "Motion", "Strategy", "Web Design"];
  return (
    <aside className="sidebar">
      <div className="profile-card glass">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
          alt="Alex Rivers"
          className="profile-img"
        />
        <h2 className="profile-name">Gabriel Wilson.</h2>
        <p className="profile-role">UI/UX Designer</p>
        <p className="profile-role" style={{ fontSize: '0.8rem' }}>Brazil-based UI/UX Designer</p>

        <div style={{ textAlign: 'left', marginTop: '24px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>Skills</p>
          <div className="skill-tags">
            {skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export const ProjectCard = ({ title, description, image, featured }) => (
  <div className={`project-card glass ${featured ? 'featured' : ''}`}>
    <div className="project-img" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
    <div className="project-info">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>
      <button className="btn-view">View Project</button>
    </div>
  </div>
);
