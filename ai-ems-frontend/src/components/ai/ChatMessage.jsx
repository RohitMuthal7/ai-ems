import {
    Bot,
    User,
} from "lucide-react";

import MarkdownMessage from "./MarkdownMessage";
import AIMessageActions from "./AIMessageActions";

// ===========================================================================
// File: src/components/ai/ChatMessage.jsx
// ===========================================================================

export default function ChatMessage({
    role,
    content,
    timestamp,
    onRegenerate,
}) {
    const isUser =
        role === "user";

    const formattedTime =
        formatTime(timestamp);

    return (
        <div
            className={`group flex w-full gap-3 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            {/* =============================================================
                Assistant Avatar
            ============================================================= */}
            {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#31749b] text-white shadow-sm">
                    <Bot
                        size={16}
                        strokeWidth={2.2}
                    />
                </div>
            )}

            {/* =============================================================
                Message Content
            ============================================================= */}
            <div
                className={`flex max-w-[88%] min-w-0 flex-col ${
                    isUser
                        ? "items-end"
                        : "items-start"
                }`}
            >
                {/* =========================================================
                    Message Bubble
                ========================================================= */}
                <div
                    className={`relative px-4 py-3 ${
                        isUser
                            ? "rounded-2xl rounded-br-md bg-[#31749b] text-white shadow-sm"
                            : "rounded-2xl rounded-tl-md border border-[#ced0c8]/50 bg-white text-[#183a4e] shadow-sm"
                    }`}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap break-words text-sm font-medium leading-6">
                            {content}
                        </p>
                    ) : (
                        <div className="break-words text-sm leading-6">
                            <MarkdownMessage
                                content={
                                    content
                                }
                            />
                        </div>
                    )}
                </div>

                {/* =========================================================
                    Meta Row
                ========================================================= */}
                <div
                    className={`mt-1.5 flex min-h-7 items-center gap-2 px-1.5 ${
                        isUser
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <span className="text-[9px] font-medium text-[#9ca191]">
                        {formattedTime}
                    </span>

                    {!isUser && (
                        <AIMessageActions
                            content={
                                content
                            }
                            onRegenerate={
                                onRegenerate
                            }
                        />
                    )}
                </div>
            </div>

            {/* =============================================================
                User Avatar
            ============================================================= */}
            {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#183a4e] text-white shadow-sm">
                    <User
                        size={15}
                        strokeWidth={2.2}
                    />
                </div>
            )}
        </div>
    );
}

// ===========================================================================
// Time Formatting
// ===========================================================================

function formatTime(
    timestamp
) {
    if (!timestamp) {
        return "";
    }

    const date =
        new Date(timestamp);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}