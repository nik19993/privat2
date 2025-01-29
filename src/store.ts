import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Employee } from './types';

const serverUrl = import.meta.env.VITE_BACKEND_URL;

interface EmployeesState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  form1Visible: boolean;
  form2Visible: boolean;
  form3Visible: boolean;
}

const initialState: EmployeesState = {
  employees: [],
  selectedEmployee: null,
  form1Visible: true,
  form2Visible: true,
  form3Visible: true,
};

export const fetchEmployees = createAsyncThunk<Employee[]>(
  'employees/fetchEmployees',
  async () => {
    const response = await axios.get(`${serverUrl}/employees`);
    return response.data;
  }
);

export const fetchEmployeeById = createAsyncThunk<Employee, number>(
  'employees/fetchEmployeeById',
  async (id: number) => {
    const response = await axios.get(`${serverUrl}/employees/${id}`);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk<Employee, Omit<Employee, 'id'>>(
  'employees/addEmployee',
  async (employee: Omit<Employee, 'id'>) => {
    const response = await axios.post(`${serverUrl}/employees`, employee);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk<number, number>(
  'employees/deleteEmployee',
  async (id: number) => {
    await axios.delete(`${serverUrl}/employees/${id}`);
    return id;
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedEmployee: (state, action: PayloadAction<Employee>) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: state => {
      state.selectedEmployee = null;
    },
    setFormVisibility: (
      state,
      action: PayloadAction<{
        form: 'form1' | 'form2' | 'form3';
        visible: boolean;
      }>
    ) => {
      state[`${action.payload.form}Visible`] = action.payload.visible;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      state.selectedEmployee = action.payload;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(
        employee => employee.id !== action.payload
      );
    });
  },
});

export const { setSelectedEmployee, clearSelectedEmployee, setFormVisibility } =
  appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
