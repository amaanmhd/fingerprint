import React, { useState, useEffect } from 'react';
import { Smartphone, Fingerprint, Users, Clock, Settings, Activity, CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DeviceManager from './components/DeviceManager';
import WhatsAppIntegration from './components/WhatsAppIntegration';
import UserManagement from './components/UserManagement';
import ActivityFeed from './components/ActivityFeed';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Simulate connection status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(prev => !prev);
      setConnectionStatus(prev => prev === 'connected' ? 'disconnected' : 'connected');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'devices', label: 'Devices', icon: Fingerprint },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isConnected={isConnected} />;
      case 'devices':
        return <DeviceManager connectionStatus={connectionStatus} />;
      case 'whatsapp':
        return <WhatsAppIntegration />;
      case 'users':
        return <UserManagement />;
      case 'activity':
        return <ActivityFeed />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard isConnected={isConnected} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl border-r border-gray-200 min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Fingerprint className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ZKTeco Hub</h1>
                <p className="text-sm text-gray-500">WhatsApp Integration</p>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Wifi className="h-4 w-4 text-green-600" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-sm font-medium text-green-700">Connected</span>
                  </div>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">Disconnected</span>
                </>
              )}
            </div>
          </div>

          <nav className="mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;