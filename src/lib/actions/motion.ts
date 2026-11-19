/**
 * Shared motion actions. Every effect starts from content that is already
 * visible without JS, and every effect stands down under reduced motion.
 */

/**
 * True when motion should stand down: the visitor asked for reduced motion, or
 * the page was opened with `?still` (static captures and reviews of the page at rest).
 */
export const stillMode = () =>
	typeof window !== 'undefined' &&
	(matchMedia('(prefers-reduced-motion: reduce)').matches ||
		new URLSearchParams(location.search).has('still'));
const reduced = stillMode;
const finePointer = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Element leans toward the pointer while hovered, then springs back. */
export function magnetic(node: HTMLElement, strength = 0.28) {
	if (reduced() || !finePointer()) return {};
	let raf = 0,
		tx = 0,
		ty = 0,
		x = 0,
		y = 0;
	const tick = () => {
		x += (tx - x) * 0.2;
		y += (ty - y) * 0.2;
		node.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
		raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(tick) : 0;
	};
	const go = () => {
		if (!raf) raf = requestAnimationFrame(tick);
	};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		tx = (e.clientX - (r.left + r.width / 2)) * strength;
		ty = (e.clientY - (r.top + r.height / 2)) * strength;
		go();
	};
	const leave = () => {
		tx = 0;
		ty = 0;
		go();
	};
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
			cancelAnimationFrame(raf);
		}
	};
}

let io: IntersectionObserver | null = null;
function observer() {
	if (!io) {
		io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add('is-in');
						io?.unobserve(e.target);
					}
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
		);
	}
	return io;
}

/**
 * Scroll reveal. The element is only armed (moved off its resting state) once
 * JS runs and only if it is still below the fold, so nothing above the fold
 * or without JS is ever hidden.
 */
export function reveal(node: HTMLElement, delay = 0) {
	if (reduced()) return {};
	const r = node.getBoundingClientRect();
	if (r.top < innerHeight * 0.9) return {};
	node.style.setProperty('--reveal-delay', `${delay}ms`);
	node.classList.add('reveal-armed');
	observer().observe(node);
	return {
		destroy() {
			io?.unobserve(node);
		}
	};
}

/**
 * Split a heading's text into words that rise in sequence when it scrolls in.
 * Text content and accessible name are unchanged (aria-label keeps the
 * original string).
 */
export function splitWords(node: HTMLElement) {
	const text = node.textContent ?? '';
	if (reduced() || !text.trim()) return {};
	const r = node.getBoundingClientRect();
	const below = r.top >= innerHeight * 0.9;
	node.setAttribute('aria-label', text.trim());
	node.innerHTML = '';
	text
		.trim()
		.split(/\s+/)
		.forEach((word, i) => {
			const outer = document.createElement('span');
			outer.className = 'w';
			outer.setAttribute('aria-hidden', 'true');
			const inner = document.createElement('span');
			inner.textContent = word;
			inner.style.setProperty('--i', String(i));
			outer.append(inner);
			node.append(outer, document.createTextNode(' '));
		});
	if (below) {
		node.classList.add('split-armed');
		observer().observe(node);
	}
	return {
		destroy() {
			io?.unobserve(node);
		}
	};
}
