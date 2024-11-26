import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <em>Furever Friends</em> <p>Copyright © {currentYear}</p>
    </footer>
  );
};

export default Footer;