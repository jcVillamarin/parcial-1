let displayedProducts = [];
let valBtn = false;
const request = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
      if (req.status == 200) resolve(req.response);
    };
    req.send();
  });
};

const loadProducts = async () => {
  displayedProducts = JSON.parse(localStorage.getItem('favs'));
  renderProducts();
};

const renderProducts = () => {
  const productContainer = document.getElementById('products');
  if (productContainer) {
    productContainer.innerHTML = '';
    let newProdutsHtml = '';
    displayedProducts.forEach((product) => {
      const html = createProductHtml(product);
      newProdutsHtml += html;
    });
    productContainer.innerHTML = newProdutsHtml;
  }
};

const fetchStyle = (url) => {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.onload = function () {
      resolve();
    };
    link.href = url;
    let headScript = document.querySelector('script');
    headScript.parentNode.insertBefore(link, headScript);
  });
};

const createProductHtml = (product) => {
  let priceVal = getPrice(product.price);
  const productName = `<div class="product-name">${product.title}</div>`;
  priceVal = product.free_shipping ? `<div>${priceVal}<img src="../assets/shipping.png"/></div>` : `<div>${priceVal}</div>`;
  const priceInfo = `<div class="price-info">${priceVal}${productName}</div>`;
  const check = `<input type="checkbox" onclick="changeCheck()" id="${product.id}" class="cbox2"/>`;
  const img = `<button class="product-btn" onclick="redirectDetalle('${product.id}')"><img src="${product.picture}" class="product-icon" /></button>`;
  const btn = `<button class="btn-articulo" onclick="redirectDetalle('${product.id}')">Ver articulo</button>`;
  return `<div class="product">${check}${img}${priceInfo}${btn}</div>`;
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

const changeCheck = () => {
  valBtn = false;
  displayedProducts.forEach((element) => {
    console.log(document.getElementById(element.id).checked);
    if (document.getElementById(element.id).checked) {
      valBtn = true;
    }
  });
  if (valBtn) {
    document.getElementById('btn-eliminar').style.background = '#E1677D';
  } else {
    console.log('aaa');
    document.getElementById('btn-eliminar').style.background = '#ECE9E9';
  }
};

const changeAll = () => {
  if (document.getElementById('cbox2').checked) {
    displayedProducts.forEach((element) => {
      document.getElementById(element.id).checked = true;
    });
  } else {
    displayedProducts.forEach((element) => {
      document.getElementById(element.id).checked = false;
    });
  }
  changeCheck();
};

const eliminar = () => {
  if (valBtn) {
    displayedProducts = displayedProducts.filter((element) => !document.getElementById(element.id).checked);
    localStorage.setItem('favs', JSON.stringify(displayedProducts));
    renderProducts();
    changeCheck();
  }
};

loadProducts();
