import clsx from 'clsx';
import type { ReactElement } from 'react';

import {
  benefits,
  benefitsSectionContent,
  brandContent,
} from '@/features/landing/data/content';
import type { BenefitIcon } from '@/features/landing/types/content';
import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import {
  ShieldPlusIcon,
  ToothBasicIcon,
  ToothSunIcon,
  WhatsAppIcon,
} from '@/shared/ui/icons';

const benefitIconMap: Record<BenefitIcon, ReactElement> = {
  comfort: <ToothSunIcon className="h-full w-full" />,
  natural: <ToothBasicIcon className="h-full w-full" />,
  durability: <ToothBasicIcon className="h-full w-full" />,
};

export const BenefitsSection = () => (
  <section className="landing-section border-b border-stone-200 bg-pearl py-24" id="beneficios">
    <div className="mx-auto max-w-[90rem] px-8 md:px-16">
      <SectionHeading
        align="center"
        badge={
          <span className="inline-flex items-center gap-2">
            <span>{benefitsSectionContent.badgePrefix}</span>
            <img
              alt={brandContent.name}
              className="h-3.5 w-auto"
              decoding="async"
              height={14}
              src={brandContent.logoSrc}
              width={52}
            />
            <span>{benefitsSectionContent.badgeBrand}</span>
          </span>
        }
        className="mb-20"
        title={benefitsSectionContent.title}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {benefits.map((benefit) => (
          <article
            className="group scroll-reveal relative overflow-hidden border border-stone-100 bg-white p-12 text-center shadow-subtle transition-shadow duration-500 hover:shadow-elevated"
            key={benefit.id}
            style={{ transitionDelay: `${benefit.delayMs}ms` }}
          >
            <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-verde-500 transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative mx-auto mb-8 h-20 w-20 text-midnight-900 transition-colors duration-500 group-hover:text-verde-500">
              {benefitIconMap[benefit.icon]}

              {benefit.icon === 'durability' ? (
                <ShieldPlusIcon className="absolute top-0 right-0 h-8 w-8 rounded-full bg-white text-verde-500" />
              ) : null}
            </div>

            <p className="leading-relaxed font-display font-medium text-midnight-900">{benefit.title}</p>
          </article>
        ))}
      </div>

      <div className="scroll-reveal mt-16 flex justify-center">
        <LuxuryButton
          className={clsx('px-10 py-4')}
          href={benefitsSectionContent.ctaHref}
          icon={
            <WhatsAppIcon className="h-5 w-5 text-verde-500 transition-colors duration-500 group-hover:text-white" />
          }
          variant="solid"
        >
          {benefitsSectionContent.ctaLabel}
        </LuxuryButton>
      </div>
    </div>
  </section>
);
