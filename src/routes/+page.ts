import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
    return {
        projects: [
            {
                id: "project-2",
                name: "Falcon",
                categories: ["Website", "Brand Design"],
                imageSrc: "/projects/2.jpg"
            },
            {
                id: "project-7",
                name: "K closet",
                categories: ["Web App", "Product Visualization"],
                imageSrc: "/projects/7.jpg"
            },
            {
                id: "project-8",
                name: "Mago",
                categories: ["Brand Design", "Website"],
                imageSrc: "/projects/8.jpg"
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
        ]
    };
};

