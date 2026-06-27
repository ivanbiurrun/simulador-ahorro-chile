import type {
  MonthlyDataPoint,
  TableDataPoint,
  AnnualSummaryPoint,
  SimulationResult,
} from '@/types';

export function simulate(
  initialAmount: number,
  monthlyContribution: number,
  annualRatePercent: number,
  termMonths: number,
  targetAmount: number
): SimulationResult {
  const monthlyRate = annualRatePercent / 100 / 12;

  // --- Chart data (cumulative, sampled for performance) ---
  const allMonthly: MonthlyDataPoint[] = [];
  let balance = initialAmount;
  allMonthly.push({ mes: 0, saldo: Math.round(balance), aportado: Math.round(initialAmount), intereses: 0 });

  for (let month = 1; month <= termMonths; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    const contributed = initialAmount + monthlyContribution * month;
    allMonthly.push({
      mes: month,
      saldo: Math.round(balance),
      aportado: Math.round(contributed),
      intereses: Math.round(balance - contributed),
    });
  }

  // --- Table data (per-month breakdown, no sampling) ---
  const tableData: TableDataPoint[] = [];
  tableData.push({ mes: 0, saldoInicio: 0, interesMes: 0, aporteMes: initialAmount, saldoFinal: initialAmount });

  let tBalance = initialAmount;
  for (let month = 1; month <= termMonths; month++) {
    const saldoInicio = tBalance;
    const interesMes = saldoInicio * monthlyRate;
    const aporteMes = monthlyContribution;
    tBalance = saldoInicio + interesMes + aporteMes;
    tableData.push({
      mes: month,
      saldoInicio: Math.round(saldoInicio),
      interesMes: Math.round(interesMes),
      aporteMes: Math.round(aporteMes),
      saldoFinal: Math.round(tBalance),
    });
  }

  // --- Annual summaries ---
  const annualData: AnnualSummaryPoint[] = [];
  const fullYears = Math.floor(termMonths / 12);

  for (let year = 1; year <= fullYears; year++) {
    const startIdx = (year - 1) * 12;
    const endIdx = year * 12;
    const yearRows = tableData.slice(startIdx + 1, endIdx + 1);
    annualData.push({
      año: year,
      saldoInicio: tableData[startIdx].saldoFinal,
      totalIntereses: Math.round(yearRows.reduce((s, r) => s + r.interesMes, 0)),
      totalAportes: Math.round(yearRows.reduce((s, r) => s + r.aporteMes, 0)),
      saldoFinal: tableData[endIdx].saldoFinal,
    });
  }

  // Partial last year (if termMonths is not a multiple of 12)
  const lastCompleteMonth = fullYears * 12;
  if (lastCompleteMonth < termMonths) {
    const yearRows = tableData.slice(lastCompleteMonth + 1, termMonths + 1);
    annualData.push({
      año: fullYears + 1,
      saldoInicio: tableData[lastCompleteMonth].saldoFinal,
      totalIntereses: Math.round(yearRows.reduce((s, r) => s + r.interesMes, 0)),
      totalAportes: Math.round(yearRows.reduce((s, r) => s + r.aporteMes, 0)),
      saldoFinal: tableData[termMonths].saldoFinal,
    });
  }

  const finalAmount = Math.round(balance);
  const totalContributed = Math.round(initialAmount + monthlyContribution * termMonths);
  const interestEarned = finalAmount - totalContributed;
  const reachesGoal = finalAmount >= targetAmount;

  return {
    finalAmount,
    totalContributed,
    interestEarned,
    reachesGoal,
    surplus: reachesGoal ? finalAmount - targetAmount : 0,
    gap: reachesGoal ? 0 : targetAmount - finalAmount,
    targetAmount,
    monthlyData: sampleData(allMonthly, termMonths),
    tableData,
    annualData,
  };
}

function sampleData(data: MonthlyDataPoint[], termMonths: number): MonthlyDataPoint[] {
  if (termMonths <= 36) return data;
  if (termMonths <= 120) return data.filter((_, i) => i % 3 === 0 || i === data.length - 1);
  return data.filter((_, i) => i % 12 === 0 || i === data.length - 1);
}
