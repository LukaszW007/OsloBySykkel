import React from 'react';
import {StationsListItem} from "./StationsListItem";

interface StationsListProps {
    info: any,
    status: any,
}
export enum headers {
    stationName = 'Stativnavn',
    capacity = 'Kapasitet',
    availableVehicles = 'Tilgjengelige  sykler',
}

export function StationsList(props: StationsListProps) {
    const parsedStationsList = () => {
        const list: any[] = [];
        if (props.info && props.status) {
            props.info.stations.map((singleStation: any)=> {
                list.push({
                    id: singleStation.station_id,
                    name: singleStation.name,
                    capacity: singleStation.capacity,
                })
            })
            //find station by id and add available racks
            const {stations} = props.status;
            for(let i= 0; i<list.length; i++) {
                const stationsInfoObject = stations[stations.findIndex((el: any) => el.station_id === list[i].id)]
                const stationObject = {
                    id: list[i].id,
                    name: list[i].name,
                    capacity: list[i].capacity,
                    availableVehicles: stationsInfoObject.num_bikes_available,
                }
                list[i] = stationObject;
            }

        }
        // return <StationsListItem key={singleStation.station_id} stationInfo={singleStation}/>
        return list;
    }
    const list = parsedStationsList();
    const stationsList = list.map(item => {
        return <StationsListItem key={item.id} stationInfo={item}/>
    })

    return (
        <>
            <div className="flex flex-col my-10">
                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
