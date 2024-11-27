import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import data from "../../pets_data"

import "./Pets.css";
import Pet from "../components/Pet";

const Pets = () => {
    const auth = useContext(AuthContext);

    return (
        <div>
            {auth.isLoggedIn && (
                <button>Add Pet</button>
            )} 
            <div className="card-group">
                {data.map((pet, i) => <Pet key={i} pet={pet} />)}
            </div>
        </div>
    );
};

export default Pets;
