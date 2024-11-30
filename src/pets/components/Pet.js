import React from "react";
import { useMainContext } from "../../shared/context/MainContext";
import { NavLink} from "react-router-dom";
import "./Pet.css";

const Pet = ({pet}) => {
  const { currentUser } = useMainContext();
  return (
    <div className="card">
      <div className="card-head">
        <img className="card-img" alt="pet" src={pet.photoURL}></img>
        <div className="card-info">
          <p>{pet.name}</p>
          <p>{pet.breed}</p>
          <p>{pet.age} years old</p>
          <p>{pet.adoptionStatus}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text block-ellipsis">{pet.description}</p>
        <hr></hr>
        
        {currentUser && currentUser.role === 'admin' && (
          <div>
            <hr></hr>
            <NavLink className="link" to={`/pets/${pet.id}`} exact>
              Edit Pet
            </NavLink>
            <br />
            <NavLink className="link" to={`/pets/delete/${pet.id}`} exact>
              Delete Pet
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pet;
