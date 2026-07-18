import React, { useState, useMemo } from 'react';
import { formatIndianCurrency } from '../../utils/formatters';
import { calculateRetirement } from '../../utils/formulas';
import { Download, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(1000000);
  const [monthlySIP, setMonthlySIP] = useState(15000);

  const results = useMemo(() => {
    return calculateRetirement(
      currentAge, retirementAge, monthlyExpenses, inflationRate, expectedReturn, currentSavings, monthlySIP
    );
  }, [currentAge, retirementAge, monthlyExpenses, inflationRate, expectedReturn, currentSavings, monthlySIP]);

  const handleDownload = async () => {
    const element = document.getElementById('retirement-report');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Retirement-Plan-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  };

  const barData = [
    {
      name: 'Retirement Corpus',
      Expected: results.expectedCorpus,
      Required: results.corpusRequired,
    }
  ];

  return (
    <div className="flex flex-col gap-8" id="retirement-report">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)]">Retirement Calculator</h2>
          <p className="text-gray-500 text-sm mt-1">Plan your golden years and ensure financial independence.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="p-2 text-gray-500 hover:text-[var(--color-primary)] transition bg-gray-50 rounded-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Retirement Age</label>
              <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Current Monthly Expenses</label>
              <span className="font-semibold text-[var(--color-primary)]">{formatIndianCurrency(monthlyExpenses)}</span>
            </div>
            <input type="range" min="10000" max="500000" step="5000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-[var(--color-secondary)]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Existing Retirement Savings</label>
              <span className="font-semibold text-[var(--color-primary)]">{formatIndianCurrency(currentSavings)}</span>
            </div>
            <input type="range" min="0" max="50000000" step="100000" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-[var(--color-secondary)]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Ongoing Monthly SIP</label>
              <span className="font-semibold text-[var(--color-primary)]">{formatIndianCurrency(monthlySIP)}</span>
            </div>
            <input type="range" min="0" max="200000" step="1000" value={monthlySIP} onChange={(e) => setMonthlySIP(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-[var(--color-secondary)]" />
          </div>

        </div>

        {/* Right Col: Outputs */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-primary)] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <p className="text-sm text-blue-200 mb-1">Required Corpus <Info className="inline w-3 h-3 ml-1" title="Amount needed to sustain lifestyle at retirement age" /></p>
              <h3 className="text-3xl font-bold font-[var(--font-heading)] text-[var(--color-secondary)]">{formatIndianCurrency(results.corpusRequired)}</h3>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Expected Corpus</p>
              <h3 className="text-3xl font-bold text-gray-900">{formatIndianCurrency(results.expectedCorpus)}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
              <p className="text-sm text-red-800 mb-1 font-medium">Corpus Shortfall</p>
              <h3 className="text-2xl font-bold text-red-600">{formatIndianCurrency(results.corpusGap)}</h3>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-sm border border-yellow-100">
              <p className="text-sm text-yellow-800 mb-1 font-medium">Additional SIP Required</p>
              <h3 className="text-2xl font-bold text-yellow-600">{formatIndianCurrency(results.additionalSIPRequired)} / mo</h3>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Required vs Expected Corpus</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(val) => `₹${(val / 10000000).toFixed(1)}Cr`} />
                  <Tooltip formatter={(value) => formatIndianCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="Required" fill="#0A1F3D" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expected" fill="#C9A567" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
