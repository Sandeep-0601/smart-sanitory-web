import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Calendar, Download, TrendingUp } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', uses: 4000, complaints: 24, cleaningTime: 12 },
  { name: 'Tue', uses: 3000, complaints: 13, cleaningTime: 15 },
  { name: 'Wed', uses: 2000, complaints: 98, cleaningTime: 25 },
  { name: 'Thu', uses: 2780, complaints: 39, cleaningTime: 18 },
  { name: 'Fri', uses: 1890, complaints: 48, cleaningTime: 14 },
  { name: 'Sat', uses: 2390, complaints: 38, cleaningTime: 22 },
  { name: 'Sun', uses: 3490, complaints: 43, cleaningTime: 19 },
];

const issueDistribution = [
  { name: 'Odour', value: 400 },
  { name: 'Water Shortage', value: 300 },
  { name: 'Dustbin Full', value: 300 },
  { name: 'Damaged Fixtures', value: 200 },
];

const COLORS = ['#818cf8', '#2dd4bf', '#fbbf24', '#f43f5e'];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive system performance and usage data</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/10">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Usage Trends */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Weekly Usage Patterns</h2>
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'rgba(99, 102, 241, 0.1)'}}
                />
                <Bar dataKey="uses" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Complaints vs Cleaning Time */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold tracking-tight mb-8">Response Time vs Complaints</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} />
                <Legend iconType="circle" />
                <Line yAxisId="left" type="monotone" dataKey="complaints" stroke="#fb7185" strokeWidth={3} dot={{ r: 4, fill: '#fb7185', strokeWidth: 0 }} />
                <Line yAxisId="right" type="monotone" dataKey="cleaningTime" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Issue Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold tracking-tight mb-8">Common Issues Breakdown</h2>
          <div className="h-72 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {issueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Resource Consumption */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
        >
           <h2 className="text-lg font-semibold tracking-tight mb-8">System Efficiency Score</h2>
           <div className="flex flex-col items-center justify-center h-72">
              <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-[12px] border-slate-100 dark:border-slate-800/50 shadow-inner">
                <div className="absolute inset-0 rounded-full border-[12px] border-indigo-500 border-t-transparent -rotate-45"></div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-slate-900 dark:text-white tracking-tighter">84</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mt-1">Excellent</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-8 text-center max-w-xs leading-relaxed">
                Based on predictive AI models minimizing water wastage and maximizing cleaner routing efficiency.
              </p>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
