import React, {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext/AuthContext";
import {NavLink} from "react-router-dom";
import './NavLinks.css';

const NavLinks = (props) =>{
    const authData = useContext(AuthContext);
    return(
        <ul className="nav-links">
           <li>
               <NavLink to="/" exact >All Users</NavLink>
           </li>
           {authData.isLoggedIn &&
            <React.Fragment>
                <li>
                    <NavLink to={`/${authData.userId}/places`}>My Places</NavLink>
                </li>
                <li>
                    <NavLink to="/places/new">Add Place</NavLink>
                </li>
                <li>
                    <button onClick={authData.logout}>Logout</button>
                </li>
            </React.Fragment>
           }
           {!authData.isLoggedIn &&
                <li>
                    <NavLink to="/auth">Login/Sign-Up</NavLink>
                </li>
            }
        </ul>
    );
};

export default NavLinks;