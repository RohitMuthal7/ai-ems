import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Bot,
    Check,
    Clipboard,
    RefreshCw,
    Send,
    Sparkles,
    Trash2,
    UserRound,
} from "lucide-react";

import { askAI } from "../../api/aiApi";
import { getProfile } from "../../api/profileApi";

// ===========================================================================
// File: src/components/ai/EmployeeAIChat.jsx
// Employee AI Chat
// ===========================================================================


// ===========================================================================
// Message Factory
// ===========================================================================

const createMessage = (
    role,
    content
) => ({
    id:
        `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 9)}`,

    role,

    content,

    createdAt:
        new Date(),
});


// ===========================================================================
// Stored User
// ===========================================================================

const getStoredUser = () => {

    try {

        const stored =
            localStorage.getItem("user");

        if (!stored) {
            return null;
        }

        return JSON.parse(
            stored
        );

    } catch {

        return null;
    }
};


// ===========================================================================
// Get Name
// ===========================================================================

const getNameFromStoredUser = (
    storedUser
) => {

    if (!storedUser) {
        return "";
    }

    return (
        storedUser.fullName ||
        storedUser.name ||
        storedUser.user?.fullName ||
        storedUser.user?.name ||
        ""
    );
};


// ===========================================================================
// Welcome Message
// ===========================================================================

const createWelcomeMessage = (
    firstName
) => {

    const name =
        firstName?.trim() ||
        "there";

    return createMessage(
        "assistant",
        `Hello ${name}.

I'm your Employee AI Assistant.

I can help you with:

• Your attendance
• Your leave information
• Your payroll and payslip
• Holidays
• Your profile
• Workplace questions
• Java and Spring Boot
• Coding and interview preparation
• English and professional writing
• General learning and productivity

You can also chat with me naturally.

What would you like to know?`
    );
};


// ===========================================================================
// Markdown Helpers
// ===========================================================================

const parseTableRow = (
    line
) => {

    return line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(
            (cell) =>
                cell.trim()
        );
};


const isTableSeparator = (
    line
) => {

    const cells =
        parseTableRow(line);

    return (
        cells.length > 0 &&
        cells.every(
            (cell) =>
                /^:?-{3,}:?$/.test(
                    cell
                )
        )
    );
};


const renderInlineMarkdown = (
    text
) => {

    if (!text) {
        return null;
    }


    const parts = [];

    let remaining =
        text;


    const tokenPattern =
        /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;


    let lastIndex = 0;

    let match;


    while (
        (
            match =
                tokenPattern.exec(
                    remaining
                )
        ) !== null
    ) {

        if (
            match.index >
            lastIndex
        ) {

            parts.push(
                <span
                    key={
                        `${match.index}-text`
                    }
                >
                    {
                        remaining.substring(
                            lastIndex,
                            match.index
                        )
                    }
                </span>
            );
        }


        const token =
            match[0];


        // ---------------------------------------------------------------
        // Bold
        // ---------------------------------------------------------------

        if (
            token.startsWith(
                "**"
            )
        ) {

            parts.push(
                <strong
                    key={
                        `${match.index}-bold`
                    }
                    className="font-bold text-[#0c1d27]"
                >
                    {
                        token.slice(
                            2,
                            -2
                        )
                    }
                </strong>
            );
        }


        // ---------------------------------------------------------------
        // Inline code
        // ---------------------------------------------------------------

        else if (
            token.startsWith("`")
        ) {

            parts.push(
                <code
                    key={
                        `${match.index}-code`
                    }
                    className="rounded-md bg-[#eef1ed] px-1.5 py-0.5 font-mono text-[11px] text-[#255774]"
                >
                    {
                        token.slice(
                            1,
                            -1
                        )
                    }
                </code>
            );
        }


        // ---------------------------------------------------------------
        // Link
        // ---------------------------------------------------------------

        else if (
            token.startsWith("[")
        ) {

            const linkMatch =
                token.match(
                    /^\[([^\]]+)\]\(([^)]+)\)$/
                );


            if (linkMatch) {

                parts.push(
                    <a
                        key={
                            `${match.index}-link`
                        }
                        href={
                            linkMatch[2]
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#31749b] underline underline-offset-2 hover:text-[#255774]"
                    >
                        {
                            linkMatch[1]
                        }
                    </a>
                );

            } else {

                parts.push(
                    <span
                        key={
                            `${match.index}-fallback`
                        }
                    >
                        {token}
                    </span>
                );
            }
        }


        lastIndex =
            match.index +
            token.length;
    }


    if (
        lastIndex <
        remaining.length
    ) {

        parts.push(
            <span
                key="remaining"
            >
                {
                    remaining.substring(
                        lastIndex
                    )
                }
            </span>
        );
    }


    return parts;
};


// ===========================================================================
// Markdown Renderer
// ===========================================================================

function MarkdownMessage({
    content,
}) {

    const lines =
        String(
            content || ""
        ).replace(
            /\r\n/g,
            "\n"
        ).split(
            "\n"
        );


    const elements = [];

    let index = 0;


    while (
        index <
        lines.length
    ) {

        const line =
            lines[index];


        // ================================================================
        // Empty Line
        // ================================================================

        if (
            !line.trim()
        ) {

            index += 1;

            continue;
        }


        // ================================================================
        // Code Block
        // ================================================================

        if (
            line.trim()
                .startsWith("```")
        ) {

            const language =
                line.trim()
                    .replace(
                        /^```/,
                        ""
                    ).trim();

            const codeLines = [];

            index += 1;


            while (
                index <
                lines.length &&
                !lines[index]
                    .trim()
                    .startsWith("```")
            ) {

                codeLines.push(
                    lines[index]
                );

                index += 1;
            }


            if (
                index <
                lines.length
            ) {

                index += 1;
            }


            elements.push(
                <div
                    key={
                        `code-${index}`
                    }
                    className="my-3 overflow-hidden rounded-xl border border-[#253746] bg-[#0c1d27]"
                >

                    {language && (
                        <div className="border-b border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            {language}
                        </div>
                    )}

                    <pre className="overflow-x-auto p-4 text-xs leading-6 text-slate-100">
                        <code>
                            {
                                codeLines.join(
                                    "\n"
                                )
                            }
                        </code>
                    </pre>

                </div>
            );

            continue;
        }


        // ================================================================
        // Heading
        // ================================================================

        const headingMatch =
            line.match(
                /^(#{1,3})\s+(.+)$/
            );


        if (headingMatch) {

            const level =
                headingMatch[1]
                    .length;

            const heading =
                headingMatch[2];


            const classes =
                level === 1
                    ? "text-base font-bold text-[#0c1d27]"
                    : level === 2
                        ? "text-sm font-bold text-[#0c1d27]"
                        : "text-sm font-semibold text-[#31749b]";


            elements.push(
                <div
                    key={
                        `heading-${index}`
                    }
                    className={`mt-4 first:mt-0 ${classes}`}
                >
                    {
                        renderInlineMarkdown(
                            heading
                        )
                    }
                </div>
            );

            index += 1;

            continue;
        }


        // ================================================================
        // Table
        // ================================================================

        if (
            line.includes("|") &&
            index + 1 <
                lines.length &&
            isTableSeparator(
                lines[index + 1]
            )
        ) {

            const headers =
                parseTableRow(
                    line
                );

            index += 2;


            const rows = [];


            while (
                index <
                    lines.length &&
                lines[index]
                    .includes("|") &&
                lines[index]
                    .trim()
            ) {

                rows.push(
                    parseTableRow(
                        lines[index]
                    )
                );

                index += 1;
            }


            elements.push(
                <div
                    key={
                        `table-${index}`
                    }
                    className="my-3 overflow-x-auto rounded-xl border border-[#dfe4dc]"
                >

                    <table className="w-full min-w-[360px] border-collapse text-left text-xs">

                        <thead className="bg-[#f3f4f0]">

                            <tr>

                                {headers.map(
                                    (
                                        header,
                                        headerIndex
                                    ) => (

                                        <th
                                            key={
                                                headerIndex
                                            }
                                            className="border-b border-[#dfe4dc] px-3 py-2.5 font-bold text-[#344454]"
                                        >
                                            {
                                                renderInlineMarkdown(
                                                    header
                                                )
                                            }
                                        </th>

                                    )
                                )}

                            </tr>

                        </thead>


                        <tbody>

                            {rows.map(
                                (
                                    row,
                                    rowIndex
                                ) => (

                                    <tr
                                        key={
                                            rowIndex
                                        }
                                        className="border-b border-[#eef0eb] last:border-b-0"
                                    >

                                        {row.map(
                                            (
                                                cell,
                                                cellIndex
                                            ) => (

                                                <td
                                                    key={
                                                        cellIndex
                                                    }
                                                    className="px-3 py-2.5 text-[#52616d]"
                                                >
                                                    {
                                                        renderInlineMarkdown(
                                                            cell
                                                        )
                                                    }
                                                </td>

                                            )
                                        )}

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>
            );

            continue;
        }


        // ================================================================
        // Bullet List
        // ================================================================

        if (
            /^[-•*]\s+/.test(
                line.trim()
            )
        ) {

            const items = [];


            while (
                index <
                    lines.length &&
                /^[-•*]\s+/.test(
                    lines[index]
                        .trim()
                )
            ) {

                items.push(
                    lines[index]
                        .trim()
                        .replace(
                            /^[-•*]\s+/,
                            ""
                        )
                );

                index += 1;
            }


            elements.push(
                <ul
                    key={
                        `list-${index}`
                    }
                    className="my-2 space-y-2 pl-1"
                >

                    {items.map(
                        (
                            item,
                            itemIndex
                        ) => (

                            <li
                                key={
                                    itemIndex
                                }
                                className="flex items-start gap-2"
                            >

                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#31749b]" />

                                <span className="min-w-0">
                                    {
                                        renderInlineMarkdown(
                                            item
                                        )
                                    }
                                </span>

                            </li>

                        )
                    )}

                </ul>
            );

            continue;
        }


        // ================================================================
        // Numbered List
        // ================================================================

        if (
            /^\d+\.\s+/.test(
                line.trim()
            )
        ) {

            const items = [];


            while (
                index <
                    lines.length &&
                /^\d+\.\s+/.test(
                    lines[index]
                        .trim()
                )
            ) {

                items.push(
                    lines[index]
                        .trim()
                        .replace(
                            /^\d+\.\s+/,
                            ""
                        )
                );

                index += 1;
            }


            elements.push(
                <ol
                    key={
                        `numbered-${index}`
                    }
                    className="my-2 space-y-2 pl-1"
                >

                    {items.map(
                        (
                            item,
                            itemIndex
                        ) => (

                            <li
                                key={
                                    itemIndex
                                }
                                className="flex items-start gap-3"
                            >

                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ecf4f9] text-[9px] font-bold text-[#31749b]">
                                    {
                                        itemIndex +
                                        1
                                    }
                                </span>

                                <span className="min-w-0">
                                    {
                                        renderInlineMarkdown(
                                            item
                                        )
                                    }
                                </span>

                            </li>

                        )
                    )}

                </ol>
            );

            continue;
        }


        // ================================================================
        // Normal Paragraph
        // ================================================================

        const paragraphLines = [
            line,
        ];

        index += 1;


        while (
            index <
                lines.length &&
            lines[index].trim() &&
            !/^#{1,3}\s+/.test(
                lines[index]
            ) &&
            !lines[index]
                .trim()
                .startsWith("```") &&
            !/^[-•*]\s+/.test(
                lines[index]
                    .trim()
            ) &&
            !/^\d+\.\s+/.test(
                lines[index]
                    .trim()
            )
        ) {

            paragraphLines.push(
                lines[index]
            );

            index += 1;
        }


        elements.push(
            <p
                key={
                    `paragraph-${index}`
                }
                className="leading-7"
            >
                {
                    paragraphLines.map(
                        (
                            paragraphLine,
                            lineIndex
                        ) => (
                            <span
                                key={
                                    lineIndex
                                }
                            >
                                {
                                    renderInlineMarkdown(
                                        paragraphLine
                                    )
                                }

                                {lineIndex <
                                    paragraphLines.length -
                                        1 && (
                                    <br />
                                )}

                            </span>
                        )
                    )
                }
            </p>
        );
    }


    return (
        <div className="space-y-2">
            {elements}
        </div>
    );
}


// ===========================================================================
// Assistant Message
// ===========================================================================

function EmployeeAIMessage({
    message,
    onRetry,
}) {

    const [
        copied,
        setCopied,
    ] = useState(false);


    const isError =
        message.isError === true;


    const copyResponse =
        async () => {

            try {

                await navigator.clipboard.writeText(
                    message.content
                );

                setCopied(true);

                setTimeout(
                    () => {
                        setCopied(false);
                    },
                    1500
                );

            } catch {

                // Ignore clipboard errors.
            }
        };


    return (
        <div className="flex items-start gap-3">

            {/* Avatar */}

            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#31749b] text-white shadow-sm">

                <Bot
                    size={18}
                />

            </div>


            {/* Message */}

            <div className="min-w-0 flex-1">

                <div
                    className={`rounded-2xl rounded-tl-md border px-4 py-4 shadow-sm ${
                        isError
                            ? "border-rose-200 bg-rose-50"
                            : "border-[#e1e4dd] bg-white"
                    }`}
                >

                    <div
                        className={`text-sm ${
                            isError
                                ? "text-rose-700"
                                : "text-[#344454]"
                        }`}
                    >

                        {isError ? (
                            <p className="leading-7">
                                {
                                    message.content
                                }
                            </p>
                        ) : (
                            <MarkdownMessage
                                content={
                                    message.content
                                }
                            />
                        )}

                    </div>

                </div>


                {/* Actions */}

                <div className="mt-2 flex items-center gap-1.5">

                    <span className="mr-auto px-1 text-[10px] font-medium text-[#9ca191]">

                        {message.createdAt?.toLocaleTimeString(
                            [],
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}

                    </span>


                    {!isError && (
                        <button
                            type="button"
                            onClick={
                                copyResponse
                            }
                            className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[10px] font-semibold text-[#7b8173] transition hover:bg-[#f3f4f0] hover:text-[#31749b]"
                            title="Copy response"
                        >

                            {copied ? (
                                <Check
                                    size={12}
                                />
                            ) : (
                                <Clipboard
                                    size={12}
                                />
                            )}

                            {copied
                                ? "Copied"
                                : "Copy"}

                        </button>
                    )}


                    {isError && (
                        <button
                            type="button"
                            onClick={
                                onRetry
                            }
                            className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[10px] font-bold text-[#31749b] transition hover:bg-[#ecf4f9]"
                        >

                            <RefreshCw
                                size={12}
                            />

                            Retry

                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}


// ===========================================================================
// User Message
// ===========================================================================

function EmployeeUserMessage({
    message,
}) {

    return (
        <div className="flex items-start justify-end gap-3">

            <div className="max-w-[82%]">

                <div className="rounded-2xl rounded-tr-md bg-[#31749b] px-4 py-3 text-sm font-medium leading-6 text-white shadow-sm">
                    {
                        message.content
                    }
                </div>

                <div className="mt-1 text-right text-[10px] font-medium text-[#9ca191]">

                    {message.createdAt?.toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}

                </div>

            </div>


            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0c1d27] text-white">

                <UserRound
                    size={16}
                />

            </div>

        </div>
    );
}


// ===========================================================================
// Typing Indicator
// ===========================================================================

function TypingIndicator() {

    return (
        <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#31749b] text-white">

                <Bot
                    size={18}
                />

            </div>


            <div className="rounded-2xl rounded-tl-md border border-[#e1e4dd] bg-white px-4 py-3 shadow-sm">

                <div className="flex items-center gap-1.5">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#31749b]" />

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-[#31749b]"
                        style={{
                            animationDelay:
                                "120ms",
                        }}
                    />

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-[#31749b]"
                        style={{
                            animationDelay:
                                "240ms",
                        }}
                    />

                </div>

            </div>

        </div>
    );
}


// ===========================================================================
// Main Component
// ===========================================================================

export default function EmployeeAIChat() {

    // =======================================================================
    // User
    // =======================================================================

    const storedUser =
        useMemo(
            () =>
                getStoredUser(),
            []
        );


    const [
        employeeName,
        setEmployeeName,
    ] = useState(
        getNameFromStoredUser(
            storedUser
        )
    );


    const firstName =
        useMemo(
            () => {

                const cleanName =
                    employeeName?.trim();

                if (!cleanName) {
                    return "there";
                }

                return cleanName
                    .split(/\s+/)[0];

            },
            [
                employeeName,
            ]
        );


    // =======================================================================
    // Messages
    // =======================================================================

    const [
        messages,
        setMessages,
    ] = useState(
        () => [
            createWelcomeMessage(
                getNameFromStoredUser(
                    storedUser
                )
            ),
        ]
    );


    // =======================================================================
    // Input
    // =======================================================================

    const [
        input,
        setInput,
    ] = useState("");


    // =======================================================================
    // Loading
    // =======================================================================

    const [
        loading,
        setLoading,
    ] = useState(false);


    // =======================================================================
    // Failed Prompt
    // =======================================================================

    const [
        lastFailedPrompt,
        setLastFailedPrompt,
    ] = useState("");


    // =======================================================================
    // Refs
    // =======================================================================

    const bottomRef =
        useRef(null);

    const inputRef =
        useRef(null);


    // =======================================================================
    // Load Actual Employee Profile
    // =======================================================================

    useEffect(() => {

        let active = true;


        getProfile()
            .then(
                (profile) => {

                    if (!active) {
                        return;
                    }


                    const name =
                        profile?.fullName?.trim();


                    if (!name) {
                        return;
                    }


                    setEmployeeName(
                        name
                    );


                    setMessages(
                        (current) => {

                            if (
                                current.length ===
                                    1 &&
                                current[0]?.role ===
                                    "assistant"
                            ) {

                                return [
                                    createWelcomeMessage(
                                        name.split(
                                            /\s+/
                                        )[0]
                                    ),
                                ];
                            }


                            return current;
                        }
                    );

                }
            )
            .catch(
                () => {
                    // Local storage fallback remains active.
                }
            );


        return () => {

            active = false;

        };

    }, []);


    // =======================================================================
    // Scroll
    // =======================================================================

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

    }, [
        messages,
        loading,
    ]);


    // =======================================================================
    // Focus
    // =======================================================================

    useEffect(() => {

        if (!loading) {

            inputRef.current?.focus();

        }

    }, [
        loading,
    ]);


    // =======================================================================
    // Send
    // =======================================================================

    const sendMessage =
        useCallback(
            async (
                prompt,
                options = {}
            ) => {

                const {
                    addUserMessage = true,
                    conversationMessages =
                        messages,
                } = options;


                const cleanedPrompt =
                    String(
                        prompt || ""
                    ).trim();


                if (
                    !cleanedPrompt ||
                    loading
                ) {

                    return;
                }


                setLastFailedPrompt(
                    ""
                );


                const history =
                    conversationMessages
                        .filter(
                            (message) =>
                                message.role ===
                                    "user" ||
                                message.role ===
                                    "assistant"
                        )
                        .slice(-20)
                        .map(
                            (message) => ({
                                role:
                                    message.role,
                                content:
                                    message.content,
                            })
                        );


                if (
                    addUserMessage
                ) {

                    const userMessage =
                        createMessage(
                            "user",
                            cleanedPrompt
                        );


                    setMessages(
                        (previous) => [
                            ...previous,
                            userMessage,
                        ]
                    );

                }


                setInput("");

                setLoading(true);


                try {

                    const response =
                        await askAI(
                            cleanedPrompt,
                            history
                        );


                    const answer =
                        response
                            ?.response
                            ?.trim();


                    if (!answer) {

                        throw new Error(
                            "The AI returned an empty response."
                        );
                    }


                    const aiMessage =
                        createMessage(
                            "assistant",
                            answer
                        );


                    setMessages(
                        (previous) => [
                            ...previous,
                            aiMessage,
                        ]
                    );


                } catch (
                    error
                ) {

                    console.error(
                        "Employee AI request failed:",
                        error
                    );


                    setLastFailedPrompt(
                        cleanedPrompt
                    );


                    const errorMessage =
                        createMessage(
                            "assistant",
                            "I couldn't complete that request right now. Please try again."
                        );


                    errorMessage.isError =
                        true;


                    setMessages(
                        (previous) => [
                            ...previous,
                            errorMessage,
                        ]
                    );


                } finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                loading,
                messages,
            ]
        );


    // =======================================================================
    // Retry
    // =======================================================================

    const retryLastRequest =
        useCallback(
            () => {

                if (
                    !lastFailedPrompt ||
                    loading
                ) {

                    return;
                }


                setMessages(
                    (current) =>
                        current.filter(
                            (message) =>
                                !message.isError
                        )
                );


                sendMessage(
                    lastFailedPrompt
                );

            },
            [
                lastFailedPrompt,
                loading,
                sendMessage,
            ]
        );


    // =======================================================================
    // Clear
    // =======================================================================

    const clearConversation =
        useCallback(
            () => {

                if (loading) {
                    return;
                }


                setMessages([
                    createWelcomeMessage(
                        firstName
                    ),
                ]);


                setInput("");

                setLastFailedPrompt(
                    ""
                );


                requestAnimationFrame(
                    () => {

                        inputRef.current
                            ?.focus();

                    }
                );

            },
            [
                loading,
                firstName,
            ]
        );


    // =======================================================================
    // Suggestions
    // =======================================================================

    const suggestions = [
        "Show my attendance",
        "Show my leave summary",
        "Show my latest payslip",
        "Show upcoming holidays",
        "Explain Spring Boot",
        "Help me prepare for a Java interview",
    ];


    const showSuggestions =
        messages.length === 1 &&
        messages[0]?.role ===
            "assistant";


    // =======================================================================
    // Submit
    // =======================================================================

    const handleSubmit =
        (event) => {

            event.preventDefault();

            sendMessage(
                input
            );
        };


    // =======================================================================
    // Render
    // =======================================================================

    return (
        <div className="flex h-full min-h-0 flex-col bg-white">

            {/* =============================================================
                Quick Start
            ============================================================= */}

            {showSuggestions && (

                <section className="shrink-0 border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="mb-3">

                        <div className="flex items-center gap-2">

                            <Sparkles
                                size={13}
                                className="text-[#31749b]"
                            />

                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#696e5e]">
                                Quick Start
                            </p>

                        </div>

                        <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                            Ask about your work, learning or anything you need help with.
                        </p>

                    </div>


                    <div className="grid gap-2 sm:grid-cols-2">

                        {suggestions.map(
                            (suggestion) => (

                                <button
                                    key={
                                        suggestion
                                    }
                                    type="button"
                                    disabled={
                                        loading
                                    }
                                    onClick={() =>
                                        sendMessage(
                                            suggestion
                                        )
                                    }
                                    className="rounded-xl border border-[#dfe4dc] bg-white px-3 py-2.5 text-left text-[11px] font-semibold text-[#42515d] transition hover:border-[#31749b]/30 hover:bg-[#ecf4f9] hover:text-[#255774] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {
                                        suggestion
                                    }
                                </button>

                            )
                        )}

                    </div>

                </section>
            )}


            {/* =============================================================
                Messages
            ============================================================= */}

            <main
                className="min-h-0 flex-1 overflow-y-auto bg-[#fafbf9] px-4 py-5 md:px-6 md:py-6"
                aria-live="polite"
            >

                <div className="mx-auto w-full max-w-3xl space-y-5">

                    {messages.map(
                        (message) =>
                            message.role ===
                            "user"
                                ? (
                                    <EmployeeUserMessage
                                        key={
                                            message.id
                                        }
                                        message={
                                            message
                                        }
                                    />
                                )
                                : (
                                    <EmployeeAIMessage
                                        key={
                                            message.id
                                        }
                                        message={
                                            message
                                        }
                                        onRetry={
                                            retryLastRequest
                                        }
                                    />
                                )
                    )}


                    {loading && (
                        <TypingIndicator />
                    )}


                    <div
                        ref={
                            bottomRef
                        }
                        className="h-px"
                        aria-hidden="true"
                    />

                </div>

            </main>


            {/* =============================================================
                Input
            ============================================================= */}

            <footer className="shrink-0 border-t border-[#ced0c8]/50 bg-white p-3 md:p-4">

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="mx-auto w-full max-w-3xl"
                >

                    <div className="overflow-hidden rounded-2xl border border-[#d9ded7] bg-white shadow-sm transition focus-within:border-[#31749b]/50 focus-within:ring-4 focus-within:ring-[#31749b]/10">

                        {/* =================================================
                            Input
                        ================================================= */}

                        <div className="flex items-start gap-3 px-4 pt-3.5">

                            <Sparkles
                                size={18}
                                className="mt-1 shrink-0 text-[#9ca191]"
                            />

                            <textarea
                                ref={
                                    inputRef
                                }
                                value={
                                    input
                                }
                                onChange={(
                                    event
                                ) =>
                                    setInput(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                onKeyDown={(
                                    event
                                ) => {

                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {

                                        if (
                                            event.shiftKey
                                        ) {
                                            return;
                                        }


                                        event.preventDefault();


                                        handleSubmit(
                                            event
                                        );
                                    }

                                }}
                                disabled={
                                    loading
                                }
                                rows={2}
                                maxLength={
                                    4000
                                }
                                placeholder="Ask me anything about your work, learning or AI-EMS..."
                                className="min-h-[54px] flex-1 resize-none bg-transparent text-sm font-medium leading-6 text-[#344454] outline-none placeholder:text-[#a5ab9e] disabled:cursor-not-allowed disabled:opacity-60"
                                aria-label="Employee AI message"
                            />

                        </div>


                        {/* =================================================
                            Toolbar
                        ================================================= */}

                        <div className="flex items-center justify-between gap-3 border-t border-[#eef0eb] px-3 py-2.5">

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={
                                        clearConversation
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold text-[#6f756a] transition hover:bg-[#f3f4f0] hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    <Trash2
                                        size={13}
                                    />

                                    Clear

                                </button>


                                <span className="hidden text-[9px] font-medium text-[#a0a59a] sm:inline">
                                    Enter to send • Shift + Enter for new line
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <span className="hidden text-[9px] font-medium text-[#a0a59a] sm:inline">
                                    {input.length}
                                    /4000
                                </span>


                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !input.trim()
                                    }
                                    className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#255774] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    {loading ? (
                                        <RefreshCw
                                            size={14}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Send
                                            size={14}
                                        />
                                    )}

                                    {loading
                                        ? "Thinking..."
                                        : "Send"}

                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </footer>

        </div>
    );
}