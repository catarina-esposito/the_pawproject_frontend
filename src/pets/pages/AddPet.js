import React, { useContext, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { baseURL } from '../../shared/util/const';
import "./Pets.css";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hooks";

const AddPet = () => {
  const auth = useContext(AuthContext);
  const { isLoading,  sendRequest  } = useHttpClient();
  const [loadedPet, setLoadedPet] = useState();
  const petId = useParams().petId;

  const [formState, inputHandler] = useForm(
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${baseURL}/pets`,
        "POST",
        JSON.stringify({
          adoptionStatus: formState.inputs.adoptionStatus.value,
          age: formState.inputs.age.value,
          breed: formState.inputs.breed.value,
          description: formState.inputs.description.value,
          name: formState.inputs.name.value,
          photoURL: formState.inputs.image.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) { }
  };

  return (
    <form className="add-form" onSubmit={placeSubmitHandler}>
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
        iid="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <button className="form-btn" type="submit">
        ADD PET
      </button>
    </form>

  );
};

export default AddPet;
