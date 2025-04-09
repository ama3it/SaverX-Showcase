import NeuralNetworkAnimation from "./NeuralNetworkAnimation";
import { cn } from "@/lib/utils";

export const steps = [
  { title: "Collecting parameters", description: "Gathering input data for simulation" },
  { title: "Initializing model", description: "Setting up the simulation environment" },
  { title: "Invoking the ai model", description: "Processing the data through our model" },
  { title: "Neural Network Processing", isNeuralNet: true },
  { title: "Setting Up integration", description: "Communicating the optimal settings to HVAC system." },
];

const BWLoadingSteps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="space-y-6 h-[80vh]">
      {steps.map((step, index) => {
        const isVisible = index <= currentStep;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className={cn(
              "flex items-start gap-4 transition-all duration-700 ease-in-out transform",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            {/* Step Indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border flex items-center justify-center transition-all duration-500",
                  isCompleted
                    ? "bg-black border-black text-white scale-100"
                    : isActive
                      ? "bg-black border-black scale-110"
                      : "border-gray-300 text-transparent scale-95"
                )}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : isActive ? (
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                ) : null}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-px flex-grow mt-1 mb-1 transition-all duration-700",
                    isCompleted ? "bg-black h-full" : "bg-gray-200 h-0"
                  )}
                  style={{ minHeight: "2rem" }}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-0.5 w-full min-h-[3.5rem] transition-all duration-500">
              <h3 className={cn(
                "text-sm font-semibold text-gray-800 flex items-center transition-all duration-500 ml-2",
                isActive ? "transform scale-105" : ""
              )}>
                { step.title}
                {isActive && !step.isNeuralNet && (
                  <span className="ml-2 inline-flex text-black">
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                )}
              </h3>

              {step.description && (
                <p className="text-xs text-gray-500">{step.description}</p>
              )}

              {step.isNeuralNet && (
                <div
                  className={cn(
                    "mt-4 transition-opacity duration-700 ease-in-out",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="w-full h-80 p-4 flex items-center justify-center">
                    <div
                      className={cn(
                        "w-full h-full transition-opacity duration-500 ease-in-out",
                        isActive ? "opacity-100" : "opacity-40"
                      )}
                    >
                    <NeuralNetworkAnimation key={`neural-${index}`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const EnhancedBWLoadingSteps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="space-y-10 my-10">
      <BWLoadingSteps currentStep={currentStep} />
    </div>
  );
};

export default EnhancedBWLoadingSteps;
