import React from 'react';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return <div className="bg-gray-800 text-white text-center p-2">{text}</div>;
};

export default Label;
