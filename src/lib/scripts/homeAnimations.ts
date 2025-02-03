import { gsap } from "gsap";


export async function aboutUsSection(wrapper: HTMLElement, content: HTMLElement, title: HTMLElement) {
    const ScrollTrigger = await import("gsap/ScrollTrigger")
    
    gsap.registerPlugin(ScrollTrigger);
    
    let animation = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom top",
            pin: content,
            scrub: true
        }
    });

    animation.to(content, {
        opacity: 0.1,
        scale: 0.8
    });

    animation.fromTo(title, { top: "50%", scale: 0.8, opacity: 0.9, backdropFilter: "blur(0)" }, {
        top: 0,
        scale: 1,
        opacity: 1,
        backdropFilter: "blur(10px)"
    });

    // Adding spacer to wrapper
    // gsap.set(wrapper, { height: "200vh" });
}

