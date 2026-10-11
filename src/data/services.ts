// The nine service categories recorded in the Velune Brand Book (p.9), with
// detail from the service-direction pages (pp.10–15). Wording stays close to
// the source; nothing here promises outcomes the book does not support.

export type Service = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  steps?: { title: string; text: string }[];
  note?: string;
};

export type ServiceGroup = {
  slug: string;
  name: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: 'production',
    name: 'Production',
    services: [
      {
        slug: 'video-production',
        name: 'Video production',
        summary: 'Concept, shoot, edit and delivery.',
        detail:
          'From brief to final delivery, every stage is planned and connected, so the finished film communicates the intended message in the right format for where it will be seen.',
        steps: [
          { title: 'Brief', text: 'Purpose, audience and output.' },
          { title: 'Concept', text: 'Story, shot plan and treatment.' },
          { title: 'Capture', text: 'People, product, movement and detail.' },
          { title: 'Finish', text: 'Edit, sound, colour and delivery.' },
        ],
      },
      {
        slug: 'photography',
        name: 'Photography',
        summary: 'Product, people, events and campaign imagery.',
        detail:
          'Purposeful stills for people, products, campaigns and environments, with attention to light, subject clarity, material detail and a consistent treatment across the set.',
      },
      {
        slug: 'iphone-videography',
        name: 'iPhone videography',
        summary: 'Mobile-first, agile visual production.',
        detail:
          'A flexible option when the concept, pace and delivery benefit from a compact setup. The output still gets intentional lighting, framing and sound.',
      },
    ],
  },
  {
    slug: 'content-social',
    name: 'Content & social',
    services: [
      {
        slug: 'content-creation',
        name: 'Content creation',
        summary: 'Reels, photos, graphics and social assets.',
        detail:
          'A brand brief translated into a coherent set of channel-ready assets, where every piece has a job: to explain, demonstrate, build recognition, invite a response or support a campaign.',
        steps: [
          { title: 'Idea', text: 'One clear message, angle or story.' },
          { title: 'Format', text: 'Reel, story, photograph, carousel or graphic.' },
          { title: 'Craft', text: 'A consistent visual and verbal treatment.' },
          { title: 'Adapt', text: 'Resized and edited for each placement.' },
          { title: 'Review', text: 'Accuracy, brand fit, rights, spelling and call to action.' },
        ],
      },
      {
        slug: 'social-media-handling',
        name: 'Social media handling',
        summary: 'Planning, publishing and account management.',
        detail:
          'Operational consistency that makes a brand easier to recognise and easier to manage.',
        steps: [
          { title: 'Plan', text: 'Goals, platform role, content calendar, campaign moments and approval flow.' },
          { title: 'Manage', text: 'Publishing, asset organisation, captions, profile consistency and agreed community tasks.' },
          { title: 'Learn', text: 'Platform insights reviewed, useful patterns identified, the next cycle adjusted.' },
        ],
        note:
          'Community replies, customer support, influencer coordination, crisis response and reporting are agreed for each engagement rather than included by default.',
      },
      {
        slug: 'social-media-marketing',
        name: 'Social media marketing',
        summary: 'Channel strategy, audience and campaign planning.',
        detail:
          'Strategy and execution tied to a clear business or communication objective, whether that is awareness, consideration, enquiries, sales or retention.',
        steps: [
          { title: 'Objective', text: 'What should change as a result?' },
          { title: 'Audience', text: 'Who the message is for, and what context or motivation matters to them.' },
          { title: 'Creative', text: 'The message, format, proof and call to action that fit that audience.' },
          { title: 'Measurement', text: 'Which platform indicators and business outcomes can be assessed reliably.' },
        ],
        note: 'The objective comes first. Follower growth, reach, leads or sales are never promised as guaranteed outcomes.',
      },
    ],
  },
  {
    slug: 'brand-marketing',
    name: 'Brand & marketing',
    services: [
      {
        slug: 'branding',
        name: 'Branding',
        summary: 'Brand foundations and consistent visual communication.',
        detail: 'Clarifying the identity: positioning, messaging, visual identity, design rules and brand consistency.',
      },
      {
        slug: 'digital-marketing',
        name: 'Digital marketing',
        summary: 'Coordinated digital activity across relevant channels.',
        detail: 'Connecting content, channels, campaigns and measurement to a defined objective.',
      },
      {
        slug: 'advertising-meta-ads',
        name: 'Advertising / Meta Ads',
        summary: 'Paid campaigns, creative variations and optimisation.',
        detail: 'Putting creative into paid distribution: paid-social and Meta Ads planning, creative variants, targeting decisions and optimisation.',
        note: 'Before launch, approvals, budget ownership, account access and reporting definitions are agreed.',
      },
    ],
  },
];

export const allServices = serviceGroups.flatMap((g) => g.services);
