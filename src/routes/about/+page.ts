import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        services: [
            {
                name: "Web Development",
                url: "/services/web-development",
                description: "We build high-performance websites and applications tailored to your business needs. Whether it's a dynamic website, an e-commerce store, or a custom web application, we ensure seamless functionality, speed, and security."
            },
            {
                name: "Brand Design & Identity",
                url: "/services/brand-design",
                description: "We craft unique and memorable brand identities that reflect your business vision. From logo design to full brand guidelines, we ensure consistency across all platforms, helping your brand leave a lasting impression."
            },
            {
                name: "Product Visualization",
                url: "/services/motion",
                description: "We bring your products to life through high-quality 3D renderings and visualizations. Whether you need stunning product images, interactive models, or animated demonstrations, we help showcase your products in the best light."
            },
            {
                name: "Motion & Video Production",
                url: "/services/motion",
                description: "We create engaging videos, animations, and motion graphics that captivate audiences. Whether it's an explainer video, a brand commercial, or social media content, our video production team ensures high-quality storytelling and visuals."
            },
            {
                name: "Digital Marketing",
                url: "/services/motion",
                description: "We drive growth and engagement with strategic digital marketing campaigns. From SEO and content marketing to paid advertising and social media management, we help you attract, convert, and retain customers effectively."
            },
            {
                name: "IT Consulting",
                url: "/services/web-development",
                description: "We provide expert IT consulting services to help businesses optimize their technology infrastructure and strategy. From system integration and cloud computing to cybersecurity and data management, we offer tailored solutions for your IT needs."
            },
        ],
        svgs: [
            '/svgs/shapes/stack.svg',
            '/svgs/shapes/flower.svg',
            '/svgs/shapes/circle.svg',
            '/svgs/shapes/y.svg',
            '/svgs/shapes/circles.svg',
            '/svgs/shapes/star.svg',
        ],
    }
}