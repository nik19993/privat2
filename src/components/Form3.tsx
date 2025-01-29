import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, setSelectedEmployee } from '../store';
import { RootState, AppDispatch } from '../store';
import Label from './Label';
import { Employee } from '../types';

const Form3: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.app.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleShow = (employee: Employee) => {
    dispatch(setSelectedEmployee(employee));
  };

  return (
    <div className="w-full p-4 bg-gray-200 mt-4">
      <Label text="Форма #3" />
      <div className="mt-4">
        <h2 className="text-left font-bold mb-4">Історія запитів</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Прізвище</th>
              <th className="border px-4 py-2">Ім'я</th>
              <th className="border px-4 py-2">Дата народження</th>
              <th className="border px-4 py-2">Посада</th>
              <th className="border px-4 py-2">Подія</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">{employee.lastName}</td>
                <td className="border px-4 py-2">{employee.firstName}</td>
                <td className="border px-4 py-2">{employee.birthDate}</td>
                <td className="border px-4 py-2">{employee.position}</td>
                <td className="border px-4 py-2">
                  <a
                    href="#"
                    className="text-blue-500"
                    onClick={() => handleShow(employee)}
                  >
                    Показати
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form3;
