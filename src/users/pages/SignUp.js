import React from "react";
import { Block, Button, Card, Content, Heading } from 'react-bulma-components';
import { useHistory, Link } from "react-router-dom";
import { baseURL } from '../../shared/util/const';

import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import Input from "../../components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import './SignUp.css';



const SignUp = () => {
  const history = useHistory(); 

  const { sendRequest } = useHttpClient(); 

  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
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
      const res = await sendRequest(
        `${baseURL}/users/signup`,
        "POST",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/login"); 
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Card className='singInCard'>
      <Card.Content className="form-card-content">
        <Block>
            <Heading>Create an account</Heading>
        </Block>

        <Content>
          <form onSubmit={handleSubmit}>
            <Input
              element="input"
              id="firstName"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="lastName"
              type="text"
              label="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a last name."
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
            <Button.Group align="right" pb={3}>
                <Button
                    color="primary"
                    className="btnSignUp"
                    type="submit"
                    disabled={!formState.isValid}
                >SIGN UP</Button>
            </Button.Group>
          </form>
          <Link to="/login">
              Have an account already?
          </Link>
      </Content>
    </Card.Content>
  </Card>
  );
};

export default SignUp;
