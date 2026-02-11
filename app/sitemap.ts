import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.napolinapolirooms.it',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },{
      url: 'https://www.napolinapolirooms.it/search',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },{
      url: 'https://www.napolinapolirooms.it/room/san-biagio',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },{
      url: 'https://www.napolinapolirooms.it/room/maiorani',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },{
      url: 'https://www.napolinapolirooms.it/room/divino-amore',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    }
  ]
}