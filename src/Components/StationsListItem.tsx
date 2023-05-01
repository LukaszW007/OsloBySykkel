import React from 'react';

interface StationsListItemProps {
    stationInfo: any
}

export function StationsListItem(props: StationsListItemProps) {

    const {station_id, name, capacity, lat, lon, address, availableVehicles} = props.stationInfo;

    return (
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="text-gray-200">
            <td className="px-4 py-4 w-40">
              <div className="flex-box items-center">
                <div id="station-name" className="w-full break-words">
                  {name}
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap w-40">
              <div className="flex-box items-center">
                <div id="capacity" className="w-full">
                  {capacity}
                </div>
              </div>
            </td>
              <td className="px-4 py-4 whitespace-nowrap w-40">
              <div className="flex-box items-center">
                <div id="availability" className="w-full">
                  {availableVehicles}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
    )
}
