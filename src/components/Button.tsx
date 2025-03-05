import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
}: ButtonProps) => {
  const baseStyles = 'rounded-xl font-medium transition-all focus:outline-none shadow-md hover:shadow-lg hover:-translate-y-0.5';
  
  const variantStyles = {
    primary: 'bg-[#007AFF] text-white hover:bg-[#0056b3]',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    accent: 'bg-[#4CD964] text-white hover:bg-[#3abb53]',
    outline: 'border-2 border-[#007AFF] bg-transparent text-[#007AFF] hover:bg-blue-50',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 