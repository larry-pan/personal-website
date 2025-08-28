import "./home.css";

export default function HomeContent({}) {
  return (
    <div className="content">
      <h1 className="titlecard">LARRY PAN</h1>

      <div className="home-body">
        <p className="home-intro">ts pmo ong fr icl nc</p>

        <div className="home-links">
          <a href="#work" className="home-link">
            WORK
          </a>
          <a href="#projects" className="home-link">
            PROJECTS
          </a>
          <a href="#contact" className="home-link">
            CONTACT
          </a>
        </div>
      </div>
    </div>
  );
}
