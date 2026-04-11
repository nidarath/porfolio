"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

// heart-shaped clover leaf
const LEAF = "M 0,0 C -6,0 -10,-5 -8,-10 C -6,-15 0,-16 0,-12 C 0,-16 6,-15 8,-10 C 10,-5 6,0 0,0 Z";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // .67% chance of lucky 4-leaf — chosen once on mount
  const isFourLeaf = useRef(Math.random() < 0.0067);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;
    setIsVisible(true);

    const isClickable = (el: HTMLElement): boolean => {
      if (!el || el === document.body) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === "a" || tag === "button") return true;
      if (el.getAttribute("role") === "button") return true;
      if (el.classList.contains("cursor-pointer")) return true;
      return isClickable(el.parentElement as HTMLElement);
    };

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsHovering(isClickable(e.target as HTMLElement));
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const lucky = isFourLeaf.current;

  const leafColor     = lucky ? (isHovering ? "#79ABBD" : "#72c46e") : (isHovering ? "#79ABBD" : "#6db86a");
  const leafColorDark = lucky ? (isHovering ? "#5a9bb5" : "#57a853") : (isHovering ? "#5a9bb5" : "#52a04f");
  const stemColor     = isHovering ? "#4a8aa0" : (lucky ? "#3a8a3a" : "#4a7a47");

  // leaf angles: 4-leaf at 90° intervals, 3-leaf at 120°
  const angles = lucky ? [0, 90, 180, 270] : [0, 120, 240];

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-55%", rotate: -25 }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.25 : 1,
          rotate: isHovering ? [0, -8, 8, -4, 4, 0] : 0,
        }}
        transition={
          isHovering
            ? { scale: { type: "spring", stiffness: 300, damping: 20 }, rotate: { duration: 0.5, ease: "easeInOut" } }
            : { type: "spring", stiffness: 300, damping: 20 }
        }
      >
        <svg width="38" height="44" viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="clover-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#00000022" />
            </filter>
          </defs>

          <g transform="translate(19,19)" filter="url(#clover-shadow)">
            {angles.map((angle, i) => (
              <motion.path
                key={angle}
                d={LEAF}
                transform={`rotate(${angle})`}
                animate={{ fill: i % 2 === 0 ? leafColor : leafColorDark }}
                transition={{ duration: 0.2 }}
              />
            ))}

            <motion.circle cx="0" cy="0" r="3.5"
              animate={{ fill: leafColor }}
              transition={{ duration: 0.2 }}
            />

            {angles.map((angle) => {
              const rad = angle * Math.PI / 180;
              return (
                <line
                  key={`vein-${angle}`}
                  x1="0" y1="0"
                  x2={10 * Math.sin(rad)}
                  y2={-10 * Math.cos(rad)}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          <motion.path
            d={lucky ? "M 19,35 Q 17,39 18,43" : "M 19,27 Q 17,35 18,43"}
            animate={{ stroke: stemColor }}
            transition={{ duration: 0.2 }}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {lucky && (
            <motion.text
              x="29" y="9" fontSize="7" fill="#ffe566"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.text>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
