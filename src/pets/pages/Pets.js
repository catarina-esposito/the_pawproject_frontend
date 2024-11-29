import React, { useEffect, useState } from "react";
import "./Pets.css";
import PetsList from "../components/PetsList"
import { useHttpClient } from "../../shared/hooks/http-hook";
import { baseURL } from '../../shared/util/const';

const Pets = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPets, setLoadedPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const responseData = await sendRequest(
                    `${baseURL}/pets`
                );
                setLoadedPets(responseData.pets);
            } catch (err) { }
        };
        fetchPets();
    }, [sendRequest]);

    return (
        <div>
            <h1>Available Pets</h1>
            {error && <p className="error">{error}</p>}
            {!isLoading && loadedPets && <PetsList items={loadedPets} />} 
        </div>

    );
};

export default Pets;