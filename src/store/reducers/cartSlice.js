import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
  },

  reducers: {
    addProductToCart: (state, action) => {
      console.log("ON ADDTOCART REDUCER FROM CART SLICE");
      console.log('Action');
      console.log(action);

      const product = action.payload;

      // verifica se produto já está no carrinho (e caso existe, já pega seu índice)
      const productIndex = state.carts.findIndex((p) => p.id === product.id);

      if (productIndex >= 0) {
        state.carts[productIndex].amount += 1;
      } else {
        const data = {
          ...product,
          amount: 1,
        };
        state.carts.push(data);
      }
    },

    removeProduct: (state, action) => {
      console.log("ON REMOVE REDUCER FROM CART SLICE");
      console.log(`Action: ${action}`);
    },

    updateAmount: (state, action) => {
      console.log("ON UPDATE REDUCER FROM CART SLICE");
      console.log(`Action: ${action}`);
    },
  },
});

export const selectAmount = (state) => {
  const amountResult = [];
  state.cart.carts.forEach((cart) => {
    amountResult[cart.id] = cart.amount;
  });

  return amountResult;
};

export const {
  addProductToCart,
  removeProduct,
  updateAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
