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
import { MainContext } from "../../shared/context/MainContext";
import "./Pets.css";

const UpdatePet = () => {
    const auth = useContext(MainContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPet, setLoadedPet] = useState();
    const petId = useParams().petId;
    const history = useHistory();

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
            photoURL: {
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
                setLoadedPet(responseData);
                setFormData(
                    {
                        adoptionStatus: {
                            value: responseData.adoptionStatus,
                            isValid: true,
                        },
                        age: {
                            value: responseData.age,
                            isValid: true,
                        },
                        breed: {
                            value: responseData.breed,
                            isValid: true,
                        },
                        description: {
                            value: responseData.description,
                            isValid: true,
                        },
                        name: {
                            value: responseData.name,
                            isValid: true,
                        },
                        photoURL: {
                            value: responseData.photoURL,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) { }
        };
        fetchPet();
    }, [sendRequest, petId, setFormData]);

    const petUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `${baseURL}/pets/update/${petId}`,
                "PUT",
                JSON.stringify({
                    adoptionStatus: formState.inputs.adoptionStatus.value,
                    age: formState.inputs.age.value,
                    breed: formState.inputs.breed.value,
                    description: formState.inputs.description.value,
                    name: formState.inputs.name.value,
                    photoURL: formState.inputs.photoURL.value,
                
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            history.push("/");
        } catch (err) {
            console.log(err);
         }
    };

    return (
        <div>
            {loadedPet && (
                <form className="add-form" onSubmit={petUpdateSubmitHandler}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid name(at least 5 characters)."
                        onInput={inputHandler}
                        initialValue={loadedPet.name}
                        initialValid={true}
                    />
                    <Input
                        id="age"
                        element="input"
                        type="number"
                        label="Age"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid age."
                        onInput={inputHandler}
                        initialValue={loadedPet.age}
                        initialValid={true}
                    />
                    <Input
                        id="adoptionStatus"
                        element="input"
                        type="text"
                        label="Status"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter status."
                        onInput={inputHandler}
                        initialValue={loadedPet.adoptionStatus}
                        initialValid={true}
                    />
                    <Input
                        id="breed"
                        element="input"
                        type="text"
                        label="Breed"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter breed type."
                        onInput={inputHandler}
                        initialValue={loadedPet.breed}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid description."
                        onInput={inputHandler}
                        initialValue={loadedPet.description}
                        initialValid={true}
                    />
                    <Input
                        id="photoURL"
                        element="textarea"
                        label="Photo URL"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid photoURL."
                        onInput={inputHandler}
                        initialValue={loadedPet.photoURL}
                        initialValid={true}
                    />
                    <button className="form-btn" type="submit">
                        UPDATE PET
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdatePet;
