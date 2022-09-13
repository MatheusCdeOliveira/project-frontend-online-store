import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { addItemAoCarrinho } from '../utils';

import Header from './Header';

class Card extends React.Component {
  state = {
    productId: '',
    productName: '',
    productImage: '',
    productPrice: 0,
    fichaTecnica: [],
    carrinho: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    console.log(product);
    this.setState({
      productId: product.id,
      productName: product.title,
      productImage: product.thumbnail,
      productPrice: product.price,
      fichaTecnica: product.attributes,
    });
    let carrinho = [];
    if (localStorage.getItem('carrinho')) {
      carrinho = JSON.parse(localStorage.getItem('carrinho'));
    }
    this.setState({ carrinho });
  }

  createItem = (id, title, price, thumbnail) => {
    const item = {
      id,
      title,
      price,
      thumbnail,
    };
    return item;
  };

  ClickLocalStorage = () => {
    const { productId, productName, productPrice, productImage, carrinho } = this.state;
    const item = this.createItem(productId, productName, productPrice, productImage);
    const newCarrinho = addItemAoCarrinho(item, carrinho);
    localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
    this.setState({ carrinho: newCarrinho });
  };

  render() {
    const {
      productName, productImage, productPrice, fichaTecnica } = this.state;
    return (
      <section>
        <Header />
        <section className="container-details">
          <article className="container-nomeImage">
            <h1 data-testid="product-detail-name" className="nome">
              {productName}
            </h1>
            <img
              className="image"
              data-testid="product-detail-image"
              src={ productImage }
              alt={ productName }
            />
          </article>
          <article className="container-price">
            <ul>
              <h1>Especificações técnicas</h1>
              {fichaTecnica.map((attributes) => (
                <li key={ attributes.name }>
                  {`${attributes.name}: ${attributes.value_name}`}
                </li>
              ))}
            </ul>
            <p
              data-testid="product-detail-price"
              className="price"
            >
              <strong>{`R$: ${productPrice}`}</strong>
            </p>
            <button
              className="buttonCarrinho"
              type="button"
              onClick={ this.ClickLocalStorage }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              // data-testid="shopping-cart-button"
              to="/carrinho"
              className="carrinho"
            >
              Ir ao carrinho
            </Link>
          </article>
        </section>
      </section>
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
