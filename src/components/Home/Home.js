import React, { useEffect, useState } from 'react';
import data from '../Data/data.json'
import DestinationCard from '../DestinationCard/DestinationCard';
import './Home.css'
const Home = () => {
    const [travel, settravel] = useState([]);
    useEffect(() => {
        settravel(data)
    }, [])
    return (
        <div className="row mt-5 pt-5">
             {travel.map(name => <DestinationCard name={name}></DestinationCard>)}
        </div>
      
    );
};

export default Home;