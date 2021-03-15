let displayedProducts = [];

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

const renderProducts = () => {};
