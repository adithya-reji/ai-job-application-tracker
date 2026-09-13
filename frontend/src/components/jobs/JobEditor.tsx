import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

import { type Job, type JobEditorMode, type JobFormData } from "../../types/job";
import { JobField } from "./JobField";
import { JobSkillsInput } from "./JobSkillsInput";

interface JobEditorProps {
    job?: Job;
    mode: JobEditorMode;

    onSubmit: (data: JobFormData) => void | Promise<void>;
    onCancel?: () => void;

    loading?: boolean;
}

const emptyForm: JobFormData = {
    company: "",
    title: "",
    location: "",

    employment_type: "",

    experience_min: "",
    experience_max: "",

    salary_min: "",
    salary_max: "",
    currency: "INR",

    required_skills: [],
    preferred_skills: [],

    education: "",
    application_url: "",

    raw_description: "",
};

const employmentTypes = [
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "temporary", label: "Temporary" },
    { value: "other", label: "Other" },
];

export const JobEditor: React.FC<JobEditorProps> = ({
    job,
    mode,
    onSubmit,
    onCancel,
    loading = false,
}) => {
    const [form, setForm] = useState<JobFormData>(emptyForm);

    useEffect(() => {
        if (!job) {
            setForm(emptyForm);
            return;
        }

        setForm({
            company: job.company ?? "",
            title: job.title ?? "",
            location: job.location ?? "",

            employment_type: job.employment_type ?? "",

            experience_min:
                job.experience_min !== null
                    ? String(job.experience_min)
                    : "",

            experience_max:
                job.experience_max !== null
                    ? String(job.experience_max)
                    : "",

            salary_min:
                job.salary_min !== null
                    ? String(job.salary_min)
                    : "",

            salary_max:
                job.salary_max !== null
                    ? String(job.salary_max)
                    : "",

            currency: job.currency ?? "INR",

            required_skills: job.required_skills ?? [],
            preferred_skills: job.preferred_skills ?? [],

            education: job.education ?? "",
            application_url: job.application_url ?? "",

            raw_description: job.raw_description ?? "",
        });
    }, [job]);

    const updateField = (
        field: keyof JobFormData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const updateSkills = (
        field: "required_skills" | "preferred_skills",
        skills: string[]
    ) => {
        setForm((current) => ({
            ...current,
            [field]: skills,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        await onSubmit(form);
    };

    const title =
        mode === "verify"
            ? "Review Job Details"
            : "Edit Job";

    const description =
        mode === "verify"
            ? "Review the extracted information and correct anything that is missing or inaccurate."
            : "Update the job information below.";

    const submitText =
        mode === "verify"
            ? "Verify & Save"
            : "Save Changes";

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl"
        >
            {/* Header */}

            <div className="mb-8">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-600
              transition
              hover:text-gray-900
            "
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                )}

                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    {description}
                </p>
            </div>

            {/* Job Information */}

            <section className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">
                    Job Information
                </h2>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <JobField
                        label="Company"
                        name="company"
                        value={form.company}
                        onChange={(event) =>
                            updateField("company", event.target.value)
                        }
                        placeholder="e.g. TechNova Technologies"
                        required
                        disabled={loading}
                    />

                    <JobField
                        label="Role"
                        name="title"
                        value={form.title}
                        onChange={(event) =>
                            updateField("title", event.target.value)
                        }
                        placeholder="e.g. Junior Backend Developer"
                        required
                        disabled={loading}
                    />

                    <JobField
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={(event) =>
                            updateField("location", event.target.value)
                        }
                        placeholder="e.g. Bangalore"
                        disabled={loading}
                    />

                    {/* Employment Type */}

                    <div className="space-y-1.5">
                        <label
                            htmlFor="employment_type"
                            className="block text-sm font-medium text-gray-800"
                        >
                            Employment Type
                        </label>

                        <select
                            id="employment_type"
                            value={form.employment_type}
                            onChange={(event) =>
                                updateField(
                                    "employment_type",
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2.5
                text-sm
                text-gray-900
                outline-none
                focus:border-gray-700
              "
                        >
                            <option value="">Select employment type</option>

                            {employmentTypes.map((type) => (
                                <option
                                    key={type.value}
                                    value={type.value}
                                >
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Experience & Salary */}

            <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">
                    Experience & Salary
                </h2>

                <div className="mt-5">
                    <p className="mb-3 text-sm font-medium text-gray-800">
                        Experience
                    </p>

                    <div className="grid gap-5 md:grid-cols-2">
                        <JobField
                            label="Minimum Experience"
                            name="experience_min"
                            type="number"
                            value={form.experience_min}
                            onChange={(event) =>
                                updateField(
                                    "experience_min",
                                    event.target.value
                                )
                            }
                            placeholder="e.g. 0"
                            disabled={loading}
                        />

                        <JobField
                            label="Maximum Experience"
                            name="experience_max"
                            type="number"
                            value={form.experience_max}
                            onChange={(event) =>
                                updateField(
                                    "experience_max",
                                    event.target.value
                                )
                            }
                            placeholder="e.g. 2"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <p className="mb-3 text-sm font-medium text-gray-800">
                        Salary
                    </p>

                    <div className="grid gap-5 md:grid-cols-3">
                        <JobField
                            label="Minimum Salary"
                            name="salary_min"
                            type="number"
                            value={form.salary_min}
                            onChange={(event) =>
                                updateField(
                                    "salary_min",
                                    event.target.value
                                )
                            }
                            placeholder="e.g. 400000"
                            disabled={loading}
                        />

                        <JobField
                            label="Maximum Salary"
                            name="salary_max"
                            type="number"
                            value={form.salary_max}
                            onChange={(event) =>
                                updateField(
                                    "salary_max",
                                    event.target.value
                                )
                            }
                            placeholder="e.g. 700000"
                            disabled={loading}
                        />

                        <JobField
                            label="Currency"
                            name="currency"
                            value={form.currency}
                            onChange={(event) =>
                                updateField(
                                    "currency",
                                    event.target.value
                                )
                            }
                            placeholder="INR"
                            disabled={loading}
                        />
                    </div>
                </div>
            </section>

            {/* Skills */}

            <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">
                    Skills
                </h2>

                <div className="mt-5 space-y-7">
                    <JobSkillsInput
                        label="Required Skills"
                        skills={form.required_skills}
                        onChange={(skills) =>
                            updateSkills("required_skills", skills)
                        }
                        placeholder="e.g. Python"
                        hint="Skills explicitly required for the role."
                        disabled={loading}
                    />

                    <JobSkillsInput
                        label="Preferred Skills"
                        skills={form.preferred_skills}
                        onChange={(skills) =>
                            updateSkills("preferred_skills", skills)
                        }
                        placeholder="e.g. Docker"
                        hint="Skills listed as preferred, nice-to-have, or optional."
                        disabled={loading}
                    />
                </div>
            </section>

            {/* Additional Information */}

            <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">
                    Additional Information
                </h2>

                <div className="mt-5 space-y-5">
                    <JobField
                        label="Education"
                        name="education"
                        value={form.education}
                        onChange={(event) =>
                            updateField(
                                "education",
                                event.target.value
                            )
                        }
                        placeholder="e.g. Bachelor's degree in Computer Science"
                        disabled={loading}
                    />

                    <JobField
                        label="Application URL"
                        name="application_url"
                        type="url"
                        value={form.application_url}
                        onChange={(event) =>
                            updateField(
                                "application_url",
                                event.target.value
                            )
                        }
                        placeholder="https://example.com/apply"
                        disabled={loading}
                    />
                </div>
            </section>

            {/* Original Description */}

            <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">
                    Original Job Description
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    This is the original description submitted when the
                    job was added.
                </p>

                <div className="mt-4">
                    <JobField
                        label=""
                        name="raw_description"
                        type="textarea"
                        value={form.raw_description}
                        onChange={(event) =>
                            updateField(
                                "raw_description",
                                event.target.value
                            )
                        }
                        disabled
                        rows={10}
                    />
                </div>
            </section>

            {/* Actions */}

            <div className="mt-6 flex justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-gray-900
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-gray-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    <Save size={16} />

                    {loading ? "Saving..." : submitText}
                </button>
            </div>
        </form>
    );
};