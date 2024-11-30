import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink} from "react-router-dom";
import "./Pet.css";
import DeletePet from "../pages/DeletePet";

const Pet = ({ pet }) => {
  const auth = useContext(AuthContext);
  return (
    <div className="card">
      <div className="card-head">
        <img className="card-img" src={pet.photoURL}></img>
        <div className="card-info">
          <p>{pet.name}</p>
          <p>{pet.breed}</p>
          <p>{pet.age} years old</p>
          <p>{pet.adoptionStatus}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{pet.description}</p>
        <hr></hr>
        <p>Created by <em>{pet.creator}</em></p>
        {auth.isLoggedIn && (
          <div>
            <hr></hr>
            <NavLink className="link" to={`/pets/${pet.key}`} exact>
              Edit Pet
            </NavLink>
            <br />
            <NavLink className="link" to={`/pets/delete/${pet.key}`} exact>
              Delete Pet
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pet;
