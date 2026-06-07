"use client";

import { useState } from "react";
import type { ScreenId } from "@/types";
import { LandingScreen } from "@/components/screens/LandingScreen";
import { Mission1 } from "@/components/screens/Mission1";
import { Mission2 } from "@/components/screens/Mission2";
import { Mission3 } from "@/components/screens/Mission3";
import { Mission4 } from "@/components/screens/Mission4";
import { Mission5 } from "@/components/screens/Mission5";
import { CompletionScreen } from "@/components/screens/CompletionScreen";

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("landing");
  const go = (next: ScreenId) => {
    setScreen(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  switch (screen) {
    case "landing":
      return <LandingScreen onStart={() => go("mission1")} />;
    case "mission1":
      return <Mission1 onNext={() => go("mission2")} />;
    case "mission2":
      return (
        <Mission2 onPrev={() => go("mission1")} onNext={() => go("mission3")} />
      );
    case "mission3":
      return (
        <Mission3 onPrev={() => go("mission2")} onNext={() => go("mission4")} />
      );
    case "mission4":
      return (
        <Mission4 onPrev={() => go("mission3")} onNext={() => go("mission5")} />
      );
    case "mission5":
      return (
        <Mission5 onPrev={() => go("mission4")} onNext={() => go("complete")} />
      );
    case "complete":
      return <CompletionScreen onHome={() => go("landing")} />;
    default:
      return <LandingScreen onStart={() => go("mission1")} />;
  }
}
