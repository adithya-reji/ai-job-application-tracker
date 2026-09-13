import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

interface PasswordFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    visible: boolean;
    onToggle: () => void;
}

export default function PasswordField({
    label,
    visible,
    onToggle,
    ...props
}: PasswordFieldProps) {
    return (
        <div>
            <label
                htmlFor={props.name}
                className="mb-2 block text-sm font-medium text-[#404040]"
            >
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#999]">
                    <LockKeyhole size={18} />
                </div>

                <input
                    id={props.name}
                    {...props}
                    type={visible ? "text" : "password"}
                    className="h-12 w-full rounded-xl border border-[#dedede] bg-white pl-11 pr-11 text-sm outline-none transition placeholder:text-[#aaa] hover:border-[#c8c8c8] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#999] transition hover:text-[#555]"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>
        </div>
    );
}