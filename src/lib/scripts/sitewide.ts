
// If a user hasn't opted in for reduced motion, then we add the animation


export function addAnimation() {
    const scrollers = document.querySelectorAll<HTMLElement>('.scroller');

    scrollers.forEach((scroller) => {
        // Add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute('data-animated', 'true');
        console.log(scroller);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector('.scroller__inner') as HTMLElement;
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}