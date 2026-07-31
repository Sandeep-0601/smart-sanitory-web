import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  Trash2, 
  Wind, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useNavigate } from 'react-router-dom';

const data = [
  { time: '08:00', users: 45 },
  { time: '10:00', users: 120 },
  { time: '12:00', users: 350 },
  { time: '14:00', users: 280 },
  { time: '16:00', users: 410 },
  { time: '18:00', users: 500 },
  { time: '20:00', users: 190 },
];

export default function AdminDashboard() {
  const { toilets } = useSimulation();
  const navigate = useNavigate();

  const totalToilets = toilets.length;
  const criticalToilets = toilets.filter(t => t.status === 'Red').length;
  const cleanToilets = toilets.filter(t => t.status === 'Green').length;
  const averageAiScore = Math.round(toilets.reduce((acc, t) => acc + t.aiScore, 0) / totalToilets);

  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Total Toilets" 
          value={totalToilets} 
          trend="+2 this week" 
          trendUp={true}
        />
        <StatCard 
          title="Clean & Ready" 
          value={cleanToilets} 
          trend="+15% optimal" 
          trendUp={true}
        />
        <StatCard 
          title="Critical Alerts" 
          value={criticalToilets} 
          trend="-2 resolved" 
          trendUp={true}
        />
        <StatCard 
          title="Avg AI Score" 
          value={`${averageAiScore}/100`} 
          trend="+5% from yesterday" 
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Today's Usage</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-300 rounded-lg">Today</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">7D</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">30D</button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="users" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Status Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold tracking-tight">System Health</h2>
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {toilets.map((toilet) => (
              <div 
                key={toilet.id} 
                onClick={() => navigate(`/admin/toilet/${toilet.id}`)}
                className="cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{toilet.name}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{toilet.id}</p>
                  </div>
                  <div className={cn(
                    "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                    toilet.status === 'Green' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                    toilet.status === 'Yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                    toilet.status === 'Orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                  )}>
                    {toilet.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" /> Water
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${toilet.waterLevel}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Trash2 className="w-3.5 h-3.5 text-amber-500" /> Bin
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${toilet.dustbinLevel > 80 ? 'bg-rose-500' : toilet.dustbinLevel > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${toilet.dustbinLevel}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Wind className="w-3.5 h-3.5 text-indigo-500" /> AI
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${toilet.aiScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function StatCard({ title, value, trend, trendUp }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/50 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-28 shadow-sm backdrop-blur-sm"
    >
      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{title}</span>
      <div className="flex items-end justify-between mt-auto">
        <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{value}</span>
        <span className={cn(
          "text-xs px-2 py-1 rounded",
          trendUp ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10" : "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-400/10"
        )}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}

// Needed for the layout Dashboard icon
import { LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';
