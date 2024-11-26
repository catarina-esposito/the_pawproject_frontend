import "./Navigation.css";


const Navigation = () => {

  return (
    <nav>
      <a href="#"><img src={process.env.PUBLIC_URL + '/images/logo.jpg'} /></a>
      <a className="link" href="#">Pets</a>
      <a className="link" href="#">About us</a>
      <a className="link" href="#">Log in</a>
    </nav>
  );
};

export default Navigation;
