import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

import InputField from "../ui/InputField";
import PasswordField from "./PasswordField";

type AuthMode = "login" | "signup";

export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>("login");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const isLogin = mode === "login";

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));

        setError("");
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");

        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
        }

        setIsLoading(true);

        try {
            /*
             * Connect your FastAPI endpoints here.
             *
             * Login:
             * POST /login
             *
             * Signup:
             * POST /signup
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            console.log({
                mode,
                email: formData.email,
                password: formData.password,
            });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setError("");

        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
        });

        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-sm">

                {/* Header */}

                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {isLogin
                            ? "Sign in to continue."
                            : "Create an account to get started."}
                    </p>
                </div>

                {/* Auth tabs */}

                <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() => switchMode("login")}
                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${isLogin
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Sign in
                    </button>

                    <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${!isLogin
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Sign up
                    </button>
                </div>

                {/* Error */}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail size={17} />}
                        autoComplete="email"
                        required
                    />

                    <PasswordField
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        visible={showPassword}
                        onToggle={() =>
                            setShowPassword((previous) => !previous)
                        }
                        autoComplete={
                            isLogin ? "current-password" : "new-password"
                        }
                        required
                    />

                    {!isLogin && (
                        <PasswordField
                            label="Confirm password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            visible={showConfirmPassword}
                            onToggle={() =>
                                setShowConfirmPassword(
                                    (previous) => !previous
                                )
                            }
                            autoComplete="new-password"
                            required
                        />
                    )}

                    {/*
                    {isLogin && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}
                    */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white" />

                                {isLogin
                                    ? "Signing in..."
                                    : "Creating account..."}
                            </>
                        ) : (
                            <>
                                {isLogin ? "Sign in" : "Create account"}

                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                {/* Bottom text */}

                <p className="mt-6 text-center text-sm text-gray-500">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}

                    <button
                        type="button"
                        onClick={() =>
                            switchMode(isLogin ? "signup" : "login")
                        }
                        className="font-medium text-gray-900 hover:underline"
                    >
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </p>

            </div>
        </main>
    );
}