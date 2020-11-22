import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Container } from './container';

const App = (props) => {
    return (
        <div className="container">
                <div className="row">
                    <h2>Analyse des ventes </h2>
                </div>
                <Container/>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Router>
            <App/>
        </Router>
    , document.getElementById('app'));
}
