import { navLinks } from '@/features/landing/data/content';
import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { WhatsAppIcon } from '@/shared/ui/icons';

export const NavBar = () => (
  <nav
    className="glass-header fixed top-0 start-0 z-50 w-full py-5 transition-all duration-500"
    id="navbar"
  >
    <div className="mx-auto flex max-w-[90rem] items-center justify-between px-8 md:px-16">
      <a className="group flex items-center" href="#hero-section">
        <div className="flex flex-col">
          <span className="text-3xl font-serif font-normal tracking-wide text-midnight-900 uppercase">
            BITDENT
          </span>
          <span className="mt-1 text-[9px] font-display tracking-[0.25em] text-stone-400 uppercase">
            Estética Dental Avanzada
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
          href="#agendar"
          icon={
            <WhatsAppIcon className="h-4 w-4 transition-colors duration-500 group-hover:text-white" />
          }
          variant="outline"
        >
          Agendar
        </LuxuryButton>
      </div>
    </div>
  </nav>
);
