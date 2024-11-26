import { useState } from 'react';
import { Button, Container, Navbar, Icon, Image } from 'react-bulma-components';
import { useMainContext } from '../context/MainContext';
import ButtonLink from '../common/ButtonLink';
import { useHistory } from "react-router-dom";
import '../../styles/BurgerMenu.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../static/icon.JPG';

export default function Header() {
    const { currentUser, setCurrentUser } = useMainContext();

    const [isActive, setIsActive] = useState(false);

    const history = useHistory();

    const handleLogout = () => {
        setCurrentUser(null);
        fetch('/signout')
            .then(() => {
                history.push('/');
            })
            .catch(() => console.log('Logout failed'));
    };
    const getHomeLink = (user) => {
        if (!user) {
            return '/';
        }
        return '/users';
    };

    return (
        <Navbar
            fixed="top"
            transparent
            style={{backgroundColor: '#e5d6b8', height: "70px", overflow: "hidden"}}
        >
            <Container className='burgerMenuContainer'>
                <Navbar.Brand className='burgerLogoImageWrap'>
                    <Navbar.Item className='burgerLogoImage'>
                        <figure
                            onClick={() =>
                                history.push("/")
                            }
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    objectFit: 'cover',
                                    width: '56px',
                                    height: '55px',
                                    maxHeight: "100%"
                                }}
                            />
                        </figure>
                    </Navbar.Item>
                    <Navbar.Burger
                        className={isActive ? 'is-active' : null}
                        onClick={() => setIsActive((prevVal) => !prevVal)}
                    />
                </Navbar.Brand>

                <Navbar.Menu className={isActive ? 'is-active' : null}>
                    <Navbar.Container className='subBurgerMenu'>
                        <Navbar.Item href="/">
                            HOME
                        </Navbar.Item>
                    </Navbar.Container>
                    <Navbar.Container align="end">
                        <Navbar.Item renderAs="div">
                            <Button.Group>
                                {currentUser ? (
                                    <span className='logoutMenu'>
                                        <Button
                                            aria-label="account"
                                            className='accountIconButton'
                                            onClick={() =>
                                                history.push('/users')
                                            }
                                        >
                                            <Icon
                                                desktop={{ size: 'narrow' }}
                                                align="right"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    style={{
                                                        verticalAlign: 'bottom',
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />
                                            </Icon>
                                        </Button>
                                        <Button
                                            color="light"
                                            style={{
                                                fontFamily: 'Montserrat',
                                                fontWeight: 700,
                                                borderRadius: '6px'
                                            }}
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </Button>
                                    </span>
                                ) : (
                                    <div className='loginMenu'>
                                        <ButtonLink
                                            to="/sign-up"
                                            color="primary"
                                        >
                                            Sign Up
                                        </ButtonLink>

                                        <ButtonLink to="login">
                                            Log In
                                        </ButtonLink>
                                    </div>
                                )}
                            </Button.Group>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Container>
        </Navbar>
    );
}
