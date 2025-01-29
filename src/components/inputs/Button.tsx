import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick = () => {},
  type = 'button',
}) => {
  return (
    <button
      className={`bg-blue-500 text-white hover:opacity-90 ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
