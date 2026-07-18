import React, { useState, useMemo } from 'react';
import { formatIndianCurrency } from '../../utils/formatters';
import { calculateTermInsurance } from '../../utils/formulas';
import { Download, Info, ShieldAlert, ShieldCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function TermInsuranceCalculator() {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [existingSavings, setExistingSavings] = useState(500000);
  const [outstandingLoans, setOutstandingLoans] = useState(2500000);
  const [futureGoals, setFutureGoals] = useState(5000000);
  const [dependents, setDependents] = useState(2);

  const results = useMemo(() => {
    return calculateTermInsurance(annualIncome, existingSavings, outstandingLoans, futureGoals, dependents);
  }, [annualIncome, existingSavings, outstandingLoans, futureGoals, dependents]);

  const handleDownload = async () => {
    const element = document.getElementById('term-report');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Term-Insurance-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  };

  const chartData = [
    { name: 'Income Replacement', value: annualIncome * 15 },
    { name: 'Loans & Liabilities', value: outstandingLoans },
    { name: 'Future Goals', value: futureGoals }
  ];
  const COLORS = ['#0A1F3D', '#C9A567', '#3b82f6'];

  return (
    <div className="flex flex-col gap-8" id="term-report">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)]">Term Insurance Calculator</h2>
          <p className="text-gray-500 text-sm mt-1">Calculate the optimal life cover based on Human Life Value (HLV).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="p-2 text-gray-500 hover:text-[var(--color-primary)] transition bg-gray-50 rounded-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Inputs */}
        <div className="lg:col-span-6 space-y-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Age</label>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number of Dependents</label>
              <input type="number" value={dependents} onChange={(e) => setDependents(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Annual Income</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <span className="text-gray-500 font-medium mr-1">₹</span>
                <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-28 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
            <input type="range" min="300000" max="50000000" step="100000" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-[var(--color-secondary)]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Outstanding Loans (Home, Auto, etc.)</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <span className="text-gray-500 font-medium mr-1">₹</span>
                <input type="number" value={outstandingLoans} onChange={(e) => setOutstandingLoans(Number(e.target.value))} className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-28 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
            <input type="range" min="0" max="20000000" step="100000" value={outstandingLoans} onChange={(e) => setOutstandingLoans(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-red-400" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Future Goals (Kids Edu, Marriage, etc.)</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <span className="text-gray-500 font-medium mr-1">₹</span>
                <input type="number" value={futureGoals} onChange={(e) => setFutureGoals(Number(e.target.value))} className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-28 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
            <input type="range" min="0" max="30000000" step="100000" value={futureGoals} onChange={(e) => setFutureGoals(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-blue-400" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Existing Savings & Investments</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <span className="text-gray-500 font-medium mr-1">₹</span>
                <input type="number" value={existingSavings} onChange={(e) => setExistingSavings(Number(e.target.value))} className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-28 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
            <input type="range" min="0" max="20000000" step="100000" value={existingSavings} onChange={(e) => setExistingSavings(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-green-400" />
          </div>

        </div>

        {/* Right Col: Outputs */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[var(--color-primary)] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <ShieldCheck className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-4" />
            <p className="text-blue-200 mb-2 text-lg">Recommended Life Cover</p>
            <h3 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] text-[var(--color-secondary)] mb-6">
              {formatIndianCurrency(results.recommendedCover)}
            </h3>
            
            <div className="bg-white/10 rounded-2xl p-4 inline-block border border-white/20">
              <p className="text-sm text-blue-100">Estimated Monthly Premium</p>
              <p className="text-xl font-semibold">~ {formatIndianCurrency(results.estimatedMonthlyPremium)}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{value: results.protectionScore}, {value: 100 - results.protectionScore}]} cx="50%" cy="50%" innerRadius={40} outerRadius={50} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    <Cell fill={results.protectionScore > 80 ? '#22c55e' : results.protectionScore > 50 ? '#eab308' : '#ef4444'} />
                    <Cell fill="#f1f5f9" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-xl font-bold ${results.protectionScoreColor}`}>{results.protectionScore}%</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg mb-1">Financial Protection Score</h4>
              <p className={`font-medium mb-2 ${results.protectionScoreColor}`}>{results.protectionScoreText}</p>
              <p className="text-sm text-gray-500">Based on your annual income, liabilities, and financial responsibilities, a cover of {formatIndianCurrency(results.recommendedCover)} is recommended to protect your family's future.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
