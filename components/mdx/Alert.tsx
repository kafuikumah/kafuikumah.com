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
                "my-8 rounded-lg border p-4 text-sm leading-relaxed",
                type === "info" && "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200",
                type === "warning" && "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200",
                type === "error" && "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200",
                type === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-200"
            )}
        >
            {children}
        </div>
    );
}
