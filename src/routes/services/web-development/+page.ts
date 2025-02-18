import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        process: [
            {
                name: "Understanding the Problem",
                description: "We analyze your business challenges, goals, and audience to define clear objectives for the solution."
            },
            {
                name: "Crafting Digital Solutions",
                description: "We strategize and define the best technologies and features to create a scalable, effective solution."
            },
            {
                name: "UI/UX Design & Prototyping",
                description: "We design intuitive wireframes and prototypes, ensuring a user-friendly interface that aligns with your brand."
            },
            {
                name: "Development & Implementation",
                description: "Our developers build the solution with clean, maintainable code, integrating key features for your business needs."
            },
            {
                name: "Testing, Optimization & Launch",
                description: "We test for performance, security, and usability, ensuring a smooth launch and ongoing optimization."
            }
        ],
        features: [
            {
                name: "Custom Solutions",
                description: "Tailored solutions designed specifically for each business.",
                svg: "/svgs/customsolutions.svg"
            },
            {
                name: "Scalability",
                description: "Built to grow alongside the business without limitations.",
                svg: "/svgs/scalability.svg"
            },
            {
                name: "Accessibility",
                description: "Web apps work seamlessly on mobile, tablet, and PC across all OS.",
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
        ],
        products: [
            "SEO Optimization", "Website Design", "UI/UX Design", "Web Security", "Custom Web Applications", "API Development", "FullStack Development",
        ]
    };
};
