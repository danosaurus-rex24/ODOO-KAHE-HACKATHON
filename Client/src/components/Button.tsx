import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer'
  
  const variants = {
    primary: 'bg-accent text-primary hover:bg-opacity-90 hover:scale-105 shadow-md',
    secondary: 'bg-primary dark:bg-secondary text-white hover:shadow-lg',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-primary'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button