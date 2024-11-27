import data from "../../pets_data"

import "./Pets.css";
import Pet from "../components/Pet";

const Pets = () => {
    return (
        <div>
            <div className="card-group">
                {data.map((pet, i) => <Pet key={i} pet={pet} />)}
            </div>
            {/* make this CRUD only available when user is logged in */}
            <button>Add Pet</button>
            {/*  */}
        </div>
    );
};

export default Pets;
