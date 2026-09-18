import DataTable from "datatables.net-react";
import DataTablesCore from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "./EmployeeTable.css";

import type { Employee } from "../../types/Employee";

interface EmployeeTableProps {
  employees: Employee[];
}

// DataTables appelle cette méthode `use`, mais ce n’est pas un hook React.
// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DataTablesCore);

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const columns = [
    { data: "firstName", title: "First Name" },
    { data: "lastName", title: "Last Name" },
    { data: "startDate", title: "Start Date" },
    { data: "department", title: "Department" },
    { data: "dateOfBirth", title: "Date of Birth" },
    { data: "street", title: "Street" },
    { data: "city", title: "City" },
    { data: "state", title: "State" },
    { data: "zipCode", title: "Zip Code", className: "zip-code-column" },
  ];

  return (
    <div className="employee-table-wrapper">
      <DataTable
        data={employees}
        columns={columns}
        className="employee-table"
        options={{
          searching: true,
          ordering: true,
          paging: true,
          pageLength: 10,
          layout: {
            topStart: "pageLength",
            topEnd: "search",
            bottomStart: "info",
            bottomEnd: {
              paging: {
                firstLast: false,
              },
            },
          },
          language: {
            lengthMenu: "Show _MENU_ entries",
            search: "Search:",
            emptyTable: "No data available in table",
            zeroRecords: "No matching employees found",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoEmpty: "Showing 0 to 0 of 0 entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            paginate: {
              previous: "Previous",
              next: "Next",
            },
          },
        }}
      />
    </div>
  );
}
