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
import { SimulationFormValues } from "./lib/validation";

export const description = "An interactive bar chart"


interface ResultProps {
    loading: boolean;
    chartData: SaverXPredictionResponse | null;
    formData: SimulationFormValues | null;
}




const ProgressiveMultiStepLoader = () => {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        if (step < steps.length - 1) {
            const isNeuralStep = steps[step]?.isNeuralNet;
            const delay = isNeuralStep ? 22000 : 1000;

            const timer = setTimeout(() => setStep((prev) => prev + 1), delay);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return <EnhancedBWLoadingSteps currentStep={step} />;
};


const SimulationResult: React.FC<ResultProps> = ({ loading, chartData, formData }) => {
    const [activeChart, setActiveChart] = React.useState<string>("monthly")

    // Calculate adjusted energy consumption based on boiler temperature
    const getAdjustedEnergyConsumption = (baseConsumption: number) => {
        if (!formData?.boilerOutletSetpointTemp) return baseConsumption;
        
        const boilerTemp = parseInt(formData.boilerOutletSetpointTemp);
        let adjustmentPercentage = 0;
        
        switch (boilerTemp) {
            case 50:
                adjustmentPercentage = -5;
                break;
            case 60:
                adjustmentPercentage = -2.5;
                break;
            case 70:
                adjustmentPercentage = 2.5;
                break;
            case 80:
                adjustmentPercentage = 5;
                break;
            default:
                return baseConsumption;
        }
        
        return baseConsumption * (1 + adjustmentPercentage / 100);
    };

    if (loading) {
        return <ProgressiveMultiStepLoader />;
    }

    return (
        <div className="mx-24 my-24 flex items-center justify-center w-full h-full  ">
            {
                chartData ?
                <Card className="overflow-hidden border-none rounded-none shadow-none w-full">
                            <p className="text-xl font-bold text-center mb-10"> Result</p>
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

                                <CardDescription className="text-base">
                                    <p className="text-black flex items-center gap-2">
                                        <Square className="h-4 w-4 fill-[#F0842C] stroke-0" /> Energy Consumption (in its original state): <span className="font-bold">{getAdjustedEnergyConsumption(chartData?.Energy_Consumption_without_SaverX || 0).toFixed(2)} kWh </span> 
                                    </p>
                                    <p className="text-black flex items-center gap-2">
                                        <Square className="h-4 w-4 fill-[#1B617D] stroke-0" /> Energy Consumption (SaverX integrated): <span className="font-bold">{chartData?.Predicted_Energy_Consumption_with_SaverX || 0} kWh </span> 
                                    </p>
                                    <p className="text-black flex items-center gap-2"> <Square className="h-4 w-4 fill-[#000000]" />Savings: <span className="font-bold"> {chartData.Predicted_Savings || 0} %</span> </p>
                                </CardDescription>
                            </div>
                            <div className="flex justify-center align-middle">

                                <button
                                    className={" cursor-pointer elative z-30 flex flex-1 flex-col justify-center gap-1  px-2 py-2 text-left sm:px-4 sm:py-4 h-[5vh] " + (activeChart === "monthly" ? " bg-muted" : "")}
                                    onClick={() => setActiveChart("monthly")}
                                >
                                    <span className="text-md font-bold text-foreground">
                                        Month
                                    </span>
                                </button>

                                <button
                                    className={" cursor-pointer relative z-30 flex flex-1 flex-col justify-center gap-1  px-2 py-2 text-left  sm:px-4 sm:py-4 h-[5vh]" + (activeChart === "daily" ? " bg-muted" : "")}

                                    onClick={() => setActiveChart("daily")}
                                >
                                    <span className="text-md font-bold text-foreground">
                                        &nbsp;Day  &nbsp; 
                                    </span>
                                </button>

                            </div>
                        </CardHeader>
                    </Card>
                    :
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <p className="text-md font-bold">Please run the simulation to view the result.</p>
                    </div>
            }
        </div>

    )
}


export default SimulationResult