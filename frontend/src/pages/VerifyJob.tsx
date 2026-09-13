import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../services/api";
import { Job, JobFormData } from "../types/job";
import { JobEditor } from "../components/jobs/JobEditor";

const VerifyJob: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            if (!id) {
                setError("Invalid job ID.");
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/jobs/${id}`);

                setJob(response.data);
            } catch (err: any) {
                const message =
                    err?.response?.data?.detail ||
                    "Unable to load the job.";

                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleVerify = async (data: JobFormData) => {
        if (!id) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            await api.patch(`/jobs/${id}`, {
                company: data.company,
                title: data.title,
                location: data.location,

                employment_type:
                    data.employment_type || null,

                experience_min:
                    data.experience_min !== ""
                        ? Number(data.experience_min)
                        : null,

                experience_max:
                    data.experience_max !== ""
                        ? Number(data.experience_max)
                        : null,

                salary_min:
                    data.salary_min !== ""
                        ? Number(data.salary_min)
                        : null,

                salary_max:
                    data.salary_max !== ""
                        ? Number(data.salary_max)
                        : null,

                currency: data.currency || null,

                required_skills: data.required_skills,
                preferred_skills: data.preferred_skills,

                education: data.education || null,
                application_url:
                    data.application_url || null,

                verification_status: "VERIFIED",
            });

            navigate("/dashboard");
        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                "Unable to verify the job.";

            setError(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Loader2
                    size={24}
                    className="animate-spin text-gray-600"
                />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6">
                    <h1 className="text-lg font-semibold text-gray-900">
                        Unable to load job
                    </h1>

                    <p className="mt-2 text-sm text-red-600">
                        {error || "Job not found."}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
              mt-5
              rounded-lg
              bg-gray-900
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
            "
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            {error && (
                <div className="mx-auto mb-5 max-w-4xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <JobEditor
                job={job}
                mode="verify"
                onSubmit={handleVerify}
                onCancel={() => navigate("/dashboard")}
                loading={saving}
            />
        </div>
    );
};

export default VerifyJob;