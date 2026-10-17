import { createContext } from "react";
import type { Employee, NewEmployee, EmployeeUpdates } from "../types/Employee";

export interface EmployeeContextValue {
  employees: Employee[];
  addEmployee: (newEmployee: NewEmployee) => void;
  updateEmployee: (employeeId: string, updates: EmployeeUpdates) => void;
}

export const EmployeeContext = createContext<EmployeeContextValue | undefined>(
  undefined,
);
