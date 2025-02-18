import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        "process": [
            {
                "name": "Concept & Storyboarding",
                "description": "We start with ideation, scripting, and creating storyboards to visualize the concept before production begins."
            },
            {
                "name": "Animation & VFX Production",
                "description": "Our team animates visuals, applies VFX, and refines each frame to ensure smooth motion and high-quality rendering."
            },
            {
                "name": "Editing & Post-Production",
                "description": "We polish the video with advanced editing, sound mixing, color correction, and effects for a professional cinematic finish."
            },
            {
                "name": "Final Delivery & Optimization",
                "description": "The completed video is formatted and optimized for various platforms, ensuring high performance across web, social media, and broadcast channels."
            }
        ],
        "features": [
            {
                "name": "Motion Graphics & Explainer Videos",
                "description": "Animated graphics enhance communication and simplify complex ideas into engaging visual stories, perfect for product explainers and brand storytelling.",
                "svg": "/svgs/editing.svg"
            },
            {
                "name": "Video Animation & 3D Motion",
                "description": "From 2D animation to immersive 3D visuals, our animation services bring characters, products, and concepts to life with fluid motion and compelling narratives.",
                "svg": "/svgs/animation.svg"
            },
            {
                "name": "Visual Effects (VFX) & Compositing",
                "description": "We enhance video content with stunning visual effects, green screen compositing, CGI elements, and seamless integration to create high-quality cinematic experiences.",
                "svg": "/svgs/vfx.svg"
            },
            {
                "name": "Post-Production & Editing",
                "description": "Our post-production services refine raw footage into polished masterpieces, including color grading, sound design, transitions, and final cut editing for professional results.",
                "svg": "/svgs/editing.svg"
            }
        ],
        "faq": [
            {
                "question": "What types of motion graphics do you create?",
                "answer": "We design animated infographics, kinetic typography, product explainers, and interactive brand elements for engaging content."
            },
            {
                "question": "How long does a video animation project take?",
                "answer": "Depending on complexity, projects can take 2-6 weeks, ensuring attention to detail and high-quality production."
            },
            {
                "question": "Do you offer scriptwriting for video content?",
                "answer": "Yes! We help craft compelling scripts that align with your brand’s message and storytelling goals."
            },
            {
                "question": "Can you integrate VFX with live-action footage?",
                "answer": "Absolutely! Our team specializes in blending CGI, motion tracking, and compositing for seamless integration."
            },
            {
                "question": "What video formats do you provide?",
                "answer": "We deliver videos optimized for social media, YouTube, commercials, and broadcast in multiple formats like MP4, MOV, and ProRes."
            }
        ],
        "technologies": [
            {
                "name": "Adobe After Effects",
                "svg": "/svgs/technologies/aftereffects.svg"
            },
            {
                "name": "Blender",
                "svg": "/svgs/technologies/blender.svg"
            },
            {
                "name": "Cinema 4D",
                "svg": "/svgs/technologies/cinema4d.svg"
            },
            {
                "name": "Adobe Premiere Pro",
                "svg": "/svgs/technologies/premierpro.svg"
            },
            {
                "name": "DaVinci Resolve",
                "svg": "/svgs/technologies/davinci.svg"
            },
            {
                "name": "Unreal Engine",
                "svg": "/svgs/technologies/unreal.svg"
            },
            {
                "name": "FL Studio",
                "svg": "/svgs/technologies/flstudio.svg"
            }
        ],
        "products": [
            "Explainer Videos",
            "Corporate Video Animation",
            "VFX for Commercials & Films",
            "3D Motion Graphics & Visual Effects",
            "Social Media Video Ads",
            "Product & Promo Videos"
        ]
    };
};
