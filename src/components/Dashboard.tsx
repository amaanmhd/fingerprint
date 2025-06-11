import React from 'react';
import { Users, Clock, Smartphone, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  isConnected: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected }) => {
  const stats = [
    {
      title: 'Connected Devices',
      value: '3',
      change: '+1 today',
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Active Users',
      value: '147',
      change: '+12 this week',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Today\'s Check-ins',
      value: '89',
      change: '76% attendance',
      icon: Clock,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'WhatsApp Groups',
      value: '5',
      change: 'All active',
      icon: Smartphone,
      color: 'bg-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Check-in', time: '09:15 AM', status: 'success' },
    { user: 'Sarah Wilson', action: 'Check-out', time: '09:12 AM', status: 'success' },
    { user: 'Mike Johnson', action: 'Check-in', time: '09:08 AM', status: 'success' },
    { user: 'Device ZK-001', action: 'Connection Lost', time: '09:05 AM', status: 'error' },
    { user: 'Emma Davis', action: 'Check-in', time: '09:03 AM', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your ZKTeco devices and WhatsApp integration in real-time</p>
      </div>

      {/* Status Alert */}
      {!isConnected && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <div>
            <h3 className="font-medium text-red-800">Connection Issue</h3>
            <p className="text-sm text-red-600">Some devices are experiencing connectivity issues. Check device manager for details.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <p className={`text-xs font-medium ${stat.textColor}`}>{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Latest attendance and system events</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            <p className="text-sm text-gray-600 mt-1">Current status of all connected systems</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">WhatsApp API</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Database</span>
              </div>
              <span className="text-sm text-blue-600 font-medium">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">ZK Device #2</span>
              </div>
              <span className="text-sm text-yellow-600 font-medium">Reconnecting</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Notification Service</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;