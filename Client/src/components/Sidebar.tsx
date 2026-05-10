import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Map, DollarSign, User, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/trips', label: 'Trips', icon: Map },
    { path: '/budget', label: 'Budget', icon: DollarSign },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                }`}
                onClick={onClose}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Sidebar