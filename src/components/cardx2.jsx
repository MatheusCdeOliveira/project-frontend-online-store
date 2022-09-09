// import React from 'react';
// import { Link } from 'react-router-dom';

// class Card extends React.Component {
//   state = {
//     productItems: [],
//     cartItems: {},
//   };

//   componentDidMount() {
//     const { productList } = this.props;
//     this.setState({ productItems: productList });
//     // console.log(productList);
//   }

//   handleAddItem = () => {
//     const { productItems } = this.state;
//     // const { productList } = this.props;
//     console.log(productItems);
//     this.setState({ cartItems: [productItems] });
//   };

//   render() {
//     return (
//       <div>
//         <button
//           type="button"
//           data-testid="product-detail-add-to-cart"
//           onClick={ this.handleAddItem }
//         >
//           Adicionar ao carrinho

//         </button>
//         <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de Compras</Link>
//       </div>
//     );
//   }
// }

// export default Card;
