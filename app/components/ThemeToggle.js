"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
        const [theme, setTheme] = useState("light");

    useEffect(() => {
                const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(savedTheme);
                document.body.classList.toggle("dark-mode", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
                const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
                localStorage.setItem("theme", newTheme);
                document.body.classList.toggle("dark-mode", newTheme === "dark");
    };

    return (
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] text-[var(--beige)]/82 transition hover:-translate-y-0.5 hover:border-[rgba(216,142,108,0.24)] hover:text-[var(--beige)]"
                >
                    {theme === "light" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                </button>
    );
};

export default ThemeToggle;
