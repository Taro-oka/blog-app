import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
    className?: string;
    contentClassName?: string;
    as?: keyof JSX.IntrinsicElements;
}>;

export default function Card({
    children,
    className = "",
    contentClassName = "",
    as: Component = "div",
}: CardProps) {
    return (
        <Component className={`overflow-hidden bg-white shadow-sm sm:rounded-lg ${className}`}>
            <div className={`p-6 text-gray-900 ${contentClassName}`}>{children}</div>
        </Component>
    );
}
