import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductInBasket } from './productInBasket';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./basket.css"

 const Basket = () => {

    let basket = useSelector(state => state.order.basket)
    let sumPrice=useSelector(state=>state.order.sumPrice)
    let countProduct=useSelector(state=>state.order.countProduct)
  
    let navigate = useNavigate();

    const goToPayment = () => {
        if (basket.length==0)
        alert("אין מוצרים בסל")
    navigate('/list/catrgory')
        navigate('/payment'); // שינוי הנתיב לרכיב ה-`Payment`
        if (currentUser == null) navigate("/login");
        else navigate("/payment");
    }; 
    const currentUser = useSelector((state) => state.user.currentUser);

    
    return (<>
        <ul>
            {basket.map(item => (
                <div key={item._id}>
                    <ProductInBasket one={item} />
                </div>

            ))}
        </ul>
        <div>
            <p>כמות מוצרים שהוזמנה{countProduct}</p>
            <p>סכום לתשלום{sumPrice}</p>

        </div>
        <Link to="/" style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', textDecoration: 'none' }}>חזור לקנות</Link>   
             <button  onClick={()=> goToPayment()}style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', textDecoration: 'none' }}>לתשלום  </button>
        
    </>
    );
}
export default Basket;