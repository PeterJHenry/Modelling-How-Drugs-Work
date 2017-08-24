import React from 'react';


class Receptors extends React.Component {

    renderBoxes(selectedBoxIndex) {
        return (
            <td>
                <input type="checkbox"
                       onClick={this.props.checkExceedBox.bind(this, selectedBoxIndex)}
                       checked={this.props.selectedBox[selectedBoxIndex]}/>
            </td>
        );
    }



    checkRatioTotal(boxIndex, event) {
        const inputValue = parseInt(event.target.value);
        // var total = 0;
        var total = 0;
        const relInput = this.props.receptorRatio;
        this.props.receptorRatio.forEach(v => total += v);
        total += inputValue;

        // if(total > 100){
        //     alert('too Much')
        // } else {
        //     relInput[boxIndex] = inputValue;
        //     this.setState({receptorRatio:relInput})
        // }


    }

    handleInputChange(e) {
        // console.log(e.target.value);
    }

    renderRelativeDensity(boxIndex) {
        return (
            <td>
                <button className="receptorButtons decrement">-</button>
                <input type="text" className="relativeDensityInput"
                       disabled={!this.props.selectedBox[boxIndex]}
                       value={this.props.receptorRatio[boxIndex]}
                       onBlur={this.checkRatioTotal.bind(this, boxIndex)}
                       onChange={this.handleInputChange.bind(this)}/>
                <button className="receptorButtons increment">+</button>
            </td>
        )
    }


    renderReceptorLegend(number) {
        return (
            <td>
                <strong>M<sub>{number}</sub></strong>
            </td>
        );
    }

    render() {
        return (
            <fieldset className="fieldSet">
                <legend>Receptors</legend>


                <table>
                    <tr>
                        <td></td>
                        {this.renderReceptorLegend(1)}
                        {this.renderReceptorLegend(2)}
                        {this.renderReceptorLegend(3)}
                        {this.renderReceptorLegend(4)}
                        {this.renderReceptorLegend(4)}

                    </tr>

                    <tr>
                        <td className="leftInput receptorSubtitle">Subtypes present:</td>
                        {this.renderBoxes(0)}
                        {this.renderBoxes(1)}
                        {this.renderBoxes(2)}
                        {this.renderBoxes(3)}
                        {this.renderBoxes(4)}
                    </tr>

                    <tr>
                        <td className="leftInput receptorSubtitle">Relative density:</td>
                        {this.renderRelativeDensity(0)}
                        {this.renderRelativeDensity(1)}
                        {this.renderRelativeDensity(2)}
                        {this.renderRelativeDensity(3)}
                        {this.renderRelativeDensity(4)}
                    </tr>

                </table>
            </fieldset>
        );
    }
}

export default Receptors;