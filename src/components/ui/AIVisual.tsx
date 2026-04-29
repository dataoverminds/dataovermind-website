"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Animated AI brain/network visual for the hero section right side.
 * Pure CSS/SVG — no canvas — for a floating, glowing neural cluster effect.
 */

const nodes = [
  { cx: 200, cy: 180, r: 6, delay: 0 },
  { cx: 280, cy: 120, r: 5, delay: 0.3 },
  { cx: 320, cy: 220, r: 7, delay: 0.6 },
  { cx: 160, cy: 280, r: 5, delay: 0.9 },
  { cx: 240, cy: 300, r: 6, delay: 1.2 },
  { cx: 340, cy: 320, r: 4, delay: 0.4 },
  { cx: 140, cy: 160, r: 4, delay: 0.7 },
  { cx: 360, cy: 160, r: 5, delay: 1.0 },
  { cx: 100, cy: 240, r: 3, delay: 0.2 },
  { cx: 300, cy: 380, r: 4, delay: 0.5 },
  { cx: 380, cy: 280, r: 3, delay: 0.8 },
  { cx: 220, cy: 80, r: 4, delay: 1.1 },
  { cx: 180, cy: 380, r: 3, delay: 0.15 },
  { cx: 400, cy: 200, r: 3, delay: 0.45 },
  { cx: 260, cy: 240, r: 8, delay: 0 }, // Central node
];

// Connect nearby nodes
const connections: [number, number][] = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i].cx - nodes[j].cx;
    const dy = nodes[i].cy - nodes[j].cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160) {
      connections.push([i, j]);
    }
  }
}

export function AIVisual() {
  return (
    <motion.div
      className="relative w-full h-full min-h-[420px] flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
    >
      {/* Large ambient glow behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-primary/8 blur-[80px] animate-glow-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-48 h-48 rounded-full bg-accent/6 blur-[60px] animate-glow-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* SVG Network */}
      <svg
        viewBox="40 40 420 400"
        className="w-full h-full max-w-[480px]"
        fill="none"
      >
        <defs>
          {/* Glow filter */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          {/* Radial gradient for center core */}
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="1" />
            <stop offset="60%" stopColor="#00FFE5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00FFE5" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {connections.map(([i, j], idx) => (
          <motion.line
            key={`line-${idx}`}
            x1={nodes[i].cx}
            y1={nodes[i].cy}
            x2={nodes[j].cx}
            y2={nodes[j].cy}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            filter="url(#lineGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.8 + idx * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Data flow pulses along connections */}
        {connections
          .filter((_, idx) => idx % 3 === 0)
          .map(([i, j], idx) => (
            <motion.circle
              key={`pulse-${idx}`}
              r="2"
              fill="#00FFE5"
              filter="url(#nodeGlow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [nodes[i].cx, nodes[j].cx],
                cy: [nodes[i].cy, nodes[j].cy],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2.5 + Math.random(),
                delay: 2 + idx * 0.6,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <g key={`node-${idx}`}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3.5}
              fill="none"
              stroke="#00C2FF"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 4,
                delay: node.delay + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />

            {/* Core dot */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={idx === nodes.length - 1 ? "url(#coreGrad)" : "#00C2FF"}
              filter="url(#nodeGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.15, 1],
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: node.delay + 0.8,
                },
                scale: {
                  duration: 3,
                  delay: node.delay + 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />
          </g>
        ))}

        {/* Central brain core — extra large glow */}
        <motion.circle
          cx={260}
          cy={240}
          r={35}
          fill="url(#coreGrad)"
          opacity={0.08}
          animate={{
            r: [35, 45, 35],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Glassmorphism floating labels */}
      <motion.div
        className="absolute top-12 right-4 sm:right-8 px-3 py-1.5 rounded-lg text-[10px] font-medium text-primary/80 bg-primary/5 backdrop-blur-sm border border-primary/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1.5 animate-pulse" />
        Neural Processing
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-4 sm:left-8 px-3 py-1.5 rounded-lg text-[10px] font-medium text-accent/80 bg-accent/5 backdrop-blur-sm border border-accent/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
        Model Inference: 12ms
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-0 px-3 py-1.5 rounded-lg text-[10px] font-medium text-purple/80 bg-purple/5 backdrop-blur-sm border border-purple/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        98.7% Accuracy
      </motion.div>
    </motion.div>
  );
}
