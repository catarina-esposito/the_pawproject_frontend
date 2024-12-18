import React from "react";

import PetCard from "./PetCard";
import "../pages/Pets.css";
import {useLoadEntity} from '../../shared/hooks/http-request-hook';
import { baseURL } from '../../shared/util/const';
import Loader from '../../components/Loader/Loader';


const PetsList = () => {
    const url = `${baseURL}/pets`;
    const { isLoading, data, error } = useLoadEntity(url);

    if (isLoading) {
        return <Loader/>
    };

    if (error) {
        return <></>;
    }

    return (
        <div className="card-group">
             {data?.pets.map(pet => <PetCard pet={pet}/>)}
        </div>
    );
};

export default PetsList;
