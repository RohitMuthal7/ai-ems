import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

export default function AddLeaveModal({

    open,

    employees,

    onClose,

    onSave,

}) {

    const [formData, setFormData] = useState({

        employeeId: "",

        leaveType: "CASUAL",

        startDate: "",

        endDate: "",

        reason: "",

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setFormData({

                employeeId: "",

                leaveType: "CASUAL",

                startDate: "",

                endDate: "",

                reason: "",

            });

            setLoading(false);

        }

    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await onSave(formData);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Apply Leave

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            Submit a new leave request

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 hover:bg-slate-100"

                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Form */}

                <form

                    onSubmit={handleSubmit}

                    className="space-y-5 p-6"

                >

                    {/* Employee */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Employee

                        </label>

                        <select

                            name="employeeId"

                            value={formData.employeeId}

                            onChange={handleChange}

                            required

                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#31749b]"

                        >

                            <option value="">

                                Select Employee

                            </option>

                            {

                                employees.map(employee => (

                                    <option

                                        key={employee.id}

                                        value={employee.id}

                                    >

                                        {employee.fullName}

                                        {" - "}

                                        {employee.employeeCode}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Leave Type */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Leave Type

                        </label>

                        <select

                            name="leaveType"

                            value={formData.leaveType}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-slate-300 px-4 py-3"

                        >

                            <option value="CASUAL">Casual</option>

                            <option value="SICK">Sick</option>

                            <option value="EARNED">Earned</option>

                            <option value="MATERNITY">Maternity</option>

                            <option value="PATERNITY">Paternity</option>

                            <option value="UNPAID">Unpaid</option>

                            <option value="EMERGENCY">Emergency</option>

                            <option value="MARRIAGE">Marriage</option>

                            <option value="BEREAVEMENT">Bereavement</option>

                            <option value="COMPENSATORY">Compensatory</option>

                            <option value="STUDY">Study</option>

                            <option value="OPTIONAL_HOLIDAY">

                                Optional Holiday

                            </option>

                            <option value="WORK_FROM_HOME">

                                Work From Home

                            </option>

                            <option value="OTHER">

                                Other

                            </option>

                        </select>

                    </div>

                    {/* Dates */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-2 block text-sm font-semibold">

                                Start Date

                            </label>

                            <input

                                type="date"

                                name="startDate"

                                value={formData.startDate}

                                onChange={handleChange}

                                required

                                className="w-full rounded-xl border border-slate-300 px-4 py-3"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold">

                                End Date

                            </label>

                            <input

                                type="date"

                                name="endDate"

                                value={formData.endDate}

                                onChange={handleChange}

                                required

                                className="w-full rounded-xl border border-slate-300 px-4 py-3"

                            />

                        </div>

                    </div>

                    {/* Reason */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Reason

                        </label>

                        <textarea

                            rows={4}

                            name="reason"

                            value={formData.reason}

                            onChange={handleChange}

                            required

                            className="w-full rounded-xl border border-slate-300 px-4 py-3"

                        />

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t pt-5">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="flex items-center gap-2 rounded-xl bg-[#31749b] px-5 py-2.5 font-medium text-white hover:bg-[#255774]"

                        >

                            <Save size={18} />

                            {

                                loading

                                    ? "Submitting..."

                                    : "Apply Leave"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}