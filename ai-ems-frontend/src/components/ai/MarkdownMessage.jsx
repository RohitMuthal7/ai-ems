import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ===========================================================================
// File: src/components/ai/MarkdownMessage.jsx
// ===========================================================================

function formatHolidaySection(content) {
    if (
        !content ||
        !content.includes(
            "Upcoming Holidays"
        )
    ) {
        return content;
    }

    const headingRegex =
        /(^|\n)(#{1,6}\s*)?Upcoming Holidays\s*(?=\n|$)/i;

    const headingMatch =
        content.match(
            headingRegex
        );

    if (!headingMatch) {
        return content;
    }

    const headingStart =
        headingMatch.index ?? 0;

    const headingEnd =
        headingStart +
        headingMatch[0].length;

    const beforeHeading =
        content.slice(
            0,
            headingStart
        );

    const afterHeading =
        content.slice(
            headingEnd
        );

    const nextSectionMatch =
        afterHeading.match(
            /\n#{1,6}\s+\S/
        );

    const holidaySection =
        nextSectionMatch
            ? afterHeading.slice(
                  0,
                  nextSectionMatch.index
              )
            : afterHeading;

    const remainingContent =
        nextSectionMatch
            ? afterHeading.slice(
                  nextSectionMatch.index
              )
            : "";

    const holidayRegex =
        /(.+?)\s*-\s*(\d{4}-\d{2}-\d{2})/g;

    const holidays = [];

    let match;

    while (
        (match =
            holidayRegex.exec(
                holidaySection
            )) !== null
    ) {
        const name =
            match[1]
                .replace(/\s+/g, " ")
                .replace(
                    /^[•*\-]\s*/,
                    ""
                )
                .trim();

        const date =
            match[2];

        if (name) {
            holidays.push({
                name,
                date,
            });
        }
    }

    if (
        holidays.length === 0
    ) {
        return content;
    }

    const formattedHolidays =
        holidays
            .map(
                (holiday) =>
                    `- **${holiday.name}** — ${holiday.date}`
            )
            .join("\n");

    return `${beforeHeading}## Upcoming Holidays

${formattedHolidays}
${remainingContent}`;
}

// ===========================================================================
// Markdown Message
// ===========================================================================

export default function MarkdownMessage({
    content = "",
}) {
    const formattedContent =
        formatHolidaySection(
            content
        );

    return (
        <div className="max-w-none text-sm leading-6 text-[#183a4e]">

            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                ]}
                components={{

                    // =====================================================
                    // Paragraph
                    // =====================================================

                    p: ({
                        children,
                    }) => (
                        <p className="mb-3 last:mb-0 leading-6 text-[#4f5346]">
                            {children}
                        </p>
                    ),

                    // =====================================================
                    // H1
                    // =====================================================

                    h1: ({
                        children,
                    }) => (
                        <h1 className="mb-3 mt-1 text-lg font-bold tracking-tight text-[#0c1d27]">
                            {children}
                        </h1>
                    ),

                    // =====================================================
                    // H2
                    // =====================================================

                    h2: ({
                        children,
                    }) => (
                        <h2 className="mb-3 mt-4 text-sm font-bold uppercase tracking-wide text-[#183a4e]">
                            {children}
                        </h2>
                    ),

                    // =====================================================
                    // H3
                    // =====================================================

                    h3: ({
                        children,
                    }) => (
                        <h3 className="mb-2 mt-4 text-sm font-bold text-[#183a4e]">
                            {children}
                        </h3>
                    ),

                    // =====================================================
                    // Unordered List
                    // =====================================================

                    ul: ({
                        children,
                    }) => (
                        <ul className="mb-3 ml-4 list-disc space-y-1.5 text-[#4f5346]">
                            {children}
                        </ul>
                    ),

                    // =====================================================
                    // Ordered List
                    // =====================================================

                    ol: ({
                        children,
                    }) => (
                        <ol className="mb-3 ml-4 list-decimal space-y-1.5 text-[#4f5346]">
                            {children}
                        </ol>
                    ),

                    // =====================================================
                    // List Item
                    // =====================================================

                    li: ({
                        children,
                    }) => (
                        <li className="pl-1 leading-6">
                            {children}
                        </li>
                    ),

                    // =====================================================
                    // Strong
                    // =====================================================

                    strong: ({
                        children,
                    }) => (
                        <strong className="font-bold text-[#0c1d27]">
                            {children}
                        </strong>
                    ),

                    // =====================================================
                    // Inline Code
                    // =====================================================

                    code: ({
                        inline,
                        children,
                    }) =>
                        inline ? (
                            <code className="rounded-md bg-[#f3f4f0] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#31749b]">
                                {children}
                            </code>
                        ) : (
                            <code className="block overflow-x-auto rounded-xl bg-[#0c1d27] p-4 font-mono text-xs leading-5 text-white">
                                {children}
                            </code>
                        ),

                    // =====================================================
                    // Preformatted Block
                    // =====================================================

                    pre: ({
                        children,
                    }) => (
                        <pre className="mb-4 overflow-x-auto rounded-xl">
                            {children}
                        </pre>
                    ),

                    // =====================================================
                    // Blockquote
                    // =====================================================

                    blockquote: ({
                        children,
                    }) => (
                        <blockquote className="mb-4 border-l-2 border-[#31749b] bg-[#ecf4f9] px-4 py-3 text-sm text-[#4f5346]">
                            {children}
                        </blockquote>
                    ),

                    // =====================================================
                    // Horizontal Rule
                    // =====================================================

                    hr: () => (
                        <hr className="my-4 border-[#ced0c8]/50" />
                    ),

                    // =====================================================
                    // Links
                    // =====================================================

                    a: ({
                        children,
                        href,
                    }) => (
                        <a
                            href={
                                href
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-[#31749b] underline decoration-[#b9d9ea] underline-offset-2 transition-colors hover:text-[#255774]"
                        >
                            {
                                children
                            }
                        </a>
                    ),

                    // =====================================================
                    // Table
                    // =====================================================

                    table: ({
                        children,
                    }) => (
                        <div className="mb-4 overflow-x-auto rounded-xl border border-[#ced0c8]/50">
                            <table className="min-w-full border-collapse text-xs">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({
                        children,
                    }) => (
                        <thead className="bg-[#f8f9f7]">
                            {children}
                        </thead>
                    ),

                    th: ({
                        children,
                    }) => (
                        <th className="border-b border-[#ced0c8]/50 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#696e5e]">
                            {
                                children
                            }
                        </th>
                    ),

                    td: ({
                        children,
                    }) => (
                        <td className="border-b border-[#ced0c8]/35 px-3 py-2.5 text-[#4f5346]">
                            {
                                children
                            }
                        </td>
                    ),
                }}
            >
                {
                    formattedContent
                }
            </ReactMarkdown>
        </div>
    );
}