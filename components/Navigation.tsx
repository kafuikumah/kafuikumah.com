"use client";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import NavLink from "./ui/NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
87;
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export default function Navigation() {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic subpages
  const { theme } = useTheme();

  return (
    <header className={clsx("relative top-0 z-20 bg-primary md:sticky")}>
      <nav className="mx-auto flex max-w-[700px] items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="shrink-0 text-primary">
            <span>index</span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <Popover className="relative md:hidden">
            <Popover.Button className="flex items-center gap-1 rounded-lg p-1 text-secondary focus:ring-0 focus-visible:outline-none">
              Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base shadow-lg focus:outline-none dark:bg-black sm:text-sm"
                style={theme === "terminal" ? { background: "#040605" } : {}}
              >
                <div className="grid">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "rounded-md px-4 py-2 transition-colors hover:text-primary",
                        pathname === link.href
                          ? "bg-tertiary font-medium"
                          : "font-normal",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="flex h-8 w-8 items-center justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
