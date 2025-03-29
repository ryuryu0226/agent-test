"use client";

import { WeatherInformationToolUI } from "@/features/tool-ui-test/weather-information-tool";
import { WebSearchToolUI } from "./web-search-tool";
import { Thread } from "@/components/assistant-ui/thread";

export function AgentThread() {
  return (
    <>
      <div className="h-dvh">
        <Thread />
      </div>
      <WeatherInformationToolUI />
      <WebSearchToolUI />
    </>
  );
}
