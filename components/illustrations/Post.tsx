"use client";

import { useRef, useState } from "react";

// Flat, monotone, lightly animated illustrations for blog posts.
// Every motif draws in theme grays with a single jade accent.

const W = 600;
const H = 220;

const ink = {
  line: "var(--gray-8)",
  faint: "var(--gray-6)",
  fill: "var(--gray-4)",
  strong: "var(--gray-11)",
  accent: "var(--jade-9)",
};

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useSvgPointer() {
  const ref = useRef<SVGSVGElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = ref.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    setPoint({ x: p.x, y: p.y });
  };
  const onPointerLeave = () => setPoint(null);
  return { ref, point, handlers: { onPointerMove, onPointerLeave } };
}

function Frame({
  label,
  children,
  svgRef,
  ...handlers
}: {
  label: string;
  children: React.ReactNode;
  svgRef?: React.Ref<SVGSVGElement>;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <figure className="illo not-prose">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} {...handlers}>
        {children}
      </svg>
    </figure>
  );
}

// Bar chart: bars breathe; hover a bar to highlight it.
function Bars({ seed, alert }: { seed: number; alert?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const r = rng(seed);
  const n = 14;
  const values = Array.from({ length: n }, (_, i) => 0.25 + 0.55 * r() + (alert && i === n - 3 ? 0.2 : 0));
  const peak = values.indexOf(Math.max(...values));
  const bw = 22;
  const gap = 14;
  const x0 = (W - (n * bw + (n - 1) * gap)) / 2;
  const base = 190;

  return (
    <Frame label="Animated bar chart" onPointerLeave={() => setActive(null)}>
      <line x1={x0 - 10} x2={W - x0 + 10} y1={base} y2={base} style={{ stroke: ink.line }} />
      <line
        x1={x0 - 10} x2={W - x0 + 10} y1={base - 120} y2={base - 120}
        strokeDasharray="3 5" style={{ stroke: ink.faint }}
      />
      {values.map((v, i) => {
        const h = v * 150;
        const x = x0 + i * (bw + gap);
        const on = active === i || (active === null && i === peak);
        return (
          <g key={i} onPointerEnter={() => setActive(i)}>
            <rect x={x - gap / 2} y={20} width={bw + gap} height={base - 20} fill="transparent" />
            <rect
              x={x} y={base - h} width={bw} height={h}
              className="illo-breathe"
              style={{ fill: on ? ink.accent : ink.fill, animationDelay: `${i * -0.37}s`, transition: "fill .3s" }}
            />
            {on && <circle cx={x + bw / 2} cy={base - h - 10} r={3} style={{ fill: ink.accent }} className="illo-pulse" />}
          </g>
        );
      })}
    </Frame>
  );
}

// Line chart from scattered raw data; pointer scrubs along the line.
function Line({ seed }: { seed: number }) {
  const { ref, point, handlers } = useSvgPointer();
  const r = rng(seed);
  const n = 48;
  const ys = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return 140 - 70 * t + 22 * Math.sin(t * 9 + seed) + 10 * Math.sin(t * 23);
  });
  const xAt = (i: number) => 40 + (i * (W - 80)) / (n - 1);
  const d = "M" + ys.map((y, i) => `${xAt(i).toFixed(1)} ${y.toFixed(1)}`).join(" L");
  const scatter = Array.from({ length: 90 }, () => {
    const i = Math.floor(r() * n);
    return { x: xAt(i) + (r() - 0.5) * 10, y: ys[i] + (r() - 0.5) * 60 };
  });
  const idx = point ? Math.max(0, Math.min(n - 1, Math.round(((point.x - 40) / (W - 80)) * (n - 1)))) : null;

  return (
    <Frame label="Line chart emerging from scattered data" svgRef={ref} {...handlers}>
      {scatter.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.6} style={{ fill: ink.faint }} />
      ))}
      <path d={d} pathLength={1} fill="none" strokeWidth={1.5} className="illo-draw" style={{ stroke: ink.strong }} />
      {idx === null ? (
        <g className="motion-dot">
          <circle r={7} style={{ fill: ink.accent, opacity: 0.2 }} />
          <circle r={3} style={{ fill: ink.accent }} />
          <animateMotion dur="9s" repeatCount="indefinite" path={d} />
        </g>
      ) : (
        <g>
          <line x1={xAt(idx)} x2={xAt(idx)} y1={20} y2={200} strokeDasharray="3 4" style={{ stroke: ink.line }} />
          <circle cx={xAt(idx)} cy={ys[idx]} r={7} style={{ fill: ink.accent, opacity: 0.2 }} />
          <circle cx={xAt(idx)} cy={ys[idx]} r={3} style={{ fill: ink.accent }} />
        </g>
      )}
    </Frame>
  );
}

// Data silos; hover connects them to a shared platform.
function Silos({ connected: initial = false }: { connected?: boolean }) {
  const [hover, setHover] = useState(false);
  const connected = hover !== initial;
  const silos = [90, 210, 390, 510];
  const hub = { x: 300, y: 178 };

  return (
    <Frame
      label="Isolated data silos connecting to a shared platform"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {silos.map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 118 C ${x} 160, ${hub.x} 140, ${hub.x} ${hub.y}`}
            fill="none"
            strokeWidth={1.5}
            strokeDasharray={connected ? "4 6" : "2 8"}
            className={connected ? "illo-flow" : undefined}
            style={{ stroke: connected ? ink.accent : ink.faint, transition: "stroke .4s" }}
          />
          <rect x={x - 38} y={30} width={76} height={88} style={{ fill: "var(--gray-2)", stroke: ink.line }} />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}${col}`}
                cx={x - 18 + col * 18}
                cy={54 + row * 20}
                r={3.2}
                className="illo-bob"
                style={{ fill: ink.fill, animationDelay: `${(i * 3 + row + col) * -0.3}s` }}
              />
            )),
          )}
        </g>
      ))}
      <circle cx={hub.x} cy={hub.y} r={14} style={{ fill: "var(--gray-2)", stroke: connected ? ink.accent : ink.line, transition: "stroke .4s" }} />
      <circle cx={hub.x} cy={hub.y} r={5} style={{ fill: connected ? ink.accent : ink.fill, transition: "fill .4s" }} />
    </Frame>
  );
}

// Dot-matrix map of Africa; the accent travels across it and follows the pointer.
const AFRICA: [number, number][] = [
  [-17.1, 14.7], [-16.5, 19.5], [-17, 21], [-13, 27.5], [-9.8, 30], [-9.5, 32.5], [-6, 35.8], [-2, 35.1],
  [3, 36.8], [10, 37.3], [11, 33.5], [15, 32.3], [19.9, 30.5], [25, 31.6], [32, 31.2], [32.5, 29.9],
  [35.5, 24], [37.3, 21], [39, 16], [43.3, 12.5], [44.5, 10.4], [51.2, 11.8], [51, 10.4], [48, 4.5],
  [42, -0.5], [40, -3], [39, -6.5], [40.5, -10.5], [40.6, -15], [35.5, -23], [32.9, -26], [32.5, -28.7],
  [30, -31.3], [27, -33.8], [22, -34.2], [18.5, -34.3], [18, -32], [15.2, -27], [14.5, -22.5], [11.8, -17],
  [13.5, -12], [12.3, -6], [9, -1], [9.5, 3.9], [8.5, 4.5], [5.8, 4.3], [2.5, 6.3], [-2, 4.8],
  [-7.5, 4.4], [-11.5, 6.9], [-13.3, 9], [-15, 11], [-16.7, 12.5],
];
const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.5, -15.5], [47.5, -25], [45, -25.5], [43.3, -22], [44.2, -16.5], [46.5, -15.5],
];

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const STEP = 2;
const PX = 5.6;
const AFRICA_DOTS: { x: number; y: number; lon: number; lat: number }[] = [];
for (let lat = 37; lat >= -35; lat -= STEP) {
  for (let lon = -18; lon <= 52; lon += STEP) {
    if (inside([lon, lat], AFRICA) || inside([lon, lat], MADAGASCAR)) {
      AFRICA_DOTS.push({ lon, lat, x: W / 2 + (lon - 17) * (PX / STEP), y: 8 + (37 - lat) * (PX / STEP) });
    }
  }
}

function DotMap({ mode }: { mode: "sweep" | "ripple" | "hotspots" }) {
  const { ref, point, handlers } = useSvgPointer();
  const r = rng(7);
  const hot = new Set(AFRICA_DOTS.map((_, i) => i).filter(() => r() < 0.06));

  return (
    <Frame label="Dot-matrix map of Africa" svgRef={ref} {...handlers}>
      {AFRICA_DOTS.map((d, i) => {
        const near = point && Math.hypot(point.x - d.x, point.y - d.y) < 34;
        const delay =
          mode === "sweep"
            ? (d.lon + 18) * 0.06
            : mode === "ripple"
              ? Math.hypot(d.lon - 30, d.lat - 0) * 0.08
              : r() * 6;
        const animated = mode !== "hotspots" || hot.has(i);
        return (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={1.9}
            className={animated && !near ? "illo-ping" : undefined}
            style={{
              fill: near ? ink.accent : ink.faint,
              animationDelay: `${delay}s`,
              animationDuration: mode === "hotspots" ? "4s" : "5s",
              transition: "fill .2s",
            }}
          />
        );
      })}
    </Frame>
  );
}

// Code editor typing lines in a loop.
function Terminal({ seed }: { seed: number }) {
  const r = rng(seed);
  const lines = Array.from({ length: 7 }, (_, i) => ({
    indent: [0, 1, 2, 2, 1, 2, 0][i] * 24,
    width: 60 + r() * 180,
  }));
  const x = 150;
  const y = 22;

  return (
    <Frame label="Code editor typing lines of code">
      <rect x={x} y={y} width={300} height={176} style={{ fill: "var(--gray-2)", stroke: ink.line }} />
      <line x1={x} x2={x + 300} y1={y + 28} y2={y + 28} style={{ stroke: ink.faint }} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 18 + i * 14} cy={y + 14} r={4} style={{ fill: ink.fill }} />
      ))}
      {lines.map((l, i) => (
        <rect
          key={i}
          x={x + 22 + l.indent}
          y={y + 42 + i * 16}
          width={Math.min(l.width, 256 - l.indent)}
          height={7}
         
          className="illo-type"
          style={{ fill: i === 3 ? ink.accent : ink.fill, animationDelay: `${i * 0.6}s` }}
        />
      ))}
      <rect x={x + 22} y={y + 42 + 7 * 16} width={8} height={11} className="illo-blink" style={{ fill: ink.accent }} />
    </Frame>
  );
}

// Loose wireframe blocks that snap to a grid on hover.
function GridSnap() {
  const [snap, setSnap] = useState(false);
  const blocks = [
    { x: 160, y: 30, w: 280, h: 26, dx: -14, dy: 6, rot: -3 },
    { x: 160, y: 68, w: 80, h: 122, dx: 10, dy: -8, rot: 4 },
    { x: 252, y: 68, w: 188, h: 56, dx: 16, dy: 10, rot: -5 },
    { x: 252, y: 134, w: 88, h: 56, dx: -10, dy: 14, rot: 6 },
    { x: 352, y: 134, w: 88, h: 56, dx: 18, dy: -6, rot: -4 },
  ];

  return (
    <Frame
      label="Wireframe layout snapping into a grid"
      onPointerEnter={() => setSnap(true)}
      onPointerLeave={() => setSnap(false)}
      onClick={() => setSnap((s) => !s)}
    >
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={i}
          x1={160 + (i * 280) / 12} x2={160 + (i * 280) / 12} y1={20} y2={200}
          strokeDasharray="2 4"
          style={{ stroke: ink.faint, opacity: snap ? 1 : 0, transition: "opacity .4s" }}
        />
      ))}
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x} y={b.y} width={b.w} height={b.h}
          style={{
            fill: "var(--gray-2)",
            stroke: i === 2 ? ink.accent : ink.line,
            strokeWidth: 1.5,
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: snap ? "none" : `translate(${b.dx}px, ${b.dy}px) rotate(${b.rot}deg)`,
            transition: `transform .6s cubic-bezier(.2,.9,.25,1.2) ${i * 50}ms`,
          }}
        />
      ))}
    </Frame>
  );
}

// A list of commitments; only one is a hell yeah. Click to toggle.
function Toggles() {
  const [on, setOn] = useState([false, false, true, false, false]);

  return (
    <Frame label="A list of toggles with only one switched on">
      {on.map((v, i) => {
        const y = 26 + i * 36;
        return (
          <g
            key={i}
            onClick={() => setOn((s) => s.map((x, j) => (j === i ? !x : x)))}
            style={{ cursor: "pointer" }}
          >
            <rect x={170} y={y} width={260} height={26} fill="transparent" />
            <rect x={180} y={y + 9} width={120 + ((i * 47) % 70)} height={8} style={{ fill: v ? ink.strong : ink.fill, transition: "fill .3s" }} />
            <rect x={380} y={y + 3} width={40} height={20} style={{ fill: v ? ink.accent : "var(--gray-5)", transition: "fill .3s" }} />
            <circle cx={v ? 410 : 390} cy={y + 13} r={7} style={{ fill: "var(--gray-1)", transition: "cx .3s" }} />
          </g>
        );
      })}
    </Frame>
  );
}

// Overthinking loops vs. a straight path; hover to just do it.
function Launch() {
  const [direct, setDirect] = useState(false);
  const loopy = "M60 180 C 140 180, 160 60, 210 110 S 140 190, 260 150 S 300 40, 340 100 S 280 170, 400 120 S 480 40, 540 40";
  const straight = "M60 180 C 220 180, 380 120, 540 40";
  const d = direct ? straight : loopy;

  return (
    <Frame
      label="A winding path straightening into a direct one"
      onPointerEnter={() => setDirect(true)}
      onPointerLeave={() => setDirect(false)}
      onClick={() => setDirect((s) => !s)}
    >
      <path d={loopy} fill="none" strokeDasharray="3 6" style={{ stroke: ink.faint, opacity: direct ? 0.3 : 1, transition: "opacity .4s" }} />
      <path d={straight} fill="none" strokeWidth={1.5} style={{ stroke: ink.strong, opacity: direct ? 1 : 0, transition: "opacity .4s" }} />
      <circle cx={60} cy={180} r={5} style={{ fill: ink.fill }} />
      <circle cx={540} cy={40} r={8} style={{ fill: "var(--gray-2)", stroke: ink.accent }} />
      <g className="motion-dot" key={d}>
        <circle r={7} style={{ fill: ink.accent, opacity: 0.2 }} />
        <circle r={3} style={{ fill: ink.accent }} />
        <animateMotion dur={direct ? "2.4s" : "7s"} repeatCount="indefinite" path={d} />
      </g>
    </Frame>
  );
}

// Timeline of milestones; the accent travels forward, hover a milestone.
function Timeline() {
  const [active, setActive] = useState<number | null>(null);
  const stops = [70, 160, 250, 340, 430, 530];
  const d = `M${stops[0]} 110 L${stops[stops.length - 1]} 110`;

  return (
    <Frame label="A timeline of milestones" onPointerLeave={() => setActive(null)}>
      <path d={d} style={{ stroke: ink.line }} />
      {stops.map((x, i) => (
        <g key={i} onPointerEnter={() => setActive(i)}>
          <rect x={x - 30} y={40} width={60} height={140} fill="transparent" />
          <line x1={x} x2={x} y1={110} y2={i % 2 ? 140 : 80} style={{ stroke: ink.faint }} />
          <rect
            x={x - 26} y={i % 2 ? 144 : 60} width={52} height={14}
            style={{ fill: active === i ? ink.accent : ink.fill, transition: "fill .3s" }}
          />
          <circle cx={x} cy={110} r={active === i ? 7 : 5} style={{ fill: "var(--gray-2)", stroke: active === i ? ink.accent : ink.line, transition: "all .3s" }} />
        </g>
      ))}
      <g className="motion-dot">
        <circle r={7} style={{ fill: ink.accent, opacity: 0.2 }} />
        <circle r={3} style={{ fill: ink.accent }} />
        <animateMotion dur="8s" repeatCount="indefinite" path={d} />
      </g>
    </Frame>
  );
}

// Conversation bubbles appearing in turn.
function Bubbles() {
  const msgs = [
    { right: false, w: 180 },
    { right: true, w: 140 },
    { right: false, w: 220 },
  ];

  return (
    <Frame label="A conversation of chat bubbles">
      {msgs.map((m, i) => {
        const x = m.right ? 450 - m.w : 150;
        const y = 22 + i * 46;
        return (
          <g key={i} className="illo-appear" style={{ animationDelay: `${i * 0.8}s` }}>
            <rect x={x} y={y} width={m.w} height={34} style={{ fill: m.right ? ink.fill : "var(--gray-2)", stroke: ink.line }} />
            <rect x={x + 16} y={y + 14} width={m.w - 50} height={6} style={{ fill: m.right ? "var(--gray-7)" : ink.fill }} />
          </g>
        );
      })}
      <g className="illo-appear" style={{ animationDelay: "2.4s" }}>
        <rect x={150} y={160} width={70} height={34} style={{ fill: "var(--gray-2)", stroke: ink.line }} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={172 + i * 13} cy={177} r={3.5} className="illo-bob" style={{ fill: ink.accent, animationDelay: `${i * 0.15}s` }} />
        ))}
      </g>
    </Frame>
  );
}

const registry: Record<string, () => React.ReactElement> = {
  "dashboards-help-governments-respond-to-crises": () => <Bars seed={3} alert />,
  "designing-dashboards-policymakers-can-use": () => <Bars seed={11} />,
  "what-good-national-dashboard-looks-like": () => <DotMap mode="hotspots" />,
  "building-better-systems-for-monitoring-development-goals": () => <DotMap mode="sweep" />,
  "why-climate-data-platforms-critical-for-africa": () => <DotMap mode="ripple" />,
  "turning-large-datasets-into-clear-insights": () => <Line seed={2} />,
  "future-of-data-platforms-for-governments": () => <Line seed={5} />,
  "why-government-data-systems-fail": () => <Silos />,
  "why-development-programs-struggle-with-data-reporting": () => <Silos />,
  "role-of-data-platforms-in-public-policy": () => <Silos connected />,
  "why-i-learned-to-code": () => <Terminal seed={4} />,
  "how-i-mastered-ui-design": () => <GridSnap />,
  "hell-yeah-or-no": () => <Toggles />,
  "fuck-it-lets-do-it": () => <Launch />,
  "advice-to-my-18-y-o-self": () => <Timeline />,
  "building-atp-stories": () => <Bubbles />,
};

export function PostIllustration({ slug }: { slug: string }) {
  const Illustration = registry[slug];
  return Illustration ? <Illustration /> : null;
}
