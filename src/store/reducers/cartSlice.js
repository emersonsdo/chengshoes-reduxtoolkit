import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: '@cart',
  initialState: {
    cart: [],
  },

  reducers: {
    addProduct: (state, action) => {
      console.log("ON REMOVE REDUCER FROM CART SLICE");
      console.log(`Action: ${action}`);
      // verifica se produto já está no carrinho (e caso existe, já pega seu índice)
      const productIndex = state.cart.findIndex(
        (p) => p.id === action.product.id
      );

      if (productIndex >= 0) {
        state.cart[productIndex].amount += 1;
      } else {
        state.cart.push(action.product);
      }
    },

    removeProduct: (state, action) => {
      console.log("ON REMOVE REDUCER FROM CART SLICE");
      console.log(`Action: ${action}`);
    },

    updateAmount: (state, action) => {
      console.log("ON REMOVE REDUCER FROM CART SLICE");
      console.log(`Action: ${action}`);
    },
  },
});

export const { addProduct, removeProduct, updateAmount } = cartSlice.actions;

export default cartSlice.reducer;
