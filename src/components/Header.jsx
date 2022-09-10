import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { inputSearch, inputHandleChange, handleClick } = this.props;
    return (
      <header>
        <div>
          <input
            type="text"
            name=""
            data-testid="query-input"
            id=""
            value={ inputSearch }
            onChange={ inputHandleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ handleClick }
          >
            Search
          </button>
        </div>
        <h1>FrontEnd Online Store</h1>
        <Link data-testid="shopping-cart-button" to="/carrinho" className="carrinhoLink">
          Carrinho de Compras
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  inputHandleChange: PropTypes.func.isRequired,
  inputSearch: PropTypes.string.isRequired,
};

export default Header;
