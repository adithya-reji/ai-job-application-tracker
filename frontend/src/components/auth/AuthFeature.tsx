import type { ReactNode } from "react";

interface AuthFeatureProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function AuthFeature({
    icon,
    title,
    description,
}: AuthFeatureProps) {
    return (
        <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-violet-300">
                {icon}
            </div>

            <div>
                <h3 className="text-sm font-medium text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-white/40">
                    {description}
                </p>
            </div>
        </div>
    );
}