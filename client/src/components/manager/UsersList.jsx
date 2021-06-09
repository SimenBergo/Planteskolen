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
        const users = [];

        //sorting out managers
        for (let i = 0; i < people.length; i++){
                if(people[i]['role'] === "gardener" || people[i]['role'] === "anonymous"){
                    users.push(people[i]);
                }
        }
        //rendering only gardeners and anonymous users
        return users.map((users, index) => {
           return <div id="userCard" key={index}>
                <h5>{users.name} {users.surname}</h5>
                <p>Email: </p>
                <p>{users.email}</p>
                <p>Role: </p>
                <p>{users.role}</p>
                <Link to = {`/manager/update/${users._id}`}>
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
                    onClick={() => this.deleteUser(users._id, users.name + ' ' + users.surname)}
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