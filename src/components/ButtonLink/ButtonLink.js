import { Link } from 'react-router-dom';
import './ButtonLink.css';

export default function ButtonLink({
    to,
    children,
}) {
    return (
        <Link to={to}
            className={`button topBarButtonLink`}
        >
            {children}
        </Link>
    );
}
