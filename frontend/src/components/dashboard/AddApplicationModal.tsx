import { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";

interface AddApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    // We update this to expect a Promise so the modal can wait for the API call to finish
    onSubmit: (rawDetails: string) => Promise<void>;
}

export default function AddApplicationModal({
    isOpen,
    onClose,
    onSubmit,
}: AddApplicationModalProps) {
    const [rawText, setRawText] = useState("");
    const [isExtracting, setIsExtracting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rawText.trim()) return;

        setIsExtracting(true);
        try {
            // Await the function passed from the Dashboard
            await onSubmit(rawText);

            // Clear the text only if successful
            setRawText("");
        } finally {
            // Re-enable the button whether it succeeds or fails
            setIsExtracting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Add New Application
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isExtracting}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Job Description
                    </label>
                    <p className="mb-4 text-sm text-gray-500">
                        Paste the raw job description below. Our AI will automatically extract the company, title, location, and required skills for you.
                    </p>

                    <textarea
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        disabled={isExtracting}
                        placeholder="e.g., We are looking for a Software Engineer with 3 years of experience in React and Node.js..."
                        className="h-64 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-700 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                        required
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isExtracting}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isExtracting || !rawText.trim()}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-75"
                        >
                            {isExtracting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Extracting Details...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={16} />
                                    Analyze & Extract
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}