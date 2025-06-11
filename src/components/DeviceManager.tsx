import React, { useState } from 'react';
import { Fingerprint, Wifi, WifiOff, Settings, Plus, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface DeviceManagerProps {
  connectionStatus: string;
}

const DeviceManager: React.FC<DeviceManagerProps> = ({ connectionStatus }) => {
  const [devices, setDevices] = useState([
    {
      id: 'zk-001',
      name: 'Main Entrance',
      ip: '192.168.1.100',
      model: 'ZKTeco F18',
      status: 'connected',
      lastSync: '2 minutes ago',
      users: 45,
      location: 'Building A - Entrance'
    },
    {
      id: 'zk-002',
      name: 'Office Floor 2',
      ip: '192.168.1.101',
      model: 'ZKTeco F22',
      status: 'disconnected',
      lastSync: '1 hour ago',
      users: 32,
      location: 'Building A - Floor 2'
    },
    {
      id: 'zk-003',
      name: 'Warehouse Entry',
      ip: '192.168.1.102',
      model: 'ZKTeco F18',
      status: 'connected',
      lastSync: '5 minutes ago',
      users: 28,
      location: 'Warehouse Building'
    }
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    ip: '',
    model: '',
    location: ''
  });

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    const device = {
      id: `zk-${Date.now()}`,
      ...newDevice,
      status: 'disconnected',
      lastSync: 'Never',
      users: 0
    };
    setDevices([...devices, device]);
    setNewDevice({ name: '', ip: '', model: '', location: '' });
    setShowAddDevice(false);
  };

  const toggleDeviceStatus = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, status: device.status === 'connected' ? 'disconnected' : 'connected' }
        : device
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Device Manager</h1>
          <p className="text-gray-600">Manage and monitor your ZKTeco fingerprint devices</p>
        </div>
        <button
          onClick={() => setShowAddDevice(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Device</h3>
            <form onSubmit={handleAddDevice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Main Entrance"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                <input
                  type="text"
                  value={newDevice.ip}
                  onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="192.168.1.100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={newDevice.model}
                  onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ZKTeco F18"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newDevice.location}
                  onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Building A - Entrance"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Add Device
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDevice(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Devices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                    <Fingerprint className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-500">{device.model}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {device.status === 'connected' ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <Wifi className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    device.status === 'connected' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">IP Address:</span>
                  <span className="text-sm font-mono text-gray-900">{device.ip}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Users:</span>
                  <span className="text-sm font-medium text-gray-900">{device.users}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Sync:</span>
                  <span className="text-sm text-gray-500">{device.lastSync}</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-1">Location:</p>
                  <p className="text-sm font-medium text-gray-900">{device.location}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50 flex space-x-2">
              <button
                onClick={() => toggleDeviceStatus(device.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  device.status === 'connected'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {device.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
              <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                <RefreshCw className="h-4 w-4" />
                <span>Sync</span>
              </button>
              <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceManager;