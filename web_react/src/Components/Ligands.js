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

    static defaultProps = {
        ligandsList: ['', 'Atropine', 'Pirenzipine', 'Methoctramine', 'Darifenacin', 'MT-3',
            'S-secoverine', 'Solifenacin', 'DAU-5884', 'Ligand A', 'Ligand B',]
    };


    handleChange(rowIndex, ligandIndex) {
        this.props.ligandChange(rowIndex, ligandIndex.target.value);
    }

    renderCell(cellValue) {
        return (<td>
            <input type="text" className="receptorsInputCell" value={Ligands.disableZero(cellValue)}/>
        </td>);
    }


    static disableZero(cellValue) {
        if (cellValue == '0') {
            return '';
        }
        return cellValue;
    }


    renderRow(rowNumber) {
        let ligandOptions = this.props.ligandsList.map((ligand, index) => {
            return <option value={index}>{ligand}</option>
        });

        return (
            <tr>
                <td><a>{rowNumber + 1}. </a>
                    <select ref="ligandOptions" onChange={this.handleChange.bind(this, rowNumber)}>
                        {ligandOptions}
                    </select>
                </td>
                {this.renderCell(this.props.ligandState[rowNumber][0])}
                {this.renderCell(this.props.ligandState[rowNumber][1])}
                {this.renderCell(this.props.ligandState[rowNumber][2])}
                {this.renderCell(this.props.ligandState[rowNumber][3])}
                {this.renderCell(this.props.ligandState[rowNumber][4])}


            </tr>

        );

    }


    render() {
        return (
            <fieldset className="ligands_fieldset">
                <legend>Ligands</legend>
                <div className="ligands">
                    <table>

                        {this.renderRow(0)}
                        {this.renderRow(1)}
                        {this.renderRow(2)}
                        {this.renderRow(3)}
                        {this.renderRow(4)}
                        {this.renderRow(5)}

                    </table>
                </div>
            </fieldset>

        );
    }
}

export default Ligands;
