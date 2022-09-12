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
                        <p data-testid="shopping-cart-product-name">{prod.name}</p>
                        <img src={ prod.image } alt={ prod.name } />
                        <p>{`R$:${prod.price}`}</p>
                        <p data-testid="shopping-cart-product-quantity">{prod.quant}</p>
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
