import { useContext } from "react";
import { EmployeeContext } from "./employeeContext";

export function useEmployees() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("useEmployees doit être utilisé dans un EmployeeProvider");
  }

  return context;
}
