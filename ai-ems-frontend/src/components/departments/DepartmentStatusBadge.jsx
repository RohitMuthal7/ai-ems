export default function DepartmentStatusBadge({ status }) {

    const styles = {

        ACTIVE:
            "bg-green-100 text-green-700 border border-green-200",

        INACTIVE:
            "bg-red-100 text-red-700 border border-red-200",

    };

    return (

        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-slate-100 text-slate-700"
            }`}
        >
            {status}
        </span>

    );

}