import data from "../../pets_data"

import "./Pets.css";
import Pet from "../components/Pet";

const Pets = () => {
    return (
        <div className="card-group">
            {data.map((pet,i) => <Pet key={i} pet={pet} />)}
        </div>
    );
};

export default Pets;
