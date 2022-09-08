import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const listagem = await getCategories();
    this.setState({ categoriesList: listagem });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <section>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
        <nav>
          <ul>
            {categoriesList.map((element) => (
              <li key={ element.id }>
                <label htmlFor={ element.id } data-testid="category">
                  <input type="radio" name={ element.name } id={ element.id } />
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
      </section>
    );
  }
}

export default Home;
