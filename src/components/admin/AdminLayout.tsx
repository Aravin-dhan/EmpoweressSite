
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Restored
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedAuth = sessionStorage.getItem("admin_auth");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/portal/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                sessionStorage.setItem("admin_password", password);
                sessionStorage.setItem("admin_auth", "true");
                setIsAuthenticated(true);
                window.location.reload();
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        sessionStorage.removeItem("admin_password");
        setIsAuthenticated(false);
        router.push("/");
    };

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
                <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-xl">
                    <h1 className="text-2xl font-bold font-serif text-[var(--color-foreground)]">Admin Access</h1>
                    <p className="text-sm text-[var(--color-muted)]">Please enter your credentials.</p>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-[var(--color-foreground)]"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-[var(--color-foreground)]"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-brand-primary px-4 py-2 font-semibold text-white transition hover:opacity-90"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
            <header className="border-b border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/site-portal" className="font-serif text-xl font-bold">
                        Empoweress Admin
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm hover:underline">
                            View Site
                        </Link>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-6">
                {children}
            </main>
        </div>
    );
}
