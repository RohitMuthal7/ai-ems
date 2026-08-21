import {
    useEffect,
    useState,
} from "react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import ImageUpload from "./ImageUpload";

// ===========================================================================
// File: src/components/employee/EmployeeForm.jsx
// ===========================================================================

const EMPTY_FORM = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
    address: "",
};

export default function EmployeeForm({
    onSubmit,
    employee = null,
}) {
    const [image, setImage] =
        useState(null);

    const [form, setForm] =
        useState(EMPTY_FORM);

    const [submitting, setSubmitting] =
        useState(false);

    useEffect(() => {
        if (employee) {
            setForm({
                fullName:
                    employee.fullName ||
                    employee.name ||
                    "",

                email:
                    employee.email ||
                    "",

                phone:
                    employee.phone ||
                    "",

                dob:
                    employee.dob ||
                    "",

                gender:
                    employee.gender ||
                    "",

                department:
                    employee.department ||
                    "",

                designation:
                    employee.designation ||
                    employee.role ||
                    "",

                joiningDate:
                    employee.joiningDate ||
                    "",

                salary:
                    employee.salary ??
                    "",

                address:
                    employee.address ||
                    "",
            });

            setImage(null);
        } else {
            setForm({
                ...EMPTY_FORM,
            });

            setImage(null);
        }
    }, [employee]);

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (submitting) {
            return;
        }

        setSubmitting(true);

        try {
            /*
             * IMPORTANT:
             * Only send fields supported by
             * CreateEmployeeRequest / UpdateEmployeeRequest.
             *
             * The selected image is intentionally
             * NOT included here.
             */
            const employeePayload = {
                fullName:
                    form.fullName.trim(),

                email:
                    form.email.trim(),

                phone:
                    form.phone.trim(),

                gender:
                    form.gender,

                dob:
                    form.dob || null,

                address:
                    form.address.trim(),

                department:
                    form.department.trim(),

                designation:
                    form.designation.trim(),

                salary:
                    form.salary === ""
                        ? null
                        : Number(
                              form.salary
                          ),

                joiningDate:
                    form.joiningDate ||
                    null,
            };

            await onSubmit?.(
                employeePayload
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-7"
        >
            {/* =====================================================
                Profile Photo
            ===================================================== */}
            <section className="rounded-2xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-5">
                <div className="mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Profile Photo
                    </h3>

                    <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                        Choose an employee profile image.
                    </p>
                </div>

                <ImageUpload
                    image={image}
                    onImageChange={
                        setImage
                    }
                    onRemove={() =>
                        setImage(null)
                    }
                />

                <p className="mt-3 text-[9px] leading-4 text-[#9ca191]">
                    Profile image upload is handled
                    separately from employee creation.
                </p>
            </section>

            {/* =====================================================
                Personal Information
            ===================================================== */}
            <section>
                <div className="mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Personal Information
                    </h3>

                    <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                        Basic employee identity and contact details.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <FormInput
                        label="Full Name"
                        name="fullName"
                        value={
                            form.fullName
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter full name"
                        required
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={
                            form.email
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="employee@company.com"
                        required
                    />

                    <FormInput
                        label="Phone"
                        name="phone"
                        value={
                            form.phone
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="10-digit mobile number"
                        required
                    />

                    <FormInput
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={
                            form.dob
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <FormSelect
                        label="Gender"
                        name="gender"
                        value={
                            form.gender
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Select gender"
                        options={[
                            {
                                value: "Male",
                                label: "Male",
                            },
                            {
                                value: "Female",
                                label: "Female",
                            },
                            {
                                value: "Other",
                                label: "Other",
                            },
                        ]}
                    />

                    <FormInput
                        label="Joining Date"
                        name="joiningDate"
                        type="date"
                        value={
                            form.joiningDate
                        }
                        onChange={
                            handleChange
                        }
                    />
                </div>
            </section>

            {/* =====================================================
                Employment Information
            ===================================================== */}
            <section className="border-t border-[#ced0c8]/40 pt-7">
                <div className="mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Employment Information
                    </h3>

                    <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                        Department, designation and compensation.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <FormSelect
                        label="Department"
                        name="department"
                        value={
                            form.department
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Select department"
                        options={[
                            {
                                value: "IT",
                                label: "IT",
                            },
                            {
                                value: "HR",
                                label: "HR",
                            },
                            {
                                value: "Finance",
                                label: "Finance",
                            },
                            {
                                value: "Sales",
                                label: "Sales",
                            },
                        ]}
                        required
                    />

                    <FormInput
                        label="Designation"
                        name="designation"
                        value={
                            form.designation
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="e.g. Java Developer"
                    />

                    <FormInput
                        label="Salary"
                        name="salary"
                        type="number"
                        value={
                            form.salary
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter salary"
                    />
                </div>
            </section>

            {/* =====================================================
                Address
            ===================================================== */}
            <section className="border-t border-[#ced0c8]/40 pt-7">
                <div className="mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Address
                    </h3>

                    <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                        Employee residential information.
                    </p>
                </div>

                <FormTextarea
                    label="Address"
                    name="address"
                    value={
                        form.address
                    }
                    onChange={
                        handleChange
                    }
                    placeholder="Enter complete address"
                    rows={4}
                />
            </section>

            {/* =====================================================
                Submit
            ===================================================== */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#ced0c8]/40 pt-6 sm:flex-row sm:items-center sm:justify-end">

                <button
                    type="submit"
                    disabled={
                        submitting
                    }
                    className="rounded-lg bg-[#31749b] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting
                        ? employee
                            ? "Updating..."
                            : "Creating..."
                        : employee
                        ? "Update Employee"
                        : "Create Employee"}
                </button>
            </div>
        </form>
    );
}