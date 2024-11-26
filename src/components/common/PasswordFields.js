import PasswordValidation from './PasswordValidation';
import TextField from './TextField';

const PasswordFields = () => {
    return (
        <div>
            <TextField
                label="Current Password"
                name="currentPassword"
                type="password"
            />
            <TextField
                label="New Password"
                name="newPassword"
                type="password"
                customErrorComponent={<PasswordValidation />}
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
            />
        </div>
    );
};

export default PasswordFields;
