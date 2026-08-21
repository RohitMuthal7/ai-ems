import api from "./axios";

// ===========================================================================
// File: src/api/reportApi.js
// ===========================================================================

/**
 * Build optional date parameters.
 *
 * Important:
 * Do not send empty strings to the backend.
 */
const buildDateParams = (
    startDate,
    endDate
) => {
    const params = {};

    if (startDate) {
        params.startDate =
            startDate;
    }

    if (endDate) {
        params.endDate =
            endDate;
    }

    return params;
};

/**
 * Extract a useful backend error message.
 *
 * Blob responses can hide the actual JSON error,
 * so we try to read it before falling back.
 */
const getReportErrorMessage =
    async (error) => {

        const response =
            error?.response;

        if (!response) {
            return (
                error?.message ||
                "Report request failed."
            );
        }

        const data =
            response.data;

        /*
         * When responseType is "blob",
         * error data may also be a Blob.
         */
        if (
            data instanceof Blob
        ) {
            try {
                const text =
                    await data.text();

                if (text) {

                    try {
                        const parsed =
                            JSON.parse(
                                text
                            );

                        return (
                            parsed.message ||
                            parsed.error ||
                            text
                        );
                    } catch {
                        return text;
                    }
                }
            } catch {
                // Ignore blob parsing failure.
            }
        }

        if (
            typeof data ===
            "string"
        ) {
            return data;
        }

        return (
            data?.message ||
            data?.error ||
            `Request failed with status code ${response.status}.`
        );
    };

/**
 * Common report request helper.
 */
const requestReport =
    async (
        url,
        fileName,
        config = {}
    ) => {

        try {

            const response =
                await api.get(
                    url,
                    {
                        ...config,
                        responseType:
                            "blob",
                    }
                );

            return response.data;

        } catch (error) {

            const message =
                await getReportErrorMessage(
                    error
                );

            const reportError =
                new Error(
                    message
                );

            reportError.status =
                error?.response
                    ?.status;

            reportError.originalError =
                error;

            throw reportError;
        }
    };

// ===========================================================================
// Attendance
// ===========================================================================

export const downloadAttendanceExcel =
    async (
        startDate,
        endDate
    ) => {

        return requestReport(
            "/reports/attendance/excel",
            "Attendance_Report.xlsx",
            {
                params:
                    buildDateParams(
                        startDate,
                        endDate
                    ),
            }
        );
    };

export const downloadAttendancePdf =
    async (
        startDate,
        endDate
    ) => {

        return requestReport(
            "/reports/attendance/pdf",
            "Attendance_Report.pdf",
            {
                params:
                    buildDateParams(
                        startDate,
                        endDate
                    ),
            }
        );
    };

// ===========================================================================
// Leave
// ===========================================================================

export const downloadLeaveExcel =
    async () => {

        return requestReport(
            "/reports/leave/excel",
            "Leave_Report.xlsx"
        );
    };

export const downloadLeavePdf =
    async () => {

        return requestReport(
            "/reports/leave/pdf",
            "Leave_Report.pdf"
        );
    };

// ===========================================================================
// Payroll
// ===========================================================================

export const downloadPayrollExcel =
    async () => {

        return requestReport(
            "/reports/payroll/excel",
            "Payroll_Report.xlsx"
        );
    };

export const downloadPayrollPdf =
    async () => {

        return requestReport(
            "/reports/payroll/pdf",
            "Payroll_Report.pdf"
        );
    };