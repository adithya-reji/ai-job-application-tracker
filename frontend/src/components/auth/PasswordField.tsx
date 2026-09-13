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
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <LockKeyhole size={17} />
                </div>

                <input
                    id={props.name}
                    {...props}
                    type={visible ? "text" : "password"}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? (
                        <EyeOff size={17} />
                    ) : (
                        <Eye size={17} />
                    )}
                </button>
            </div>
        </div>
    );
}