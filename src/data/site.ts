// Verified Velune facts. Sources: Velune Brand Book v1 (pages 3, 4, 17) and
// the Velune showreel end card. Everything here is used site-wide, so keep it
// to confirmed information only.

export const site = {
  name: 'Velune',
  descriptor: 'Creative Studio',
  // Established tagline (brand book p.17).
  tagline: 'Create. Capture. Elevate.',
  // Established brand description (brand book p.3).
  description:
    'Velune brings creative production and digital services together for brands, businesses, products and people.',
  instagram: {
    handle: '@veluneproductions',
    url: 'https://www.instagram.com/veluneproductions/',
  },
  whatsapp: {
    // Confirmed by Velune for website enquiries (11 Oct 2026).
    display: '+91 62353 48787',
    // Digits only, international format, as wa.me expects.
    number: '916235348787',
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/studio/', label: 'Studio' },
] as const;
