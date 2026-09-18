import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin, Sparkles, Building2, Calendar } from "lucide-react";
import Markdown from "react-markdown";

import api from "../services/api";
import JobStatusBadge from "../components/dashboard/JobStatusBadge";
import SkillMatchBadge from "../components/dashboard/SkillMatchBadge";
import type { Job } from "../components/dashboard/JobTable";

export default function JobView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Extend the base Job interface slightly for the view page
    const [job, setJob] = useState<Job & { job_url?: string; raw_description?: string; required_skills?: string[] } | null>(null);
    const [loading, setLoading] = useState(true);

    // AI Analysis State
    const [aiAnalysis, setAiAnalysis] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiError, setAiError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                setJob(response.data);
            } catch (err) {
                console.error("Failed to load job:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchJob();
    }, [id]);

    const handleRunAnalysis = async () => {
        setIsAnalyzing(true);
        setAiError("");
        try {
            const response = await api.get(`/jobs/${id}/analyze`);
            setAiAnalysis(response.data.analysis);
        } catch (err: any) {
            console.error("Failed to run analysis:", err);
            setAiError(err.response?.data?.detail || "Failed to generate analysis.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (loading || !job) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading application details...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Building2 size={16} /> {job.company}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={16} /> {job.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={16} /> {new Date(job.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <JobStatusBadge status={job.application_status} />
                        <SkillMatchBadge percentage={job.skill_match} />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Left Column: Job Details */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Skills */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h2 className="font-semibold text-gray-900">Required Skills</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {job.required_skills?.map((skill, index) => (
                                    <span key={index} className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                        {skill}
                                    </span>
                                ))}
                                {(!job.required_skills || job.required_skills.length === 0) && (
                                    <span className="text-sm text-gray-500">No skills extracted.</span>
                                )}
                            </div>
                        </div>

                        {/* Raw Description */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h2 className="font-semibold text-gray-900">Job Description</h2>
                            <div className="mt-4 max-h-[500px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-100">
                                {job.raw_description || "No description provided."}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI Analysis & Actions */}
                    <div className="space-y-6 lg:col-span-1">

                        {/* Action Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
                            <button
                                onClick={() => navigate(`/jobs/${job.id}/edit`)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Edit Details
                            </button>
                            {job.job_url && (
                                <a
                                    href={job.job_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    View Original Post <ExternalLink size={16} />
                                </a>
                            )}
                        </div>

                        {/* AI Match Card */}
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-indigo-600" size={20} />
                                <h2 className="font-semibold text-indigo-900">AI Profile Match</h2>
                            </div>

                            <p className="mt-2 text-sm text-indigo-700/80">
                                Compare your profile to this job description to get tailored interview advice and gap analysis.
                            </p>

                            {!aiAnalysis && !isAnalyzing && (
                                <button
                                    onClick={handleRunAnalysis}
                                    className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                >
                                    Run Analysis
                                </button>
                            )}

                            {isAnalyzing && (
                                <div className="mt-4 flex items-center justify-center gap-2 py-4 text-sm font-medium text-indigo-600 animate-pulse">
                                    <Sparkles size={16} /> Analyzing profile fit...
                                </div>
                            )}

                            {aiError && (
                                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                                    {aiError}
                                </div>
                            )}
                        </div>

                        {/* AI Analysis Result */}
                        {aiAnalysis && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm prose prose-sm max-w-none prose-indigo">
                                <Markdown>{aiAnalysis}</Markdown>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}