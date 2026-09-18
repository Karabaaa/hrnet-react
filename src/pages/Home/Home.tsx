import { NavLink } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import states from "../../utils/constants";

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
    const storedEmployees = localStorage.getItem("employees");
    const employees = storedEmployees ? JSON.parse(storedEmployees) : [];
    const employee = {
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
    <div className="container">
      <div className="navigation">
        <NavLink to="/employee-list">View Current Employees</NavLink>
      </div>
      <h2>Create Employee</h2>
      <form onSubmit={saveEmployee} id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          id="date-of-birth"
          type="text"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="text"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
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
            type="number"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
        </fieldset>
        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button type="submit">Save</button>
      </form>
      {showConfirmation && (
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      )}
    </div>
  );
}
