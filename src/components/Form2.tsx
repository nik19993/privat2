import React from 'react';
import Button from './inputs/Button';
import Label from './Label';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  clearSelectedEmployee,
  deleteEmployee,
  fetchEmployees,
  RootState,
} from '../store';

const Form2: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector(
    (state: RootState) => state.app.selectedEmployee
  );
  if (!employee) {
    return <div className="flex-1 p-4 bg-gray-100">Виберіть співробітника</div>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/employees/${employee.id}`);
      dispatch(deleteEmployee(employee.id));
      dispatch(fetchEmployees());
      dispatch(clearSelectedEmployee());
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <Label text="Форма #2" />
      <div className="mt-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="mr-2">Особова карта</span>
          <Button
            text="Видалення"
            className="px-4 py-2 bg-blue-500 w-1/2"
            onClick={handleDelete}
          />
        </div>
        <table className="min-w-full bg-white border">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Прізвище</td>
              <td className="border px-4 py-2">{employee.lastName}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Ім'я</td>
              <td className="border px-4 py-2">{employee.firstName}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Дата народження</td>
              <td className="border px-4 py-2">{employee.birthDate}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Посада</td>
              <td className="border px-4 py-2">{employee.position}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form2;
