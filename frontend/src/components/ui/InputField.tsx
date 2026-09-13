import type { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: ReactNode;
}

export default function InputField({
    label,
    icon,
    ...props
}: InputFieldProps) {
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
                    {icon}
                </div>

                <input
                    id={props.name}
                    {...props}
                    className="h-12 w-full rounded-xl border border-[#dedede] bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-[#aaa] hover:border-[#c8c8c8] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
            </div>
        </div>
    );
}