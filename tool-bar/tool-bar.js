const getToolBarHtml = async () => {
  const html = await request(`${window.location.origin}/tool-bar/tool-bar.html`);
  const toolBarContainer = document.getElementById('tool-bar');
  if (html && toolBarContainer) toolBarContainer.innerHTML = html;
};

const applyFilter = () => {
  const category = document.getElementById('category').value.toLocaleLowerCase();
  displayedProducts = products.filter((product) => {
    const res = product.categories.filter((productCategory) => productCategory.toLocaleLowerCase() == category);
    if (res.length > 0) return true;
    return false;
  });
  renderProducts();
};

getToolBarHtml();
fetchStyle(`${window.location.origin}/tool-bar/tool-bar.css`);
