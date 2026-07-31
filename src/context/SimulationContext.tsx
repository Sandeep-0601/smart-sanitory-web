import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToiletData, Alert, ToiletStatus } from '../types';

interface SimulationContextType {
  toilets: ToiletData[];
  alerts: Alert[];
  darkTheme: boolean;
  toggleTheme: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const initialToilets: ToiletData[] = [
  {
    id: 'T-001',
    name: 'Central Station Toilet A',
    location: [51.505, -0.09],
    status: 'Green',
    waterLevel: 85,
    dustbinLevel: 20,
    odourLevel: 'Low',
    temperature: 24,
    humidity: 50,
    occupancy: 12,
    doorStatus: 'Closed',
    lightStatus: 'Working',
    lastCleaned: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    aiScore: 95,
    priority: 'Low',
  },
  {
    id: 'T-002',
    name: 'City Mall Ground Floor',
    location: [51.51, -0.1],
    status: 'Yellow',
    waterLevel: 40,
    dustbinLevel: 65,
    odourLevel: 'Medium',
    temperature: 26,
    humidity: 60,
    occupancy: 45,
    doorStatus: 'Open',
    lightStatus: 'Working',
    lastCleaned: new Date(Date.now() - 1000 * 60 * 60 * 4),
    aiScore: 70,
    priority: 'Medium',
  },
  {
    id: 'T-003',
    name: 'Airport Terminal 1',
    location: [51.50, -0.08],
    status: 'Red',
    waterLevel: 15,
    dustbinLevel: 95,
    odourLevel: 'High',
    temperature: 28,
    humidity: 75,
    occupancy: 120,
    doorStatus: 'Open',
    lightStatus: 'Working',
    lastCleaned: new Date(Date.now() - 1000 * 60 * 60 * 8),
    aiScore: 22,
    priority: 'Critical',
  },
  {
    id: 'T-004',
    name: 'Public Park North',
    location: [51.52, -0.11],
    status: 'Green',
    waterLevel: 90,
    dustbinLevel: 10,
    odourLevel: 'Low',
    temperature: 22,
    humidity: 45,
    occupancy: 2,
    doorStatus: 'Closed',
    lightStatus: 'Working',
    lastCleaned: new Date(Date.now() - 1000 * 60 * 30),
    aiScore: 98,
    priority: 'Low',
  },
  {
    id: 'T-005',
    name: 'Metro Station West',
    location: [51.49, -0.12],
    status: 'Orange',
    waterLevel: 30,
    dustbinLevel: 80,
    odourLevel: 'High',
    temperature: 27,
    humidity: 65,
    occupancy: 80,
    doorStatus: 'Open',
    lightStatus: 'Faulty',
    lastCleaned: new Date(Date.now() - 1000 * 60 * 60 * 6),
    aiScore: 45,
    priority: 'High',
  }
];

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toilets, setToilets] = useState<ToiletData[]>(initialToilets);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
  };

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  useEffect(() => {
    // Simulation interval: update values randomly every 3 seconds to simulate IoT stream
    const interval = setInterval(() => {
      setToilets(prevToilets => prevToilets.map(toilet => {
        // Randomly simulate usage
        const occupancyIncrease = Math.floor(Math.random() * 3);
        const waterDecrease = Math.random() * 2;
        const dustbinIncrease = Math.random() * 2;
        
        let newOccupancy = toilet.occupancy + occupancyIncrease;
        let newWater = Math.max(0, toilet.waterLevel - waterDecrease);
        let newDustbin = Math.min(100, toilet.dustbinLevel + dustbinIncrease);
        
        // Calculate AI Score (Simple formula for simulation)
        // High water is good, low dustbin is good, low occupancy is good
        const waterScore = newWater;
        const dustbinScore = 100 - newDustbin;
        const occupancyScore = Math.max(0, 100 - (newOccupancy / 2));
        
        const rawAiScore = (waterScore + dustbinScore + occupancyScore) / 3;
        
        // Add random fluctuation
        const aiScore = Math.max(0, Math.min(100, Math.round(rawAiScore + (Math.random() * 5 - 2.5))));
        
        let status: ToiletStatus = 'Green';
        let priority: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
        let odourLevel: 'Low' | 'Medium' | 'High' = 'Low';
        
        if (aiScore < 30) {
          status = 'Red';
          priority = 'Critical';
          odourLevel = 'High';
        } else if (aiScore < 50) {
          status = 'Orange';
          priority = 'High';
          odourLevel = 'High';
        } else if (aiScore < 75) {
          status = 'Yellow';
          priority = 'Medium';
          odourLevel = 'Medium';
        }
        
        return {
          ...toilet,
          occupancy: newOccupancy,
          waterLevel: newWater,
          dustbinLevel: newDustbin,
          aiScore,
          status,
          priority,
          odourLevel
        };
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <SimulationContext.Provider value={{ toilets, alerts, darkTheme, toggleTheme }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
