import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';

// Layouts
import AdminLayout from './components/layout/AdminLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminMap from './pages/AdminMap';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminCleaners from './pages/AdminCleaners';
import AdminNotifications from './pages/AdminNotifications';
import AdminSettings from './pages/AdminSettings';
import ToiletDetails from './pages/ToiletDetails';
import CleanerDashboard from './pages/CleanerDashboard';
import CitizenFeedback from './pages/CitizenFeedback';

export default function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="map" element={<AdminMap />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="cleaners" element={<AdminCleaners />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="toilet/:id" element={<ToiletDetails />} />
          </Route>

          <Route path="/cleaner" element={<CleanerDashboard />} />
          <Route path="/feedback" element={<CitizenFeedback />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SimulationProvider>
  );
}
