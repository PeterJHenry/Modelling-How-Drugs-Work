import React, {Component} from 'react';

import Graph from './Components/Graph';
import Receptors from './Components/Receptors';
import Ligands from './Components/Ligands';

class App extends Component {
    constructor() {
        super();
        this.state = {
            receptor: [],
            ligands: []
        }
    }

    componentWillMount() {
        this.setState({
            receptor: [
                {
                    receptorSelection: [0, 0, 0, 0, 0],
                    selectionRatio: [0, 0, 0, 0, 0]
                }
            ],
            ligands: [-1, -1, -1, -1, -1, -1]
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


                    <div className="graph">
                        <Graph/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;