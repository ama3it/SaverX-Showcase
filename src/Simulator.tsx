import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { simulationFormSchema, type SimulationFormValues } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import HvacScene from "./components/Hvac";

interface SimulatorProps {
    onSimulate: (data: SimulationFormValues) => Promise<void>;
}

const Simulator: React.FC<SimulatorProps> = ({ onSimulate }) => {
    const form = useForm<SimulationFormValues>({
        resolver: zodResolver(simulationFormSchema),
    });

    // Add this to check if form is complete
    // const isFormComplete = form.watch(['location', 'chilledWaterTemp', 'coolingWaterTemp', 'ahuOpening']).every(Boolean);

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left Side - 3D Building */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F8FAFC] p-5">
                <HvacScene />
            </div>

            {/* Right Side - Tabs and Content */}
            <div className="w-full md:w-1/2  flex items-center justify-center"> {/* reduced padding */}
                <Card className="overflow-hidden p-0 border-none rounded-none shadow-none w-full max-w-md"> {/* added max-width */}
                    <CardHeader className=""> {/* reduced padding */}
                        <CardTitle className="text-xl font-bold text-center"> {/* reduced text size */}
                            Simulation
                        </CardTitle>
                        <CardDescription className="text-sm text-center"> {/* reduced text size */}
                            Fill in the details below to run the simulation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className=""> {/* reduced padding */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSimulate)} className="flex flex-col gap-2 overflow-auto"> {/* reduced gap */}
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Select City</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select city" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="hyderabad">Hyderabad (IND)</SelectItem>
                                                    <SelectItem value="delhi">Delhi (IND)</SelectItem>
                                                    <SelectItem value="chennai">Chennai (IND)</SelectItem>
                                                    <SelectItem value="tokyo">Tokyo (JP)</SelectItem>
                                                    <SelectItem value="houston">Houston (US)</SelectItem>
                                                    <SelectItem value="dusseldorf">Dusseldorf (DE)</SelectItem>
                                                    <SelectItem value="bahrain">Bahrain (BH)</SelectItem>
                                                    <SelectItem value="singapore">Singapore (SG)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Label className="mt-2"> Select baseline settings</Label>
                                <p className="text-sm text-muted-foreground">Three well known paramters have been selected for simulation purposes. In real-time, it could be more number of HVAC parameters. </p>
                                <FormField
                                    control={form.control}
                                    name="chilledWaterTemp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Chilled Water Temperature Setpoint (°C)</Label>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {["6", "7", "8", "9"].map((temp) => (
                                                        <Label key={temp} className="flex items-center gap-2">
                                                            <RadioGroupItem value={temp} /> {temp} °C
                                                        </Label>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coolingWaterTemp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Cooling Tower's Cooling Water Temperature (°C)</Label>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {["29", "30", "31"].map((temp) => (
                                                        <Label key={temp} className="flex items-center gap-2">
                                                            <RadioGroupItem value={temp} /> {temp} °C
                                                        </Label>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ahuOpening"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>AHU Opening in %</Label>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {["80", "90", "100"].map((opening) => (
                                                        <Label key={opening} className="flex items-center gap-2">
                                                            <RadioGroupItem value={opening} /> {opening} %
                                                        </Label>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full rounded-none bg-[#000] text-white cursor-pointer hover:bg-[#F8FAFC] hover:text-black"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    Simulate
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default Simulator;
