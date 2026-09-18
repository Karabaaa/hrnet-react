import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import EmployeeList from "../pages/EmployeeList/EmployeeList";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee-list" element={<EmployeeList />} />
    </Routes>
  );
}
