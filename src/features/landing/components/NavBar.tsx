import {
  brandContent,
  navbarContent,
  navLinks,
} from '@/features/landing/data/content';
import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { WhatsAppIcon } from '@/shared/ui/icons';

export const NavBar = () => (
  <nav
    className="glass-header fixed top-0 start-0 z-50 w-full py-3 transition-all duration-500 md:py-5"
    id="navbar"
  >
    <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 sm:px-6 md:px-16">
      <a className="group flex items-center" href={navbarContent.homeHref}>
        <img
          alt={brandContent.logoAlt}
          className="mr-2 h-8 w-auto object-contain sm:mr-3 sm:h-10 md:h-11"
          decoding="async"
          height={44}
          src={brandContent.logoSrc}
          width={172}
        />
        <div className="flex flex-col">
          <span className="text-2xl font-serif font-normal tracking-wide text-midnight-900 uppercase sm:text-3xl">
            {brandContent.name}
          </span>
          <span className="mt-1 text-[8px] font-display tracking-[0.2em] text-stone-400 uppercase sm:text-[9px] sm:tracking-[0.25em]">
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
