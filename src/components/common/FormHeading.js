import { Heading } from 'react-bulma-components';
import '../../styles/BusinessHeading.css';

export default function FormHeading({ heading, subheading, styles }) {
    return (
        <>
            <Heading className='addHeading'>{heading}</Heading>
            {subheading ? (
                <h3
                    className='addSubHeading'
                    mt={2}
                    pb={2}
                    {...styles}
                >
                    {subheading}
                </h3>
            ) : (
                <div className='addSubHeading' {...styles}></div>
            )}
        </>
    );
}
