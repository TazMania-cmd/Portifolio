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
const BUDGET_MESSAGE = encodeURIComponent(
  'Olá Gabriel, quero um orçamento para criar uma presença digital profissional para meu negócio.',
);

const PROJECT_DETAILS = {
  'contador-semanal': {
    hideProjectButton: true,
  },
  'Contador-Semanal': {
    hideProjectButton: true,
  },
  Portifolio: {
    title: 'Presença digital premium',
    description: 'Uma vitrine profissional pensada para apresentar serviços com clareza, reforçar autoridade e facilitar o primeiro contato.',
    role: 'Estratégia visual, experiência responsiva e publicação Web',
    stack: ['React', 'Vite', 'CSS', 'GitHub API'],
    category: 'Landing Page',
    priority: 100,
    caseStudy: {
      problem: 'Transformar um perfil técnico em uma apresentação clara para clientes e empresas.',
      solution: 'Organizar mensagem, projetos, serviços e prova visual em uma experiência fluida no desktop e no mobile.',
      result: 'Uma presença digital mais confiável, direta e pronta para gerar conversas de orçamento.',
    },
  },
  portfolio: {
    title: 'Presença digital premium',
    category: 'Landing Page',
    priority: 100,
  },
  portifolio: {
    title: 'Presença digital premium',
    category: 'Landing Page',
    priority: 100,
  },
};

const fallbackUser = {
  name: 'Gabriel Wilson',
  login: GITHUB_USERNAME,
  avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
  bio: 'Desenvolvedor web focado em landing pages, sites responsivos e presença digital para negócios.',
  html_url: `https://github.com/${GITHUB_USERNAME}`,
};

const contactLinks = [
  {
    label: 'WhatsApp',
    value: 'Solicitar orçamento',
    href: `https://api.whatsapp.com/send?text=${BUDGET_MESSAGE}`,
  },
  {
    label: 'GitHub',
    value: `github.com/${GITHUB_USERNAME}`,
    href: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    label: 'Email',
    value: 'gabrielwilsonvr@gmail.com',
    href: `mailto:gabrielwilsonvr@gmail.com?subject=Or%C3%A7amento%20para%20site%20profissional&body=${BUDGET_MESSAGE}`,
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
  const stack = new Set([repo.language || 'Código']);

  (repo.topics || []).forEach((topic) => {
    if (stack.size < 5) {
      stack.add(topic);
    }
  });

  return Array.from(stack);
}

function getProjectDetails(repoName) {
  return PROJECT_DETAILS[repoName] || PROJECT_DETAILS[repoName.toLowerCase()] || {};
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
        const repoADetails = getProjectDetails(repoA.name);
        const repoBDetails = getProjectDetails(repoB.name);
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
        const details = getProjectDetails(repo.name);

        return {
          title: details.title || repo.name.replaceAll('-', ' '),
          description: details.description || repo.description || 'Projeto publicado no meu GitHub.',
          image: details.image || `https://opengraph.githubassets.com/portfolio-${repo.id}/${GITHUB_USERNAME}/${repo.name}`,
          category: details.category || inferProjectCategory(repo),
          role: details.role || 'Desenvolvimento front-end',
          stack: details.stack || buildProjectStack(repo),
          caseStudy: details.caseStudy,
          hideProjectButton: Boolean(details.hideProjectButton),
        };
      })(),
      featured: FEATURED_REPOS.includes(repo.name) || index === 0,
      projectUrl: repo.homepage?.trim() || repo.html_url,
      repoUrl: repo.html_url,
      hasProjectLink: Boolean(repo.homepage?.trim()),
      language: repo.language || 'Código',
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
            <p className="hero-kicker">Desenvolvedor Web para negócios locais</p>
            <h1 className="hero-title">
              Sites modernos que transformam visitas em contatos.
            </h1>
            <p className="hero-subtitle">
              Crio landing pages e sites institucionais com visual premium,
              carregamento rápido e mensagem clara para sua empresa parecer
              mais profissional desde o primeiro clique.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">Solicitar orçamento</a>
              <a href="#projects" className="btn-secondary">Ver trabalhos</a>
            </div>
          </div>

          <div className="hero-visual glass" aria-hidden="true">
            <div className="hero-image-shell">
              <img src={heroImage} alt="" className="hero-image" />
            </div>
            <div className="metric-card metric-card-top glass">
              <span>{publicRepoCount || '6+'}</span>
              <p>Projetos base</p>
            </div>
            <div className="metric-card metric-card-bottom glass">
              <span>{liveProjectsCount || '3+'}</span>
              <p>Experiências online</p>
            </div>
          </div>
        </section>

        <section className="about-section reveal" id="about">
          <SectionHeader
            eyebrow="Sobre mim"
            title="Design, código e estratégia para vender melhor sua imagem."
            description="Meu trabalho conecta estética moderna, clareza comercial e experiência mobile para empresas que precisam ser levadas a sério online."
          />
          <div className="about-grid">
            <div className="about-panel glass">
              <p>
                Sou Gabriel Wilson, desenvolvedor web focado em criar páginas
                profissionais para negócios, prestadores de serviço e marcas que
                querem melhorar a forma como são percebidos na internet. Meu
                processo combina layout limpo, copy direta, responsividade e
                chamadas de contato bem posicionadas para transformar uma ideia
                simples em uma presença digital moderna e confiável.
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
              title="Projetos pensados como experiências reais."
              description="Uma seleção de interfaces com foco em apresentação profissional, navegação simples, responsividade e caminho claro para conversão."
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
                <div className="repo-loading glass">Carregando repositórios do GitHub...</div>
              )}
              {!isLoadingRepos && githubError && (
                <div className="repo-empty glass">
                  Não foi possível carregar os projetos agora.
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
