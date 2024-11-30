import { Button } from 'react-bulma-components';

export default function CustomButton({
    disabled,
    color = 'primary',
    type = 'submit',
    buttonLabel,
    onClick,
}) {
    return (
        <Button
            className='addCustomButton.addCustomButton'
            disabled={disabled}
            color={color}
            type={type}
            onClick={onClick}
        >
            {buttonLabel}
        </Button>
    );
}
