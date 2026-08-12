import { site, areaServed } from '../data/site';

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
    audience: {
      '@type': 'Audience',
      audienceType:
        'AV integrators, cabinet and kitchen shops, interior designers, luxury home builders, homeowners',
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function areaSchema(opts: { city: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${opts.path}#service`,
    name: `Concealment mechanisms in ${opts.city}, PA`,
    serviceType: 'Motorized concealment for media and equipment',
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'City', name: `${opts.city}, PA` },
  };
}
