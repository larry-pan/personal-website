import { type ReactNode, useEffect, useState, useMemo, useRef, useReducer } from "react";
import "./crt-screen.css";

type CRTProps = {
  content?: ReactNode;
  rows?: number;
  className?: string;
  flickerTauMs?: number;
  jitterGain?: number;
};

export default function CRTScreen({
  content = null,
  rows = 100,
  className = "",
  flickerTauMs = 2000,
  jitterGain = 0.12,
}: CRTProps) {
  const rowCount = Math.max(1, Math.floor(rows));
  const reduceMotion = usePrefersReducedMotion();

  const alphas = useAnalogRowNoise(rowCount, { tauMs: flickerTauMs, gain: jitterGain }, !reduceMotion);

  const indices = useMemo(() => Array.from({ length: rowCount }, (_, i) => i), [rowCount]);

  type CSSVars = React.CSSProperties & Record<"--crt-rows", number | string>;
  const styleVars: CSSVars = { "--crt-rows": rowCount };

  const BASE = 0.05;
  const AMP = 0.05;

  return (
    <div className={`crtRoot ${className}`.trim()} role="img" style={styleVars}>
      <div className="scanlinesStatic" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="flickerRows" aria-hidden="true">
        {indices.map((i) => (
          <div
            key={i}
            className="flickerRow"
            style={{
              opacity: BASE + Math.max(-AMP, Math.min(AMP, alphas[i] ?? 0)),
            }}
          />
        ))}
      </div>
      {content}
    </div>
  );
}

/* ---------- hook: time-constant smoothed noise ---------- */
function useAnalogRowNoise(
  count: number,
  opts: { tauMs?: number; gain?: number; fps?: number } = {},
  enabled = true,
) {
  const tauMs = Math.max(50, opts.tauMs ?? 850);
  const gain = Math.max(0, opts.gain ?? 0.12);
  const fps = Math.max(1, Math.floor(opts.fps ?? 30));
  const frameInterval = 1000 / fps;

  // Create persistent arrays
  const valuesRef = useRef(new Array(count).fill(0));
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!enabled) {
      valuesRef.current.fill(0);
      forceUpdate();
      return;
    }

    let raf = 0;
    const work = new Float32Array(count);
    let last = performance.now();
    let acc = 0;

    const tick = () => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      acc += dt;

      const a = Math.exp(-dt / tauMs),
        b = 1 - a;
      for (let i = 0; i < count; i++) {
        const drive = (Math.random() * 2 - 1) * gain;
        work[i] = a * work[i] + b * drive;
      }

      if (acc >= frameInterval) {
        for (let i = 0; i < count; i++) {
          valuesRef.current[i] = work[i];
        }
        forceUpdate();
        acc = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, enabled, tauMs, gain, fps]);

  return valuesRef.current;
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}
