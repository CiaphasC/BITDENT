import {
  brandContent,
  footerContent,
  socialLinks,
} from '@/features/landing/data/content';
import { FacebookIcon, InstagramIcon } from '@/shared/ui/icons';

export const FooterSection = () => (
  <footer className="landing-section bg-midnight-900 py-16">
    <div className="mx-auto max-w-[90rem] px-8 md:px-16">
      <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <img
            alt=""
            aria-hidden="true"
            className="mt-1 h-10 w-10 object-contain"
            decoding="async"
            height={40}
            src={brandContent.logoSrc}
            width={40}
          />
          <div>
            <h3 className="mb-2 text-2xl font-display font-semibold tracking-[0.15em] text-white">
              {brandContent.name}
            </h3>
            <p className="text-[10px] font-display tracking-[0.3em] text-stone-400 uppercase">
              {brandContent.footerSubtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {socialLinks.map((social) => (
            <a
              aria-label={social.label}
              className="text-stone-400 transition-colors hover:text-verde-500"
              href={social.href}
              key={social.id}
            >
              {social.network === 'instagram' ? (
                <InstagramIcon className="h-5 w-5" />
              ) : (
                <FacebookIcon className="h-5 w-5" />
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="hairline mb-8 bg-stone-700/50" />

      <div className="mb-8 px-4 text-center">
        <p className="mx-auto max-w-5xl text-[9px] leading-relaxed font-light text-stone-500">
          {footerContent.legalDisclaimer}
        </p>
      </div>

      <div className="text-center text-[10px] font-display tracking-widest text-stone-600 uppercase">
        {footerContent.copyright}
      </div>
    </div>
  </footer>
);
