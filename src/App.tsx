import React, {useEffect, useState} from 'react';
import './App.css';
import {Xhr} from "./Utils/Xhr";
import {StationsList} from "./Components/StationsList";


function App() {
    const [isFetchedData, setIsFetchedData] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(()=> {
        if (!isFetchedData) {
            Xhr.getJson('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', null)
                .then((data)=> {
                    setFetchedData(data.data);
                    setIsFetchedData(true);
                })
        }
    },[]);

    const stationsList = isFetchedData ? <StationsList data={fetchedData}/> : <div>Loading...</div>
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline text-red-600">
                Oslo By Sykkel
            </h1>
            <div>
                {stationsList}
            </div>

        </div>
    );
}

export default App;
