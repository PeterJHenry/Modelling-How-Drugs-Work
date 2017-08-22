import React from 'react';


class Receptors extends React.Component {

    constructor() {
        super();
        this.state = ({
            selectedBox: []
        });

    }

    componentWillMount() {
        this.setState({
            selectedBox: [false, false, false, false, false]
        });
    }

    renderBoxes(selectedBoxIndex) {
        return (<td>
                <input type="checkbox"
                       onClick={this.checkExceedBox.bind(this, selectedBoxIndex)}
                       checked={this.state.selectedBox[selectedBoxIndex]}/>
            </td>
        );
    }

    checkExceedBox(selectedBoxIndex) {
        const boxArray = this.state.selectedBox;


        if (boxArray[selectedBoxIndex] === false) {
            let trueCounter = 0;
            boxArray.forEach(v => v ? trueCounter++ : v);
            if (trueCounter < 2) {
                boxArray[selectedBoxIndex] = true;
                this.setState({selectedBox: boxArray});
            } else {
                alert('You can only select two boxes!')
            }
        } else {
            boxArray[selectedBoxIndex] = false;
            this.setState({selectedBox: boxArray});
        }
    }

    renderRelativeDensity(boxIndex) {
        return (
            <td>
                <input type="text" className="relativeDensityInput"
                       disabled={!this.state.selectedBox[boxIndex]}/>
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
            <fieldset className="receptors_fieldset">
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
                        <td>Subtypes present:</td>
                        {this.renderBoxes(0)}
                        {this.renderBoxes(1)}
                        {this.renderBoxes(2)}
                        {this.renderBoxes(3)}
                        {this.renderBoxes(4)}
                    </tr>

                    <tr>
                        <td>Relative density:</td>
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