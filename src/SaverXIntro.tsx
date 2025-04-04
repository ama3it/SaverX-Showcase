import { FlipWords } from "@/components/ui/flip-words";

const SaverXIntro = () => {
  const words = [
    "AI edge device that can Understands HVAC needs in real-time, optimizing energy consumption smartly.",
    "Works with any building, saving energy costs effectively from day one.",
    "Integrates with control systems without disrupting HVAC performance at all."
  ];

  return (
    <div className="min-h-screen flex justify-center items-center px-4 h-full">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side - centered content */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-3xl font-bold text-black dark:text-neutral-400">
              &nbsp;SaverX
              <br />
              <FlipWords words={words} className="font-normal text-gray-500 text-xl" />
            </div>
          </div>

          {/* Right side - introduction text */}
          <div className="flex flex-col justify-center space-y-6 text-gray-600 dark:text-gray-400">
            <h2 className="text-2xl font-semibold text-black dark:text-neutral-400">
              Intro
            </h2>

            <p className="text-base leading-relaxed">
              Welcome to the interactive demo of SaverX, our AI-driven intelligence for HVAC energy optimization.
            </p>
            <p className="text-base leading-relaxed">
              Explore the interface to understand the core features and impact of SaverX. You'll see
              how it intelligently analyzes real-time building data, makes real-time changes in settings
              of the HVAC systems, and seamlessly integrates with your existing infrastructure to
              optimize energy usage.
            </p>
            <div className="p-4 rounded-lg text-sm">
              <p className="font-sm  mb-2">Please note:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>This demo is illustrative and actual results may vary depending on the deployment environment.</li>
                <li>The simulation is based on data from an average building where SaverX has been deployed.</li>
                <li>Insights shown here are generated in real-time.</li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default SaverXIntro;