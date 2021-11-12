import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    {
        view: 1000,
    },
    {
        view: 3190,
    },
    {
        view: 2490,
    },
];

function DailyMetric(props) {
    return (
        <div className="top__card">
            <h3>{props.title}</h3>
            <span>{props.subtitle}</span>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={props.data || data}>
                    <defs>
                        <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="30%" stopColor="#ff933d" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#ffd73d" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ffa43d" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <Tooltip />
                    <Area type="monotone" dataKey="view" stroke="#ff683d" strokeWidth={2} fillOpacity={1} fill="url(#colorview)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DailyMetric;
