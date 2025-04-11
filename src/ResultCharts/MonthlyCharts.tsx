import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { SaverXPredictionResponse } from "@/lib/reponse"
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",

    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",

    },
} satisfies ChartConfig


export function MonthlyCharts({ chartData }: { chartData: SaverXPredictionResponse }) {
    return (
        <ChartContainer config={chartConfig} className="h-[40vh] w-full">
            <BarChart accessibilityLayer data={chartData?.monthly_chart_data}>
                <defs>
                    <linearGradient id="saverxGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2484a4" />
                        <stop offset="100%" stopColor="#1b617d" />
                    </linearGradient>60
                </defs>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = date.toLocaleDateString('en-US', { month: 'short' }).toLowerCase();
                        return `${day} ${month}`;
                    }}
                />

                <YAxis axisLine={false} label={{ value: "kWh", angle: -90, position: 'insideLeft' }} />

                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="normal" fill="#F0842C" radius={4} />
                <Bar dataKey="saverx" fill="#1B617D" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
