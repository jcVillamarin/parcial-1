const createProductHtml = (product) => {
  let priceVal = getPrice(product.price);
  const productName = `<div class="product-name">${product.title}</div>`;
  priceVal = product.free_shipping ? `<div>${priceVal}<img src="../assets/shipping.png"/></div>` : `<div>${priceVal}</div>`;
  const priceInfo = `<div class="price-info">${priceVal}${productName}</div>`;
  const img = `<button class="product-btn" onclick="redirectDetalle('${product.id}')"><img src="${product.picture}" class="product-icon" /></button>`;
  const city = `<div class="city">${product.location}</div>`;
  return `<div class="product">${img}${priceInfo}${city}</div>`;
};

const getPrice = (price) => {
  return price.amount.toLocaleString('en-US', {
    style: 'currency',
    currency: price.currency,
  });
};

const redirectDetalle = (product) => {
  localStorage.setItem('detalle', product);
  window.location.replace('/detalle/detalle.html');
};

fetchStyle(`${window.location.origin}/product/product.css`);
