import type {
  Benefit,
  IdealProfileItem,
  SocialLink,
  Testimonial,
} from '@/features/landing/types/content';

// Guia de edicion:
// - Modifica textos, enlaces e imagenes de la landing desde este archivo.
// - Todas las imagenes deben vivir en /public/images para mantener una estructura clara.
// - Usa siempre rutas absolutas que empiecen con "/" para evitar imports dispersos.
const BRAND_IMAGE_PATH = '/images/brand';
const LANDING_IMAGE_PATH = '/images/landing';
const TESTIMONIALS_IMAGE_PATH = '/images/testimonials';

export const brandContent = {
  name: 'BITDENT',
  subtitle: 'Odontología de Alta Especialidad',
  footerSubtitle: 'Odontología de Alta Especialidad',
  logoSrc: `${BRAND_IMAGE_PATH}/logo-symbol.png`,
  logoWordmarkSrc: `${BRAND_IMAGE_PATH}/logo-wordmark.png`,
  logoAlt: 'Logo BITDENT',
};

export const navbarContent = {
  homeHref: '#hero-section',
  ctaLabel: 'Agendar',
  ctaHref: 'https://wa.link/h7xgxc',
};

export const navLinks = [
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#beneficios', label: 'Beneficios' },
] as const;

export const heroContent = {
  eyebrow: 'Estética y Confianza',
  title: {
    line1: 'Los dientes dañados',
    line2Prefix: 'no solo afectan ',
    line2Highlight: 'tu sonrisa',
    line2Suffix: ',',
    line3: 'también tu calidad de vida.',
  },
  description: {
    strongStart: 'Descubre',
    textBeforeMiddle: ' por qué las coronas de zirconia son ',
    strongMiddle: 'la solución definitiva',
    textBeforeEnd: ' para recuperar tu estética y confianza, todo ',
    strongEnd: 'SIN dolor y en tiempo récord',
    textAfterEnd: '.',
  },
  ctaPrimaryLabel: 'Agendar cita de Valoración',
  ctaPrimaryHref: '#agendar',
  ctaVideoLabel: 'Ver Explicación Médica',
  videoOverlay: {
    playLabel: 'Reproducir video',
    doctorName: 'Dr. Enrique',
    duration: '3:12',
    progressWidthPercent: 25,
  },
};

export const benefits: Benefit[] = [
  {
    id: 'benefit-comfort',
    title: 'Solucionar tus problemas dentales sin dolor ni largas esperas.',
    icon: 'comfort',
    delayMs: 0,
  },
  {
    id: 'benefit-natural',
    title:
      'Lograr una apariencia natural y discreta, indistinguible de tus dientes originales.',
    icon: 'natural',
    delayMs: 100,
  },
  {
    id: 'benefit-durability',
    title:
      'Proporcionar durabilidad y resistencia, garantizando que duren por años.',
    icon: 'durability',
    delayMs: 200,
  },
];

export const benefitsSectionContent = {
  badgePrefix: 'Garantía',
  badgeBrand: 'Bitdent',
  title: 'En Bitdent ofrecemos este tratamiento para:',
  ctaLabel: 'Agendar cita de Valoración',
  ctaHref: '#agendar',
};

export const idealProfile: IdealProfileItem[] = [
  {
    id: 'profile-01',
    number: '01',
    question: '¿Te preocupa el dolor?',
    answer:
      'Nuestro procedimiento es rápido y cómodo, diseñado con tecnología para que no sientas molestias durante el proceso.',
  },
  {
    id: 'profile-02',
    number: '02',
    question: '¿No confías en que el resultado sea natural?',
    answer:
      'Las coronas de zirconia tienen un acabado estético de primer nivel, logrando un aspecto idéntico al de un diente natural.',
  },
  {
    id: 'profile-03',
    number: '03',
    question: '¿Crees que el tratamiento será costoso?',
    answer:
      'Ofrecemos opciones de financiamiento accesibles para que tu nueva sonrisa esté siempre al alcance de tu presupuesto.',
  },
  {
    id: 'profile-04',
    number: '04',
    question: '¿No tienes tiempo para largas sesiones?',
    answer:
      'Con nuestra tecnología avanzada en clínica, podemos completar tu tratamiento en menos de lo que imaginas.',
  },
];

export const focusSectionContent = {
  badge: 'Perfil del Paciente',
  titleLine1: 'Este tratamiento es',
  titleAccent: 'ideal para ti si:',
};

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    quote:
      '"Recuperé la confianza para sonreír. El proceso fue sin dolor, rápido y el acabado de la zirconia es indistinguible."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-01-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-01-after.jpeg`,
  },
  {
    id: 'testimonial-02',
    quote:
      '"Mi mayor miedo era que se notara falso, pero el color y la forma son perfectos. Valió cada centavo invertido en mi salud."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-02-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-02-after.jpeg`,
  },
  {
    id: 'testimonial-03',
    quote:
      '"La atención al detalle es asombrosa. Desde el primer día pude comer con total normalidad y sin ninguna sensibilidad."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-03-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-03-after.jpeg`,
  },
  {
    id: 'testimonial-04',
    quote:
      '"El cambio fue notable desde la primera sesión. Hoy sonrío con seguridad y con un resultado totalmente natural."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-04-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-04-after.jpeg`,
  },
  {
    id: 'testimonial-05',
    quote:
      '"Ahora siento mi sonrisa más armónica y funcional. El antes y después superó completamente mis expectativas."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-05-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-05-after.jpeg`,
  },
  {
    id: 'testimonial-06',
    quote:
      '"El resultado final quedó uniforme y natural. El acompañamiento durante todo el proceso fue impecable."',
    beforeImage: `${TESTIMONIALS_IMAGE_PATH}/case-06-before.jpeg`,
    afterImage: `${TESTIMONIALS_IMAGE_PATH}/case-06-after.jpeg`,
  },
];

export const testimonialsSectionContent = {
  badge: 'Evidencia Visual',
  title: 'Testimonios de pacientes',
  previousAriaLabel: 'Testimonio anterior',
  nextAriaLabel: 'Siguiente testimonio',
  caseLabel: 'Caso Real Bitdent',
  beforeImageAlt: 'Antes',
  afterImageAlt: 'Después',
  beforeLabel: 'Antes',
  afterLabel: 'Después',
};

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/bitdentmx',
    label: 'Instagram',
    network: 'instagram',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/share/1EKYxbqD74/?mibextid=wwXIfr',
    label: 'Facebook',
    network: 'facebook',
  },
];

export const ctaSectionContent = {
  titleLine1: 'El comienzo de',
  titleAccent: 'tu nueva sonrisa.',
  description:
    'Da el primer paso hacia una salud dental inquebrantable. Reserva tu valoración médica hoy mismo.',
  buttonLabel: 'Agendar cita de Valoración',
  buttonHref: 'https://wa.link/h7xgxc',
};

export const footerContent = {
  legalDisclaimer:
    'En BITDENT trabajamos con un enfoque clínico personalizado para lograr resultados estéticos y funcionales de alta calidad. Cada tratamiento se adapta a las necesidades de cada paciente, por lo que el diagnóstico, los tiempos y la evolución pueden variar según la valoración profesional realizada en consulta.',
  copyright: '© 2026 BITDENT. Todos los derechos reservados.',
};

export const mediaAltText = {
  heroDoctor: 'Doctor dental',
  profileInstruments: 'Instrumentos dentales',
  videoTitle: 'Video explicativo del tratamiento',
};

export const media = {
  heroDoctor: `${LANDING_IMAGE_PATH}/hero-doctor.jpg`,
  profileInstruments: `${LANDING_IMAGE_PATH}/profile-instruments.jpg`,
  videoEmbed: 'https://fast.wistia.net/embed/iframe/b6rjwbs90l',
};
