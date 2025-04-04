import { SimulationForm } from "./components/SimulationForm";
import HvacScene from "./components/Hvac";



const Simulator = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left Side - 3D Building */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F8FAFC] p-4">
                <HvacScene />
            </div>

            {/* Right Side - Tabs and Content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <SimulationForm className={{}}/>
            </div>

        </div>
    );
};

export default Simulator;
