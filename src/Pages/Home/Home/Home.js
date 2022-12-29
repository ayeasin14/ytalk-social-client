import React from 'react';
import Banner from '../Banner/Banner';
import Details from '../Details/Details';
import Popular from '../Popular/Popular';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Details></Details>
            <Popular></Popular>
        </div>
    );
};

export default Home;