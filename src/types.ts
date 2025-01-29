export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
}

export interface Employee {
  id: number | string;
  firstName: string;
  lastName: string;
  birthDate: string;
  position: string;
}
