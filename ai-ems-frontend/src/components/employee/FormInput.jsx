import React from "react";

// ===========================================================================
// File: src/components/employee/FormInput.jsx
// ===========================================================================

export default function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
}) {
    return (
        <div className="flex flex-col gap-1.5">

            <label
                htmlFor={name}
                className="text-[10px] font-bold uppercase tracking-wider text-[#4f5346]"
            >
                {label}

                {required && (
                    <span className="ml-1 text-rose-500">
                        *
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value ?? ""}
                onChange={onChange}
                placeholder={
                    placeholder
                }
                disabled={disabled}
                aria-invalid={
                    Boolean(error)
                }
                aria-describedby={
                    error
                        ? `${name}-error`
                        : undefined
                }
                className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-[#0c1d27] outline-none transition-all duration-200 placeholder:text-[#b0b4ab] ${
                    error
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                        : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                } ${
                    disabled
                        ? "cursor-not-allowed bg-[#f3f4f0] text-[#9ca191]"
                        : ""
                }`}
            />

            {error && (
                <span
                    id={`${name}-error`}
                    className="text-[10px] font-medium text-rose-500"
                >
                    {error}
                </span>
            )}
        </div>
    );
}