import type {
  Benefit,
  IdealProfileItem,
  SocialLink,
  Testimonial,
} from '@/features/landing/types/content';

export const navLinks = [
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#beneficios', label: 'Beneficios' },
] as const;

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

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    quote:
      '"Recuperé la confianza para sonreír. El proceso fue sin dolor, rápido y el acabado de la zirconia es indistinguible."',
    beforeImage: '/arreglado/1-1.jpeg',
    afterImage: '/arreglado/1-2.jpeg',
  },
  {
    id: 'testimonial-02',
    quote:
      '"Mi mayor miedo era que se notara falso, pero el color y la forma son perfectos. Valió cada centavo invertido en mi salud."',
    beforeImage: '/arreglado/2-1.jpeg',
    afterImage: '/arreglado/2-2.jpeg',
  },
  {
    id: 'testimonial-03',
    quote:
      '"La atención al detalle es asombrosa. Desde el primer día pude comer con total normalidad y sin ninguna sensibilidad."',
    beforeImage: '/arreglado/3-1.jpeg',
    afterImage: '/arreglado/3-2.jpeg',
  },
  {
    id: 'testimonial-04',
    quote:
      '"El cambio fue notable desde la primera sesión. Hoy sonrío con seguridad y con un resultado totalmente natural."',
    beforeImage: '/arreglado/4-1.jpeg',
    afterImage: '/arreglado/4-2.jpeg',
  },
  {
    id: 'testimonial-05',
    quote:
      '"Ahora siento mi sonrisa más armónica y funcional. El antes y después superó completamente mis expectativas."',
    beforeImage: '/arreglado/5-1.jpeg',
    afterImage: '/arreglado/5-2.jpeg',
  },
  {
    id: 'testimonial-06',
    quote:
      '"El resultado final quedó uniforme y natural. El acompañamiento durante todo el proceso fue impecable."',
    beforeImage: '/arreglado/6-1.jpeg',
    afterImage: '/arreglado/6-2.jpeg',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'instagram', href: '#', label: 'Instagram', network: 'instagram' },
  { id: 'facebook', href: '#', label: 'Facebook', network: 'facebook' },
];

export const media = {
  heroDoctor:
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
  profileInstruments:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  videoEmbed:
    'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&mute=1',
};
