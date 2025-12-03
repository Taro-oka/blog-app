import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect
                x="10"
                y="10"
                width="44"
                height="44"
                rx="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
            />
            <circle cx="24" cy="24" r="7" fill="currentColor" />
            <path d="M40 32 L52 48 H28 Z" fill="currentColor" opacity="0.85" />
        </svg>
    );
}
