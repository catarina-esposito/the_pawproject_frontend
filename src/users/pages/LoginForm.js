import { Formik, Form, ErrorMessage } from 'formik';
import { Block, Button, Card, Columns, Content , Heading} from 'react-bulma-components';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import TextField from '../../components/TextField/TextField';
import { useMainContext } from '../../shared/context/MainContext';
import CustomButton from '../../components/CustomButton/CustomButton';
import { baseURL } from '../../shared/util/const';
import { useNotification } from '../../components/Notification/Notification';


const SIGN_IN_SCHEMA = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

const Login = () => {
    const { handleLogin } = useMainContext();
    const [notification, showNotification] = useNotification();

    const history = useHistory();
    const initialFormValues = {
        email: '',
        password: ''
    };

    const handleSignIn = async (data, { setSubmitting, setFieldError }) => {
        setSubmitting(true); // Disabled submit button
        try {
            const res = await fetch(`${baseURL}/users/login`, {
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
              localStorage.setItem("token", JSON.stringify({"id": userData.id, "token": userData.token}))
              handleLogin(userData);
              history.push(`/users`);
              return;
            }
            showNotification(false);
        } catch (err) {
            setFieldError(
                'password',
                "Oops! We couldn't find an account with that data. Please make sure you've entered it correctly."
            );
        }

        setSubmitting(false); // Enable submit button
    };

    return (
      <div>
        {notification}
        <Card style={{width: "550px", margin: "10em auto"}} >
            <Card.Content>
                <Block>
                    <Heading>Log In</Heading>
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
                                     <p>
                                            Not a member?{' '}
                                            <Button
                                                color="link"
                                                onClick={() => history.push('/signup')}
                                            >
                                                Create an account
                                            </Button>
                                        </p>
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

export default Login;