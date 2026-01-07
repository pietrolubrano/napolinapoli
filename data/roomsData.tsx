const services = [
    {
        icon: 'fa-solid fa-wifi',
        description: { it: 'Wi-Fi', en: 'Wi-Fi'}
    },
    {
        icon: 'fa-solid fa-snowflake',
        description: { it: 'Aria condizionata', en: 'ENG - Aria condizionata'}
    },
    {
        icon: 'fa-solid fa-sun',
        description: { it: 'Riscaldamento', en: 'ENG - Riscaldamento'}
    },
    {
        icon: 'fa-solid fa-kitchen-set',
        description: { it: 'Angolo cottura', en: 'ENG - Angolo cottura'}
    },
    {
        icon:'fa-solid fa-kitchen-set',
        description: { it: 'Cucina in comune', en: 'ENG - Cucina in comune' }
    },
    {
        icon: 'fa-solid fa-tv',
        description: { it: 'Smart TV', en: 'Smart TV'}
    },
    {
        icon: 'fa-solid fa-map-location-dot',
        description: { it: 'In pieno centro storico', en: 'ENG - In pieno centro storico' }
    },
    {
        icon: 'fa-solid fa-paw',
        description: { it: 'Animali accettati', en: 'ENG - Animali accettati' }
    },
    {
        icon:"fa-solid fa-baby",
        description: { it: 'Culla e seggiolone per neonati', en: 'ENG - Culla e seggiolone per neonati' }
    },
    {
        icon:"fa-solid fa-suitcase",
        description: { it: 'Deposito bagagli gratuito', en: 'ENG - Deposito bagagli gratuito' }
    }
]

export type Room = {
    [key: number]: {
        name: string
        slug: string
        maxOccupancy: number
        carouselData: string[]
        description: string
        services: {
            icon: string;
            description: {
                it: string;
                en: string;
            };
        }[]
    }
}

export const rooms : Room = {
    148994: {
        name: 'San Biagio',
        slug: 'san-biagio',
        maxOccupancy: 4,
        carouselData: [
            '/images/sanbiagio/sanbiagio-0033.jpg',
            '/images/sanbiagio/sanbiagio-0043.jpg',
            '/images/sanbiagio/sanbiagio-0045.jpg',
            '/images/sanbiagio/sanbiagio-0050.jpg',
            '/images/sanbiagio/sanbiagio-0054.jpg',
            '/images/sanbiagio/sanbiagio-0059.jpg'
        ],
        description: 'Camera da 50mq con balcone che affaccia su Spaccanapoli, utilizzabile da singola a quadrupla',
        services: services.filter(service => service.description['it'] !== 'Cucina in comune')
    },
    149040: {
        name: 'Maiorani',
        slug: 'maiorani',
        maxOccupancy: 4,
        carouselData: [
            '/images/maiorani/maiorani-0001.jpg',
            '/images/maiorani/maiorani-0004.jpg',
            '/images/maiorani/maiorani-0014.jpg',
            '/images/maiorani/maiorani-0016.jpg',
            '/images/maiorani/maiorani-0019.jpg',
            '/images/maiorani/maiorani-0021.jpg'
        ],
        description: 'Camera da 45mq con finstra che affaccia su vico Maiorani, utilizzabile da singola a quadrupla',
        services: services.filter(service => service.description['it'] !== 'Angolo cottura')
    },
    1495987: {
        name: 'Divino amore',
        slug: 'divino-amore',
        maxOccupancy: 3,
        carouselData: [
            '/images/divino-amore/divino-amore-7370.jpg',
            '/images/divino-amore/divino-amore-7363.jpg',
            '/images/divino-amore/divino-amore-7351.jpg',
            '/images/divino-amore/divino-amore-7366.jpg',
            '/images/divino-amore/divino-amore-7358.jpg',
            '/images/divino-amore/divino-amore-7395.jpg',
            '/images/divino-amore/divino-amore-7375.jpg',
        ],
        description: 'Camera da 40mq con balcone che affaccia su Spaccanapoli, utilizzabile da singola a tripla',
        services: services.filter(service => service.description['it'] !== 'Angolo cottura')
    }
}
