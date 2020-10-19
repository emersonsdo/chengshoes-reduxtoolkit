import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },

  reducers: {
    addProductToCartSuccess: (state, action) => {
      const product = action.payload;

      // verifica se produto já está no carrinho (e caso existe, já pega seu índice)
      const productIndex = state.products.findIndex((p) => p.id === product.id);

      if (productIndex >= 0) {
        state.products[productIndex].amount += 1;
        state.products[productIndex].subtotal =
          state.products[productIndex].price *
          state.products[productIndex].amount;
      } else {
        const data = {
          ...product,
          amount: 1,
          subtotal: product.price * 1,
        };
        state.products.push(data);
      }
    },

    decreaseAmount: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex >= 0 && state.products[productIndex].amount > 0) {
        state.products[productIndex].amount -= 1;
        state.products[productIndex].subtotal =
          state.products[productIndex].price *
          state.products[productIndex].amount;
      }
    },

    updateAmountSuccess: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex >= 0) {
        state.products[productIndex].amount += 1;
        state.products[productIndex].subtotal =
          state.products[productIndex].price *
          state.products[productIndex].amount;
      }
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex >= 0) {
        state.products.splice(productIndex, 1);
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
      const productIndex = state.products.findIndex((p) => p.id === product.id);

      const stock = await api.get(`stock/${product.id}`);
      const stockAmount = stock.data.amount;

      const amount =
        productIndex >= 0 ? state.products[productIndex].amount + 1 : 1;

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
      const productIndex = state.products.findIndex((p) => p.id === id);

      if (productIndex < 0) {
        toast.error('Produto não encontrado');
        return;
      }

      const stock = await api.get(`stock/${id}`);
      const stockAmount = stock.data.amount;

      const amount = state.products[productIndex].amount + 1;

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
  state.cart.products.forEach((cart) => {
    amountResult[cart.id] = cart.amount;
  });

  return amountResult;
};

export const selectCart = (state) => {
  return state.cart.products;
};

export const selectTotalBill = (state) => {
  return state.cart.products.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0);
};

export default cartSlice.reducer;
