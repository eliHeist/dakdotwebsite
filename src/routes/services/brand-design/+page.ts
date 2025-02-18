import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        "process": [
            {
                "name": "Discovery & Research",
                "description": "We start by understanding your brand, audience, and goals through consultations and competitor research to define the right direction."
            },
            {
                "name": "Concept & Visual Identity Development",
                "description": "Our team creates initial logo concepts, mood boards, typography, and color palettes to establish the look and feel of your brand."
            },
            {
                "name": "Refinement & Brand Guidelines",
                "description": "Based on feedback, we refine the chosen design and compile a comprehensive brand guide for consistency across all materials."
            },
            {
                "name": "Product & Stationery Design",
                "description": "We apply your brand identity to packaging, marketing collateral, business cards, and other printed or digital assets for a complete brand presence."
            },
            {
                "name": "Digital Rollout & Social Media Branding",
                "description": "We ensure your brand is optimized for web, social media, and digital marketing, with assets tailored for online visibility and engagement."
            }
        ],
        "features": [
            {
                "name": "Brand Identity",
                "description": "We create a cohesive visual identity that represents your brand’s values, including logos, typography, colors, and brand guidelines for consistency across all platforms.",
                "svg": "/svgs/branddesign.svg"
            },
            {
                "name": "Product Visualization",
                "description": "Bring your products to life with realistic 3D renders, mockups, and digital prototypes that showcase your product in the best light before production.",
                "svg": "/svgs/productvisualization.svg"
            },
            {
                "name": "Stationery & Print Design",
                "description": "We design business cards, letterheads, brochures, packaging, and marketing materials that align with your brand’s visual identity and messaging.",
                "svg": "/svgs/stationary.svg"
            },
            {
                "name": "Digital Marketing",
                "description": "We craft stunning social media graphics, digital ads, and content templates to help you maintain a strong and engaging online presence.",
                "svg": "/svgs/digitalmarketing.svg"
            }
        ],
        "faq": [
            {
                "question": "What’s included in a full brand identity package?",
                "answer": "A full package includes logo design, typography, color palette, brand guidelines, business cards, social media graphics, and marketing materials."
            },
            {
                "question": "Can I request only a logo design?",
                "answer": "Yes! We offer standalone logo design services, but we recommend a complete branding package for consistency."
            },
            {
                "question": "How long does the branding process take?",
                "answer": "Depending on the scope, branding takes 2 to 6 weeks, ensuring research, design, and revisions for the best outcome."
            },
            {
                "question": "Do you offer revisions?",
                "answer": "Yes, we provide multiple revision rounds to ensure the final design aligns with your vision."
            },
            {
                "question": "Can you create branded templates for social media?",
                "answer": "Absolutely! We design custom social media templates that maintain a consistent and professional brand presence across all platforms."
            }
        ],
        "technologies": [
            {
                "name": "Adobe Illustrator",
                "svg": "/svgs/technologies/illustrator.svg"
            },
            {
                "name": "Adobe Photoshop",
                "svg": "/svgs/technologies/photoshop.svg"
            },
            {
                "name": "Figma",
                "svg": "/svgs/technologies/figma.svg"
            },
            {
                "name": "Blender",
                "svg": "/svgs/technologies/blender.svg"
            },
            {
                "name": "After Effects",
                "svg": "/svgs/technologies/aftereffects.svg"
            }
        ],
        "products": [
            "Brand Guidelines",
            "Logo Design",
            "Business Cards",
            "Social Media Templates",
            "3D Product Renders",
            "Print Materials",
            "Digital Advertisements"
        ]
    }
    ;
};
