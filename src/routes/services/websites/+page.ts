import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        process: [
            {
                name: "Problem Definition",
                description: "Before designing, we deep dive into your business needs, audience, and objectives. We identify key pain points and determine how your website can solve them."
            },
            {
                name: "UI/UX Design & Prototyping",
                description: "We focus on both visual appeal (UI) and usability (UX) to ensure your website is aesthetically pleasing and easy to navigate."
            },
            {
                name: "Development",
                description: "Once the design is approved, we begin coding to bring it to life with a high-performance, mobile-friendly, and scalable structure."
            },
            {
                name: "Testing, Optimization & Launch",
                description: "We rigorously test every aspect of the website to ensure it is bug-free, secure, and ready for launch."
            }
        ],
        features: [
            {
                name: "Responsive & Mobile-Optimized Design",
                description: "Your website will deliver a seamless experience across all devices, from desktops to smartphones. With a mobile-first approach, we ensure intuitive navigation, fast loading speeds, and accessibility, enhancing user engagement and search rankings.",
                svg: "/svgs/customsolutions.svg"
            },
            {
                name: "Fast & SEO-Optimized Performance",
                description: "We optimize your website for speed and search engine visibility, ensuring pages load instantly and rank higher on Google. Using clean code, caching, and SEO best practices, we enhance performance, improve user retention, and drive organic traffic.",
                svg: "/svgs/scalability.svg"
            },
            {
                name: "Custom & Scalable Solutions",
                description: "Every website we build is tailored to your unique business needs, designed for flexibility and future growth. Whether you need a simple landing page or a complex web platform, we ensure scalability, seamless integrations, and long-term adaptability.",
                svg: "/svgs/easeofaccess.svg"
            }
        ],
        faq: [
            {
                question: "How is a custom web-based solution different from off-the-shelf software?",
                answer: "Custom solutions are built specifically for your business needs, offering better integration, scalability, and flexibility compared to generic software."
            },
            {
                question: "How much does a custom enterprise web solution cost?",
                answer: "Costs depend on the complexity, features, and integrations required. We provide tailored pricing based on your business needs after an initial consultation."
            },
            {
                question: "How secure is a custom web-based enterprise solution?",
                answer: "Security is a top priority. We implement encryption, authentication, access controls, and regular security updates to protect your data."
            },
            {
                question: "Can the system integrate with our existing software?",
                answer: "Yes! We design solutions that integrate with your CRM, ERP, payment systems, and other third-party software for seamless operations."
            },
            {
                question: "What kind of support and maintenance do you offer?",
                answer: "We provide ongoing maintenance, security updates, and feature enhancements to ensure your system runs smoothly and adapts to future needs."
            }
        ],
        technologies: [
            {
                name: "Django",
                svg: "/svgs/technologies/django.svg"
            },
            {
                name: "Svelte",
                svg: "/svgs/technologies/svelte.svg"
            },
            {
                name: "Python",
                svg: "/svgs/technologies/python.svg"
            },
            {
                name: "Typescript",
                svg: "/svgs/technologies/typescript.svg"
            },
            {
                name: "Microsoft Azure",
                svg: "/svgs/technologies/azure.svg"
            },
            {
                name: "PostgreSQL",
                svg: "/svgs/technologies/postgres.svg"
            },
            {
                name: "MySQL",
                svg: "/svgs/technologies/mysql.svg"
            },
        ]
    };
};
