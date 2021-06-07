import { Link } from "react-router-dom";
import Plantlogo from "../../assets/logo-plant.png";
import ActiveUser from '../misc/activeUser';

//Stateless component used to navigate the different pages
//Sending props from app.js to hide or show certain links in the navbar
function Nav(props) {

    return (
        <nav>
              <h1>Planteskolen</h1>
              <img alt="Plant icon" src={Plantlogo} />
                <ul>
                  <li>
                    <Link to="/">Information</Link>
                  </li>
                  <li>
                    <Link to="/plant-overview">Plant overview</Link>
                  </li>
                  {!props.isAuth && <li>
                    <Link to="/login">Login</Link>
                  </li>}
                  {props.isManager && <li>
                    <Link to="/add-plant">Add plants</Link>
                  </li>}
                  {props.isManager && <li>
                    <Link to="/managerpage" >Users</Link>
                  </li>}
                  {props.isAuth && <li>
                    <Link to="/login" onClick={props.handleLogOut}>Log out</Link>
                  </li>}
                  {props.isAuth &&
                 <ActiveUser />}
                </ul>
              </nav>
    )
}

export default Nav;