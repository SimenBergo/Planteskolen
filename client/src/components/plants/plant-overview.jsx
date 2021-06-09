import React, { Component } from 'react';
//import Greyplant from "../../logo-plant-grey.png";
import DisplayPlants from './DisplayPlants';

class Plantoverview extends Component {
    render() {
        return (
            <div id="plantOverview">
                <h2>Overview of all plants</h2>
                <div id="plants">
                    <DisplayPlants />
                </div>
            </div>
        )
    }
}

export default Plantoverview;