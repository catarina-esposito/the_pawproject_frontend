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
                    <li>
                        <button onClick={auth.logout}>LOGOUT</button>
                    </li>
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
