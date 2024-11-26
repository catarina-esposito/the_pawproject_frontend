import useSWR from "swr";
import {baseURL} from '../utils/const';
import Loader from "../common/Loader";
import Pet from "./Pet";


const fetcher = (url) =>
    fetch(url, {
        mode: 'cors',
        credentials: "include"
    }).then((d) =>
        d.ok ? d.json() : Promise.reject(d)
    );

const Pets = () => {
    const { data, isLoading } = useSWR(`${baseURL}pets`, fetcher);
    if (isLoading) {
        return <Loader/>
    }
    return (
        <div style={{display: "flex", flexWrap: "wrap", gap: "1em"}}>
            {data?.pets.map(pet => <Pet pet={pet}/>)}
        </div>
      );
};

export default Pets;
