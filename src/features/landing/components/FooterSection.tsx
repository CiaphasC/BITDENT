import { socialLinks } from '@/features/landing/data/content';
import { FacebookIcon, InfoCircleIcon, InstagramIcon } from '@/shared/ui/icons';

export const FooterSection = () => (
  <footer className="bg-midnight-900 py-16">
    <div className="mx-auto max-w-[90rem] px-8 md:px-16">
      <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-2xl font-display font-semibold tracking-[0.15em] text-white">
            <InfoCircleIcon className="h-6 w-6 text-verde-500" />
            3BITDENT
          </h3>
          <p className="pl-8 text-[10px] font-display tracking-[0.3em] text-stone-400 uppercase">
            Odontología de Alta Especialidad
          </p>
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
          En BITDENT trabajamos con un enfoque clínico personalizado para lograr resultados
          estéticos y funcionales de alta calidad. Cada tratamiento se adapta a las necesidades de
          cada paciente, por lo que el diagnóstico, los tiempos y la evolución pueden variar según
          la valoración profesional realizada en consulta.
        </p>
      </div>

      <div className="text-center text-[10px] font-display tracking-widest text-stone-600 uppercase">
        &copy; 2026 3BITDENT. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);
