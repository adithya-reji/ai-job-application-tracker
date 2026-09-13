interface DashboardStatsProps {
    total: number;
    active: number;
    interviews: number;
}

export default function DashboardStats({
    total,
    active,
    interviews,
}: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
                label="Total applications"
                value={total}
            />

            <StatCard
                label="Active applications"
                value={active}
            />

            <StatCard
                label="Interviews"
                value={interviews}
            />
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: number;
}

function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-2xl font-semibold text-gray-900">
                {value}
            </p>
        </div>
    );
}