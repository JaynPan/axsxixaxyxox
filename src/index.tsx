import React from 'react';
import { createRoot } from 'react-dom/client';

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
          onChange={(result) => console.log('index.js', JSON.stringify(result))}
        />
      </div>
    </>
  );
};

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('container not found in the document.');
}
