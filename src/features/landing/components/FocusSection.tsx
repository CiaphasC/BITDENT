import { useRef } from 'react';

import { idealProfile, media } from '@/features/landing/data/content';
import { useFogScene } from '@/features/landing/hooks/useFogScene';

export const FocusSection = () => {
  const fogContainerRef = useRef<HTMLDivElement>(null);

  useFogScene(fogContainerRef);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32" id="enfoque">
      <div
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-85"
        id="fog-canvas-container"
        ref={fogContainerRef}
      />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-24">
          <div className="scroll-reveal w-full lg:w-1/2">
            <span className="mb-6 block text-[10px] font-display tracking-[0.3em] text-verde-600 uppercase">
              Perfil del Paciente
            </span>
            <h2 className="mb-8 text-4xl font-serif font-light text-midnight-900 md:text-5xl">
              Este tratamiento es
              <br />
              <span className="italic text-stone-400">ideal para ti si:</span>
            </h2>

            <div className="stagger-list border-t border-stone-200">
              {idealProfile.map((item) => (
                <article
                  className="group flex cursor-default items-start gap-6 border-b border-stone-200 py-8 transition-all duration-500 md:gap-8 md:py-10"
                  key={item.id}
                >
                  <span className="mt-1 text-3xl leading-none font-serif text-stone-300 transition-colors duration-500 group-hover:text-verde-600 md:text-4xl">
                    {item.number}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-serif font-semibold text-midnight-900">
                      {item.question}
                    </h3>
                    <p className="leading-relaxed font-light text-stone-500">{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="editorial-img-wrapper scroll-reveal relative mt-6 w-full overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-subtle lg:mt-0 lg:h-[600px] lg:w-1/2 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
            <img
              alt="Instrumentos dentales"
              className="h-[360px] w-full object-cover object-[center_28%] shadow-premium sm:h-[440px] lg:h-full lg:object-center"
              src={media.profileInstruments}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-midnight-900/50 to-transparent lg:rounded-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
