import {
    Bot,
    X,
    Sparkles,
    CircleCheck,
} from "lucide-react";

import AIChat from "./AIChat";

// ===========================================================================
// File: src/components/ai/AIAssistantDrawer.jsx
// ===========================================================================

export default function AIAssistantDrawer({
    open,
    onClose,
}) {
    if (!open) {
        return null;
    }

    return (
        <>
            {/* =============================================================
                Backdrop
            ============================================================= */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-[#0c1d27]/35 backdrop-blur-[2px]"
            />

            {/* =============================================================
                Drawer
            ============================================================= */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-assistant-title"
                className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[520px] flex-col overflow-hidden border-l border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
            >

                {/* =========================================================
                    Header
                ========================================================= */}
                <header className="shrink-0 border-b border-[#ced0c8]/50 bg-[#f8f9f7]">

                    <div className="flex items-center justify-between px-5 py-4 md:px-6">

                        <div className="flex min-w-0 items-center gap-3">

                            {/* AI Icon */}
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#31749b] text-white shadow-sm">

                                <Bot
                                    size={20}
                                    strokeWidth={2.2}
                                />

                                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[#f8f9f7] bg-[#9ac837]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                </span>

                            </div>

                            {/* Title */}
                            <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                    <h2
                                        id="ai-assistant-title"
                                        className="truncate text-base font-bold text-[#0c1d27]"
                                    >
                                        AI Assistant
                                    </h2>

                                    <span className="hidden items-center gap-1 rounded-full border border-[#b9d9ea]/60 bg-[#ecf4f9] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#31749b] sm:inline-flex">

                                        <Sparkles
                                            size={9}
                                        />

                                        AI

                                    </span>

                                </div>

                                <p className="mt-0.5 text-[10px] font-medium text-[#696e5e]">
                                    Smart Employee Assistant
                                </p>

                            </div>
                        </div>

                        {/* Close */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close AI assistant"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                        >
                            <X
                                size={18}
                                strokeWidth={2.2}
                            />
                        </button>

                    </div>

                    {/* =====================================================
                        Status Bar
                    ===================================================== */}
                    <div className="flex items-center gap-2 border-t border-[#ced0c8]/30 px-5 py-2.5 md:px-6">

                        <CircleCheck
                            size={13}
                            strokeWidth={2.2}
                            className="text-[#7ba02c]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                            Assistant ready
                        </span>

                    </div>

                </header>

                {/* =========================================================
                    Chat
                ========================================================= */}
                <div className="min-h-0 flex-1 overflow-hidden bg-white">

                    <AIChat />

                </div>

            </aside>
        </>
    );
}