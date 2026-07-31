import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Filter, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSimulation } from '../context/SimulationContext';
import { Alert } from '../types';

// Mock some initial alerts since our simulation context might not generate them immediately
const mockAlerts: Alert[] = [
  {
    id: 'A-001',
    toiletId: 'T-003',
    type: 'Dustbin Full',
    message: 'Dustbin capacity reached 95% at Airport Terminal 1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'Unread',
  },
  {
    id: 'A-002',
    toiletId: 'T-002',
    type: 'Water Low',
    message: 'Water level below 20% at City Mall Ground Floor',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: 'Unread',
  },
  {
    id: 'A-003',
    toiletId: 'T-005',
    type: 'Bad Odour',
    message: 'High odour levels detected at Metro Station West',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'Read',
  },
  {
    id: 'A-004',
    toiletId: 'T-001',
    type: 'Complaint Received',
    message: 'User reported broken door latch',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'Resolved',
  }
];

export default function AdminNotifications() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Resolved'>('All');

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return alert.status === 'Unread';
    if (filter === 'Resolved') return alert.status === 'Resolved';
    return true;
  });

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Read' } : a));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'Water Low':
      case 'Dustbin Full':
      case 'Bad Odour':
      case 'Power Failure':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'High Occupancy':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'Complaint Received':
        return <Bell className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Alerts & Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system alerts and user complaints</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/40 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {['All', 'Unread', 'Resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-500"
            >
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p>No notifications found</p>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-2xl border flex items-start gap-4 transition-colors backdrop-blur-sm ${
                  alert.status === 'Unread' 
                    ? 'bg-white/50 dark:bg-slate-900/40 border-indigo-200 dark:border-indigo-500/20 shadow-sm' 
                    : 'bg-white/30 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  alert.status === 'Unread' ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'bg-slate-100 dark:bg-slate-800'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold text-sm ${alert.status === 'Unread' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {alert.type}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      ID: {alert.toiletId}
                    </span>
                    {alert.status === 'Unread' && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
