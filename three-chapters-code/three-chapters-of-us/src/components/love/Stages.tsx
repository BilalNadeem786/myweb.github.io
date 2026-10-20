import { useRef, useState, type FormEvent } from "react";
import { Heart, RotateCcw, ArrowLeft, Camera } from "lucide-react";
import { validateName } from "@/lib/love";
import { MEMORY_PHOTO_SRC } from "@/lib/photo";
import { Flower } from "./Ambient";

type Fire = (x: number, y: number) => void;
const center = (e: { currentTarget: HTMLElement }) => {
  const r = e.currentTarget.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2] as const;
};

const btnPrimary =
  "btn-love inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-rose/50 bg-cream/70 px-6 py-3.5 text-base text-primary transition hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/* ---------------- Page 1 ---------------- */
export function Welcome({ initial, onSubmit, fire }: { initial: string; onSubmit: (n: string) => void; fire: Fire }) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState("");
  const btn = useRef<HTMLButtonElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateName(value);
    if (!res.ok) return setError(res.error);
    setError("");
    if (btn.current) fire(...center({ currentTarget: btn.current }));
    setTimeout(() => onSubmit(res.name), 450);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6 animate-fade-up">
        <Flower className="absolute -left-10 top-2 h-14 w-14" />
        <Heart className="h-14 w-14 fill-rose text-primary animate-beat" />
        <Flower className="absolute -right-10 top-2 h-14 w-14 -scale-x-100" />
      </div>
      <h1 className="animate-fade-up text-5xl font-medium italic text-burgundy sm:text-6xl" style={{ animationDelay: ".15s" }}>
        Hey, my love... ❤️
      </h1>
      <p className="mt-5 max-w-md animate-fade-up text-lg text-muted-foreground" style={{ animationDelay: ".3s" }}>
        I made something just for you. There's something important I want to tell you.
      </p>
      <form onSubmit={submit} noValidate className="glass mt-10 w-full max-w-md animate-fade-up rounded-3xl p-7 text-left sm:p-9" style={{ animationDelay: ".45s" }}>
        <label htmlFor="her-name" className="block font-serif text-2xl text-burgundy">
          First, tell me your name, sweetheart
        </label>
        <input
          id="her-name"
          value={value}
          onChange={(e) => { setValue(e.target.value); if (error) setError(""); }}
          placeholder="Your beautiful name..."
          autoComplete="given-name"
          maxLength={60}
          aria-invalid={!!error}
          aria-describedby={error ? "name-error" : undefined}
          className="mt-4 w-full rounded-2xl border border-input bg-cream/80 px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/70 transition focus:border-rose focus:outline-none focus:ring-4 focus:ring-ring/25"
        />
        <p id="name-error" role="alert" className="mt-2 min-h-5 text-sm text-destructive">{error}</p>
        <button ref={btn} type="submit" className={`${btnPrimary} mt-3 w-full`}>
          Open your little letter 💌
        </button>
      </form>
    </div>
  );
}

/* ---------------- Page 2 ---------------- */
const apology = [
  "My love, I'm genuinely sorry for hurting you. The last thing I ever wanted was to make you feel upset or cause you pain. I know that my actions and mistakes matter, and I don't want to dismiss your feelings or pretend that a simple sorry can fix everything.",
  "You mean so much to me, and our relationship is something I truly cherish. I'm sorry for the moments when I wasn't careful enough with my words or actions. You deserve to feel loved, respected, understood, and valued.",
  "I promise to be more mindful from now on, to think before I act or speak, and to learn from my mistakes instead of repeating them. I know that promises only mean something when they're supported by actions, and I want to show you through the way I treat you that I'm serious about doing better.",
  "I'm not asking you to forget how you felt or to forgive me before you're ready. I just want you to know that I'm sorry, that I care about your feelings, and that I'll make a genuine effort to be more careful next time.",
  "You are incredibly special to me, and I'm truly sorry for hurting you. ❤️",
];

export function Apology({ name, onNext, onBack, fire }: { name: string; onNext: () => void; onBack: () => void; fire: Fire }) {
  const letterRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col items-center">
      <Heart className="mb-5 h-11 w-11 animate-beat fill-rose/80 text-primary" aria-hidden />
      <h1 className="animate-fade-up text-center text-4xl font-medium text-burgundy sm:text-5xl">
        <span className="italic">{name}</span>, I'm truly sorry. ❤️
      </h1>
      <p className="mt-3 animate-fade-up text-center text-lg italic text-muted-foreground" style={{ animationDelay: ".2s" }}>
        Please let me say this from my heart...
      </p>

      <article ref={letterRef} tabIndex={-1} aria-label="My apology letter" className="glass mt-10 w-full scroll-mt-20 rounded-3xl p-7 focus:outline-none sm:p-12">
        {apology.map((p, i) => (
          <p
            key={i}
            className={`animate-fade-up font-serif text-xl leading-relaxed text-foreground sm:text-[1.4rem] ${i ? "mt-6" : "first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-none first-letter:text-primary"} ${i === apology.length - 1 ? "italic text-burgundy" : ""}`}
            style={{ animationDelay: `${0.5 + i * 0.6}s` }}
          >
            {p}
          </p>
        ))}
      </article>

      <section className="mt-8 w-full animate-fade-up rounded-3xl border border-rose/40 bg-secondary/70 p-7 shadow-soft sm:p-9" style={{ animationDelay: "3.6s" }}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream"><Heart className="h-5 w-5 fill-rose text-primary" aria-hidden /></span>
          <h2 className="text-3xl text-burgundy">My promise to you</h2>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-secondary-foreground">
          I'll be more careful, listen better, think before I act, and learn from my mistakes. I want my actions to show you how much you mean to me.
        </p>
      </section>

      <div className="mt-10 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={onBack} className={btnSecondary} aria-label="Back to the beginning">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btnSecondary}
          onClick={() => { letterRef.current?.scrollIntoView({ block: "start" }); letterRef.current?.focus({ preventScroll: true }); }}
        >
          Read my letter again ♡
        </button>
        <button type="button" className={btnPrimary} onClick={(e) => { fire(...center(e)); setTimeout(onNext, 400); }}>
          One more thing, my love →
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page 3 ---------------- */
const finale = [
  "I miss the closeness, the happiness, and the little moments that make us us.",
  "I'm sorry for hurting you, sweetheart. I know I can't change what happened, but I can learn from it and be more careful from this moment forward.",
  "I don't expect everything to become okay instantly. I just hope we can find our way back to those smiles, those silly moments, and that beautiful closeness we share.",
  "Please forgive me when you're ready. You mean so much to me, and I'd love the chance to show you that I can do better.",
  "I'm sorry, my love. Always with a heart full of love for you. ❤️",
];

function PhotoFrame() {
  const [broken, setBroken] = useState(false);

  return (
    <figure className="mx-auto w-full max-w-md animate-fade-up" style={{ animationDelay: ".5s" }}>
      <div className="relative rotate-[-1.5deg] rounded-[2rem] border border-cream bg-cream p-3 shadow-soft transition hover:rotate-0 sm:p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary">
          {!broken ? (
            <img
              src={MEMORY_PHOTO_SRC}
              alt="Us, together — our favorite memory"
              onError={() => setBroken(true)}
              className="h-full w-full animate-fade-up object-cover"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center text-burgundy">
              <Heart className="h-20 w-20 fill-rose text-primary" aria-hidden />
              <span className="font-serif text-2xl italic">You & me, always ♡</span>
            </div>
          )}
          <Heart className="absolute -right-1 -top-1 h-8 w-8 rotate-12 fill-rose text-cream drop-shadow" aria-hidden />
        </div>
      </div>
      <figcaption className="mt-5 text-center font-serif text-xl italic text-burgundy">
        A little piece of my favorite world is right here. ❤️
      </figcaption>
    </figure>
  );
}

function Confetti() {
  return (
    <div aria-hidden className="motion-hide pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }, (_, i) => (
        <Heart
          key={i}
          className="absolute -top-8 animate-confetti fill-rose text-rose"
          style={{
            left: `${(i * 53) % 100}%`,
            width: 10 + (i % 4) * 5,
            height: 10 + (i % 4) * 5,
            opacity: 0.5 + (i % 5) / 10,
            animationDuration: `${3 + (i % 7) * 0.4}s`,
            animationDelay: `${(i % 10) * 0.12}s`,
            ["--r" as string]: `${(i % 2 ? 1 : -1) * (180 + i * 9)}deg`,
          }}
        />
      ))}
    </div>
  );
}

export function Memory({
  name, answer, setAnswer, onBack, onRestart, fire,
}: {
  name: string;
  answer: "yes" | "time" | null; setAnswer: (a: "yes" | "time") => void;
  onBack: () => void; onRestart: () => void; fire: Fire;
}) {
  const [confettiKey, setConfettiKey] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  return (
    <div ref={top} className="flex flex-col items-center text-center">
      {answer === "yes" && confettiKey > 0 && <Confetti key={confettiKey} />}
      <p className="animate-fade-up text-sm uppercase tracking-[0.3em] text-rose">One last thing... ❤️</p>
      <h1 className="mt-4 animate-fade-up text-5xl font-medium italic text-burgundy sm:text-6xl" style={{ animationDelay: ".15s" }}>
        Look how close we were...
      </h1>
      <p className="mt-5 max-w-xl animate-fade-up text-lg text-muted-foreground" style={{ animationDelay: ".3s" }}>
        Look at us, my love. Look at the memories we've made, the smiles we've shared, and the beautiful moments that mean so much to me.
      </p>

      <div className="mt-12 w-full"><PhotoFrame /></div>

      <div className="mt-14 max-w-2xl space-y-6">
        {finale.map((p, i) => (
          <p key={i} className={`animate-fade-up font-serif text-xl leading-relaxed sm:text-2xl ${i === finale.length - 1 ? "italic text-burgundy" : "text-foreground"}`} style={{ animationDelay: `${0.8 + i * 0.3}s` }}>
            {p}
          </p>
        ))}
      </div>

      <section aria-labelledby="ask" className="glass mt-16 w-full rounded-[2rem] px-6 py-10 sm:px-12">
        <Heart className="mx-auto h-20 w-20 animate-beat fill-rose text-primary drop-shadow-lg" aria-hidden />
        <h2 id="ask" className="mt-5 text-3xl text-burgundy sm:text-4xl">Can I have a chance to make things right? 💗</h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            aria-pressed={answer === "yes"}
            className={btnPrimary}
            onClick={(e) => { fire(...center(e)); setAnswer("yes"); setConfettiKey((k) => k + 1); }}
          >
            I forgive you ❤️
          </button>
          <button type="button" aria-pressed={answer === "time"} className={btnSecondary} onClick={() => setAnswer("time")}>
            I need a little time 🤍
          </button>
        </div>
        <div aria-live="polite" className="min-h-0">
          {answer && (
            <p key={answer} className="mx-auto mt-8 max-w-lg animate-fade-up rounded-2xl bg-cream/80 px-6 py-5 font-serif text-xl italic text-burgundy">
              {answer === "yes"
                ? "Thank you for hearing me out, my love. ❤️ I'll do my best to show you through my actions."
                : "Of course, my love. Take all the time you need. I respect your feelings, and I'll be here when you're ready. 🤍"}
            </p>
          )}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button type="button" className={btnSecondary} onClick={onBack}><ArrowLeft className="h-4 w-4" /> Read the apology again</button>
        <button type="button" className={btnSecondary} onClick={() => top.current?.scrollIntoView()}><Camera className="h-4 w-4" /> See our photo</button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" /> Start again
        </button>
      </div>
    </div>
  );
}
