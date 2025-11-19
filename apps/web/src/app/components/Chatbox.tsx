"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "system",
      content:
        "You are a concise, friendly assistant for Drishti's Layers dashboard. Keep replies short and helpful.",
    },
    {
      role: "assistant",
      content:
        "Hey! I'm your built-in helper. Ask me about your skincare routine!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const next = [
      ...messages.filter((m) => m.role !== "system"),
      { role: "user" as const, content: trimmed },
    ];
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Request failed");
      }

      const data = await res.json();
      const reply: Msg | undefined = data?.message;

      setMessages((prev) => [
        ...prev,
        reply ?? { role: "assistant", content: "(No reply received)" },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Oops, I hit an error: ${error?.message ?? error}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gpt-chatbox">
      {/* Optional tiny header if you want one */}
      {/* <div className="gpt-chatbox-header">Skincare assistant</div> */}

      <div className="gpt-chat-messages">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={
                "gpt-chat-row " +
                (m.role === "user"
                  ? "gpt-chat-row--user"
                  : "gpt-chat-row--assistant")
              }
            >
              <div
                className={
                  "gpt-chat-message " +
                  (m.role === "user"
                    ? "gpt-chat-message--user"
                    : "gpt-chat-message--assistant")
                }
              >
                {m.content}
              </div>
            </div>
          ))}

        {loading && (
          <div className="gpt-chat-row gpt-chat-row--assistant">
            <div className="gpt-chat-message gpt-chat-message--thinking">
              Thinking…
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <form onSubmit={sendMessage} className="gpt-chat-inputRow">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something…"
          className="gpt-chat-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="gpt-chat-send"
          aria-label="Send"
          title="Send"
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
