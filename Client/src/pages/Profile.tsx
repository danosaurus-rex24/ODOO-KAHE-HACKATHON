import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { User, Mail, Phone, MapPin, Settings, LogOut } from 'lucide-react'
js
const { data: { user } } = await supabase.auth.getUser()
const Profile: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-gray-100 mt-2">Premium Member</p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
          <User size={24} />
          Personal Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <Mail size={20} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-primary dark:text-white">john@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <Phone size={20} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-medium text-primary dark:text-white">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <MapPin size={20} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
              <p className="font-medium text-primary dark:text-white">New York, USA</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Travel Stats */}
      <Card>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
          Travel Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <p className="text-3xl font-bold text-accent">12</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Total Trips
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <p className="text-3xl font-bold text-accent">$24,500</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Total Spent
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-secondary">
            <p className="text-3xl font-bold text-accent">18</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Countries Visited
            </p>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
          <Settings size={24} />
          Settings
        </h2>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors">
            <span className="text-primary dark:text-white font-medium">
              Notification Preferences
            </span>
            <span className="text-accent">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors">
            <span className="text-primary dark:text-white font-medium">
              Privacy Settings
            </span>
            <span className="text-accent">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors">
            <span className="text-primary dark:text-white font-medium">
              Account Security
            </span>
            <span className="text-accent">→</span>
          </button>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="secondary" className="flex-1">
          Update Profile
        </Button>
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Profile