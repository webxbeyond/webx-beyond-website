"use client";
import { useEffect } from 'react';

export default function NavbarScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.getElementById('nd-subnav');
    if (!root) return;

    const overflowSelector = '#nd-subnav .overflow-auto';

    // helper to find overflow elements
    function overflowElements(): HTMLElement[] {
      return Array.from(document.querySelectorAll(overflowSelector)).filter(Boolean) as HTMLElement[];
    }

    function isOverOverflow(target: EventTarget | null) {
      if (!(target instanceof Node)) return false;
      return overflowElements().some((el) => el.contains(target as Node));
    }

    function onWheel(e: WheelEvent) {
      try {
        if (!isOverOverflow(e.target)) return;
        const els = overflowElements();
        if (!els.length) return;
        // pick the top-most overflow element containing the target
        const el = els.find((x) => x.contains(e.target as Node)) || els[0];
        if (!el) return;
        if (el.scrollWidth <= el.clientWidth) return;
        if (e.shiftKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
      catch (err) {
        // swallow
      }
    }

    document.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', onWheel as EventListener);
    };
  }, []);

  return null;
}
