const getStoredCard = () => {
  const storedCardString = localStorage.getItem("cart");
  if (storedCardString) {
    return JSON.parse(storedCardString);
  }
  return [];
};

const saveCartToLs = cart => {
  const cartStringfied = JSON.stringify(cart);
  localStorage.setItem('cart', cartStringfied);
};

const addToLs = (id) => {
  const cart = getStoredCard();
  cart.push(id);
  // save to local storage
  saveCartToLs(cart);
  
};

const removeFromLs = id => {
  const cart = getStoredCard();
  const remaining = cart.filter(idx => idx !==id);
  saveCartToLs(remaining);
}



export { addToLs, getStoredCard, removeFromLs }
