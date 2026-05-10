import React from 'react'
import { Menu } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Traveloop</h1>
      </div>
      <div className="hidden md:block">
        {/* User menu or other items can go here */}
      </div>
    </nav>
  )
}

export default Navbar