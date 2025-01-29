import { SelectProps } from '../../types';

const Select: React.FC<SelectProps> = ({
  options,
  className = '',
  onChange = e => {},
  value = '',
  name = '',
}) => {
  return (
    <select
      className={`border p-2 ${className}`}
      onChange={onChange}
      value={value}
      name={name}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
