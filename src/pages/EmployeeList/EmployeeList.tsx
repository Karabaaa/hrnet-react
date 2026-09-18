import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import type { Employee } from "../../types/Employee";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import "./EmployeeList.css";

export default function EmployeeList() {
  const storedEmployees = localStorage.getItem("employees");
  const employees: Employee[] = storedEmployees
    ? JSON.parse(storedEmployees)
    : [];
  console.log(employees);

  useEffect(() => {
    document.title = "HRnet - Current Employees";

    return () => {
      document.title = "HRnet";
    };
  }, []);

  return (
    <main className="employee-list-page">
      <h1>Current Employees</h1>
      <EmployeeTable employees={employees} />
      <NavLink to="/">Home </NavLink>
    </main>
  );
}
