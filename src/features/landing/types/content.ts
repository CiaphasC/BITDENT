export type BenefitIcon = 'comfort' | 'natural' | 'durability';

export interface Benefit {
  id: string;
  title: string;
  icon: BenefitIcon;
  delayMs: number;
}

export interface IdealProfileItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
  beforeClassName?: string;
}

export interface SocialLink {
  id: string;
  href: string;
  label: string;
  network: 'instagram' | 'facebook';
}
