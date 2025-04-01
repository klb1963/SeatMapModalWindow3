import * as React from 'react';
import { getService } from '../../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import SeatMapComponentPricing from './SeatMapComponentPricing';
import { quicketConfig } from './quicketConfig'; // config с настройками отображения карты

import { AirPricingData } from 'sabre-ngv-pricing/response/interfaces/AirPricingData';

// data: AirPricingData

export function showSeatMapPricingModal(data: AirPricingData): void {

  const modalService = getService(PublicModalsService); // используем PublicModalsService

  // формируем options для передачи в модальное окно
  const options: ReactModalOptions = {
    header: 'SeatMap Viewer',
    // создаем React-компонент на основе SeatMapComponent
    component: React.createElement(SeatMapComponentPricing, {
      config: quicketConfig,
      data // передаём data - объект типа AirPricingData целиком
    }),
    onHide: () => console.log('[SeatMap Modal] Closed')
  };

  modalService.showReactModal(options); // показываем модальное окно с его options
  
}