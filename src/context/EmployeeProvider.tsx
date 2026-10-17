import { useEffect, useState, type ReactNode } from "react";
import type { Employee, EmployeeUpdates, NewEmployee } from "../types/Employee";
import { EmployeeContext } from "./employeeContext";

interface EmployeeProviderProps {
  children: ReactNode;
}

function getStoredEmployees(): Employee[] {
  const storedEmployees = localStorage.getItem("employees");

  if (!storedEmployees) {
    return [];
  }

  try {
    return JSON.parse(storedEmployees) as Employee[];
  } catch {
    return [];
  }
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<Employee[]>(getStoredEmployees);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  function addEmployee(newEmployee: NewEmployee) {
    const employee: Employee = {
      ...newEmployee,
      id: crypto.randomUUID(),
    };

    setEmployees((currentEmployees: Employee[]) => [
      ...currentEmployees,
      employee,
    ]);
  }

  function updateEmployee(employeeId: string, updates: EmployeeUpdates) {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === employeeId ? { ...employee, ...updates } : employee,
      ),
    );
  }

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
