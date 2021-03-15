let products = [];
let displayedProducts = [];

const loadProducts = async () => {
  const response = await request(
    'https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce',
  );
  if (response) {
    products = JSON.parse(response).items;
    displayedProducts = products.map((product) => product);
    renderProducts();
  }
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

loadProducts();
