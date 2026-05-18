const skills = [
  { name: 'TypeScript', mark: 'TS' },
  { name: 'React', mark: 'R' },
  { name: 'Next.js', mark: 'N' },
  { name: 'Tailwind', mark: 'TW' },
  { name: 'Framer Motion', mark: 'FM' },
  { name: 'MySQL', mark: 'DB' },
];

const services = [
  {
    title: 'Landing pages',
    description: 'Paginas responsivas, rapidas e focadas em conversao.',
    icon: 'LP',
  },
  {
    title: 'Interfaces React',
    description: 'Componentes reutilizaveis, estados claros e UI moderna.',
    icon: 'RX',
  },
  {
    title: 'Portifolios',
    description: 'Apresentacao profissional para devs, designers e projetos.',
    icon: 'PF',
  },
  {
    title: 'Dashboards',
    description: 'Telas organizadas para dados, listas, filtros e acoes.',
    icon: 'DB',
  },
];

const experience = [
  {
    period: 'Atual',
    title: 'Projetos pessoais e portfolio',
    description: 'Criacao de interfaces com React, consumo de APIs e publicacao de projetos no GitHub.',
  },
  {
    period: 'Estudos',
    title: 'Front-end moderno',
    description: 'Pratica com TypeScript, Next.js, Tailwind, responsividade, componentes e boas praticas de UI.',
  },
  {
    period: 'Freelas',
    title: 'Paginas e ajustes visuais',
    description: 'Construcao de telas, melhorias de layout, glassmorfismo e refinamento de experiencia.',
  },
];

export const AuroraBackground = () => (
  <div className="aurora-container dark-glass-bg">
    <div className="orb orb-1"></div>
    <div className="orb orb-2"></div>
    <div className="orb orb-3"></div>
    <div className="orb orb-4"></div>
    <div className="ambient-grid"></div>
  </div>
);

export const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="section-header">
    <p className="section-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export const SkillShowcase = () => (
  <div className="skill-showcase glass notranslate" translate="no">
    {skills.map((skill) => (
      <div className="skill-tile" key={skill.name}>
        <span>{skill.mark}</span>
        <p>{skill.name}</p>
      </div>
    ))}
  </div>
);

export const Sidebar = ({ user }) => (
  <aside className="sidebar">
    <div className="profile-card glass">
      <a href={user.html_url} target="_blank" rel="noreferrer" className="profile-link">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="profile-img"
        />
      </a>
      <h2 className="profile-name">{user.name || user.login}</h2>
      <p className="profile-role">Front-end Developer</p>
      <p className="profile-role" style={{ fontSize: '0.8rem' }}>{user.bio || 'Desenvolvedor front-end focado em interfaces modernas.'}</p>

      <div style={{ textAlign: 'left', marginTop: '24px' }} className="notranslate" translate="no">
        <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>Skills</p>
        <div className="skill-tags" translate="no">
          {skills.map((skill) => (
            <span key={skill.name} className="skill-tag notranslate" translate="no">{skill.name}</span>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

export const ServicesSection = () => (
  <section className="services-section reveal" id="services">
    <SectionHeader
      eyebrow="Servicos"
      title="O que posso construir."
      description="Solucoes front-end para apresentar, validar e evoluir produtos digitais."
    />
    <div className="services-grid">
      {services.map((service) => (
        <article className="service-card glass" key={service.title}>
          <span className="service-icon">{service.icon}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export const ExperienceSection = () => (
  <section className="experience-section reveal" id="experience">
    <SectionHeader
      eyebrow="Experiencia"
      title="Evolucao pratica em projetos reais."
      description="Uma linha do tempo simples para mostrar estudo aplicado, projetos e entregas."
    />
    <div className="timeline glass">
      {experience.map((item) => (
        <article className="timeline-item" key={item.title}>
          <span>{item.period}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export const ProjectCard = ({
  title,
  description,
  featured,
  projectUrl,
  repoUrl,
  hasProjectLink,
  language,
  stars,
  updatedAt,
  topics,
  category,
  role,
  stack,
  caseStudy,
}) => {
  const updatedDate = updatedAt
    ? new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(new Date(updatedAt))
    : 'GitHub';
  const projectInitials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  const coverStack = stack.length ? stack.slice(0, 3) : [language];

  return (
    <article className={`project-card glass ${featured ? 'featured' : ''}`}>
      <div className="project-cover">
        <span className={`project-status ${hasProjectLink ? 'is-live' : ''}`}>
          {hasProjectLink ? 'Online' : 'Codigo'}
        </span>
        <div className="project-cover-mark notranslate" translate="no">{projectInitials}</div>
        <div className="project-cover-content">
          <p>{category}</p>
          <h4>{title}</h4>
          <div className="project-cover-stack notranslate" translate="no">
            {coverStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="project-info">
        <div className="project-heading-row">
          <span className="project-category">{category}</span>
          {featured && <span className="featured-label">Destaque</span>}
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <p className="project-role">{role}</p>
        <div className="repo-meta">
          <span>{language}</span>
          <span>{stars} estrelas</span>
          <span>Atualizado {updatedDate}</span>
        </div>
        {!!stack.length && (
          <div className="stack-list notranslate" translate="no">
            {stack.slice(0, 5).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
        {!!topics.length && (
          <div className="topic-list">
            {topics.slice(0, 3).map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        )}
        {featured && caseStudy && (
          <div className="case-summary">
            <div>
              <span>Problema</span>
              <p>{caseStudy.problem}</p>
            </div>
            <div>
              <span>Solucao</span>
              <p>{caseStudy.solution}</p>
            </div>
            <div>
              <span>Resultado</span>
              <p>{caseStudy.result}</p>
            </div>
          </div>
        )}
        <div className="project-actions">
          <a className="btn-view" href={projectUrl} target="_blank" rel="noreferrer">
            {hasProjectLink ? 'Abrir projeto' : 'Ver repositorio'}
          </a>
          {hasProjectLink && (
            <a className="btn-source" href={repoUrl} target="_blank" rel="noreferrer">
              Ver codigo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const ContactSection = ({ links, githubUser }) => (
  <section className="contact-section reveal" id="contact">
    <div className="contact-card glass">
      <SectionHeader
        eyebrow="Contato"
        title="Vamos construir algo bem apresentado."
        description="Use os links abaixo para falar comigo ou acessar meus projetos."
      />
      <div className="contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span>{link.label}</span>
            <strong>{link.value}</strong>
          </a>
        ))}
      </div>
      <a className="btn-primary contact-main-action" href={githubUser.html_url} target="_blank" rel="noreferrer">
        Ver GitHub
      </a>
    </div>
  </section>
);
