/** `frames('d-home', 3)` → ['d-home-01.jpg', 'd-home-02.jpg', 'd-home-03.jpg'] */
export const frames = (prefix: string, count: number) =>
	Array.from({ length: count }, (_, i) => `${prefix}-${String(i + 1).padStart(2, '0')}.jpg`);
