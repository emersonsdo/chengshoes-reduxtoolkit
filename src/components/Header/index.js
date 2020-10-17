import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { selectCart } from '../../store/reducers/cartSlice';


import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

function Header() {
  const cart = useSelector(selectCart);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Changeshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cart.length}</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default Header;
