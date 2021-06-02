import React, { Component } from 'react';
//import UserProfile from './UserProfile';
import { getUser } from '../../utils/storage';
//import DisplayPlants from '../plants/DisplayPlants';
import PlantsInsert from '../plants/PlantsInsert';
import { AuthContext } from '../../utils/Auth';

class Gardener extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: getUser()
        }
    }

    render() {
        return (
            <div id="gardener">
                {/* <DisplayPlants /> */}
                {this.context.isManager &&
                <div id="addPlant">
                    <PlantsInsert />
                </div>}
                
            </div>
        )
    }
}

export default Gardener;