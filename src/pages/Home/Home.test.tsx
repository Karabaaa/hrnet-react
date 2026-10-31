import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { EmployeeProvider } from "../../context/EmployeeProvider";
import Home from "./Home";

describe("Home", () => {
  it("enregistre un employe valide puis affiche et ferme la confirmation", async () => {
    const user = userEvent.setup();
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "00000000-0000-4000-8000-000000000001",
    );

    render(
      <MemoryRouter>
        <EmployeeProvider>
          <Home />
        </EmployeeProvider>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("First Name"), "Grace");
    await user.type(screen.getByLabelText("Last Name"), "Hopper");
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: "1996-12-09" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2024-01-01" },
    });
    await user.type(screen.getByLabelText("Street"), "2 Compiler Road");
    await user.type(screen.getByLabelText("City"), "New York");
    await user.selectOptions(screen.getByLabelText("State"), "NY");
    await user.type(screen.getByLabelText("Zip Code"), "10001");
    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering",
    );
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      screen.getByRole("heading", { name: "Employee created !" }),
    ).toBeVisible();
    expect(screen.getByLabelText("First Name")).toHaveValue("");

    const employees = JSON.parse(localStorage.getItem("employees") ?? "[]");
    expect(employees).toEqual([
      expect.objectContaining({
        id: "00000000-0000-4000-8000-000000000001",
        firstName: "Grace",
        lastName: "Hopper",
        department: "Engineering",
      }),
    ]);

    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByText("Close"));

    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute(
      "open",
    );
  });
});
