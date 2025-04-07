export interface SaverXPredictionResponse {
    Predicted_Energy_Consumption_with_SaverX: number;
    Energy_Consumption_without_SaverX: number;
    Predicted_Savings: number;
    two_day_chart_data: Array<{
      date: string;
      normal: number;
      saverx: number;
    }>;
    monthly_chart_data: Array<{
      date: string;
      normal: number;
      saverx: number;
    }>;
  }