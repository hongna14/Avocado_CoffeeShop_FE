import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Employee } from "../../Interfaces/Employee";
import { Pagination } from "../Pagination";
import { TableBody } from "../Table/TableBody";
import { TableHeader } from "../Table/TableHeader";

const emptyEmployee: Employee = {
  employee_id: 0,
  employee_name: "",
  employee_position: "",
  employee_phone_number: "",
  coffee_shop_id: 0,
};

const titles = {
  employee_position: "Position",
  employee_name: "Name",
  employee_phone_number: "Phone Number",
  coffee_shop_id: "Coffee Shop",
};

export const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalRows: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePageChange = (currenPage: any) => {
    setPagination({
      ...pagination,
      page: currenPage,
    });
  };
  const totalEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees/count");
      const total = Number(response.data.count);
      setPagination({
        ...pagination,
        totalRows: total,
      });
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees", {
        params: {
          filter: {
            limit: pagination.limit,
            offset: (pagination.page - 1) * pagination.limit,
          },
        },
      });
      console.log("response", response);
      if (response && response.data) {
        const employees = response.data;
        setEmployee(employees);
        setCurrentIndex((pagination.page - 1) * pagination.limit);
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };
  useEffect(() => {
    totalEmployees();
  }, []);
  useEffect(() => {
    getEmployee();
  }, [pagination]);

  function handleLimitChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPagination({
      ...pagination,
      limit: Number(event.target.value),
      page: 1,
    });
  }

  return (
    <div>
      <div>
        <select
          value={pagination.limit}
          onChange={(event) => handleLimitChange(event)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <Link to="/employees/create">
        <BsFillPlusCircleFill
          style={{
            marginLeft: "90%",
            width: "30px",
            height: "30px",
            cursor: "pointer",
            color: "#406957",
          }}
        />
      </Link>
      <Table striped bordered hover style={{ margin: 0, width: "100%" }}>
        <TableHeader headerTiltes={titles} />
        <TableBody
          keys={Object.keys(titles)}
          itemLink={"employees"}
          id={"employee_id"}
          offset={currentIndex}
          items={employees}
        />
      </Table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};
