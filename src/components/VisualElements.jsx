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
    title: 'Landing pages premium',
    description: 'Páginas objetivas para apresentar uma oferta, gerar confiança e facilitar pedidos de orçamento.',
    icon: 'LP',
  },
  {
    title: 'Sites institucionais',
    description: 'Sites claros para empresas locais, serviços e marcas que precisam transmitir profissionalismo.',
    icon: 'SI',
  },
  {
    title: 'Design responsivo',
    description: 'Layouts preparados para celular, tablet e desktop, com leitura fácil e botões acessíveis.',
    icon: 'DR',
  },
  {
    title: 'WhatsApp integrado',
    description: 'Chamadas de contato posicionadas nos pontos certos para reduzir atrito entre visita e conversa.',
    icon: 'WA',
  },
  {
    title: 'Interfaces modernas',
    description: 'Experiências visuais limpas, atuais e coerentes com a percepção que sua empresa quer passar.',
    icon: 'UI',
  },
  {
    title: 'Experiência mobile',
    description: 'Ajustes de hierarquia, velocidade percebida e navegação para quem chega pelo smartphone.',
    icon: 'MB',
  },
];

const experience = [
  {
    period: 'Atual',
    title: 'Presença digital para negócios',
    description: 'Criação de páginas profissionais com foco em apresentação, responsividade e contato fácil.',
  },
  {
    period: 'Estudos',
    title: 'Front-end moderno aplicado',
    description: 'Prática constante com tecnologias atuais para entregar interfaces rápidas, organizadas e bem acabadas.',
  },
  {
    period: 'Freelas',
    title: 'Páginas e melhorias visuais',
    description: 'Construção de telas, refinamento de layout e ajustes que deixam a experiência mais clara para o cliente.',
  },
];

export const AuroraBackground = () => (
  <div className="aurora-container premium-bg">
    <div className="light-plane light-plane-1"></div>
    <div className="light-plane light-plane-2"></div>
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
      <p className="profile-role">Desenvolvedor web</p>
      <p className="profile-role" style={{ fontSize: '0.8rem' }}>{user.bio || 'Landing pages, sites responsivos e presença digital para negócios.'}</p>

      <div style={{ textAlign: 'left', marginTop: '24px' }} className="notranslate" translate="no">
        <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>Habilidades</p>
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
      eyebrow="Serviços"
      title="Serviços para melhorar sua presença online."
      description="Entrega enxuta, visual atual e foco no que importa para um negócio: ser encontrado, parecer profissional e receber contatos."
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
      eyebrow="Experiência"
      title="Evolução prática com foco em entrega."
      description="Trabalho com páginas objetivas, boa apresentação e detalhes de interface que melhoram a percepção do usuário."
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
  hideProjectButton,
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
          {hasProjectLink ? 'Online' : 'Conceito'}
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
          <span>{stars} favoritos</span>
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
              <span>Solução</span>
              <p>{caseStudy.solution}</p>
            </div>
            <div>
              <span>Resultado</span>
              <p>{caseStudy.result}</p>
            </div>
          </div>
        )}
        <div className="project-actions">
          {!hideProjectButton && (
            <a className="btn-view" href={projectUrl} target="_blank" rel="noreferrer">
              {hasProjectLink ? 'Abrir experiência' : 'Ver detalhes'}
            </a>
          )}
          {(hasProjectLink || hideProjectButton) && (
            <a className="btn-source" href={repoUrl} target="_blank" rel="noreferrer">
              Ver bastidores
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
        title="Pronto para deixar sua empresa melhor apresentada?"
        description="Me chame com uma ideia simples do que você precisa. Eu ajudo a transformar isso em uma página moderna, responsiva e direta para gerar contato."
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
        Ver base técnica
      </a>
    </div>
  </section>
);
