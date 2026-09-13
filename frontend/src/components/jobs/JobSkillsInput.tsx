import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface JobSkillsInputProps {
    label: string;
    skills: string[];
    onChange: (skills: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    hint?: string;
}

export const JobSkillsInput: React.FC<JobSkillsInputProps> = ({
    label,
    skills,
    onChange,
    placeholder = "Add a skill",
    disabled = false,
    hint,
}) => {
    const [input, setInput] = useState("");

    const addSkill = () => {
        const skill = input.trim();

        if (!skill) {
            return;
        }

        const alreadyExists = skills.some(
            (existingSkill) =>
                existingSkill.toLowerCase() === skill.toLowerCase()
        );

        if (alreadyExists) {
            setInput("");
            return;
        }

        onChange([...skills, skill]);
        setInput("");
    };

    const removeSkill = (skillToRemove: string) => {
        onChange(
            skills.filter((skill) => skill !== skillToRemove)
        );
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
                {label}
            </label>

            {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="
                inline-flex
                items-center
                gap-1.5
                rounded-md
                border
                border-gray-300
                bg-gray-50
                px-2.5
                py-1.5
                text-sm
                text-gray-800
              "
                        >
                            {skill}

                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="text-gray-400 transition hover:text-gray-800"
                                    aria-label={`Remove ${skill}`}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </span>
                    ))}
                </div>
            )}

            {!disabled && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="
              min-w-0
              flex-1
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              py-2.5
              text-sm
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-gray-700
            "
                    />

                    <button
                        type="button"
                        onClick={addSkill}
                        className="
              inline-flex
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
            "
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            )}

            {hint && (
                <p className="text-xs text-gray-500">
                    {hint}
                </p>
            )}
        </div>
    );
};