import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { getProducts } from "./productApi";
import { getProductsByCategory } from "./productApi.js";
import { Outlet, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import './list.css';

const List = () => {
  let { category } = useParams();
  let [arr, setArr] = useState([]);
  let [page, setPage] = useState(1);
  let [perPage, setPerPage] = useState(10);
  useEffect(() => {

    getProductsByCategory(category, page, perPage, "")
      .then((res) => {
        setArr(res.data);
      })
      .catch((err) => {
        alert("לא ניתן לטעון את המוצרים");
        console.log("error");
      });
  }, [page, perPage, category]);

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);


  }
  return (

    <>
      <h1>{category}</h1>
      <div className="allProduct">
        {arr.map((item) => (
          <div key={item._id}>
              {/* {" "} */}
              <ListItem one={item} />
            
          </div>
        ))}
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>הקודם</button>
          <button onClick={() => setPage(page + 1)}>הבא</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default List;

