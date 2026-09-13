import { Plus, Settings2 } from "lucide-react";

interface DashboardHeaderProps {
    onAddJob: () => void;
    onUpdateSkills: () => void;
}

export default function DashboardHeader({
    onAddJob,
    onUpdateSkills,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Job Applications
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Track and manage your job applications.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onUpdateSkills}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <Settings2 size={16} />
                    Update skills
                </button>

                <button
                    type="button"
                    onClick={onAddJob}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Plus size={16} />
                    Add job
                </button>
            </div>
        </div>
    );
}