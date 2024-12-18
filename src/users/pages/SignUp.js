import { Formik, Form, ErrorMessage } from 'formik';
import { Block, Button, Card, Columns, Content, Heading } from 'react-bulma-components';
import * as yup from 'yup';
import { useHistory, Link } from "react-router-dom";
import TextField from '../../components/TextField/TextField';
import { useNotification } from '../../components/Notification/Notification';
import CustomButton from '../../components/CustomButton/CustomButton';
import { baseURL } from '../../shared/util/const';

const SIGN_UP_SCHEMA = yup.object().shape({
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must only contain numbers")
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .required('Phone number is required'),
});


const SignUp = () => {
  const history = useHistory();
  const [notification, showNotification] = useNotification();

  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  const handleSignUp = async (data, { setSubmitting, setFieldError }) => {
    setSubmitting(true); // Disable submit button
    try {
      const res = await fetch(`${baseURL}/users/signup`, {
        body: JSON.stringify(data),
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const userData = await res.json();
      if (userData && res.ok) {
        showNotification(true, "Account created successfully!");
        history.push(`/login`); // Redirect to login page after successful sign-up
        return;
      }
      showNotification(false, "Failed to create an account. Please try again.");
    } catch (err) {
      setFieldError(
        'email',
        "This email is already in use. Please use another email."
      );
    }
    setSubmitting(false); // Enable submit button
  };

  return (
    <div>
      {notification}
      <Card style={{ width: "550px", margin: "10em auto" }}>
        <Card.Content>
          <Block>
            <Heading>Sign Up</Heading>
          </Block>
          <Content>
            <Formik
              initialValues={initialFormValues}
              onSubmit={handleSignUp}
              validationSchema={SIGN_UP_SCHEMA}
            >
              {({ isSubmitting }) => {
                return (
                  <Form>
                    <TextField
                      label="Name"
                      name="firstName"
                      placeholder="John"
                    />
                     <TextField
                      label="Last name"
                      name="lastName"
                      placeholder="Doe"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      placeholder="john.doe@jwa.ca"
                    />
                    <TextField
                      label="Password"
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      placeholder="1234567890"
                    />
                    <Columns>
                      <Columns.Column>
                        <Button.Group align="right">
                          <ErrorMessage name="authentication" />
                          <CustomButton
                            disabled={isSubmitting}
                            buttonLabel="Sign Up"
                          />
                        </Button.Group>
                      </Columns.Column>
                    </Columns>
                    <Block
                      className={`is-flex is-justify-content-center`}
                    >
                      <Link to='/login'>
                        Already a member?{' '}
                        </Link>
                    </Block>
                  </Form>
                );
              }}
            </Formik>
          </Content>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignUp;
