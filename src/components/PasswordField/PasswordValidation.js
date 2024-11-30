import React from 'react';
import { Form } from 'react-bulma-components';

const PasswordValidation = React.memo(({ value, error }) => {
    if (!value) {
        return undefined;
    }
    const isUpperCase = /[A-Z]/.test(value);
    const isLowerCase = /[a-z]/.test(value);
    const isSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    const isNumber = /[0-9]/.test(value);

    return (
        <>
            <div>
                <ul style={{ listStyleType: 'none' }}>
                    <li>
                        {isUpperCase
                            ? '✅ Contains at least one uppercase letter'
                            : '❌ Must contain at least one uppercase letter'}
                    </li>
                    <li>
                        {isLowerCase
                            ? '✅ Contains at least one lowercase letter'
                            : '❌ Must contain at least one lowercase letter'}
                    </li>
                    <li>
                        {isNumber
                            ? '✅ Contains at least one number'
                            : '❌ Must contain at least one number'}
                    </li>
                    <li>
                        {isSpecialChar
                            ? '✅ Contains at least one special character'
                            : '❌ Must contain at least one special character'}
                    </li>
                    <li>
                        {value.length >= 8
                            ? '✅ Contains at least 8 characters'
                            : '❌ Must contain at least 8 characters'}
                    </li>
                </ul>
            </div>
            {error &&
            isUpperCase &&
            isLowerCase &&
            isNumber &&
            isSpecialChar &&
            value.length >= 8 ? (
                <Form.Help color="danger" textSize={6}>
                    {error}
                </Form.Help>
            ) : (
                <></>
            )}
        </>
    );
});

export default PasswordValidation;
