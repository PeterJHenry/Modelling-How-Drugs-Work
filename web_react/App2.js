import React, {Component} from 'react';
// import logo from './logo.svg';
import './src/App.css';

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fillBoxes(e) {
        const valueSelected = e.target.value;

        const table = document.getElementById('table');
        // const selectedRow = table.rows[valueSelected];
        // console.log(selectedRow.cells[1]);
        const rowSelected = e.target.id.charAt(e.target.id.length-1);
        const currentRow = table.rows[parseInt(rowSelected)-1];

        for (let i = 0; i < 5; i++){
            currentRow.cells[i+1].children[0].value = logK[valueSelected][i];
        }


    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <fieldset className="receptors">
                        <legend>Receptors</legend>

                        <table>
                            <tr>
                                <th></th>
                                {/*Receptors*/}
                                <th>M<sub>1</sub></th>
                                <th>M<sub>2</sub></th>
                                <th>M<sub>3</sub></th>
                                <th>M<sub>4</sub></th>
                                <th>M<sub>5</sub></th>

                            </tr>
                            <tr>
                                <td>Subtypes present:</td>
                                <td><input type="checkbox"/></td>
                                <td><input type="checkbox"/></td>
                                <td><input type="checkbox"/></td>
                                <td><input type="checkbox"/></td>
                                <td><input type="checkbox"/></td>
                            </tr>
                            <tr>
                                <td>Relative density:</td>
                                <td><input className="relativeDensityInput" type="text"/></td>
                                <td><input className="relativeDensityInput" type="text"/></td>
                                <td><input className="relativeDensityInput" type="text"/></td>
                                <td><input className="relativeDensityInput" type="text"/></td>
                                <td><input className="relativeDensityInput" type="text"/></td>
                            </tr>
                        </table>
                    </fieldset>
                    {/*Ligands*/}
                    <fieldset className="ligands">
                        <legend>Ligands</legend>

                        <table id="table" >
                            <tr>
                                <td>1. <select className="selectIndex" id="selectIndex-1" onChange={this.fillBoxes}>
                                    <option value=""></option>
                                    <option value="0">Atropine</option>
                                    <option value="1">Pirenzipine</option>
                                    <option value="2">Methoctramine</option>
                                    <option value="3">Darifenacin</option>
                                    <option value="4">MT-3</option>
                                    <option value="5">S-secoverine</option>
                                    <option value="6">Solifenacin</option>
                                    <option value="7">DAU-5884</option>
                                    <option value="8">Ligand A</option>
                                    <option value="9">Ligand B</option>
                                </select>
                                </td>

                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>

                            </tr>

                            <tr>
                                <td>2. <select className="selectIndex" id="selectIndex-2" onChange={this.fillBoxes}>

                                    <option value=""></option>
                                    <option value="0">Atropine</option>
                                    <option value="1">Pirenzipine</option>
                                    <option value="2">Methoctramine</option>
                                    <option value="3">Darifenacin</option>
                                    <option value="4">MT-3</option>
                                    <option value="5">S-secoverine</option>
                                    <option value="6">Solifenacin</option>
                                    <option value="7">DAU-5884</option>
                                    <option value="8">Ligand A</option>
                                    <option value="9">Ligand B</option>
                                </select>
                                </td>

                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>

                            </tr>

                            <tr>
                                <td>3. <select className="selectIndex" id="selectIndex-3" onChange={this.fillBoxes}>
                                    <option value=""></option>
                                    <option value="0">Atropine</option>
                                    <option value="1">Pirenzipine</option>
                                    <option value="2">Methoctramine</option>
                                    <option value="3">Darifenacin</option>
                                    <option value="4">MT-3</option>
                                    <option value="5">S-secoverine</option>
                                    <option value="6">Solifenacin</option>
                                    <option value="7">DAU-5884</option>
                                    <option value="8">Ligand A</option>
                                    <option value="9">Ligand B</option>
                                </select></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                            </tr>

                            <tr>
                                <td>4. <select className="selectIndex" id="selectIndex-4" onChange={this.fillBoxes}>
                                    <option value=""></option>
                                    <option value="atropine">Atropine</option>
                                    <option value="pirenzepine">Pirenzipine</option>
                                    <option value="methoctramine">Methoctramine</option>
                                    <option value="darifenacin">Darifenacin</option>
                                    <option value="mt-3">MT-3</option>
                                    <option value="s-secoverine">S-secoverine</option>
                                    <option value="solifenacin">Solifenacin</option>
                                    <option value="dau-5884">DAU-5884</option>
                                </select></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                            </tr>

                            <tr>
                                <td>5. <select className="selectIndex" id="selectIndex-5" onChange={this.fillBoxes}>
                                    <option value=""></option>
                                    <option value="atropine">Atropine</option>
                                    <option value="pirenzepine">Pirenzipine</option>
                                    <option value="methoctramine">Methoctramine</option>
                                    <option value="darifenacin">Darifenacin</option>
                                    <option value="mt-3">MT-3</option>
                                    <option value="s-secoverine">S-secoverine</option>
                                    <option value="solifenacin">Solifenacin</option>
                                    <option value="dau-5884">DAU-5884</option>
                                </select></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                            </tr>

                            <tr>
                                <td>6. <select className="selectIndex" id="selectIndex-6" onChange={this.fillBoxes}>
                                    <option value=""></option>
                                    <option value="atropine">Atropine</option>
                                    <option value="pirenzepine">Pirenzipine</option>
                                    <option value="methoctramine">Methoctramine</option>
                                    <option value="darifenacin">Darifenacin</option>
                                    <option value="mt-3">MT-3</option>
                                    <option value="s-secoverine">S-secoverine</option>
                                    <option value="solifenacin">Solifenacin</option>
                                    <option value="dau-5884">DAU-5884</option>
                                </select></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                                <td><input type="text" className="logValues"/></td>
                            </tr>


                        </table>
                    </fieldset>

                    {/*graphplot*/}
                    <fieldset className="graphPlot">
                        <legend>Competition binding curves</legend>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default App;

