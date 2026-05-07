"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onComplete?: () => void;
};

const NAME = "SAHIL";
const DISPLAY_DURATION = 2700;
const PROGRESS_DURATION = 2.5;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, DISPLAY_DURATION);

    return () => window.clearTimeout(exitTimer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsMounted(false);
        onComplete?.();
      }}
    >
      {isVisible ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          aria-label="Loading Sahil portfolio"
          role="status"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#0F172A",
            color: "#F8FAFC",
            fontFamily:
              'Inter, "Space Grotesk", Syne, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 42%, rgba(99, 102, 241, 0.16), transparent 34%)",
            }}
          />

          <main
            style={{
              position: "relative",
              display: "grid",
              justifyItems: "center",
              gap: "clamp(0.75rem, 2vw, 1rem)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <h1
              aria-label="Sahil"
              style={{
                display: "flex",
                gap: "clamp(0.08em, 1vw, 0.16em)",
                margin: 0,
                fontSize: "clamp(4rem, 14vw, 11rem)",
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 0.9,
              }}
            >
              {NAME.split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  style={{
                    display: "inline-block",
                    textShadow: "0 0 42px rgba(99, 102, 241, 0.28)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.32, duration: 0.55, ease: "easeOut" }}
              style={{
                margin: 0,
                color: "rgba(226, 232, 240, 0.76)",
                fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              designer &amp; developer
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.7, 1],
                }}
                style={{
                  display: "inline-block",
                  marginLeft: "0.35rem",
                  color: "#6366F1",
                }}
              >
                |
              </motion.span>
            </motion.p>
          </main>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              left: 0,
              height: 2,
              background: "rgba(148, 163, 184, 0.16)",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: PROGRESS_DURATION,
                ease: "easeInOut",
              }}
              style={{
                width: "100%",
                height: "100%",
                originX: 0,
                background: "#6366F1",
                boxShadow: "0 0 24px rgba(99, 102, 241, 0.7)",
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
