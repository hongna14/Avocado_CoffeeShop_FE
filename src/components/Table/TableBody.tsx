import axios from "axios";
// import { Children, useMemo } from "react"
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import _ from "lodash";
// import { EmployeeForm } from "../Employee/EmployeeForm"

export interface Props {
  items: any[];
  keys: string[];
  offset: number;
  id: string;
  itemLink: string;
  //    headers: Record<string, string>
}

export const TableBody: React.FC<Props> = (props) => {
  const { keys, items, offset, id, itemLink } = props;

  // const rows = useMemo(() => {
  //     const keys = Object.keys(headers)
  //     const news = items.map(item => _.pick(item, keys))
  //     return news
  // }, [items, headers])

  const handleAlert = (id: any) => {
    if (window.confirm(`Do you wanna delete this product ? ${id}`) == true) {
      deleteItem(id);
    }
  };
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/${itemLink}/${id}`);
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  return (
    <>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1 + offset}</td>
              {keys.map((child, inx) => (
                <td>{item[child]}</td>
              ))}
              <td>
                <BsFillTrashFill
                  onClick={() => item[id] && handleAlert(item[id])}
                  style={{
                    border: 0,
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    color: "#dc3545",
                  }}
                />
                <Link to={`/${itemLink}/edit/${item[id]}`}>
                  <BsPencilFill
                    style={{
                      border: 0,
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#facc15",
                    }}
                  />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
