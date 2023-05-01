import React, {useEffect, useState} from 'react';
import './App.css';
import {Xhr} from "./Utils/Xhr";
import {StationsList} from "./Components/StationsList";
import {Spinner} from "./Components/Spinner";


function App() {
    const [isFetchedStationInfoData, setIsFetchedStationInfoData] = useState(false);
    const [isFetchedStationStatusData, setIsFetchedStationStatusData] = useState(false);
    const [fetchedStationInfoData, setFetchedStationInfoData] = useState(null);
    const [fetchedStationStatusData, setFetchedStationStatusData] = useState(null);

    useEffect(()=> {
        if (!isFetchedStationInfoData && !isFetchedStationStatusData) {
            Xhr.getJson('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', null)
                .then((data)=> {
                    setFetchedStationInfoData(data.data.data);
                    setIsFetchedStationInfoData(true);
                })
            Xhr.getJson('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', null)
                .then((data)=> {
                    setFetchedStationStatusData(data.data.data);
                    setIsFetchedStationStatusData(true);
                })
        }
    },[]);

    const stationsList = isFetchedStationInfoData && isFetchedStationStatusData ? <StationsList info={fetchedStationInfoData} status={fetchedStationStatusData}/> : <Spinner/>

    return (
        <div className="flex flex-col items-center">
            <h1 className="flex text-center text-3xl font-bold underline text-red-600">
                Oslo By Sykkel
            </h1>
            <div className="flex justify-items-center">
                {stationsList}
            </div>

        </div>
    );
}

export default App;
