import { useState } from 'react';

const useStateWithLocalStorage = (
  localStorageKey,
  isArray = true
) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey), [
      localStorageKey,
    ]) || (isArray ? [] : null)
  );

  localStorage.setItem(
    localStorageKey,
    JSON.stringify(value)
  );

  return [value, setValue];
};

export default useStateWithLocalStorage;
