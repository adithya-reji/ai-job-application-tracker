interface SkillMatchBadgeProps {
    percentage: number;
}

export default function SkillMatchBadge({
    percentage,
}: SkillMatchBadgeProps) {
    let style = "bg-gray-100 text-gray-600";

    if (percentage >= 80) {
        style = "bg-green-50 text-green-700";
    } else if (percentage >= 60) {
        style = "bg-yellow-50 text-yellow-700";
    } else {
        style = "bg-red-50 text-red-700";
    }

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
        >
            {percentage}%
        </span>
    );
}