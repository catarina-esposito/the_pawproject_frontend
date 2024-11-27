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
        {/* make this CRUD only available when user is logged in */}
        <hr></hr>
        <a href="">Edit Info</a>
        <br/>
        <a href="">Delete</a>
        {/*  */}
      </div>
    </div>
  );
};

export default Pet;
