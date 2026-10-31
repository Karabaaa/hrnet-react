import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { EmployeeContext } from "../../context/employeeContext";
import type { Employee } from "../../types/Employee";
import EmployeeList from "./EmployeeList";

vi.mock("../../components/EmployeeTable/EmployeeTable", () => ({
  default: ({ employees }: { employees: Employee[] }) => (
    <div aria-label="Employee table">
      <p aria-label="Displayed employee count">{employees.length}</p>
      {employees.map((employee) => (
        <p key={employee.id}>{`${employee.firstName} ${employee.lastName}`}</p>
      ))}
    </div>
  ),
}));

const katherineJohnson: Employee = {
  id: "employee-1",
  firstName: "Katherine",
  lastName: "Johnson",
  dateOfBirth: "1998-08-26",
  startDate: "2023-01-01",
  street: "1 Orbital Avenue",
  city: "Hampton",
  state: "VA",
  zipCode: "23666",
  department: "Engineering",
};

const adaLovelace: Employee = {
  id: "employee-2",
  firstName: "Ada",
  lastName: "Lovelace",
  dateOfBirth: "1995-12-10",
  startDate: "2025-01-01",
  street: "1 Analytical Way",
  city: "London",
  state: "CA",
  zipCode: "90210",
  department: "Engineering",
};

function renderEmployeeList(employees: Employee[]) {
  return render(
    <MemoryRouter initialEntries={["/employee-list"]}>
      <EmployeeContext.Provider
        value={{
          employees,
          addEmployee: vi.fn(),
          updateEmployee: vi.fn(),
        }}
      >
        <EmployeeList />
      </EmployeeContext.Provider>
    </MemoryRouter>,
  );
}

describe("EmployeeList", () => {
  it("affiche les employes du contexte et la navigation", () => {
    renderEmployeeList([katherineJohnson, adaLovelace]);

    expect(
      screen.getByRole("heading", { name: "Current Employees" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Displayed employee count")).toHaveTextContent(
      "2",
    );
    expect(screen.getByText("Katherine Johnson")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.title).toBe("HRnet | Current Employees");
  });

  it("transmet une liste vide au tableau lorsqu'il n'y a aucun employe", () => {
    renderEmployeeList([]);

    expect(screen.getByLabelText("Displayed employee count")).toHaveTextContent(
      "0",
    );
    expect(screen.queryByText("Katherine Johnson")).not.toBeInTheDocument();
    expect(screen.queryByText("Ada Lovelace")).not.toBeInTheDocument();
  });
});
