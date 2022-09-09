import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Card extends React.Component {
  state = {
    productName: '',
    productImage: '',
    productPrice: 0,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ productName: product.title,
      productImage: product.thumbnail,
      productPrice: product.price });
    console.log(product.title);
  }

  render() {
    const { productName, productImage, productPrice } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{productName}</p>
        <img
          data-testid="product-detail-image"
          src={ productImage }
          alt={ productName }
        />
        <p data-testid="product-detail-price">{`R$: ${productPrice}`}</p>
        <Link data-testid="shopping-cart-button" to="/carrinho">Ir ao carrinho</Link>
      </div>
    );
  }
}

Card.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;
