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

        <ChartContainer config={chartConfig} className="h-[40vh] w-full">
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
                        return value.split('-').slice(-1)[0]; // Gets the last part after splitting by '-'
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
                    stroke="#F0842C"
                    stackId="1"
                />

                <YAxis axisLine={false} label={{ value: "kWh", angle: -90, position: 'insideLeft' }} />
                <Area
                    dataKey="saverx"
                    type="natural"
                    fill="#FFFFFF"
                    fillOpacity={1}
                    stroke="#1B617D"
                    stackId="2"
                />
            </AreaChart>
        </ChartContainer>

    )
}
