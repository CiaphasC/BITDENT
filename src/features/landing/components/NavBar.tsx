import type { MouseEvent } from 'react';

import {
  brandContent,
  navbarContent,
  navLinks,
} from '@/features/landing/data/content';
import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { WhatsAppIcon } from '@/shared/ui/icons';

const scrollToSection = (selector: string) => {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) {
    return;
  }

  const navbar = document.getElementById('navbar');
  const headerOffset = navbar?.offsetHeight ?? 0;
  const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
};

export const NavBar = () => {
  const handleInternalNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <nav
      className="glass-header fixed top-0 start-0 z-50 w-full py-2 transition-all duration-500 md:py-3"
      id="navbar"
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 sm:px-6 md:px-16">
        <a
          className="group flex items-center"
          href={navbarContent.homeHref}
          onClick={(event) => {
            handleInternalNavigation(event, navbarContent.homeHref);
          }}
        >
          <div className="flex flex-col">
            <img
              alt={brandContent.logoAlt}
              className="-ml-[2.7rem] translate-y-[0.24rem] h-9 w-auto object-contain sm:-ml-[2.6rem] sm:translate-y-[0.26rem] sm:h-11 md:-ml-[2.6rem] md:translate-y-[0.28rem] md:h-[3.25rem]"
              decoding="async"
              src={brandContent.logoWordmarkSrc}
            />
            <span className="mt-1 pl-8 text-[8px] font-display tracking-[0.2em] text-stone-400 uppercase sm:pl-10 sm:text-[9px] sm:tracking-[0.25em] md:pl-[3.15rem]">
              {brandContent.subtitle}
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-[11px] font-display tracking-[0.15em] text-midnight-900 uppercase transition-colors hover:text-verde-500"
              href={link.href}
              key={link.href}
              onClick={(event) => {
                handleInternalNavigation(event, link.href);
              }}
            >
              {link.label}
            </a>
          ))}

          <LuxuryButton
            className="px-8 py-3 text-[11px] font-medium tracking-[0.15em]"
            href={navbarContent.ctaHref}
            icon={
              <WhatsAppIcon className="h-4 w-4 transition-colors duration-500 group-hover:text-white" />
            }
            variant="outline"
          >
            {navbarContent.ctaLabel}
          </LuxuryButton>
        </div>
      </div>
    </nav>
  );
};
