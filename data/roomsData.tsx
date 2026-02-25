import { JSX } from "react"
import { 
    FaWifi,
    FaSnowflake,
    FaSun,
    FaKitchenSet,
    FaTv,
    FaMapLocationDot,
    FaPaw,
    FaBaby,
    FaSuitcase
} from "react-icons/fa6"

const services = [
    {
        icon: <FaWifi />,
        description: { it: 'Wi-Fi', en: 'Wi-Fi'}
    },
    {
        icon: <FaSnowflake />,
        description: { it: 'Aria condizionata', en: 'Air Conditioning'}
    },
    {
        icon: <FaSun />,
        description: { it: 'Riscaldamento', en: 'Heating' }
    },
    {
        icon: <FaKitchenSet/>,
        description: { it: 'Angolo cottura', en: 'Kitchen Area'}
    },
    {
        icon:<FaKitchenSet/>,
        description: { it: 'Cucina in comune', en: 'Common Kitchen'}
    },
    {
        icon: <FaTv/>,
        description: { it: 'Smart TV', en: 'Smart TV'}
    },
    {
        icon: <FaMapLocationDot />,
        description: { it: 'In pieno centro storico', en: 'In the heart of the historic center' }
    },
    {
        icon: <FaPaw />,
        description: { it: 'Animali accettati', en: 'Pet Friendly' }
    },
    {
        icon: <FaBaby />,
        description: { it: 'Culla e seggiolone per neonati', en: 'Crib and baby seat available' }
    },
    {
        icon: <FaSuitcase />,
        description: { it: 'Deposito bagagli gratuito', en: 'Free baggage storage' }
    }
]

export type Room = {
    [key: number]: {
        name: string
        slug: string
        maxOccupancy: number
        opengraphImage: string
        images: string[]
        description: {
            it: string
            en: string
        }
        services: {
            icon: JSX.Element;
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
        opengraphImage: 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/openghraph-san-biagio.jpg',
        images: [
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07056-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07062-HDR_1.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07068-HDR_1.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07071-HDR_1.jpg',
            /* 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07083-HDR.jpg', */
            /* 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07086-HDR.jpg', */
            /* 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07143-HDR.jpg', */
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07158-HDR_1.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/san-biagio/DSC07161-HDR_1.jpg'
        ],
        description: {
            'it': 'Camera da 50mq con balcone che affaccia su Spaccanapoli, utilizzabile da singola a quadrupla',
            'en': '50sqm room with balcony overlooking Spaccanapoli, usable from single to quad occupancy'
        },
        services: services.filter(service => service.description['it'] !== 'Cucina in comune')
    },
    149040: {
        name: 'Maiorani',
        slug: 'maiorani',
        maxOccupancy: 4,
        opengraphImage: 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/openghraph-maiorani.jpg',
        images: [
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04129-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04139-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04147-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04166-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04178-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/maiorani/DSC04181-HDR.jpg',
        ],
        description: {
            'it': 'Camera da 45mq con finstra che affaccia su vico Maiorani, utilizzabile da singola a quadrupla',
            'en': '45sqm room with window overlooking vico Maiorani, usable from single to quad occupancy'
        },
        services: services.filter(service => service.description['it'] !== 'Angolo cottura')
    },
    1495987: {
        name: 'Divino Amore',
        slug: 'divino-amore',
        maxOccupancy: 3,
        opengraphImage: 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/openghraph-divino-amore.jpg',
        images: [
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07104-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07110-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07119-HDR.jpg',
            'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07122-HDR.jpg',
            /* 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07134-HDR.jpg', */
            /* 'https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/divino-amore/DSC07155-HDR.jpg' */
        ],
        description: {
            'it': 'Camera da 40mq con balcone che affaccia su Spaccanapoli, utilizzabile da singola a tripla',
            'en': '40sqm room with balcony overlooking Spaccanapoli, usable from single to triple occupancy'
        },
        services: services.filter(service => service.description['it'] !== 'Angolo cottura')
    }
}
