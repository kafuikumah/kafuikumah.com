import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic subpages
  const active = pathname === href;

  return (
    <Link
      className={clsx(
        "relative px-4 py-2 text-sm transition-colors hover:text-primary",
        active ? "font-semibold text-primary" : "font-normal text-secondary",
      )}
      href={href}
    >
      {children}
      {active && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
