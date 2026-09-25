import { NavLink } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import states from "../../utils/constants";
import type { Employee } from "../../types/Employee";
import "./Home.css";
//import Modal from "../../components/Modal/Modal";
import { Modal } from "@karabaaa/simple-modal";
import "@karabaaa/simple-modal/style.css";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const saveEmployee = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !startDate ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !department
    ) {
      return;
    }
    const storedEmployees = localStorage.getItem("employees");
    const employees: Employee[] = storedEmployees
      ? JSON.parse(storedEmployees)
      : [];
    const employee: Employee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      department: department,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setDepartment("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setShowConfirmation(true);
  };

  return (
    <main className="home-page ">
      <div className="navigation">
        <NavLink to="/employee-list">View Current Employees</NavLink>
      </div>
      <h2>Create Employee</h2>
      <form onSubmit={saveEmployee} className="employee-form">
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          id="date-of-birth"
          type="date"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
          required
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            required
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          >
            <option value="" disabled>
              Select a state
            </option>
            {states.map((stateOption) => (
              <option
                key={stateOption.abbreviation}
                value={stateOption.abbreviation}
              >
                {stateOption.name}
              </option>
            ))}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="text"
            pattern="[0-9]*"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            required
          />
        </fieldset>
        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          required
        >
          <option value="" disabled>
            Select a department
          </option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
        <button type="submit">Save</button>
      </form>
      {/* <Modal
        isVisible={showConfirmation}
        title="Employee created !"
        text="The employee was successfully added to the directory."
        onClose={() => setShowConfirmation(false)}
        onActionPress={() => setShowConfirmation(false)}
        onActionText="Fermer"
      />*/}
      <Modal
        isVisible={showConfirmation}
        title="Employee created !"
        text="The employee was successfully added to the directory."
        onClose={() => setShowConfirmation(false)}
        onActionPress={() => setShowConfirmation(false)}
        onActionText="Close"
        //   className="employee-modal"
      />
    </main>
  );
}
