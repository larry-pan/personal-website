import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";
import Projects from "./Projects.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Projects />
  </StrictMode>,
);
