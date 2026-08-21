import { useState, useRef, useEffect } from "react";
import {
    MoreVertical,
    Eye,
    Pencil,
    CalendarDays,
    Wallet,
    UserMinus,
    Trash2,
} from "lucide-react";

export default function ActionMenu({
    employee,
    onView,
    onEdit,
    onAttendance,
    onPayroll,
    onDeactivate,
    onDelete,
}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const menuItems = [
        {
            label: "View Profile",
            icon: Eye,
            onClick: () => onView?.(employee),
        },
        {
            label: "Edit Employee",
            icon: Pencil,
            onClick: () => onEdit?.(employee),
        },
        {
            label: "Attendance",
            icon: CalendarDays,
            onClick: () => onAttendance?.(employee),
        },
        {
            label: "Payroll",
            icon: Wallet,
            onClick: () => onPayroll?.(employee),
        },
        {
            label: "Deactivate",
            icon: UserMinus,
            onClick: () => onDeactivate?.(employee),
        },
        {
            label: "Delete",
            icon: Trash2,
            danger: true,
            onClick: () => onDelete?.(employee),
        },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="rounded-lg p-2 hover:bg-[#f3f4f0]"
            >
                <MoreVertical size={18} />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-[#ced0c8] bg-white shadow-xl">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                onClick={() => {
                                    item.onClick();
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[#f3f4f0]
                                    ${
                                        item.danger
                                            ? "text-red-600"
                                            : "text-[#183a4e]"
                                    }`}
                            >
                                <Icon size={16} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}