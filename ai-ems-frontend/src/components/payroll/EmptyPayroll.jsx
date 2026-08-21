import { Wallet } from "lucide-react";

export default function EmptyPayroll() {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">

            <Wallet
                size={64}
                className="mx-auto text-slate-400"
            />

            <h2 className="mt-5 text-2xl font-bold text-slate-700">

                No Payroll Records Found

            </h2>

            <p className="mt-2 text-slate-500">

                No payroll data is available.

            </p>

        </div>

    );

}