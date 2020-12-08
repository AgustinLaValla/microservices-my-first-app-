import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataLayer from './DataLayer';

ReactDOM.render(
    <DataLayer>
        <App />
    </DataLayer>,
    document.getElementById('root')
);