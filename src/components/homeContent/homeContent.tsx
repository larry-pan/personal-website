import "./home.css";

export default function HomeContent({}) {
  return (
    <div className="content">
      <h1 className="titlecard" style={{ marginBottom: "-0.5rem" }}>LARRY PAN</h1>

      <div className="home-body" style={{ margin: "0rem" }}>
        <div className="content" style={{ marginBottom: "2rem" }}>
          <p className="home-intro" style={{marginBottom: "1rem"}}>
            Comptuer Science @{" "}
            <a
              href="https://uwaterloo.ca/"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Waterloo
            </a>
          </p>
          <p className="home-intro">
            AI Engineer @{" "}
            <a
              href="https://www.revisiondojo.com"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              RevisionDojo (YC F24)
            </a>
          </p>
          <p className="home-intro">
            Prev. SWE Intern @{" "}
            <a href="https://rcmp.ca" className="external-link" target="_blank" rel="noopener noreferrer">
              RCMP
            </a>
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem", gap: "2rem" }}>
          <img
            src={"/f16.svg"}
            width="125px"
            height="125px"
            style={{ opacity: 0.8, filter: "blur(0.5px)" }}
          />
          <img
            src={"/pfp.png"}
            width="130px"
            style={{
              objectFit: "contain",
              filter: "grayscale(1) " + "blur(0.5px)",
              opacity: 0.6,
            }}
          />
        </div>

        <div className="page-links">
          <a href="#" className="page-link">
            HOME
          </a>
          <a href="/projects/" className="page-link">
            PROJECTS
          </a>
          <a href="#contact" className="page-link">
            CONTACT
          </a>
        </div>
      </div>
    </div>
  );
}
