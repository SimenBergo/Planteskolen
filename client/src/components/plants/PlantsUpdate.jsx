import React, { Component } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { Button } from '@material-ui/core';

class PlantsUpdate extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: '',
            building: '',
            room: '',
            waterschedule: '',
            lastwatered: '',
            fertilizer: '',
            flags: 0,
            fertilizerschedule: '',
            lastfertilized: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdatePlant = this.handleUpdatePlant.bind(this);
    }

    componentDidMount = async () => {
            const { id } = this.state;
            const user = await api.getPlantById(id);
            
            this.setState({
                name: user.data.data.name,
                building: user.data.data.building,
                room: user.data.data.room,
                waterschedule: user.data.data.waterschedule,
                lastwatered: user.data.data.lastwatered,
                fertilizer: user.data.data.fertilizer,
                flags: user.data.data.flags,
                fertilizerschedule: user.data.data.fertilizerschedule,
                lastfertilized: user.data.data.lastfertilized,
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

    handleUpdatePlant = async (event) => {
        event.preventDefault();
        
        const { id, name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized } = this.state;
        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized };
            await api.updatePlantById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`Plant updated successfully!`);
            this.setState({
                name: '',
                building: '',
                room: '',
                waterschedule: '',
                lastwatered: '',
                fertilizer: '',
                flags: 0,
                fertilizerschedule: '',
                lastfertilized: ''
            })
            window.location.href = `/plant-overview`;
        })   
    }

    //function to convert the date format so the calender input form can read it
    convertISOString(ISOString) {
        const date = new Date(ISOString);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return year + '-' + month + '-' + dt;
    }

    render() {
        const { name, building, room, waterschedule, lastwatered, fertilizer, fertilizerschedule, lastfertilized } = this.state;
        
        return (
            <>
            <h2>Edit plant:</h2>
                    <form onSubmit={this.handleUpdatePlant}>

                        {this.context.isManager &&
                        <>
                            <label>Name:</label>
                            <input 
                            required
                            type="text" 
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                            />
                        </>
                        }

                        <label>Building:</label>
                            <select required name='building' value={building} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
                                <option value='K-bygget'>K-bygget</option>
                                <option value='A-bygget'>A-bygget</option>
                                <option value='G-bygget'>G-bygget</option>
                                <option value='B-bygget'>B-bygget</option>
                                <option value='S-bygget'>S-bygget</option>
                                <option value='H-bygget'>H-bygget</option>
                            </select>
                        

                        <label>Room:</label>
                        <input
                        required 
                        type="text" 
                        name="room" 
                        value={room}
                        onChange={this.handleInputChange}
                        />

                        {this.context.isManager &&
                        <>
                            <label>Water interval in days:</label>
                            <input
                            name='waterschedule'
                            value={waterschedule}
                            onChange={this.handleInputChange}
                            type='number'/>
                        </>
                        }

                        {this.context.isManager &&
                        <>
                            <label>Last watered:</label>
                            <input
                            name='lastwatered'
                            value={this.convertISOString(lastwatered)}
                            onChange={this.handleInputChange}
                            type='date'/>
                        </>
                        }

                        {this.context.isManager &&
                        <>
                            <label>Fertilizer:</label>
                            <select name='fertilizer' value={fertilizer} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
                                <option value='Dirt'>Dirt</option>
                                <option value='Compost'>Compost</option>
                                <option value='Calcium'>Calcium</option>
                            </select>
                        </>
                        }

                        {this.context.isManager &&
                        <>
                            <label>Fertilizing interval in days:</label>
                            <input
                            name='fertilizerschedule'
                            value={fertilizerschedule}
                            onChange={this.handleInputChange}
                            type='number'/>
                        </>
                        }

                        {this.context.isManager &&
                        <>
                            <label>Last fertilized:</label>
                            <input
                            name='lastfertilized'
                            value={this.convertISOString(lastfertilized)}
                            onChange={this.handleInputChange}
                            type='date'/>
                        </>
                        }
                        
                        <input className='submit-class' type="submit" value="Update plant" />
                    </form>
                    <Button href={`/plant-overview`} id="cancel">Cancel</Button>
                    </>
        )
    }
}

export default PlantsUpdate;