import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
  },

  reducers: {
    addProductToCart: (state, action) => {
      const product = action.payload;

      // verifica se produto já está no carrinho (e caso existe, já pega seu índice)
      const productIndex = state.carts.findIndex((p) => p.id === product.id);

      if (productIndex >= 0) {
        state.carts[productIndex].amount += 1;
        state.carts[productIndex].subtotal =
          state.carts[productIndex].price * state.carts[productIndex].amount;
      } else {
        const data = {
          ...product,
          amount: 1,
          subtotal: product.price * 1,
        };
        state.carts.push(data);
      }
    },

    decreaseAmount: (state, action) => {
      const productId = action.payload;
      const productIndex = state.carts.findIndex((p) => p.id === productId);

      if (productIndex >= 0 && state.carts[productIndex].amount > 0) {
        state.carts[productIndex].amount -= 1;
        state.carts[productIndex].subtotal =
          state.carts[productIndex].price * state.carts[productIndex].amount;
      }
    },

    updateAmount: (state, action) => {
      const productId = action.payload;
      const productIndex = state.carts.findIndex((p) => p.id === productId);

      if (productIndex >= 0) {
        state.carts[productIndex].amount += 1;
        state.carts[productIndex].subtotal =
          state.carts[productIndex].price * state.carts[productIndex].amount;
      }
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.carts.findIndex((p) => p.id === productId);

      if (productIndex >= 0) {
        state.carts.splice(productIndex, 1);
      }
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

export const selectCart = (state) => {
  return state.cart.carts;
};

export const selectTotalBill = (state) => {
  return state.cart.carts.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0);
};

export const {
  addProductToCart,
  removeProduct,
  updateAmount,
  decreaseAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
