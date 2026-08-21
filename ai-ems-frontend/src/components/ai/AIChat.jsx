import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { askAI } from "../../api/aiApi";

import PromptSuggestions from "./PromptSuggestions";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import AIInput from "./AIInput";

// ===========================================================================
// File: src/components/ai/AIChat.jsx
// ===========================================================================

const createMessage = (
    role,
    content
) => ({
    id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
    role,
    content,
    createdAt: new Date(),
});


const createWelcomeMessage = () =>
    createMessage(
        "assistant",
        `Hello Rohit.

I'm your Employee AI Assistant.

You can ask me about your attendance, leave, payroll, holidays, profile and workplace topics.

You can also chat with me about Java, Spring Boot, coding, English, writing, interview preparation, productivity and general questions.

What would you like to know?`
    );


export default function AIChat() {

    // =======================================================================
    // State
    // =======================================================================

    const [messages, setMessages] =
        useState(() => [
            createWelcomeMessage(),
        ]);

    const [input, setInput] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const bottomRef =
        useRef(null);

    const inputRef =
        useRef(null);


    // =======================================================================
    // Suggestions
    // =======================================================================

    const showSuggestions =
        messages.length === 1 &&
        messages[0]?.role === "assistant";


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

    }, [loading]);


    // =======================================================================
    // Send Message
    // =======================================================================

    const sendMessage = useCallback(
        async (
            prompt,
            options = {}
        ) => {

            const {
                addUserMessage = true,
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


            /*
             * Capture the conversation BEFORE
             * adding the new user message.
             *
             * This prevents the latest message
             * from being duplicated in the payload.
             */
            const conversation =
                messages
                    .filter(
                        (message) =>
                            message.role ===
                                "user" ||
                            message.role ===
                                "assistant"
                    )
                    .map(
                        (message) => ({
                            role:
                                message.role,
                            content:
                                message.content,
                        })
                    );


            if (addUserMessage) {

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
                        conversation
                    );

                const answer =
                    response?.response ||
                    "I couldn't generate a response right now.";

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

            } catch (error) {

                console.error(
                    "AI request failed:",
                    error
                );

                const errorMessage =
                    createMessage(
                        "assistant",
                        "Sorry, I couldn't process your request right now. Please try again."
                    );

                setMessages(
                    (previous) => [
                        ...previous,
                        errorMessage,
                    ]
                );

            } finally {

                setLoading(false);
            }

        },
        [
            loading,
            messages,
        ]
    );


    // =======================================================================
    // Suggestions
    // =======================================================================

    const handleSuggestion =
        useCallback(
            (prompt) => {

                sendMessage(
                    prompt
                );

            },
            [sendMessage]
        );


    // =======================================================================
    // Regenerate
    // =======================================================================

    const regenerateResponse =
        useCallback(
            async () => {

                if (loading) {
                    return;
                }

                const reversedIndex =
                    [...messages]
                        .reverse()
                        .findIndex(
                            (message) =>
                                message.role ===
                                "user"
                        );

                if (
                    reversedIndex ===
                    -1
                ) {

                    return;
                }

                const userIndex =
                    messages.length -
                    1 -
                    reversedIndex;

                const lastUserMessage =
                    messages[userIndex];

                if (
                    !lastUserMessage?.content
                ) {

                    return;
                }


                /*
                 * Keep conversation only up
                 * to the user message.
                 */
                setMessages(
                    (previous) =>
                        previous.filter(
                            (
                                _message,
                                index
                            ) =>
                                index <=
                                userIndex
                        )
                );


                await sendMessage(
                    lastUserMessage.content,
                    {
                        addUserMessage:
                            false,
                    }
                );

            },
            [
                messages,
                loading,
                sendMessage,
            ]
        );


    // =======================================================================
    // Clear Conversation
    // =======================================================================

    const clearConversation =
        useCallback(
            () => {

                if (loading) {
                    return;
                }

                setMessages([
                    createWelcomeMessage(),
                ]);

                setInput("");

                requestAnimationFrame(
                    () => {
                        inputRef.current?.focus();
                    }
                );

            },
            [loading]
        );


    // =======================================================================
    // Input
    // =======================================================================

    const handleInputChange =
        useCallback(
            (value) => {

                setInput(value);
            },
            []
        );


    const handleSend =
        useCallback(
            () => {

                sendMessage(
                    input
                );

            },
            [
                input,
                sendMessage,
            ]
        );


    // =======================================================================
    // Rendered Messages
    // =======================================================================

    const renderedMessages =
        useMemo(
            () =>
                messages.map(
                    (message) => (
                        <ChatMessage
                            key={
                                message.id
                            }
                            role={
                                message.role
                            }
                            content={
                                message.content
                            }
                            timestamp={
                                message.createdAt
                            }
                            onRegenerate={
                                message.role ===
                                "assistant"
                                    ? regenerateResponse
                                    : undefined
                            }
                        />
                    )
                ),
            [
                messages,
                regenerateResponse,
            ]
        );


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

                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Quick Start
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-[#696e5e]">
                            Choose a question or type anything you want.
                        </p>

                    </div>

                    <PromptSuggestions
                        onSelect={
                            handleSuggestion
                        }
                    />

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

                    {renderedMessages}

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

            <footer className="shrink-0 border-t border-[#ced0c8]/50 bg-white px-4 py-3 md:px-5">

                <div className="mx-auto w-full max-w-3xl">

                    <AIInput
                        value={
                            input
                        }
                        onChange={
                            handleInputChange
                        }
                        onSend={
                            handleSend
                        }
                        onClear={
                            clearConversation
                        }
                        disabled={
                            loading
                        }
                    />

                </div>

            </footer>

        </div>
    );
}