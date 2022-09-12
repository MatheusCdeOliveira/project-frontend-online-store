import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

import Header from './Header';
import ListProduct from './ListProduct';
import Radio from './Radio';

class Home extends React.Component {
  state = {
    categoriesList: [],
    inputSearch: '',
    productList: [],
    buttonSubmit: false,
    productId: '',
    carrinho: [],
  };

  async componentDidMount() {
    let carrinho = [];
    if (localStorage.getItem('carrinho')) {
      carrinho = JSON.parse(localStorage.getItem('carrinho'));
    }
    const listagem = await getCategories();
    this.setState({ categoriesList: listagem, carrinho });
  }

  handleClick = async () => {
    const { inputSearch } = this.state;
    const response = await getProductsFromCategoryAndQuery(inputSearch);
    this.setState({ productList: response.results });
  };

  inputHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputSearch: value });
  };

  radioHandleChange = async ({ target }) => {
    const { value } = target;
    const response = await getProductsFromCategoryAndQuery(value);
    this.setState({ productList: response.results });
  };

  HandleDetails = async ({ target }) => {
    this.setState({
      productId: target.id,
      buttonSubmit: true,
    });
  };

  criaNovoProdCarrinho = (item) => {
    const value = {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.thumbnail,
      quant: 1,
    };
    return value;
  };

  HandleLocalStorage = ({ target }) => {
    const { productList, carrinho } = this.state;
    const item = productList.find((elem) => elem.id === target.id);
    if (carrinho.length > 0) {
      if (carrinho.some((elem) => elem.id === item.id)) {
        carrinho.forEach((prod) => {
          if (prod.id === item.id) prod.quant += 1;
        });
      } else {
        const value = this.criaNovoProdCarrinho(item);
        carrinho.push(value);
      }
    } else {
      const value = this.criaNovoProdCarrinho(item);
      carrinho.push(value);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.setState({ carrinho });
  };

  render() {
    const { categoriesList,
      inputSearch, productList, buttonSubmit, productId } = this.state;
    return (
      <section>
        <Header
          inputSearch={ inputSearch }
          inputHandleChande={ this.inputHandleChange }
          handleClick={ this.handleClick }
        />
        <div className="container-Lists">
          <Radio
            categoriesList={ categoriesList }
            radioHandleChange={ this.radioHandleChange }
          />
          <ListProduct
            productList={ productList }
            HandleDetails={ this.HandleDetails }
            HandleLocalStorage={ this.HandleLocalStorage }
          />
          {buttonSubmit && <Redirect to={ `/card/${productId}` } />}
        </div>
      </section>
    );
  }
}
Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  productList: PropTypes.shape({
    find: PropTypes.func,
  }).isRequired,
};

export default Home;
