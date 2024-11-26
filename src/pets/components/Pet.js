import React, { useState, useContext } from "react";


import "./Pet.css";

const Pet = ({ pet }) => {
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
        <p className="card-date">Add date</p>
      </div>
    </div>
  );
};

export default Pet;
