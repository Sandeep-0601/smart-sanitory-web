import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSimulation } from '../context/SimulationContext';
import { 
  ArrowLeft, Droplets, Trash2, Wind, Users, Activity, 
  CheckCircle, AlertTriangle, Calendar, Image as ImageIcon, Sparkles, User, MapPin
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ToiletDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toilets } = useSimulation();
  
  const toilet = toilets.find(t => t.id === id) || toilets[0]; // fallback to first for demo

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            {toilet.name}
            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
              toilet.status === 'Green' ? 'bg-emerald-100 text-emerald-700' :
              toilet.status === 'Yellow' ? 'bg-yellow-100 text-yellow-700' :
              toilet.status === 'Orange' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {toilet.status}
            </span>
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> ID: {toilet.id} | Lat: {toilet.location[0]}, Lng: {toilet.location[1]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Photos & Main Info */}
        <div className="space-y-6">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
              <div>
                <span className="text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 w-fit mb-2">
                  <Camera className="w-3 h-3" /> Live Feed Offline
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              AI Recommendations
            </h3>
            {toilet.aiScore < 50 ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                <p className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-2 uppercase tracking-wider">Immediate Cleaning Required</p>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Dustbin is nearing capacity and odour levels are elevated. Assign cleaner within 15 mins.</p>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2 uppercase tracking-wider">Optimal Conditions</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Next scheduled maintenance in 2 hours. No immediate action required.</p>
              </div>
            )}
          </div>
        </div>

        {/* Middle & Right Column: Sensor Data & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SensorCard icon={<Droplets className="w-5 h-5 text-blue-500" />} label="Water Level" value={`${Math.round(toilet.waterLevel)}%`} 
              status={toilet.waterLevel < 20 ? 'critical' : 'good'} />
            <SensorCard icon={<Trash2 className="w-5 h-5 text-orange-500" />} label="Dustbin" value={`${Math.round(toilet.dustbinLevel)}%`} 
              status={toilet.dustbinLevel > 80 ? 'critical' : 'good'} />
            <SensorCard icon={<Wind className="w-5 h-5 text-cyan-500" />} label="Odour" value={toilet.odourLevel} 
              status={toilet.odourLevel === 'High' ? 'critical' : 'good'} />
            <SensorCard icon={<Users className="w-5 h-5 text-purple-500" />} label="Occupancy" value={toilet.occupancy} 
              status="neutral" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-semibold tracking-tight mb-6">Current Status</h3>
              <div className="space-y-2">
                <StatusRow label="AI Cleanliness Score" value={`${toilet.aiScore}/100`} />
                <StatusRow label="Temperature" value={`${toilet.temperature}°C`} />
                <StatusRow label="Humidity" value={`${toilet.humidity}%`} />
                <StatusRow label="Door Status" value={toilet.doorStatus} />
                <StatusRow label="Light Status" value={toilet.lightStatus} />
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col backdrop-blur-sm">
              <h3 className="text-lg font-semibold tracking-tight mb-6">Maintenance Records</h3>
              <div className="flex-1 space-y-6">
                <div className="relative pl-6 pb-2 border-l-2 border-indigo-500/30">
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-slate-900 bg-indigo-500"></div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Last Cleaned</p>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-1">{formatDistanceToNow(toilet.lastCleaned, { addSuffix: true })}</p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5" /> by Alex Johnson</p>
                </div>
                <div className="relative pl-6 border-l-2 border-transparent">
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-slate-900 bg-slate-400 dark:bg-slate-600"></div>
                  <p className="text-sm font-bold text-slate-500">Previous Cleaning</p>
                  <p className="text-xs font-medium text-slate-400 mt-1">8 hours ago</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider text-slate-600 dark:text-slate-400">
                View Full Log
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SensorCard({ icon, label, value, status }: any) {
  return (
    <div className={`bg-white/50 dark:bg-slate-900/40 rounded-3xl p-5 border shadow-sm backdrop-blur-sm transition-colors hover:bg-white/80 dark:hover:bg-slate-900/60 ${
      status === 'critical' ? 'border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-800'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">{icon}</div>
        {status === 'critical' && <span className="flex w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function StatusRow({ label, value }: { label: string, value: string | React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800 last:border-0">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  );
}

import { Camera } from 'lucide-react';
