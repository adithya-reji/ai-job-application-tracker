import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import api from "../services/api";
import { JobField } from "../components/jobs/JobField";
import { JobSkillsInput } from "../components/jobs/JobSkillsInput";

interface ProfileData {
    id: number;
    name: string | null;
    location: string | null;
    experience_years: number | null;
    education: string | null;
    skills: string[];
    created_at: string;
    updated_at: string;
}

interface ProfileFormData {
    name: string;
    location: string;
    experience_years: string;
    education: string;
    skills: string[];
}

export default function Profile() {
    const navigate = useNavigate();

    const [form, setForm] = useState<ProfileFormData>({
        name: "",
        location: "",
        experience_years: "",
        education: "",
        skills: [],
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get<ProfileData>("/profile");

                const profile = response.data;

                setForm({
                    name: profile.name ?? "",
                    location: profile.location ?? "",
                    experience_years:
                        profile.experience_years?.toString() ?? "",
                    education: profile.education ?? "",
                    skills: profile.skills ?? [],
                });
            } catch (err: any) {
                console.error("Failed to load profile:", err);

                setError(
                    err?.response?.data?.detail ||
                    "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSuccess("");
    };

    const handleSkillsChange = (skills: string[]) => {
        setForm((previous) => ({
            ...previous,
            skills,
        }));

        setSuccess("");
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        const experience =
            form.experience_years.trim() === ""
                ? null
                : Number(form.experience_years);

        if (
            experience !== null &&
            (!Number.isInteger(experience) || experience < 0)
        ) {
            setError(
                "Experience must be a whole number greater than or equal to 0."
            );
            setSaving(false);
            return;
        }

        try {
            await api.patch("/profile", {
                name: form.name.trim() || null,
                location: form.location.trim() || null,
                experience_years: experience,
                education: form.education.trim() || null,
                skills: form.skills,
            });

            setSuccess("Profile updated successfully.");
        } catch (err: any) {
            console.error("Failed to update profile:", err);

            setError(
                err?.response?.data?.detail ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <p className="text-sm text-gray-500">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-300
                            bg-white
                            p-2
                            text-gray-600
                            transition
                            hover:bg-gray-50
                            hover:text-gray-900
                        "
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Profile
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your information and skills.
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                {/* Profile form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-6"
                >
                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Basic Information
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Keep this information up to date for job matching.
                            </p>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <JobField
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                            />

                            <JobField
                                label="Location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Kochi, Kerala"
                            />

                            <JobField
                                label="Experience"
                                name="experience_years"
                                type="number"
                                value={form.experience_years}
                                onChange={handleChange}
                                placeholder="0"
                                hint="Enter 0 if you are a fresher."
                            />

                            <JobField
                                label="Education"
                                name="education"
                                value={form.education}
                                onChange={handleChange}
                                placeholder="e.g. BCA"
                            />
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Skills
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Add the skills you currently have. These will be
                                used for job matching.
                            </p>
                        </div>

                        <div className="mt-5">
                            <JobSkillsInput
                                label="Your Skills"
                                skills={form.skills}
                                onChange={handleSkillsChange}
                                placeholder="e.g. Python"
                            />
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
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
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-gray-900
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-gray-800
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            <Save size={16} />

                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}