import React from 'react';

class Carrinho extends React.Component {
  render() {
    return (
      <section>
        <ul>
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </ul>
      </section>
    );
  }
}

export default Carrinho;
