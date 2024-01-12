import Image from "next/image";
import { Metadata } from "next";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "../../components/ConnectLinks";
import Workplaces from "./components/Workplaces";

import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

import iota from "public/work/iotaLogo.png";
import korey from "public/work/koreyLogo.png";
import ibsgh from "public/work/ibsLogo.png";
import getinnotized from "public/work/gizLogo.png";
import swoove from "public/work/swooveLogo.png";

export const metadata: Metadata = {
  title: "About | Kafui Kumah",
  description:
    "I am a full-stack software engineer who basically just enjoys creating things.",
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
          Just a quick glimpse.
        </p>
      </div>
      {/* <div className="mb-8 lg:hidden">
        <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={meLily}
            alt={"me and lily"}
            width={324}
            height={139}
            className="pointer-events-none relative inset-0 h-60 -rotate-6 rounded-2xl bg-gray-400 object-cover shadow-md"
            priority
          />
        </div>

        <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Image
            src={colorado}
            alt={"me and lily"}
            width={220}
            height={260}
            className="pointer-events-none absolute inset-0 -top-48 left-[45%] w-48 rotate-6 rounded-2xl bg-gray-400 object-cover shadow-md md:left-[60%] md:w-56"
            priority
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <Gallery />
      </div> */}
      <div
        className="flex animate-in flex-col gap-16 md:gap-24"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <Section heading="About" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>Hello world, I&apos;m Kafui Kumah!</p>

            <p>
              I am an innovative entrepreneur and self-taught software engineer
              dedicated to accessible education, human capacity development in
              technology and ESG initiatives.
            </p>
            <p>
              In addition to coding, I make the world a better place through
              projects undertaken by my ESG startup,{" "}
              <Link href="https://koreysustainability.org">
                Korey Sustainability
              </Link>
              .
            </p>
            <p>
              When I am not coding up a storm, you can find me exploring new
              technologies, playing video games, getting lost in a good book or
              geeking out with passionate like-minded people :)
            </p>
          </div>
        </Section>

        <Section heading="Connect" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              Have a question or just want to chat? Feel free to{" "}
              <Link href="mailto:kafui.kofi.kumah@gmail.com">email me</Link>.
              Try finding me anywhere else at @kafuikumah
            </p>
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

        <Section heading="Work" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              {new Date().getFullYear() - 2018}+ years of professional
              development experience.
            </p>
            <p>
              I started my career by building a food delivery app called PicApp
              Foods. Then I worked at{" "}
              <Link className="underline" href="https://www.swoove360.com/">
                Swoove
              </Link>
              (then: Roots Digital).
            </p>
            <p>
              Throughout my career, I have built many startups and projects
              while dabbling in freelance on the side.
            </p>
            <p>
              Now, I&apos;m a backend engineer currently working at{" "}
              <Link
                className="underline"
                href="https://www.iotadigitallab.com/"
              >
                iOta Digial Lab
              </Link>
              , a software development and product design agency in New York,
              USA.
            </p>

            <Workplaces items={workplaces} />
            <ul
              className="animated-list flex animate-in flex-col gap-2 text-secondary md:flex-row md:gap-6"
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <li className="transition-opacity">
                <Link
                  href="/about"
                  className="flex items-center gap-2 no-underline"
                >
                  <br />
                  <br />
                  <ArrowUpRightIcon className="h-5 w-5" />
                  <span>Download my full resumé</span>
                </Link>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: "Backend Developer",
    company: "iOta Digital Lab",
    time: "2023 - ",
    imageSrc: iota,
    link: "https://www.iotadigital.co/",
  },
  {
    title: "Tech Lead",
    company: "Korey Sustainability",
    time: "2023 - ",
    imageSrc: korey,
    link: "https://www.koreysustainability.org/",
  },
  {
    title: "Lead Software Developer",
    company: "Intelligent Building Solutions",
    time: "2021 - 2022",
    imageSrc: ibsgh,
    link: "https://www.ibsgh.com/",
  },
  {
    title: "Fullstack Developer",
    company: "Getinnotized",
    time: "2019 - 2022",
    imageSrc: getinnotized,
    link: "https://www.getinnotized.com//",
  },
  {
    title: "iOS Developer",
    company: "Swoove",
    time: "2018-2020",
    imageSrc: swoove,
    link: "https://www.swoove360.com/",
  },
];
