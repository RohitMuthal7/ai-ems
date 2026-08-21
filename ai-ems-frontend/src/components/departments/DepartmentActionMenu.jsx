import {
    Eye,
    Pencil,
    Power,
    Trash2,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/DepartmentActionMenu.jsx
// ===========================================================================

export default function DepartmentActionMenu({
    department,
    onView,
    onEdit,
    onStatus,
    onDelete,
}) {
    return (
        <div className="flex items-center justify-end gap-1">

            {/* =========================================================
                View
            ========================================================= */}
            <ActionButton
                label="View department"
                onClick={() =>
                    onView?.(
                        department
                    )
                }
                className="text-[#696e5e] hover:bg-[#ecf4f9] hover:text-[#31749b]"
            >
                <Eye
                    size={15}
                    strokeWidth={2.2}
                />
            </ActionButton>

            {/* =========================================================
                Edit
            ========================================================= */}
            <ActionButton
                label="Edit department"
                onClick={() =>
                    onEdit?.(
                        department
                    )
                }
                className="text-[#696e5e] hover:bg-[#f3f4f0] hover:text-[#183a4e]"
            >
                <Pencil
                    size={15}
                    strokeWidth={2.2}
                />
            </ActionButton>

            {/* =========================================================
                Change Status
            ========================================================= */}
            <ActionButton
                label="Change department status"
                onClick={() =>
                    onStatus?.(
                        department
                    )
                }
                className="text-[#696e5e] hover:bg-amber-50 hover:text-amber-700"
            >
                <Power
                    size={15}
                    strokeWidth={2.2}
                />
            </ActionButton>

            {/* =========================================================
                Delete
            ========================================================= */}
            <ActionButton
                label="Delete department"
                onClick={() =>
                    onDelete?.(
                        department
                    )
                }
                className="text-[#9ca191] hover:bg-rose-50 hover:text-rose-600"
            >
                <Trash2
                    size={15}
                    strokeWidth={2.2}
                />
            </ActionButton>
        </div>
    );
}

// ===========================================================================
// Reusable Action Button
// ===========================================================================

function ActionButton({
    children,
    label,
    onClick,
    className = "",
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 ${className}`}
        >
            {children}
        </button>
    );
}