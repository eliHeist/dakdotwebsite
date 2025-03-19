import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: 'Seromu Junior School',
    slug: 'seromujs',
    tags: [TAGS.logo, TAGS.badgeoremblem],
    industry: INDUSTRIES.education,
    thumb: {
        type: 'image',
        src: '/projects/seromujs/thumb.jpg'
    },
    splash: {
        type: 'image',
        fill: false,  
        src: '/projects/seromujs/splash.jpg'
    },
    mediaPath: '/projects/seromujs/',
    overview: `The Seromu Junior School Badge and Logo Icon design was crafted to represent the school’s identity and values. Located in Mpigi, Uganda, Seromu Junior School provides both primary and nursery education to young learners. The design features a bold and colorful badge that incorporates elements symbolizing education, community, and growth. The logo icon combines playful and professional elements to appeal to both children and parents, while ensuring the school's message is clear and memorable.`,
    sections: [
        {
            type: 'paragraph',
            cols: 1,
            fit: false,
            title: false,
            body: `The goal of the project was to create a strong visual identity for Seromu Junior School, one that resonates with both the local community and visitors, and reflects the school’s commitment to quality education. The badge and logo icon were designed to be versatile and easily adaptable across multiple media, including uniforms, stationery, signage, and the school’s website.
            <br/><br/>The design process involved several stages, starting with initial concept sketches and brainstorming sessions, followed by digital refinements to perfect the design. The final result was a simple yet memorable logo that captures the school’s ethos in a way that is easily recognizable and relatable to both children and parents in the community.
            <br/><br/>This project is a perfect example of how design can communicate a school’s mission and identity while appealing to a diverse audience.`,
        },
        {
            type: 'images',
            cols: 1,
            fit: false,
            images: ['2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'],
        },
        {
            type: 'paragraph',
            cols: 1,
            fit: false,
            title: false,
            body: `The badge’s vibrant colors and unique typography were selected to evoke a sense of joy and learning, reflecting the school’s focus on nurturing young minds and fostering academic excellence.`,
        },
        {
            type: 'images',
            cols: 1,
            images: ['10.jpg'],
        }
    ]
}