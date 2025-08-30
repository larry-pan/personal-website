import React from "react";
import CRTScreen from "./components/CRTScreen/CRT";
import TitleContent from "./components/titleContent/TitleContent";
import HomeContent from "./components/homeContent/HomeContent";

type Scene = "title" | "black" | "main";

export default function App() {
  const [scene, setScene] = React.useState<Scene>("title");

  const titletMs = 800;
  const blackMs = 500;

  React.useEffect(() => {
    const t1 = window.setTimeout(() => setScene("black"), titletMs);
    const t2 = window.setTimeout(() => setScene("main"), titletMs + blackMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div>
      {scene === "title" && <CRTScreen content={<TitleContent loadingDurationMs={titletMs} />} />}

      {scene === "black" && <CRTScreen />}

      {scene === "main" && <CRTScreen content={<HomeContent />} />}
    </div>
  );
}
