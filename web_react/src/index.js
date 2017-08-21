import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


const logK = [
    [9.0, 8.8, 9.3, 8.9, 9.2],
    [8.2, 6.5, 6.9, 7.4, 7.2],
    [6.7, 7.7, 6.0, 7.0, 6.3],
    [7.8, 7.0, 8.8, 7.7, 8.0],
    [6.7, 5.9, 6.0, 8.1, 6.0],
    [8.0, 7.9, 7.7, 7.7, 6.5],
    [7.6, 6.8, 7.9, 7.0, 7.5],
    [8.9, 7.1, 8.9, 8.5, 8.1],
    [9.0, 9.0, 6.0, 6.0, 2.0],
    [8.0, 5.0, 8.0, 5.0, 8.0]
];

class Receptors extends React.Component {
    render() {
        return <div></div>;
    }
}

class Ligands extends React.Component {
    render() {
        return <div></div>;
    }
}


class Graph extends React.Component {
    render() {
        return <div></div>;
    }
}



class mainUI extends React.Component {
    render() {
        return (
            <div className="mainUI">
                <div className="receptors">
                    <Receptors/>
                </div>

                <div className="ligands">
                    <Ligands/>
                </div>

                <div className="graph">
                    <Graph/>
                </div>

            </div>
        );
    }
}

// ==================
ReactDOM.render(
    <mainUI/>,
    document.getElementById('root')
);
