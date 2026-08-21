import { useState } from "react";

import {
    FileText,
} from "lucide-react";

import ReportStats from "../../components/reports/ReportStats";
import ReportToolbar from "../../components/reports/ReportToolbar";
import ReportFilters from "../../components/reports/ReportFilters";
import ReportCards from "../../components/reports/ReportCards";
import ReportSkeleton from "../../components/reports/ReportSkeleton";

import {
    downloadAttendanceExcel,
    downloadAttendancePdf,
    downloadLeaveExcel,
    downloadLeavePdf,
    downloadPayrollExcel,
    downloadPayrollPdf,
} from "../../api/reportApi";

// ===========================================================================
// File: src/pages/reports/Reports.jsx
// ===========================================================================

export default function Reports() {

    // ============================================================
    // State
    // ============================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [reportType, setReportType] =
        useState("ATTENDANCE");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    // ============================================================
    // Download File
    // ============================================================

    const downloadFile = (
        blob,
        fileName
    ) => {

        if (!blob) {
            throw new Error(
                "No report file was returned."
            );
        }

        const url =
            window.URL.createObjectURL(
                blob
            );

        const link =
            document.createElement("a");

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);
    };

    // ============================================================
    // Validate Report
    // ============================================================

    const validateReport = () => {

        setError("");

        /*
         * Attendance backend requires both dates.
         */
        if (
            reportType ===
            "ATTENDANCE"
        ) {

            if (
                !startDate ||
                !endDate
            ) {

                setError(
                    "Please select both Start Date and End Date for the Attendance report."
                );

                return false;
            }

            if (
                startDate >
                endDate
            ) {

                setError(
                    "Start Date cannot be after End Date."
                );

                return false;
            }
        }

        return true;
    };

    // ============================================================
    // Export Excel
    // ============================================================

    const handleExcel = async () => {

        if (!validateReport()) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            let blob;
            let fileName;

            switch (
                reportType
            ) {

                case "ATTENDANCE":

                    blob =
                        await downloadAttendanceExcel(
                            startDate,
                            endDate
                        );

                    fileName =
                        "Attendance_Report.xlsx";

                    break;

                case "LEAVE":

                    blob =
                        await downloadLeaveExcel();

                    fileName =
                        "Leave_Report.xlsx";

                    break;

                case "PAYROLL":

                    blob =
                        await downloadPayrollExcel();

                    fileName =
                        "Payroll_Report.xlsx";

                    break;

                default:

                    throw new Error(
                        "Unsupported report type."
                    );
            }

            downloadFile(
                blob,
                fileName
            );

        } catch (downloadError) {

            console.error(
                "Failed to download Excel report:",
                downloadError
            );

            setError(
                downloadError?.message ||
                downloadError?.response
                    ?.data?.message ||
                "Failed to download Excel report."
            );

        } finally {

            setLoading(false);
        }
    };

    // ============================================================
    // Export PDF
    // ============================================================

    const handlePdf = async () => {

        if (!validateReport()) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            let blob;
            let fileName;

            switch (
                reportType
            ) {

                case "ATTENDANCE":

                    blob =
                        await downloadAttendancePdf(
                            startDate,
                            endDate
                        );

                    fileName =
                        "Attendance_Report.pdf";

                    break;

                case "LEAVE":

                    blob =
                        await downloadLeavePdf();

                    fileName =
                        "Leave_Report.pdf";

                    break;

                case "PAYROLL":

                    blob =
                        await downloadPayrollPdf();

                    fileName =
                        "Payroll_Report.pdf";

                    break;

                default:

                    throw new Error(
                        "Unsupported report type."
                    );
            }

            downloadFile(
                blob,
                fileName
            );

        } catch (downloadError) {

            console.error(
                "Failed to download PDF report:",
                downloadError
            );

            setError(
                downloadError?.message ||
                downloadError?.response
                    ?.data?.message ||
                "Failed to download PDF report."
            );

        } finally {

            setLoading(false);
        }
    };

    // ============================================================
    // Reset
    // ============================================================

    const handleReset = () => {

        setReportType(
            "ATTENDANCE"
        );

        setStartDate("");
        setEndDate("");
        setError("");
    };

    // ============================================================
    // Attendance Export Disabled
    // ============================================================

    const exportDisabled =
        loading ||
        (
            reportType ===
                "ATTENDANCE" &&
            (
                !startDate ||
                !endDate ||
                startDate >
                    endDate
            )
        );

    // ============================================================
    // Render
    // ============================================================

    return (

        <div className="mx-auto w-full max-w-[1600px] pb-10">

            {/* =====================================================
                Header
            ===================================================== */}

            <section className="mb-6 rounded-2xl border border-[#ced0c8]/50 bg-white px-5 py-5 shadow-sm md:px-6">

                <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">

                        <FileText
                            size={21}
                            strokeWidth={2.2}
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                            Reports
                        </h1>

                        <p className="mt-1 text-xs font-medium text-[#696e5e]">
                            Generate and download Attendance, Leave and Payroll reports.
                        </p>

                    </div>

                </div>

            </section>

            {/* =====================================================
                Statistics
            ===================================================== */}

            <ReportStats />

            {/* =====================================================
                Filters
            ===================================================== */}

            <div className="mt-6">

                <ReportFilters
                    reportType={
                        reportType
                    }
                    onReportTypeChange={
                        (value) => {
                            setReportType(
                                value
                            );

                            /*
                             * Clear attendance dates when
                             * switching to another report type.
                             */
                            if (
                                value !==
                                "ATTENDANCE"
                            ) {
                                setStartDate("");
                                setEndDate("");
                            }

                            setError("");
                        }
                    }
                    startDate={
                        startDate
                    }
                    endDate={
                        endDate
                    }
                    onStartDateChange={
                        (value) => {
                            setStartDate(
                                value
                            );
                            setError("");
                        }
                    }
                    onEndDateChange={
                        (value) => {
                            setEndDate(
                                value
                            );
                            setError("");
                        }
                    }
                    onReset={
                        handleReset
                    }
                />

            </div>

            {/* =====================================================
                Selected Report
            ===================================================== */}

            <section className="mt-6">

                {loading ? (

                    <ReportSkeleton />

                ) : (

                    <ReportCards
                        reportType={
                            reportType
                        }
                    />

                )}

            </section>

            {/* =====================================================
                Export
            ===================================================== */}

            <div className="mt-4">

                <ReportToolbar
                    onExcel={
                        handleExcel
                    }
                    onPdf={
                        handlePdf
                    }
                    loading={
                        loading
                    }
                    disabled={
                        exportDisabled
                    }
                />

            </div>

            {/* =====================================================
                Error
            ===================================================== */}

            {error && (

                <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                    <p className="text-xs font-semibold text-amber-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-amber-700 transition-colors hover:text-amber-900"
                    >
                        Dismiss
                    </button>

                </div>

            )}

        </div>
    );
}