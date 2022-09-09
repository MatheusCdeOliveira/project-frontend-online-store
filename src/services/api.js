export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await categories.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categoriesID = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = await categoriesID.json();
  return response;
}

export async function getProductById(id) {
  const requisicao = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await requisicao.json();
  return response;
}
