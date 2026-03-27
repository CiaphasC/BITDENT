import clsx from 'clsx';

import { testimonials } from '@/features/landing/data/content';
import { useAutoSlider } from '@/features/landing/hooks/useAutoSlider';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from '@/shared/ui/icons';

export const TestimonialsSection = () => {
  const { currentIndex, goTo, next, previous } = useAutoSlider(testimonials.length, 6000);

  return (
    <section
      className="relative overflow-hidden bg-midnight-900 py-32 text-white"
      id="testimonios"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#2d6a4f 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 md:px-16">
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-6 block text-[10px] font-display tracking-[0.3em] text-verde-500 uppercase">
            Evidencia Visual
          </span>
          <h2 className="text-4xl font-serif font-light text-white md:text-5xl">
            Testimonios de pacientes
          </h2>
        </div>

        <div className="scroll-reveal relative mx-auto w-full max-w-5xl">
          <button
            aria-label="Testimonio anterior"
            className="group absolute top-1/2 -left-4 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-midnight-800/80 text-white shadow-premium backdrop-blur-sm transition-all duration-300 hover:border-verde-500 hover:bg-verde-500 focus:outline-none md:-left-8 md:h-14 md:w-14 lg:-left-12"
            id="slider-prev"
            onClick={previous}
            type="button"
          >
            <ChevronLeftIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          </button>

          <button
            aria-label="Siguiente testimonio"
            className="group absolute top-1/2 -right-4 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-midnight-800/80 text-white shadow-premium backdrop-blur-sm transition-all duration-300 hover:border-verde-500 hover:bg-verde-500 focus:outline-none md:-right-8 md:h-14 md:w-14 lg:-right-12"
            id="slider-next"
            onClick={next}
            type="button"
          >
            <ChevronRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="relative overflow-hidden bg-midnight-800 shadow-2xl">
            <div
              className="flex w-full transition-transform duration-700 ease-in-out"
              id="slider-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <article className="relative w-full shrink-0 p-8 md:p-12" key={testimonial.id}>
                  <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2">
                    <figure className="group relative aspect-square overflow-hidden">
                      <img
                        alt="Antes"
                        className={clsx(
                          'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105',
                          testimonial.beforeClassName,
                        )}
                        src={testimonial.beforeImage}
                      />
                    </figure>

                    <figure className="group relative aspect-square overflow-hidden">
                      <img
                        alt="Después"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={testimonial.afterImage}
                      />
                      <div className="absolute inset-0 bg-verde-400/20 mix-blend-overlay" />
                    </figure>
                  </div>

                  <p className="mt-10 text-center text-xl leading-relaxed font-serif font-light text-stone-300 italic md:text-2xl">
                    {testimonial.quote}
                  </p>
                </article>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col p-8 md:p-12">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <QuoteIcon className="h-16 w-16 text-verde-500" />
              </div>

              <div className="relative grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="absolute top-4 left-4 z-10 border border-white/10 bg-midnight-900/80 px-3 py-1 text-[10px] tracking-widest text-verde-400 uppercase shadow-lg backdrop-blur">
                  Caso Real 3Bitdent
                </div>

                <div className="relative aspect-square w-full">
                  <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 text-[10px] tracking-widest text-white uppercase shadow-lg backdrop-blur">
                    Antes
                  </div>
                </div>

                <div className="relative aspect-square w-full">
                  <div className="absolute right-4 bottom-4 bg-verde-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg backdrop-blur">
                    Después
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3" id="slider-dots">
            {testimonials.map((testimonial, index) => (
              <button
                aria-label={`Ir al testimonio ${index + 1}`}
                className={clsx(
                  'h-1.5 rounded-full transition-all duration-500 focus:outline-none',
                  index === currentIndex
                    ? 'w-8 bg-verde-500'
                    : 'w-2 bg-white/20 hover:bg-white/50',
                )}
                key={testimonial.id}
                onClick={() => {
                  goTo(index);
                }}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
