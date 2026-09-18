import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import JobTable, { type Job } from "../components/dashboard/JobTable";
import AddApplicationModal from "../components/dashboard/AddApplicationModal";
import api from '../services/api';

export default function Dashboard() {
    const navigate = useNavigate()

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get("/jobs");
                setJobs(response.data);
            } catch (error) {
                console.error("Failed to fetch job:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const stats = useMemo(() => {
        const total = jobs.length;
        // Use application_status to match backend
        const active = jobs.filter(
            (job) => job.application_status === "Applied" || job.application_status === "Interview"
        ).length;
        const interviews = jobs.filter((job) => job.application_status === "Interview").length;

        return { total, active, interviews };
    }, [jobs]);

    const handleAddJob = () => {
        setIsAddModalOpen(true);
    };

    const handleApplicationSubmit = async (rawDetails: string) => {
        try {
            const response = await api.post("/jobs/extract", {
                raw_data: rawDetails
            });

            setIsAddModalOpen(false);

            navigate(`/jobs/${response.data.id}/edit`);
        } catch (error) {
            console.error("Failed to extract job details:", error);
            alert("Something went wrong analyzing the description.");
        }
    };

    const handleLogout = () => {
        // Clear the JWT token
        localStorage.removeItem("token");
        // Redirect to the login page
        navigate("/auth");
    };

    const handleUpdateProfile = () => {
        navigate("/profile")
    };

    const handleView = (job: Job) => {
        navigate(`/jobs/${job.id}`);
    };

    const handleEdit = (job: Job) => {
        navigate(`/jobs/${job.id}/edit`);
    };

    const handleDelete = async (job: Job) => {
        const confirmed = window.confirm(`Delete application for ${job.company}?`);
        if (!confirmed) return;

        try {
            await api.delete(`/jobs/${job.id}`);
            setJobs((previous) => previous.filter((item) => item.id !== job.id));
        } catch (error) {
            console.error("Failed to delete job", error);
            alert("Failed to delete the application. Please try again.");
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading your applications...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <DashboardHeader
                    onAddJob={handleAddJob}
                    onUpdateProfile={handleUpdateProfile}
                    onLogout={handleLogout}
                />

                <div className="mt-8">
                    <DashboardStats total={stats.total} active={stats.active} interviews={stats.interviews} />
                </div>

                <div className="mt-6">
                    {/* Empty State for brand new users */}
                    {jobs.length === 0 && search === "" ? (
                        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
                            <p className="mt-2 text-sm text-gray-500">Get started by adding your first job application.</p>
                            <button
                                onClick={handleAddJob}
                                className="mt-4 inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                Add Application
                            </button>
                        </div>
                    ) : (
                        <JobTable
                            jobs={jobs}
                            search={search}
                            onSearchChange={setSearch}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <AddApplicationModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleApplicationSubmit}
            />
        </main>
    );
}