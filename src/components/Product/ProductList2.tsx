import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Product } from "../../Interfaces/Product";
import { TableBody } from "../Table/TableBody";
import { TableHeader } from "../Table/TableHeader";

const emptyProduct: Product = {
  product_id: 0,
  product_name: "",
  product_price: 0,
  product_type_name: "",
  product_type_id: 0,
};
const titles = {
  product_name: "Name",
  product_type_id: "Type",
};
export const ProductList = () => {
  const [products, setproducts] = useState([]);

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      console.log("response", response);
      if (response && response.data) {
        const products = response.data;
        setproducts(products);
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      <Link to="/create/products">
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
          itemLink={"products"}
          id={"product_id"}
          offset={0}
          items={products}
        />
      </Table>
    </div>
  );
};
