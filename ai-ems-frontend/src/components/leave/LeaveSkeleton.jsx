export default function LeaveSkeleton() {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="animate-pulse space-y-4">

                {

                    [...Array(8)].map((_, index) => (

                        <div

                            key={index}

                            className="h-12 rounded-lg bg-slate-200"

                        />

                    ))

                }

            </div>

        </div>

    );

}