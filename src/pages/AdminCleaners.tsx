import React from 'react';
import { motion } from 'motion/react';
import { Users, Star, Clock, CheckCircle, Search, MapPin } from 'lucide-react';

const mockCleaners = [
  { id: 'C1', name: 'Alex Johnson', rating: 4.8, completedJobs: 145, status: 'Active', currentTask: 'Terminal 1' },
  { id: 'C2', name: 'Maria Garcia', rating: 4.9, completedJobs: 210, status: 'Active', currentTask: 'City Mall' },
  { id: 'C3', name: 'David Smith', rating: 4.5, completedJobs: 89, status: 'Off Duty', currentTask: null },
  { id: 'C4', name: 'Sarah Wong', rating: 4.7, completedJobs: 132, status: 'Active', currentTask: 'Central Park' },
];

export default function AdminCleaners() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Field Staff Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor active cleaners and performance metrics</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="pl-9 pr-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-full sm:w-64 backdrop-blur-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Active Staff</p>
              <h3 className="text-3xl font-bold">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Jobs Completed</p>
              <h3 className="text-3xl font-bold">48</h3>
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Response Time</p>
              <h3 className="text-3xl font-bold">14m</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Cleaner</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Current Location</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6">Completed Jobs</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
              {mockCleaners.map((cleaner, idx) => (
                <motion.tr 
                  key={cleaner.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm shadow-sm">
                        {cleaner.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{cleaner.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      cleaner.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {cleaner.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                      {cleaner.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {cleaner.currentTask ? (
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin className="w-4 h-4 text-indigo-400" /> {cleaner.currentTask}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 w-fit px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span className="font-bold">{cleaner.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700 dark:text-slate-200">
                    {cleaner.completedJobs}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-indigo-600 dark:text-indigo-400 font-medium text-xs hover:underline uppercase tracking-wider">
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
