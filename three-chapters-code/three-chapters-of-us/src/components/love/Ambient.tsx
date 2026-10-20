import { useMemo, useEffect, useRef, useState } from "react";
import { Heart, Music, VolumeX } from "lucide-react";

export function FloatingHearts({ count = 14, edges = false }: { count?: number; edges?: boolean }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 37) % 100;
        const left = edges ? (i % 2 ? 88 + (seed % 10) : seed % 12) : (seed + i * 7) % 100;
        return { left, size: 10 + (seed % 16), dur: 14 + (seed % 12), delay: -(i * 2.3), o: 0.25 + (seed % 30) / 100 };
      }),
    [count, edges],
  );
  const sparkles = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({ l: (i * 47) % 100, t: (i * 29) % 100, d: (i % 5) * 0.8 })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparkles.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-rose/60 blur-[1px] animate-twinkle"
          style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s` }}
        />
      ))}
      {items.map((h, i) => (
        <Heart
          key={i}
          className="motion-hide absolute -bottom-10 fill-rose/40 text-rose/50 animate-float-up"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            ["--o" as string]: h.o,
          }}
        />
      ))}
    </div>
  );
}

/** Small heart burst at a click position. */
export function useHeartBurst() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const fire = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1000);
  };
  const node = (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      {bursts.map((b) =>
        Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <Heart
              key={`${b.id}-${i}`}
              className="absolute h-4 w-4 fill-rose text-rose animate-burst"
              style={{ left: b.x, top: b.y, ["--dx" as string]: `${Math.cos(a) * 60}px`, ["--dy" as string]: `${Math.sin(a) * 60}px` }}
            />
          );
        }),
      )}
    </div>
  );
  return { fire, node };
}

/** Soft generative music pad via Web Audio — off by default. */
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<{ ctx: AudioContext; gain: GainNode; timer: number } | null>(null);

  const stop = () => {
    const r = ctxRef.current;
    if (!r) return;
    r.gain.gain.linearRampToValueAtTime(0, r.ctx.currentTime + 0.8);
    clearInterval(r.timer);
    setTimeout(() => r.ctx.close(), 900);
    ctxRef.current = null;
  };

  const start = () => {
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
    const chords = [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 392.0],
    ];
    let idx = 0;
    const play = () => {
      const t = ctx.currentTime;
      (chords[idx % chords.length] ?? []).forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0, t + i * 0.25);
        g.gain.linearRampToValueAtTime(0.25, t + i * 0.25 + 0.6);
        g.gain.exponentialRampToValueAtTime(0.001, t + 4.2);
        o.connect(g).connect(gain);
        o.start(t + i * 0.25);
        o.stop(t + 4.5);
      });
      idx++;
    };
    play();
    const timer = window.setInterval(play, 4000);
    ctxRef.current = { ctx, gain, timer };
  };

  useEffect(() => () => stop(), []);

  return (
    <button
      type="button"
      onClick={() => {
        if (on) stop();
        else start();
        setOn(!on);
      }}
      aria-pressed={on}
      aria-label={on ? "Turn music off" : "Turn soft music on"}
      className="glass fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-primary transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {on ? <Music className="h-5 w-5 animate-beat" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}

export function Progress({ stage, onGo, canGo }: { stage: number; onGo: (s: number) => void; canGo: boolean }) {
  return (
    <nav aria-label="Progress" className="fixed left-1/2 top-5 z-40 flex -translate-x-1/2 gap-3">
      {[0, 1, 2].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!canGo && s > 0}
          onClick={() => onGo(s)}
          aria-label={`Go to part ${s + 1}`}
          aria-current={stage === s ? "step" : undefined}
          className="rounded-full p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
        >
          <Heart
            className={`h-4 w-4 transition-all ${stage === s ? "scale-125 fill-primary text-primary" : stage > s ? "fill-rose/70 text-rose" : "text-rose/50"}`}
          />
        </button>
      ))}
    </nav>
  );
}

export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g className="animate-sway" style={{ transformBox: "fill-box" }}>
        <path d="M32 60 C32 48 30 40 32 30" stroke="var(--rose)" strokeWidth="2" fill="none" />
        <path d="M32 46 C24 44 22 38 22 38 C28 38 31 42 32 46Z" fill="var(--rose)" opacity=".5" />
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="32" cy="18" rx="7" ry="11" fill="var(--blush)" stroke="var(--rose)" strokeWidth="1" transform={`rotate(${r} 32 26)`} />
        ))}
        <circle cx="32" cy="26" r="5" fill="var(--rose)" />
      </g>
    </svg>
  );
}
