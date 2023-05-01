import React from 'react';
import {StationsListItem} from "./StationsListItem";

interface StationsListProps {
    data: any,
}

export function StationsList(props: StationsListProps) {
    const stationsList = () => {
        let list
        if (props.data) {
            list = props.data.data.stations.map((singleStation: any) => {
                return <StationsListItem key={singleStation.station_id} stationInfo={singleStation} />
            })
        }
        return list;
    }
    return (
        <>
            <ul>
                {stationsList()}
            </ul>
        </>
    )
}

