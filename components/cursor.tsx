"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import "./cursor.css";

// A small, pale-blue flower that echoes the portfolio's soft accents.
const PETAL_ANGLES = [0, 90, 180, 270];
const CURSOR_CLASS = "soft-petal-cursor-active";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const pointerId = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let hovering = false;

    const hide = () => {
      document.documentElement.classList.remove(CURSOR_CLASS);
      if (visible) setIsVisible(false);
      if (hovering) setIsHovering(false);
      setIsPressed(false);
      pointerId.current = null;
      visible = hovering = false;
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      if (!visible) {
        visible = true;
        setIsVisible(true);
        document.documentElement.classList.add(CURSOR_CLASS);
      }
      const target = event.target;
      const clickable = target instanceof Element && Boolean(target.closest('a[href], button:not(:disabled), [role="button"], summary, input[type="submit"], input[type="button"]'));
      if (clickable !== hovering) {
        hovering = clickable;
        setIsHovering(clickable);
      }
    };

    const press = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse" || event.button !== 0) return;
      pointerId.current = event.pointerId;
      setIsPressed(true);
    };
    const release = (event: PointerEvent) => {
      if (event.pointerId !== pointerId.current) return;
      pointerId.current = null;
      setIsPressed(false);
    };
    const onPointerPreferenceChange = () => { if (!finePointer.matches) hide(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    finePointer.addEventListener("change", onPointerPreferenceChange);

    return () => {
      document.documentElement.classList.remove(CURSOR_CLASS);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      finePointer.removeEventListener("change", onPointerPreferenceChange);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-custom-cursor="soft-petal"
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none"
      style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        focusable="false"
        animate={{ scale: isPressed ? 0.85 : isHovering ? 1.22 : 1, rotate: reducedMotion ? 0 : isHovering ? 25 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 28 }}
      >
        <motion.g animate={{ fill: isHovering ? "#94BECE" : "#A7CBD9" }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
          {PETAL_ANGLES.map((angle, index) => <ellipse key={angle} cx="14" cy="8" rx="5" ry="7" transform={`rotate(${angle} 14 14)`} opacity={index % 2 === 0 ? 1 : 0.78} />)}
        </motion.g>
        <circle cx="14" cy="14" r="2.2" fill="var(--background, #ffffff)" />
      </motion.svg>
    </motion.div>
  );
}
