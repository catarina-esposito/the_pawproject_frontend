import { useState } from 'react';
import { Button, Container, Navbar, Icon } from 'react-bulma-components';
import { useMainContext } from '../../shared/context/MainContext';
import ButtonLink from '../ButtonLink/ButtonLink';
import { useHistory } from "react-router-dom";
import './SiteHeader.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../static/images/logo.jpg';


export default function SiteHeader() {
    const { currentUser, handleLogout } = useMainContext();

    const [isActive, setIsActive] = useState(false);

    const history = useHistory();

    const logout = async () => {
        localStorage.removeItem("token");
        handleLogout();
        history.push("/")
    };

    return (
        <Navbar
            fixed="top"
            transparent
            style={{ height: "70px"}}
        >
            <Container className='burgerMenuContainer is-max-desktop'>
                <Navbar.Brand className='burgerLogoImageWrap'>
                    <Navbar.Item >
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
                                    width: '107px',
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
                        <Navbar.Item href="/" style={{color: "antiquewhite"}}>
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
                                                fontWeight: 700,
                                                borderRadius: '6px'
                                            }}
                                            onClick={logout}
                                        >
                                            Log Out
                                        </Button>
                                    </span>
                                ) : (
                                    <div className='loginMenu'>
                                        <ButtonLink
                                            to="/signup"
                                            color="primary"
                                        >
                                            Sign Up
                                        </ButtonLink>

                                        <ButtonLink to="/login">
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
