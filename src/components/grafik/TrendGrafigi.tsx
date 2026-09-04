"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export type TrendNoktasi = { ad: string; gercek?: number; tahmin?: number };

export function TrendGrafigi({ veri }: { veri: TrendNoktasi[] }) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={veri} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid stroke="var(--line-soft)" vertical={false} />
          <XAxis
            dataKey="ad"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Line
            type="monotone"
            dataKey="gercek"
            stroke="var(--down)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--down)" }}
            isAnimationActive={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="tahmin"
            stroke="var(--brand)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: "var(--brand)" }}
            isAnimationActive={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
