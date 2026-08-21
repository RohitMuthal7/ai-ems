import {
    SendHorizontal,
    Trash2,
    Sparkles,
} from "lucide-react";

import {
    useEffect,
    useRef,
} from "react";

// ===========================================================================
// File: src/components/ai/AIInput.jsx
// ===========================================================================

export default function AIInput({
    value,
    onChange,
    onSend,
    onClear,
    disabled = false,
}) {
    const textareaRef =
        useRef(null);

    // ============================================================
    // Auto Resize
    // ============================================================

    useEffect(() => {
        const textarea =
            textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.style.height =
            "auto";

        const nextHeight =
            Math.min(
                textarea.scrollHeight,
                120
            );

        textarea.style.height =
            `${nextHeight}px`;

    }, [value]);

    // ============================================================
    // Keyboard
    // ============================================================

    const handleKeyDown =
        (event) => {

            if (
                event.key ===
                    "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                if (
                    !disabled &&
                    value.trim()
                ) {
                    onSend?.();
                }
            }
        };

    // ============================================================
    // Clear
    // ============================================================

    const handleClear = () => {

        if (disabled) {
            return;
        }

        onClear?.();
    };

    // ============================================================
    // Send
    // ============================================================

    const handleSend = () => {

        if (
            disabled ||
            !value.trim()
        ) {
            return;
        }

        onSend?.();
    };

    const hasText =
        Boolean(
            value.trim()
        );

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="w-full">

            {/* =====================================================
                Composer
            ===================================================== */}

            <div
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
                    disabled
                        ? "border-[#ced0c8]/50 bg-[#f8f9f7]"
                        : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus-within:border-[#31749b] focus-within:ring-2 focus-within:ring-[#31749b]/10"
                }`}
            >

                {/* =================================================
                    Text Input
                ================================================= */}

                <div className="relative">

                    <Sparkles
                        size={15}
                        strokeWidth={
                            2.2
                        }
                        className="pointer-events-none absolute left-4 top-4 text-[#9ca191]"
                    />

                    <textarea
                        ref={
                            textareaRef
                        }
                        rows={1}
                        value={
                            value
                        }
                        disabled={
                            disabled
                        }
                        onChange={(
                            event
                        ) =>
                            onChange?.(
                                event
                                    .target
                                    .value
                            )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        placeholder="Ask about attendance, leave, payroll or reports..."
                        aria-label="Ask AI"
                        className="max-h-[120px] min-h-[62px] w-full resize-none bg-transparent py-4 pl-10 pr-4 text-sm font-medium leading-6 text-[#0c1d27] outline-none placeholder:text-[#a5a9a0] disabled:cursor-not-allowed"
                    />

                </div>

                {/* =================================================
                    Action Bar
                ================================================= */}

                <div className="flex items-center justify-between border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-3 py-2.5">

                    {/* Clear */}
                    <button
                        type="button"
                        onClick={
                            handleClear
                        }
                        disabled={
                            disabled ||
                            !hasText
                        }
                        className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold text-[#696e5e] transition-colors hover:bg-white hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        <Trash2
                            size={13}
                            strokeWidth={
                                2.2
                            }
                        />

                        Clear
                    </button>

                    {/* Hint */}
                    <span className="hidden text-[9px] font-medium text-[#9ca191] sm:block">
                        Enter to send · Shift + Enter for new line
                    </span>

                    {/* Send */}
                    <button
                        type="button"
                        onClick={
                            handleSend
                        }
                        disabled={
                            disabled ||
                            !hasText
                        }
                        aria-label="Send message"
                        title="Send message"
                        className="flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg bg-[#31749b] px-3 text-white shadow-sm transition-all duration-150 hover:bg-[#255774] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        <SendHorizontal
                            size={15}
                            strokeWidth={
                                2.3
                            }
                        />

                        <span className="hidden text-[10px] font-bold sm:inline">
                            Send
                        </span>
                    </button>

                </div>

            </div>

            {/* =====================================================
                Disclaimer
            ===================================================== */}

            <p className="mt-2 text-center text-[9px] font-medium text-[#9ca191]">
                AI responses may be inaccurate. Verify important HR information.
            </p>

        </div>
    );
}