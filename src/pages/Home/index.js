import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart, selectAmount } from '../../store/reducers/cartSlice';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';
import api from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const amounts = useSelector(selectAmount);

  useEffect(() => {
    async function loadProducts() {
      const res = await api.get('products');
      const data = res.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleCartChange(product) {
    dispatch(addProductToCart(product));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button type="button" onClick={() => handleCartChange(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> {''}
              {amounts[product.id]}
              {/* {amount[product.id] || 0} */}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

// const mapStateToProps = (state) => ({
//   amount: state.cart.reduce((amount, product) => {
//     amount[product.id] = product.amount;
//     return amount;
//   }, {}), // {} para iniciar o amount como objeto vazio
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(CartActions, dispatch);

// Primeiro parâmetro seria o mapStateToProps
export default Home; // connect(mapStateToProps, mapDispatchToProps)(Home);
