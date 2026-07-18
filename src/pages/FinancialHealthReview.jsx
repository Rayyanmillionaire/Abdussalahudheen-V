import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateHealthScore } from '../utils/healthScore';
import { ShieldCheck, AlertTriangle, ArrowRight, Download, Activity, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const personalDetailsSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  mobile: z.string().min(10, "Valid mobile is required"),
  email: z.string().email("Invalid email address"),
  occupation: z.string().min(2, "Occupation is required"),
  city: z.string().min(2, "City is required"),
  income: z.string().min(1, "Income is required"),
  expenses: z.string().min(1, "Expenses are required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  dependents: z.string().min(1, "Dependents is required"),
});

export default function FinancialHealthReview() {
  const [step, setStep] = useState(1);
  const [reportData, setReportData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(personalDetailsSchema),
  });

  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  const handleAnswer = (question, answer) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const submitReview = async () => {
    const results = calculateHealthScore(answers);
    const personalData = watch();
    
    const finalData = { ...personalData, ...answers, ...results, timestamp: new Date().toISOString() };
    
    // Save to LocalStorage for Dashboard
    const existing = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    localStorage.setItem('crmLeads', JSON.stringify([...existing, { ...finalData, status: 'New Lead' }]));
    
    // Send Email via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/mailtosalahuvt@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Lead: ${finalData.clientName} - Score: ${finalData.finalScore}/100`,
            Name: finalData.clientName,
            Email: finalData.email,
            Phone: finalData.mobile,
            City: finalData.city,
            Score: finalData.finalScore,
            RiskLevel: finalData.riskLevel,
            ...answers
        })
      });
    } catch (error) {
      console.error("Email send failed", error);
    }

    setReportData(finalData);
    setStep(4); // Results step
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    try {
      setIsGeneratingPdf(true);
      const canvas = await html2canvas(reportRef.current, { 
        scale: 2,
        useCORS: true,
        logging: true
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${reportData.clientName}-Financial-Review.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-[var(--color-background)] font-[var(--font-body)] text-[var(--color-text-main)]">
      <div className="max-w-4xl mx-auto">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-12 rounded-2xl soft-shadow text-center">
            <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] text-[var(--color-primary)] mb-4">Financial Health Review</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Discover how financially prepared you and your family really are. This complimentary review helps identify strengths, risks, and opportunities.</p>
            <div className="flex justify-center items-center gap-2 text-gray-500 mb-8">
              <Activity className="w-5 h-5" />
              <span>Estimated Time: 5–7 Minutes</span>
            </div>
            <button onClick={() => setStep(2)} className="bg-[var(--color-secondary)] hover:bg-[#b08f55] text-white px-8 py-4 rounded-lg text-lg font-medium transition flex items-center gap-2 mx-auto">
              Start Financial Review <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 md:p-12 rounded-2xl soft-shadow">
            <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)] mb-8">Personal Details</h2>
            <form onSubmit={handleSubmit(() => setStep(3))} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-1">Client Name</label><input {...register('clientName')} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]" /></div>
              <div><label className="block text-sm font-medium mb-1">Age</label><input type="number" {...register('age')} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]" /></div>
              <div><label className="block text-sm font-medium mb-1">Gender</label><select {...register('gender')} className="w-full p-3 rounded-lg border border-gray-300"><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
              <div><label className="block text-sm font-medium mb-1">Mobile Number</label><input type="tel" {...register('mobile')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">Email Address</label><input type="email" {...register('email')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">City</label><input {...register('city')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">Occupation</label><input {...register('occupation')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">Annual Income</label><input {...register('income')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">Monthly Expenses</label><input {...register('expenses')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              <div><label className="block text-sm font-medium mb-1">Marital Status</label><select {...register('maritalStatus')} className="w-full p-3 rounded-lg border border-gray-300"><option value="">Select</option><option>Single</option><option>Married</option></select></div>
              <div><label className="block text-sm font-medium mb-1">Dependents</label><input type="number" {...register('dependents')} className="w-full p-3 rounded-lg border border-gray-300" /></div>
              
              <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                <button type="submit" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg flex items-center gap-2">Next <ChevronRight className="w-5 h-5"/></button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 md:p-12 rounded-2xl soft-shadow">
            <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)] mb-8">Financial Assessment</h2>
            
            <div className="space-y-8">
              {/* Q1 */}
              <div>
                <p className="font-medium text-lg mb-4">1. If your monthly income stopped today, how would your family maintain their current standard of living?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Sufficient savings', 'Investments', 'Insurance will support us', 'I am not sure', 'We may struggle'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer('q1', opt)} className={`p-4 rounded-lg border text-left transition ${answers.q1 === opt ? 'border-[var(--color-secondary)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Q3 */}
              <div>
                <p className="font-medium text-lg mb-4">2. If a family member needed hospitalization tomorrow, how would you manage the medical expenses?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Health Insurance', 'Savings', 'Borrow Money', 'Not Sure'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer('q3', opt)} className={`p-4 rounded-lg border text-left transition ${answers.q3 === opt ? 'border-[var(--color-secondary)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Q5 */}
              <div>
                <p className="font-medium text-lg mb-4">3. Do you currently maintain an emergency fund covering at least six months of expenses?</p>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer('q5', opt)} className={`flex-1 p-4 rounded-lg border text-center transition ${answers.q5 === opt ? 'border-[var(--color-secondary)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Q6 */}
              <div>
                <p className="font-medium text-lg mb-4">4. Are you investing regularly to beat inflation?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['SIP', 'Stocks', 'Gold', 'Fixed Deposits', 'No Investments'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer('q6', opt)} className={`p-4 rounded-lg border text-left transition ${answers.q6 === opt ? 'border-[var(--color-secondary)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Q7 */}
              <div>
                <p className="font-medium text-lg mb-4">5. How confident are you about your retirement planning?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Very Confident', 'Somewhat', 'Not Planned'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer('q7', opt)} className={`p-4 rounded-lg border text-left transition ${answers.q7 === opt ? 'border-[var(--color-secondary)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button onClick={submitReview} disabled={!answers.q1 || !answers.q3 || !answers.q5 || !answers.q6 || !answers.q7} className="bg-[var(--color-primary)] disabled:opacity-50 text-white px-8 py-3 rounded-lg flex items-center gap-2">
                Generate Report <CheckCircle2 className="w-5 h-5"/>
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && reportData && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={generatePDF} 
                disabled={isGeneratingPdf}
                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#152e52] disabled:opacity-50 transition"
              >
                {isGeneratingPdf ? (
                  <span className="flex items-center gap-2">Generating...</span>
                ) : (
                  <><Download className="w-4 h-4" /> Download PDF</>
                )}
              </button>
            </div>
            
            <div ref={reportRef} className="glass p-12 rounded-2xl soft-shadow bg-white">
              <div className="border-b border-gray-200 pb-8 mb-8 text-center">
                <h1 className="text-4xl font-[var(--font-heading)] text-[var(--color-primary)]">Financial Health Report</h1>
                <p className="text-gray-500 mt-2">Prepared for {reportData.clientName} | {new Date().toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl text-center">
                  <p className="text-lg text-gray-600 mb-2">Health Score</p>
                  <div className="text-6xl font-[var(--font-heading)] text-[var(--color-primary)] mb-2">{reportData.finalScore}<span className="text-2xl text-gray-400">/100</span></div>
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${reportData.status === 'Excellent' || reportData.status === 'Healthy' ? 'bg-green-100 text-green-700' : reportData.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {reportData.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium mb-4">Gap Analysis</h3>
                  {Object.entries(reportData.gaps).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`font-medium flex items-center gap-2 ${value === 'Good' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {value === 'Good' ? <ShieldCheck className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)] mb-6">Personalized Recommendations</h3>
                <div className="space-y-4">
                  {reportData.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="bg-[var(--color-secondary)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium">{i+1}</div>
                      <p className="text-gray-700 pt-1">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
