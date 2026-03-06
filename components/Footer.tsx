export default function Footer() {
    return (
        <footer className="mt-20 border-t border-secondary py-10 text-sm text-secondary animate-in" style={{ "--index": 4 } as React.CSSProperties}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p>© {new Date().getFullYear()} Kafui Kumah</p>
                <nav className="flex items-center gap-6">
                    <a
                        href="https://github.com/kafuikumah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://twitter.com/kafuikumah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://linkedin.com/in/kafuikumah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        LinkedIn
                    </a>
                </nav>
            </div>
        </footer>
    );
}
