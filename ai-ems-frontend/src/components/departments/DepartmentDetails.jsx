import {
    Building2,
    FileText,
    Calendar,
    BadgeCheck,
    X,
} from "lucide-react";

import DepartmentStatusBadge from "./DepartmentStatusBadge";

export default function DepartmentDetails({

    open,

    department,

    onClose,

}) {

    if (!open || !department) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">

                            Department Details

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            Complete department information

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 transition hover:bg-slate-100"

                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div className="flex items-center gap-3">

                        <Building2 className="text-[#31749b]" />

                        <div>

                            <p className="text-xs text-slate-500">

                                Department Name

                            </p>

                            <h3 className="font-semibold text-slate-800">

                                {department.departmentName}

                            </h3>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <BadgeCheck className="text-[#31749b]" />

                        <div>

                            <p className="text-xs text-slate-500">

                                Department Code

                            </p>

                            <h3 className="font-semibold">

                                {department.departmentCode}

                            </h3>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <FileText className="mt-1 text-[#31749b]" />

                        <div>

                            <p className="text-xs text-slate-500">

                                Description

                            </p>

                            <p className="text-sm text-slate-700">

                                {department.description || "No description"}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Calendar className="text-[#31749b]" />

                        <div>

                            <p className="text-xs text-slate-500">

                                Created At

                            </p>

                            <p className="text-sm font-medium">

                                {department.createdAt
                                    ? new Date(
                                          department.createdAt
                                      ).toLocaleString()
                                    : "-"}

                            </p>

                        </div>

                    </div>

                    <div>

                        <p className="mb-2 text-xs text-slate-500">

                            Status

                        </p>

                        <DepartmentStatusBadge

                            status={department.status}

                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t p-5">

                    <button

                        onClick={onClose}

                        className="rounded-lg bg-[#31749b] px-5 py-2.5 font-medium text-white transition hover:bg-[#255774]"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}