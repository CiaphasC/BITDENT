import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { WhatsAppIcon } from '@/shared/ui/icons';

export const CtaSection = () => (
  <section className="relative border-b border-stone-200 bg-pearl py-40" id="agendar">
    <div className="scroll-reveal mx-auto max-w-4xl px-8 text-center">
      <h2 className="mb-8 text-5xl leading-[1.1] font-serif font-light text-midnight-900 md:text-6xl lg:text-7xl">
        El comienzo de <br />
        <span className="text-verde-600 italic">tu nueva sonrisa.</span>
      </h2>

      <p className="mx-auto mb-16 max-w-xl text-lg font-light text-stone-500">
        Da el primer paso hacia una salud dental inquebrantable. Reserva tu valoración médica
        hoy mismo.
      </p>

      <LuxuryButton
        className="inline-flex px-12 py-5 tracking-[0.2em]"
        href="#"
        icon={
          <WhatsAppIcon className="h-5 w-5 text-midnight-900 transition-colors duration-500 group-hover:text-white" />
        }
      >
        Agendar cita de Valoración
      </LuxuryButton>
    </div>
  </section>
);
