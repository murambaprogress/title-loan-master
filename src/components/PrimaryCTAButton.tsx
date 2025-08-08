import React from 'react';

interface PrimaryCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
}

const PrimaryCTAButton: React.FC<PrimaryCTAButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  size = 'large',
  variant = 'primary',
  className = '',
  fullWidth = false
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-bold text-white
    rounded-full
    transition-all duration-300 ease-out
    transform
    shadow-lg hover:shadow-xl
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-95
  `;

  const sizeClasses = {
    medium: 'px-8 py-3 text-base',
    large: 'px-10 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700
      hover:from-blue-700 hover:to-blue-800
      hover:scale-105 hover:brightness-110
      focus:ring-blue-500
      shadow-blue-500/25 hover:shadow-blue-600/30
    `,
    secondary: `
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      hover:scale-105 hover:brightness-110
      focus:ring-green-500
      shadow-green-500/25 hover:shadow-green-600/30
    `
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClasses}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default PrimaryCTAButton;