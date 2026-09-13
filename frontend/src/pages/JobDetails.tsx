import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ExternalLink,
    Loader2,
    Pencil,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../services/api";
import { Job } from "../types/job";

const employmentTypeLabels: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
    temporary: "Temporary",
    other: "Other",
};

const applicationStatusLabels: Record<string, string> = {
    SAVED: "Saved",
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
    WITHDRAWN: "Withdrawn",
};

const JobDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
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

    const experience =
        job.experience_min !== null ||
            job.experience_max !== null
            ? `${job.experience_min ?? 0}–${job.experience_max ?? "+"} years`
            : "Not specified";

    const salary =
        job.salary_min !== null ||
            job.salary_max !== null
            ? `${job.currency ?? ""} ${job.salary_min?.toLocaleString() ?? "—"
            } – ${job.salary_max?.toLocaleString() ?? "—"
            }`
            : "Not specified";

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto w-full max-w-4xl">
                {/* Back */}

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="
            mb-6
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
                    Back to applications
                </button>

                {/* Header */}

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {job.title}
                            </h1>

                            <p className="mt-1 text-base text-gray-600">
                                {job.company}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {job.location || "Location not specified"}
                                {job.employment_type && (
                                    <>
                                        {" "}
                                        ·{" "}
                                        {
                                            employmentTypeLabels[
                                            job.employment_type
                                            ]
                                        }
                                    </>
                                )}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/jobs/${job.id}/edit`)
                            }
                            className="
                inline-flex
                items-center
                justify-center
                gap-2
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
                            <Pencil size={15} />
                            Edit Job
                        </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <span
                            className="
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-xs
                font-medium
                text-gray-700
              "
                        >
                            {
                                applicationStatusLabels[
                                job.application_status
                                ]
                            }
                        </span>

                        {job.verification_status === "VERIFIED" ? (
                            <span
                                className="
                  rounded-full
                  bg-green-50
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                "
                            >
                                Verified
                            </span>
                        ) : (
                            <span
                                className="
                  rounded-full
                  bg-yellow-50
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-yellow-700
                "
                            >
                                Needs verification
                            </span>
                        )}
                    </div>
                </div>

                {/* Application */}

                <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="text-base font-semibold text-gray-900">
                        Application
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Applied
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {job.applied_date
                                    ? new Date(
                                        job.applied_date
                                    ).toLocaleDateString()
                                    : "Not applied"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Status
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {
                                    applicationStatusLabels[
                                    job.application_status
                                    ]
                                }
                            </p>
                        </div>
                    </div>

                    {job.application_url && (
                        <a
                            href={job.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-800
                underline
                underline-offset-4
                hover:text-black
              "
                        >
                            Open application
                            <ExternalLink size={14} />
                        </a>
                    )}
                </section>

                {/* Job Details */}

                <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="text-base font-semibold text-gray-900">
                        Job Details
                    </h2>

                    <div className="mt-5 grid gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Experience
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {experience}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Salary
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {salary}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Employment
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {job.employment_type
                                    ? employmentTypeLabels[
                                    job.employment_type
                                    ]
                                    : "Not specified"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Skills */}

                <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="text-base font-semibold text-gray-900">
                        Skills
                    </h2>

                    <div className="mt-5">
                        <h3 className="text-sm font-medium text-gray-800">
                            Required Skills
                        </h3>

                        {job.required_skills.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.required_skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="
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
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-gray-500">
                                None specified.
                            </p>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-800">
                            Preferred Skills
                        </h3>

                        {job.preferred_skills.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.preferred_skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="
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
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-gray-500">
                                None specified.
                            </p>
                        )}
                    </div>
                </section>

                {/* Education */}

                {job.education && (
                    <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="text-base font-semibold text-gray-900">
                            Education
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-700">
                            {job.education}
                        </p>
                    </section>
                )}

                {/* Raw Description */}

                <section className="mt-5 rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="text-base font-semibold text-gray-900">
                        Job Description
                    </h2>

                    <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-700">
                        {job.raw_description}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default JobDetails;