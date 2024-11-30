import React, { useContext } from "react";
import { MainContext } from "../../shared/context/MainContext";
import { NavLink} from "react-router-dom";
import "./Pet.css";

const Pet = (props) => {
  const auth = useContext(MainContext);
  return (
    <div className="card">
      <div className="card-head">
        <img className="card-img" src={props.photoURL}></img>
        <div className="card-info">
          <p>{props.name}</p>
          <p>{props.breed}</p>
          <p>{props.age} years old</p>
          <p>{props.adoptionStatus}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{props.description}</p>
        <hr></hr>
        <p>Created by <em>{props.creator}</em></p>
        
        {auth.isLoggedIn && (
          <div>
            <hr></hr>
            <NavLink className="link" to={`/pets/${props.id}`} exact>
              Edit Pet
            </NavLink>
            <br />
            <NavLink className="link" to={`/pets/delete/${props.id}`} exact>
              Delete Pet
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pet;
