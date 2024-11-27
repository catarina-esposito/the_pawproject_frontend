import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";


const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink className="link" to="/" exact>
                    Home
                </NavLink> 
                {auth.isLoggedIn && (
                    <NavLink className="link" to="/pets/add" exact>
                       Add Pet
                    </NavLink>
                )}
                {auth.isLoggedIn && (
                    <a className="nav-btn" onClick={auth.logout}>Log out</a>
                )}
                {!auth.isLoggedIn && (
                    <NavLink className="link" to="/login" exact>
                        Log in
                    </NavLink>
                )}
            </li>
        </ul>
    );
};

export default NavLinks;
