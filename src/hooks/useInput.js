import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  function onValueChange({ target }) {
    setValue(target.value);
  }

  return [value,  setValue];
}

export default useInput;
