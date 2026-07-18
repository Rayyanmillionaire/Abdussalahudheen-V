import { useState, useEffect } from 'react';
import { Users, Activity, AlertCircle, FileSpreadsheet, Search, Filter, ShieldAlert, HeartPulse, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ClientLead } from '../types';

export default function Dashboard() {
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    setLeads(data);
  }, []);

  const totalClients = leads.length;
  const avgScore = leads.length ? Math.round(leads.reduce((acc, lead) => acc + lead.finalScore, 0) / leads.length) : 0;
  const needsAttention = leads.filter(l => l.status === 'Needs Attention' || l.status === 'High Risk' || l.status === 'Critical').length;
  
  // Specific Gap Metrics
  const noEmergencyFund = leads.filter(l => l.gaps?.emergencyFund !== 'Good').length;
  const noHealthInsurance = leads.filter(l => l.gaps?.hospitalProtection !== 'Good').length;
  const noRetirementPlan = leads.filter(l => l.gaps?.retirementPlanning !== 'Good').length;
  
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.mobile?.includes(searchTerm);
    const matchesStatus = statusFilter ? (l.crmStatus || 'New Lead') === statusFilter : true;
    const matchesRisk = riskFilter ? l.riskLevel === riskFilter : true;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Score', 'Status', 'CRM Status', 'Date'];
    const rows = filteredLeads.map(l => [l.clientName, l.email, l.mobile, l.finalScore, l.status, l.crmStatus || 'New Lead', new Date(l.timestamp).toLocaleDateString()]);
    
    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateStatus = (index: number, newStatus: string) => {
    const updated = [...leads];
    const originalIndex = leads.findIndex(l => l === filteredLeads[index]);
    updated[originalIndex].crmStatus = newStatus;
    setLeads(updated);
    localStorage.setItem('crmLeads', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 font-[var(--font-body)]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)]">Advisor CRM Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage leads, track financial health, and close deals.</p>
          </div>
          <button onClick={exportCSV} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 soft-shadow transition">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-white p-6 rounded-xl soft-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg"><Users className="w-6 h-6"/></div>
            </div>
            <p className="text-gray-500 text-sm">Total Leads</p>
            <p className="text-3xl font-semibold text-[var(--color-primary)]">{totalClients}</p>
          </motion.div>
          
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-white p-6 rounded-xl soft-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-lg"><ShieldAlert className="w-6 h-6"/></div>
            </div>
            <p className="text-gray-500 text-sm">No Emergency Fund</p>
            <p className="text-3xl font-semibold text-[var(--color-primary)]">{noEmergencyFund}</p>
          </motion.div>

          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-white p-6 rounded-xl soft-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg"><HeartPulse className="w-6 h-6"/></div>
            </div>
            <p className="text-gray-500 text-sm">No Health Insurance</p>
            <p className="text-3xl font-semibold text-[var(--color-primary)]">{noHealthInsurance}</p>
          </motion.div>

          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-white p-6 rounded-xl soft-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg"><TrendingDown className="w-6 h-6"/></div>
            </div>
            <p className="text-gray-500 text-sm">No Retirement Plan</p>
            <p className="text-3xl font-semibold text-[var(--color-primary)]">{noRetirementPlan}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl soft-shadow border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50">
            <h3 className="font-medium text-[var(--color-primary)]">Client Pipeline</h3>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search name, email, phone..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--color-secondary)] w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:border-[var(--color-secondary)] bg-white"
              >
                <option value="">All Statuses</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Meeting Scheduled">Meeting Scheduled</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              <select 
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="border border-gray-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:border-[var(--color-secondary)] bg-white"
              >
                <option value="">All Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Health Status</th>
                  <th className="p-4">CRM Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">No leads found matching criteria.</td></tr>
                ) : filteredLeads.map((lead, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{lead.clientName}</div>
                      <div className="text-xs text-gray-500">{new Date(lead.timestamp).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">{lead.email}</div>
                      <div className="text-gray-500">{lead.mobile}</div>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${lead.finalScore >= 80 ? 'text-green-600' : lead.finalScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {lead.finalScore}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${lead.status === 'Excellent' || lead.status === 'Healthy' ? 'bg-green-100 text-green-700' : lead.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={lead.crmStatus || 'New Lead'}
                        onChange={(e) => updateStatus(i, e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Meeting Scheduled">Meeting Scheduled</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
