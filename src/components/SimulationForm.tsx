import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { useState } from "react";



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



  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none rounded-none shadow-none w-full">

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
            <form className="flex flex-col gap-4 p-2">
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
      </Card>
    </div>
  );
}