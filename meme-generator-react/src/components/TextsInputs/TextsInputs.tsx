import React, {Component} from 'react';
import './TextsInputs.css';


export default class TextsInputs extends Component<any, any>{

    state ={
        initNum:2,
        unitsArray :[2]
    }

    inputInit(){
        const items = this.state.unitsArray;
        const newArr = [];
        for (let i = 0;i<this.state.initNum;i++){
            newArr.push(InputUnit(i))
        }
        return newArr;
    }
    addUnit(){
        let arr = this.state.unitsArray;
        arr.push(1);
        let newArr = arr;
        this.setState({
            unitsArray:newArr
        })
    }

    render() {
        alert('test');
        return(
            <div className="inputTextsArea">
                <div className="inputBoxes">
                    <input id="input-Title" type="text" value="inputText-title"/>
                    {this.inputInit()}
                </div>
                <div className="buttonArea">
                    <button className="applyButton">APPLY</button>
                    <button className="addButton"
                            onClick={this.addUnit}
                    >ADD</button>
                </div>

            </div>

        )
    }
}


function InputUnit(index: number){
    return(
        <div className="inputUnit">
            <input className="inputBox"
                   type="text"
                   id={"inputText-"+(index+1)}
                   value={'inputText-' + (index + 1)}
            />
            <input className="inputColor"
                   type="color"
                   value="#000000"
            />
            <input className="inputSize"
                   type="number"
                   value="20"
            />
            <label className="bold">
                B<input className="inputBold" type="checkbox"/>
            </label>
            <label className="italic">
                I<input className="inputItalic" type="checkbox"/>
            </label>
        </div>
    )
}

