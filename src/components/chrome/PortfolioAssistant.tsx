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

function SpeakerIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4Z" />
      {muted ? (
        <>
          <path d="m22 9-6 6" />
          <path d="m16 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      )}
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  );
}

export function PortfolioAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [thinking, setThinking] = useState(false);
  const [voiceRepliesEnabled, setVoiceRepliesEnabled] = useState(true);
  const [speechLoadingMessageId, setSpeechLoadingMessageId] = useState<number | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);
  const [speechErrorMessageId, setSpeechErrorMessageId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechAbortRef = useRef<AbortController | null>(null);
  const audioUrlsRef = useRef(new Map<number, string>());

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
      if (event.key === "Escape") {
        setOpen(false);
        speechAbortRef.current?.abort();
        audioRef.current?.pause();
        setSpeechLoadingMessageId(null);
        setSpeakingMessageId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const audioUrls = audioUrlsRef.current;

    return () => {
      speechAbortRef.current?.abort();
      audioRef.current?.pause();
      for (const url of audioUrls.values()) URL.revokeObjectURL(url);
      audioUrls.clear();
    };
  }, []);

  const stopSpeech = () => {
    speechAbortRef.current?.abort();
    speechAbortRef.current = null;
    audioRef.current?.pause();
    audioRef.current = null;
    setSpeechLoadingMessageId(null);
    setSpeakingMessageId(null);
  };

  const playAudio = async (messageId: number, url: string) => {
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.addEventListener("play", () => {
      if (audioRef.current !== audio) return;
      setSpeechLoadingMessageId(null);
      setSpeechErrorMessageId(null);
      setSpeakingMessageId(messageId);
    });
    audio.addEventListener("ended", () => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setSpeakingMessageId(null);
    });
    audio.addEventListener("error", () => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setSpeechLoadingMessageId(null);
      setSpeakingMessageId(null);
      setSpeechErrorMessageId(messageId);
    });

    try {
      await audio.play();
    } catch {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setSpeechLoadingMessageId(null);
      setSpeakingMessageId(null);
      setSpeechErrorMessageId(messageId);
    }
  };

  const speakMessage = async (messageId: number, text: string) => {
    if (speakingMessageId === messageId) {
      stopSpeech();
      return;
    }

    stopSpeech();
    setSpeechErrorMessageId(null);

    const cachedUrl = audioUrlsRef.current.get(messageId);
    if (cachedUrl) {
      await playAudio(messageId, cachedUrl);
      return;
    }

    const controller = new AbortController();
    speechAbortRef.current = controller;
    setSpeechLoadingMessageId(messageId);

    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Speech request failed");

      const audioBlob = await response.blob();
      if (!audioBlob.size) throw new Error("Speech response was empty");
      if (speechAbortRef.current !== controller) return;

      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlsRef.current.set(messageId, audioUrl);
      speechAbortRef.current = null;
      await playAudio(messageId, audioUrl);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (speechAbortRef.current === controller) speechAbortRef.current = null;
      setSpeechLoadingMessageId(null);
      setSpeakingMessageId(null);
      setSpeechErrorMessageId(messageId);
    }
  };

  const closeAssistant = () => {
    stopSpeech();
    setOpen(false);
  };

  const toggleVoiceReplies = () => {
    if (voiceRepliesEnabled) stopSpeech();
    setVoiceRepliesEnabled((enabled) => !enabled);
  };

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
      if (voiceRepliesEnabled) void speakMessage(assistantMessageId, answer);
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
                onClick={toggleVoiceReplies}
                aria-label={voiceRepliesEnabled ? "Turn off voice replies" : "Turn on voice replies"}
                aria-pressed={voiceRepliesEnabled}
                title={voiceRepliesEnabled ? "Voice replies on" : "Voice replies off"}
                className="ml-auto grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-pf-surface-2"
                style={{ color: voiceRepliesEnabled ? "var(--pf-rose-ink)" : "var(--pf-text-dim)" }}
              >
                <SpeakerIcon muted={!voiceRepliesEnabled} />
              </button>
              <button
                type="button"
                onClick={closeAssistant}
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
                    {message.role === "assistant" ? (
                      <button
                        type="button"
                        onClick={() => void speakMessage(message.id, message.text)}
                        disabled={speechLoadingMessageId === message.id}
                        aria-label={
                          speakingMessageId === message.id
                            ? "Stop reading this reply"
                            : "Read this reply aloud"
                        }
                        title={
                          speechErrorMessageId === message.id
                            ? "Voice reply failed. Try again"
                            : speakingMessageId === message.id
                              ? "Stop"
                              : "Read aloud"
                        }
                        className="mt-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium transition-colors hover:bg-pf-surface-2 disabled:cursor-wait disabled:opacity-60"
                        style={{
                          color:
                            speechErrorMessageId === message.id
                              ? "var(--pf-rose-ink)"
                              : "var(--pf-text-dim)",
                        }}
                      >
                        {speakingMessageId === message.id ? (
                          <>
                            <StopIcon /> Stop
                          </>
                        ) : speechLoadingMessageId === message.id ? (
                          <>
                            <motion.span
                              className="h-2.5 w-2.5 rounded-full border border-current border-t-transparent"
                              animate={reduceMotion ? undefined : { rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            Loading voice
                          </>
                        ) : (
                          <>
                            <SpeakerIcon />
                            {speechErrorMessageId === message.id ? "Try voice again" : "Read aloud"}
                          </>
                        )}
                      </button>
                    ) : null}
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
        onClick={() => {
          if (open) closeAssistant();
          else setOpen(true);
        }}
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
