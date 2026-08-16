"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MotionRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  selector?: string;
  scroll?: boolean;
}

export function MotionReveal({ children, className, selector = "[data-reveal]", scroll = false, ...props }: MotionRevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      if (!targets.length || reduceMotion) return;

      const animation = gsap.from(targets, {
        y: 14,
        scale: 0.995,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        paused: scroll,
        clearProps: "transform",
      });

      if (scroll && scope.current) {
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 84%",
          once: true,
          onEnter: () => animation.play(),
        });
      }
    },
    { scope }
  );

  return (
    <div ref={scope} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
