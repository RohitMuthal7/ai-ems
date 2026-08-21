import { Bot } from "lucide-react";

// ===========================================================================
// File: src/components/ai/TypingIndicator.jsx
// ===========================================================================

export default function TypingIndicator() {
    return (
        <div className="flex w-full items-start gap-3">

            {/* =========================================================
                AI Avatar
            ========================================================= */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#31749b] text-white shadow-sm">
                <Bot
                    size={16}
                    strokeWidth={2.2}
                />
            </div>

            {/* =========================================================
                Typing Bubble
            ========================================================= */}
            <div className="rounded-2xl rounded-tl-md border border-[#ced0c8]/50 bg-white px-4 py-3 shadow-sm">

                <div className="flex items-center gap-3">

                    {/* Typing Dots */}
                    <div className="flex items-center gap-1">

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#31749b]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#31749b] [animation-delay:150ms]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#31749b] [animation-delay:300ms]" />

                    </div>

                    <span className="text-[10px] font-medium text-[#696e5e]">
                        AI is thinking...
                    </span>

                </div>

            </div>
        </div>
    );
}