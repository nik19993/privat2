import React from 'react';

interface TextInputProps {
  placeholder: string;
  className?: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  className,
  type = 'text',
  name,
  value,
  onChange,
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`border p-2 ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
