export type ProductType = 'cuenta_remunerada' | 'deposito_plazo' | 'apv' | 'fondo_mutuo';
export type TermUnit = 'días' | 'meses' | 'años';
export type CategoryType =
  | 'vivienda'
  | 'vehiculo'
  | 'viaje'
  | 'tecnologia'
  | 'educacion'
  | 'emergencia'
  | 'otro';

export interface SimulatorFormData {
  objectiveName: string;
  category: CategoryType;
  targetAmount: number;
  initialAmount: number;
  monthlyContribution: number;
  termValue: number;
  termUnit: TermUnit;
  productType: ProductType;
  annualRate: number;
}

export interface MonthlyDataPoint {
  mes: number;
  saldo: number;
  aportado: number;
  intereses: number;
}

export interface TableDataPoint {
  mes: number;
  saldoInicio: number;
  interesMes: number;
  aporteMes: number;
  saldoFinal: number;
}

export interface AnnualSummaryPoint {
  año: number;
  saldoInicio: number;
  totalIntereses: number;
  totalAportes: number;
  saldoFinal: number;
}

export interface SimulationResult {
  finalAmount: number;
  totalContributed: number;
  interestEarned: number;
  reachesGoal: boolean;
  surplus: number;
  gap: number;
  targetAmount: number;
  monthlyData: MonthlyDataPoint[];
  tableData: TableDataPoint[];
  annualData: AnnualSummaryPoint[];
}

export interface ProductInfo {
  id: ProductType;
  name: string;
  defaultRate: number;
  riskLevel: 'Muy bajo' | 'Bajo' | 'Medio' | 'Alto';
  description: string;
  advantages: string[];
  considerations: string[];
  bestFor: string;
  rateTerminology: string;
  rateNote: string;
}
