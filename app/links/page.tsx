import { ConnectLinks } from "@/components/ConnectLinks";

export default function Links() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">Kafui Kumah</h1>
        <p className="mx-auto max-w-sm text-secondary">
          Software engineer who loves building cool things with code.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 animate-in" style={{ "--index": 2 } as React.CSSProperties}>
        {ConnectLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-tertiary p-4 hover:bg-secondary transition-colors"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium text-primary flex-1">{link.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-tertiary"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
