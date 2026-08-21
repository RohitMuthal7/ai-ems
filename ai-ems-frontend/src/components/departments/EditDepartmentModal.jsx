import { useEffect, useState } from "react";
import {
    X,
    Building2,
    FileText,
    Save,
    Loader2,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/EditDepartmentModal.jsx
// ===========================================================================

export default function EditDepartmentModal({
    open,
    department,
    onClose,
    onSave,
}) {
    const [departmentName, setDepartmentName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    // ============================================================
    // Populate Form
    // ============================================================

    useEffect(() => {
        if (!department) {
            return;
        }

        setDepartmentName(
            department.departmentName || ""
        );

        setDescription(
            department.description || ""
        );

        setErrors({});
        setLoading(false);
    }, [department]);

    // ============================================================
    // Validation
    // ============================================================

    const validate = () => {
        const validationErrors = {};

        if (!departmentName.trim()) {
            validationErrors.departmentName =
                "Department name is required.";
        } else if (
            departmentName.trim().length < 2
        ) {
            validationErrors.departmentName =
                "Department name must contain at least 2 characters.";
        }

        if (
            description.trim().length >
            500
        ) {
            validationErrors.description =
                "Description cannot exceed 500 characters.";
        }

        setErrors(
            validationErrors
        );

        return (
            Object.keys(
                validationErrors
            ).length === 0
        );
    };

    // ============================================================
    // Submit
    // ============================================================

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            await onSave?.(
                department.id,
                {
                    departmentName:
                        departmentName.trim(),

                    description:
                        description.trim(),
                }
            );

            onClose?.();
        } catch (error) {
            /*
             * Parent handler displays the actual
             * backend error through the toast system.
             */
            console.error(
                "Failed to update department:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Close
    // ============================================================

    const handleClose = () => {
        if (loading) {
            return;
        }

        onClose?.();
    };

    if (
        !open ||
        !department
    ) {
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
                    handleClose();
                }
            }}
        >
            {/* =====================================================
                Modal
            ===================================================== */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-department-title"
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================================
                    Header
                ================================================= */}
                <header className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <Building2
                                size={19}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div className="min-w-0">

                            <h2
                                id="edit-department-title"
                                className="text-lg font-bold text-[#0c1d27]"
                            >
                                Edit Department
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                Update department information
                            </p>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        disabled={loading}
                        aria-label="Close edit department modal"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <X size={18} />
                    </button>
                </header>

                {/* =================================================
                    Form
                ================================================= */}
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="p-5 md:p-6"
                >

                    {/* Current Department */}
                    <div className="mb-5 rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] px-4 py-3.5">

                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Department Code
                        </p>

                        <p className="mt-1 text-sm font-bold tracking-wide text-[#183a4e]">
                            {department.departmentCode ||
                                "—"}
                        </p>

                    </div>

                    {/* =================================================
                        Department Name
                    ================================================= */}
                    <div className="mb-5">

                        <label
                            htmlFor="edit-department-name"
                            className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4f5346]"
                        >
                            <Building2
                                size={14}
                                className="text-[#31749b]"
                            />

                            Department Name

                            <span className="text-rose-500">
                                *
                            </span>
                        </label>

                        <input
                            id="edit-department-name"
                            type="text"
                            value={
                                departmentName
                            }
                            onChange={(
                                event
                            ) => {
                                setDepartmentName(
                                    event
                                        .target
                                        .value
                                );

                                if (
                                    errors.departmentName
                                ) {
                                    setErrors(
                                        (
                                            previous
                                        ) => ({
                                            ...previous,
                                            departmentName:
                                                "",
                                        })
                                    );
                                }
                            }}
                            maxLength={100}
                            disabled={
                                loading
                            }
                            autoFocus
                            placeholder="Enter department name"
                            className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-[#0c1d27] outline-none transition-all placeholder:text-[#b0b4ab] disabled:cursor-not-allowed disabled:bg-[#f3f4f0] ${
                                errors.departmentName
                                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                                    : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                            }`}
                        />

                        {errors.departmentName && (
                            <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                {
                                    errors.departmentName
                                }
                            </p>
                        )}

                    </div>

                    {/* =================================================
                        Description
                    ================================================= */}
                    <div>

                        <div className="mb-1.5 flex items-center justify-between">

                            <label
                                htmlFor="edit-department-description"
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4f5346]"
                            >
                                <FileText
                                    size={14}
                                    className="text-[#31749b]"
                                />

                                Description
                            </label>

                            <span className="text-[9px] font-medium text-[#9ca191]">
                                {
                                    description.length
                                }
                                /500
                            </span>

                        </div>

                        <textarea
                            id="edit-department-description"
                            rows={5}
                            value={
                                description
                            }
                            onChange={(
                                event
                            ) => {
                                setDescription(
                                    event
                                        .target
                                        .value
                                );

                                if (
                                    errors.description
                                ) {
                                    setErrors(
                                        (
                                            previous
                                        ) => ({
                                            ...previous,
                                            description:
                                                "",
                                        })
                                    );
                                }
                            }}
                            maxLength={500}
                            disabled={
                                loading
                            }
                            placeholder="Add a short description about this department..."
                            className={`w-full resize-none rounded-lg border bg-white px-3.5 py-3 text-sm font-medium leading-5 text-[#0c1d27] outline-none transition-all placeholder:text-[#b0b4ab] disabled:cursor-not-allowed disabled:bg-[#f3f4f0] ${
                                errors.description
                                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                                    : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                            }`}
                        />

                        {errors.description && (
                            <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                {
                                    errors.description
                                }
                            </p>
                        )}

                    </div>

                    {/* =================================================
                        Footer
                    ================================================= */}
                    <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#ced0c8]/40 pt-5 sm:flex-row sm:justify-end">

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
                            type="submit"
                            disabled={
                                loading
                            }
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />

                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save
                                        size={15}
                                    />

                                    Update Department
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}