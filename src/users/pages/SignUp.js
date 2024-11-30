import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from '../../shared/util/const';

import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import Input from "../../components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/auth-context";



const SignUp = () => {
  const auth = useContext(AuthContext);
  const history = useHistory(); 

  const { sendRequest } = useHttpClient(); 

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `${baseURL}/users/signup`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.user.id);
      history.push("/login"); 
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          element="input"
          id="name"
          type="text"
          label="Your Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a name."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}

        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <button className="form-btn" type="submit" disabled={!formState.isValid}>
          SIGN UP
        </button>
      </form>
      <div className="switch-container">
        <button className="switch-mode-btn" onClick={() => history.push("/login")}>
          Already a member? Sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;