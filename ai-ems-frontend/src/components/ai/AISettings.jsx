import {
    Trash2,
    Moon,
    Sun,
    Download,
    Settings2,
} from "lucide-react";

// ===========================================================================
// File: src/components/ai/AISettings.jsx
// ===========================================================================

export default function AISettings({
    onClear,
    darkMode,
    onToggleTheme,
    onExport,
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center gap-3 border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                    <Settings2
                        size={17}
                        strokeWidth={2.2}
                    />
                </div>

                <div>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        AI Settings
                    </h2>

                    <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                        Manage your assistant preferences
                    </p>
                </div>

            </div>

            {/* =========================================================
                Settings
            ========================================================= */}
            <div className="p-4">

                {/* Theme */}
                <SettingsButton
                    icon={
                        darkMode ? (
                            <Sun
                                size={17}
                                strokeWidth={2.2}
                            />
                        ) : (
                            <Moon
                                size={17}
                                strokeWidth={2.2}
                            />
                        )
                    }
                    title={
                        darkMode
                            ? "Switch to Light Theme"
                            : "Switch to Dark Theme"
                    }
                    description={
                        darkMode
                            ? "Use the light appearance for the AI assistant."
                            : "Use the dark appearance for the AI assistant."
                    }
                    onClick={
                        onToggleTheme
                    }
                />

                {/* Export */}
                <SettingsButton
                    icon={
                        <Download
                            size={17}
                            strokeWidth={2.2}
                        />
                    }
                    title="Export Chat"
                    description="Save the current AI conversation."
                    onClick={
                        onExport
                    }
                />

                {/* Divider */}
                <div className="my-2 border-t border-[#ced0c8]/40" />

                {/* Clear */}
                <SettingsButton
                    destructive
                    icon={
                        <Trash2
                            size={17}
                            strokeWidth={2.2}
                        />
                    }
                    title="Clear Conversation"
                    description="Remove all messages from the current chat."
                    onClick={
                        onClear
                    }
                />

            </div>
        </section>
    );
}

// ===========================================================================
// Settings Button
// ===========================================================================

function SettingsButton({
    icon,
    title,
    description,
    onClick,
    destructive = false,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 ${
                destructive
                    ? "hover:bg-rose-50"
                    : "hover:bg-[#f8f9f7]"
            }`}
        >
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    destructive
                        ? "bg-rose-50 text-rose-600 group-hover:bg-rose-100"
                        : "bg-[#f3f4f0] text-[#696e5e] group-hover:bg-[#ecf4f9] group-hover:text-[#31749b]"
                }`}
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1">

                <p
                    className={`text-xs font-bold ${
                        destructive
                            ? "text-rose-600"
                            : "text-[#183a4e]"
                    }`}
                >
                    {title}
                </p>

                <p className="mt-0.5 text-[10px] font-medium leading-4 text-[#9ca191]">
                    {description}
                </p>

            </div>
        </button>
    );
}