import React from "react";

interface JobFieldProps {
    label: string;
    name?: string;
    value?: string | number;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder?: string;
    type?: "text" | "number" | "url" | "textarea";
    required?: boolean;
    disabled?: boolean;
    error?: string;
    hint?: string;
    rows?: number;
}

export const JobField: React.FC<JobFieldProps> = ({
    label,
    name,
    value = "",
    onChange,
    placeholder,
    type = "text",
    required = false,
    disabled = false,
    error,
    hint,
    rows = 4,
}) => {
    const baseClasses = `
    w-full
    rounded-lg
    border
    bg-white
    px-3
    py-2.5
    text-sm
    text-gray-900
    outline-none
    transition
    placeholder:text-gray-400
    disabled:cursor-not-allowed
    disabled:bg-gray-100
  `;

    const borderClasses = error
        ? "border-red-400 focus:border-red-500"
        : "border-gray-300 focus:border-gray-700";

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-800"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    className={`${baseClasses} ${borderClasses} resize-y`}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`${baseClasses} ${borderClasses}`}
                />
            )}

            {hint && !error && (
                <p className="text-xs text-gray-500">
                    {hint}
                </p>
            )}

            {error && (
                <p className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};