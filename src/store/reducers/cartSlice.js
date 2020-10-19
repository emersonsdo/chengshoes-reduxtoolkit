import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
  },

  reducers: {
    addProductToCartSuccess: (state, action) => {
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

    updateAmountSuccess: (state, action) => {
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

export const {
  addProductToCartSuccess,
  updateAmountSuccess,
  removeProduct,
  decreaseAmount,
} = cartSlice.actions;

export const addProductToCart = (product) => {
  return async (dispatch, getState) => {
    try {
      const state = getState().cart;
      const productIndex = state.carts.findIndex((p) => p.id === product.id);

      const stock = await api.get(`stock/${product.id}`);
      const stockAmount = stock.data.amount;

      const amount =
        productIndex >= 0 ? state.carts[productIndex].amount + 1 : 1;

      if (amount > stockAmount) {
        toast.error('Estoque insuficiente');
        return;
      }

      dispatch(addProductToCartSuccess(product));
    } catch (err) {
      toast.error(err);
    }
  };
};

export const updateAmount = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState().cart;
      const productIndex = state.carts.findIndex((p) => p.id === id);

      if (productIndex < 0) {
        toast.error('Produto não encontrado');
        return;
      }

      const stock = await api.get(`stock/${id}`);
      const stockAmount = stock.data.amount;

      const amount = state.carts[productIndex].amount + 1;

      if (amount > stockAmount) {
        toast.error('Estoque insuficiente');
        return;
      }

      dispatch(updateAmountSuccess(id));
    } catch (err) {
      toast.error(err);
    }
  };
};

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

export default cartSlice.reducer;
