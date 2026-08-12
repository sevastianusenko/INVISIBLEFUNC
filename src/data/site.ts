export const site = {
  name: 'Invisible Function',
  legalName: 'Invisible Function',
  url: 'https://invisiblefunction.com',
  city: 'Ephrata',
  region: 'PA',
  regionName: 'Pennsylvania',
  postalCode: '17522',
  // TODO(content): replace with the real published number. 555 is a reserved
  // fiction range — it will not connect. See CONTENT-TODO.md.
  phone: '(717) 555-0142',
  phoneHref: '+17175550142',
  email: 'spec@invisiblefunction.com',
  hours: 'Monday to Friday, 7:00 to 17:00',
};

export const nav = [
  { href: '/services/tv-lift-installation/', label: 'TV lifts' },
  { href: '/services/hidden-doors/', label: 'Hidden doors' },
  { href: '/for-trade/', label: 'For trade' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/how-it-works/', label: 'Process' },
  { href: '/about/', label: 'About' },
];

export const services = [
  {
    href: '/services/tv-lift-installation/',
    label: 'TV lift installation',
    short: 'TV lifts',
    index: 'M-01',
    blurb:
      'Floor, ceiling, foot-of-bed and behind-art lifts, sized to the screen and the opening rather than to whatever the catalog had in stock.',
    specs: ['Screen weight 40–200 lb', 'Travel 24–60 in', 'Floor · ceiling · bed · art', 'IR, RS-232, IP, dry contact'],
  },
  {
    href: '/services/projector-and-screen-lifts/',
    label: 'Projector and screen lifts',
    short: 'Projector lifts',
    index: 'M-02',
    blurb:
      'Ceiling projector lifts and in-ceiling screen cassettes, coordinated with the drywall or coffer so the closed ceiling reads as one plane.',
    specs: ['Drop 12–48 in', 'Cassette depth from 7 in', 'Trap doors and flush closures', 'Trigger from projector power'],
  },
  {
    href: '/services/hidden-doors/',
    label: 'Hidden bookcase doors',
    short: 'Hidden doors',
    index: 'M-03',
    blurb:
      'Bookcase and flush jib doors on pivot or concealed hinge hardware, built to carry real load and still close on a consistent reveal.',
    specs: ['Leaf load to 500 lb', 'Pivot, offset or concealed hinge', 'Touch latch or hidden release', 'Reveal held at 1/8 in'],
  },
  {
    href: '/services/motorized-panels/',
    label: 'Motorized panels',
    short: 'Motorized panels',
    index: 'M-04',
    blurb:
      'Cabinet fronts, sliding art panels and rack access that move out of the way on cue, then return to a face that shows no hardware.',
    specs: ['Linear actuator or belt drive', 'Sliding, lifting, pivoting', 'Obstruction sensing', 'Manual override on every build'],
  },
  {
    href: '/services/invisible-speakers/',
    label: 'Invisible in-wall speakers',
    short: 'Invisible speakers',
    index: 'M-05',
    blurb:
      'Speakers that are skim-coated and painted over, plus the wall detailing and finish work that decides whether they stay invisible.',
    specs: ['Sonance, Amina, Stealth', 'Skim coat and level-5 finish', 'Back-box and isolation detailing', '2–8 in of wall depth'],
  },
];

export const areas = [
  { href: '/areas/lancaster-pa/', label: 'Lancaster' },
  { href: '/areas/lititz-pa/', label: 'Lititz' },
  { href: '/areas/hershey-pa/', label: 'Hershey' },
  { href: '/areas/west-chester-pa/', label: 'West Chester' },
];

export const areaServed = [
  'Lancaster, PA',
  'Lititz, PA',
  'Ephrata, PA',
  'Hershey, PA',
  'York, PA',
  'Harrisburg, PA',
  'Reading, PA',
  'West Chester, PA',
  'Philadelphia suburbs, PA',
];

/** Reused on every page as the @id target for Service and Area schema. */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: site.url,
  description:
    'Brand-independent installation and customization of motorized TV lifts, projector and screen lifts, hidden bookcase doors, motorized panels and invisible in-wall speakers. Millwork, mechanism, low-voltage wiring and finish carpentry from one shop in Ephrata, Pennsylvania.',
  email: site.email,
  telephone: site.phone,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    // TODO(content): add streetAddress once the shop address is published.
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: 'US',
  },
  areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
  knowsAbout: [
    'Motorized television lifts',
    'Projector lifts',
    'Hidden bookcase doors',
    'Motorized cabinet panels',
    'Invisible in-wall loudspeakers',
    'Architectural millwork',
    'Low-voltage wiring',
  ],
  makesOffer: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.label, url: `${site.url}${s.href}` },
  })),
};
