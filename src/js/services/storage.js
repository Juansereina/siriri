export const saveData = (key, data) => {
  const value = JSON.stringify(data);

  sessionStorage.setItem(key, value);
};

export const getData = (key) => {
  const value = sessionStorage.getItem(key);

  return JSON.parse(value);
};

export const deleteData = (key) => {
  sessionStorage.removeItem(key);
};

export const clearAll = () => {
  sessionStorage.clear();
};
