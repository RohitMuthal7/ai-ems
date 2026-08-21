import { useEffect, useState } from "react";

export default function EditAttendanceModal({

    open,

    attendance,

    onClose,

    onSave,

}) {

    const [form, setForm] = useState({

        checkIn: "",

        checkOut: "",

        remarks: "",

    });

    useEffect(() => {

        if (attendance) {

            setForm({

                checkIn: attendance.checkIn || "",

                checkOut: attendance.checkOut || "",

                remarks: attendance.remarks || "",

            });

        }

    }, [attendance]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6">

                <h2 className="mb-6 text-2xl font-bold">

                    Edit Attendance

                </h2>

                <div className="space-y-5">

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Check In

                        </label>

                        <input

                            type="time"

                            value={form.checkIn}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    checkIn: e.target.value,
                                })
                            }

                            className="w-full rounded-lg border p-3"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Check Out

                        </label>

                        <input

                            type="time"

                            value={form.checkOut}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    checkOut: e.target.value,
                                })
                            }

                            className="w-full rounded-lg border p-3"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Remarks

                        </label>

                        <textarea

                            rows={4}

                            value={form.remarks}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    remarks: e.target.value,
                                })
                            }

                            className="w-full rounded-lg border p-3"

                        />

                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-lg border px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={() => onSave(form)}

                        className="rounded-lg bg-[#31749b] px-5 py-2 text-white"

                    >

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    );

}