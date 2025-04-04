import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { useState } from "react";
import NeuralNetworkAnimation from "./NeuralNetworkAnimation";

// Black and White Loading Steps Component
const BWLoadingSteps = ({ currentStep }) => {
  const steps = [
    { title: "Collecting parameters", description: "Gathering input data for simulation" },
    { title: "Initializing model", description: "Setting up the simulation environment" },
    { title: "Running simulation", description: "Processing the data through our model" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border flex items-center justify-center",
                  index <= currentStep
                    ? "bg-black border-black text-white"
                    : "border-gray-300"
                )}
              >
                {index < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : index === currentStep ? (
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                ) : (
                  ""
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 h-8",
                    index < currentStep ? "bg-black" : "bg-gray-200"
                  )}
                />
              )}
            </div>
            <div className="space-y-1 pt-0.5">
              <h3 className="text-sm font-medium">
                {step.title}
                {index === currentStep && (
                  <span className="ml-2 inline-flex">
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Extend LoadingSteps with Neural Network
const EnhancedBWLoadingSteps = ({ currentStep }) => {
  // Show the neural network when we reach step 3 (the final step)
  const showNeuralNetwork = currentStep === 3;
  
  return (
    <div className="space-y-6">
      <BWLoadingSteps currentStep={currentStep < 3 ? currentStep : 2} />
      
      {showNeuralNetwork && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-center">Processing with Deep Neural Network</h3>
          <div className="w-full h-80 border border-gray-200 rounded-lg bg-gray-50 p-4">
            <NeuralNetworkAnimation />
          </div>
        </div>
      )}
    </div>
  );
};

// Create a mock form schema
const formSchema = {
  location: ["Hyderabad", "Delhi", "Chennai", "Tokyo", "Houston", "Dusseldorf"],
  chilledWaterTemp: ["6", "7", "8", "9"],
  coolingWaterTemp: ["29", "30", "31"],
  ahuOpening: ["80", "90", "100"]
};

export function SimulationForm({
  className,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Mock form controls
  const control = {};
  const errors = {};
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit({});
  };

  const onSubmit = async(data) => {
    setIsLoading(true);
    
    // Simulate multi-step loading
    for (let i = 0; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingStep(i);
    }
    
    // Keep the neural network visible long enough to see the full animation
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Reset loading state after completion
    setIsLoading(false);
    setLoadingStep(0);
    
    console.log("Form Submitted", data);
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none rounded-none shadow-none w-full">
        {isLoading ? (
          <div className="p-8">
            <EnhancedBWLoadingSteps currentStep={loadingStep} />
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Simulation Form
              </CardTitle>
              <CardDescription className="text-center text-sm">
                Please fill in the details below to run the simulation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
                <div>
                  <Label className="my-2">Location</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hyderabad">Hyderabad (IND)</SelectItem>
                      <SelectItem value="Delhi">Delhi (IND)</SelectItem>
                      <SelectItem value="Chennai">Chennai (IND)</SelectItem>
                      <SelectItem value="Tokyo">Tokyo (JP)</SelectItem>
                      <SelectItem value="Houston">Houston (US)</SelectItem>
                      <SelectItem value="Dusseldorf">Dusseldorf (DE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="my-2">Chilled Water Temperature Setpoint (°C)</Label>
                  <RadioGroup>
                    {["6", "7", "8", "9"].map((temp) => (
                      <Label key={temp} className="flex items-center gap-2">
                        <RadioGroupItem value={temp} /> {temp} °C
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="my-2">Cooling Tower's Cooling Water Temperature (°C)</Label>
                  <RadioGroup>
                    {["29", "30", "31"].map((temp) => (
                      <Label key={temp} className="flex items-center gap-2">
                        <RadioGroupItem value={temp} /> {temp} °C
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="my-2">AHU Opening in %</Label>
                  <RadioGroup>
                    {["80", "90", "100"].map((opening) => (
                      <Label key={opening} className="flex items-center gap-2">
                        <RadioGroupItem value={opening} /> {opening} %
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">Submit</Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}