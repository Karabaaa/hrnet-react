import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import "./EmployeeList.css";
import { useEmployees } from "../../context/useEmployees";

export default function EmployeeList() {
  const { employees } = useEmployees();

  useEffect(() => {
    document.title = "HRnet | Current Employees";
  }, []);

  return (
    <main className="employee-list-page">
      <h1>Current Employees</h1>
      <EmployeeTable employees={employees} />
      <NavLink to="/">Home</NavLink>
    </main>
  );
}
