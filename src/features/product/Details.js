import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { getproducteById } from "./productApi";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { addToBasket } from '../order/orderSlice';
import "./details.css";
import SmallBasket from '../order/smallBasket';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Details = () => {
  let params = useParams();
  const navigate = useNavigate();
  let [product, setProduct] = useState(null);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    getproducteById(params.id).then(res => {
      setProduct(res.data);
    }).catch(err => {
      alert("לא ניתן לטעון את המוצרים");
      console.log("error");
    });
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % product.imgUrl.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + product.imgUrl.length) % product.imgUrl.length);
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  return (<>
    <div style={{ position: "fixed", top: 0, width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <div className='img-but' style={{ display: "grid", gridAutoColumns: "auto auto auto" }}>
        <button className="arrow-btn-left" onClick={handlePrevImage}><FaArrowLeft /></button>
        <img width="500px" height="500px" src={product.imgUrl[currentImageIndex]} alt={`Product Image ${currentImageIndex}`} className='img' />
        <button className="arrow-btn-right" onClick={handleNextImage}><FaArrowRight /></button>
      </div>
      {/* <div style={{ marginTop: "20%", textAlign: "right", marginLeft: "auto", width: "35%" }}> */}
      <p className='price1' >₪{product.price}</p>
      <p className='name'>{product.prodName}</p>
     <div className='des'><p >{product.description}</p></div>
      <button onClick={() => {
        console.log(product); dispatch(addToBasket(product));
        setShowBasket(true);
        setTimeout(() => setShowBasket(false), 3000);
      }} className='bag-button'>Add to Bag</button>
      <Button ><img src='https://www.prettyballerinas.co.il/wp-content/themes/claue/assets/images/back_to_category.png' width="100px" onClick={() => {
        navigate(-1)
      }} className='back' /></Button>
    </div>
    {showBasket && <SmallBasket />}
    <Outlet />
  </>);
};

export default Details;