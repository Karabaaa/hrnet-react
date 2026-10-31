import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmployeeProvider } from "./EmployeeProvider";
import { useEmployees } from "./useEmployees";

const storedEmployee = {
  id: "employee-1",
  firstName: "Leto",
  lastName: "Atreides",
  dateOfBirth: "1996-08-17",
  startDate: "2025-01-01",
  street: "1 Moon Street",
  city: "Cambridge",
  state: "MA",
  zipCode: "02139",
  department: "Engineering",
};

function EmployeeContextTestComponent() {
  const { employees, updateEmployee } = useEmployees();

  return (
    <>
      <output aria-label="Employee count">{employees.length}</output>
      <output>{JSON.stringify(employees)}</output>
      <button
        type="button"
        onClick={() =>
          updateEmployee("employee-1", { department: "Human Resources" })
        }
      >
        Update employee
      </button>
    </>
  );
}

describe("EmployeeProvider", () => {
  it("charge les employes stockes et persiste leurs modifications", async () => {
    localStorage.setItem("employees", JSON.stringify([storedEmployee]));
    const user = userEvent.setup();

    render(
      <EmployeeProvider>
        <EmployeeContextTestComponent />
      </EmployeeProvider>,
    );

    expect(screen.getByText(/Leto/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Update employee" }));

    expect(screen.getByText(/Human Resources/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("employees") ?? "[]")).toEqual([
      { ...storedEmployee, department: "Human Resources" },
    ]);
  });

  it("ignore une valeur localStorage invalide", () => {
    localStorage.setItem("employees", "invalid json");

    render(
      <EmployeeProvider>
        <EmployeeContextTestComponent />
      </EmployeeProvider>,
    );

    expect(screen.getByLabelText("Employee count")).toHaveTextContent("0");
  });

  it("signale une utilisation du hook hors du provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    expect(() => render(<EmployeeContextTestComponent />)).toThrow(
      "useEmployees doit être utilisé dans un EmployeeProvider",
    );
  });
});
