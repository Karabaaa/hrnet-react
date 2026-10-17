export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

export type NewEmployee = Omit<Employee, "id">;
export type EmployeeUpdates = Partial<Omit<Employee, "id">>;
