interface SectionHeaderProps {
    title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
    return <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>;
}
