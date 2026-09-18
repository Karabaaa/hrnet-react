import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function EmployeeList() {
  const storedEmployees = localStorage.getItem("employees");
  const parsedEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];
  console.log(parsedEmployees);
  useEffect(() => {
    document.title = "HRnet - Current Employees";

    return () => {
      document.title = "HRnet";
    };
  }, []);

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display"></table>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}
