import { Link } from 'react-router-dom';
import '../../styles/ButtonLink.css';

export default function ButtonLink({
    to,
    children,
    isTopBar = true
}) {
    const className = isTopBar ? 'topBarButtonLink' : 'indexPageButtonLink';
    return (
        <Link to={to}
            className={`button ${className}`}
        >
            {children}
        </Link>
    );
}
