import React from "react";

import Pet from "./Pet";

const PetsList = (props) => {
    if (props.items.length === 0) {
        return (
            <h2>No pets found.</h2>
        );
    }

    return (
        <div className="card-group">
            {props.items.map((pet) => (
                <Pet
                    key={pet._id}
                    id={pet._id}
                    name={pet.name}
                    description={pet.description}
                    adoptionStatus={pet.adoptionStatus}
                    age={pet.age}
                    breed={pet.breed}
                    photoURL={pet.photoURL}
                />
            ))}
        
        </div>
    );
};

export default PetsList;
