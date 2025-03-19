import { INDUSTRIES, TAGS } from "../projects";

export default {
    title: "Twewayo",
    slug: 'twewayo',
    tags: [TAGS.website],
    industry: INDUSTRIES.agric,
    link: {
        name: "twewaayo.com",
        url: "twewaayo.com"
    },
    thumb: {
        type: 'image',
        src: '/projects/twewayo/thumb (Small).jpg'
    },
    splash: {
        type: 'image',
        fill: true,  
        src: '/projects/twewayo/splash.jpg'
    },
    mediaPath: '/projects/twewayo/',
    overview: `Twewaayo Agri Business is a Ugandan company dedicated to promoting sustainable agriculture through comprehensive support services. Established in 2018 as a mobile agriculture extension service focusing on fish farming, it has since expanded to offer a wide range of agricultural solutions.
    <br/>The primary goal of the Twewaayo Agri Business website is to provide an informative and accessible platform that showcases the company's services, facilitates client engagement, and promotes sustainable agricultural practices.`,
    sections: [
        {
            type: 'list',
            cols: 1,
            fit: false,
            title: "Design Approach",
            list_items: [
                `<strong>User-Centric Navigation</strong> The website features a straightforward menu with sections such as Home, About, Services, Gallery, and Contact, allowing users to easily access information.`,
                `<strong>Visual Content:</strong> High-quality images of agricultural projects, including fish ponds and poultry farming setups, are used to illustrate the company's expertise and services.`,
                `<strong>Responsive Design:</strong> The site is optimized for various devices, ensuring a seamless user experience across desktops, tablets, and smartphones.`,
            ],
        },
        {
            type: 'paragraph',
            cols: 1,
            fit: false,
            title: "Outcome",
            body: `The website effectively serves as a digital platform for Twewaayo Agri Business, reflecting its commitment to sustainable agriculture and providing valuable resources to current and prospective clients.`,
        },
    ]
}