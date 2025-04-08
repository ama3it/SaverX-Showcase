import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
        icon: TrendingDown,
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
        icon: TrendingUp,
    },
} satisfies ChartConfig

export function DailyGraph({ chartData }: { chartData: SaverXPredictionResponse }) {
    console.log("DailyGraph", chartData?.two_day_chart_data)
    return (

        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData?.two_day_chart_data}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
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
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="normal"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.2}
                    stroke="#D3D3D3"
                    stackId="1"
                />
           
                <YAxis axisLine={false} label={{ value: "kWh", angle: -90, position: 'insideLeft' }}  />
                <Area
                    dataKey="saverx"
                    type="natural"
                    fill="#FFFFFF"
                    fillOpacity={1}
                    // stroke="var(--color-desktop)"
                    stackId="2"
                />
            </AreaChart>
        </ChartContainer>

    )
}
