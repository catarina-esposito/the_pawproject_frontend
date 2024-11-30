import React from "react";
import { Heading } from 'react-bulma-components';
import PetsList from "../pets/components/PetsList";
import './Home.css';

const Home = () => {
    return (
        <div class="container">
            <main>
                <Heading className="app-main-header">Meet our furry friends!</Heading>
                <PetsList/>
            </main>
        </div>
    );
};

export default Home;