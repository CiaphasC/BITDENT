import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  badge: ReactNode;
  title: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({
  badge,
  title,
  className,
  align = 'left',
}: SectionHeadingProps) => (
  <div
    className={clsx(
      'scroll-reveal',
      align === 'center' ? 'text-center' : 'text-left',
      className,
    )}
  >
    <span className="mb-4 block text-[10px] font-display tracking-[0.3em] text-verde-600 uppercase">{badge}</span>
    <h2 className="text-3xl font-serif font-light text-midnight-900 md:text-5xl">{title}</h2>
  </div>
);
