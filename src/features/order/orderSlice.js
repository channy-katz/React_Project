import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket:  [],
  countProduct: 0,
  sumPrice: 0,
  details: {
    address: "",
    date: ""
  }
};

const orderSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let prod = state.basket.find(item => item._id === action.payload._id);
      if (prod) {
        prod.qty++;
      } else {
        state.basket.push({ ...action.payload, qty: 1 });
      }
      state.countProduct += 1;
      state.sumPrice += parseInt(action.payload.price);
    },
    removeFromBasket: (state, action) => {
      let index = state.basket.findIndex(item => item._id === action.payload);
      if (index === -1) {
        return;
      }
      state.sumPrice -= parseInt(state.basket[index].price);
      if (state.basket[index].qty === 1) {
        state.basket = state.basket.filter(item => item._id !== action.payload);
      } else {
        state.basket[index].qty -= 1;
      }
      state.countProduct -= 1;
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    saveBasket: (state, action) => {
      state.basket = action.payload;
      localStorage.setItem("basket", JSON.stringify(action.payload));
    },
    removeBasket:(state,action)=>{
      state.basket=[]
      state.countProduct=0
      state.price=0

    }
  }
});

export const { addToBasket, removeFromBasket, saveBasket,removeBasket } = orderSlice.actions;
export default orderSlice.reducer;
