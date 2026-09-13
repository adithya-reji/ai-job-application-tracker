import type { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
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
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    id={props.name}
                    {...props}
                    className={`h-11 w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 ${icon ? "pl-10" : "px-3.5"
                        }`}
                />
            </div>
        </div>
    );
}