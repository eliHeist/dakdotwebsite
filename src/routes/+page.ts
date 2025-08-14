import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
    return {
        projects: [
            {
                id: "project-2",
                name: "Too Good",
                categories: ["Food and Beverages"],
                imageSrc: "/projects/too-good/splash.webp"
            },
            {
                id: "project-7",
                name: "Seromu Badge",
                categories: ["School Badge"],
                imageSrc: "/projects/seromujs/thumb.jpg"
            },
            {
                id: "project-26",
                name: "Kamy's Delights",
                categories: ["Website"],
                imageSrc: "/projects/kamysdelights/thumb (Small).jpg"
            },
            {
                id: "project-8",
                name: "Thupu",
                categories: ["Food and Beverages"],
                imageSrc: "/projects/thupu/thumb.webp"
            },
            {
                id: "project-52",
                name: "Wekume Brand Design",
                categories: ["Video Editing", "Product Visualization"],
                imageSrc: "/projects/wekume/thumb.png"
            }
        ],
        services: [
            {
                title: "Development",
                details: "You have a vision for your business, and we bring it to life with technology. Whether you need a custom web application, a powerful e-commerce platform, or a streamlined business tool, we develop scalable, high-performance solutions tailored to your needs.",
                icon: "/svgs/services/development.svg",
                icon_colored: "/svgs/services/development-colored.svg"
            },
            {
                title: "Design",
                details: "First impressions matter. We design engaging, user-friendly interfaces that not only look great but also enhance user experience and drive conversions. Whether it’s UI/UX design, branding, or product visualization, we make sure your brand stands out.",
                icon: "/svgs/services/design.svg",
                icon_colored: "/svgs/services/design-colored.svg"
            },
            {
                title: "Video",
                details: "We specialize in professional video editing and production, focusing on creating polished and engaging content that tells your story effectively. From cutting and color grading to sound design and final mastering, we make your footage shine.",
                icon: "/svgs/services/video.svg",
                icon_colored: "/svgs/services/video-colored.svg"
            },
            {
                title: "Animation",
                details: "We bring ideas to life through high-quality 3D animation and visualization. Whether it’s product renders, explainer videos, or immersive animated scenes, we craft visuals that engage, inform, and inspire.",
                icon: "/svgs/services/marketing.svg",
                icon_colored: "/svgs/services/marketing-colored.svg"
            }
        ]
    };
};

