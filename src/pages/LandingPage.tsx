import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity, Map, Sparkles, ChevronRight, Droplet, Wind, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              SmartSan
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/admin')}
              className="text-sm font-medium px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/10"
            >
              View Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Hardware-Ready IoT Platform
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              The Future of <br />
              <span className="text-indigo-600 dark:text-indigo-400">Public Sanitation</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              AI-powered monitoring system for smart cities. Real-time insights, predictive maintenance, and pristine hygiene management at scale.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
              >
                Access Command Center
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Monitoring</h2>
            <p className="text-slate-600 dark:text-slate-400">Continuous analysis of critical infrastructure.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-blue-500" />}
              title="Real-Time Analytics"
              description="Live telemetry of water levels, occupancy, and waste capacities updated continuously."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
              title="Predictive AI Engine"
              description="Proprietary algorithms calculate hygiene scores and predict maintenance needs before issues occur."
            />
            <FeatureCard 
              icon={<Map className="w-6 h-6 text-purple-500" />}
              title="Geospatial Intelligence"
              description="Command and control mapped directly over city grids with dynamic status indicators."
            />
          </div>
        </div>
      </div>

      {/* Sensor Simulation Showcase */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Simulated IoT Integration</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              Designed from day one to ingest data from ESP32 microcontrollers. 
              Our architecture scales from a single unit to thousands of nodes seamlessly.
            </p>
            <div className="space-y-6">
              <SensorItem icon={<Droplet />} title="Ultrasonic Water Sensing" />
              <SensorItem icon={<Zap />} title="IR Occupancy Tracking" />
              <SensorItem icon={<Wind />} title="Air Quality & Odour Detection" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl -z-10 rounded-full"></div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="font-mono text-sm font-bold text-emerald-500">LIVE FEED</span>
                </div>
                <span className="font-mono text-xs text-slate-500">NODE_ID: 8F24</span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="text-slate-500">WATER_LVL</span>
                  <span className="font-bold text-blue-500">87%</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="text-slate-500">DUSTBIN_CAP</span>
                  <span className="font-bold text-orange-500">42%</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="text-slate-500">AIR_Q</span>
                  <span className="font-bold text-emerald-500">95/100</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-blue-500">
                  <span className="text-slate-500">AI_CONFIDENCE</span>
                  <span className="font-bold">99.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white/50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all backdrop-blur-sm">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function SensorItem({ icon, title }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
        {icon}
      </div>
      <span className="font-semibold text-lg tracking-tight">{title}</span>
    </div>
  );
}
