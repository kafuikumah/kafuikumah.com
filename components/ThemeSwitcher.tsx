"use client";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme, themes } = useTheme();
    const uniqueThemes = Array.from(new Set(themes));

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-8 h-8" />;

    return (
        <Listbox value={theme} onChange={setTheme}>
            {({ open }) => (
                <div className="relative">
                    <Listbox.Button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors focus:outline-none">
                        {resolvedTheme === "dark" ? (
                            <MoonIcon className="w-5 h-5 text-primary" />
                        ) : (
                            <SunIcon className="w-5 h-5 text-primary" />
                        )}
                    </Listbox.Button>
                    <AnimatePresence>
                        {open && (
                            <Listbox.Options
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 mt-2 w-40 origin-top-right rounded-2xl bg-[#0a0a0a] p-2 shadow-2xl ring-1 ring-white/10 focus:outline-none z-50 overflow-hidden font-sans border border-white/5"
                            >
                                {uniqueThemes.map((t) => (
                                    <Listbox.Option
                                        key={t}
                                        value={t}
                                        className={({ active, selected }) =>
                                            clsx(
                                                "group flex w-full items-center gap-3 rounded-xl py-2.5 px-3 select-none cursor-pointer transition-all",
                                                active || selected ? "bg-white/10" : "hover:bg-white/5"
                                            )
                                        }
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="w-5 flex shrink-0 justify-center">
                                                    {selected && <CheckIcon className="w-4 h-4 text-white" />}
                                                </div>
                                                <span className="flex-1 text-sm text-white/90 capitalize">
                                                    {t === "system" ? "Automatic" : t}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </Listbox>
    );
}
