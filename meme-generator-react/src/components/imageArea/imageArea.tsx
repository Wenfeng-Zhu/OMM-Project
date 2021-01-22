import React, {Component} from 'react'
import './ImageArea.css'
import image from "../../Memes/meme-1.jpg"

interface imageAreaProps {
    index?: number,
    name?: string,
    url?: string
}

interface imageAreaState {
    state: 0
}

export default class ImageArea extends Component<imageAreaProps, imageAreaState> {
    // state = {images:[
    //         {
    //             id : 1,
    //             name : 'Drake Hotline Bling',
    //             url : 'meme-1.jpg'
    //         },
    //         {
    //             id : 2,
    //             name : 'Distracted Boyfriend',
    //             url : 'meme-2.jpg'
    //         },
    //         {
    //             id:3,
    //             name:'Distracted Boyfriend',
    //             url: 'meme-3.jpg'
    //         }
    //     ]};
    preClick = () => {

    }
    nextClick = () => {

    }

    render() {
        return (
            <div className="imageArea">
                <img id="displayImage" src={image}/>
                <div id="buttonArea">
                    <button onClick={this.preClick}>Pre</button>
                    <button onClick={this.nextClick}>Next</button>
                </div>
            </div>

        );

    }
}

