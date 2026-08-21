// ============================================================================
// File: src/components/employee/StatusBadge.jsx
// ============================================================================

import { Clock, UserCheck, UserMinus } from "lucide-react";

const BADGE_STYLES = Object.freeze({
    Active: "bg-[#f5faeb] text-[#5c7821] border-[#d7e9af]",
    "On Leave": "bg-amber-50 text-amber-700 border-amber-200",
    Inactive: "bg-[#f3f4f0] text-[#696e5e] border-[#ced0c8]",
});

const BADGE_ICONS = Object.freeze({
    Active: <UserCheck className="w-3 h-3 mr-1" />,
    "On Leave": <Clock className="w-3 h-3 mr-1" />,
    Inactive: <UserMinus className="w-3 h-3 mr-1" />,
});

export default function StatusBadge({ status }) {
    const badgeStyle = BADGE_STYLES[status] ?? BADGE_STYLES.Inactive;
    const badgeIcon = BADGE_ICONS[status] ?? BADGE_ICONS.Inactive;

    return (
        <span
            className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${badgeStyle}`}
        >
            {badgeIcon}
            {status}
        </span>
    );
}