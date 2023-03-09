import { Table } from "react-bootstrap";
import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import {
  BsFillPlusCircleFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import { Product } from "../../Interfaces/Product";
import * as _ from "lodash";
import { Form } from "../../components/Product/Form";
import { Pagination } from "../Pagination";

const emptyProduct: Product = {
  product_id: 0,
  product_name: "",
  product_price: 0,
  product_type_id: 0,
};

export const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [record, setRecord] = useState<Product>(emptyProduct);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalRows: 1,
  });

  const handlePageChange = (currenPage: any) => {
    setPagination({
      ...pagination,
      page: currenPage,
    });
  };
  const handleOpen = (product?: Product) => {
    setIsModalOpen(true);
    if (product) {
      setRecord(product);
    }
  };
  const handleCloseModal = () => {
    setRecord(emptyProduct);
    setIsModalOpen(false);
  };
  const handleAlert = (id: number) => {
    if (window.confirm("Do you wanna delete this product ?") == true) {
      deleteProduct(id);
    }
  };
  const handleLimitChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setPagination({
      ...pagination,
      limit: Number(event.target.value),
      page: 1,
    });
  };
  const totalProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products/count");
      const total = Number(response.data.count);
      setPagination({
        ...pagination,
        totalRows: total,
      });
    } catch (e) {
      console.log("error ===>", e);
    }
  };
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/products", {
        params: {
          filter: {
            limit: pagination.limit,
            offset: (pagination.page - 1) * pagination.limit,
          },
        },
      });
      if (response && response.data) {
        const products = response.data;
        setProducts(products);
        setCurrentIndex((pagination.page - 1) * pagination.limit);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("error ===>", e);
    }
  };

  useEffect(() => {
    totalProducts();
  }, []);
  useEffect(() => {
    getProducts();
  }, [pagination]);

  if (loading) return <div>Loading.....</div>;

  const deleteProduct: any = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/products/${id}`);
      getProducts();
    } catch (e) {
      setLoading(false);
      console.log("error ===>", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "auto", width: "1100px" }}>
      <div>
        <select
          value={pagination.limit}
          onChange={(event) => handleLimitChange(event)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">handleAlert15</option>
        </select>
      </div>
      <BsFillPlusCircleFill
        onClick={() => handleOpen()}
        style={{
          marginLeft: "90%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          color: "#406957",
        }}
      />
      <Table striped bordered hover style={{ margin: 0, width: "100%" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Type </th>
            <th>Product Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product, idx: number) => {
            return (
              <tr key={idx}>
                <td>{idx + 1 + currentIndex}</td>
                <td>{product.product_name}</td>
                <td>{product.product_type_id}</td>
                <td>{product.product_price}</td>
                <td style={{ display: "flex" }}>
                  <BsFillTrashFill
                    onClick={() =>
                      product.product_id && handleAlert(product.product_id)
                    }
                    style={{
                      border: 0,
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#dc3545",
                    }}
                  />
                  <BsPencilFill
                    style={{
                      border: 0,
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#facc15",
                    }}
                    onClick={() => handleOpen(product)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {isModalOpen && (
        <Form
          productData={record}
          onClose={handleCloseModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};
