import {
    Copy,
    Check,
    RotateCcw,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

// ===========================================================================
// File: src/components/ai/AIMessageActions.jsx
// ===========================================================================

export default function AIMessageActions({
    content = "",
    onRegenerate,
    disabled = false,
}) {
    const [copied, setCopied] =
        useState(false);

    // ============================================================
    // Reset copied state when content changes
    // ============================================================

    useEffect(() => {
        setCopied(false);
    }, [content]);

    // ============================================================
    // Copy
    // ============================================================

    const handleCopy = async () => {

        if (
            disabled ||
            !content
        ) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                content
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {

            console.error(
                "Failed to copy AI response:",
                error
            );

        }
    };

    // ============================================================
    // Regenerate
    // ============================================================

    const handleRegenerate = () => {

        if (
            disabled ||
            !onRegenerate
        ) {
            return;
        }

        onRegenerate();
    };

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-within:opacity-100">

            {/* =====================================================
                Copy
            ===================================================== */}

            <button
                type="button"
                onClick={
                    handleCopy
                }
                disabled={
                    disabled ||
                    !content
                }
                aria-label={
                    copied
                        ? "Copied"
                        : "Copy response"
                }
                title={
                    copied
                        ? "Copied"
                        : "Copy response"
                }
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                    copied
                        ? "bg-[#f5faeb] text-[#7ba02c]"
                        : "text-[#9ca191] hover:bg-[#f3f4f0] hover:text-[#31749b]"
                } disabled:cursor-not-allowed disabled:opacity-40`}
            >
                {copied ? (
                    <Check
                        size={13}
                        strokeWidth={2.4}
                    />
                ) : (
                    <Copy
                        size={13}
                        strokeWidth={2.2}
                    />
                )}
            </button>

            {/* =====================================================
                Regenerate
            ===================================================== */}

            {onRegenerate && (
                <button
                    type="button"
                    onClick={
                        handleRegenerate
                    }
                    disabled={
                        disabled
                    }
                    aria-label="Regenerate response"
                    title="Regenerate response"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#9ca191] transition-colors hover:bg-[#ecf4f9] hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <RotateCcw
                        size={13}
                        strokeWidth={2.2}
                    />
                </button>
            )}

        </div>
    );
}