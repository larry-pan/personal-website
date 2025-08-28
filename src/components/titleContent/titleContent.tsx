import { useState, useEffect } from "react";
import "./crt-bar.css";

interface TitleContentProps {
  onLoadingComplete?: () => void;
  loadingDurationMs: number;
}

export default function TitleContent({ onLoadingComplete, loadingDurationMs }: TitleContentProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / loadingDurationMs) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          onLoadingComplete?.();
        }, 500);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [loadingDurationMs, onLoadingComplete]);

  return (
    <div className="content">
      <h1 className="titlecard">LARRY PAN</h1>
      <h1 className="titlecard">PERSONAL WEBSITE</h1>

      <div className="crt-loading-container">
        <div className="crt-progress-bar">
          <div className="crt-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
