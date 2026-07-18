export const calculateHealthScore = (answers) => {
  let score = 0;

  // Q1
  if (answers.q1 === 'Sufficient savings') score += 10;
  if (answers.q1 === 'Investments') score += 7;
  if (answers.q1 === 'Insurance will support us') score += 5;
  if (answers.q1 === 'I am not sure') score += 2;
  // We may struggle = 0

  // Q2
  if (answers.q2 === 'Yes') score += 10;
  if (answers.q2 === 'Partially') score += 5;

  // Q3
  if (answers.q3 === 'Health Insurance') score += 10;
  if (answers.q3 === 'Savings') score += 5;

  // Q4
  if (answers.q4 === 'Yes') score += 10;
  if (answers.q4 === 'Partially') score += 5;

  // Q5
  if (answers.q5 === 'Yes') score += 10;

  // Q6
  if (answers.q6 === 'SIP' || answers.q6 === 'Stocks') score += 10;
  if (answers.q6 === 'Gold' || answers.q6 === 'Fixed Deposits') score += 5;

  // Q7
  if (answers.q7 === 'Very Confident') score += 10;
  if (answers.q7 === 'Somewhat') score += 5;

  // Q8
  if (answers.q8 === 'Yes') score += 10;
  if (answers.q8 === 'Partially') score += 5;

  // Q9
  if (answers.q9 === 'Within 12 months') score += 10;
  if (answers.q9 === '1-3 years') score += 5;

  // Max score is 90, normalize to 100
  const finalScore = Math.round((score / 90) * 100);

  let status = 'Critical';
  if (finalScore >= 95) status = 'Excellent';
  else if (finalScore >= 80) status = 'Healthy';
  else if (finalScore >= 60) status = 'Needs Attention';
  else if (finalScore >= 40) status = 'High Risk';

  let riskLevel = 'High';
  if (finalScore >= 80) riskLevel = 'Low';
  else if (finalScore >= 50) riskLevel = 'Medium';

  const gaps = {
    incomeProtection: (answers.q1 === 'Sufficient savings' || answers.q1 === 'Investments' || answers.q4 === 'Yes') ? 'Good' : 'Needs Attention',
    hospitalProtection: (answers.q3 === 'Health Insurance') ? 'Good' : 'Needs Attention',
    emergencyFund: (answers.q5 === 'Yes') ? 'Good' : 'Needs Attention',
    goalPlanning: (answers.q2 === 'Yes' || answers.q8 === 'Yes') ? 'Good' : 'Needs Attention',
    investmentPlanning: (answers.q6 === 'SIP' || answers.q6 === 'Stocks') ? 'Good' : 'Needs Attention',
    retirementPlanning: (answers.q7 === 'Very Confident') ? 'Good' : 'Needs Attention',
  };

  const recommendations = [];
  if (gaps.incomeProtection === 'Needs Attention') {
    recommendations.push('Consider securing a comprehensive Term Insurance policy to ensure your family can maintain their standard of living if your income stops.');
  }
  if (gaps.emergencyFund === 'Needs Attention') {
    recommendations.push('Build an emergency fund covering at least 6 months of expenses.');
  }
  if (gaps.hospitalProtection === 'Needs Attention') {
    recommendations.push('Consider adequate health insurance to protect your savings from unexpected medical expenses.');
  }
  if (gaps.investmentPlanning === 'Needs Attention') {
    recommendations.push('Start a monthly SIP aligned with your financial goals and risk profile.');
  }
  if (gaps.retirementPlanning === 'Needs Attention') {
    recommendations.push('Begin planning for retirement to ensure a secure future standard of living.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring and periodically reviewing your portfolio to stay on track.');
  }

  return { finalScore, status, riskLevel, gaps, recommendations };
};
