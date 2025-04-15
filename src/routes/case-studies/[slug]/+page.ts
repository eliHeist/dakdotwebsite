export const load = async ({ params }) => {
    const { slug } = params;
    try {
        const module = await import(`$lib/data/projects/${slug}.ts`);
        return { project: module.default };
    } catch (error) {
        throw new Error("Project not found");
    }
};
