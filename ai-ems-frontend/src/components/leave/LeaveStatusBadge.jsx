export default function LeaveStatusBadge({ status }) {

    const styles = {

        PENDING:
            "bg-yellow-100 text-yellow-700 border-yellow-200",

        APPROVED:
            "bg-green-100 text-green-700 border-green-200",

        REJECTED:
            "bg-red-100 text-red-700 border-red-200",

        CANCELLED:
            "bg-gray-100 text-gray-700 border-gray-200",

    };

    return (

        <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                styles[status] ||
                "bg-slate-100 text-slate-700 border-slate-200"
            }`}
        >
            {status}
        </span>

    );

}