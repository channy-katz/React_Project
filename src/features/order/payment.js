import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from './orderApi';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { removeBasket } from './orderSlice';
import { dialogClasses } from '@mui/material';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const FormButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const Payment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const basket = useSelector((state) => state.order.basket);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (user) {
        data.products = basket;
        console.log(data);
        let res = await addOrder(data, user.token);
        Navigate("/")
        alert(" ההזמנה אושרה")
        dispatch(removeBasket())
        // dispatch(saveArr([]));


      } else {
        Navigate("/logIn")
      }
    }
    catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              type="text"
              {...register('firstName')}
              placeholder="שם פרטי"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && errors.firstName.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {errors.firstName && errors.firstName.type === 'pattern' && <ErrorMessage>שם לא תקין</ErrorMessage>}
          </div>
          <div>
            <FormInput
              type="text"
              {...register('lastName',)}
              placeholder="שם משפחה"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && errors.lastName.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {errors.lastName && errors.lastName.type === 'pattern' && <ErrorMessage>שם לא תקין</ErrorMessage>}
          </div>
          <div>
            <FormInput
              type="text"
              {...register('destinationAddress', { required: true })}
              placeholder="רחוב"
              value={formData.destinationAddress}
              onChange={handleChange}
            />
            {errors.destinationAddress && errors.destinationAddress.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {/* {errors.destinationAddress && errors.destinationAddress.type === 'pattern' && <ErrorMessage>מספר לא תקין</ErrorMessage>} */}
          </div>
          <div>
            <FormInput
              type="text"
              {...register('creditCardNumber', { required: true, pattern: /^[0-9]+$/ })}
              placeholder="מספר כרטיס אשראי"
              value={formData.creditCardNumber}
              onChange={handleChange}
            />
            {errors.creditCardNumber && errors.creditCardNumber.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {errors.creditCardNumber && errors.creditCardNumber.type === 'pattern' && <ErrorMessage>מספר לא תקין</ErrorMessage>}
          </div>
          <div>
            <FormInput
              type="text"
              {...register('expirationDate', { required: true, pattern: /^[0-9]+$/ })}
              placeholder="תוקף"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            {errors.expirationDate && errors.expirationDate.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {errors.expirationDate && errors.expirationDate.type === 'pattern' && <ErrorMessage>מספר לא תקין</ErrorMessage>}
          </div>
          <div>
            <FormInput
              type="text"
              {...register('cvv', { required: true, pattern: /^[0-9]+$/ })}
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
            />
            {errors.cvv && errors.cvv.type === 'required' && <ErrorMessage>שדה חובה</ErrorMessage>}
            {errors.cvv && errors.cvv.type === 'pattern' && <ErrorMessage>מספר לא תקין</ErrorMessage>}
          </div>
          <FormButton type="submit" >אישור </FormButton>
        </form>
        <Link to="/Basket">
          <FormButton>חזור לסל קניות</FormButton>
        </Link>
      </FormContainer>
    </>
  );
};

export default Payment;
