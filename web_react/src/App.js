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
            ligands: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]

        });
    }

    handleLigandChange(rowIndex, ligandIndex) {
        let originalLigandState = this.state.ligands;
        originalLigandState[rowIndex] = logK[ligandIndex];
        this.setState({
            ligands: originalLigandState
        });
    }

    checkExceedBox(selectedBoxIndex) {
        const boxArray = this.state.selectedBox;
        const relInput = this.state.receptorRatio;

        if (boxArray[selectedBoxIndex] === false) {
            let trueCounter = 0;
            boxArray.forEach(v => v ? trueCounter++ : v);
            if (trueCounter < 2) {
                boxArray[selectedBoxIndex] = true;
            } else {
                alert('You can only select two boxes!')
            }
        } else {
            boxArray[selectedBoxIndex] = false;
            relInput[selectedBoxIndex] = null;
        }

        this.setState({
            selectedBox: boxArray,
            receptorRatio: relInput
        });
    }

    setCheckBox(selectedBoxIndex) {
        const boxArray = this.state.selectedBox;
        const relInput = this.state.receptorRatio;
        boxArray[selectedBoxIndex] = true;

        this.setState({
            selectedBox: boxArray,
        });

    }

    render() {
        return (
            <div>
                <div className="mainUI">
                    <div className="UISection">
                        <Receptors selectedBox={this.state.selectedBox}
                                   receptorRatio={this.state.receptorRatio}
                                   checkExceedBox={this.checkExceedBox.bind(this)}
                                   setCheckBox={this.setCheckBox.bind(this)}/>
                    </div>
                    <div className="UISection">
                        <Ligands ligandState={this.state.ligands} ligandChange={this.handleLigandChange.bind(this)}/>
                    </div>

                    <div className="UISection">
                        <Graph/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;