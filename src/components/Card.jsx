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
    rating: 0,
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
    // console.log(recoverInfo);
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

  handleCheck = (event) => {
    this.setState({ rating: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputEmail,
      textarea, productId, avaliationInfo, rating } = this.state;
    if (rating !== 0) {
      this.setState({ inputValidation: false }, () => {
        const products = [...avaliationInfo];
        const product = {
          email: inputEmail,
          text: textarea,
          rate: rating,
        };
        products.push(product);
        localStorage.setItem(productId, JSON.stringify(products));
        this.setState({ avaliationInfo: [...products], inputEmail: '', textarea: '' });
      });
    } else if (!(inputEmail.length > 0
       && inputEmail.includes('@') && textarea.length > 0)) {
      this.setState({ inputValidation: true });
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
            <label htmlFor="one">
              1
              <input
                data-testid="1-rating"
                type="checkbox"
                onChange={ this.handleCheck }
                name="one"
                value="1"
                id="one"
              />
            </label>
            <label htmlFor="two">
              2
              <input
                data-testid="2-rating"
                type="checkbox"
                onChange={ this.handleCheck }
                name="two"
                value="2"
                id="two"
              />
            </label>
            <label htmlFor="three">
              3
              <input
                data-testid="3-rating"
                type="checkbox"
                onChange={ this.handleCheck }
                name="three"
                value="3"
                id="three"
              />
            </label>
            <label htmlFor="four">
              4
              <input
                data-testid="4-rating"
                type="checkbox"
                onChange={ this.handleCheck }
                name="four"
                value="4"
                id="four"
              />
            </label>
            <label htmlFor="five">
              5
              <input
                data-testid="5-rating"
                type="checkbox"
                onChange={ this.handleCheck }
                name="five"
                value="5"
                id="five"
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
                  <p data-testid="review-card-rating">{item.rate}</p>
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
