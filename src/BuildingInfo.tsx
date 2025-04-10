import { Tabs } from "@/components/ui/tabs";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useBuilding } from "./context/BuildingContext";
import ShoppingMallScene from "./components/ShoppingMall";
import BuildingScene from "@/components/ui/building";

interface BuildingData {
    name: string;
    value: string;
}

interface TableDemoProps {
    buildingdata: BuildingData[];
}

function getLastMonth(): string {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString('default', { month: 'long' });
}

const officedata = [
    {
        name: "Chillers",
        value: "2 Water Cooled Chillers"
    },
    {
        name: "AHUs",
        value: "11"
    },
    {
        name: "Working Hours",
        value: "13 hours/day"
    },
    {
        name: "No of floors",
        value: "11"
    },
    {
        name: "Duration",
        value: `${getLastMonth()} (one month)`
    }
]

const malldata = [
    {
        name: "Chillers",
        value: "2 Water Cooled Chillers"
    },
    {
        name: "AHUs",
        value: "11"
    },
    {
        name: "Working Hours",
        value: "13 hours/day"
    },
    {
        name: "No of floors",
        value: "5"
    },
    {
        name: "Duration",
        value: `${getLastMonth()} (one month)`
    }
]

export function BuildingInfo() {

    const tabs = [
        {
            title: "Office",
            value: "Office",
            content: (
                <div className="w-full overflow-hidden relative h-2/3 p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-gray-50 to-gray-200">
                    <InfoTable buildingdata={officedata} />
                </div>
            ),
        },
        {
            title: "Mall",
            value: "Mall",
            content: (
                <div className="w-full overflow-hidden relative h-2/3 p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-gray-50 to-gray-200">

                    <InfoTable buildingdata={malldata} />
                </div>
            ),
        }
    ];

    return (
        <div className="h-[90vh] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full mt-15 items-start justify-start">
            <p className="font-bold text-2xl my-5 mx-auto">Select Building type</p>
            <Tabs tabs={tabs} />
        </div>
    );
}

const BuildngComponent = () => {

    const { selectedBuilding } = useBuilding();
    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left Side - 3D Building */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F8FAFC] p-4">
                {
                    selectedBuilding === "Office" ?
                        <BuildingScene />
                        :
                        <ShoppingMallScene />
                }
            </div>

            {/* Right Side - Tabs and Content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">

                <BuildingInfo />

            </div>

        </div>
    );
};

export default BuildngComponent;


export function InfoTable({ buildingdata }: TableDemoProps) {
    return (
        <Table>
            <TableBody>
                {buildingdata.map((data) => (
                    <TableRow key={data.name}>
                        <TableCell className="font-medium text-xl text-gray-500 ">{data.name}:</TableCell>
                        <TableCell className="text-xl text-gray-700 ">{data.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
