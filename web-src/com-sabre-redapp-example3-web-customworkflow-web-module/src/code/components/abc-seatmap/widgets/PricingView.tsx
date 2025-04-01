import * as React from 'react';
import { useEffect } from 'react';
import { AirPricingData } from 'sabre-ngv-pricing/response/interfaces/AirPricingData';
import { showSeatMapPricingModal } from '../../../components/abc-seatmap/showSeatMapPricingModal';

export const PricingView = (data: AirPricingData) : React.ReactElement => {
    useEffect(() => {
        console.log('🚀 PricingView data:', data); // Лог для отладки
        showSeatMapPricingModal(data); // Вызов функции показа модального окна c данными (data)
    }, []);

    return (
        <div className={'sdk-pricing-custom-tile-content'}>
            <p>Открываем SeatMap Viewer...</p>
        </div>
    );
}