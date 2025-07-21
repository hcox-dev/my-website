import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hayden Cox - Software Developer',
    short_name: 'Hayden Cox',
    description: 'Software Developer & Open Source Enthusiast - Professional portfolio showcasing full-stack development projects and open source contributions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0070f3',
    orientation: 'portrait-primary',
    categories: ['business', 'education', 'productivity'],
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: 'https://avatars.githubusercontent.com/u/219914551?v=4',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: 'https://avatars.githubusercontent.com/u/219914551?v=4',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'https://avatars.githubusercontent.com/u/219914551?v=4',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
