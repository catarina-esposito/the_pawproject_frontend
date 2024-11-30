import PasswordValidation from './PasswordValidation';
import TextField from '../TextField/TextField';

const PasswordFields = () => {
    return (
        <div>
            <TextField
                label="New Password"
                name="password"
                type="password"
                customErrorComponent={<PasswordValidation />}
            />
        </div>
    );
};

export default PasswordFields;
