import clsx from "clsx";

export function Alert({
    children,
    type = "info",
}: {
    children: React.ReactNode;
    type?: "info" | "warning" | "error" | "success";
}) {
    return (
        <div
            className={clsx(
                "not-prose my-8 border-l-2 bg-[var(--gray-3)] px-5 py-4 text-[0.95rem] leading-relaxed text-secondary",
                type === "info" && "border-[var(--gray-9)]",
                type === "warning" && "border-amber-500",
                type === "error" && "border-red-500",
                type === "success" && "border-[var(--jade-9)]"
            )}
        >
            {children}
        </div>
    );
}
