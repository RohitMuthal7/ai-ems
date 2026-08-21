import { useEffect, useState } from "react";

import {
    CheckCircle2,
    X,
    XCircle,
    MessageSquareText,
    AlertCircle,
} from "lucide-react";

// ===========================================================================
// File: src/components/leave/LeaveApprovalDialog.jsx
// ===========================================================================

export default function LeaveApprovalDialog({
    open,
    leave,
    action,
    onClose,
    onConfirm,
}) {
    const [remarks, setRemarks] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (open) {
            setRemarks("");
            setLoading(false);
        }
    }, [open]);

    if (!open || !leave) {
        return null;
    }

    const isApprove =
        action === "APPROVE";

    const employeeName =
        leave.employeeName ||
        leave.employee?.fullName ||
        "Unknown Employee";

    const employeeCode =
        leave.employeeCode ||
        leave.employee?.employeeCode ||
        "—";

    const leaveType =
        formatLabel(
            leave.leaveType
        );

    const startDate =
        formatDate(
            leave.startDate
        );

    const endDate =
        formatDate(
            leave.endDate
        );

    const handleSubmit = async () => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            await onConfirm?.(
                remarks.trim()
            );
        } catch (error) {
            /*
             * Parent owns the actual backend error.
             * We only stop the loading state here.
             */
            console.error(
                "Leave approval action failed:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) {
            return;
        }

        onClose?.();
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
                role="dialog"
                aria-modal="true"
                aria-labelledby="leave-approval-title"
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =====================================================
                    Header
                ===================================================== */}
                <header
                    className={`border-b px-5 py-4 md:px-6 ${
                        isApprove
                            ? "bg-[#f5faeb]"
                            : "bg-rose-50"
                    }`}
                >

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                    isApprove
                                        ? "bg-white text-[#7ba02c]"
                                        : "bg-white text-rose-600"
                                }`}
                            >
                                {isApprove ? (
                                    <CheckCircle2
                                        size={20}
                                        strokeWidth={2.2}
                                    />
                                ) : (
                                    <XCircle
                                        size={20}
                                        strokeWidth={2.2}
                                    />
                                )}
                            </div>

                            <div>

                                <p
                                    className={`text-[9px] font-bold uppercase tracking-widest ${
                                        isApprove
                                            ? "text-[#6d8b26]"
                                            : "text-rose-500"
                                    }`}
                                >
                                    Leave Approval
                                </p>

                                <h2
                                    id="leave-approval-title"
                                    className="mt-0.5 text-lg font-bold text-[#0c1d27]"
                                >
                                    {isApprove
                                        ? "Approve Leave"
                                        : "Reject Leave"}
                                </h2>

                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleClose
                            }
                            disabled={
                                loading
                            }
                            aria-label="Close leave approval dialog"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <X size={18} />
                        </button>

                    </div>
                </header>

                {/* =====================================================
                    Body
                ===================================================== */}
                <div className="p-5 md:p-6">

                    {/* =================================================
                        Employee Summary
                    ================================================= */}
                    <div className="rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-sm font-bold text-[#31749b]">
                                {getInitials(
                                    employeeName
                                )}
                            </div>

                            <div className="min-w-0">

                                <p className="truncate text-sm font-bold text-[#0c1d27]">
                                    {
                                        employeeName
                                    }
                                </p>

                                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-medium text-[#696e5e]">

                                    <span>
                                        {
                                            employeeCode
                                        }
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span>
                                        {
                                            leaveType
                                        }
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span>
                                        {
                                            startDate
                                        }
                                        {" "}
                                        →{" "}
                                        {
                                            endDate
                                        }
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        Action Notice
                    ================================================= */}
                    <div
                        className={`mt-4 flex items-start gap-3 rounded-xl border p-3.5 ${
                            isApprove
                                ? "border-[#d7e9af] bg-[#f5faeb]"
                                : "border-rose-200 bg-rose-50"
                        }`}
                    >
                        {isApprove ? (
                            <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-[#7ba02c]"
                            />
                        ) : (
                            <AlertCircle
                                size={16}
                                className="mt-0.5 shrink-0 text-rose-600"
                            />
                        )}

                        <p
                            className={`text-[10px] font-semibold leading-5 ${
                                isApprove
                                    ? "text-[#5c7821]"
                                    : "text-rose-700"
                            }`}
                        >
                            {isApprove
                                ? "Approving this request will mark the leave application as approved."
                                : "Rejecting this request will mark the leave application as rejected."}
                        </p>
                    </div>

                    {/* =================================================
                        Remarks
                    ================================================= */}
                    <div className="mt-5">

                        <div className="mb-1.5 flex items-center justify-between">

                            <label
                                htmlFor="leave-admin-remarks"
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4f5346]"
                            >
                                <MessageSquareText
                                    size={14}
                                    className={
                                        isApprove
                                            ? "text-[#7ba02c]"
                                            : "text-rose-500"
                                    }
                                />

                                Admin Remarks

                            </label>

                            <span className="text-[9px] font-medium text-[#9ca191]">
                                {
                                    remarks.length
                                }
                                /500
                            </span>

                        </div>

                        <textarea
                            id="leave-admin-remarks"
                            rows={5}
                            maxLength={500}
                            value={
                                remarks
                            }
                            onChange={(
                                event
                            ) =>
                                setRemarks(
                                    event
                                        .target
                                        .value
                                )
                            }
                            disabled={
                                loading
                            }
                            placeholder={
                                isApprove
                                    ? "Add an optional approval remark..."
                                    : "Enter the reason or remark for rejecting this leave..."
                            }
                            className="w-full resize-none rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 py-3 text-sm font-medium leading-5 text-[#0c1d27] outline-none transition-all placeholder:text-[#b0b4ab] hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15 disabled:cursor-not-allowed disabled:bg-[#f3f4f0]"
                        />

                    </div>
                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <footer className="flex flex-col-reverse gap-2 border-t border-[#ced0c8]/50 bg-white px-5 py-4 sm:flex-row sm:justify-end md:px-6">

                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        disabled={
                            loading
                        }
                        className="h-10 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            loading
                        }
                        className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                            isApprove
                                ? "bg-[#7ba02c] hover:bg-[#658624]"
                                : "bg-rose-600 hover:bg-rose-700"
                        }`}
                    >

                        {isApprove ? (
                            <CheckCircle2
                                size={15}
                            />
                        ) : (
                            <XCircle
                                size={15}
                            />
                        )}

                        {loading
                            ? "Processing..."
                            : isApprove
                                ? "Approve Leave"
                                : "Reject Leave"}

                    </button>

                </footer>
            </div>
        </div>
    );
}

// ===========================================================================
// Label Formatter
// ===========================================================================

function formatLabel(
    value
) {
    if (!value) {
        return "—";
    }

    return String(value)
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}

// ===========================================================================
// Date Formatter
// ===========================================================================

function formatDate(
    value
) {
    if (!value) {
        return "—";
    }

    const date =
        new Date(
            `${value}T00:00:00`
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

// ===========================================================================
// Initials
// ===========================================================================

function getInitials(
    name
) {
    const parts =
        String(
            name ||
                "Employee"
        )
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (
        parts.length ===
        1
    ) {
        return parts[0]
            .charAt(0)
            .toUpperCase();
    }

    return `${parts[0]
        .charAt(0)
        .toUpperCase()}${parts[
        parts.length - 1
    ]
        .charAt(0)
        .toUpperCase()}`;
}