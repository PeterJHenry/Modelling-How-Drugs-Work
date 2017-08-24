import React from 'react';


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
        if (cellValue == '0') return null;
        return cellValue;
    }


    renderRow(rowNumber) {
        let ligandOptions = this.props.ligandsList.map((ligand, index) => {
            return <option value={index}>{ligand}</option>
        });

        return (
            <tr>
                <td className="leftInput"><a>{rowNumber + 1}. </a>
                    <select ref="ligandOptions" className="ligandOptions" onChange={this.handleChange.bind(this, rowNumber)}>
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
            <fieldset className="fieldSet">
                <legend>Ligands</legend>
                    <table>

                        {this.renderRow(0)}
                        {this.renderRow(1)}
                        {this.renderRow(2)}
                        {this.renderRow(3)}
                        {this.renderRow(4)}
                        {this.renderRow(5)}

                    </table>
            </fieldset>

        );
    }
}

export default Ligands;
