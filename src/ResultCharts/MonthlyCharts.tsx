import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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


export function MonthlyCharts({chartData}:{chartData:SaverXPredictionResponse}) {
    console.log("MonthlyCharts", chartData.monthly_chart_data)
    return (
        <ChartContainer config={chartConfig}>

        <BarChart accessibilityLayer data={chartData?.monthly_chart_data}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(6, 10)}
            />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="normal" fill="#818589" radius={4} />
            <Bar dataKey="saverx" fill="#1b617d" radius={4} />
        </BarChart>
        </ChartContainer>

    )
}
