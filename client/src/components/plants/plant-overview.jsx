import React, { Component } from 'react';
import DisplayPlants from './DisplayPlants';

class Plantoverview extends Component {
    render() {
        return (
            <div id="plantOverview">
                <div className="plants">
                    <DisplayPlants />
                </div>
            </div>
        )
    }
}

export default Plantoverview;