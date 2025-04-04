import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { simulationFormSchema, type SimulationFormValues } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export function SimulationForm({
  className,
  onSubmit,
  ...props
}: {
  className?: string;
  onSubmit: (data: SimulationFormValues) => void;
}) {
  const form = useForm<SimulationFormValues>({
    resolver: zodResolver(simulationFormSchema),
  });

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none rounded-none shadow-none w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Simulation Form
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Please fill in the details below to run the simulation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <Label className="my-2">Location</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hyderabad">Hyderabad (IND)</SelectItem>
                        <SelectItem value="Delhi">Delhi (IND)</SelectItem>
                        <SelectItem value="Chennai">Chennai (IND)</SelectItem>
                        <SelectItem value="Tokyo">Tokyo (JP)</SelectItem>
                        <SelectItem value="Houston">Houston (US)</SelectItem>
                        <SelectItem value="Dusseldorf">Dusseldorf (DE)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chilledWaterTemp"
                render={({ field }) => (
                  <FormItem>
                    <Label className="my-2">Chilled Water Temperature Setpoint (°C)</Label>
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
                    <Label className="my-2">Cooling Tower's Cooling Water Temperature (°C)</Label>
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
                    <Label className="my-2">AHU Opening in %</Label>
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

              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}