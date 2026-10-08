import React from 'react';
import { portfolioData } from '@/data/portfolio';

export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.personalInfo.name,
    jobTitle: portfolioData.personalInfo.title,
    email: portfolioData.personalInfo.email,
    telephone: portfolioData.personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: portfolioData.personalInfo.location,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Dr. D.Y. Patil ACS College, Pimpri, Pune',
    },

    sameAs: [
      portfolioData.personalInfo.socials.github,
      portfolioData.personalInfo.socials.linkedin,
    ],
    knowsAbout: portfolioData.skills.flatMap((s) => s.items.map((i) => i.name)),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
