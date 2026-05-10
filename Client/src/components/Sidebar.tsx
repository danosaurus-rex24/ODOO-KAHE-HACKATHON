import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Map, DollarSign, User, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  path: string
  label: string
  icon: React.FC<{ size: number; className?: string }>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems: MenuItem[] = [
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-primary border-r border-light dark:border-secondary transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-light dark:border-secondary md:hidden">
          <h2 className="text-lg font-semibold text-primary dark:text-white">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary">
            <X size={24} className="text-primary dark:text-white" />
          </button>
        </div>

        <nav className="mt-6 md:mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-primary border-r-4 border-accent'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary'
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