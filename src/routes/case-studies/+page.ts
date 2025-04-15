export const load = async () => {
    const modules = import.meta.glob("$lib/data/projects/*.ts");
    const projects = await Promise.all(
        Object.entries(modules).map(async ([path, resolver]) => {
            const mod:any = await resolver();
            return mod.default;
        })
    );

    return { projects };
};
