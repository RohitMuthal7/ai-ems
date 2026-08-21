import React from "react";
import {
    Download,
    Plus,
    Users,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/EmployeeToolbar.jsx
// ===========================================================================

export default function EmployeeToolbar({
    totalEmployees = 0,
    onAddEmployee,
    onExport,
}) {
    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white px-5 py-5 shadow-sm md:px-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* =====================================================
                    Title
                ===================================================== */}
                <div className="min-w-0">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <Users size={19} />
                        </div>

                        <div className="min-w-0">

                            <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                Employees
                            </h1>

                            <p className="mt-0.5 text-xs font-medium text-[#696e5e]">
                                Workforce directory and employee management
                            </p>

                        </div>

                    </div>

                    {/* Workforce count */}
                    <div className="mt-4 flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#9ac837]" />

                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#696e5e]">
                            {totalEmployees}{" "}
                            {totalEmployees === 1
                                ? "employee"
                                : "employees"}{" "}
                            in workforce
                        </span>

                    </div>

                </div>

                {/* =====================================================
                    Actions
                ===================================================== */}
                <div className="flex w-full items-center gap-2 sm:w-auto">

                    <button
                        type="button"
                        onClick={onExport}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ced0c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#183a4e] transition-all hover:bg-[#f3f4f0] hover:border-[#bfc3ba] active:scale-[0.98] sm:flex-none"
                    >
                        <Download
                            size={16}
                        />

                        Export
                    </button>

                    <button
                        type="button"
                        onClick={
                            onAddEmployee
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98] sm:flex-none"
                    >
                        <Plus size={17} />

                        Add Employee
                    </button>

                </div>

            </div>
        </section>
    );
}