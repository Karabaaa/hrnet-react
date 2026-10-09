import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const EmployeeList = lazy(() => import("../pages/EmployeeList/EmployeeList"));

export default function Router() {
  return (
    <Suspense
      fallback={
        <div className="page-loading">
          <p role="status">Loading…</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Suspense>
  );
}
