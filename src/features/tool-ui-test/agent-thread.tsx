"use client";

import { WeatherInformationToolUI } from "@/features/tool-ui-test/web-search-tool-ui";
import { Thread } from "@/components/assistant-ui/thread";

export function AgentThread() {
  return (
    <>
      <div className="h-dvh">
        <Thread />
      </div>
      <WeatherInformationToolUI />
    </>
  );
}
