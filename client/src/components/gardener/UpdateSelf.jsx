import React, { Component } from 'react';
import api from '../../api/api';
import { Button } from '@material-ui/core';
import { getUser } from '../../utils/storage';
import { AuthContext } from '../../utils/Auth';

class UsersUpdate extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            id: getUser(),
            name: '',
            surname: '',
            email: '',
            role: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }

    componentDidMount = async () => {
        const id = this.state.id._id;
        const user = await api.getUserById(this.context.generateHeaders(), id);

        this.setState({
            name: user.data.data.name,
            surname: user.data.data.surname,
            email: user.data.data.email,
            role: user.data.data.role
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

    handleUpdateUser = async (event) => {

        event.preventDefault();
        const id = this.state.id._id;
        const { name, surname, email, role } = this.state;
        const payload = { name, surname, email, role };

        
            await api.updateUserById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`User updated successfully!`);
            this.setState({
                name: '',
                surname: '',
                email: ''
            })
            window.location.href = `/profile`;
        })   
    }

    

    render() {
        const { name, surname, email, role } = this.state;

        return (
            <>
            <h2>Edit user:</h2>
                    <form id="updateSelf" onSubmit={this.handleUpdateUser}>
                        
                        <label>First Name:</label>
                        <input 
                        required
                        type="text" 
                        name="name"
                        value={name}
                        onChange={this.handleInputChange}
                        />

                        <label>Last Name:</label>
                        <input
                        required 
                        type="text" 
                        name="surname" 
                        value={surname}
                        onChange={this.handleInputChange}
                        />

                        {this.context.isManager &&
                        <label>Email: 
                        <input
                        required 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={this.handleInputChange}
                        /> </label> }

                        {this.context.isManager &&
                        <label>
                        Role: 
                        <select required name="role" value={role} onChange={this.handleInputChange}>
                            <option value='gardener'>Gardener</option>
                            <option value='manager'>Manager</option>
                        </select>
                        </label>
                        }
                        <input 
                        type="submit" 
                        value="Update user" 
                        />

                        <Button href={`/profile`} id="cancel">Cancel</Button>
                    </form>
                    </>
        )
    }
}

export default UsersUpdate;