import React, { useState } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../utils/format';

function Cart() {
  const [cart, setCart] = useState([]);
  // const dispatch = useDispatch();
  function incrementAmount(product) {
    // updateAmountRequest(product.id, product.amount + 1);
  }

  function decrementAmount(product) {
    // updateAmountRequest(product.id, product.amount - 1);
  }

  function removeFromCart(id) {
    // updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
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
                    onClick={() => decrementAmount(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#00468c" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => incrementAmount(product)}
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
                  onClick={
                    () => removeFromCart(product.id)
                    // dispatch(CartActions.removeFromCart(product.id))
                  }
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
          <strong>8</strong>
        </Total>
      </footer>
    </Container>
  );
}

// const mapStateToProps = (state) => ({
//   cart: state.cart.map((product) => ({
//     ...product,
//     subtotal: formatPrice(product.price * product.amount),
//   })),
//   total: formatPrice(
//     state.cart.reduce((total, product) => {
//       return total + product.price * product.amount;
//     }, 0)
//   ), // para o total começar com 0
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(CartActions, dispatch);

export default Cart; // connect(mapStateToProps, mapDispatchToProps)(Cart);
