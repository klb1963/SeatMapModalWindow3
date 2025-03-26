import * as React from 'react';
import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';

export const SeatMapAvailTile = (data: PublicAirAvailabilityData): React.ReactElement => {
    
    // const handleClick = () => {
    //    //  alert("🚀 Modal should open here!"); // Временный тестовый alert вместо showModal
    // };
        // onClick={handleClick}
        
    return (
        <div className={'sdk-seatmap-custom-tile-content'} > 
            <strong>ABC Seat Map</strong>
            <ol>
                {data.flightSegments.map((segment, index) => (
                    <li key={index}>
                        Flight {segment.MarketingAirline.FlightNumber}
                    </li>
                ))}
            </ol>
        </div>
    );
};
















// ========================================= 

// import * as React from 'react';
// import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
// import { getService } from '../../../Context';
// import {ISeatMapService} from 'sabre-ngv-seatmap/services/ISeatMapService';

// export const SeatMapAvailTile = (data: PublicAirAvailabilityData): React.ReactElement => {
//     const handleOpenSeatMap = async (flightSegmentNumber: number) => {
//         console.log(`🛫 Opening Seat Map for segment: ${flightSegmentNumber}`);
    
//         try {
//             const response = await getService(ISeatMapService).openSeatMapForFlightSegment(flightSegmentNumber);
    
//             if (!response.modalOpenedCorrectly) {
//                 console.error(`⚠️ Error opening Seat Map: ${response.errorMessage}`);
//             }
//         } catch (error) {
//             console.error(`❌ Failed to open Seat Map:`, error);
//         }
//     };

//     return (
//         <div className={'sdk-seatmap-custom-tile-content'}>
//             <strong>ABC Seat Map</strong>
//             <ol>
//                 {data.flightSegments.map((segment, index) => (
//                     <li key={index}>
//                         Flight {segment.MarketingAirline.FlightNumber}
//                         <button onClick={() => handleOpenSeatMap(index + 1)}>🪑 Open Seat Map</button>
//                     </li>
//                 ))}
//             </ol>
//         </div>
//     );
// };


