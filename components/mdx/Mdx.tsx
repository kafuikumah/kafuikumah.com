import { useMDXComponent } from "next-contentlayer2/hooks";
import { Alert } from "./Alert";
import { Image } from "./Image";
import Link from "next/link";
import clsx from "clsx";

const components = {
    Alert,
    Image,
    a: ({ href, children, ...props }: any) => {
        if (href?.startsWith("/")) {
            return (
                <Link href={href} className="text-brand hover:underline font-medium" {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline font-medium"
                {...props}
            >
                {children}
            </a>
        );
    },
};

export function Mdx({ code }: { code: string }) {
    const Component = useMDXComponent(code);

    return (
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:no-underline prose-pre:bg-tertiary/50 prose-pre:border prose-pre:border-primary/10">
            <Component components={components} />
        </article>
    );
}
