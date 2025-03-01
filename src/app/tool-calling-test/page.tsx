"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [earnings, setEarnings] = useState<string | null>(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch("/api/earnings-agent");
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
      <h1>Earnings</h1>
      {earnings ? <ReactMarkdown>{earnings}</ReactMarkdown> : <p>Loading...</p>}
    </div>
  );
}
