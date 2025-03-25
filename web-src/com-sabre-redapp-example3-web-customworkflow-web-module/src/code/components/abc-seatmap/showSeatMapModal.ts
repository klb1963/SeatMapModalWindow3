import * as React from 'react';
import { getService } from '../../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import  SeatMapComponent from './SeatMapComponent';

export function showSeatMapModal(): void {
  const modalService = getService(PublicModalsService);

  const options: ReactModalOptions = {
    header: 'SeatMap Viewer',
    component: React.createElement(SeatMapComponent),
    onHide: () => console.log('[SeatMap Modal] Closed')
  };

  modalService.showReactModal(options);
}