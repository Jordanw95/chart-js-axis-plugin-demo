import React from 'react';
import ReactDom from 'react-dom';
import Entrance from './components/entrance';

const App = () => <Entrance>A button</Entrance>;
ReactDom.render(<App />, document.getElementById('root'));
