import React from "react";
import {
    Users,
    CheckCircle2,
    Clock,
    Building2,
    Sparkles,
    Plus,
    CreditCard,
    FileText,
    CalendarOff,
    Briefcase,
    TrendingUp,
    ShieldCheck,
    Database,
    Server,
    Cpu,
    Settings,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
} from "lucide-react";

//======================================================
// File:
// src/components/common/DynamicIcon.jsx
//======================================================

const IconMap = {
    Users,
    UserCheck: CheckCircle2,
    CalendarClock: Clock,
    Building2,
    Sparkles,
    Plus,
    Clock,
    CreditCard,
    FileText,
    CalendarOff,
    CheckCircle2,
    Briefcase,
    TrendingUp,
    ShieldCheck,
    Database,
    Server,
    Cpu,
    Settings,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
};

const DynamicIcon = ({ name, ...props }) => {
    const IconComponent = IconMap[name] ?? Activity;

    return <IconComponent {...props} />;
};

export default DynamicIcon;