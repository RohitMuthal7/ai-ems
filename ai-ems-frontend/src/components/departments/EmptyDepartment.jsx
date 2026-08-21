import { Building2 } from "lucide-react";

export default function EmptyDepartment() {

    return (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-10 py-16 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                <Building2
                    size={36}
                    className="text-slate-500"
                />

            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-800">

                No Departments Found

            </h2>

            <p className="mt-2 text-sm text-slate-500">

                There are no departments available.

            </p>

        </div>

    );

}