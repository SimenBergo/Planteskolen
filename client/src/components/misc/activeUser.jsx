import { getUser } from '../../utils/storage';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../../api/api'
import { AuthContext } from '../../utils/Auth';

class ActiveUser extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            id: getUser(),
            user: []
        }
    }
    componentDidMount = async ()=> {
        if(!getUser()) {
            return null;
        } else {
            const id = this.state.id._id;
            await api.getUserById(this.context.generateHeaders(),id).then(user => {
                this.setState({
                    user: user.data.data
                })
            })
        }

    }

    render() {
        const me = this.state.user;
        return (
            <div id="activeUser">
                <Link to={`/profile`}>
                <p>{me.name} {me.surname}</p>
                </Link>
            </div>
        )
    }
}

export default ActiveUser;