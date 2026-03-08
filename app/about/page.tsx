import Image from "next/image";
import { Metadata } from "next";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
  title: "About | Kafui Kumah",
  description: "Full-stack software engineer, product designer, and founder of Nerdion Systems.",
};

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-12">
      <h2 className="md:w-24 shrink-0 text-sm font-bold uppercase tracking-widest text-tertiary pt-1">
        {heading}
      </h2>
      <div className="flex-1 flex flex-col gap-6 text-primary">
        {children}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="animate-in" style={{ "--index": 1 } as React.CSSProperties}>
        <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">About Me</h1>
        <p className="text-secondary">Full-stack engineer, product designer, and founder.</p>
      </div>

      <div className="flex flex-col gap-16 md:gap-24 animate-in" style={{ "--index": 2 } as React.CSSProperties}>
        <Section heading="About">
          <p>
            Hello world! I'm <strong>Kafui Kumah</strong>, a software engineering
            consultant with over a decade of experience building and deploying
            software for startups, global agencies, and institutional clients
            across Africa and international markets.
          </p>
          <p>
            My focus is on building scalable and robust software solutions for
            businesses and organizations. As Founder of{" "}
            <a href="https://nerdionsystems.com" className="underline underline-offset-4 hover:text-secondary">Nerdion Systems</a>, I
            leverage a wide range of tools to design and develop
            decision-support tools, data monitoring tools, and innovative solutions for organizations
            working on consequential challenges — serving both commercial and
            development sector clients.
          </p>
          <p>
            I also run <a href="https://off-web.com" className="underline underline-offset-4 hover:text-secondary">Off-Web</a>, a web design
            studio where I build conversion-focused websites and digital
            experiences for businesses across e-commerce, finance,
            hospitality, and professional services.
          </p>
          <p>
            When I'm not coding up a storm, you can find me exploring new
            technologies, playing video games, getting lost in a good book, or
            geeking out with passionate like-minded people :)
          </p>
        </Section>

        <Section heading="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-bold mb-2">Frontend</h3>
              <p className="text-secondary leading-relaxed">
                Next.js · React · TypeScript · Vue.js · Tailwind CSS · Material
                UI · Chakra UI · JavaScript · jQuery
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Backend</h3>
              <p className="text-secondary leading-relaxed">
                Node.js · Express.js · PHP · Laravel · Symfony · Python
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Mobile</h3>
              <p className="text-secondary leading-relaxed">Swift (iOS) · React Native</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Database & BaaS</h3>
              <p className="text-secondary leading-relaxed">
                PostgreSQL · MySQL · MongoDB · SQLite · Supabase · Redis ·
                Firebase
              </p>
            </div>
          </div>
        </Section>

        <Section heading="Work">
          <div className="flex flex-col gap-8">
            <p>
              10+ years of building digital products across startups, agencies, and independent ventures.
            </p>
            <div className="flex flex-col gap-8">
              {workplaces.map((work) => (
                <div key={work.company} className="flex gap-4 items-start group">
                  <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden p-0">
                    <Image src={work.logo} alt={work.company} width={48} height={48} className="object-contain w-full h-full transition-all" />
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-primary">{work.title}</h4>
                      <p className="text-secondary text-sm">{work.company}</p>
                    </div>
                    <p className="text-tertiary text-xs md:text-sm">{work.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/Kafui_Kumah_CV.pdf"
              download
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>Download my full resumé</span>
            </a>
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
    logo: "/work/nerdionLogo.png",
  },
  {
    title: "Founder & Principal Web Designer",
    company: "Off-Web",
    time: "May 2024 – Present",
    logo: "/work/off-webLogo.png",
  },
  {
    title: "Senior UI/UX Designer & Web Developer",
    company: "Dandelo",
    time: "Feb 2022 – Oct 2024",
    logo: "/work/dandelo.png",
  },
  {
    title: "Lead Developer",
    company: "Intelligent Building Solutions",
    time: "Aug 2021 – Jan 2022",
    logo: "/work/ibsLogo.png",
  },
  {
    title: "Fullstack Developer",
    company: "Milk The Sun (Remote, Germany)",
    time: "Dec 2019 – Jul 2021",
    logo: "/work/milk-the-sun.jpg",
  },
  {
    title: "Software Developer & UI/UX Designer",
    company: "Roots Digital (Swoove)",
    time: "Sep 2018 – Nov 2019",
    logo: "/work/swooveLogo.png",
  },
];
