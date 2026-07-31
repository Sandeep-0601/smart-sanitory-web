import React from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Paintbrush, Globe, Smartphone } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function AdminSettings() {
  const { darkTheme, toggleTheme } = useSimulation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-1">
          <SettingsTab icon={<User className="w-4 h-4" />} label="Profile" active />
          <SettingsTab icon={<Paintbrush className="w-4 h-4" />} label="Appearance" />
          <SettingsTab icon={<Bell className="w-4 h-4" />} label="Notifications" />
          <SettingsTab icon={<Shield className="w-4 h-4" />} label="Security" />
          <SettingsTab icon={<Globe className="w-4 h-4" />} label="Language & Region" />
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold tracking-tight mb-4">Appearance Settings</h2>
            
            <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white">Theme Preference</h3>
                <p className="text-sm text-slate-500">Toggle between light and dark mode</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-indigo-600 transition-colors focus:outline-none"
              >
                <span
                  className={`${
                    darkTheme ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white">Compact Mode</h3>
                <p className="text-sm text-slate-500">Reduce spacing for denser data display</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold tracking-tight mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              <ToggleSetting title="Critical Alerts" description="Immediate notification for status RED" defaultChecked />
              <ToggleSetting title="Maintenance Reminders" description="Scheduled cleaning tasks" defaultChecked />
              <ToggleSetting title="Daily Reports" description="End of day summary email" defaultChecked={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      active 
        ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`}>
      {icon}
      {label}
    </button>
  );
}

function ToggleSetting({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-slate-800 dark:text-white text-sm">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
          checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        <span
          className={`${
            checked ? 'translate-x-5' : 'translate-x-1'
          } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
}
