import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { Droplets, Trash2, Wind, Users, Clock, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';

import { useNavigate } from 'react-router-dom';

// Create custom icons based on status
const createIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative bg-${color}-500">
          <div class="absolute inset-0 rounded-full animate-ping opacity-50 bg-${color}-500"></div>
          <div class="w-2 h-2 rounded-full bg-white"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const icons = {
  Green: createIcon('emerald'),
  Yellow: createIcon('yellow'),
  Orange: createIcon('orange'),
  Red: createIcon('red'),
  Blue: createIcon('blue'),
};

export default function AdminMap() {
  const { toilets, darkTheme } = useSimulation();
  const [selectedToilet, setSelectedToilet] = useState(toilets[0]);
  const navigate = useNavigate();
  
  // Center map on London for demo
  const center: [number, number] = [51.505, -0.09];

  return (
    <div className="h-[calc(100vh-8rem)] w-full rounded-3xl overflow-hidden relative flex flex-col md:flex-row gap-6">
      
      {/* Map Section */}
      <div className="flex-1 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative z-0">
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            url={darkTheme 
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
              : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {toilets.map((toilet) => (
            <Marker 
              key={toilet.id} 
              position={toilet.location} 
              icon={icons[toilet.status]}
              eventHandlers={{
                click: () => setSelectedToilet(toilet),
              }}
            >
              <Popup className="custom-popup rounded-xl overflow-hidden shadow-xl border-0">
                <div className="p-1">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{toilet.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${toilet.status === 'Green' ? 'bg-emerald-100 text-emerald-700' :
                      toilet.status === 'Yellow' ? 'bg-yellow-100 text-yellow-700' :
                      toilet.status === 'Orange' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'}`}>
                      {toilet.status}
                    </span>
                    <span className="text-[10px] text-slate-500">AI Score: {toilet.aiScore}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Legends */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-2">
          <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Status Legend</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Healthy</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Attention</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Needs Cleaning</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical</div>
        </div>
      </div>

      {/* Details Panel */}
      <motion.div 
        key={selectedToilet?.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-80 lg:w-96 bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden backdrop-blur-sm"
      >
        {selectedToilet ? (
          <>
            <div className={`h-2 w-full ${
              selectedToilet.status === 'Green' ? 'bg-emerald-500' :
              selectedToilet.status === 'Yellow' ? 'bg-yellow-500' :
              selectedToilet.status === 'Orange' ? 'bg-orange-500' :
              'bg-red-500'
            }`} />
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{selectedToilet.name}</h2>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Info className="w-3 h-3" /> ID: {selectedToilet.id}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">{selectedToilet.aiScore}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">AI Score</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard icon={<Droplets className="w-4 h-4 text-blue-500" />} label="Water Level" value={`${Math.round(selectedToilet.waterLevel)}%`} />
                  <MetricCard icon={<Trash2 className="w-4 h-4 text-orange-500" />} label="Dustbin" value={`${Math.round(selectedToilet.dustbinLevel)}%`} />
                  <MetricCard icon={<Wind className="w-4 h-4 text-cyan-500" />} label="Odour" value={selectedToilet.odourLevel} />
                  <MetricCard icon={<Users className="w-4 h-4 text-purple-500" />} label="Occupancy" value={selectedToilet.occupancy} />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-semibold mb-3">Status Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <span className="text-slate-500">Priority</span>
                      <span className={`font-medium ${selectedToilet.priority === 'Critical' ? 'text-red-500' : ''}`}>{selectedToilet.priority}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <span className="text-slate-500">Last Cleaned</span>
                      <span className="font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(selectedToilet.lastCleaned, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <span className="text-slate-500">Door</span>
                      <span className="font-medium">{selectedToilet.doorStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30">
              <button 
                onClick={() => navigate(`/admin/toilet/${selectedToilet.id}`)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10"
              >
                Open Full Details
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Select a toilet on the map
          </div>
        )}
      </motion.div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-white dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
      <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}
