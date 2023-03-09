import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/form.css";
import { Coffeeshop } from "../../Interfaces/Coffeeshop";
import { useNavigate, useParams } from "react-router-dom";
import { Employee } from "../../Interfaces/Employee";

const emptyEmployee: Employee = {
  employee_id: 0,
  employee_name: "",
  employee_position: "",
  employee_phone_number: "",
  coffee_shop_id: 0,
};

export const EmployeeForm = () => {
  let { idParam } = useParams();
  const navigate = useNavigate();
  const getInitialState = () => {
    const value = 1;
    return value;
  };
  const [coffeeshops, setCoffeeshops] = useState([]);
  const [employeeDetails, setEmployeeDetails] =
    useState<Employee>(emptyEmployee);
  const [coffeeshopId, setCoffeeshopId] = useState(getInitialState());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (!employeeDetails.employee_id) {
      createEmployee(data);
    } else {
      updateEmployee(data);
    }

    navigate("/employees");
  };

  const createEmployee = async (data: Employee) => {
    try {
      await axios.post(`http://localhost:3001/employees`, {
        employee_name: data.employee_name,
        employee_position: data.employee_position,
        employee_phone_number: data.employee_phone_number,
        coffee_shop_id: Number(data.coffee_shop_id),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const updateEmployee = async (data: Employee) => {
    try {
      await axios.put(
        `http://localhost:3001/employees/${employeeDetails.employee_id}`,
        {
          employee_name: data.employee_name,
          employee_position: data.employee_position,
          employee_phone_number: data.employee_phone_number,
          coffee_shop_id: Number(data.coffee_shop_id),
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getCoffeeShop = async () => {
    try {
      const response = await axios.get("http://localhost:3001/coffeeShop");
      if (response && response.data) {
        const coffeeshop = response.data;
        setCoffeeshops(coffeeshop);
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  const getEmployeeDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/employees/${idParam}`
      );
      const employee = response.data;
      console.log("employee: ", employee);
      setEmployeeDetails(employee);
    } catch (e) {
      console.log("employee errorr", e);
    }
  };

  const handleChangeOption = (event: { target: { value: number } }) => {
    setCoffeeshopId(Number(event.target.value));
  };
  const handleChange = (e: any) => {
    employeeDetails.coffee_shop_id = coffeeshopId;
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  useEffect(() => {
    getCoffeeShop();
  }, []);
  useEffect(() => {
    if (idParam) {
      getEmployeeDetails();
    }
  }, [idParam]);
  return (
    <div className="form">
      <h2>Employee 🐸</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb">
          <input
            {...register("employee_position", {
              required: true,
              onChange: (e) => handleChange(e),
            })}
            value={employeeDetails.employee_position}
            placeholder="Position"
          />
          {errors.employee_position && <p>Employee Position is required.</p>}
        </div>
        <div className="mb">
          <input
            {...register("employee_name", {
              required: true,
              onChange: (e) => handleChange(e),
            })}
            value={employeeDetails.employee_name}
            placeholder="Name"
          />
          {errors.employee_name && <p>Employee Name is required.</p>}
        </div>

        <div className="mb">
          <input
            {...register("employee_phone_number", {
              required: true,
              onChange: (e) => handleChange(e),
            })}
            placeholder="Phone Number"
            value={employeeDetails.employee_phone_number}
          />
          {errors.employee_phone_number && <p>Phone Number is required.</p>}
        </div>
        <div className="mb">
          <label>Coffee Shop</label>
          <select
            {...register("coffee_shop_id", {
              onChange: (e) => handleChangeOption(e),
            })}
            value={coffeeshopId}
          >
            {coffeeshops.map((coffeeshop: Coffeeshop) => {
              return (
                <option value={coffeeshop.coffee_shop_id}>
                  {coffeeshop.coffee_shop_address}
                </option>
              );
            })}
          </select>
          {errors.coffee_shop && <p>Coffee Shop is required.</p>}
        </div>

        <input type="submit" className="button_submit" />
      </form>
    </div>
  );
};
