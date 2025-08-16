'use client';

import Head from 'next/head';
import { PortfolioData, Skill } from '@/types/portfolio';
import { SEOConfig, SEOKeyword, generateKeywordsString, generateMetaDescription, generatePageTitle } from '@/utils/seoKeywords';

interface SEOHeadProps {
  portfolioData?: PortfolioData;
  seoConfig?: SEOConfig;
  keywords?: SEOKeyword[];
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
}

export default function SEOHead({ 
  portfolioData, 
  seoConfig, 
  keywords = [], 
  customTitle,
  customDescription,
  customKeywords
}: SEOHeadProps) {
  // Use custom values or generate from portfolio data
  const title = customTitle || (portfolioData ? generatePageTitle(portfolioData, keywords) : seoConfig?.title || 'Portfolio Generator');
  const description = customDescription || (portfolioData ? generateMetaDescription(portfolioData, keywords) : seoConfig?.description || 'Professional portfolio generator');
  const keywordsString = customKeywords ? customKeywords.join(', ') : generateKeywordsString(keywords);
  const ogImage = seoConfig?.ogImage || '/logo.png';
  const canonicalUrl = seoConfig?.canonicalUrl || 'https://your-domain.com';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={portfolioData?.fullName || 'Portfolio Generator'} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Portfolio Generator" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1f2937" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Structured Data for Portfolio */}
      {portfolioData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": portfolioData.fullName,
              "jobTitle": portfolioData.title,
              "description": portfolioData.aboutMe,
              "url": canonicalUrl,
              "sameAs": [
                portfolioData.contact?.github,
                portfolioData.contact?.linkedin
              ].filter(Boolean),
              "knowsAbout": portfolioData.skills?.map((skill: Skill) => skill.name) || [],
              "hasOccupation": {
                "@type": "Occupation",
                "name": portfolioData.title
              }
            })
          }}
        />
      )}
    </Head>
  );
} 