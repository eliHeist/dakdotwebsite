import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: "Kamy's Delights",
    slug: 'kamysdelights',
    tags: [TAGS.website],
    industry: INDUSTRIES.facilitymgt,
    link: {
        name: "kamysdelights.com",
        url: "kamysdelights.com"
    },
    thumb: {
        type: 'image',
        src: '/projects/kamysdelights/thumb (Small).jpg'
    },
    splash: {
        type: 'image',
        fill: true,  
        src: '/projects/kamysdelights/splash.jpg'
    },
    mediaPath: '/projects/kamysdelights/',
    overview: `Kamy's Delights is a multifaceted service provider in Kampala, Uganda, offering professional cleaning, catering, laundry, and equipment supply services. The website's design reflects a minimalistic approach, ensuring users can easily navigate and access information without feeling overwhelmed.
    <br/>The goal of this project was to create a minimalistic, user-friendly, and highly navigable website for Kamy's Delights, a company offering cleaning, catering, laundry, and equipment supply services. The focus was to ensure an effortless user experience, keeping content concise while effectively presenting the brand’s offerings.`,
    sections: [
        {
            type: 'list',
            cols: 1,
            fit: false,
            title: "Design Approach",
            list_items: [
                `<strong>Minimalist Aesthetic:</strong> The website embraces simplicity, using clean layouts, ample white space, and a well-structured design to enhance usability.`,
                `<strong>Easy Navigation:</strong> A streamlined menu allows users to access core services with minimal clicks.`,
                `<strong>Mobile Responsiveness:</strong> The site is fully optimized for different screen sizes, ensuring accessibility across devices.`,
                `<strong>Concise Content:</strong> Service descriptions are direct and to the point, preventing information overload.`,
            ],
        },
        {
            type: 'paragraph',
            cols: 1,
            fit: false,
            title: "Outcome",
            body: `The final product is a sleek, modern, and functional website that effectively represents Kamy's Delights’ services without overwhelming the user. It serves as an easy-to-navigate platform where potential customers can quickly understand the company’s offerings and reach out with minimal friction.`,
        },
    ]
}