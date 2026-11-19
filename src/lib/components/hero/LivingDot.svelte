<script lang="ts">
	/**
	 * "Dot": the Dakdot logo dot as a living character.
	 * - leans toward the pointer on a spring, squashing/stretching with speed
	 * - pupils track the pointer; blinks at random; boings when tapped
	 * - on scroll it travels up and docks into the header logo's dot
	 * Without JS (or with reduced motion) it is a still dot resting in the hero.
	 */
	import { onMount } from 'svelte';
	import { stillMode } from '$lib/actions/motion';

	let anchor: HTMLDivElement | undefined = $state();
	let body: HTMLDivElement | undefined = $state();
	let eyes: HTMLDivElement | undefined = $state();
	let live = $state(false);

	onMount(() => {
		if (!anchor || !body || !eyes) return;
		if (stillMode()) return;

		const root = document.documentElement;
		const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
		const pupils = [...eyes.querySelectorAll<HTMLElement>('.pupil')];
		const lids = [...eyes.querySelectorAll<HTMLElement>('.eye')];

		let restX = 0,
			restY = 0,
			restD = 0,
			restDocTop = 0;
		let dockX = 0,
			dockY = 0,
			dockD = 0;
		let dockEnd = 1;

		const measure = () => {
			const a = anchor!.getBoundingClientRect();
			restD = a.width;
			restX = a.left + a.width / 2;
			restDocTop = a.top + scrollY + a.height / 2;
			restY = restDocTop - scrollY;
			const logoDot = document.querySelector<SVGGraphicsElement>('header .brand .dot');
			if (logoDot) {
				const r = logoDot.getBoundingClientRect();
				dockX = r.left + r.width / 2;
				dockY = r.top + r.height / 2;
				dockD = r.width;
			} else {
				dockX = 40;
				dockY = 36;
				dockD = 16;
			}
			// Fully docked once the hero has scrolled ~65% out of view.
			dockEnd = Math.max(1, restDocTop * 1.05);
		};

		// Spring state
		let x = restX,
			y = restY,
			vx = 0,
			vy = 0;
		let squash = 0,
			squashV = 0;
		let px = innerWidth * 0.5,
			py = innerHeight * 0.5,
			hasPointer = false;
		let lookX = 0,
			lookY = 0,
			wanderX = 0,
			wanderY = 0;
		let raf = 0,
			t0 = performance.now();

		measure();
		x = restX;
		y = restY;
		live = true;

		const ease = (t: number) => 1 - Math.pow(1 - t, 3);
		const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

		const frame = (now: number) => {
			const dt = Math.min(2, (now - t0) / 16.67);
			t0 = now;

			const p = clamp(scrollY / dockEnd, 0, 1);
			const e = ease(p);
			const curRestY = restDocTop - scrollY;

			// Target: rest point (scrolling with the page) blended toward the logo dot.
			let tx = restX + (dockX - restX) * e;
			let ty = curRestY + (dockY - curRestY) * e;
			const d = restD + (dockD - restD) * e;

			// Lean toward the pointer, fading out as it docks.
			if (hasPointer) {
				const lean = 0.1 * (1 - e);
				tx += clamp((px - tx) * lean, -70, 70);
				ty += clamp((py - ty) * lean, -70, 70);
			} else {
				const s = now / 1000;
				tx += Math.sin(s * 0.7) * 6 * (1 - e);
				ty += Math.cos(s * 0.9) * 8 * (1 - e);
			}

			// Spring toward the target; docking tightens it so it lands cleanly.
			const k = 0.09 + 0.25 * e;
			const damp = 0.72;
			vx = (vx + (tx - x) * k * dt) * damp;
			vy = (vy + (ty - y) * k * dt) * damp;
			x += vx * dt;
			y += vy * dt;

			// Squash and stretch along the velocity, plus a tap "boing".
			squashV = (squashV + (0 - squash) * 0.18 * dt) * 0.8;
			squash += squashV * dt;
			const speed = Math.hypot(vx, vy);
			const st = Math.min(speed * 0.012, 0.28) * (1 - e * 0.8);
			const ang = Math.atan2(vy, vx) * (180 / Math.PI);
			const sx = 1 + st + squash;
			const sy = 1 - st * 0.75 - squash;

			body!.style.width = body!.style.height = `${d}px`;
			body!.style.transform =
				`translate3d(${x - d / 2}px, ${y - d / 2}px, 0) rotate(${ang}deg) ` +
				`scale(${sx.toFixed(4)}, ${sy.toFixed(4)}) rotate(${-ang}deg)`;

			// Eyes: follow pointer (or wander), and close as it docks.
			let gx: number, gy: number;
			if (hasPointer) {
				const dx = px - x,
					dy = py - y;
				const len = Math.hypot(dx, dy) || 1;
				const reach = Math.min(1, len / 260);
				gx = (dx / len) * reach;
				gy = (dy / len) * reach;
			} else {
				gx = wanderX;
				gy = wanderY;
			}
			lookX += (gx - lookX) * 0.2 * dt;
			lookY += (gy - lookY) * 0.2 * dt;
			const pr = d * 0.055;
			for (const pu of pupils) pu.style.translate = `${lookX * pr}px ${lookY * pr}px`;
			eyes!.style.opacity = String(1 - clamp((p - 0.55) / 0.3, 0, 1));

			// Hand over to the real logo dot once docked.
			const docked = p >= 0.999 && Math.abs(x - dockX) < 0.6 && Math.abs(y - dockY) < 0.6;
			body!.style.opacity = docked ? '0' : '1';
			root.classList.toggle('dot-away', !docked);

			const settled = docked && speed < 0.02 && Math.abs(squash) < 0.002;
			raf = settled ? 0 : requestAnimationFrame(frame);
		};
		const wake = () => {
			if (!raf) {
				t0 = performance.now();
				raf = requestAnimationFrame(frame);
			}
		};

		const onMove = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			px = e.clientX;
			py = e.clientY;
			hasPointer = true;
			wake();
		};
		const onLeave = () => {
			hasPointer = false;
		};
		const onResize = () => {
			measure();
			wake();
		};
		const boing = () => {
			squashV += 0.22;
			vy -= 6;
			wake();
		};

		// Blink at random intervals, sometimes twice.
		let blinkTimer = 0;
		const blink = () => {
			lids.forEach((l) => l.classList.add('shut'));
			setTimeout(() => lids.forEach((l) => l.classList.remove('shut')), 130);
			if (Math.random() < 0.25) {
				setTimeout(() => {
					lids.forEach((l) => l.classList.add('shut'));
					setTimeout(() => lids.forEach((l) => l.classList.remove('shut')), 110);
				}, 260);
			}
			blinkTimer = window.setTimeout(blink, 2400 + Math.random() * 3800);
		};
		blinkTimer = window.setTimeout(blink, 1800);

		// Touch devices: eyes look around on their own.
		let wanderTimer = 0;
		const wander = () => {
			const a = Math.random() * Math.PI * 2;
			const r = Math.random() < 0.3 ? 0 : 0.8;
			wanderX = Math.cos(a) * r;
			wanderY = Math.sin(a) * r;
			wake();
			wanderTimer = window.setTimeout(wander, 1600 + Math.random() * 1800);
		};
		if (!fine) wander();

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);
		window.addEventListener('scroll', wake, { passive: true });
		window.addEventListener('resize', onResize);
		body.addEventListener('pointerdown', boing);
		// Fonts and layout can shift the logo; re-measure once everything settles.
		document.fonts?.ready.then(onResize);
		wake();

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(blinkTimer);
			clearTimeout(wanderTimer);
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
			window.removeEventListener('scroll', wake);
			window.removeEventListener('resize', onResize);
			body?.removeEventListener('pointerdown', boing);
			root.classList.remove('dot-away');
		};
	});
</script>

<div class="anchor" bind:this={anchor} aria-hidden="true">
	<div class="dot" class:live bind:this={body} data-cursor="Boop">
		<div class="eyes" bind:this={eyes}>
			<span class="eye"><span class="pupil"></span></span>
			<span class="eye"><span class="pupil"></span></span>
		</div>
	</div>
</div>

<style>
	.anchor {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
	}
	.dot {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--color-paper);
		mix-blend-mode: difference;
		display: grid;
		place-items: center;
		/* Above the headline so the blend inverts the letters it covers. */
		z-index: 2;
	}
	.dot.live {
		position: fixed;
		inset: auto;
		left: 0;
		top: 0;
		z-index: 101;
		will-change: transform;
		cursor: pointer;
		touch-action: manipulation;
	}
	.eyes {
		display: flex;
		gap: 15%;
		width: 46%;
		justify-content: center;
		translate: 0 -6%;
		transition: opacity 0.2s linear;
	}
	.eye {
		position: relative;
		width: 22%;
		aspect-ratio: 1 / 1.35;
		border-radius: 50%;
		background: var(--color-ink);
		display: grid;
		place-items: center;
		transition: scale 0.09s ease-in;
	}
	.eye:global(.shut) {
		scale: 1 0.1;
	}
	.pupil {
		width: 38%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color-paper);
		translate: 0 0;
		margin: -18% 0 0 18%;
	}
</style>
