import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
    open,
    title = "Confirmation",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmButtonClass = "bg-red-600 hover:bg-red-700",
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#ced0c8]/60 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-3">
                            <AlertTriangle
                                size={22}
                                className="text-red-600"
                            />
                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-[#0c1d27]">
                                {title}
                            </h2>

                        </div>

                    </div>

                    <button
                        onClick={onCancel}
                        className="rounded-lg p-2 hover:bg-[#f3f4f0]"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Body */}

                <div className="px-6 py-6">

                    <p className="text-sm leading-6 text-[#696e5e]">
                        {message}
                    </p>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-[#ced0c8]/60 px-6 py-5">

                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-[#ced0c8] px-5 py-2 font-medium hover:bg-[#f3f4f0]"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`rounded-lg px-5 py-2 font-medium text-white transition ${confirmButtonClass}`}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}