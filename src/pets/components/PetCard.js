import React from "react";
import "./Pet.css";
import { Tag, Heading } from 'react-bulma-components';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const PetCard = ({ pet }) => {

  return (
    <div className="card">
      <Link to={`/pet/${pet._id}`}>
        <div className="card-head">
          <img className="card-img" alt="pet" src={pet.photoURL}></img>
          <div className="card-info">
            <Heading renderAs='h2' color='dark'>{pet.name}</Heading>
            <div className="tag-wrapper">
              <Tag size='medium' color='dark'>{pet.breed}</Tag>
              <Tag size='medium' color='dark'>{pet.age} years old</Tag>
            </div>
            <Tag size='large' color={pet.adoptionStatus?.toLowerCase() === 'available' ? 'primary' : 'warning'}>{pet.adoptionStatus}</Tag>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text block-ellipsis">{pet.description}</p>
        </div>
    </Link>
    </div>
  );
};

export default PetCard;
