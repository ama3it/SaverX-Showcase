import { Tabs } from "@/components/ui/tabs";
import Building from "@/components/ui/building";
import Scene from "./components/mall";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

interface BuildingData {
    name: string;
    value: string;
}

interface TableDemoProps {
    buildingdata: BuildingData[];
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
         value: "One Month"
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
        value: "11"
    },
    {
        name: "Duration",
         value: "One Month"
     }
]
export function BuildingInfo() {
    const tabs = [
        {
            title: "Office",
            value: "Office",
            content: (
                <div className="w-full overflow-hidden relative h-2/3 p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#183B4E] to-[#27548A]">
                    <p>Office</p>
                    <TableDemo buildingdata={officedata} />
                </div>
            ),
        },
        {
            title: "Mall",
            value: "Mall",
            content: (
                <div className="w-full overflow-hidden relative h-2/3 p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#F26B0F] to-[#FCC737]">
                    <p>Mall</p>
                    <TableDemo buildingdata={malldata}  />
                </div>
            ),
        }
    ];

    return (
        <div className="h-full [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
            <Tabs tabs={tabs} />
        </div>
    );
}

const BuildngComponent = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left Side - 3D Building */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F8FAFC] p-4">
                <Building />

                {/* <Scene/> */}
            </div>

            {/* Right Side - Tabs and Content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <BuildingInfo />
            </div>

        </div>
    );
};

export default BuildngComponent;


export function TableDemo({ buildingdata }: TableDemoProps) {
    return (
        <Table>
            <TableBody>
                {buildingdata.map((data) => (
                    <TableRow key={data.name}>
                        <TableCell className="font-medium">{data.name}</TableCell>
                        <TableCell>{data.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
