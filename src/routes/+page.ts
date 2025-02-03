import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
    return {
        projects: [
            {
                id: "project-2",
                name: "Fusion Web Design",
                categories: ["Website", "Brand Design"],
                imageSrc: "/projects/2.jpg"
            },
            {
                id: "project-7",
                name: "Tech Innovators",
                categories: ["Web App", "Product Visualization"],
                imageSrc: "/projects/7.jpg"
            },
            {
                id: "project-8",
                name: "Creative Studio",
                categories: ["Brand Design", "Website"],
                imageSrc: "/projects/8.jpg"
            },
            {
                id: "project-9",
                name: "Elegant Portfolio",
                categories: ["Website", "Product Visualization"],
                imageSrc: "/projects/9.jpg"
            },
            {
                id: "project-22",
                name: "NextGen Media",
                categories: ["Video Editing", "Web App"],
                imageSrc: "/projects/22.jpg"
            },
            {
                id: "project-26",
                name: "BrandMaster",
                categories: ["Brand Design", "Website"],
                imageSrc: "/projects/26.jpg"
            },
            {
                id: "project-36",
                name: "Innovative Solutions",
                categories: ["Web App", "Product Visualization"],
                imageSrc: "/projects/36.jpg"
            },
            {
                id: "project-52",
                name: "Visual Media Hub",
                categories: ["Video Editing", "Product Visualization"],
                imageSrc: "/projects/52.jpg"
            }
        ]
    };
};

