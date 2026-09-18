import { useState } from "react";
import { MoreHorizontal, Eye, Pencil, Trash2, Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import JobStatusBadge from "./JobStatusBadge";
import SkillMatchBadge from "./SkillMatchBadge";

export interface Job {
    id: number;
    company: string;
    title: string;
    location: string;
    application_status: string;
    skill_match: number;
    created_at: string;
}

interface JobTableProps {
    jobs: Job[];
    search: string;
    onSearchChange: (value: string) => void;
    onView: (job: Job) => void;
    onEdit: (job: Job) => void;
    onDelete: (job: Job) => void;
}

export default function JobTable({
    jobs,
    search,
    onSearchChange,
    onView,
    onEdit,
    onDelete,
}: JobTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredJobs = jobs.filter((job) => {
        const query = search.toLowerCase();
        return (
            (job.company?.toLowerCase() || "").includes(query) ||
            (job.title?.toLowerCase() || "").includes(query) ||
            (job.location?.toLowerCase() || "").includes(query) ||
            (job.application_status?.toLowerCase() || "").includes(query)
        );
    });

    // Calculate Pagination variables
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 if the user types in the search box
    const handleSearch = (val: string) => {
        onSearchChange(val);
        setCurrentPage(1);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Table header */}
            <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-semibold text-gray-900">Applications</h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                        {filteredJobs.length} application{filteredJobs.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search applications..."
                        className="h-9 w-full rounded-lg border border-gray-300 pl-9 pr-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1"
                    />
                </div>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Company</th>
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Title</th>
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Location</th>
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Skill match</th>
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">Applied</th>
                            <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {paginatedJobs.map((job) => (
                            <tr key={job.id} className="transition hover:bg-gray-50">
                                <td className="px-5 py-4 font-medium text-gray-900">{job.company}</td>
                                <td className="px-5 py-4 text-sm text-gray-700">{job.title}</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <MapPin size={14} />{job.location}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <JobStatusBadge status={job.application_status} />
                                </td>
                                <td className="px-5 py-4">
                                    <SkillMatchBadge percentage={job.skill_match} />
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-500">
                                    {new Date(job.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-1">
                                        <ActionButton label="View" onClick={() => onView(job)}>
                                            <Eye size={16} />
                                        </ActionButton>
                                        <ActionButton label="Edit" onClick={() => onEdit(job)}>
                                            <Pencil size={16} />
                                        </ActionButton>
                                        <ActionButton label="Delete" danger onClick={() => onDelete(job)}>
                                            <Trash2 size={16} />
                                        </ActionButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile list */}
            <div className="divide-y divide-gray-100 md:hidden">
                {/* FIXED: Map over paginatedJobs, not filteredJobs */}
                {paginatedJobs.map((job) => (
                    <div key={job.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-medium text-gray-900">{job.company}</h3>
                                {/* FIXED: job.role -> job.title */}
                                <p className="mt-0.5 text-sm text-gray-600">{job.title}</p>
                                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                                    <MapPin size={13} />{job.location}
                                </div>
                            </div>
                            <button type="button" className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* FIXED: job.status -> job.application_status */}
                                <JobStatusBadge status={job.application_status} />
                                {/* FIXED: job.skillMatch -> job.skill_match */}
                                <SkillMatchBadge percentage={job.skill_match} />
                            </div>
                            {/* FIXED: job.appliedDate -> formatted created_at */}
                            <span className="text-xs text-gray-500">
                                {new Date(job.created_at).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button type="button" onClick={() => onView(job)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Eye size={15} /> View
                            </button>
                            <button type="button" onClick={() => onEdit(job)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Pencil size={15} /> Edit
                            </button>
                            <button type="button" onClick={() => onDelete(job)} className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty Search Results State */}
                {filteredJobs.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <p className="text-sm font-medium text-gray-900">No applications found</p>
                        <p className="mt-1 text-sm text-gray-500">Try a different search term.</p>
                    </div>
                )}
            </div>

            {/* FIXED: Re-added Pagination Controls Footer */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                        <span className="font-medium">
                            {Math.min(startIndex + itemsPerPage, filteredJobs.length)}
                        </span>{" "}
                        of <span className="font-medium">{filteredJobs.length}</span> results
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 text-gray-500 disabled:opacity-50 hover:bg-gray-200 rounded transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1 text-gray-500 disabled:opacity-50 hover:bg-gray-200 rounded transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ActionButtonProps {
    children: React.ReactNode;
    label: string;
    danger?: boolean;
    onClick: () => void;
}

function ActionButton({
    children,
    label,
    danger = false,
    onClick,
}: ActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            aria-label={label}
            className={`rounded-md p-2 transition ${danger
                ? "text-gray-400 hover:bg-red-50 hover:text-red-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                }`}
        >
            {children}
        </button>
    );
}