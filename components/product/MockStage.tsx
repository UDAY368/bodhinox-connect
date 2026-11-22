"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/components/ui/cx";

type MockStageProps = {
  /** What the mock-up shows, read out as one image. Inner content is hidden from assistive tech. */
  label: string;
  /** Width the mock-up is drawn at, in px. It is scaled to fit the container. */
  designWidth?: number;
  children: ReactNode;
  className?: string;
  /** Classes for the scaled canvas (e.g. a fixed design height). */
  canvasClassName?: string;
};

/**
 * Draws a product mock-up at a fixed design width and scales it to fit its
 * container, like a screenshot, so the layout and text proportions match the
 * real app at every viewport. CSS does the first paint (typed calc in
 * globals.css .mock-canvas); a ResizeObserver keeps it exact in browsers
 * without typed arithmetic.
 */
export function MockStage({ label, designWidth = 1200, children, className, canvasClassName }: MockStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const apply = () => {
      const w = stage.clientWidth;
      if (w > 0) canvas.style.zoom = String(Math.min(1.25, w / designWidth));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={label}
      className={cx("mock-stage select-none", className)}
      style={{ ["--mock-w" as string]: designWidth }}
    >
      <div ref={canvasRef} aria-hidden className={cx("mock-canvas", canvasClassName)}>
        {children}
      </div>
    </div>
  );
}
