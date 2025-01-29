import React, { useState } from 'react';
import Button from './inputs/Button';
import Select from './inputs/Select';
import TextInput from './inputs/TextInput';
import Label from './Label';
import axios from 'axios';
import { AppDispatch, fetchEmployees } from '../store';
import { useDispatch } from 'react-redux';

const positions: string[] = ['Директор', 'Менеджер', 'Програміст', 'Дизайнер'];
const serverUrl = import.meta.env.VITE_BACKEND_URL;

const Form1: React.FC = () => {
  console.log(import.meta.env);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    position: positions[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/employees`, formData);
      dispatch(fetchEmployees());
      console.log('Employee saved:', response.data);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-gray-100 relative">
      <Label text="Форма #1" />
      <div className="mt-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label className="mr-2 w-1/2 text-right">Прізвище</label>
            <TextInput
              name="lastName"
              placeholder="Прізвище"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-1/2 text-right">Ім'я</label>
            <TextInput
              name="firstName"
              placeholder="Ім'я"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-1/2 text-right">Дата народження</label>
            <TextInput
              name="birthDate"
              placeholder="Дата народження"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-1/2 text-right">Посада</label>
            <Select
              name="position"
              options={positions}
              value={formData.position}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              text="Зберегти"
              className="px-4 py-2 bg-blue-500 w-1/2"
              type={'submit'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form1;
