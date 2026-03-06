"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-8 bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-[700px] px-6 flex items-center justify-between">
                <nav className="flex items-center gap-6">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-secondary"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
