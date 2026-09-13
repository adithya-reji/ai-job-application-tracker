import { useState } from "react";
import {
    ArrowRight,
    Check,
    ShieldCheck,
    Sparkles,
    Mail,
} from "lucide-react";

import AuthLogo from "./AuthLogo";
import AuthFeature from "./AuthFeature";
import InputField from "../ui/InputField";
import PasswordField from "./PasswordField";

type AuthMode = "login" | "signup";

export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>("login");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);
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
             * Connect your FastAPI API here.
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
                rememberMe,
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
        <main className="min-h-screen bg-[#f7f7f8] text-[#171717]">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* =========================================
            LEFT SIDE
        ========================================= */}

                <section className="relative hidden overflow-hidden bg-[#171717] lg:flex">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

                    <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        <AuthLogo dark />

                        <div className="max-w-lg">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
                                <Sparkles size={15} />

                                Smarter job searching
                            </div>

                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                                Keep your job search

                                <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    organized and focused.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-base leading-7 text-white/55">
                                Track applications, understand job requirements,
                                and use AI to make your job search more efficient.
                            </p>

                            <div className="mt-10 space-y-4">

                                <AuthFeature
                                    icon={<Check size={16} />}
                                    title="Track every application"
                                    description="Keep your applications organized in one place."
                                />

                                <AuthFeature
                                    icon={<Sparkles size={16} />}
                                    title="AI-powered insights"
                                    description="Understand job descriptions and skill requirements."
                                />

                                <AuthFeature
                                    icon={<ShieldCheck size={16} />}
                                    title="Private and secure"
                                    description="Your job search data stays associated with your account."
                                />

                            </div>
                        </div>

                        <p className="text-sm text-white/30">
                            © 2026 JobTrack. Built for your next opportunity.
                        </p>
                    </div>
                </section>

                {/* =========================================
            RIGHT SIDE
        ========================================= */}

                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-md">

                        {/* Mobile logo */}

                        <div className="mb-10 flex justify-center lg:hidden">
                            <AuthLogo />
                        </div>

                        {/* Heading */}

                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold tracking-tight">
                                {isLogin
                                    ? "Welcome back"
                                    : "Create your account"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#737373]">
                                {isLogin
                                    ? "Sign in to continue managing your job search."
                                    : "Start organizing your job search in one place."}
                            </p>
                        </div>

                        {/* Mode switch */}

                        <div className="mb-7 flex rounded-xl bg-[#eeeeef] p-1">

                            <button
                                type="button"
                                onClick={() => switchMode("login")}
                                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${isLogin
                                    ? "bg-white text-[#171717] shadow-sm"
                                    : "text-[#737373] hover:text-[#171717]"
                                    }`}
                            >
                                Sign in
                            </button>

                            <button
                                type="button"
                                onClick={() => switchMode("signup")}
                                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${!isLogin
                                    ? "bg-white text-[#171717] shadow-sm"
                                    : "text-[#737373] hover:text-[#171717]"
                                    }`}
                            >
                                Create account
                            </button>

                        </div>

                        {/* Error */}

                        {error && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <InputField
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                icon={<Mail size={18} />}
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
                                    required
                                />
                            )}

                            {/* Login options */}

                            {isLogin && (
                                <div className="flex items-center justify-between">

                                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#737373]">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(event) =>
                                                setRememberMe(event.target.checked)
                                            }
                                            className="h-4 w-4 rounded border-gray-300 accent-violet-600"
                                        />

                                        Remember me
                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm font-medium text-violet-600 hover:text-violet-700"
                                    >
                                        Forgot password?
                                    </button>

                                </div>
                            )}

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        {isLogin
                                            ? "Signing in..."
                                            : "Creating account..."}
                                    </>
                                ) : (
                                    <>
                                        {isLogin
                                            ? "Sign in"
                                            : "Create account"}

                                        <ArrowRight
                                            size={17}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Terms */}

                        {!isLogin && (
                            <p className="mt-5 text-center text-xs leading-5 text-[#8a8a8a]">
                                By creating an account, you agree to our{" "}
                                <button className="text-[#555] underline underline-offset-2">
                                    Terms
                                </button>{" "}
                                and{" "}
                                <button className="text-[#555] underline underline-offset-2">
                                    Privacy Policy
                                </button>
                                .
                            </p>
                        )}

                        {/* Bottom switch */}

                        <p className="mt-8 text-center text-sm text-[#737373]">
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}

                            <button
                                type="button"
                                onClick={() =>
                                    switchMode(isLogin ? "signup" : "login")
                                }
                                className="font-medium text-violet-600 hover:text-violet-700"
                            >
                                {isLogin ? "Create one" : "Sign in"}
                            </button>
                        </p>

                    </div>
                </section>
            </div>
        </main>
    );
}