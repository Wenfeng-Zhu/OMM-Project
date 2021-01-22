import './App.css';
import React, {Component} from 'react';
import ImageArea from "./components/imageArea/imageArea";
import TextsInputs from "./components/TextsInputs/TextsInputs";


export default class App extends Component {
    state = {
        imageSource:0,
        inputInit: 2,

    }


    render() {
        return (
            <div className="App" id="container">

                <ImageArea/>

                <div id="editArea">
                    <div id="overviewTmplArea">
                        <p id="titleTmpl"></p>
                        <div id="thnDiv"></div>
                    </div>
                    <TextsInputs>

                    </TextsInputs>
                    <div id="filesArea">
                        <form action="/upload" method="POST" encType="multipart/form-data">
                            <input type="file" name="file" id="file"/>
                            <input type="submit" value="Submit"/>
                        </form>
                        <button id="export">Export</button>
                    </div>
                </div>

            </div>
        );

    }
}
