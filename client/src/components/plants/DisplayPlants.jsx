import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import Plantlogo from "../../assets/logo-plant.png";
import { AuthContext } from '../../utils/Auth';
import { displayTime } from '../../utils/helpers';
import waterAlert from '../../assets/water-alert.png';
import checkIcon from '../../assets/check.png';

class DisplayPlants extends Component {
    static contextType = AuthContext;
    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            plants: [],
            columns: [],
            isLoading: false,
            boxHover: '',
            sortType: 'nextwater'
        }
        this.trueDisplay = this.trueDisplay.bind(this)
        this.falseDisplay = this.falseDisplay.bind(this)
        this.change = this.change.bind(this)
    }

    trueDisplay(e, index){
        this.setState({
            boxHover: index
        })
    }
    falseDisplay(){
        this.setState({boxHover: ''})
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getAllPlants().then(plants => { 
            this.setState({
                plants: plants.data.data,
                isLoading: false,
            })
        })
        this.dispPlants();
    }
    
    deletePlant(id, name) {
        if(window.confirm(`Do you want to delete the plant ${name} permanently?`)){
            api.deletePlantById(this.context.generateHeaders(), id);
            window.location.reload();
        }
    }

    //if water button is clicked the lastwatered variable is set to today and updates through back end
    waterPlant = async (id, name, building, room, waterschedule, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing ) => {
        const lastwatered = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };
            await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`Plant watered successfully!`);
            window.location.reload();
        })
    }

    seePlant(id) {
        window.location.href = `/plant-page/${id}`;
    }

    //checking if plant was last watered today
    checkLastWatering(plant){
        const today = new Date();

        const lastWater = new Date(plant.lastwatered);

        let water;

        if(lastWater.getDate() === today.getDate() && lastWater.getMonth() === today.getMonth() && lastWater.getFullYear() === today.getFullYear()) {
            water = true;
        }
        return water;
    }

    //checking if next water is today or has already passed 
    checkWatering(plant) {
        const today = new Date();

        const nextWater = new Date(plant.nextwatering);

        let water;

        if(nextWater < today) {
            water = true;
        }
        return water;
    }

    //creating a div to display each plant 
    dispPlants = () => {
        const plants = this.state.plants;
        const plant = [];

        for (let i = 0; i < plants.length; i++){
            plant.push(plants[i]);
        }
        
        const sorted = this.sortPlantsBy(this.state.sortType);

        return sorted.map((plant, index) => {

           return <div id= "plantCard" key={index} name={`boxHover${index}`} onMouseEnter={ e => this.trueDisplay(e, index)} onMouseLeave={this.falseDisplay}>
                {this.context.isGardener && plant.flags > 0 && 
                    <span className='plant-warning' id='warning-count'>{plant.flags}</span>
                }
                {this.context.isGardener && this.checkWatering(plant) &&
                    <span className='water-warning' id='water-warning'><img src={waterAlert} alt='Water Alert'/></span>
                }
                {this.context.isGardener && this.checkLastWatering(plant) &&
                    <span className='water-warning' id='water-warning'><img src={checkIcon} alt='Check Icon'/></span>
                }
               <Button onClick={() => this.seePlant(plant._id)}>
                <h3>{plant.name}</h3>
                <div id="show">
                <img src={Plantlogo} alt="Plant logo"/>
                </div>
                <div id="extraInfo">
                {this.context.isGardener && <p>Next watering: {displayTime(plant.nextwatering)}</p>}
                {this.context.isGardener && <p>Building: {plant.building}</p>}
                {this.context.isGardener && <p>Room: {plant.room}</p>}
                </div>
                </Button>
                
                {this.context.isGardener &&
                <Link to = {`/gardener/updateplant/${plant._id}`}>
                <Button
                    id="update"
                    aria-label="update"
                    color="primary"
                >Update</Button></Link> }
                {this.context.isManager &&
                <Button
                    id="delete"
                    aria-label="delete"
                    color="secondary"
                    onClick={() => this.deletePlant(plant._id, plant.name)}
                >Delete</Button> }
                {this.context.isGardener && !this.checkLastWatering(plant) &&
                <Button
                    id="water"
                    aria-label="water"
                    color="primary"   
                    onClick={() => this.waterPlant(plant._id, plant.name, plant.building, plant.room, plant.waterschedule, plant.fertilizer, plant.flags, plant.fertilizerschedule, plant.lastfertilized, plant.nextfertilizing)}                
                >Water</Button> }
            </div>
        })
    }

    //sorting by either next watering, next fertilizing, room or number of flags
    sortPlantsBy = (sort) => {

        let sorted;

        if(sort === 'nextwater'){
            sorted = [...this.state.plants].sort((a, b) => a.nextwatering.split('-').join().localeCompare(b.nextwatering.split('-').join()));
        }
        else if(sort === 'nextfertilize'){
            sorted = [...this.state.plants].sort((a, b) => a.nextfertilizing.split('-').join().localeCompare(b.nextfertilizing.split('-').join()));
        }
        else if(sort === 'room'){
            sorted = [...this.state.plants].sort((a, b) => a.room.localeCompare(b.room));
        }
        else if(sort === 'flag') {
            sorted = [...this.state.plants].sort((a, b) => b.flags - a.flags);
        }

        return sorted;

    }

    //notification on top of the page for watering, fertilizing and flags
    notification (plant) {
        const today = new Date();  
        const todaysWater = [];
        const todaysFertilize = [];
        const plantName = [];
        const plantNameFertilize = [];

        const flagged = [];

        for (let i = 0; i < plant.length; i++){
            const dateWater = new Date(plant[i]["nextwatering"]);
            const dateFertilize = new Date(plant[i]["nextfertilizing"]);

            if(dateWater < today) { 
                todaysWater.push(plant[i]);
                plantName.push(' ' + plant[i]['name'] + '(' + plant[i]['room'] + ')');
            }
            
            if(dateFertilize < today) {
                
                todaysFertilize.push(plant[i]);
                plantNameFertilize.push(' ' + plant[i]['name'] + '(' + plant[i]['room'] + ')');
            }
            
            if(plant[i]['flags'] > 0){
                flagged.push(' ' + plant[i]['name'] + '(' + plant[i]['room'] + ')');
            }
        }
        return (
            <div id="notification">
                {flagged.length > 0 && <p>There is {flagged.length} flagged {flagged.length === 1 ? "plant" : "plants"} on campus: {flagged.toString()}</p> }
                <p>There is {todaysWater.length === 0 ? "no" : todaysWater.length} {todaysWater.length === 1 ? "plant" : "plants"} that needs to be watered{todaysWater.length === 0 ? '.' : ':'}</p>
                <p>{plantName.toString()}</p>
                <p>There is {todaysFertilize.length === 0 ? "no" : todaysFertilize.length} {todaysFertilize.length === 1 ? "plant" : "plants"} that needs to be fertilized today{todaysFertilize.length === 0 ? '.' : ':'}</p>
                <p>{plantNameFertilize.toString()}</p>
            </div>
        );
    }

    //function for changing the sorting
    change(event){
        this.setState({
            sortType: event.target.value
        });
    }

    render() {
        return (
                <div id="allPlants">
                    {this.context.isGardener &&
                    this.notification(this.state.plants)
                    }
                    <p> {this.state.plants.length} plants are currently on campus.</p>
                    <div id='icon-explain'>
                    <span className='plant-warning' id='warning-count'>1</span> <p>Number of flags on this plant.</p>
                    <img src={waterAlert} alt='Water Alert'/><p>Plant needs water now.</p>
                    <img src={checkIcon} alt='Water Alert'/><p>Plant has been watered today.</p>
                    </div>
                    
                    <p>Sort by:</p>
                    <select onChange = {this.change} value={this.state.sortType} id="plantsort">
                        <option value="nextwater">Next watering</option>
                        <option value="room">Room</option>
                        <option value="nextfertilize">Next fertilizing</option>
                        { this.context.isGardener && 
                            <option value="flag">Flags</option>
                        }
                    </select>
                    <div id="dispPlants">
                        {this.dispPlants(this.state.plants)}
                    </div>
                </div>
            )
        }
}

export default DisplayPlants;