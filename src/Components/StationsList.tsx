import React from 'react';
import {StationsListItem} from "./StationsListItem";
import {ValuesToDisplay} from "../App";

interface StationsListProps {
    info: any,
    status: any,
}
interface StationsListItem {
    id: string,
    name: string,
    capacity: number,
    availableVehicles: number | null,
}

export enum headers {
    stationName = 'Stativnavn',
    capacity = 'Kapasitet',
    availableVehicles = 'Tilgjengelige sykkler',
}

export function StationsList(props: StationsListProps) {
    const parsedStationsList = () => {
        const list: any[] = [];
        if (props.info && props.status) {
            props.info.stations.map((singleStation: any)=> {
                let parsedSingleStation: any ={};
                for (let enumValue in ValuesToDisplay) {
                    for (const [key, value] of Object.entries(singleStation)) {
                        if (enumValue === key) {
                            parsedSingleStation[`${key}`] = value;
                        }
                    }
                }
                list.push(parsedSingleStation);

            })
            //find station by id and add available racks
            const {stations} = props.status;
            for(let i= 0; i<list.length; i++) {
                const stationStatus = stations[stations.findIndex((el: any) => el.station_id === list[i][ValuesToDisplay.station_id])];
                for (let enumValue in ValuesToDisplay) {
                    for (const [key, value] of Object.entries(stationStatus)) {
                        if (enumValue === key && !list[i].hasOwnProperty(enumValue)) {
                            const tempListItem = list[i];
                            tempListItem[`${key}`] = value;
                        }
                    }
                }
            }

        }
        return list;
    }
    const list = parsedStationsList();
    const stationsList = list.map(item => {
        return <StationsListItem key={item[ValuesToDisplay.station_id]} stationInfo={item}/>
    })

    return (
        <>
            <div className="flex flex-col my-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {headers.stationName}
                            </th>
                            <th scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {headers.capacity}
                            </th>
                            <th scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {headers.availableVehicles}
                            </th>
                          </tr>
                        </thead>
                          {stationsList}
                      </table>
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}
