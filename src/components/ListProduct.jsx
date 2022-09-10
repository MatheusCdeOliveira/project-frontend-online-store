import PropTypes from 'prop-types';
import React from 'react';

class ListProduct extends React.Component {
  render() {
    const { productList, HandleDetails, HandleLocalStorage } = this.props;
    return (
      <section>
        <ul>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </ul>
        <div className="container-ListProducts">
          {productList.length > 0 ? (
            <ul className="container-ListProducts">
              {productList.map((item) => (
                <li key={ item.id } className="produtos">
                  <div data-testid="product">
                    <h1>{item.title}</h1>
                    <img src={ item.thumbnail } alt={ item.title } className="image" />
                    <p>{ `R$${item.price}`}</p>
                  </div>
                  <button
                    type="button"
                    id={ item.id }
                    data-testid="product-detail-link"
                    onClick={ HandleDetails }
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    id={ item.id }
                    data-testid="product-add-to-cart"
                    onClick={ HandleLocalStorage }
                  >
                    Adicionar ao Carrinho
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}
        </div>
      </section>
    );
  }
}

ListProduct.propTypes = {
  HandleDetails: PropTypes.func.isRequired,
  HandleLocalStorage: PropTypes.func.isRequired,
  productList: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

export default ListProduct;
