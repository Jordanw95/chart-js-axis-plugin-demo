import React from 'react';
import ReactDom from 'react-dom';
import Plugin from './containers';

const App = () => <Plugin></Plugin>;
ReactDom.render(<App />, document.getElementById('root'));
