interface JobStatusBadgeProps {
    status: string;
}

export default function JobStatusBadge({
    status,
}: JobStatusBadgeProps) {
    const styles: Record<string, string> = {
        Applied:
            "bg-blue-50 text-blue-700 border-blue-200",

        Interview:
            "bg-green-50 text-green-700 border-green-200",

        Offer:
            "bg-violet-50 text-violet-700 border-violet-200",

        Rejected:
            "bg-red-50 text-red-700 border-red-200",

        Withdrawn:
            "bg-gray-100 text-gray-600 border-gray-200",
    };

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status] ??
                "border-gray-200 bg-gray-50 text-gray-600"
                }`}
        >
            {status}
        </span>
    );
}