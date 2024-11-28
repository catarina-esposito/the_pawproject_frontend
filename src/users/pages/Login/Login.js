import "./Login.css";
import { baseURL } from '../../../shared/util/const';

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../../shared/util/validator";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hooks";
import { MainContext } from "../../../shared/context/MainContext";


const Login = () => {
    const auth = useContext(MainContext);
    const history = useHistory();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
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

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    `${baseURL}/users/login`,
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                auth.login(responseData.user.id);
                history.push("/dashboard");
            } catch (err) { 
                console.error("Login failed:", err);
            }
        } else {
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
                history.push("/dashboard");
            } catch (err) { 
                console.error("Signup failed:", err);
            }
        }
    };
    return (
        <div>
            <form className="login-form " onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
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
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </button>
            </form>
            <div className="switch-container">
                <button className="switch-mode-btn" onClick={switchModeHandler}>
                    {isLoginMode ? "Already a member? Sign in" : "Not a member? Sign up"}
                </button>
            {error && <p className="error-message">{error}</p>}
            {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Login;
