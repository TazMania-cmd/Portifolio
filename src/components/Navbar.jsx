const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-glass glass">
        <div className="logo">
          GABRIEL WILSON <span>| WEB PARA NEGÓCIOS</span>
        </div>
        <div className="nav-links">
          <a href="#home">INÍCIO</a>
          <a href="#services">SERVIÇOS</a>
          <a href="#projects">PROJETOS</a>
          <a href="#about">SOBRE</a>
          <a href="#contact">ORÇAMENTO</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
