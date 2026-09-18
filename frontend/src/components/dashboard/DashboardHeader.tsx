import { Plus, User, LogOut } from "lucide-react"; // Added LogOut icon

interface DashboardHeaderProps {
    onAddJob: () => void;
    onUpdateProfile: () => void;
    onLogout: () => void; // Added new prop
}

export default function DashboardHeader({
    onAddJob,
    onUpdateProfile,
    onLogout,
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

            <div className="flex flex-wrap gap-2">
                {/* Logout Button */}
                <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>

                {/* Profile Button */}
                <button
                    type="button"
                    onClick={onUpdateProfile}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <User size={16} />
                    <span className="hidden sm:inline">Profile</span>
                </button>

                {/* Add Application Button */}
                <button
                    type="button"
                    onClick={onAddJob}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Plus size={16} />
                    Add App
                </button>
            </div>
        </div>
    );
}