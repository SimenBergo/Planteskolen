import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { Link } from 'react-router-dom';

class UsersList extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            role: '',
            users: [],
            columns: [],
            isLoading: false,
            
        }
    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.dispUsers();
        await api.getAllUsers(this.context.generateHeaders()).then(users => { 
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    }
    
    deleteUser(id, fullname) {
        if(window.confirm(`Do you want to delete the user ${fullname} permanently?`)){
            api.deleteUserById(this.context.generateHeaders(), id);
            window.location.reload();
        }
    } 


    dispUsers = () => {
        const people = this.state.users;
        const gardeners = [];

        for (let i = 0; i < people.length; i++){
                if(people[i]['role'] === "gardener" || people[i]['role'] === "anonymous"){
                    gardeners.push(people[i]);
                }
        }
        return gardeners.map((gardeners, index) => {
           return <div id="userCard" key={index}>
                <h5>{gardeners.name} {gardeners.surname}</h5>
                <p>Email: </p>
                <p>{gardeners.email}</p>
                <p>Role: </p>
                <p>{gardeners.role}</p>
                <Link to = {`/manager/update/${gardeners._id}`}>
                    <Button
                    id="update"
                    aria-label="update"
                    color="primary"
                    >Update</Button>
                </Link>
                <Button
                    id="delete"
                    aria-label="delete"
                    color="secondary"
                    onClick={() => this.deleteUser(gardeners._id, gardeners.name + ' ' + gardeners.surname)}
                    >Delete user</Button>
            </div>
        })
    }

    render() {
        return (
                <section>
                    <h2>All gardeners & anonymous users</h2>
                    <div id="dispUsers">
                    {this.dispUsers(this.state.users)}
                    </div>
                </section>
            )
        }
}

export default UsersList;