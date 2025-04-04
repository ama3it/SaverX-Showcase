import { motion } from "framer-motion";

const steps = [
  "Analyzing input parameters...",
  "Running simulation model...",
  "Calculating energy savings...",
  "Generating results..."
];

export function LoadingSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: index <= currentStep ? 1 : 0.3,
            y: 0 
          }}
          className="flex items-center gap-3"
        >
          <motion.div
            className={`h-4 w-4 rounded-full ${
              index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
          <span className={index <= currentStep ? 'text-primary' : 'text-gray-400'}>
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}