import React from 'react';

interface StationsListItemProps {
    stationInfo: any
}

export function StationsListItem(props: StationsListItemProps) {

    return (
        <li key={props.stationInfo.station_id}>
            {props.stationInfo.name}
        </li>
    )
}
