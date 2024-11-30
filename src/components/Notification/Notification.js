import { useEffect, useState } from 'react';
import { Notification } from 'react-bulma-components';
import './Notification.css';

export const useNotification = () => {
    const [isSuccessful, setIsSuccessful] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const [text, setText] = useState('');
    useEffect(() => {
        let timer;
        if (isShown) {
            timer = setTimeout(() => {
                setIsShown(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isShown]);
    return [
        isShown ? (
            isSuccessful ? (
                SuccessfulNotification(text)
            ) : (
                ErrorNotification(text)
            )
        ) : (
            <></>
        ),
        (isSucceed, text = '') => {
            setIsSuccessful(isSucceed);
            setIsShown(true);
            setText(text);
        }
    ];
};

function SuccessfulNotification(text) {
    return (
        <Notification className='globalNotification' color={'success'}>
            {text || 'Saved Successfully.'}
        </Notification>
    );
}

function ErrorNotification(text) {
    return (
        <Notification className='globalNotification' color={'danger'}>
            {text || 'Unexpected error!'}
        </Notification>
    );
}
