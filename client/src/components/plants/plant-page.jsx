import React, { Component } from 'react';
import Greyplant from "../../assets/logo-plant-grey.png";
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { setWaterLevel, waterLevelBar, displayTime } from '../../utils/helpers';
import PlantsUpdate from './PlantsUpdate';


class Plantpage extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            building: '',
            room: '',
            waterlevel: '',
            waterschedule: '',
            lastwatered: '',
            nextwatering: '',
            fertilizer: '',
            fertilizerschedule: '',
            lastfertilized: '',
            nextfertilizing: '',
            flags: 0,
            allPlants: [],
            updatePlant: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    componentDidMount = async () => {
            const { id } = this.state;

            const plant = await api.getPlantById(id);

            await api.getAllPlants().then(plants => {
                this.setState({
                    allPlants: plants.data
                })
            })

            this.setState({
                name: plant.data.data.name,
                building: plant.data.data.building,
                room: plant.data.data.room,
                waterlevel: setWaterLevel(plant.data.data.lastwatered, plant.data.data.waterschedule),
                waterschedule: plant.data.data.waterschedule,
                lastwatered: plant.data.data.lastwatered,
                nextwatering: plant.data.data.nextwatering,
                fertilizer: plant.data.data.fertilizer,
                flags: plant.data.data.flags,
                fertilizerschedule: plant.data.data.fertilizerschedule,
                lastfertilized: plant.data.data.lastfertilized,
                nextfertilizing: plant.data.data.nextfertilizing
            })

            this.selectPlant();
    }

    //creating a dropdown list with all the plants
    selectPlant = () => {
        var select = document.getElementById("selectPlant"); 
        var options = this.state.allPlants.data;

        for(var i = 0; i < options.length; i++) {
            var opt = options[i]['name'] + ', ' + options[i]['room'];
            var value = options[i]['_id'];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = value;
            select.appendChild(el);
            
        }
    }

    //setting the state based on the selected plant
    onDropdownSelected = (e) => {
        const plants = this.state.allPlants.data;

        for (let i = 0; i < plants.length; i++) {
            if(e.target.value === plants[i]['_id']){
                this.setState({
                    id: plants[i]['_id'],
                    name: plants[i]['name'],
                    building: plants[i]['building'],
                    room: plants[i]['room'],
                    waterlevel: setWaterLevel(plants[i]['lastwatered'], plants[i]['waterschedule']),
                    waterschedule: plants[i]['waterschedule'],
                    lastwatered: plants[i]['lastwatered'],
                    nextwatering: plants[i]['nextwatering'],
                    fertilizer: plants[i]['fertilizer'],
                    flags: plants[i]['flags'],
                    fertilizerschedule: plants[i]['fertilizerschedule'],
                    lastfertilized: plants[i]['lastfertilized'],
                    nextfertilizing: plants[i]['nextfertilizing']
                })
            }
        }
        //here you will see the current selected value of the select input
    }

    waterPlant = async () => {
        const { id, name, building, room, waterschedule, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        const lastwatered = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };
            await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`Plant watered successfully!`);
            window.location.reload();
        })
    }

    fertilizePlant = async () => {
        const { id, name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule } = this.state;

        const lastfertilized = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule, lastfertilized };
            await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`Plant fertilized successfully!`);
            window.location.reload();
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });
    }

    removeFlag = async (id) => {
        const { name, building, room, waterschedule, lastwatered, fertilizer, nextwatering, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        let flags = this.state.flags;

        flags = 0;
        
        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, nextwatering, flags, fertilizerschedule, lastfertilized, nextfertilizing };

        await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.location.reload();
        })
    }

    //function for adding a flag to the plant
    flagPlant = async (id) => {

        const { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        let flags = this.state.flags;

        flags ++;
        
        const payload = { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };

        await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert('Plant has been flagged, someone will take a look at it.');
            window.location.reload();
        })
    }
    
    updatePlant() {
        this.setState({
            updatePlant: true
        })   
    }

    render() {
        const { id, name, building, room, waterlevel, lastwatered, fertilizer, nextwatering, flags, lastfertilized, nextfertilizing, updatePlant } = this.state;
            return (
                <>
                {updatePlant &&
                    <div className="plants">
                        <PlantsUpdate id={id} />
                    </div>
                }
                
                {!updatePlant &&
                <div>    
                    <p>Select plant:</p>
                    <select id = "selectPlant" onChange = {this.onDropdownSelected}>
                        <option value={this.state.id}>{this.state.name}, {this.state.room}</option>
                    </select>
                    
                    <figure id="activePlant">
                        {flags > 0 && 
                        <p>This plant has been flagged {flags} {flags === 1 ? 'time' : 'times'}.</p>
                        }
                        {this.context.isGardener && flags > 0 &&
                        <Button
                        id="remove-flag"
                        aria-label="remove-flag"
                        color="primary"
                        onClick={() => this.removeFlag(id)}
                    >Remove flags</Button> }
                    <h2>{name}</h2>
                        <img alt="Plant" src={Greyplant} />
                        <p>Building: {building}</p>
                        <p>Room: {room}</p>
                        <p>Water level: {waterlevel}</p>
                        <div id="waterLevelBar">
                            {waterLevelBar(waterlevel)}
                        </div>
                        <p>Last watered: {displayTime(lastwatered)}</p>
                        <p>Next watering: {displayTime(nextwatering)}</p>
                        <p>Fertilizer: {fertilizer}</p>
                        <p>Last fertilized: {displayTime(lastfertilized)}</p>
                        <p>Next fertilizing: {displayTime(nextfertilizing)}</p>
                        {!this.context.isGardener &&
                        <p>Does this plant need water or fertilizer now? <br /> 
                            Let us know below:</p> }
                        {!this.context.isGardener &&
                        <Button
                            id="flag"
                            aria-label="flag"
                            color="primary"   
                            onClick={() => this.flagPlant(id)}
                        >Flag this plant</Button> }
                        {this.context.isGardener &&
                        <Button
                            id="water"
                            aria-label="water"
                            color="primary"   
                            onClick={() => this.waterPlant()}                
                        >Water</Button> }
                        {this.context.isGardener &&
                        <Button
                            id="fertilize"
                            aria-label="fertilize"
                            color="primary"   
                            onClick={() => this.fertilizePlant()}                
                        >Fertilize</Button>}
                        {this.context.isGardener &&
                            <Button
                            id="update"
                            aria-label="update"
                            color="primary"
                            onClick={() => this.updatePlant()}
                            >Update</Button>
                         }
                        <Button id="back" href={`/plant-overview`}>Back</Button>
                    </figure>
                </div>
                }
                </>
            )
    }

}

export default Plantpage;