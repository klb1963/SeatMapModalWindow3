import * as React from 'react';
import { useEffect } from 'react';
import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
import { showSeatMapModal } from '../../../components/abc-seatmap/showSeatMapModal';

export const SeatMapAvailView = (data: PublicAirAvailabilityData): React.ReactElement => {
    useEffect(() => {
      console.log('🚀 SeatMapAvailView data:', data); // лог в онсоль
      showSeatMapModal(data); // показываем модальное окно
    }, []);
  
    return (
      <div className={'sdk-seatmap-custom-tile-content'}>
        <p>Открываем SeatMap Viewer...</p>
      </div>
    );
  };