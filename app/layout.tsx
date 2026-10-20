import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import CommandPalette from '@/components/CommandPalette';
import PersonSchema from '@/components/PersonSchema';
import { portfolioData } from '@/data/portfolio';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://commitwithsandy.vercel.app'),
  title: '</> Sandesh Hiremath',
  description: `${portfolioData.personalInfo.shortBio} Full Stack Developer skilled in MERN stack, Java Spring Boot, React, Next.js, and Cloud deployments.`,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'Sandesh Hiremath',
    'Full Stack Developer',
    'Fresher Portfolio',
    'MERN Stack Developer',
    'Java Spring Boot',
    'Next.js Developer',
    'Pune Developer',
    'BCA Graduate',
  ],
  authors: [{ name: portfolioData.personalInfo.name }],
  creator: portfolioData.personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://commitwithsandy.vercel.app',
    title: `${portfolioData.personalInfo.name} — Full Stack Developer`,
    description: portfolioData.personalInfo.shortBio,
    siteName: `${portfolioData.personalInfo.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${portfolioData.personalInfo.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personalInfo.name} — Full Stack Developer`,
    description: portfolioData.personalInfo.shortBio,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
        <PersonSchema />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans transition-colors duration-300">
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
