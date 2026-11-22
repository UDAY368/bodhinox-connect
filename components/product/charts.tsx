/*
 * Inline SVG charts styled like the CRM's dashboard charts (soft grid lines,
 * chart-1..5 palette). No chart library: mock-ups only.
 */

function path(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function smooth(points: [number, number][]) {
  if (points.length < 2) return path(points);
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

type Series = { values: number[]; color: string; fill?: boolean };

export function AreaChart({
  series,
  labels,
  width = 640,
  height = 200,
  max,
  gridLines = 4,
}: {
  series: Series[];
  labels?: string[];
  width?: number;
  height?: number;
  max?: number;
  gridLines?: number;
}) {
  const padL = 28;
  const padB = labels ? 22 : 6;
  const w = width - padL;
  const h = height - padB - 6;
  const top = max ?? Math.ceil(Math.max(...series.flatMap((s) => s.values)) / 25) * 25;
  const n = series[0]?.values.length ?? 0;
  const x = (i: number) => padL + (i / Math.max(1, n - 1)) * w;
  const y = (v: number) => 6 + h - (v / top) * h;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="block overflow-visible">
      {Array.from({ length: gridLines + 1 }, (_, i) => {
        const v = (top / gridLines) * i;
        return (
          <g key={i}>
            <line x1={padL} x2={width} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeDasharray={i ? "3 4" : undefined} />
            <text x={0} y={y(v) + 4} fontSize="10" fill="var(--muted-foreground)">
              {Math.round(v)}
            </text>
          </g>
        );
      })}
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => [x(i), y(v)] as [number, number]);
        const line = smooth(pts);
        return (
          <g key={si}>
            {s.fill ? (
              <path d={`${line} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={s.color} opacity="0.12" />
            ) : null}
            <path d={line} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      })}
      {labels?.map((l, i) =>
        l ? (
          <text key={i} x={x(i)} y={height - 4} fontSize="10" textAnchor="middle" fill="var(--muted-foreground)">
            {l}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function BarChart({
  values,
  labels,
  width = 320,
  height = 140,
  color = "var(--chart-1)",
  highlight,
}: {
  values: number[];
  labels?: string[];
  width?: number;
  height?: number;
  color?: string;
  highlight?: number;
}) {
  const padB = labels ? 18 : 0;
  const max = Math.max(...values);
  const gap = 6;
  const bw = (width - gap * (values.length - 1)) / values.length;
  const h = height - padB;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="block">
      {values.map((v, i) => {
        const bh = Math.max(3, (v / max) * (h - 4));
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={h - bh}
            width={bw}
            height={bh}
            rx={Math.min(4, bw / 3)}
            fill={color}
            opacity={highlight === undefined || highlight === i ? 1 : 0.35}
          />
        );
      })}
      {labels?.map((l, i) => (
        <text key={i} x={i * (bw + gap) + bw / 2} y={height - 3} fontSize="10" textAnchor="middle" fill="var(--muted-foreground)">
          {l}
        </text>
      ))}
    </svg>
  );
}

export function Donut({
  parts,
  size = 140,
  thickness = 16,
  center,
  sub,
}: {
  parts: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  center?: string;
  sub?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = parts.reduce((a, p) => a + p.value, 0);
  const lens = parts.map((p) => (p.value / total) * c);
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={thickness} />
        {parts.map((p, i) => {
          const len = lens[i];
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(0, len - 2)} ${c}`}
              strokeDashoffset={-offsets[i]}
            />
          );
        })}
      </g>
      {center ? (
        <text x="50%" y={sub ? "48%" : "53%"} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--foreground)">
          {center}
        </text>
      ) : null}
      {sub ? (
        <text x="50%" y="62%" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
          {sub}
        </text>
      ) : null}
    </svg>
  );
}

export function Sparkline({ values, width = 96, height = 28, color = "var(--chart-1)" }: { values: number[]; width?: number; height?: number; color?: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * width, height - 2 - ((v - min) / (max - min || 1)) * (height - 4)] as [number, number]);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="block">
      <path d={smooth(pts)} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Busiest-hours heatmap: rows of cells with opacity by value 0-1. */
export function Heatmap({ rows, cell = 14, gap = 3 }: { rows: number[][]; cell?: number; gap?: number }) {
  const cols = rows[0]?.length ?? 0;
  return (
    <svg viewBox={`0 0 ${cols * (cell + gap)} ${rows.length * (cell + gap)}`} width="100%" className="block">
      {rows.map((r, ri) =>
        r.map((v, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={ci * (cell + gap)}
            y={ri * (cell + gap)}
            width={cell}
            height={cell}
            rx="3"
            fill="var(--chart-1)"
            opacity={0.08 + v * 0.85}
          />
        )),
      )}
    </svg>
  );
}
