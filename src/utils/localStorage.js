const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const removeFromLocalStorage = key => {
  localStorage.removeItem(key);
};

export { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
