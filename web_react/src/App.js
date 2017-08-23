import React, {Component} from 'react';

import Graph from './Components/Graph';
import Receptors from './Components/Receptors';
import Ligands from './Components/Ligands';


const logK = [
    ['', '', '', '', ''],
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

class App extends Component {
    constructor() {
        super();
        this.state = {
            receptor: [],
            receptorRatio: [],
            ligands: [[], [], [], [], [], []]
        }
    }

    componentWillMount() {
        this.setState({
            selectedBox: [false, false, false, false, false],
            receptorRatio: [null, null, null, null, null],
            ligands: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

        });
    }


    renderLigandRow(rowIndex) {
        return (<tr>
            <Ligands currentRowIndex={rowIndex}/>
        </tr>);
    }

    render() {
        return (
            <div>

                <div className="mainUI">
                    <div className="receptors">
                        <Receptors/>
                    </div>
                    <div className="ligands">
                        <fieldset className="ligands_fieldset">
                            <legend>Ligands</legend>
                            <div className="ligands">
                                <table>

                                    {this.renderLigandRow(1)}
                                    {this.renderLigandRow(2)}
                                    {this.renderLigandRow(3)}
                                    {this.renderLigandRow(4)}
                                    {this.renderLigandRow(5)}
                                    {this.renderLigandRow(6)}

                                </table>
                            </div>
                        </fieldset>
                    </div>


                    <div className="graph">
                        <Graph/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;