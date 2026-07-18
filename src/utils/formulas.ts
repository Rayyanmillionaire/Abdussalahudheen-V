/**
 * Calculates the Future Value of a Systematic Investment Plan (SIP)
 * FV = P × [((1 + r)^n - 1) / r] × (1 + r)
 * 
 * @param monthlyInvestment - The monthly SIP amount
 * @param annualReturnPercentage - Expected annual return (e.g., 12 for 12%)
 * @param years - Investment duration in years
 * @returns An object containing Total Investment, Future Value, and Wealth Created (Gain)
 */
export function calculateSIP(
  monthlyInvestment: number, 
  annualReturnPercentage: number, 
  years: number
) {
  const totalInvestment = monthlyInvestment * 12 * years;
  
  const r = (annualReturnPercentage / 100) / 12; // monthly rate
  const n = years * 12; // total months
  
  let futureValue = 0;
  
  if (r === 0) {
    futureValue = totalInvestment;
  } else {
    futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }
  
  return {
    totalInvestment,
    futureValue: Math.round(futureValue),
    wealthCreated: Math.round(futureValue - totalInvestment)
  };
}


/**
 * Calculates recommended Term Insurance Cover (Human Life Value based on Income)
 * Recommended Cover = (Annual Income × 15) + Outstanding Loans + Future Goals − Existing Savings
 */
export function calculateTermInsurance(
  annualIncome: number,
  existingSavings: number,
  outstandingLoans: number,
  futureGoals: number,
  dependents: number
) {
  // Base multiplier is typically 10-15x for a standard working age
  const multiplier = 15;
  
  const recommendedCover = (annualIncome * multiplier) + outstandingLoans + futureGoals - existingSavings;
  const finalCover = Math.max(0, recommendedCover);

  // Rough estimation for monthly premium: ₹1.8 per ₹10,000 of cover per year / 12
  // Or simply: Cover * 0.00018 as per user prompt for monthly estimate
  const estimatedMonthlyPremium = finalCover * 0.00018;

  // Protection score based on dependents and gap
  // If dependents > 0 but they don't buy it, their score is low. 
  // Let's create a generic "health score" that acts as a visual prompt.
  let score = 85; 
  let scoreText = "Good";
  let scoreColor = "text-yellow-500";
  
  if (finalCover > 20000000) {
    score = 95;
    scoreText = "Excellent";
    scoreColor = "text-green-500";
  } else if (finalCover < 5000000) {
    score = 50;
    scoreText = "Needs Improvement";
    scoreColor = "text-red-500";
  }

  return {
    recommendedCover: Math.round(finalCover),
    estimatedMonthlyPremium: Math.round(estimatedMonthlyPremium),
    protectionScore: score,
    protectionScoreText: scoreText,
    protectionScoreColor: scoreColor
  };
}


/**
 * Calculates Retirement Needs
 */
export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentMonthlyExpenses: number,
  inflationRate: number,
  expectedReturn: number,
  currentSavings: number,
  monthlySIP: number
) {
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  
  // Future Monthly Expense at Retirement due to Inflation
  // FV = PV * (1 + r)^n
  const futureMonthlyExpenses = currentMonthlyExpenses * Math.pow(1 + (inflationRate / 100), yearsToRetire);
  
  // Retirement Corpus Required (Rule of thumb: 25x annual expenses, or 300x monthly expenses)
  const corpusRequired = futureMonthlyExpenses * 12 * 25; 
  
  // Future value of existing savings
  const fvSavings = currentSavings * Math.pow(1 + (expectedReturn / 100), yearsToRetire);
  
  // Future value of monthly SIPs until retirement
  const sipCalculation = calculateSIP(monthlySIP, expectedReturn, yearsToRetire);
  const fvSIP = sipCalculation.futureValue;
  
  const expectedCorpus = fvSavings + fvSIP;
  const corpusGap = Math.max(0, corpusRequired - expectedCorpus);
  
  // Calculate additional SIP required to fill the gap
  // M = Gap / [ ((1+r)^n - 1)/r * (1+r) ]
  let additionalSIPRequired = 0;
  if (corpusGap > 0 && yearsToRetire > 0) {
    const r = (expectedReturn / 100) / 12;
    const n = yearsToRetire * 12;
    additionalSIPRequired = corpusGap / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }

  // Readiness Score 0 - 100%
  let readinessScore = Math.min(100, Math.round((expectedCorpus / corpusRequired) * 100)) || 0;
  if (!isFinite(readinessScore)) readinessScore = 0;
  
  return {
    yearsRemaining: yearsToRetire,
    corpusRequired: Math.round(corpusRequired),
    expectedCorpus: Math.round(expectedCorpus),
    corpusGap: Math.round(corpusGap),
    additionalSIPRequired: Math.round(additionalSIPRequired),
    readinessScore
  };
}
