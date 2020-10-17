import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  selectTotalBill,
  updateAmount,
  decreaseAmount,
  removeProduct,
} from '../../store/reducers/cartSlice';

import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../utils/format';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalBill = useSelector(selectTotalBill);

  // Manter funções?
  function incrementAmount(id) {
    dispatch(updateAmount(id));
  }

  function decrementAmount(id) {
    dispatch(decreaseAmount(id));
  }

  function removeFromCart(id) {
    dispatch(removeProduct(id));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => decrementAmount(product.id)}
                  >
                    <MdRemoveCircleOutline size={20} color="#00468c" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => incrementAmount(product.id)}
                  >
                    <MdAddCircleOutline size={20} color="#00468c" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#00468c" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(totalBill)}</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart;
