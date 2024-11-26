import { Button } from 'react-bulma-components';
import '../../styles/CustomButton.css';

export default function CustomButton({
    disabled,
    color = 'primary',
    type = 'submit',
    buttonLabel,
    onClick,
    isAddToHighBurg = false,
    styles
}) {
    return (
        <Button
            className={
                styles
                    ? styles
                    : isAddToHighBurg
                    ? 'addCustomButton'
                    : 'button'
            }
            disabled={disabled}
            color={color}
            type={type}
            onClick={onClick}
        >
            {buttonLabel}
        </Button>
    );
}
