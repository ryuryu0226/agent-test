"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [earnings, setEarnings] = useState<string | null>(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch("/api/agent");
        const { answer } = await response.json();
        setEarnings(answer);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="mb-4">
        <h1>Earnings</h1>
        {earnings ? (
          <ReactMarkdown>{earnings}</ReactMarkdown>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <h1>Chat</h1>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
