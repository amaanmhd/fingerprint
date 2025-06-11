import React, { useState, useEffect } from 'react';
import { Clock, User, Fingerprint, Smartphone, AlertTriangle, CheckCircle, Calendar, Filter } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState([
    {
      id: 'act-001',
      type: 'check-in',
      user: 'John Doe',
      device: 'Main Entrance',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      details: 'Employee ID: EMP001',
      status: 'success'
    },
    {
      id: 'act-002',
      type: 'check-out',
      user: 'Sarah Wilson',
      device: 'Office Floor 2',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      details: 'Employee ID: EMP002',
      status: 'success'
    },
    {
      id: 'act-003',
      type: 'device-alert',
      user: 'System',
      device: 'Warehouse Entry',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      details: 'Connection timeout detected',
      status: 'error'
    },
    {
      id: 'act-004',
      type: 'whatsapp-sent',
      user: 'System',
      device: 'WhatsApp Bot',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      details: 'Daily summary sent to HR Department',
      status: 'success'
    },
    {
      id: 'act-005',
      type: 'late-arrival',
      user: 'Mike Johnson',
      device: 'Main Entrance',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      details: 'Arrived 30 minutes late',
      status: 'warning'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: `act-${Date.now()}`,
        type: Math.random() > 0.7 ? 'check-in' : 'check-out',
        user: ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emma Davis'][Math.floor(Math.random() * 4)],
        device: ['Main Entrance', 'Office Floor 2', 'Warehouse Entry'][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
        details: `Employee ID: EMP${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
        status: 'success'
      };
      
      setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep only latest 50 activities
    }, 30000); // Add new activity every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'check-in':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'check-out':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'device-alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'whatsapp-sent':
        return <Smartphone className="h-5 w-5 text-green-600" />;
      case 'late-arrival':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredActivities = activities.filter(activity => {
    if (filter !== 'all' && activity.type !== filter) return false;
    
    if (dateFilter === 'today') {
      const today = new Date();
      const activityDate = activity.timestamp;
      return activityDate.toDateString() === today.toDateString();
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Feed</h1>
        <p className="text-gray-600">Real-time monitoring of all system activities and user interactions</p>
      </div>

      {/* Live Status Indicator */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-800 font-medium">Live Feed Active</span>
        </div>
        <span className="text-green-600 text-sm">Updates automatically every 30 seconds</span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="check-in">Check-ins</option>
              <option value="check-out">Check-outs</option>
              <option value="device-alert">Device Alerts</option>
              <option value="whatsapp-sent">WhatsApp Messages</option>
              <option value="late-arrival">Late Arrivals</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Time period:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          <p className="text-sm text-gray-600 mt-1">Showing {filteredActivities.length} activities</p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Clock className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600">No activities found for the selected filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className={`p-6 hover:bg-gray-50 transition-colors ${getActivityColor(activity.status)} border-l-4 m-2 rounded-r-lg`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type === 'device-alert' || activity.type === 'whatsapp-sent' ? 
                            activity.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
                            `${activity.user} - ${activity.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`
                          }
                        </p>
                        <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-2">
                          <Fingerprint className="h-4 w-4 text-gray-400" />
                          <span>{activity.device}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filteredActivities.filter(a => a.type === 'check-in').length}
              </p>
              <p className="text-sm text-gray-600">Check-ins Today</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {filteredActivities.filter(a => a.type === 'check-out').length}
              </p>
              <p className="text-sm text-gray-600">Check-outs Today</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredActivities.filter(a => a.type === 'late-arrival').length}
              </p>
              <p className="text-sm text-gray-600">Late Arrivals</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">
                {filteredActivities.filter(a => a.type === 'device-alert').length}
              </p>
              <p className="text-sm text-gray-600">Device Alerts</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;