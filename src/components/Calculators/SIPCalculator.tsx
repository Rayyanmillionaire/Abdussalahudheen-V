import React, { useState, useMemo } from 'react';
import { formatIndianCurrency } from '../../utils/formatters';
import { calculateSIP } from '../../utils/formulas';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Download, Share2, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);

  // Calculations
  const results = useMemo(() => {
    return calculateSIP(monthlyInvestment, expectedReturn, years);
  }, [monthlyInvestment, expectedReturn, years]);

  // Chart Data
  const pieData = [
    { name: 'Total Investment', value: results.totalInvestment },
    { name: 'Estimated Returns', value: results.wealthCreated }
  ];
  
  const COLORS = ['#C9A567', '#0A1F3D'];

  const areaData = useMemo(() => {
    const data = [];
    for (let i = 1; i <= years; i++) {
      const yearResult = calculateSIP(monthlyInvestment, expectedReturn, i);
      data.push({
        year: `Year ${i}`,
        Investment: yearResult.totalInvestment,
        Wealth: yearResult.futureValue
      });
    }
    return data;
  }, [monthlyInvestment, expectedReturn, years]);

  const handleDownload = async () => {
    const element = document.getElementById('sip-report');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('SIP-Calculation-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  };

  return (
    <div className="flex flex-col gap-8" id="sip-report">
      {/* Calculator Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)]">SIP Calculator</h2>
          <p className="text-gray-500 text-sm mt-1">Estimate your wealth creation over time.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="p-2 text-gray-500 hover:text-[var(--color-primary)] transition bg-gray-50 rounded-lg" title="Download Report">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Inputs */}
        <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          {/* Monthly Investment */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Monthly Investment</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <span className="text-gray-500 font-medium mr-1">₹</span>
                <input 
                  type="number" 
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-24 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <input 
              type="range" 
              min="500" max="100000" step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
            />
          </div>

          {/* Expected Return */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Expected Annual Return (%)</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <input 
                  type="number" 
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-gray-500 font-medium ml-1">%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="1" max="30" step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
            />
          </div>

          {/* Time Period */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">Time Period (Years)</label>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
                <input 
                  type="number" 
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="bg-transparent font-semibold text-[var(--color-primary)] outline-none w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-gray-500 font-medium ml-1">Yr</span>
              </div>
            </div>
            <input 
              type="range" 
              min="1" max="40" step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
            />
          </div>

        </div>

        {/* Right Col: Outputs & Charts */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">Invested Amount <Info className="w-3 h-3 text-gray-400"/></p>
              <p className="text-xl font-bold text-gray-900">{formatIndianCurrency(results.totalInvestment)}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">Est. Returns <Info className="w-3 h-3 text-gray-400"/></p>
              <p className="text-xl font-bold text-green-600">+{formatIndianCurrency(results.wealthCreated)}</p>
            </div>
            <div className="bg-[var(--color-primary)] p-6 rounded-2xl shadow-lg border border-[var(--color-primary)] flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full blur-xl -mr-4 -mt-4"></div>
              <p className="text-sm text-blue-200 mb-1">Total Wealth</p>
              <p className="text-2xl font-bold text-[var(--color-secondary)]">{formatIndianCurrency(results.futureValue)}</p>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Investment Breakdown</h3>
              <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatIndianCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-400">Total</span>
                  <span className="text-sm font-bold text-gray-800">{formatIndianCurrency(results.futureValue)}</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-600"><div className="w-3 h-3 rounded-full bg-[#C9A567]"></div> Invested</div>
                <div className="flex items-center gap-1 text-xs text-gray-600"><div className="w-3 h-3 rounded-full bg-[#0A1F3D]"></div> Returns</div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Wealth Growth Projection</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData}>
                    <defs>
                      <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A1F3D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0A1F3D" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9A567" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C9A567" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <Tooltip formatter={(value) => formatIndianCurrency(value as number)} />
                    <Area type="monotone" dataKey="Wealth" stroke="#0A1F3D" fillOpacity={1} fill="url(#colorWealth)" />
                    <Area type="monotone" dataKey="Investment" stroke="#C9A567" fillOpacity={1} fill="url(#colorInv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)] mb-6">Understanding Systematic Investment Plans (SIP)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What is an SIP?</h4>
            <p className="text-gray-600 mb-6">A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (usually monthly) in mutual funds. It promotes investing discipline and frees you from trying to time the market.</p>
            
            <h4 className="font-semibold text-gray-900 mb-2">The Power of Compounding</h4>
            <p className="text-gray-600">Compounding is the process where you earn returns not just on your principal investment, but also on the accumulated returns of previous periods. The longer you stay invested, the more pronounced this effect becomes, leading to exponential wealth creation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
                <span className="text-gray-600"><strong>Rupee Cost Averaging:</strong> Buy more units when prices are low and fewer when high, averaging out the cost.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
                <span className="text-gray-600"><strong>Discipline:</strong> Automates your savings and investing habits.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
                <span className="text-gray-600"><strong>Flexibility:</strong> Start with as little as ₹500/month and adjust anytime.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
