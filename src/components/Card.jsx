import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

import Header from './Header';

class Card extends React.Component {
  state = {
    productName: '',
    productImage: '',
    productPrice: 0,
    productId: '',
    fichaTecnica: [],
    inputEmail: '',
    textarea: '',
    avaliationInfo: [],
    inputValidation: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      productName: product.title,
      productImage: product.thumbnail,
      productPrice: product.price,
      fichaTecnica: product.attributes,
      productId: product.id,
    });
    const recoverInfo = await JSON.parse(localStorage.getItem(product.id));
    console.log(recoverInfo);
    this.setState({ avaliationInfo: recoverInfo });
    if (!localStorage.getItem(product.id)) {
      this.setState({ avaliationInfo: [] });
    }
  }

  handleEmail = ({ target }) => {
    const { value } = target;
    this.setState({ inputEmail: value });
  };

  handleText = ({ target }) => {
    const { value } = target;
    this.setState({ textarea: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputEmail,
      textarea, productId, avaliationInfo } = this.state;
    if (inputEmail.length < 1 && textarea.length < 1) {
      this.setState({ inputValidation: true });
    } else {
      this.setState({ inputValidation: false });

      const products = [...avaliationInfo];
      const product = {
        email: inputEmail,
        text: textarea,
      };
      products.push(product);
      localStorage.setItem(productId, JSON.stringify(products));
      this.setState({ avaliationInfo: [...products], inputEmail: '', textarea: '' });
    }
  };

  render() {
    const { productName,
      productImage,
      productPrice,
      fichaTecnica, inputEmail, textarea, avaliationInfo, inputValidation } = this.state;
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
            <Link
              // data-testid="shopping-cart-button"
              to="/carrinho"
              className="carrinho"
            >
              Ir ao carrinho
            </Link>
          </article>
        </section>
        <section className="evaluation-form">
          <form>
            <label htmlFor="input-email">
              <input
                type="email"
                value={ inputEmail }
                data-testid="product-detail-email"
                name="input-email"
                id="input-email"
                placeholder="Email"
                onChange={ this.handleEmail }
              />
            </label>
            <textarea
              name=""
              value={ textarea }
              placeholder="Mensagem (opcional)"
              id=""
              data-testid="product-detail-evaluation"
              cols="30"
              rows="10"
              onChange={ this.handleText }
            />
            <button
              data-testid="submit-review-btn"
              type="submit"
              onClick={ this.handleSubmit }
            >
              Avaliar

            </button>
          </form>
        </section>
        {inputValidation && <p data-testid="error-msg">Campos inválidos</p>}
        <section className="review">
          <ul>
            {avaliationInfo.map((item, index) => (
              <li key={ index }>
                <div>
                  <p data-testid="review-card-email">{item.email}</p>
                  <p data-testid="review-card-evaluation">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
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
