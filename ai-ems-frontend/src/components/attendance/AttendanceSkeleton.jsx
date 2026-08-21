export default function AttendanceSkeleton() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="h-9 w-9 animate-pulse rounded-lg bg-[#e4e7e1]" />

                    <div className="space-y-2">
                        <div className="h-2.5 w-36 animate-pulse rounded bg-[#dfe3dc]" />
                        <div className="h-2 w-52 animate-pulse rounded bg-[#eceee9]" />
                    </div>

                </div>

                <div className="hidden h-6 w-24 animate-pulse rounded-full bg-[#e8ebe5] sm:block" />

            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[980px] border-collapse">

                    {/* Header */}
                    <thead>

                        <tr className="border-b border-[#ced0c8]/50">

                            <SkeletonHeader width="w-24" />
                            <SkeletonHeader width="w-32" />
                            <SkeletonHeader width="w-28" />
                            <SkeletonHeader width="w-24" />
                            <SkeletonHeader width="w-24" />
                            <SkeletonHeader width="w-20" />
                            <SkeletonHeader width="w-24" />

                        </tr>

                    </thead>

                    {/* Rows */}
                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {Array.from({
                            length: 8,
                        }).map(
                            (_, index) => (
                                <tr
                                    key={
                                        index
                                    }
                                >

                                    {/* Employee */}
                                    <td className="px-5 py-4 md:px-6">

                                        <div className="flex items-center gap-3">

                                            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-[#e5eaed]" />

                                            <div className="space-y-2">
                                                <div className="h-3 w-28 animate-pulse rounded bg-[#e0e3de]" />
                                                <div className="h-2 w-20 animate-pulse rounded bg-[#eceee9]" />
                                            </div>

                                        </div>

                                    </td>

                                    {/* Code */}
                                    <td className="px-4 py-4">

                                        <div className="h-7 w-20 animate-pulse rounded-md bg-[#eef0ec]" />

                                    </td>

                                    {/* Date */}
                                    <td className="px-4 py-4">

                                        <div className="h-3 w-24 animate-pulse rounded bg-[#e8ebe5]" />

                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4 text-center">

                                        <div className="mx-auto h-6 w-20 animate-pulse rounded-full bg-[#e8ebe5]" />

                                    </td>

                                    {/* Check In */}
                                    <td className="px-4 py-4">

                                        <div className="h-3 w-16 animate-pulse rounded bg-[#eceee9]" />

                                    </td>

                                    {/* Check Out */}
                                    <td className="px-4 py-4">

                                        <div className="h-3 w-16 animate-pulse rounded bg-[#eceee9]" />

                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-4">

                                        <div className="flex justify-end gap-1">

                                            <div className="h-8 w-8 animate-pulse rounded-lg bg-[#eef0ec]" />

                                            <div className="h-8 w-8 animate-pulse rounded-lg bg-[#eef0ec]" />

                                            <div className="h-8 w-8 animate-pulse rounded-lg bg-[#eef0ec]" />

                                        </div>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>
                </table>
            </div>

            {/* =========================================================
                Footer
            ========================================================= */}
            <div className="flex items-center justify-between border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3.5 md:px-6">

                <div className="h-2.5 w-28 animate-pulse rounded bg-[#e1e4df]" />

                <div className="flex items-center gap-2">

                    <div className="h-8 w-16 animate-pulse rounded-lg bg-[#e8ebe5]" />

                    <div className="h-8 w-16 animate-pulse rounded-lg bg-[#e8ebe5]" />

                </div>

            </div>
        </section>
    );
}

// ===========================================================================
// Skeleton Header Cell
// ===========================================================================

function SkeletonHeader({
    width,
}) {
    return (
        <th className="px-4 py-3.5 first:pl-5 last:pr-5 md:first:pl-6 md:last:pr-6">
            <div
                className={`h-2 animate-pulse rounded bg-[#e3e6e0] ${width}`}
            />
        </th>
    );
}