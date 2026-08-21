import React from "react";
import {
    ChevronDown,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/FormSelect.jsx
// ===========================================================================

export default function FormSelect({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select",
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

            <div className="relative">

                <select
                    id={name}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    disabled={disabled}
                    aria-invalid={
                        Boolean(error)
                    }
                    aria-describedby={
                        error
                            ? `${name}-error`
                            : undefined
                    }
                    className={`h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 ${
                        error
                            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                            : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                    } ${
                        disabled
                            ? "cursor-not-allowed bg-[#f3f4f0] text-[#9ca191]"
                            : ""
                    }`}
                >
                    <option value="">
                        {placeholder}
                    </option>

                    {options.map(
                        (option) => (
                            <option
                                key={
                                    option.value
                                }
                                value={
                                    option.value
                                }
                            >
                                {
                                    option.label
                                }
                            </option>
                        )
                    )}
                </select>

                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
                />
            </div>

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