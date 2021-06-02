import React, { Component } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';

class PlantsInsert extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            building: '',
            room: '',
            waterschedule: '',
            lastwatered: '',
            fertilizer: '',
            fertilizerschedule: '',
            lastfertilized: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });

    }

    deletePlant(id, name) {
        if(window.confirm(`Do you want to delete the plant ${name} permanently?`)){
            api.deletePlantById(this.context.generateHeaders(), id);
            window.location.reload();
        }
    } 

    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, building, room, waterschedule, lastwatered, fertilizer,  fertilizerschedule, lastfertilized } = this.state;

        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, fertilizerschedule, lastfertilized };

        if(this.validateInput() === 'fillAllFields'){
            window.alert('Please fill out all the input fields.');
        }
        else if(this.validateInput() === 'valid'){
            await api.insertPlant(this.context.generateHeaders(), payload)
            .then(res => {
                if(res.status === 201){
                window.alert(`Plant inserted successfully!`)
                
                    this.setState({
                        name: '',
                        building: '',
                        room: '',
                        waterschedule: '',
                        lastwatered: '',
                        fertilizer: '',
                        fertilizerschedule: '',
                        lastfertilized: ''
                    });
                    window.location.reload();
                }
            })
            .catch(err => { console.log(err) })
            }
    }

    validateInput(){
        if(!this.state.name || !this.state.building || !this.state.room || !this.state.waterschedule || !this.state.lastwatered || !this.state.fertilizer || !this.state.fertilizerschedule || !this.state.lastfertilized ){
            return 'fillAllFields';
        }
        else{
            return 'valid';
        }
    }

    render() {
        return (
            <>
                <div className='create-user'>
                    <h2>Add Plant</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:
                            <input
                            name='name'
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Plant name'/>
                        </label>

                        <label>Building:
                            <select name='building' value={this.state.building} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
                                <option value='K-bygget'>K-bygget</option>
                                <option value='A-bygget'>A-bygget</option>
                                <option value='G-bygget'>G-bygget</option>
                                <option value='B-bygget'>B-bygget</option>
                                <option value='S-bygget'>S-bygget</option>
                                <option value='H-bygget'>H-bygget</option>
                            </select>
                        </label>

                        <label>Room:
                            <input
                            name='room'
                            value={this.state.room}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Room'/>
                        </label>

                        <label>Water interval in days:
                            <input
                            name='waterschedule'
                            value={this.state.waterschedule}
                            onChange={this.handleInputChange}
                            type='number'
                            />
                        </label>

                        <label>Last watered:
                            <input
                            name='lastwatered'
                            value={this.state.lastwatered}
                            onChange={this.handleInputChange}
                            type='date'
                            placeholder='Last watered'/>
                        </label>

                        <label>Fertilizer:
                            <select name='fertilizer' value={this.state.fertilizer} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
                                <option value='Dirt'>Dirt</option>
                                <option value='Compost'>Compost</option>
                                <option value='Calcium'>Calcium</option>
                            </select>
                        </label>

                        <label>Fertilizing interval in days:
                            <input
                            name='fertilizerschedule'
                            value={this.state.fertilizerschedule}
                            onChange={this.handleInputChange}
                            type='number'
                            />
                        </label>

                        <label>Last fertilized:
                            <input
                            name='lastfertilized'
                            value={this.state.lastfertilized}
                            onChange={this.handleInputChange}
                            type='date'
                            placeholder='Last fertilized'/>
                        </label>

                        <input
                        className='submitButton'
                        type='submit'
                        value='Add plant'
                        />
                    </form>
                </div>
            </>
        );
    }
}

export default PlantsInsert;