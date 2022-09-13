function criaNovoProdCarrinho(item) {
  const value = {
    id: item.id,
    name: item.title,
    price: item.price,
    image: item.thumbnail,
    quant: 1,
  };
  return value;
}

export default function addItemAoCarrinho(item, carrinho) {
  if (carrinho.length > 0) {
    if (carrinho.some((elem) => elem.id === item.id)) {
      carrinho.forEach((prod) => {
        if (prod.id === item.id) prod.quant += 1;
      });
    } else {
      const value = criaNovoProdCarrinho(item);
      carrinho.push(value);
    }
  } else {
    const value = criaNovoProdCarrinho(item);
    carrinho.push(value);
  }
  return carrinho;
}

