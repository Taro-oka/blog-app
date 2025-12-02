import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
    className?: string;
    contentClassName?: string;
}>;

export default function Card({ children, className = "", contentClassName = "" }: CardProps) {
    return (
        <div className={`overflow-hidden bg-white shadow-sm sm:rounded-lg ${className}`}>
            <div className={`p-6 text-gray-900 ${contentClassName}`}>{children}</div>
        </div>
    );
}
