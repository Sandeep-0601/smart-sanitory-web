import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Camera, CheckCircle2, ChevronRight, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockTasks = [
  { id: 'TSK-992', location: 'Airport Terminal 1', priority: 'Critical', estimatedTime: '15m', status: 'Pending', distance: '0.2 miles' },
  { id: 'TSK-993', location: 'City Mall Ground Floor', priority: 'Medium', estimatedTime: '25m', status: 'Pending', distance: '1.4 miles' },
];

export default function CleanerDashboard() {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState<any>(null);
  const [tasks, setTasks] = useState(mockTasks);
  const [step, setStep] = useState(0); // 0: lists, 1: before photo, 2: cleaning, 3: after photo

  const acceptTask = (task: any) => {
    setActiveTask(task);
    setTasks(tasks.filter(t => t.id !== task.id));
    setStep(1);
  };

  const completeTask = () => {
    setActiveTask(null);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* App Bar */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/30">
              AJ
            </div>
            <div>
              <h1 className="font-bold leading-tight">Alex Johnson</h1>
              <p className="text-blue-100 text-xs font-medium">Active • Zone A</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="p-2 bg-white/10 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!activeTask ? (
            <motion.div
              key="task-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold">New Assignments</h2>
                <span className="text-sm font-medium text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">{tasks.length} Pending</span>
              </div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <motion.div 
                    key={task.id}
                    layoutId={`task-${task.id}`}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        task.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs font-medium text-slate-500">{task.distance} away</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{task.location}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Est. {task.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Route
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => acceptTask(task)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Accept Job <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                
                {tasks.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-emerald-500 opacity-50" />
                    <h3 className="text-lg font-bold mb-1">All Caught Up!</h3>
                    <p className="text-sm">No pending cleaning jobs in your zone.</p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                 <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
                      <p className="text-sm text-slate-500 font-medium mb-1">Completed</p>
                      <h3 className="text-3xl font-bold">12</h3>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
                      <p className="text-sm text-slate-500 font-medium mb-1">Score</p>
                      <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">98%</h3>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active-task"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-[calc(100vh-8rem)]"
            >
              <button 
                onClick={() => {
                  setTasks([activeTask, ...tasks]);
                  setActiveTask(null);
                }}
                className="mb-4 text-slate-500 flex items-center gap-1 font-medium hover:text-slate-800 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back to jobs
              </button>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1 block">Active Job</span>
                  <h2 className="text-2xl font-bold">{activeTask.location}</h2>
                  <p className="text-slate-500 mt-1">Job ID: {activeTask.id}</p>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-4">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                      <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-500">
                        <Camera className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Take Before Photo</p>
                      </div>
                      <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg">
                        Submit & Start Cleaning
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                      <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
                      <div>
                        <h3 className="text-xl font-bold">Cleaning In Progress</h3>
                        <p className="text-slate-500 mt-2">Time elapsed: 04:12</p>
                      </div>
                      <button onClick={() => setStep(3)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg">
                        Finish Cleaning
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                      <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-500">
                        <Camera className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Take After Photo</p>
                      </div>
                      <button onClick={completeTask} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg">
                        Complete Job
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
