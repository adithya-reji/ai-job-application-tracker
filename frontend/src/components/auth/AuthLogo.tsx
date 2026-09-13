import { BriefcaseBusiness } from "lucide-react";

interface AuthLogoProps {
    dark?: boolean;
}

export default function AuthLogo({ dark = false }: AuthLogoProps) {
    return (
        <div
            className={`flex items-center gap-3 ${dark ? "text-white" : "text-[#171717]"
                }`}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <BriefcaseBusiness
                    size={21}
                    strokeWidth={2.2}
                    className="text-white"
                />
            </div>

            <span className="text-lg font-semibold tracking-tight">
                JobTrack
            </span>
        </div>
    );
}