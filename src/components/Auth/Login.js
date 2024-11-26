import { Formik, Form, ErrorMessage } from 'formik';
import { Block, Button, Card, Columns, Content } from 'react-bulma-components';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import TextField from '../common/TextField';
import { useMainContext } from '../context/MainContext';
import CustomButton from '../common/CustomButton';
import FormHeading from '../common/FormHeading';
import {baseURL} from '../utils/const';


const SIGN_IN_SCHEMA = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

const Login = () => {
    const history = useHistory();
    const { updateCurrentUser } = useMainContext();
    const initialFormValues = {
        email: '',
        password: ''
    };

    const handleSignIn = async (data, { setSubmitting, setFieldError }) => {
        setSubmitting(true); // Disabled submit button
        try {
            console.log(data);
            console.log(`${baseURL}users/login`);
            const res = await fetch(`${baseURL}users/login`, {
                body: JSON.stringify(data),
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const userData = await res.json();
            history.push(`/users/${userData.id}`);
        } catch (err) {
            const {
                data: { error },
                status
            } = err.message;
            if (status === 401) {
                setFieldError(
                    'token',
                    'Something went wrong (Token Validation Error)'
                );
                updateCurrentUser(null);
            }
            if (status >= 500) {
                setFieldError(
                    'password',
                    "Oops! We couldn't find an account with that data. Please make sure you've entered it correctly."
                );
            } else {
                setFieldError(error.name, error.message);
            }
        }

        setSubmitting(false); // Enable submit button
    };

    return (
        <Card >
            <Card.Content>
                <Block>
                    <FormHeading
                        heading="Log In"
                        subheading="to manage your listings & update your data"
                    />
                </Block>
                <Content>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={handleSignIn}
                        validationSchema={SIGN_IN_SCHEMA}
                    >
                        {({ isSubmitting }) => {
                            return (
                                <Form>
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
                                    <Columns>
                                        <Columns.Column>
                                        </Columns.Column>
                                        <Columns.Column>
                                            <Button.Group align="right">
                                                <ErrorMessage name="authentication" />
                                                <CustomButton
                                                    disabled={isSubmitting}
                                                    buttonLabel="Log In"
                                                />
                                            </Button.Group>
                                        </Columns.Column>
                                    </Columns>
                                    <Block
                                        className={`is-flex is-justify-content-center`}
                                    >
                                    </Block>
                                </Form>
                            );
                        }}
                    </Formik>
                </Content>
            </Card.Content>
        </Card>
    );
};

export default Login;
