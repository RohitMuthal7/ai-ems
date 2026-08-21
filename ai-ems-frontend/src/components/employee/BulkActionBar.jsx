import React from "react";
import {
    Trash2,
    Download,
    UserCheck,
    UserMinus,
    X,
    Users,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/BulkActionBar.jsx
// ===========================================================================

export default function BulkActionBar({
    selectedCount = 0,
    onActivate,
    onDeactivate,
    onExport,
    onDelete,
    onClearSelection,
}) {
    if (selectedCount === 0) {
        return null;
    }

    const employeeLabel =
        selectedCount === 1
            ? "employee"
            : "employees";

    return (
        <section className="overflow-hidden rounded-2xl border border-[#b9d9ea]/70 bg-[#ecf4f9] shadow-sm">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">

                {/* =====================================================
                    Selection Summary
                ===================================================== */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#31749b] shadow-sm">
                        <Users size={17} />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-[#183a4e]">
                            {selectedCount}{" "}
                            {employeeLabel} selected
                        </p>

                        <p className="mt-0.5 text-[10px] font-medium text-[#696e5e]">
                            Choose an action for the selected employees.
                        </p>
                    </div>
                </div>

                {/* =====================================================
                    Actions
                ===================================================== */}
                <div className="flex flex-wrap items-center gap-2">

                    <BulkButton
                        icon={
                            <UserCheck
                                size={15}
                            />
                        }
                        label="Activate"
                        onClick={
                            onActivate
                        }
                        className="border-[#d7e9af] bg-[#f5faeb] text-[#5c7821] hover:bg-[#eaf6d4]"
                    />

                    <BulkButton
                        icon={
                            <UserMinus
                                size={15}
                            />
                        }
                        label="Deactivate"
                        onClick={
                            onDeactivate
                        }
                        className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    />

                    <BulkButton
                        icon={
                            <Download
                                size={15}
                            />
                        }
                        label="Export"
                        onClick={onExport}
                        className="border-[#ced0c8] bg-white text-[#183a4e] hover:bg-[#f3f4f0]"
                    />

                    <BulkButton
                        icon={
                            <Trash2
                                size={15}
                            />
                        }
                        label="Delete"
                        onClick={onDelete}
                        className="border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                    />

                    <button
                        type="button"
                        onClick={
                            onClearSelection
                        }
                        aria-label="Clear selection"
                        title="Clear selection"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ced0c8] bg-white text-[#696e5e] transition hover:bg-[#f3f4f0] hover:text-[#0c1d27]"
                    >
                        <X size={16} />
                    </button>

                </div>
            </div>
        </section>
    );
}

const BulkButton = ({
    icon,
    label,
    onClick,
    className = "",
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.98] ${className}`}
    >
        {icon}
        {label}
    </button>
);