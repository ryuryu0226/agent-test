"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

import { AgentThread } from "@/features/tool-ui-test/agent-thread";

export default function Chat() {
  const runtime = useChatRuntime({
    // api: "/api/chat",
    api: "/api/chat-with-tools",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AgentThread />
    </AssistantRuntimeProvider>
  );
}
