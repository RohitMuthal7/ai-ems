import {
    MessageSquare,
    Trash2,
    Search,
    Clock3,
    X,
} from "lucide-react";

import { useMemo, useState } from "react";

// ===========================================================================
// File: src/components/ai/ChatHistory.jsx
// ===========================================================================

export default function ChatHistory({
    history = [],
    onSelect,
    onClear,
}) {
    const [search, setSearch] =
        useState("");

    const filteredHistory =
        useMemo(() => {

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            if (!keyword) {
                return history;
            }

            return history.filter(
                (item) =>
                    String(item)
                        .toLowerCase()
                        .includes(
                            keyword
                        )
            );

        }, [
            history,
            search,
        ]);

    return (
        <div className="flex h-full min-h-0 flex-col bg-white">

            {/* =========================================================
                Header
            ========================================================= */}
            <header className="shrink-0 border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                            <Clock3
                                size={17}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>

                            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                                Chat History
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                Your previous AI conversations
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={
                            onClear
                        }
                        disabled={
                            history.length === 0
                        }
                        aria-label="Clear chat history"
                        title="Clear chat history"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Trash2
                            size={15}
                            strokeWidth={2.2}
                        />
                    </button>

                </div>

            </header>

            {/* =========================================================
                Search
            ========================================================= */}
            {history.length >
                0 && (
                <div className="shrink-0 border-b border-[#ced0c8]/40 bg-white px-5 py-3">

                    <div className="relative">

                        <Search
                            size={15}
                            strokeWidth={2.2}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
                        />

                        <input
                            type="text"
                            value={
                                search
                            }
                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Search conversations..."
                            aria-label="Search chat history"
                            className="h-9 w-full rounded-lg border border-[#ced0c8]/70 bg-[#f8f9f7] pl-9 pr-9 text-xs font-medium text-[#183a4e] outline-none transition-all placeholder:text-[#a5a9a0] focus:border-[#31749b] focus:bg-white focus:ring-2 focus:ring-[#31749b]/10"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() =>
                                    setSearch(
                                        ""
                                    )
                                }
                                aria-label="Clear search"
                                className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-[#9ca191] hover:bg-white hover:text-[#0c1d27]"
                            >
                                <X
                                    size={12}
                                />
                            </button>
                        )}

                    </div>
                </div>
            )}

            {/* =========================================================
                History
            ========================================================= */}
            <div className="min-h-0 flex-1 overflow-y-auto">

                {history.length ===
                    0 ? (

                    <EmptyHistory />

                ) : filteredHistory.length ===
                  0 ? (

                    <NoSearchResults
                        search={
                            search
                        }
                        onClear={() =>
                            setSearch(
                                ""
                            )
                        }
                    />

                ) : (

                    <div className="divide-y divide-[#ced0c8]/35">

                        {filteredHistory.map(
                            (
                                item,
                                index
                            ) => (

                                <HistoryItem
                                    key={`${item}-${index}`}
                                    item={
                                        item
                                    }
                                    onSelect={
                                        onSelect
                                    }
                                />

                            )
                        )}

                    </div>
                )}

            </div>

            {/* =========================================================
                Footer
            ========================================================= */}
            {history.length >
                0 && (
                <footer className="shrink-0 border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3">

                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                        {filteredHistory.length}{" "}
                        {filteredHistory.length ===
                        1
                            ? "conversation"
                            : "conversations"}
                    </p>

                </footer>
            )}

        </div>
    );
}

// ===========================================================================
// History Item
// ===========================================================================

function HistoryItem({
    item,
    onSelect,
}) {
    return (
        <button
            type="button"
            onClick={() =>
                onSelect?.(
                    item
                )
            }
            className="group flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 hover:bg-[#f8faf9] focus:outline-none focus-visible:bg-[#f8faf9]"
        >

            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b] transition-colors group-hover:bg-[#dfeff7]">
                <MessageSquare
                    size={15}
                    strokeWidth={2.2}
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-semibold text-[#183a4e]">
                    {item}
                </p>

                <div className="mt-1 flex items-center gap-1.5">

                    <Clock3
                        size={10}
                        className="text-[#9ca191]"
                    />

                    <span className="text-[9px] font-medium text-[#9ca191]">
                        Conversation
                    </span>

                </div>

            </div>

        </button>
    );
}

// ===========================================================================
// Empty History
// ===========================================================================

function EmptyHistory() {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f4f0] text-[#9ca191]">
                <MessageSquare
                    size={21}
                    strokeWidth={2}
                />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#0c1d27]">
                No conversations yet
            </h3>

            <p className="mt-1.5 max-w-xs text-[10px] font-medium leading-5 text-[#696e5e]">
                Your saved AI conversations will appear here.
            </p>

        </div>
    );
}

// ===========================================================================
// No Search Results
// ===========================================================================

function NoSearchResults({
    search,
    onClear,
}) {
    return (
        <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f4f0] text-[#9ca191]">
                <Search
                    size={19}
                    strokeWidth={2}
                />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#0c1d27]">
                No matches found
            </h3>

            <p className="mt-1.5 max-w-xs text-[10px] font-medium leading-5 text-[#696e5e]">
                No conversation matches{" "}
                <span className="font-bold text-[#183a4e]">
                    "{search}"
                </span>
                .
            </p>

            <button
                type="button"
                onClick={
                    onClear
                }
                className="mt-4 rounded-lg border border-[#ced0c8]/70 bg-white px-3 py-2 text-[10px] font-bold text-[#4f5346] transition-colors hover:bg-[#f3f4f0]"
            >
                Clear Search
            </button>

        </div>
    );
}