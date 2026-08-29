'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades content in as it scrolls into view. Uses IntersectionObserver directly
 * rather than an animation library — the whole behaviour is a class toggle.
 * Respects `prefers-reduced-motion` and degrades to visible without JS, since
 * the hidden state is only ever applied from the client.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    setEnabled(true);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${enabled ? ' reveal-enabled' : ''}${visible ? ' is-visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
