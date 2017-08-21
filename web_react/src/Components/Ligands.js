import React from 'react';


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

class Ligands extends React.Component {
    constructor() {
        super();
        this.state = {
            values: []
        }
    }

    componentWillMount(){
        this.setState({
            values: logK[0]
        })
    }


    static defaultProps = {
        ligands: ['', 'Atropine', 'Pirenzipine', 'Methoctramine', 'Darifenacin', 'MT-3',
            'S-secoverine', 'Solifenacin', 'DAU-5884', 'Ligand A', 'Ligand B',]
    };


    handleChange(e) {
        let currentRowIndex = parseInt(this.props.currentRowIndex);
        let currentRowSelection = e.target.value;

        this.setState({
            values: logK[currentRowSelection]
        });

    }

    renderCell(cellValue) {
        return <td><input type="text" className="receptorsInputCell" value={cellValue}/></td>;
    }

    render() {
        let ligandOptions = this.props.ligands.map((ligand, index) => {
            return <option value={index}>{ligand}</option>
        });

        return (
            <div>
                <tr>
                    <td>{this.props.currentRowIndex}.
                        <select ref="ligandOptions" onChange={this.handleChange.bind(this)}>
                            {ligandOptions}
                        </select>
                    </td>
                    {this.renderCell(this.state.values[0])}
                    {this.renderCell(this.state.values[1])}
                    {this.renderCell(this.state.values[2])}
                    {this.renderCell(this.state.values[3])}
                    {this.renderCell(this.state.values[4])}

                </tr>


            </div>
        );
    }
}

export default Ligands;