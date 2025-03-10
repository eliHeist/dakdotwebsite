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
                name: "K closet",
                categories: ["Web App", "Product Visualization"],
                imageSrc: "/projects/7.jpg"
            },
            {
                id: "project-8",
                name: "Thupu",
                categories: ["Food and Beverages"],
                imageSrc: "/projects/thupu/thumb.webp"
            },
            {
                id: "project-26",
                name: "Savanah",
                categories: ["Brand Design", "Website"],
                imageSrc: "/projects/26.jpg"
            },
            {
                id: "project-52",
                name: "UNESCO",
                categories: ["Video Editing", "Product Visualization"],
                imageSrc: "/projects/52.jpg"
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
                details: "Your story deserves to be told in the most engaging way possible. From motion graphics and 3D animation to post-production editing and VFX, we create videos that captivate your audience and strengthen your brand message.",
                icon: "/svgs/services/video.svg",
                icon_colored: "/svgs/services/video-colored.svg"
            },
            {
                title: "Marketing",
                details: "Having a great product or service isn’t enough—you need the right strategy to reach your audience. We handle SEO, social media campaigns, paid ads, and content marketing to bring your brand in front of the right people at the right time.",
                icon: "/svgs/services/marketing.svg",
                icon_colored: "/svgs/services/marketing-colored.svg"
            }
        ]
    };
};

