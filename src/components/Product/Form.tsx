import { FormEventHandler, useEffect, useState } from "react";
import "../../styles/form.css";
import "../../styles/modal.css";
import { ChangeEvent } from "react";
import { Product } from "../../Interfaces/Product";
import axios, { isCancel, AxiosError } from "axios";
import { ProductType } from "../../Interfaces/ProductType";

export enum ACTION_TYPE {
  CREATE = "create",
  UPDATE = "update",
}
export interface Props {
  onClose: () => void;
  productData: Product;
  onSubmit?: () => void;
  refresh: boolean;
  setRefresh: (flag: boolean) => void;
  // createProduct: any;
}

export const Form: React.FC<Props> = (props) => {
  const getInitialState = () => {
    const value = 1;
    return value;
  };

  const { onClose, productData, refresh, setRefresh } = props;
  const [record, setRecord] = useState(productData);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeId, setProductTypeId] = useState(getInitialState());

  const createProduct = async (product: Omit<Product, "product_id">) => {
    console.log("product in parent:", product);
    try {
      await axios.post(`http://localhost:3001/products`, {
        product_name: product.product_name,
        product_type_id: product.product_type_id,
        product_price: product.product_price,
      });
    } catch (e) {
      console.log("error ===>", e);
    }
  };
  const editProduct = async (product: Partial<Product>) => {
    console.log("New updated product data", product);
    try {
      await axios.put(`http://localhost:3001/products/${product.product_id}`, {
        product_name: product.product_name,
        product_type_id: product.product_type_id,
        product_price: product.product_price,
      });
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    console.log("handleSubmit");
    event.preventDefault(); // 👈️ prevent page refresh
    record.product_price = Number(record.product_price);
    record.product_type_id = Number(record.product_type_id);

    if (!record.product_id) {
      console.log("ACTION_TYPE.CREATE");
      createProduct(record);
      setRefresh(!refresh);
      onClose();
    } else {
      console.log("ACTION_TYPE.UPDATE");
      editProduct(record);
      setRefresh(!refresh);
      onClose();
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("event.target", event.target.value);

    record.product_type_id = productTypeId;
    console.log("type id:", record.product_type_id);
    const { name, value } = event.target;
    console.log("new", record);
    setRecord({ ...record, [name]: value });
  };

  const handleChangeOption = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setProductTypeId(Number(event.target.value));
  };

  const getProductTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productType");
      if (response && response.data) {
        console.log("call ");
        const productTypes = response.data;
        setProductTypes(productTypes);
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };
  useEffect(() => {
    getProductTypes();
  }, []);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="product_form modal-content">
          <h2>🍹</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb">
              <label> Product Name: </label>
              <input
                type="text"
                name="product_name"
                value={record.product_name}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="mb">
              <label> Product Type: </label>
              <select
                value={productTypeId}
                onChange={(event) => handleChangeOption(event)}
              >
                {productTypes.map((productType: ProductType) => {
                  return (
                    <option value={productType.product_type_id}>
                      {productType.product_type_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb">
              <label> Product price: </label>
              <input
                type="text"
                name="product_price"
                value={record.product_price}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="submit">
              <input type="submit" value="Submit" />
              <button onClick={onClose}>Close</button>
            </div>
          </form>
          <div className="d-flex"></div>
        </div>
      </div>
    </>
  );
};
