import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

import api from "../services/api";
import { JobField } from "../components/jobs/JobField";
import { JobSkillsInput } from "../components/jobs/JobSkillsInput";

interface JobFormData {
    title: string;
    company: string;
    location: string;
    job_url: string;
    application_status: string;
    required_skills: string[];
}

export default function JobEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<JobFormData>({
        title: "",
        company: "",
        location: "",
        job_url: "",
        application_status: "Saved",
        required_skills: [],
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Fetch the specific job data on mount
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                const job = response.data;

                setForm({
                    title: job.title ?? "",
                    company: job.company ?? "",
                    location: job.location ?? "",
                    job_url: job.job_url ?? "",
                    application_status: job.application_status ?? "Saved",
                    required_skills: job.required_skills ?? [],
                });
            } catch (err: any) {
                console.error("Failed to load job:", err);
                setError("Failed to load job details. It may have been deleted.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchJob();
    }, [id]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (skills: string[]) => {
        setForm((prev) => ({ ...prev, required_skills: skills }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            await api.patch(`/jobs/${id}`, {
                title: form.title.trim() || null,
                company: form.company.trim() || null,
                location: form.location.trim() || null,
                job_url: form.job_url.trim() || null,
                application_status: form.application_status,
                required_skills: form.required_skills,
                verification_status: "Verified",
            });

            navigate(`/jobs/${id}`);
        } catch (err: any) {
            console.error("Failed to update job:", err);
            setError("Failed to save changes. Please try again.");
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading job details...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Review Application</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Verify the extracted details below and make any necessary corrections.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-5">
                            <h2 className="text-base font-semibold text-gray-900">Job Information</h2>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <JobField
                                label="Company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                placeholder="e.g. Google"
                            />
                            <JobField
                                label="Job Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                            />
                            <JobField
                                label="Location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Remote, or Kochi"
                            />
                            <JobField
                                label="Job URL"
                                name="job_url"
                                value={form.job_url}
                                onChange={handleChange}
                                placeholder="https://..."
                            />

                            {/* Dropdown for Status */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="application_status"
                                    value={form.application_status}
                                    onChange={handleChange}
                                    className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                >
                                    <option value="Saved">Saved</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-5">
                            <h2 className="text-base font-semibold text-gray-900">Required Skills</h2>
                        </div>
                        <JobSkillsInput
                            label="Extracted Skills"
                            skills={form.required_skills}
                            onChange={handleSkillsChange}
                            placeholder="Add a missing skill..."
                        />
                    </section>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
                        >
                            <CheckCircle size={16} />
                            {saving ? "Saving..." : "Verify & Save"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}