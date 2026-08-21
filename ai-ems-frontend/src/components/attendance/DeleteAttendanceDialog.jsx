import {
    AlertTriangle,
    X,
    Trash2,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/DeleteAttendanceDialog.jsx
// ===========================================================================

export default function DeleteAttendanceDialog({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d27]/45 px-4 py-6 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose?.();
                }
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-attendance-title"
                aria-describedby="delete-attendance-description"
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
                                Attendance Management
                            </p>

                            <h2
                                id="delete-attendance-title"
                                className="mt-0.5 text-base font-bold text-[#0c1d27]"
                            >
                                Delete Attendance
                            </h2>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close delete attendance dialog"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* =================================================
                    Content
                ================================================= */}
                <div className="p-5 md:p-6">

                    <div className="flex flex-col items-center text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                            <AlertTriangle
                                size={26}
                                strokeWidth={2.2}
                            />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0c1d27]">
                            Delete this attendance record?
                        </h3>

                        <p
                            id="delete-attendance-description"
                            className="mt-2 max-w-sm text-xs leading-5 text-[#696e5e]"
                        >
                            This attendance record will be
                            permanently removed. This action
                            cannot be undone.
                        </p>

                        {/* =================================================
                            Warning
                        ================================================= */}
                        <div className="mt-5 flex w-full items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3.5 text-left">

                            <AlertTriangle
                                size={16}
                                className="mt-0.5 shrink-0 text-amber-600"
                            />

                            <p className="text-[10px] font-semibold leading-4 text-amber-700">
                                Make sure this is the correct
                                attendance record before
                                continuing.
                            </p>
                        </div>

                        {/* =================================================
                            Actions
                        ================================================= */}
                        <div className="mt-6 flex w-full flex-col-reverse gap-2 sm:flex-row">

                            <button
                                type="button"
                                onClick={onClose}
                                className="h-10 flex-1 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/25"
                            >
                                <Trash2
                                    size={15}
                                />

                                Delete Attendance
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}