import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    categoriesList: [],
    inputSearch: '',
    productList: [],
  };

  async componentDidMount() {
    const listagem = await getCategories();
    this.setState({ categoriesList: listagem });
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

  render() {
    const { categoriesList, inputSearch, productList } = this.state;
    return (
      <section>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
        <div>
          <input
            type="text"
            name=""
            data-testid="query-input"
            id=""
            value={ inputSearch }
            onChange={ this.inputHandleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Search

          </button>
        </div>
        <nav>
          <ul>
            {categoriesList.map((element) => (
              <li key={ element.id }>
                <label htmlFor={ element.id } data-testid="category">
                  <input
                    type="radio"
                    name="category"
                    id={ element.id }
                    onChange={ this.radioHandleChange }
                    value={ element.name }
                  />
                  {element.name}
                </label>
              </li>))}
          </ul>
        </nav>
        <ul>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </ul>
        <div>
          {productList.length > 0 ? (
            <ul>
              {productList.map((item) => (
                <li key={ item.id }>
                  <div data-testid="product">
                    <p>{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : <p>Nenhum produto foi encontrado</p>}
        </div>
      </section>
    );
  }
}

export default Home;
