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


export default EnhancedBWLoadingSteps;