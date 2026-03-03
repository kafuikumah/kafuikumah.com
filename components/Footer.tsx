export default function Footer() {
  return (
    <footer className="border-grey-100 dark:border-grey-700 mt-20 border-t border-solid py-4">
      <div className="mx-auto flex max-w-[650px] items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-4">
          {/* Email */}
          <a
            href="mailto:kafui.kofi.kumah@gmail.com"
            aria-label="Email"
            className="text-secondary transition-colors hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kafui-kumah-406ab1b4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary transition-colors hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <div className="text-sm text-secondary">©{new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
