import React from 'react';
import { createRoot } from 'react-dom/client';
import Plugin from './containers';

const App = () => <Plugin></Plugin>;

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)