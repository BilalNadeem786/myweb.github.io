import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FloatingHearts, MusicToggle, Progress, useHeartBurst } from "@/components/love/Ambient";
import { Welcome, Apology, Memory } from "@/components/love/Stages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A little letter for you ♡" },
      { name: "description", content: "A small, heartfelt letter made just for you." },
      { property: "og:title", content: "A little letter for you ♡" },
      { property: "og:description", content: "A small, heartfelt letter made just for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState<"yes" | "time" | null>(null);
  const { fire, node } = useHeartBurst();

  const go = (s: number) => {
    if (s === stage) return;
    setVisible(false);
    setTimeout(() => {
      setStage(s);
      window.scrollTo({ top: 0 });
      setVisible(true);
    }, 450);
  };

  useEffect(() => {
    document.getElementById(`stage-${stage}`)?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-1000 ${stage === 2 ? "bg-sky-warm" : "bg-sky"}`}>
      <FloatingHearts count={stage === 1 ? 10 : 16} edges={stage === 1} />
      {stage === 2 && (
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-blush/60 blur-3xl animate-twinkle" />
          <div className="absolute bottom-[15%] right-[8%] h-72 w-72 rounded-full bg-cream blur-3xl animate-twinkle" style={{ animationDelay: "2s" }} />
        </div>
      )}
      <Progress stage={stage} onGo={go} canGo={!!name} />
      <MusicToggle />
      {node}
      <main
        id={`stage-${stage}`}
        tabIndex={-1}
        className={`relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 pb-16 pt-24 transition-all duration-500 ease-out focus:outline-none sm:px-8 ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-sm"}`}
      >
        {stage === 0 && <Welcome initial={name} fire={fire} onSubmit={(n) => { setName(n); go(1); }} />}
        {stage === 1 && <Apology name={name} fire={fire} onNext={() => go(2)} onBack={() => go(0)} />}
        {stage === 2 && (
          <Memory
            name={name} answer={answer} setAnswer={setAnswer} fire={fire}
            onBack={() => go(1)}
            onRestart={() => { setAnswer(null); go(0); }}
          />
        )}
      </main>
    </div>
  );
}
