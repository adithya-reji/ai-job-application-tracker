import React, { useState } from "react";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

const AddJob: React.FC = () => {
    const navigate = useNavigate();

    const [rawDescription, setRawDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!rawDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/jobs", {
                raw_description: rawDescription.trim(),
            });

            const jobId = response.data.id;

            navigate(`/jobs/${jobId}/verify`);
        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                "Unable to add the job. Please try again.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto w-full max-w-3xl">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            text-gray-600
            transition
            hover:text-gray-900
          "
                >
                    <ArrowLeft size={16} />
                    Back to dashboard
                </button>

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Add Job
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Paste the complete job description below. You can
                        review and correct the extracted information next.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <label
                        htmlFor="raw_description"
                        className="block text-sm font-medium text-gray-800"
                    >
                        Job Description
                        <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                        id="raw_description"
                        value={rawDescription}
                        onChange={(event) =>
                            setRawDescription(event.target.value)
                        }
                        placeholder="Paste the complete job description here..."
                        rows={18}
                        disabled={loading}
                        className="
              mt-2
              w-full
              resize-y
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              py-3
              text-sm
              leading-6
              text-gray-900
              outline-none
              placeholder:text-gray-400
              focus:border-gray-700
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
                    />

                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            disabled={loading}
                            className="
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:opacity-50
              "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading || !rawDescription.trim()}
                            className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-gray-900
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                        >
                            {loading ? (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : (
                                <Plus size={16} />
                            )}

                            {loading ? "Processing..." : "Add Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;