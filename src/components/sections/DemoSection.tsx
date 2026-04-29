"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Upload,
  FileText,
  MessageSquare,
  Search,
  Zap,
  Database,
  Clock,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";

/* ─── Types ─── */
interface Message {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: {
    sources?: number;
    latency?: string;
    model?: string;
    confidence?: string;
  };
  isTyping?: boolean;
}

/* ─── Pre-built AI responses ─── */
const AI_RESPONSES: Record<string, { text: string; meta: Message["metadata"] }> = {
  "Summarize this document": {
    text: `Based on my analysis of the uploaded document, here's a structured summary:\n\n**Key Findings:**\n• Revenue grew 34% YoY driven by AI product adoption\n• Customer retention improved to 94% after deploying automated support\n• Operational costs reduced by 28% through workflow automation\n\n**Recommendations:**\n1. Scale the AI-driven support system to handle Tier 2 queries\n2. Implement predictive analytics for churn prevention\n3. Expand RAG pipeline to internal knowledge bases\n\nThe document indicates strong ROI from AI integration, with a projected 6-month payback period on implementation costs.`,
    meta: { sources: 3, latency: "1.2s", model: "GPT-4 Turbo", confidence: "96%" },
  },
  "Answer based on company knowledge": {
    text: `I've searched across your connected knowledge base (847 documents, 12 databases) and found the following:\n\n**Pricing Tiers:**\n• Starter: $49/mo — Up to 1,000 API calls, 1 AI agent\n• Growth: $199/mo — Up to 25,000 API calls, 5 AI agents\n• Enterprise: Custom — Unlimited, dedicated infrastructure\n\n**Most Common Client Questions:**\n1. Integration timeline: Typically 2–4 weeks\n2. Data security: SOC 2 Type II certified, end-to-end encryption\n3. Languages supported: 40+ languages via multilingual embeddings\n\nWould you like me to draft a response template for any of these?`,
    meta: { sources: 12, latency: "0.8s", model: "GPT-4 Turbo", confidence: "98%" },
  },
  "Automate customer queries": {
    text: `Here's a deployment plan for automating your customer support with AI:\n\n**Phase 1 — Instant Setup (Week 1):**\n✅ Connect knowledge base (docs, FAQs, tickets)\n✅ Deploy RAG pipeline with semantic search\n✅ Launch AI chatbot on your support portal\n\n**Phase 2 — Learning Loop (Weeks 2–4):**\n🔄 Fine-tune on your historical resolved tickets\n🔄 Add escalation rules for complex queries\n🔄 Implement human-in-the-loop review system\n\n**Expected Impact:**\n• 70% of Tier 1 queries handled automatically\n• Response time: <3 seconds (vs. 4.2 hours human avg)\n• Estimated annual savings: $180K–$320K\n\nShall I generate a detailed implementation roadmap?`,
    meta: { sources: 5, latency: "1.5s", model: "GPT-4 Turbo", confidence: "94%" },
  },
  default: {
    text: `Great question! I've analyzed your query using our RAG pipeline and cross-referenced it with our knowledge base.\n\n**Here's what I found:**\n\nOur AI systems combine retrieval-augmented generation with fine-tuned language models to deliver accurate, context-aware responses. The pipeline works in 3 stages:\n\n1. **Semantic Search** — Your query is embedded and matched against the most relevant documents\n2. **Context Assembly** — Top-k chunks are assembled with conversation history\n3. **Generation** — The LLM generates a grounded, cited response\n\nThis approach ensures factual accuracy while maintaining natural conversation flow. Want to see it in action with your own data?`,
    meta: { sources: 8, latency: "1.1s", model: "GPT-4 Turbo", confidence: "95%" },
  },
};

const EXAMPLE_PROMPTS = [
  { icon: FileText, text: "Summarize this document" },
  { icon: Database, text: "Answer based on company knowledge" },
  { icon: MessageSquare, text: "Automate customer queries" },
];

/* ─── Typing Hook ─── */
function useTypingAnimation(text: string, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, isDone };
}

/* ─── Typing Message Component ─── */
function TypingMessage({
  content,
  metadata,
  onDone,
}: {
  content: string;
  metadata?: Message["metadata"];
  onDone: () => void;
}) {
  const { displayed, isDone } = useTypingAnimation(content, 10);

  useEffect(() => {
    if (isDone) onDone();
  }, [isDone, onDone]);

  return (
    <div>
      <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#CBD5E1" }}>
        {formatBoldText(displayed)}
        {!isDone && (
          <span
            className="inline-block w-[6px] h-[16px] ml-0.5 animate-pulse"
            style={{ background: "#00C2FF", borderRadius: 1 }}
          />
        )}
      </div>
      {isDone && metadata && <ResponseMeta metadata={metadata} />}
    </div>
  );
}

/* ─── Format bold/bullet text ─── */
function formatBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold" style={{ color: "#F0F0F0" }}>
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ─── Response Metadata ─── */
function ResponseMeta({ metadata }: { metadata: Message["metadata"] }) {
  if (!metadata) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-3 mt-3 pt-3"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {metadata.sources && (
        <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "#00FFE5" }}>
          <Search size={10} /> {metadata.sources} sources
        </span>
      )}
      {metadata.latency && (
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#64748B" }}>
          <Clock size={10} /> {metadata.latency}
        </span>
      )}
      {metadata.model && (
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#64748B" }}>
          <Sparkles size={10} /> {metadata.model}
        </span>
      )}
      {metadata.confidence && (
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#00C2FF" }}>
          <Zap size={10} /> {metadata.confidence} confident
        </span>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function DemoSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUploadHint, setShowUploadHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isProcessing) return;

      const userMsg: Message = { id: Date.now(), role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsProcessing(true);

      // Simulate RAG pipeline processing stages
      const systemMsg: Message = {
        id: Date.now() + 1,
        role: "system",
        content: "Searching knowledge base...",
      };
      setTimeout(() => setMessages((prev) => [...prev, systemMsg]), 300);

      // Update system message through stages
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === systemMsg.id ? { ...m, content: "Retrieving relevant context..." } : m
          )
        );
      }, 900);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === systemMsg.id ? { ...m, content: "Generating response..." } : m
          )
        );
      }, 1500);

      // Add AI response
      setTimeout(() => {
        const resp = AI_RESPONSES[text.trim()] || AI_RESPONSES.default;
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== systemMsg.id),
          {
            id: Date.now() + 2,
            role: "assistant",
            content: resp.text,
            metadata: resp.meta,
            isTyping: true,
          },
        ]);
      }, 2100);
    },
    [isProcessing]
  );

  const handleTypingDone = useCallback(() => {
    setIsProcessing(false);
    setMessages((prev) => prev.map((m) => (m.isTyping ? { ...m, isTyping: false } : m)));
  }, []);

  const resetChat = () => {
    setMessages([]);
    setIsProcessing(false);
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <section id="demo" className="relative section-padding overflow-hidden">
      <GlowOrb color="cyan" size="lg" className="top-[10%] right-[-5%] opacity-12" />
      <GlowOrb color="purple" size="md" className="bottom-[10%] left-[-5%] opacity-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <SectionHeading
          badge="Live Demo"
          title="Experience AI in Action"
          subtitle="Upload your data or ask anything. See how our AI understands and responds instantly."
        />

        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {/* ── Chat Container ── */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "rgba(8, 12, 20, 0.7)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 0 40px rgba(0, 194, 255, 0.04), 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Header Bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #00C2FF, #00FFE5)" }}
                  >
                    <Bot size={18} style={{ color: "#05070A" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">DataOverMind AI</span>
                      <span
                        className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: "rgba(0, 255, 229, 0.1)",
                          color: "#00FFE5",
                          border: "1px solid rgba(0, 255, 229, 0.2)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FFE5" }} />
                        Online
                      </span>
                    </div>
                    <span className="text-[11px]" style={{ color: "#64748B" }}>
                      RAG Pipeline · GPT-4 Turbo · 847 docs indexed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={resetChat}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      style={{ color: "#64748B", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <RotateCcw size={12} />
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setShowUploadHint(!showUploadHint)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{
                      color: showUploadHint ? "#00C2FF" : "#64748B",
                      background: showUploadHint ? "rgba(0,194,255,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${showUploadHint ? "rgba(0,194,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Upload size={12} />
                    Upload
                  </button>
                </div>
              </div>

              {/* Upload Hint Bar */}
              <AnimatePresence>
                {showUploadHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 py-3 flex items-center gap-3"
                      style={{
                        background: "rgba(0, 194, 255, 0.03)",
                        borderBottom: "1px solid rgba(0, 194, 255, 0.08)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border-dashed"
                        style={{ border: "1.5px dashed rgba(0, 194, 255, 0.3)", color: "#00C2FF" }}
                      >
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: "#94A3B8" }}>
                          Drag & drop files here or click to browse
                        </p>
                        <p className="text-[10px]" style={{ color: "#64748B" }}>
                          Supports PDF, DOCX, CSV, TXT — up to 50MB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Messages Area ── */}
              <div className="relative" style={{ minHeight: isEmpty ? "320px" : "380px", maxHeight: "420px", overflowY: "auto" }}>
                {isEmpty ? (
                  /* ── Empty State ── */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,194,255,0.1), rgba(139,92,246,0.1))",
                          border: "1px solid rgba(0,194,255,0.15)",
                        }}
                      >
                        <Sparkles size={24} style={{ color: "#00C2FF" }} />
                      </div>
                      <h3 className="text-base font-semibold mb-1.5">What can I help you with?</h3>
                      <p className="text-xs mb-8 max-w-xs" style={{ color: "#64748B" }}>
                        Ask anything or try one of the examples below
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        {EXAMPLE_PROMPTS.map((prompt) => (
                          <button
                            key={prompt.text}
                            onClick={() => sendMessage(prompt.text)}
                            disabled={isProcessing}
                            className="group flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-left transition-all duration-200 cursor-pointer disabled:opacity-50"
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(255, 255, 255, 0.07)",
                              color: "#94A3B8",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(0, 194, 255, 0.06)";
                              e.currentTarget.style.borderColor = "rgba(0, 194, 255, 0.2)";
                              e.currentTarget.style.color = "#F0F0F0";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                              e.currentTarget.style.color = "#94A3B8";
                            }}
                          >
                            <prompt.icon size={15} style={{ color: "#00C2FF" }} className="shrink-0" />
                            <span className="text-[13px]">{prompt.text}</span>
                            <ChevronRight
                              size={14}
                              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                              style={{ color: "#00C2FF" }}
                            />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* ── Chat Messages ── */
                  <div className="p-5 space-y-4">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => {
                        if (msg.role === "system") {
                          return (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex justify-center"
                            >
                              <span
                                className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full animate-pulse"
                                style={{
                                  background: "rgba(0, 194, 255, 0.06)",
                                  border: "1px solid rgba(0, 194, 255, 0.1)",
                                  color: "#00C2FF",
                                }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full animate-ping"
                                  style={{ background: "#00C2FF" }}
                                />
                                {msg.content}
                              </span>
                            </motion.div>
                          );
                        }

                        if (msg.role === "user") {
                          return (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex gap-3 justify-end"
                            >
                              <div
                                className="max-w-[75%] px-4 py-3 text-sm leading-relaxed"
                                style={{
                                  background: "linear-gradient(135deg, rgba(0,194,255,0.12), rgba(0,194,255,0.06))",
                                  border: "1px solid rgba(0,194,255,0.2)",
                                  borderRadius: "1rem 1rem 0.25rem 1rem",
                                  color: "#F0F0F0",
                                }}
                              >
                                {msg.content}
                              </div>
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                }}
                              >
                                <User size={14} style={{ color: "#94A3B8" }} />
                              </div>
                            </motion.div>
                          );
                        }

                        /* assistant */
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex gap-3 justify-start"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "linear-gradient(135deg, #00C2FF, #00FFE5)" }}
                            >
                              <Bot size={14} style={{ color: "#05070A" }} />
                            </div>
                            <div
                              className="max-w-[85%] px-4 py-3"
                              style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.07)",
                                borderRadius: "1rem 1rem 1rem 0.25rem",
                              }}
                            >
                              {msg.isTyping ? (
                                <TypingMessage
                                  content={msg.content}
                                  metadata={msg.metadata}
                                  onDone={handleTypingDone}
                                />
                              ) : (
                                <div>
                                  <div
                                    className="text-sm leading-relaxed whitespace-pre-wrap"
                                    style={{ color: "#CBD5E1" }}
                                  >
                                    {formatBoldText(msg.content)}
                                  </div>
                                  <ResponseMeta metadata={msg.metadata} />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* ── Input Bar ── */}
              <div
                className="px-5 py-4"
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  background: "rgba(255, 255, 255, 0.015)",
                }}
              >
                {/* Example prompt pills (when messages exist) */}
                {messages.length > 0 && !isProcessing && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {EXAMPLE_PROMPTS.filter((p) => !messages.some((m) => m.content === p.text)).map((prompt) => (
                      <button
                        key={prompt.text}
                        onClick={() => sendMessage(prompt.text)}
                        className="text-[11px] px-2.5 py-1 rounded-full transition-all cursor-pointer"
                        style={{
                          color: "#64748B",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#00C2FF";
                          e.currentTarget.style.borderColor = "rgba(0,194,255,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#64748B";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        }}
                      >
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex gap-2"
                >
                  <div
                    className="flex-1 flex items-center gap-2 rounded-xl px-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Search size={15} style={{ color: "#64748B" }} className="shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything..."
                      disabled={isProcessing}
                      className="w-full py-3 bg-transparent text-sm outline-none placeholder:text-[#475569] disabled:opacity-50"
                      style={{ color: "#F0F0F0" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isProcessing}
                    className="btn-primary !p-3 !rounded-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send size={16} />
                  </button>
                </form>

                {/* Bottom note */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="text-[10px]" style={{ color: "#475569" }}>
                    Powered by advanced RAG and LLM systems
                  </span>
                  <span style={{ color: "#475569", fontSize: "10px" }}>·</span>
                  <span className="text-[10px]" style={{ color: "#475569" }}>
                    Sub-second retrieval
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
