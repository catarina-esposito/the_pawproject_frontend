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

const DeletePet = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error } = useHttpClient();
  const { petId } = useParams();
  const history = useHistory();
  
  const deletePetHandler = async () => {
    try {
      await sendRequest(`${baseURL}/pets/${petId}`, "DELETE", null, {
        "Content-Type": "application/json",
      });

      history.push("/pets");
    } catch (err) {
      console.error("Error deleting pet", err);
    }
  };
}