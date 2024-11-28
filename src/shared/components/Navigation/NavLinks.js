import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { MainContext } from "../../context/MainContext";


const NavLinks = (props) => {
    const auth = useContext(MainContext);
    return (
        <ul className="nav-links">
       
        <div className="nav-left">
            <li>
                <NavLink className="link" to="/" exact>
                    Home
                </NavLink>
            </li>
        </div>

        {/* Right-aligned buttons */}
        <div className="nav-right">
            {auth.isLoggedIn && (
                <li>
                    <NavLink className="link" to="/pets/add" exact>
                        Add Pet
                    </NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink className="link" to="/signup" exact>
                        Sign Up
                    </NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink className="link" to="/login" exact>
                        Log In
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <a className="nav-btn" onClick={auth.logout}>
                        Log Out
                    </a>
                </li>
            )}
        </div>
    </ul>
);
};

export default NavLinks;
