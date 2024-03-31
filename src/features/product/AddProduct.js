import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addProduct } from './productApi';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLabel = styled.label`
  margin: 10px 0;
`;

const FormInput = styled.input`
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const FormSubmit = styled.input`
  margin: 10px;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AlertMessage = styled.p`
  color: red;
  margin: 5px;
`;

const AddProduct = () => {
  const token = useSelector((state) => state.user.currentUser?.token);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const save = (data) => {
    addProduct(data, token)
      .then((res) => {
        alert('Product added');
        console.log(res);
        reset();
      })
      .catch((err) => {
        alert('Adding product failed' + err.response.data.message);
        console.log(err);
      });
  };

  return (
    <FormContainer onSubmit={handleSubmit(save)}>
      <FormLabel>Product name</FormLabel>
      <FormInput type="text" {...register('prodName')} />
      {errors.prodName && <AlertMessage>{errors.prodName.message}</AlertMessage>}
      
      <FormLabel>Price</FormLabel>
      <FormInput type="text" {...register('price')} />
      {errors.price && <AlertMessage>{errors.price.message}</AlertMessage>}
      
      <FormLabel>SRC</FormLabel>
      <FormInput type="text" {...register('imgUrl')} />
      {errors.imgUrl && <AlertMessage>{errors.imgUrl.message}</AlertMessage>}
      
      <FormLabel>Description</FormLabel>
      <FormInput type="text" {...register('description')} />
      {errors.description && <AlertMessage>{errors.description.message}</AlertMessage>}
      
      <FormLabel>Category</FormLabel>
      <FormInput type="text" {...register('category')} />
      {errors.category && <AlertMessage>{errors.category.message}</AlertMessage>}
      
      <FormSubmit type="submit" value="Submit" /> הוסף  מוצר
    </FormContainer>
  );
};

export default AddProduct;
