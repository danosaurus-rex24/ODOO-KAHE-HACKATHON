import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl shadow-lg bg-white dark:bg-secondary p-6 transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  )
}

export default Card