import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Evaluation from './Evaluation';
import Header from './Header';
import addItemAoCarrinho from '../utils';

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
    carrinho: [],
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
    this.setState({ avaliationInfo: recoverInfo });
    if (!localStorage.getItem(product.id)) {
      this.setState({ avaliationInfo: [] });
    }
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
            <button
              className="buttonCarrinho"
              type="button"
              onClick={ this.ClickLocalStorage }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              to="/carrinho"
              className="carrinho"
            >
              Ir ao carrinho
            </Link>
          </article>
        </section>
        <Evaluation
          handleEmail={ this.handleEmail }
          handleText={ this.handleText }
          handleCheck={ this.handleCheck }
          handleSubmit={ this.handleSubmit }
          inputEmail={ inputEmail }
          textarea={ textarea }
          avaliationInfo={ avaliationInfo }
          inputValidation={ inputValidation }
        />
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
