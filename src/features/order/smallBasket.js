import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useEffect, useState } from "react";
import './smallBasket.css';
const SmallBasket = () => {
    const items = useSelector(state => state.order.basket);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    let sumPrice=useSelector(state=>state.order.sumPrice)
    let countProduct=useSelector(state=>state.order.countProduct)
    
  

    useEffect(() => {
        let itemCount = 0;
        let totalPrice = 0;

        items.forEach(item => {
            itemCount += item.countProduct;
            totalPrice += item.price * item.countProduct;
        });

        setTotalItems(itemCount);
        setTotalPrice(totalPrice);
    }, [items]);

    return (
        <div className='SmallBasket' style={{position: "fixed", top: 0, width: "22%",marginTop: "15%", 
        height: "60vh", overflowY: "auto", marginLeft: "3%"}}>
            <h2>פריטים בסל</h2>
            <div className="SmallBasket-container">
                {items && items.map(item => (
                    <Card key={item._id} className="basket-card" style={{ marginBottom: "10px", width: "100%", maxWidth: "90%", maxHeight: "150px" }}>
                        <CardContent className="basket-card-content" style={{ whiteSpace: "nowrap" }}>
                            <Typography variant="h6" component="h2" style={{ fontSize: "1rem" }}>
                                {item.prodName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom style={{ fontSize: "0.8rem" }}>
                                כמות: {item.countProduct}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            style={{ width: "100%", height: "100px", objectFit: "contain" }}
                            component="img"
                            image={item.imgUrl[0]}
                            alt={item.prodName}
                            className="basket-card-image"
                        />
                    </Card>
                ))} 
            </div>
            <div>
                <div>
                    <p style={{ fontSize: "0.9rem" }}>מספר המוצרים בסל: {countProduct}</p>
                    <p style={{ fontSize: "0.9rem" }}>המחיר הכולל של הסל: {sumPrice} ₪</p>
                </div>
            </div>
        </div>
    );
}

export default SmallBasket;