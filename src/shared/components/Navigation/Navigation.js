import "./Navigation.css";
import NavLinks from "./NavLinks";


const Navigation = () => {

  return (
    <nav>
      <img className="nav-logo" src={process.env.PUBLIC_URL + '/images/logo.jpg'} />
      <NavLinks />
    </nav>
  );
};

export default Navigation;
