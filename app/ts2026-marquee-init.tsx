"use client";

import { useEffect } from "react";
import { initTs2026Marquee, TS2026_MARQUEE_ROOT_ID } from "./ts2026-marquee";

type Fiber = {
  tag: number;
  stateNode: unknown;
  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
};
type FiberRoot = { current: Fiber };
const HOST_ROOT = 3;

function isCommitted(node: Element): boolean {
  const key = Object.keys(node).find((k) => k.startsWith("__reactFiber$"));
  let fiber = key ? (node as unknown as Record<string, Fiber | undefined>)[key] : undefined;
  if (!fiber) return false;
  while (fiber.return) fiber = fiber.return;
  if (fiber.tag !== HOST_ROOT) return false;
  const root = fiber.stateNode as FiberRoot | null;
  if (!root?.current) return false;
  const stack: Fiber[] = [root.current];
  while (stack.length) {
    const f = stack.pop()!;
    if (f.stateNode === node) return true;
    if (f.sibling) stack.push(f.sibling);
    if (f.child) stack.push(f.child);
  }
  return false;
}

const HYDRATION_WAIT_MS = 5000;

const POLL_MS = 16;

export default function Ts2026MarqueeInit() {
  useEffect(() => {
    let teardown: (() => void) | null = null;
    let timer = 0;
    let cancelled = false;
    const started = performance.now();

    const tick = () => {
      if (cancelled) return;
      const root = document.getElementById(TS2026_MARQUEE_ROOT_ID);
      const timedOut = performance.now() - started > HYDRATION_WAIT_MS;
      if (root && (isCommitted(root) || timedOut)) {
        teardown = initTs2026Marquee();
        return;
      }
      if (!timedOut) timer = window.setTimeout(tick, POLL_MS);
    };
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      teardown?.();
    };
  }, []);
  return null;
}
