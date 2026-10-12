// Velune's own process, as set out in the showreel's "How we think" section.
// The stills mirror the reel's triptych for that section: a beauty look being
// built (Create), a location shoot (Capture), a finished styled frame (Elevate).
export const processSteps = [
  {
    name: 'Create',
    words: ['Idea', 'direction', 'concept'],
    still: { slug: 'kinjal-mehtha', file: 'img_3846-poster', alt: 'A model holding a foundation bottle beside her face, from a Kinjal Mehtha beauty reel.' },
  },
  {
    name: 'Capture',
    words: ['Camera', 'people', 'product', 'movement'],
    still: { slug: 'stilat', file: 'img_5851', alt: 'A model on horseback in an oversized pale green shirt, from a Stilat shoot.' },
  },
  {
    name: 'Elevate',
    words: ['Edit', 'sound', 'colour', 'motion'],
    still: { slug: 'pl-edits', file: 'img_5853-poster', alt: 'A model in a teal embellished lehenga in a dark interior, from a PL Edits reel.' },
  },
] as const;
