import React, { useEffect } from "react";
import {
    UserPlus,
    X,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/AddEmployeeModal.jsx
// ===========================================================================

export default function AddEmployeeModal({
    open,
    title = "Add Employee",
    children,
    onClose,
}) {
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        document.body.style.overflow =
            "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow =
                "";
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d27]/45 p-3 backdrop-blur-sm sm:p-5">

            {/* =========================================================
                Modal
            ========================================================= */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-modal-title"
                className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-2xl animate-in zoom-in-95 duration-200"
            >

                {/* =====================================================
                    Header
                ===================================================== */}
                <div className="flex shrink-0 items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 sm:px-6">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <UserPlus
                                size={19}
                            />
                        </div>

                        <div className="min-w-0">
                            <h2
                                id="employee-modal-title"
                                className="truncate text-lg font-bold text-[#0c1d27] sm:text-xl"
                            >
                                {title}
                            </h2>

                            <p className="mt-0.5 truncate text-xs text-[#696e5e]">
                                {title
                                    .toLowerCase()
                                    .includes("edit")
                                    ? "Update employee information and details."
                                    : "Add a new employee to your workforce."}
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close employee modal"
                        className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-[#696e5e] transition-all hover:border-[#ced0c8]/60 hover:bg-white hover:text-[#0c1d27] active:scale-95"
                    >
                        <X size={19} />
                    </button>

                </div>

                {/* =====================================================
                    Body
                ===================================================== */}
                <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-6 sm:px-7 sm:py-7">

                    <div className="mx-auto w-full max-w-4xl">

                        {children}

                    </div>

                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 sm:px-6">

                    <p className="hidden text-[10px] font-medium text-[#9ca191] sm:block">
                        All required fields must be completed.
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto rounded-lg border border-[#ced0c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#4f5346] transition-all hover:bg-[#f3f4f0] hover:text-[#0c1d27] active:scale-[0.98]"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
}