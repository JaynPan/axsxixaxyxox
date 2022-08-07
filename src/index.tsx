import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const H1 = styled.h1`
  color: red;
`

const HelloWorld = () => {
    return (
      <H1>
          Hello World
      </H1>
    );
}

ReactDOM.render(<HelloWorld />, document.getElementById("root"));