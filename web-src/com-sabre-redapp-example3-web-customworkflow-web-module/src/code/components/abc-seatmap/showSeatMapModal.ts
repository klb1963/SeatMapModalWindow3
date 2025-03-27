import * as React from 'react';
import { getService } from '../../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import SeatMapComponent from './SeatMapComponent';
import { quicketConfig } from './quicketConfig'; // config с настройками отображения карты

import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';

export function showSeatMapModal(data: PublicAirAvailabilityData): void {
  const modalService = getService(PublicModalsService);

  const options: ReactModalOptions = {
    header: 'SeatMap Viewer',
    component: React.createElement(SeatMapComponent, {
      config: quicketConfig,
      data // передаём весь объект типа PublicAirAvailabilityData целиком
    }),
    onHide: () => console.log('[SeatMap Modal] Closed')
  };

  modalService.showReactModal(options);
  
}