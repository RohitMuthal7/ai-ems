// ===========================================================================
// File: src/components/reports/ReportSkeleton.jsx
// ===========================================================================

export default function ReportSkeleton() {
    return (
        <section className="space-y-4">

            {/* =========================================================
                Report Type Card Skeleton
            ========================================================= */}
            <div className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

                <div className="p-5 md:p-6">

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="h-11 w-11 animate-pulse rounded-xl bg-[#e4e7e1]" />

                            <div className="space-y-2">

                                <div className="h-2 w-24 animate-pulse rounded bg-[#e3e6e0]" />

                                <div className="h-4 w-40 animate-pulse rounded bg-[#dfe3dc]" />

                            </div>

                        </div>

                        <div className="hidden h-5 w-20 animate-pulse rounded-full bg-[#e8ebe5] sm:block" />

                    </div>

                    <div className="mt-5 rounded-xl border border-[#ced0c8]/40 bg-[#f8f9f7] px-4 py-3.5">

                        <div className="flex items-start gap-3">

                            <div className="h-4 w-4 animate-pulse rounded bg-[#e1e4df]" />

                            <div className="flex-1 space-y-2">

                                <div className="h-2.5 w-full max-w-md animate-pulse rounded bg-[#e3e6e0]" />

                                <div className="h-2.5 w-3/4 max-w-sm animate-pulse rounded bg-[#eceee9]" />

                            </div>

                        </div>

                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#ced0c8]/40 pt-4">

                        <div className="h-2 w-24 animate-pulse rounded bg-[#e8ebe5]" />

                        <div className="h-2 w-16 animate-pulse rounded bg-[#e1e4df]" />

                    </div>

                </div>
            </div>

            {/* =========================================================
                Export Preview Skeleton
            ========================================================= */}
            <div className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

                <div className="border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex items-center gap-3">

                        <div className="h-9 w-9 animate-pulse rounded-lg bg-[#e4e7e1]" />

                        <div className="space-y-2">

                            <div className="h-2.5 w-32 animate-pulse rounded bg-[#dfe3dc]" />

                            <div className="h-2 w-52 animate-pulse rounded bg-[#eceee9]" />

                        </div>

                    </div>

                </div>

                <div className="p-5 md:p-6">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {Array.from({
                            length: 3,
                        }).map(
                            (_, index) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-4"
                                >
                                    <div className="h-8 w-8 animate-pulse rounded-lg bg-[#e4e7e1]" />

                                    <div className="mt-4 h-3 w-28 animate-pulse rounded bg-[#dfe3dc]" />

                                    <div className="mt-2 h-2.5 w-full animate-pulse rounded bg-[#eceee9]" />

                                    <div className="mt-2 h-2.5 w-2/3 animate-pulse rounded bg-[#eceee9]" />
                                </div>
                            )
                        )}

                    </div>

                    <div className="mt-5 flex justify-end gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <div className="h-9 w-28 animate-pulse rounded-lg bg-[#e8ebe5]" />

                        <div className="h-9 w-24 animate-pulse rounded-lg bg-[#e1e4df]" />

                    </div>

                </div>
            </div>

        </section>
    );
}