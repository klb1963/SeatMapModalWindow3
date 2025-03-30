import * as React from 'react';
import { getService } from '../../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import SeatMapComponent from './SeatMapComponentAvail';
import { quicketConfig } from './quicketConfig'; // config с настройками отображения карты

interface SeatMapShoppingData {
    flightSegments: any[];  // Можно заменить на конкретный тип, если известен
}

export function showSeatMapShoppingModal(data: SeatMapShoppingData): void {

    const modalService = getService(PublicModalsService); // используем PublicModalsService

    if (!modalService || typeof modalService.showReactModal !== 'function') {
        console.error('❌ [showSeatMapShoppingModal] PublicModalsService not available or not configured properly.');
        return;
    }

     // 📌 Закрыть все предыдущие модальные окна перед открытием нового
     try {
        modalService.closeReactModal();
        console.log('📌 [showSeatMapShoppingModal] All previous modals closed.');
    } catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error hiding modals:', error);
    }

    // формируем options для передачи в модальное окно
    const options: ReactModalOptions = {
        header: 'ABC SeatMap Shopping Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponent, {
            config: quicketConfig,
            data: data
        }),
        onHide: () => console.log('[SeatMap Shopping Modal] Closed')
    };

    console.log('📌 [showSeatMapShoppingModal] Modal data:', data);

    // Проверка на доступность метода `showReactModal`
    try {
        modalService.showReactModal(options); // показываем модальное окно с его options
    } catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error showing modal:', error);
    }

}