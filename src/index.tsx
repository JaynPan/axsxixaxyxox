import React from 'react';
import ReactDOM from 'react-dom';

import { RoomAllocation } from './components/RoomAllocation';
import GlobalStyles from './GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1em 0',
          minHeight: '100vh',
        }}
      >
        <RoomAllocation
          guest={10}
          room={3}
          onChange={(results) => console.log('index.js', results)}
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
