import type { ImageMetadata } from 'astro';

// Selected work. Names and categories come from the Velune Brand Book (p.16)
// and the showreel title cards; "Kinjal Mehtha" spelling confirmed by Velune.
// Media is the real client work in brand_assets/featured clients/, prepared by
// scripts/prepare-media.sh. No briefs, dates or results are recorded for any
// project, so none are shown. Add `about` only with Velune-approved copy.

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/work/*/*.jpg', { eager: true });
const img = (slug: string, file: string) => {
  const mod = images[`/src/assets/work/${slug}/${file}.jpg`];
  if (!mod) throw new Error(`Missing image: ${slug}/${file}.jpg (run npm run media)`);
  return mod.default;
};

export type Photo = { kind: 'photo'; image: ImageMetadata; alt: string };
export type Film = { kind: 'video'; src: string; poster: ImageMetadata; label: string; duration: string; landscape?: boolean };
export type Media = Photo | Film;

export type Project = {
  slug: string;
  client: string;
  category: string;
  cover: ImageMetadata;
  coverAlt: string;
  media: Media[];
  about?: string;
};

const photo = (slug: string, file: string, alt: string): Photo => ({ kind: 'photo', image: img(slug, file), alt });
const film = (slug: string, file: string, label: string, duration: string, landscape = false): Film => ({
  kind: 'video',
  src: `/media/work/${slug}/${file}.mp4`,
  poster: img(slug, `${file}-poster`),
  label,
  duration,
  landscape,
});

export const projects: Project[] = [
  {
    slug: 'kinjal-mehtha',
    client: 'Kinjal Mehtha',
    category: 'Makeup artistry',
    cover: img('kinjal-mehtha', 'img_0257'),
    coverAlt: 'Model in a crystal-embellished strapless gown, photographed at night.',
    media: [
      photo('kinjal-mehtha', 'img_0257', 'Model in a crystal-embellished strapless gown, photographed at night.'),
      film('kinjal-mehtha', 'img_3846', 'Reel', '39 s'),
      photo('kinjal-mehtha', 'img_3845', 'Bridal makeup with an emerald and diamond necklace and a nose ring.'),
      film('kinjal-mehtha', 'img_3649', 'Reel', '31 s'),
    ],
  },
  {
    slug: 'lakshi-lingaraju',
    client: 'Lakshi Lingaraju',
    category: 'Makeup artistry',
    cover: img('lakshi-lingaraju', 'img_1298'),
    coverAlt: 'Smiling bride in traditional jewellery and a maang tikka, hands framing her face.',
    media: [
      photo('lakshi-lingaraju', 'img_1298', 'Smiling bride in traditional jewellery and a maang tikka, hands framing her face.'),
      film('lakshi-lingaraju', 'img_5845', 'Reel', '36 s'),
      photo('lakshi-lingaraju', 'img_5846', 'Portrait in a pink floral sari with a diamond choker.'),
      film('lakshi-lingaraju', 'img_3651', 'Reel', '32 s'),
    ],
  },
  {
    slug: 'stilat',
    client: 'Stilat',
    category: 'Luxury clothing',
    cover: img('stilat', 'img_5851'),
    coverAlt: 'Model on horseback in an oversized pale green shirt and a wide-brimmed hat.',
    media: [
      photo('stilat', 'img_5851', 'Model on horseback in an oversized pale green shirt and a wide-brimmed hat.'),
      film('stilat', 'img_5849', 'Reel', '20 s'),
      photo('stilat', 'img_5852', 'Model in a white polka-dot dress holding a glass, among tropical plants.'),
      film('stilat', 'img_3629', 'Reel', '20 s'),
    ],
  },
  {
    slug: 'pl-edits',
    client: 'PL Edits',
    category: 'Styling',
    cover: img('pl-edits', 'img_5854'),
    coverAlt: 'Model in a yellow silk sari and temple jewellery among red flowers.',
    media: [
      photo('pl-edits', 'img_5854', 'Model in a yellow silk sari and temple jewellery among red flowers.'),
      film('pl-edits', 'img_5853', 'Reel', '28 s'),
      photo('pl-edits', 'img_5855', 'Portrait in a maroon sari with layered gold temple jewellery.'),
      film('pl-edits', 'img_3755', 'Reel', '11 s'),
    ],
  },
  {
    slug: 'yash-jain',
    client: 'Yash Jain',
    category: 'Makeup artistry',
    cover: img('yash-jain', 'img_5848'),
    coverAlt: 'Model in a green silk sari seated in a vintage interior with flowers.',
    media: [
      photo('yash-jain', 'img_5848', 'Model in a green silk sari seated in a vintage interior with flowers.'),
      film('yash-jain', 'img_5847', 'Reel', '30 s'),
    ],
  },
  {
    slug: 'nomi-kids-culture',
    client: 'Nomi Kids Culture',
    category: 'Brand film',
    cover: img('nomi-kids-culture', 'img_5857-poster'),
    coverAlt: 'A child crouching on a rock at the shoreline under a stormy sky.',
    media: [film('nomi-kids-culture', 'img_5857', 'Film', '34 s', true)],
  },
];

export const featured = ['kinjal-mehtha', 'stilat', 'lakshi-lingaraju', 'pl-edits'].map(
  (slug) => projects.find((p) => p.slug === slug)!,
);

export const mediaSummary = (p: Project) => {
  const photos = p.media.filter((m) => m.kind === 'photo').length;
  const films = p.media.length - photos;
  const part = (n: number, one: string, many: string) => (n ? `${n} ${n === 1 ? one : many}` : '');
  return [part(photos, 'photograph', 'photographs'), part(films, 'video', 'videos')].filter(Boolean).join(', ');
};
