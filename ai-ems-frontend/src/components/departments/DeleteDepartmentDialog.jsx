import {
    AlertTriangle,
    X,
    Trash2,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/DeleteDepartmentDialog.jsx
// ===========================================================================

export default function DeleteDepartmentDialog({
    open,
    department,
    onClose,
    onConfirm,
}) {
    if (!open || !department) {
        return null;
    }

    const handleClose = () => {
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d27]/45 px-4 py-6 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    handleClose();
                }
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-department-title"
                aria-describedby="delete-department-description"
                className="w-full max-w-md overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =================================================
                    Header
                ================================================= */}
                <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <Trash2
                                size={17}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Department Management
                            </p>

                            <h2
                                id="delete-department-title"
                                className="mt-0.5 text-base font-bold text-[#0c1d27]"
                            >
                                Delete Department
                            </h2>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        aria-label="Close delete department dialog"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27]"
                    >
                        <X
                            size={18}
                        />
                    </button>
                </div>

                {/* =================================================
                    Content
                ================================================= */}
                <div className="p-5 md:p-6">

                    <div className="flex flex-col items-center text-center">

                        {/* Warning */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                            <AlertTriangle
                                size={26}
                                strokeWidth={2.2}
                            />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0c1d27]">
                            Delete this department?
                        </h3>

                        <p
                            id="delete-department-description"
                            className="mt-2 max-w-sm text-xs leading-5 text-[#696e5e]"
                        >
                            This action will permanently
                            remove the department from the
                            system. Make sure it is no longer
                            required before continuing.
                        </p>

                        {/* Department */}
                        <div className="mt-5 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-4 py-3.5 text-left">

                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Department
                            </p>

                            <p className="mt-1 text-sm font-bold text-[#183a4e]">
                                {
                                    department.departmentName
                                }
                            </p>

                            {department.departmentCode && (
                                <p className="mt-0.5 text-[10px] font-medium text-[#696e5e]">
                                    {
                                        department.departmentCode
                                    }
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            Actions
                        ================================================= */}
                        <div className="mt-6 flex w-full flex-col-reverse gap-2 sm:flex-row">

                            <button
                                type="button"
                                onClick={
                                    handleClose
                                }
                                className="h-10 flex-1 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleConfirm
                                }
                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/25"
                            >
                                <Trash2
                                    size={15}
                                />

                                Delete Department
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}