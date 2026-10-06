import clsx from "clsx";

// Minimal isometric engine: boxes are drawn as three visible faces (top, left, right)
// in authored order (painter's algorithm), on a ground grid, with a green dot
// travelling a route along the grid lines and object edges.

type V3 = [number, number, number];
type Box = { at: V3; size: V3 };
type Scene = { grid: number; boxes: Box[]; decals?: [V3, V3][]; route: V3[]; label: string };

const UNIT = 12;
const COS30 = Math.cos(Math.PI / 6);

function project([x, y, z]: V3): [number, number] {
  return [(x - y) * UNIT * COS30, (x + y) * UNIT * 0.5 - z * UNIT];
}

function points(vs: V3[]) {
  return vs.map((v) => project(v).map((n) => n.toFixed(2)).join(",")).join(" ");
}

function boxFaces({ at: [x, y, z], size: [w, d, h] }: Box) {
  const [X, Y, Z] = [x + w, y + d, z + h];
  return {
    top: [[x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z]] as V3[],
    left: [[x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z]] as V3[],
    right: [[X, y, z], [X, Y, z], [X, Y, Z], [X, y, Z]] as V3[],
  };
}

const scenes: Record<string, Scene> = {
  // Live public-health dashboard: a data panel with rising indicator bars.
  "covid-19-dashboard": {
    label: "Isometric dashboard panel with rising bars",
    grid: 8,
    boxes: [
      { at: [1, 1, 0], size: [6, 4, 0.3] },
      { at: [1.6, 2.2, 0.3], size: [0.8, 0.8, 1.2] },
      { at: [2.8, 2.2, 0.3], size: [0.8, 0.8, 2.2] },
      { at: [4.0, 2.2, 0.3], size: [0.8, 0.8, 3.2] },
      { at: [5.2, 2.2, 0.3], size: [0.8, 0.8, 1.8] },
    ],
    decals: [
      [[1.6, 4.2, 0.3], [3.0, 4.2, 0.3]],
      [[1.6, 4.6, 0.3], [4.4, 4.6, 0.3]],
    ],
    route: [
      [0, 7, 0], [4.8, 7, 0], [4.8, 5, 0], [4.8, 5, 0.3], [4.8, 3, 0.3], [4.8, 3, 3.5],
      [4.0, 3, 3.5], [4.0, 3, 0.3], [4.0, 5, 0.3], [4.0, 5, 0], [4.0, 7, 0], [0, 7, 0],
    ],
  },
  // National budget: a civic building with columns.
  "national-budget-transparency-portal": {
    label: "Isometric government building with columns",
    grid: 8,
    boxes: [
      { at: [1, 1, 0], size: [6, 4, 0.4] },
      { at: [1.4, 1.4, 0.4], size: [5.2, 2.4, 2.4] },
      { at: [1.6, 4.2, 0.4], size: [0.5, 0.5, 2.4] },
      { at: [2.9, 4.2, 0.4], size: [0.5, 0.5, 2.4] },
      { at: [4.2, 4.2, 0.4], size: [0.5, 0.5, 2.4] },
      { at: [5.5, 4.2, 0.4], size: [0.5, 0.5, 2.4] },
      { at: [0.8, 0.8, 2.8], size: [6.4, 4.4, 0.4] },
      { at: [1.6, 1.6, 3.2], size: [4.8, 2.8, 0.35] },
    ],
    route: [
      [0, 7, 0], [7, 7, 0], [7, 5, 0], [7, 5, 0.4], [1, 5, 0.4], [1, 5, 0], [1, 7, 0], [0, 7, 0],
    ],
  },
  // Environmental network: voxel trees and a parcel for the shop.
  "eco-africa-network": {
    label: "Isometric voxel trees beside a parcel",
    grid: 8,
    boxes: [
      { at: [5, 1, 0], size: [1.5, 1.5, 1] },
      { at: [2.2, 2.2, 0], size: [0.6, 0.6, 1.4] },
      { at: [1.5, 1.5, 1.4], size: [2, 2, 2] },
      { at: [5.0, 4.4, 0], size: [0.5, 0.5, 1] },
      { at: [4.45, 3.85, 1], size: [1.6, 1.6, 1.6] },
    ],
    decals: [[[5, 1.75, 1], [6.5, 1.75, 1]]],
    route: [
      [0, 7, 0], [7, 7, 0], [7, 2.5, 0], [6.5, 2.5, 0], [6.5, 2.5, 1], [6.5, 1, 1],
      [6.5, 1, 0], [7, 1, 0], [7, 7, 0], [0, 7, 0],
    ],
  },
  // Mentorship and live coding: an open laptop with chat bubbles.
  "no-xp": {
    label: "Isometric laptop with floating chat bubbles",
    grid: 8,
    boxes: [
      { at: [0.4, 0.6, 2.6], size: [1.2, 1.2, 0.8] },
      { at: [2, 2.5, 0], size: [4, 2.8, 0.3] },
      { at: [2, 2.2, 0.3], size: [4, 0.3, 2.8] },
      { at: [6.4, 1.2, 2.2], size: [1.2, 1.2, 0.8] },
    ],
    decals: [
      [[2.5, 2.5, 2.5], [4.2, 2.5, 2.5]],
      [[2.9, 2.5, 2.0], [5.3, 2.5, 2.0]],
      [[2.9, 2.5, 1.5], [4.6, 2.5, 1.5]],
      [[2.5, 2.5, 1.0], [3.6, 2.5, 1.0]],
    ],
    route: [
      [0, 7, 0], [6, 7, 0], [6, 5.3, 0], [6, 5.3, 0.3], [2, 5.3, 0.3], [2, 5.3, 0], [2, 7, 0], [0, 7, 0],
    ],
  },
};

const fallback: Scene = {
  label: "Isometric block",
  grid: 8,
  boxes: [{ at: [2.5, 2.5, 0], size: [3, 3, 2] }],
  route: [[0, 7, 0], [5.5, 7, 0], [5.5, 5.5, 0], [5.5, 5.5, 2], [2.5, 5.5, 2], [2.5, 5.5, 0], [2.5, 7, 0], [0, 7, 0]],
};

export function ProjectIllustration({ slug, className }: { slug: string; className?: string }) {
  const scene = scenes[slug] ?? fallback;
  const { grid, boxes, decals = [], route, label } = scene;

  const all: V3[] = [
    [0, 0, 0], [grid, 0, 0], [0, grid, 0], [grid, grid, 0],
    ...boxes.flatMap((b) => Object.values(boxFaces(b)).flat()),
  ];
  const xs = all.map((v) => project(v)[0]);
  const ys = all.map((v) => project(v)[1]);
  const pad = 14;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - minX + pad;
  const height = Math.max(...ys) - minY + pad;

  const path = "M" + route.map((v) => project(v).map((n) => n.toFixed(2)).join(" ")).join(" L");
  const length = route.slice(1).reduce((sum, v, i) => {
    const p = route[i];
    return sum + Math.hypot(v[0] - p[0], v[1] - p[1], v[2] - p[2]);
  }, 0);

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${height}`}
      className={clsx("iso", className)}
      role="img"
      aria-label={label}
    >
      <g className="iso-grid">
        {Array.from({ length: grid + 1 }, (_, i) => (
          <g key={i}>
            <polyline points={points([[i, 0, 0], [i, grid, 0]])} />
            <polyline points={points([[0, i, 0], [grid, i, 0]])} />
          </g>
        ))}
      </g>

      <path d={path} className="iso-route" />

      <g className="iso-objects">
      {boxes.map((box, i) => {
        const f = boxFaces(box);
        return (
          <g key={i}>
            <polygon points={points(f.left)} className="iso-face iso-left" />
            <polygon points={points(f.right)} className="iso-face iso-right" />
            <polygon points={points(f.top)} className="iso-face iso-top" />
          </g>
        );
      })}

      {decals.map(([a, b], i) => (
        <polyline key={i} points={points([a, b])} className="iso-decal" />
      ))}
      </g>

      <g className="motion-dot">
        <circle r={6} className="iso-dot-halo" />
        <circle r={2.6} className="iso-dot" />
        <animateMotion dur={`${(length * 0.45).toFixed(1)}s`} repeatCount="indefinite" path={path} />
      </g>
    </svg>
  );
}
