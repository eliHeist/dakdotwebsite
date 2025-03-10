import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: 'Thupu',
    slug: 'thupu',
    tags: [TAGS.packagedesign, TAGS.content],
    industry: INDUSTRIES.foodandbeverages,
    thumb: {
        type: 'image',
        src: '/projects/thupu/thumb.webp'
    },
    splash: {
        type: 'image',
        src: '/projects/thupu/splash.webp'
    },
    mediaPath: '/projects/thupu/',
    overview: 'We focused on creating a visually appealing and market-ready packaging solution for the Thupu Natural Cooking Oil Product. Our goal was to enhance product visibility on the shelf, attract consumers by popping out from the competition, and communicate the unique qualities of the product.',
    goals: [
        "Create a strong shelf presence that stands out among competitors.",
        "Ensure the design is consistent across all flavors and packaging sizes.",
        "Maintain a balance between aesthetic appeal and clear communication.",
        "Align with modern branding trends in the dairy industry."
    ],
    sections: [
        {
            type: 'images',
            cols: 3,
            fit: false,
            images: ['3.webp', '4.webp', '5.webp'],
        },
        {
            type: 'images',
            cols: 2,
            images: ['1.webp', '2.webp'],
        },
        {
            type: 'images',
            cols: 2,
            images: ['6.webp', '7.webp'],
        },
        {
            type: 'images',
            cols: 1,
            images: ['8.webp', '9.webp'],
        },
    ]
}