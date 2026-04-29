"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WHATSAPP_URL = "https://wa.me/918574840260";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  /* Show after a short delay so it doesn't flash on initial load */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full cursor-pointer group"
          style={{
            background: "#25D366",
            boxShadow:
              "0 0 20px rgba(37, 211, 102, 0.3), 0 4px 14px rgba(0, 0, 0, 0.3)",
          }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow:
              "0 0 30px rgba(37, 211, 102, 0.45), 0 6px 20px rgba(0, 0, 0, 0.35)",
          }}
          whileTap={{ scale: 0.92 }}
        >
          {/* WhatsApp SVG icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              fill="white"
            />
            <path
              d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.77.463 3.494 1.344 5.016L2 22l5.112-1.32A9.958 9.958 0 0012.004 22C17.53 22 22 17.522 22 11.996 22 6.478 17.53 2 12.004 2zm0 18.184a8.16 8.16 0 01-4.37-1.263l-.313-.186-3.25.84.87-3.175-.205-.325A8.134 8.134 0 013.82 12.004c0-4.515 3.67-8.188 8.184-8.188 4.515 0 8.18 3.673 8.18 8.188 0 4.52-3.665 8.18-8.18 8.18z"
              fill="white"
            />
          </svg>

          {/* Subtle ping animation ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: "#25D366" }}
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
