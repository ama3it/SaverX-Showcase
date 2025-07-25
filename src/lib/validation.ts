import { z } from "zod";


export const simulationFormSchema = z.object({
  location: z.enum(["hyderabad", "delhi", "chennai", "tokyo", "houston", "dusseldorf","bahrain","singapore"], {
    required_error: "Please select a location",
  }),
  chilledWaterTemp: z.enum(["6", "7", "8", "9"], {
    required_error: "Please select chilled water temperature",
  }),
  coolingWaterTemp: z.enum(["29", "30", "31"], {
    required_error: "Please select cooling water temperature",
  }),
  boilerOutletSetpointTemp:  z.enum(["50", "60", "70","80"]).optional(),
  ahuOpening: z.enum(["80", "90", "100"], {
    required_error: "Please select AHU opening percentage",
  }),
});

export type SimulationFormValues = z.infer<typeof simulationFormSchema>;