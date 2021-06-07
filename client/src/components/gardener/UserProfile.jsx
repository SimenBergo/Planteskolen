import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { getUser } from '../../utils/storage';
import { AuthContext } from '../../utils/Auth';

class UserProfile extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            id: getUser(),
            user: [],
            isLoading: false,
        }

        this.dispUser = this.dispUser.bind(this);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getUserById(this.context.generateHeaders(), this.state.id._id).then(user => {
            this.setState({
                user: user.data.data,
                isLoading: false,
            }) 
        })
        this.dispUser();
    }

    //user information to render
    dispUser = () => {
        const me = this.state.user;
           return <div id="me">
                <h5>{me.name} {me.surname}</h5>
                <p>Email: {me.email}</p>
                <p>Role: {me.role}</p>
                <Link to = {`/profile/update`}>
                    <Button
                        id="update"
                        aria-label="update"
                        color="primary"
                        >Update
                    </Button>
                </Link>
            </div>
    }

    render() {
        return (
                <section id="myProfile">
                    <h2>Your profile</h2>
                    <div id="dispUsers">
                    {this.dispUser()}
                    </div>
                </section>
                
        )
    }

}

export default UserProfile;