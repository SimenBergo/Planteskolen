import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Mustad from "../../assets/mustad.jpg";
import { AuthContext } from '../../utils/Auth';


class Projectinfo extends Component {
    static contextType = AuthContext;

    render() {
        return (
            <div id="project">
                <h2>Project information</h2>
                <section id="projectInfo">
                    <p>Welcome to the plant watering system for NTNU Gjøvik, 
                        made to take care of all the beautiful plants at the campus.
                    </p>
                    <p>This is a school project made by students Sandra Smaaberg, Simen Bergo, Embla Tyholt Johansen and Kristian Teppan. 
                        The project is a part of both IDG 2100 Full-stack web development and IDG 2671
                        Webproject.
                    </p>
                </section>
                <img id="Mustad" alt="Mustad buildings" src={Mustad}></img>
                {/* hide login button if already logged in */}
                {!this.context.isAuthFunc() && 
                    <>
                    <p><Link to="/login">Login</Link></p>
                    <p>Login details for testing: </p>
                    <p>Email: gardener@test.no</p>
                    <p>Password: gardener1234</p>
                    </>
                }
            </div>
        )
    }
}

export default Projectinfo;
