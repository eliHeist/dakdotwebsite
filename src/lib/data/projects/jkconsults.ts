import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: 'JK Consults',
    slug: 'jkconsults',
    tags: [TAGS.logo, TAGS.badgeoremblem],
    industry: INDUSTRIES.healthcare,
    thumb: {
        type: 'image',
        src: '/projects/jkconsults/thumb.jpg'
    },
    splash: {
        type: 'image',
        fill: false,  
        src: '/projects/jkconsults/splash.jpg'
    },
    mediaPath: '/projects/jkconsults/',
    overview: `We designed a modern and professional logo for JK Consults, a company committed to providing expert consulting services. The logo blends clean typography with a strong, dynamic icon, symbolizing trust, innovation, and strategic growth. The color palette was carefully selected to convey professionalism and reliability, ensuring a timeless and versatile design suitable for branding, corporate materials, and digital platforms. This logo establishes a strong visual identity, reinforcing JK Consults' position as a leader in the consulting industry.`,
    sections: [
        {
            type: 'images-sm',
            cols: 1,
            fit: false,
            images: ['2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '13.jpg'],
        },
        {
            type: 'images',
            cols: 2,
            images: ['12.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'],
        },
        {
            type: 'images',
            cols: 1,
            fit: false,
            images: ['11.jpg'],
        },
    ]
}
