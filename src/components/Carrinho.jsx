import React from 'react';
import Header from './Header';

class Carrinho extends React.Component {
  state = {
    produtos: [],
  };

  componentDidMount() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    this.setState({
      produtos: carrinho,
    });
  }

  dimQuantNoCarrinho = ({ target }) => {
    const { produtos } = this.state;
    produtos.forEach((prod) => {
      if ((prod.id === target.id) && (prod.quant - 1 > 0)) prod.quant -= 1;
    });
    this.setState({ produtos });
    localStorage.setItem('carrinho', JSON.stringify(produtos));
  };

  aumQuantNoCarrinho = ({ target }) => {
    const { produtos } = this.state;
    produtos.forEach((prod) => {
      if (prod.id === target.id) prod.quant += 1;
    });
    this.setState({ produtos });
    localStorage.setItem('carrinho', JSON.stringify(produtos));
  };

  remProdCarrinho = ({ target }) => {
    const { produtos } = this.state;
    produtos.forEach((prod, index) => {
      if (prod.id === target.id) produtos.splice(index, 1);
    });
    this.setState({ produtos });
    localStorage.setItem('carrinho', JSON.stringify(produtos));
  };

  render() {
    const { produtos } = this.state;
    return (
      <div>
        <Header />
        {
          produtos
            ? (
              <div>
                <ul className="container-carrinho">
                  {
                    produtos.map((prod, index) => (
                      <li key={ index }>
                        <img src={ prod.image } alt={ prod.name } />
                        <span data-testid="shopping-cart-product-name">{prod.name}</span>
                        <button
                          id={ prod.id }
                          type="button"
                          data-testid="product-decrease-quantity"
                          onClick={ this.dimQuantNoCarrinho }
                        >
                          -
                        </button>
                        <span
                          data-testid="shopping-cart-product-quantity"
                        >
                          {prod.quant}
                        </span>
                        <button
                          id={ prod.id }
                          type="button"
                          data-testid="product-increase-quantity"
                          onClick={ this.aumQuantNoCarrinho }
                        >
                          +
                        </button>
                        <span>{`R$:${prod.price}`}</span>
                        <button
                          id={ prod.id }
                          type="button"
                          data-testid="remove-product"
                          onClick={ this.remProdCarrinho }
                        >
                          x
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>)
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

export default Carrinho;
