import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Settings, 
  Users, 
  Bell, 
  BarChart3, 
  LogOut,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const { darkTheme, toggleTheme } = useSimulation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Live Map', path: '/admin/map', icon: MapIcon },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Cleaners', path: '/admin/cleaners', icon: Users },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex overflow-hidden transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              SmartSan
            </span>
          </div>
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-medium" 
                  : "text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 mb-2">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white hidden sm:block">SmartSan Command <span className="text-indigo-600 dark:text-indigo-400">v2.4</span></h1>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2 hidden sm:block"></div>
            <div className="items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hidden sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              SYSTEMS OPTIMAL
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mb-1">Current Time</p>
              <p className="text-sm font-mono text-slate-700 dark:text-slate-200 leading-none">
                {new Date().toLocaleTimeString('en-GB', { timeZone: 'UTC' })} UTC
              </p>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
            >
              {darkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">JD</div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
