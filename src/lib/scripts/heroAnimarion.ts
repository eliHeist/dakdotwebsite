import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type'


gsap.registerPlugin(ScrollTrigger);

export function runAnimation(start: string = 'top 80%', end: string = 'top 20%', element: HTMLElement) {
    const texts = element.querySelectorAll('span') as NodeList
    let runCount = 0

    texts.forEach((char:any,i:any) => {
        const text = new SplitType(char, { types: 'chars,words' })

        gsap.from(text.words, {
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 20%',
                scrub: false,
                markers: false,
                toggleActions: 'play play reverse reverse',
            },
            opacity: 0.2,
            transformOrigin: 'bottom',
            stagger: 0.1,
            ease: "power1.out"
        })
    })
}