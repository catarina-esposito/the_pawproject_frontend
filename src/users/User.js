import { useState } from 'react';
import * as yup from 'yup';

import { Formik, Form } from 'formik';
import { Box, Button, Heading } from 'react-bulma-components';
import TextField from '../components/TextField/TextField';
import CustomButton from '../components/CustomButton/CustomButton';
import CheckBox from '../components/CheckBox/CheckBox';
import PasswordFields from '../components/PasswordField/PasswordField';
import { useNotification } from '../components/Notification/Notification';

import { baseURL } from '../shared/util/const';
import { useMainContext } from '../shared/context/MainContext';


const UPDATE_USER_INFORMATION_SCHEMA = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required!')
        .min(2, 'Must be at least 2 characters')
        .max(20, 'Must be less  than 20 characters')
        .matches(/^[a-zA-Z0-9 ]+$/, 'Cannot contain special characters'),
    lastName: yup
        .string()
        .required('Last name is required!')
        .min(2, 'Must be at least 2 characters')
        .max(20, 'Must be less  than 20 characters')
        .matches(/^[a-zA-Z0-9 ]+$/, 'Cannot contain special characters'),
    password: yup
        .string()
        .optional()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
});

const EMPTY_PASSWORD = {
    password: undefined,
    confirmPassword: undefined
};

const UserInfoForm = () => {
    let userId =  undefined;
    const [changePasswordCheck, setChangePasswordCheck] = useState(false);
    const [notification, showNotification] = useNotification();
    const { currentUser, updateCurrentUser } = useMainContext();
    if (currentUser) {
        userId = currentUser.id;
    }

    const handleUserInfoUpdate = async (
        formData,
        { setSubmitting }
    ) => {
        let token = JSON.parse(localStorage.getItem("token"))
        setSubmitting(true);
        try {
            // Users should not be able to change their email atm
            const res = await fetch(`${baseURL}/users/${userId}`, {
                body: JSON.stringify({
                    ...formData,
                    email: undefined,
                    ...(changePasswordCheck ? {} : EMPTY_PASSWORD)
                }),
                method: 'PUT',
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token.token}`
                }
            });
            if (res.ok) {
                updateCurrentUser({ ...currentUser, ...formData });
                showNotification(true);
            }
        } catch (err) {
            showNotification(false);
            console.error(err);
        }
        setSubmitting(false);
    };

    return (
        <div >
            {notification}
            {currentUser && (
                <Formik
                    initialValues={currentUser}
                    onSubmit={handleUserInfoUpdate}
                    validationSchema={UPDATE_USER_INFORMATION_SCHEMA}
                >
                    {({ isSubmitting, values }) => {
                        return (
                            <Box style={{ borderRadius: '16px', margin: '2ex' }}>
                                <Heading className='addHeading'>User</Heading>
                                <Form>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={values.email}
                                        disabled={true}
                                    />
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={values.firstName}
                                    />
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                    />
                                    <CheckBox
                                        checked={changePasswordCheck}
                                        label="Change Password"
                                        onChange={(e) => {
                                            setChangePasswordCheck(
                                                e.target.checked
                                            );
                                        }}
                                    />
                                    <div
                                        style={{ paddingBottom: '16px' }}
                                    ></div>
                                    {changePasswordCheck ? (
                                        <PasswordFields />
                                    ) : undefined}
                                    <Button.Group align="right">
                                        <CustomButton
                                            disabled={isSubmitting}
                                            buttonLabel="Save"
                                        />
                                    </Button.Group>
                                </Form>
                            </Box>
                        );
                    }}
                </Formik>
            )}
        </div>
    );
};

export default UserInfoForm;