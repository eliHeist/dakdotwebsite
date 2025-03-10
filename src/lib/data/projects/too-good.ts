import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: 'Too Good Yoghurt',
    slug: 'too-good',
    tags: [TAGS.packagedesign, TAGS.logo],
    industry: INDUSTRIES.foodandbeverages,
    thumb: {
        type: 'image',
        src: '/projects/too-good/thumb.webp'
    },
    splash: {
        type: 'image',
        src: '/projects/too-good/splash.webp'
    },
    mediaPath: '/projects/too-good/',
    overview: 'We focused on creating a visually appealing and market-ready packaging solution for the Too Good Yoghurt brand. We designed the packaging with vibrant colors, modern typography, and high-quality imagery to emphasize freshness, taste, and nutritional benefits. Our goal was to enhance brand visibility, attract consumers, and communicate the unique qualities of the product.',
    goals: [
        "Create a strong shelf presence that stands out among competitors.",
        "Ensure the design is consistent across all flavors and packaging sizes.",
        "Maintain a balance between aesthetic appeal and clear communication.",
        "Align with modern branding trends in the dairy industry."
    ],
    sections: [
        {
            type: 'images',
            cols: 1,
            images: ['1.jpg', '9.jpg'],
        },
        {
            type: 'images',
            cols: 2,
            images: ['3.jpg', '9.jpg', 'thumb.jpg', '4.jpg'],
        },
        {
            type: 'images',
            cols: 1,
            images: ['8.jpg', '7.jpg'],
        },
    ]
}