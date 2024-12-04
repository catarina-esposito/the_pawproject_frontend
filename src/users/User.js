import { Formik, Form, ErrorMessage } from 'formik';
import { Block, Button, Card, Columns, Content, Heading } from 'react-bulma-components';
import * as yup from 'yup';
import { useNotification } from '../components/Notification/Notification';
import TextField from '../components/TextField/TextField';
import CustomButton from '../components/CustomButton/CustomButton';
import CheckBox from '../components/CheckBox/CheckBox';
import PasswordFields from '../components/PasswordField/PasswordField';
import { baseURL } from '../shared/util/const';
import React, { useState } from 'react';

import { useMainContext } from '../shared/context/MainContext';

const UPDATE_USER_INFORMATION_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required!')
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be less than 20 characters')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Cannot contain special characters'),
  lastName: yup
    .string()
    .required('Last name is required!')
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be less than 20 characters')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Cannot contain special characters'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must only contain numbers')
    .min(10, 'Phone number must be at least 10 digits')
    .optional(),
  password: yup
    .string()
    .optional()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, one lowercase, one number, and one special character'
    ),
});

const UserInfoForm = () => {
  const { currentUser, updateCurrentUser } = useMainContext();
  const [notification, showNotification] = useNotification();
  const [changePasswordCheck, setChangePasswordCheck] = useState(false);

  const handleUserInfoUpdate = async (formData, { setSubmitting }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    setSubmitting(true);

    try {
      const res = await fetch(`${baseURL}/users/${currentUser.id}`, {
        body: JSON.stringify({
          ...formData,
          email: undefined,
          password: changePasswordCheck ? formData.password : undefined,
        }),
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.token}`,
        },
      });

      if (res.ok) {
        updateCurrentUser({ ...currentUser, ...formData });
        showNotification(true, 'User information updated successfully!');
      } else {
        showNotification(false, 'Failed to update user information.');
      }
    } catch (err) {
      console.error(err);
      showNotification(false, 'An error occurred while updating the information.');
    }

    setSubmitting(false);
  };

  return (
    <div>
      {notification}
      {currentUser && (
        <Card style={{ width: '550px', margin: '10em auto' }}>
          <Card.Content>
            <Block>
              <Heading>User Information</Heading>
            </Block>
            <Content>
              <Formik
                initialValues={{
                  firstName: currentUser.firstName || '',
                  lastName: currentUser.lastName || '',
                  phoneNumber: currentUser.phoneNumber || '',
                  email: currentUser.email || '',
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={handleUserInfoUpdate}
                validationSchema={UPDATE_USER_INFORMATION_SCHEMA}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <TextField label="First Name" name="firstName" />
                    <TextField label="Last Name" name="lastName" />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      placeholder="1234567890"
                    />
                     <TextField
                      label="Email"
                      name="email"
                      disabled={true}
                    />
                    <CheckBox
                      checked={changePasswordCheck}
                      label="Change Password"
                      onChange={(e) => setChangePasswordCheck(e.target.checked)}
                    />
                    {changePasswordCheck && <PasswordFields />}
                    <Columns>
                      <Columns.Column>
                        <Button.Group align="right">
                          <CustomButton
                            disabled={isSubmitting}
                            buttonLabel="Save Changes"
                          />
                        </Button.Group>
                      </Columns.Column>
                    </Columns>
                  </Form>
                )}
              </Formik>
            </Content>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default UserInfoForm;
