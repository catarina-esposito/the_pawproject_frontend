import { Formik, Form } from 'formik';
import { Box, Button } from 'react-bulma-components';
import TextField from '../common/TextField';
import CustomButton from '../common/CustomButton';
import FormHeading from '../common/FormHeading';
import CheckBox from '../common/CheckBox';
import PasswordFields from '../common/PasswordFields';
import * as yup from 'yup';
import { useState } from 'react';
import {baseURL} from '../utils/const';
import { useMainContext } from "../context/MainContext";
import { useNotification } from '../common/SuccessfulNotification';

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
    currentPassword: yup.string().optional(),
    newPassword: yup
        .string()
        .optional()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    confirmPassword: yup
        .string()
        .optional()
        .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
});

const EMPTY_PASSWORD = {
    currentPassword: undefined,
    newPassword: undefined,
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
        { setSubmitting, setFieldError }
    ) => {
        setSubmitting(true);
        try {
            // Users should not be able to change their email atm
            const res = await fetch(`${baseURL}users/${userId}`, {
                body: JSON.stringify({
                    ...formData,
                    email: undefined,
                    ...(changePasswordCheck ? {} : EMPTY_PASSWORD)
                }),
                method: 'PUT',
                mode: 'cors',
                credentials: "include"
            });
            if (res.ok) {
                updateCurrentUser({ ...currentUser, ...formData });
                showNotification(true);
            }
        } catch (err) {
            showNotification(false);
            if (err?.response?.error?.message === 'Incorrect Password') {
                setFieldError('currentPassword', 'Incorrect Password');
            }
            console.error(err);
        }
        setSubmitting(false);
    };

    return (
        <div>
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
                                <FormHeading heading="User" />
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
