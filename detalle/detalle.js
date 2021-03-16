let products = [];
let displayedProducts = [];
let product;
const loadProducts = async () => {
  const response = await request(
    'https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce',
  );
  if (response) {
    products = JSON.parse(response).items;
    initDetalle();
  }
};

const initDetalle = () => {
  const productId = localStorage.getItem('detalle');
  product = products.find((pro) => pro.id == productId);
  let category = '';
  product.categories.forEach((element) => {
    category += `> ${element}`;
  });
  const units = `${getStatus(product.condition)} | ${product.sold_quantity}  Vendidos`;
  document.getElementById('category-item').innerText = category;
  document.getElementById('img').src = product.picture;

  document.getElementById('used-units').innerText = units;
  document.getElementById('name').innerText = product.title;
  document.getElementById('price').innerText = getPrice(product.price);
  document.getElementById('description').innerText = product.description;
};

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

const getPrice = (price) => {
  return price.amount.toLocaleString('en-US', {
    style: 'currency',
    currency: price.currency,
  });
};

const openComprarDialgo = () => {
  document.getElementById('dialog-title').innerText = product.title;
  document.getElementById('dialog').style.display = 'block';
};

const closeDialog = () => {
  document.getElementById('dialog').style.display = 'none';
};

const addFav = () => {
  let favs = localStorage.getItem('favs');
  if (favs) {
    favs = JSON.parse(favs);
    if (favs.find((element) => element.id == product.id)) return;
    favs.push(product);
  } else {
    favs = [product];
  }
  localStorage.setItem('favs', JSON.stringify(favs));
};

const getStatus = (condition) => {
  if (condition == 'new') {
    return 'Nuevo';
  }
  return 'Usado';
};

const renderProducts = () => {};

loadProducts();
