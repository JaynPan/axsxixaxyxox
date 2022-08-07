import React from 'react';
import ReactDOM from 'react-dom';

import { RoomAllocation } from './components/RoomAllocation';

const App = () => {
  return (
    <RoomAllocation
      guest={8}
      room={4}
      onChange={(results) => console.log('index.js', results)}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
