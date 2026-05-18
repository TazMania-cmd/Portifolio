import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import {
  AuroraBackground,
  ContactSection,
  ExperienceSection,
  ProjectCard,
  ServicesSection,
  Sidebar,
  SectionHeader,
  SkillShowcase,
} from './components/VisualElements';
import heroImage from './assets/hero.png';

const GITHUB_USERNAME = 'TazMania-cmd';
const GITHUB_CACHE_KEY = 'portfolio-github-data-v1';
const GITHUB_CACHE_TTL = 1000 * 60 * 30;
const FEATURED_REPOS = ['Portifolio', 'portfolio', 'portifolio'];
const HIDDEN_REPOS = ['test', 'teste', 'estudos-soltos'];
const PROJECT_FILTERS = ['Todos', 'Front-end', 'Landing Page', 'React', 'API', 'Full-stack'];

const PROJECT_DETAILS = {
  Portifolio: {
    title: 'Portfolio pessoal',
    description: 'Portfolio moderno com React, Vite, GitHub API, cards dinamicos e visual glassmorphism responsivo.',
    role: 'Front-end, UI Design, integracao com API',
    stack: ['React', 'Vite', 'CSS', 'GitHub API'],
    category: 'Front-end',
    priority: 100,
    caseStudy: {
      problem: 'Apresentar projetos reais com uma experiencia visual mais profissional.',
      solution: 'Criar uma interface responsiva que consome o GitHub e destaca links de deploy e codigo.',
      result: 'Portfolio mais curado, atualizado automaticamente e pronto para compartilhar.',
    },
  },
  portfolio: {
    title: 'Portfolio pessoal',
    category: 'Front-end',
    priority: 100,
  },
  portifolio: {
    title: 'Portfolio pessoal',
    category: 'Front-end',
    priority: 100,
  },
};

const fallbackUser = {
  name: 'Gabriel Wilson',
  login: GITHUB_USERNAME,
  avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
  bio: 'Desenvolvedor front-end focado em interfaces modernas.',
  html_url: `https://github.com/${GITHUB_USERNAME}`,
};

const contactLinks = [
  {
    label: 'GitHub',
    value: `github.com/${GITHUB_USERNAME}`,
    href: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    label: 'Email',
    value: 'Adicionar email',
    href: 'mailto:',
  },
  {
    label: 'LinkedIn',
    value: 'Adicionar LinkedIn',
    href: '#home',
  },
];

function inferProjectCategory(repo) {
  const values = [
    repo.name,
    repo.description || '',
    repo.language || '',
    ...(repo.topics || []),
  ].join(' ').toLowerCase();

  if (values.includes('api')) {
    return 'API';
  }

  if (values.includes('full') || values.includes('mysql') || values.includes('node')) {
    return 'Full-stack';
  }

  if (values.includes('landing')) {
    return 'Landing Page';
  }

  if (values.includes('react') || values.includes('vite') || values.includes('next')) {
    return 'React';
  }

  return 'Front-end';
}

function buildProjectStack(repo) {
  const stack = new Set([repo.language || 'Codigo']);

  (repo.topics || []).forEach((topic) => {
    if (stack.size < 5) {
      stack.add(topic);
    }
  });

  return Array.from(stack);
}

function readCachedGithubData() {
  try {
    const cachedData = localStorage.getItem(GITHUB_CACHE_KEY);

    if (!cachedData) {
      return null;
    }

    const parsedData = JSON.parse(cachedData);
    const isFresh = Date.now() - parsedData.timestamp < GITHUB_CACHE_TTL;

    return isFresh ? parsedData : null;
  } catch {
    return null;
  }
}

function writeCachedGithubData(user, repos) {
  try {
    localStorage.setItem(
      GITHUB_CACHE_KEY,
      JSON.stringify({
        user,
        repos,
        timestamp: Date.now(),
      }),
    );
  } catch {
    // Cache is an optimization only; ignore storage failures.
  }
}

function App() {
  const [cachedGithubData] = useState(readCachedGithubData);
  const [githubUser, setGithubUser] = useState(cachedGithubData?.user || fallbackUser);
  const [repos, setRepos] = useState(cachedGithubData?.repos || []);
  const [isLoadingRepos, setIsLoadingRepos] = useState(!cachedGithubData?.repos?.length);
  const [githubError, setGithubError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubData() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`, {
            signal: controller.signal,
          }),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API request failed');
        }

        const [userData, repoData] = await Promise.all([
          userResponse.json(),
          reposResponse.json(),
        ]);

        setGithubUser({
          ...fallbackUser,
          ...userData,
        });
        setRepos(repoData);
        writeCachedGithubData({ ...fallbackUser, ...userData }, repoData);
        setGithubError(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setGithubUser(fallbackUser);
          setRepos([]);
          setGithubError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRepos(false);
        }
      }
    }

    loadGithubData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '180px 0px 120px 0px', threshold: 0.01 },
    );

    requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element));
    });

    return () => observer.disconnect();
  }, []);

  const projects = useMemo(() => {
    const ownRepos = repos
      .filter((repo) => {
        const isHidden = HIDDEN_REPOS.some((hiddenName) => repo.name.toLowerCase().includes(hiddenName));
        const isFeatured = FEATURED_REPOS.includes(repo.name);
        const hasUsefulSignal = repo.homepage?.trim() || repo.description || repo.stargazers_count > 0 || isFeatured;

        return !repo.fork && !repo.archived && !isHidden && hasUsefulSignal;
      })
      .sort((repoA, repoB) => {
        const repoADetails = PROJECT_DETAILS[repoA.name] || {};
        const repoBDetails = PROJECT_DETAILS[repoB.name] || {};
        const repoAFeatured = FEATURED_REPOS.includes(repoA.name) ? 1 : 0;
        const repoBFeatured = FEATURED_REPOS.includes(repoB.name) ? 1 : 0;
        const priorityDifference = (repoBDetails.priority || 0) - (repoADetails.priority || 0);

        if (repoAFeatured !== repoBFeatured) {
          return repoBFeatured - repoAFeatured;
        }

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        const repoALive = repoA.homepage?.trim() ? 1 : 0;
        const repoBLive = repoB.homepage?.trim() ? 1 : 0;

        if (repoALive !== repoBLive) {
          return repoBLive - repoALive;
        }

        return new Date(repoB.updated_at) - new Date(repoA.updated_at);
      });

    return ownRepos.slice(0, 6).map((repo, index) => ({
      ...(() => {
        const details = PROJECT_DETAILS[repo.name] || {};

        return {
          title: details.title || repo.name.replaceAll('-', ' '),
          description: details.description || repo.description || 'Projeto publicado no meu GitHub.',
          image: details.image || `https://opengraph.githubassets.com/portfolio-${repo.id}/${GITHUB_USERNAME}/${repo.name}`,
          category: details.category || inferProjectCategory(repo),
          role: details.role || 'Desenvolvimento front-end',
          stack: details.stack || buildProjectStack(repo),
          caseStudy: details.caseStudy,
        };
      })(),
      featured: FEATURED_REPOS.includes(repo.name) || index === 0,
      projectUrl: repo.homepage?.trim() || repo.html_url,
      repoUrl: repo.html_url,
      hasProjectLink: Boolean(repo.homepage?.trim()),
      language: repo.language || 'Codigo',
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
    }));
  }, [repos]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') {
      return projects;
    }

    return projects.filter((project) => {
      const searchableValues = [
        project.category,
        project.language,
        ...project.stack,
        ...project.topics,
      ].map((value) => value.toLowerCase());

      return searchableValues.some((value) => value.includes(activeFilter.toLowerCase()));
    });
  }, [activeFilter, projects]);

  const publicRepoCount = repos.filter((repo) => !repo.fork).length;
  const liveProjectsCount = repos.filter((repo) => repo.homepage?.trim()).length;

  return (
    <div className="app-container">
      <AuroraBackground />
      <Navbar />

      <main className="main-content">
        <section className="hero-section reveal" id="home">
          <div className="hero-copy">
            <p className="hero-kicker">Desenvolvedor Front-end</p>
            <h1 className="hero-title">
              Interfaces modernas com React, Next.js e detalhe visual.
            </h1>
            <p className="hero-subtitle">
              Construo experiencias digitais responsivas, bem acabadas e
              conectadas a produtos reais, combinando codigo limpo, UI moderna
              e atencao ao usuario.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">Ver projetos</a>
              <a href="#contact" className="btn-secondary">Contato</a>
            </div>
          </div>

          <div className="hero-visual glass" aria-hidden="true">
            <div className="hero-image-shell">
              <img src={heroImage} alt="" className="hero-image" />
            </div>
            <div className="metric-card metric-card-top glass">
              <span>{publicRepoCount || '6+'}</span>
              <p>Repositorios</p>
            </div>
            <div className="metric-card metric-card-bottom glass">
              <span>{liveProjectsCount || '3+'}</span>
              <p>Projetos online</p>
            </div>
          </div>
        </section>

        <section className="about-section reveal" id="about">
          <SectionHeader
            eyebrow="Sobre mim"
            title="Front-end com olhar de produto."
            description="Meu foco e transformar ideias em interfaces claras, responsivas e agradaveis de usar."
          />
          <div className="about-grid">
            <div className="about-panel glass">
              <p>
                Trabalho com React, Next.js, TypeScript e Tailwind para criar
                paginas, portifolios, landing pages e experiencias web com
                acabamento visual forte. Gosto de unir estrutura, performance e
                interacoes sutis para deixar o produto mais profissional.
              </p>
            </div>
            <SkillShowcase />
          </div>
        </section>

        <ServicesSection />
        <ExperienceSection />

        <section className="portfolio-layout reveal" id="projects">
          <Sidebar user={githubUser} />
          <div className="projects-content">
            <SectionHeader
              eyebrow="Projetos"
              title="Repositorios conectados ao GitHub."
              description="Uma selecao curada dos projetos com prioridade para deploy, stack, contexto e codigo."
            />
            <div className="project-toolbar glass">
              <div className="filter-group" aria-label="Filtrar projetos">
                {PROJECT_FILTERS.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={activeFilter === filter ? 'is-active' : ''}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <p>{filteredProjects.length} projetos</p>
            </div>
            <div className="project-grid">
              {isLoadingRepos && (
                <div className="repo-loading glass">Carregando repositorios do GitHub...</div>
              )}
              {!isLoadingRepos && githubError && (
                <div className="repo-empty glass">
                  Nao foi possivel carregar os projetos agora.
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">Ver GitHub</a>
                </div>
              )}
              {!isLoadingRepos && !githubError && !filteredProjects.length && (
                <div className="repo-empty glass">
                  Nenhum projeto encontrado para esse filtro.
                </div>
              )}
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.repoUrl}
                  {...project}
                />
              ))}
            </div>
          </div>
        </section>

        <ContactSection links={contactLinks} githubUser={githubUser} />
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Gabriel W. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
