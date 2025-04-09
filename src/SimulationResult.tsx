import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card"

import EnhancedBWLoadingSteps, { steps } from "@/components/LoadingSteps";
import { SaverXPredictionResponse } from "./lib/reponse";
import { MonthlyCharts } from "./ResultCharts/MonthlyCharts";
import { DailyGraph } from "./ResultCharts/DailyGraph";
import { Square } from "lucide-react";

export const description = "An interactive bar chart"


interface ResultProps {
    loading: boolean;
    chartData: SaverXPredictionResponse | null;
}




const ProgressiveMultiStepLoader = () => {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        if (step < steps.length - 1) {
            const isNeuralStep = steps[step]?.isNeuralNet;
            const delay = isNeuralStep ? 5000 : 1000;

            const timer = setTimeout(() => setStep((prev) => prev + 1), delay);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return <EnhancedBWLoadingSteps currentStep={step} />;
};


const SimulationResult: React.FC<ResultProps> = ({ loading, chartData }) => {
    const [activeChart, setActiveChart] = React.useState<string>("monthly")
    
    if (loading) {
        return <ProgressiveMultiStepLoader />;
    }

    return (
        <div className="mx-24 my-24 flex items-center justify-center w-full h-full  ">
        {
            chartData?
            <Card className="overflow-hidden border-none rounded-none shadow-none w-full">
            <CardContent className="px-2">
                {
                    activeChart === "monthly" ?
                        < MonthlyCharts chartData={chartData} />
                        :
                        <DailyGraph chartData={chartData} />
                }
            </CardContent>

            <CardHeader className="flex flex-col items-stretch space-y-0  p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">

                    <CardDescription>
                        <p className="text-xl  text-black flex items-center gap-2">
                            <Square className="h-4 w-4 fill-[#F0842C] stroke-0" /> Energy Consumption (in its original state): {chartData?.Energy_Consumption_without_SaverX || 0} kWh
                        </p>
                        <p className="text-xl  text-black flex items-center gap-2">
                            <Square className="h-4 w-4 fill-[#1B617D] stroke-0" /> Energy Consumption (Saverx integrated): {chartData?.Predicted_Energy_Consumption_with_SaverX || 0} kWh
                        </p>
                        <p className="text-xl font-bold text-black">Savings: {chartData.Predicted_Savings || 0} %</p>
                    </CardDescription>
                </div>
                <div className="flex">

                    <button
                        className={" cursor-pointer elative z-30 flex flex-1 flex-col justify-center gap-1  px-2 py-2 text-left sm:px-4 sm:py-4" + (activeChart === "monthly" ? " bg-muted" : "")}
                        onClick={() => setActiveChart("monthly")}
                    >
                        <span className="text-md font-bold text-foreground">
                            Month
                        </span>
                    </button>

                    <button
                        className={" cursor-pointer relative z-30 flex flex-1 flex-col justify-center gap-1  px-6 py-4 text-left  sm:px-8 sm:py-6" + (activeChart === "daily" ? " bg-muted" : "")}

                        onClick={() => setActiveChart("daily")}
                    >
                        <span className="text-md font-bold text-foreground">
                            Day
                        </span>
                    </button>

                </div>
            </CardHeader>
        </Card>
            :
            <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-md font-bold">No data available. Please run the simulation.</p>
            </div>
        }
        </div>

    )
}


export default SimulationResult