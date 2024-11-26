import React from "react";
import { Heading } from 'react-bulma-components';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Pets from "./Users/Pets";

const Home = () => {
    return (
        <div class="container">
            <Header />
            <main>
                <Heading style={{display: "flex", width: "100%", justifyContent: "center", position: "sticky"}}>This is our furry friends!</Heading>
                <Pets/>
            </main>
            <Footer />
        </div>
    );
};

export default Home;