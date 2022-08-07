import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { CustomInputNumber } from './components/CustomInputNumber';

const App = () => {
  const [count, setCount] = useState<number | string>(1);

  return (
    <CustomInputNumber
      min={0}
      max={20}
      step={3}
      value={count}
      name="test"
      disabled
      onChange={(e) => {
        console.log('onchange', e.target.name, e.target.value);
        setCount(e.target.value);
      }}
      onBlur={(e) => {
        console.log('onblur', e.target.name, e.target.value);
        setCount(e.target.value);
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
