"use client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Iconify } from '@/components/iconify';
import { cn } from '@/lib/cn';

const optionClass =
  'text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4';

export default function CursorContext() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Smooth trailing cursor
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const easing = 0.2;

    const tick = () => {
      cx += (tx - cx) * easing;
      cy += (ty - cy) * easing;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx - 8}px, ${cy - 8}px, 0) scale(${cursorHover ? 1.6 : 1})`;
        cursorRef.current.style.opacity = cursorHover ? '0.8' : '0.9';
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [cursorHover]);

  // Context menu logic
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      const menuWidth = 256;
      const menuHeight = 300;
      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 8;
      if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 8;

      setPos({ x, y });
      setOpen(true);
    };

    const onClick = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };

    window.addEventListener('contextmenu', onContext);
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('contextmenu', onContext);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Cursor hover over interactive elements
  useEffect(() => {
    const hoverElems = document.querySelectorAll('button, a, .interactive');
    const handleEnter = () => setCursorHover(true);
    const handleLeave = () => setCursorHover(false);

    hoverElems.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      hoverElems.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  // Helper actions
  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const t = document.createElement('textarea');
      t.value = window.location.href;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setOpen(false);
  };

  const openAi = (base: string, q: string) => {
    const search = new URLSearchParams({ q });
    window.open(`${base}?${search.toString()}`, '_blank', 'noreferrer');
    setOpen(false);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Trailing cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed z-[9999] w-3 h-3 rounded-full bg-fd-accent opacity-90 transition-transform"
      />

      {/* Context menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed flex flex-col overflow-auto z-[9998] origin-(--radix-popover-content-transform-origin) min-w-[240px] max-w-[98vw] rounded-xl border bg-fd-popover/60 backdrop-blur-lg p-2 text-sm text-fd-popover-foreground shadow-lg focus-visible:outline-none data-[state=closed]:animate-fd-popover-out data-[state=open]:animate-fd-popover-in"
          style={{ left: pos.x, top: pos.y }}
        >
          <button onClick={copyPageUrl} className={cn(optionClass)}>
            <Iconify icon="mdi:link-variant" /> লিঙ্ক কপি করুন
            <Iconify icon="mdi:content-copy" className="ms-auto text-fd-muted-foreground" />
          </button>

          <button onClick={() => openAi('https://chatgpt.com/', `এই পৃষ্ঠা: ${window.location.href}`)} className={cn(optionClass)}>
            <Iconify icon="mdi:chat" /> ChatGPT-এ খুলুন
            <Iconify icon="mdi:open-in-new" className="ms-auto text-fd-muted-foreground" />
          </button>

          <button onClick={() => openAi('https://scira.ai/', `এই পৃষ্ঠা: ${window.location.href}`)} className={cn(optionClass)}>
            <Iconify icon="mdi:robot" /> Scira AI-এ খুলুন
            <Iconify icon="mdi:open-in-new" className="ms-auto text-fd-muted-foreground" />
          </button>

          <button onClick={() => openAi('https://claude.ai/new', `এই পৃষ্ঠা: ${window.location.href}`)} className={cn(optionClass)}>
            <Iconify icon="mdi:cloud" /> Claude-এ খুলুন
            <Iconify icon="mdi:open-in-new" className="ms-auto text-fd-muted-foreground" />
          </button>
        </div>
      )}
    </>,
    document.body
  );
}
