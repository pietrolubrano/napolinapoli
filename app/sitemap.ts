import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.napolinapolirooms.it',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          it: 'https://www.napolinapolirooms.it/it',
          en: 'https://www.napolinapolirooms.it/en',
        },
      },
    },{
      url: 'https://www.napolinapolirooms.it/search',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
      alternates: {
        languages: {
          it: 'https://www.napolinapolirooms.it/it/search',
          en: 'https://www.napolinapolirooms.it/en/search',
        },
      },
    },{
      url: 'https://www.napolinapolirooms.it/room/san-biagio',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
          it: 'https://www.napolinapolirooms.it/it/room/san-biagio',
          en: 'https://www.napolinapolirooms.it/en/room/san-biagio',
        },
      },
    },{
      url: 'https://www.napolinapolirooms.it/room/maiorani',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
          it: 'https://www.napolinapolirooms.it/it/room/maiorani',
          en: 'https://www.napolinapolirooms.it/en/room/maiorani',
        },
      },
    },{
      url: 'https://www.napolinapolirooms.it/room/divino-amore',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
          it: 'https://www.napolinapolirooms.it/it/room/divino-amore',
          en: 'https://www.napolinapolirooms.it/en/room/divino-amore',
        },
      },
    }
  ]
}