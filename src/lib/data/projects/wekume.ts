import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: 'Wekume Logo',
    slug: 'wekume',
    tags: [TAGS.logo],
    industry: INDUSTRIES.healthcare,
    thumb: {
        type: 'image',
        src: '/projects/wekume/thumb.png'
    },
    splash: {
        type: 'image',
        fill: false,  
        src: '/projects/wekume/splash.png'
    },
    mediaPath: '/projects/wekume/',
    overview: `This was a redesign of the redesign of the Wekume logo to give it charachter and a good use of the brand colors.`,
    sections: [
        {
            type: 'images',
            cols: 1,
            fit: false,
            images: ['4.png', '5.png'],
        },
        {
            type: 'images',
            cols: 2,
            fit: false,
            images: ['6.png', '7.png', '13.png', '9.png'],
        },
        {
            type: 'images',
            cols: 1,
            fit: false,
            images: ['10.png', '11.png', '12.png'],
        },
    ]
}