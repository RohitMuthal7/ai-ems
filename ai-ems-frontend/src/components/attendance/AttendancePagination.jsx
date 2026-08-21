import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendancePagination.jsx
// ===========================================================================

export default function AttendancePagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const canGoPrevious =
        currentPage > 1;

    const canGoNext =
        currentPage < totalPages;

    return (
        <div className="flex flex-col gap-3 border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-6">

            {/* =====================================================
                Page Information
            ===================================================== */}
            <div className="flex items-center gap-2">

                <span className="text-[10px] font-medium text-[#696e5e]">
                    Page
                </span>

                <span className="inline-flex min-w-[28px] items-center justify-center rounded-md border border-[#ced0c8]/60 bg-white px-2 py-1 text-[10px] font-bold text-[#183a4e]">
                    {currentPage}
                </span>

                <span className="text-[10px] font-medium text-[#9ca191]">
                    of
                </span>

                <span className="text-[10px] font-bold text-[#183a4e]">
                    {totalPages}
                </span>

            </div>

            {/* =====================================================
                Navigation
            ===================================================== */}
            <div className="flex items-center gap-1.5">

                <button
                    type="button"
                    disabled={!canGoPrevious}
                    onClick={() =>
                        onPageChange(
                            currentPage - 1
                        )
                    }
                    aria-label="Previous attendance page"
                    title="Previous page"
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-[10px] font-bold text-[#4f5346] transition-all duration-150 hover:border-[#b9d9ea] hover:bg-[#ecf4f9] hover:text-[#31749b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#ced0c8]/70 disabled:hover:bg-white disabled:hover:text-[#4f5346]"
                >
                    <ChevronLeft
                        size={14}
                        strokeWidth={2.2}
                    />

                    <span className="hidden sm:inline">
                        Previous
                    </span>
                </button>

                <span className="hidden px-2 text-[9px] font-bold uppercase tracking-wider text-[#9ca191] md:block">
                    Attendance
                </span>

                <button
                    type="button"
                    disabled={!canGoNext}
                    onClick={() =>
                        onPageChange(
                            currentPage + 1
                        )
                    }
                    aria-label="Next attendance page"
                    title="Next page"
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-[10px] font-bold text-[#4f5346] transition-all duration-150 hover:border-[#b9d9ea] hover:bg-[#ecf4f9] hover:text-[#31749b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#ced0c8]/70 disabled:hover:bg-white disabled:hover:text-[#4f5346]"
                >
                    <span className="hidden sm:inline">
                        Next
                    </span>

                    <ChevronRight
                        size={14}
                        strokeWidth={2.2}
                    />
                </button>

            </div>
        </div>
    );
}