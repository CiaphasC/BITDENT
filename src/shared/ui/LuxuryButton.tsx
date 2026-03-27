import clsx from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface LuxuryButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'solid' | 'outline';
  icon?: ReactNode;
}

export const LuxuryButton = ({
  variant = 'outline',
  icon,
  className,
  children,
  ...props
}: LuxuryButtonProps) => (
  <a
    className={clsx(
      'btn-luxury group border border-midnight-900 px-8 py-4 text-xs font-display tracking-[0.1em] uppercase flex items-center gap-3',
      variant === 'solid' ? 'btn-luxury-solid text-white' : 'bg-transparent text-midnight-900',
      className,
    )}
    {...props}
  >
    {icon}
    <span>{children}</span>
  </a>
);
