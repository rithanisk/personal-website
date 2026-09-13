"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "error" | "user";
  text: string;
  retryQuestion?: string;
};

const starterPrompts = [
  "What is Rithani working on now?",
  "What has she built?",
  "What are her strongest skills?",
  "How can I contact her?",
];

const initialMessage: Message = {
  id: 0,
  role: "assistant",
  text: "Hi! I’m Rithani’s portfolio guide. Ask me anything about her work, projects, story, or interests.",
};

function SparkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3.5c.6 4.7 3.3 7.4 8 8-4.7.6-7.4 3.3-8 8-.6-4.7-3.3-7.4-8-8 4.7-.6 7.4-3.3 8-8Z" />
      <path d="M19 2v4M21 4h-4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function PortfolioAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(1);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, thinking, reduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendQuestion = async (question: string, appendUserMessage = true) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || thinking) return;

    const conversation = messages.filter((message) => message.role !== "error");
    const userMessageId = messageIdRef.current++;
    const nextMessages: Message[] = appendUserMessage
      ? [
          ...conversation,
          { id: userMessageId, role: "user", text: trimmedQuestion },
        ]
      : conversation;
    const assistantMessageId = messageIdRef.current++;

    setMessages(nextMessages);
    setInput("");
    setThinking(true);

    let errorMessage = "I couldn’t reach the portfolio assistant just now. Please try again.";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.role === "assistant" || message.role === "user")
            .slice(-10)
            .map((message) => ({ role: message.role, content: message.text })),
        }),
      });

      const result = (await response.json()) as { answer?: unknown; error?: unknown };
      const answer = typeof result.answer === "string" ? result.answer.trim() : "";
      if (!response.ok || !answer) {
        if (response.status === 429) {
          errorMessage = "The portfolio assistant is busy right now. Please wait a moment and try again.";
        }
        throw new Error("Assistant request failed");
      }

      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "assistant",
          text: answer,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "error",
          text: errorMessage,
          retryQuestion: trimmedQuestion,
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(input);
  };

  return (
    <div
      className="fixed right-4 z-[80] flex flex-col items-end sm:right-6"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <AnimatePresence>
        {open && (
          <motion.section
            id="portfolio-assistant-panel"
            role="dialog"
            aria-label="Ask about Rithani"
            className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[22px]"
            style={{
              background: "var(--pf-surface)",
              border: "1px solid var(--pf-border)",
              boxShadow: "var(--pf-shadow-lg)",
            }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <header
              className="flex items-center justify-between gap-4 px-4 py-3.5"
              style={{ borderBottom: "1px solid var(--pf-border)" }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{ background: "var(--pf-rose-soft)", color: "var(--pf-rose-ink)" }}
                >
                  <SparkIcon size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-[14px] font-semibold">Ask about Rithani</h2>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px]" style={{ color: "var(--pf-text-dim)" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-teal)" }} />
                    Answers from this portfolio
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close portfolio assistant"
                className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-[20px] transition-colors hover:bg-pf-surface-2"
                style={{ color: "var(--pf-text-muted)" }}
              >
                ×
              </button>
            </header>

            <div
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[88%]">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.55] ${
                        message.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                      }`}
                      style={
                        message.role === "user"
                          ? { background: "var(--pf-rose)", color: "#fff" }
                          : message.role === "error"
                            ? {
                                background: "color-mix(in oklab, var(--pf-rose-soft) 70%, var(--pf-surface))",
                                color: "var(--pf-text-muted)",
                                border: "1px solid color-mix(in oklab, var(--pf-rose) 30%, var(--pf-border))",
                              }
                          : {
                              background: "var(--pf-bg-warm)",
                              color: "var(--pf-text-muted)",
                              border: "1px solid var(--pf-border)",
                            }
                      }
                    >
                      {message.text}
                    </div>
                    {message.role === "error" && message.retryQuestion ? (
                      <button
                        type="button"
                        onClick={() => void sendQuestion(message.retryQuestion!, false)}
                        disabled={thinking}
                        className="mt-2 cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-semibold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                          background: "var(--pf-rose-soft)",
                          color: "var(--pf-rose-ink)",
                          border: "1px solid color-mix(in oklab, var(--pf-rose) 24%, transparent)",
                        }}
                      >
                        Try again
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="mt-1 grid gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendQuestion(prompt)}
                      className="cursor-pointer rounded-xl px-3 py-2.5 text-left text-[11px] font-medium transition-all hover:-translate-y-0.5"
                      style={{
                        background: "var(--pf-surface)",
                        color: "var(--pf-text-muted)",
                        border: "1px solid var(--pf-border)",
                        boxShadow: "var(--pf-shadow-sm)",
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {thinking && (
                <div className="flex justify-start" aria-label="Portfolio assistant is typing">
                  <div
                    className="flex items-center gap-1 rounded-2xl rounded-bl-md px-3.5 py-3"
                    style={{ background: "var(--pf-bg-warm)", border: "1px solid var(--pf-border)" }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--pf-text-dim)" }}
                        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                        transition={{ duration: 0.65, repeat: Infinity, delay: dot * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3"
              style={{ borderTop: "1px solid var(--pf-border)", background: "var(--pf-surface)" }}
            >
              <div
                className="flex items-center gap-2 rounded-full p-1.5 pl-4 focus-within:ring-2"
                style={{
                  background: "var(--pf-bg-warm)",
                  border: "1px solid var(--pf-border-strong)",
                  boxShadow: "0 0 0 2px transparent",
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question..."
                  aria-label="Ask a question about Rithani"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-pf-text-dim"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  aria-label="Send question"
                  className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35"
                  style={{ background: "var(--pf-rose)", color: "#fff" }}
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
        aria-label={open ? "Close portfolio assistant" : "Ask about Rithani"}
        className="group flex h-13 cursor-pointer items-center gap-2.5 rounded-full px-4 text-[12px] font-semibold text-white"
        style={{ background: "var(--pf-rose)", boxShadow: "var(--pf-glow)" }}
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      >
        {open ? (
          <span className="text-[20px] font-normal leading-none" aria-hidden="true">×</span>
        ) : (
          <SparkIcon />
        )}
        <span>{open ? "Close" : "Ask me"}</span>
      </motion.button>
    </div>
  );
}
