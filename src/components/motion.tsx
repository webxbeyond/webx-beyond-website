"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";
import { useRef, useMemo } from "react";

export function FadeIn(props: PropsWithChildren<{ delay?: number; className?: string }>) {
  const { children, delay = 0, className } = props;
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReduce ? { opacity: 1 } : { opacity: 0 }}
      whileInView={prefersReduce ? { opacity: 1 } : { opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={prefersReduce ? undefined : { duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp(props: PropsWithChildren<{ delay?: number; className?: string }>) {
  const { children, delay = 0, className } = props;
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={prefersReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={prefersReduce ? undefined : { duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn(props: PropsWithChildren<{ delay?: number; className?: string }>) {
  const { children, delay = 0, className } = props;
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      whileInView={prefersReduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={prefersReduce ? undefined : { duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper: moves children slightly based on scroll progress within element bounds
export function Parallax(props: PropsWithChildren<{ offset?: number; mobileFactor?: number; className?: string }>) {
  const { children, offset = 40, mobileFactor = 0.45, className } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduce = useReducedMotion();
  const isClient = typeof window !== 'undefined';
  const dynamicOffset = useMemo(() => {
    if (!isClient) return offset;
    return window.innerWidth < 640 ? offset * mobileFactor : offset;
  }, [offset, mobileFactor, isClient]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [dynamicOffset, -dynamicOffset]);
  return (
    <motion.div ref={ref} style={prefersReduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

// Floating subtle animation for decorative elements (loops)
export function Float(props: PropsWithChildren<{ amplitude?: number; duration?: number; delay?: number; className?: string }>) {
  const { children, amplitude = 8, duration = 6, delay = 0, className } = props;
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={prefersReduce ? undefined : { y: [0, -amplitude, 0, amplitude * 0.6, 0] }}
      transition={prefersReduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container utility
export function Stagger({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReduce ? undefined : "hidden"}
      whileInView={prefersReduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem(props: PropsWithChildren<{ y?: number }>) {
  const { children, y = 14 } = props;
  const prefersReduce = useReducedMotion();
  return (
    <motion.div
      variants={prefersReduce ? undefined : { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
      style={prefersReduce ? { opacity: 1, transform: 'none' } : undefined}
    >
      {children}
    </motion.div>
  );
}
