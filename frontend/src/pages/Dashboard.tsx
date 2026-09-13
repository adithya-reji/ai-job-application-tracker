import { useMemo, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import JobTable, {
    type Job,
} from "../components/dashboard/JobTable";

const initialJobs: Job[] = [
    {
        id: 1,
        company: "TechNova",
        role: "Junior Backend Developer",
        location: "Bangalore",
        status: "Applied",
        skillMatch: 82,
        appliedDate: "Sep 12, 2026",
    },
    {
        id: 2,
        company: "CloudStack",
        role: "Python Developer",
        location: "Kochi",
        status: "Interview",
        skillMatch: 76,
        appliedDate: "Sep 10, 2026",
    },
    {
        id: 3,
        company: "DevWorks",
        role: "Software Engineer",
        location: "Chennai",
        status: "Applied",
        skillMatch: 68,
        appliedDate: "Sep 8, 2026",
    },
    {
        id: 4,
        company: "DataBridge",
        role: "Backend Engineer",
        location: "Remote",
        status: "Rejected",
        skillMatch: 61,
        appliedDate: "Sep 4, 2026",
    },
];

export default function Dashboard() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [search, setSearch] = useState("");

    const stats = useMemo(() => {
        const total = jobs.length;

        const active = jobs.filter(
            (job) =>
                job.status === "Applied" ||
                job.status === "Interview"
        ).length;

        const interviews = jobs.filter(
            (job) => job.status === "Interview"
        ).length;

        return {
            total,
            active,
            interviews,
        };
    }, [jobs]);

    const handleAddJob = () => {
        console.log("Open Add Job form");
    };

    const handleUpdateSkills = () => {
        console.log("Open Update Skills form");
    };

    const handleView = (job: Job) => {
        console.log("View job:", job);
    };

    const handleEdit = (job: Job) => {
        console.log("Edit job:", job);
    };

    const handleDelete = (job: Job) => {
        const confirmed = window.confirm(
            `Delete application for ${job.company}?`
        );

        if (!confirmed) {
            return;
        }

        setJobs((previous) =>
            previous.filter(
                (item) => item.id !== job.id
            )
        );
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <DashboardHeader
                    onAddJob={handleAddJob}
                    onUpdateSkills={handleUpdateSkills}
                />

                <div className="mt-8">
                    <DashboardStats
                        total={stats.total}
                        active={stats.active}
                        interviews={stats.interviews}
                    />
                </div>

                <div className="mt-6">
                    <JobTable
                        jobs={jobs}
                        search={search}
                        onSearchChange={setSearch}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>
        </main>
    );
}