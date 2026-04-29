"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  User,
  Building2,
  AtSign,
  MessageSquare,
} from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";

/* ─── Types ───────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

/* ─── Contact Details ─────────────────────────────────────── */
const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@dataovermind.com",
    href: "mailto:contact@dataovermind.com",
    color: "#00C2FF",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-8574840260",
    href: "tel:+918574840260",
    color: "#00FFE5",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91-8574840260",
    href: "https://wa.me/918574840260",
    color: "#8B5CF6",
  },
];

/* ─── Pre-computed particle data (avoids Math.random() hydration mismatch) ── */
const particles = [
  { s: 2.1, o: 0.18, x: 12, y: 8,  d: 7.2, dl: 0.3 },
  { s: 1.4, o: 0.09, x: 85, y: 15, d: 5.8, dl: 1.1 },
  { s: 3.2, o: 0.28, x: 43, y: 72, d: 9.1, dl: 2.4 },
  { s: 1.8, o: 0.14, x: 67, y: 34, d: 6.3, dl: 0.7 },
  { s: 2.6, o: 0.22, x: 24, y: 91, d: 8.4, dl: 3.2 },
  { s: 1.2, o: 0.07, x: 91, y: 56, d: 4.9, dl: 1.8 },
  { s: 3.5, o: 0.31, x: 55, y: 23, d: 7.7, dl: 0.5 },
  { s: 1.6, o: 0.12, x: 8,  y: 67, d: 6.1, dl: 2.9 },
  { s: 2.3, o: 0.20, x: 78, y: 45, d: 8.9, dl: 1.4 },
  { s: 1.9, o: 0.16, x: 35, y: 82, d: 5.5, dl: 3.7 },
  { s: 2.8, o: 0.25, x: 62, y: 11, d: 7.0, dl: 0.9 },
  { s: 1.3, o: 0.08, x: 19, y: 48, d: 9.6, dl: 2.1 },
  { s: 3.0, o: 0.27, x: 73, y: 76, d: 6.7, dl: 3.5 },
  { s: 2.0, o: 0.15, x: 47, y: 5,  d: 8.2, dl: 1.6 },
  { s: 1.5, o: 0.11, x: 3,  y: 39, d: 5.3, dl: 0.2 },
  { s: 2.4, o: 0.19, x: 88, y: 88, d: 7.5, dl: 2.7 },
  { s: 3.3, o: 0.30, x: 31, y: 19, d: 9.3, dl: 3.0 },
  { s: 1.7, o: 0.13, x: 56, y: 61, d: 6.9, dl: 1.3 },
  { s: 2.9, o: 0.24, x: 15, y: 53, d: 8.6, dl: 0.6 },
  { s: 2.2, o: 0.17, x: 81, y: 29, d: 5.1, dl: 2.0 },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.s,
            height: p.s,
            background: `rgba(0, 194, 255, ${p.o})`,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.dl,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Contact Info Card ───────────────────────────────────── */
function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  index,
}: (typeof contactDetails)[0] & { index: number }) {
  return (
    <motion.a
      href={href}
      target={label === "WhatsApp" ? "_blank" : undefined}
      rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-pointer"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
      whileHover={{
        background: "rgba(255, 255, 255, 0.06)",
        borderColor: `${color}33`,
        boxShadow: `0 0 25px ${color}15`,
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-shadow duration-300"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}25`,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className="text-xs font-medium uppercase tracking-wider mb-0.5"
          style={{ color: "#64748B" }}
        >
          {label}
        </span>
        <span
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: "#F0F0F0" }}
        >
          {value}
        </span>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={16}
        className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
        style={{ color }}
      />
    </motion.a>
  );
}

/* ─── Form Input ──────────────────────────────────────────── */
function FormField({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  required,
  onChange,
  textarea,
}: {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const InputTag = textarea ? "textarea" : "input";

  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5"
        style={{ color: focused ? "#00C2FF" : "#94A3B8" }}
      >
        <Icon size={13} />
        {label}
        {!required && (
          <span className="normal-case tracking-normal font-normal" style={{ color: "#475569" }}>
            (optional)
          </span>
        )}
      </label>
      <div className="relative">
        <InputTag
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="input-dark"
          style={{
            ...(textarea ? { minHeight: "140px", resize: "vertical" as const } : {}),
            borderColor: error
              ? "rgba(239, 68, 68, 0.5)"
              : focused
              ? "rgba(0, 194, 255, 0.4)"
              : undefined,
            boxShadow: error
              ? "0 0 0 3px rgba(239, 68, 68, 0.08)"
              : focused
              ? "0 0 0 3px rgba(0, 194, 255, 0.08)"
              : undefined,
          }}
        />
        {/* Focus glow line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          style={{ background: "linear-gradient(90deg, #00C2FF, #00FFE5)" }}
          initial={{ width: "0%" }}
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {error && (
        <motion.span
          className="text-xs"
          style={{ color: "#EF4444" }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  CONTACT PAGE                                              */
/* ═══════════════════════════════════════════════════════════ */
export function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setApiError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#05070A" }}
    >
      {/* ── Background Effects ── */}
      <FloatingParticles />
      <GlowOrb color="blue" size="xl" className="-top-40 -right-40 opacity-30" />
      <GlowOrb color="purple" size="lg" className="bottom-20 -left-40 opacity-20" />
      <GlowOrb color="cyan" size="md" className="top-1/2 right-1/4 opacity-15" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        {/* Page Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-primary mb-5 inline-flex">
            <Sparkles size={12} />
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-tight mb-6">
            Let&apos;s Build Something
            <br />
            Intelligent
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94A3B8" }}
          >
            Tell us about your idea or problem — we&apos;ll help you automate it with AI.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* ── LEFT: Contact Info ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {contactDetails.map((detail, i) => (
                <ContactInfoCard key={detail.label} {...detail} index={i} />
              ))}
            </div>

            {/* Response time note */}
            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl mt-2"
              style={{
                background: "rgba(0, 194, 255, 0.04)",
                border: "1px solid rgba(0, 194, 255, 0.1)",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(0, 194, 255, 0.1)",
                }}
              >
                <Clock size={16} style={{ color: "#00C2FF" }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                We typically respond within{" "}
                <span className="font-semibold" style={{ color: "#00C2FF" }}>
                  24 hours
                </span>
              </p>
            </motion.div>

            {/* Decorative line-art */}
            <motion.div
              className="hidden lg:block mt-auto pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Mini decorative nodes */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00C2FF", boxShadow: "0 0 8px rgba(0,194,255,0.4)" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00FFE5", boxShadow: "0 0 8px rgba(0,255,229,0.4)" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#8B5CF6", boxShadow: "0 0 8px rgba(139,92,246,0.4)" }}
                  />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                  "DataOverMind helped us automate 80% of our manual data pipeline work. Their AI
                  agents are a game-changer."
                </p>
                <p className="text-xs mt-3 font-medium" style={{ color: "#94A3B8" }}>
                  — Founder, TechCorp
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              {/* Glow accent at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,194,255,0.5), transparent)",
                }}
                aria-hidden="true"
              />

              {submitted ? (
                /* ── Success State ── */
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(0, 255, 229, 0.1)",
                      border: "1px solid rgba(0, 255, 229, 0.2)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 size={36} style={{ color: "#00FFE5" }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#F0F0F0" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm max-w-sm" style={{ color: "#94A3B8" }}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours with a
                    detailed response.
                  </p>
                  <button
                    className="btn-secondary mt-8"
                    onClick={() => {
                      setSubmitted(false);
                      setApiError(null);
                      setForm({ name: "", email: "", company: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  {/* Two-col row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      icon={User}
                      label="Name"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      error={errors.name}
                      required
                      onChange={handleChange}
                    />
                    <FormField
                      icon={AtSign}
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      error={errors.email}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <FormField
                    icon={Building2}
                    label="Company"
                    name="company"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={handleChange}
                  />

                  <FormField
                    icon={MessageSquare}
                    label="Message"
                    name="message"
                    placeholder="Tell us about your project, challenges, or how we can help..."
                    value={form.message}
                    error={errors.message}
                    required
                    onChange={handleChange}
                    textarea
                  />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="btn-primary w-full !py-3.5 !text-base group relative overflow-hidden"
                    disabled={sending}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-t-transparent"
                          style={{ borderColor: "#05070A", borderTopColor: "transparent" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </motion.button>

                  {/* API Error */}
                  {apiError && (
                    <motion.div
                      className="flex items-center gap-2 p-3 rounded-lg text-sm"
                      style={{
                        background: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: "#FCA5A5",
                      }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {apiError}
                    </motion.div>
                  )}
                </form>
              )}
            </div>

            {/* ── Schedule a Call CTA ── */}
            <motion.div
              className="mt-6 p-6 rounded-2xl text-center relative overflow-hidden"
              style={{
                background: "rgba(139, 92, 246, 0.04)",
                border: "1px solid rgba(139, 92, 246, 0.12)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {/* Subtle top glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
                }}
                aria-hidden="true"
              />

              <p className="text-sm mb-1 font-medium" style={{ color: "#F0F0F0" }}>
                Or book a call
              </p>
              <p className="text-xs mb-5" style={{ color: "#64748B" }}>
                Schedule a 30-minute discovery call with our AI team
              </p>
              <a
                href="#"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Calendar size={16} />
                Schedule a Call
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
