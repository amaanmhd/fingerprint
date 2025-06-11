import React, { useState } from 'react';
import { Smartphone, Users, Send, Settings, Plus, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

const WhatsAppIntegration: React.FC = () => {
  const [groups, setGroups] = useState([
    {
      id: 'group-1',
      name: 'HR Department',
      chatId: '+1234567890-1234567890@g.us',
      members: 25,
      status: 'active',
      lastMessage: '2 minutes ago',
      notifications: ['check-in', 'check-out', 'late-arrival']
    },
    {
      id: 'group-2',
      name: 'Management Team',
      chatId: '+1234567890-1234567891@g.us',
      members: 8,
      status: 'active',
      lastMessage: '1 hour ago',
      notifications: ['daily-summary', 'alerts']
    },
    {
      id: 'group-3',
      name: 'IT Department',
      chatId: '+1234567890-1234567892@g.us',
      members: 12,
      status: 'inactive',
      lastMessage: '1 day ago',
      notifications: ['system-alerts', 'device-status']
    }
  ]);

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    chatId: '',
    notifications: []
  });

  const [messageTemplate, setMessageTemplate] = useState({
    checkIn: "✅ {name} has checked in at {time} - {location}",
    checkOut: "🚪 {name} has checked out at {time} - {location}",
    lateArrival: "⚠️ Late arrival: {name} checked in at {time} (Expected: {expected_time})",
    dailySummary: "📊 Daily Summary:\n• Total Check-ins: {checkins}\n• Late Arrivals: {late}\n• Present: {present}\n• Absent: {absent}"
  });

  const notificationTypes = [
    { id: 'check-in', label: 'Check-in Notifications', icon: '✅' },
    { id: 'check-out', label: 'Check-out Notifications', icon: '🚪' },
    { id: 'late-arrival', label: 'Late Arrival Alerts', icon: '⚠️' },
    { id: 'daily-summary', label: 'Daily Summary', icon: '📊' },
    { id: 'system-alerts', label: 'System Alerts', icon: '🔔' },
    { id: 'device-status', label: 'Device Status Updates', icon: '🔌' }
  ];

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const group = {
      id: `group-${Date.now()}`,
      ...newGroup,
      members: 0,
      status: 'active',
      lastMessage: 'Never'
    };
    setGroups([...groups, group]);
    setNewGroup({ name: '', chatId: '', notifications: [] });
    setShowAddGroup(false);
  };

  const toggleGroupStatus = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, status: group.status === 'active' ? 'inactive' : 'active' }
        : group
    ));
  };

  const sendTestMessage = (groupId: string) => {
    // Simulate sending a test message
    console.log(`Sending test message to group ${groupId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Integration</h1>
          <p className="text-gray-600">Manage WhatsApp groups and notification settings</p>
        </div>
        <button
          onClick={() => setShowAddGroup(true)}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Group</span>
        </button>
      </div>

      {/* Add Group Modal */}
      {showAddGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add WhatsApp Group</h3>
            <form onSubmit={handleAddGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., HR Department"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chat ID</label>
                <input
                  type="text"
                  value={newGroup.chatId}
                  onChange={(e) => setNewGroup({ ...newGroup, chatId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+1234567890-1234567890@g.us"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Notification Types</label>
                <div className="space-y-2">
                  {notificationTypes.map((type) => (
                    <label key={type.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={newGroup.notifications.includes(type.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewGroup({
                              ...newGroup,
                              notifications: [...newGroup.notifications, type.id]
                            });
                          } else {
                            setNewGroup({
                              ...newGroup,
                              notifications: newGroup.notifications.filter(n => n !== type.id)
                            });
                          }
                        }}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{type.icon} {type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Add Group
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddGroup(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members} members</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {group.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    group.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {group.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Message:</span>
                  <span className="text-sm text-gray-500">{group.lastMessage}</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-2">Notifications:</p>
                  <div className="flex flex-wrap gap-1">
                    {group.notifications.map((notif) => {
                      const type = notificationTypes.find(t => t.id === notif);
                      return (
                        <span key={notif} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {type?.icon} {type?.label.split(' ')[0]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50 flex space-x-2">
              <button
                onClick={() => toggleGroupStatus(group.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  group.status === 'active'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {group.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                onClick={() => sendTestMessage(group.id)}
                className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
              >
                <Send className="h-4 w-4" />
                <span>Test</span>
              </button>
              <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Templates */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Templates</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Message</label>
            <textarea
              value={messageTemplate.checkIn}
              onChange={(e) => setMessageTemplate({ ...messageTemplate, checkIn: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Message</label>
            <textarea
              value={messageTemplate.checkOut}
              onChange={(e) => setMessageTemplate({ ...messageTemplate, checkOut: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Late Arrival Alert</label>
            <textarea
              value={messageTemplate.lateArrival}
              onChange={(e) => setMessageTemplate({ ...messageTemplate, lateArrival: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Summary</label>
            <textarea
              value={messageTemplate.dailySummary}
              onChange={(e) => setMessageTemplate({ ...messageTemplate, dailySummary: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200">
            Save Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;