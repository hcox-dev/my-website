import { MetadataRoute } from 'next'
import { getEnvVariable } from '../lib/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getEnvVariable('NEXT_PUBLIC_SITE_URL');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/private/',
        '*.json',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
