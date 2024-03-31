import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "./orderSlice";
import styled from "styled-components";

const ProductContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const ProductDetails = styled.div`
    display: flex;
    align-items: center;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
`;

const ProductPrice = styled.div`
    font-size: 16px;
`;

const QuantityInput = styled.div`
    flex-shrink: 0;
`;

const Button = styled.button`
    background-color: black;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const ButtonLabel = styled.span`
    margin: 0;
`;

export const ProductInBasket = ({ one }) => {
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();

    const handleValueChange = (e) => {
        setValue(e.value)
        dispatch(addToBasket(one));
    }
    

    return (
        <ProductContainer>
            <ProductDetails>
                <ProductName>{one.prodName}</ProductName>
                <ProductPrice>{one.price}</ProductPrice>
            </ProductDetails>
           
            <div>{one.qty}</div>
            <Button onClick={()=>{dispatch(addToBasket(one))}} style={{marginRight:10}}><ButtonLabel>+</ButtonLabel></Button>
            <Button onClick={()=>{dispatch(removeFromBasket(one._id))}}style={{marginRight:10}}><ButtonLabel>-</ButtonLabel></Button>

            <ProductImage src={one.imgUrl[0]} alt={one.productName} />
        </ProductContainer>
    );
}
