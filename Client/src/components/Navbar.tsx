import React from 'react'
import { Menu, Moon, Sun } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const isDark = false
  const toggleDark = () => {}

  return (
    <nav className="bg-white dark:bg-primary border-b border-light dark:border-secondary px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors"
        >
          <Menu size={24} className="text-primary dark:text-white" />
        </button>
        <h1 className="text-2xl font-bold text-primary dark:text-accent">Traveloop</h1>
      </div>
      <button
        onClick={toggleDark}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors"
      >
        {isDark ? (
          <Sun size={24} className="text-accent" />
        ) : (
          <Moon size={24} className="text-primary" />
        )}
      </button>
    </nav>
  )
}

export default Navbar