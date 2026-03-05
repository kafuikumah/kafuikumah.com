import Image from "next/image";
import { Metadata } from "next";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "../../components/ConnectLinks";
import Workplaces from "./components/Workplaces";

import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

import iota from "public/work/iotaLogo.png";
import ibsgh from "public/work/ibsLogo.png";
import getinnotized from "public/work/gizLogo.png";
import swoove from "public/work/swooveLogo.png";
import nerdion from "public/work/nerdionLogo.png";
import offweb from "public/work/off-webLogo.png";

export const metadata: Metadata = {
  title: "About | Kafui Kumah",
  description:
    "Full-stack software engineer, product designer, and founder of Nerdion Systems with a decade of experience building digital products for startups, agencies, and institutional clients.",
};

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight">
          About Me
        </h1>
        <p
          className="animate-in text-secondary"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          Full-stack engineer, product designer, and founder.
        </p>
      </div>

      <div
        className="flex animate-in flex-col gap-16 md:gap-24"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        {/* About */}
        <Section heading="About" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>
              Hello world! I&apos;m <strong>Kafui Kumah</strong> — a full-stack
              software engineer, product designer, and web designer with a
              decade of experience building and deploying digital frontend and
              backend software infrastructure for startups, agencies, and
              institutional clients.
            </p>
            <p>
              My focus is on developing responsive user interfaces for enhanced
              user experience, while ensuring security and robust data
              management. As Founder of{" "}
              <Link href="https://nerdionsystems.com">Nerdion Systems</Link>, I
              leverage a wide range of tools and languages to design and develop
              decision-support tools and innovative solutions for organizations
              working on consequential challenges — serving both commercial and
              development sector clients.
            </p>
            <p>
              I also run{" "}
              <Link href="https://off-web.com">Off-Web</Link>, a web design
              studio where I build conversion-focused websites and digital
              experiences for businesses across e-commerce, finance,
              hospitality, and professional services.
            </p>
            <p>
              When I&apos;m not building products, you can find me exploring new
              technologies, playing video games, getting lost in a good book, or
              geeking out with passionate like-minded people :)
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section heading="Skills" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-1">Frontend</h3>
              <p className="text-secondary">
                Next.js · React · TypeScript · Vue.js · Tailwind CSS · Material
                UI · Chakra UI · JavaScript · jQuery
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Backend</h3>
              <p className="text-secondary">
                Node.js · Express.js · PHP · Laravel · Symfony · Python
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Mobile</h3>
              <p className="text-secondary">Swift (iOS) · React Native</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                Database &amp; BaaS
              </h3>
              <p className="text-secondary">
                PostgreSQL · MySQL · MongoDB · SQLite · Supabase · Redis ·
                Firebase
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                APIs &amp; Integration
              </h3>
              <p className="text-secondary">REST APIs · GraphQL</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                Design &amp; Tooling
              </h3>
              <p className="text-secondary">
                Figma · Framer · Webflow · WordPress · WIX · Visual Design · UX
                Design · Interaction Design · User Research · Design Systems ·
                Wireframing · Prototyping
              </p>
            </div>
          </div>
        </Section>

        {/* Work Experience */}
        <Section heading="Work" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              {new Date().getFullYear() - 2017}+ years of building digital
              products across startups, agencies, and independent ventures.
            </p>
            <p>
              I started at{" "}
              <Link className="underline" href="https://gridco.com.gh">
                GRIDCo
              </Link>{" "}
              (Ghana Grid Company) as an Associate Telecommunications Engineer
              before transitioning into software development at{" "}
              <Link className="underline" href="https://www.swoove360.com/">
                Roots Digital (now Swoove)
              </Link>
              , where I built iOS apps and sharpened my craft across engineering
              and product design.
            </p>
            <p>
              Since then, I&apos;ve shipped across industries — from solar energy
              brokerage platforms in Germany (
              <Link className="underline" href="https://milkthesun.com">
                Milk The Sun
              </Link>
              ) to full ERP systems, MOOC platforms, and e-commerce sites across
              Ghana. I&apos;ve led freelance engagements, founded companies, and
              collaborated with teams across the continent.
            </p>
            <p>
              Today I run{" "}
              <Link
                className="underline"
                href="https://nerdionsystems.com/"
              >
                Nerdion Systems
              </Link>{" "}
              as Founder, where we build data monitoring tools and platforms for
              international development organizations and governments. I also
              lead{" "}
              <Link className="underline" href="https://off-web.com">
                Off-Web
              </Link>
              , a web design studio with 50+ business clients delivering
              conversion-focused digital experiences.
            </p>

            <Workplaces items={workplaces} />

            <ul
              className="animated-list flex animate-in flex-col gap-2 text-secondary md:flex-row md:gap-6"
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <li className="transition-opacity">
                <a
                  href="/Kafui_Kumah_CV.pdf"
                  download="Kafui_Kumah_CV.pdf"
                  className="flex items-center gap-2 no-underline text-secondary hover:text-primary transition-colors"
                >
                  <br />
                  <br />
                  <ArrowUpRightIcon className="h-5 w-5" />
                  <span>Download my full resumé</span>
                </a>
              </li>
            </ul>
          </div>
        </Section>

        {/* Connect */}
        <Section heading="Connect" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <ul className="animated-list grid flex-grow grid-cols-1 gap-2 md:grid-cols-2">
              {ConnectLinks.map((link) => (
                <li className="col-span-1 transition-opacity" key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-grid w-full rounded-lg border border-primary p-4 no-underline transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="ml-auto h-5 w-5 text-secondary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: "Founder",
    company: "Nerdion Systems",
    time: "Sep 2020 – Present",
    imageSrc: nerdion,
    link: "https://www.nerdionsystems.com/",
  },
  {
    title: "Founder & Principal Web Designer",
    company: "Off-Web",
    time: "May 2024 – Present",
    imageSrc: offweb,
    link: "https://www.off-web.com/",
  },
  {
    title: "Senior UI/UX Designer & Web Developer",
    company: "Dandelo",
    time: "Feb 2022 – Oct 2024",
    imageSrc: getinnotized,
    link: "https://www.getinnotized.com/",
  },
  {
    title: "Lead Developer",
    company: "Intelligent Building Solutions",
    time: "Aug 2021 – Jan 2022",
    imageSrc: ibsgh,
    link: "https://www.ibsgh.com/",
  },
  {
    title: "Fullstack Developer",
    company: "Milk The Sun (Remote, Germany)",
    time: "Dec 2019 – Jul 2021",
    imageSrc: iota,
    link: "https://www.milkthesun.com/",
  },
  {
    title: "Software Developer & UI/UX Designer",
    company: "Roots Digital (Swoove)",
    time: "Sep 2018 – Nov 2019",
    imageSrc: swoove,
    link: "https://www.swoove360.com/",
  },
];
