import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL } from '../../shared/util/const';

import Input from "../../shared/components/FormElements/Input";

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Pets.css";

const UpdatePet = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPet, setLoadedPet] = useState();
    const [file, setFile] = useState(); 
    const petId = useParams().petId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            adoptionStatus: {
                value: "",
                isValid: false,
            },
            age: {
                value: "",
                isValid: false,
            },
            breed: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            name: {
                value: "",
                isValid: false,
            },

        },
        false
    );

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const responseData = await sendRequest(
                    `${baseURL}/pets/${petId}`
                );
                setLoadedPet(responseData.pet);
                setFormData(
                    {
                        adoptionStatus: {
                            value: responseData.pet.adoptionStatus,
                            isValid: true,
                        },
                        age: {
                            value: responseData.pet.age,
                            isValid: true,
                        },
                        breed: {
                            value: responseData.pet.breed,
                            isValid: true,
                        },
                        description: {
                            value: responseData.pet.description,
                            isValid: true,
                        },
                        name: {
                            value: responseData.pet.name,
                            isValid: true,
                        },
                        image: {
                            value: responseData.pet.photoURL, 
                            isValid: true,
                          },
                      
                    },
                    true
                );
            } catch (err) { 
                console.error("Error fetching pet", err);
            }
        }; 
        fetchPet();
    }, [sendRequest, petId, setFormData]);

    const petUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("adoptionStatus", formState.inputs.adoptionStatus.value);
        formData.append("age", formState.inputs.age.value);
        formData.append("breed", formState.inputs.breed.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("name", formState.inputs.name.value);
        if (formState.inputs.image.value) {
            formData.append("photo", formState.inputs.image.value);
        try {
            await sendRequest(
              `${baseURL}/pets/${petId}`,
              "PATCH",
              formData,
              {
                Authorization: "Bearer " + auth.token, 
              }
            );
          } catch (err) {
            console.error("Error updating pet", err);
          }
        };
      
        const fileChangeHandler = (event) => {
          setFile(event.target.files[0]); 
        };

    return (
        <form className="add-form" onSubmit={petUpdateSubmitHandler}>
            <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid name(at least 5 characters)."
                onInput={inputHandler}
            />
            <Input
                id="age"
                element="input"
                type="number"
                label="Age"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid age."
                onInput={inputHandler}
            />
            <Input
                id="adoptionStatus"
                element="input"
                type="text"
                label="Status"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter status."
                onInput={inputHandler}
            />
            <Input
                id="breed"
                element="input"
                type="text"
                label="Breed"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter breed type."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid description."
                onInput={inputHandler}
            />
            <Input
                id="photoURL"
                element="input"
                label="Photo URL"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid photoURL."
                onInput={inputHandler}
            />
            <button className="form-btn" type="submit">
                UPDATE PET
            </button>
        </form>
        
        

    );
};
}

export default UpdatePet;
