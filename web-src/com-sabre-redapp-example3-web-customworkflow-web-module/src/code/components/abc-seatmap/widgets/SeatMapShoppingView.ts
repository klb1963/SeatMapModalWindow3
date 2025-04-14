import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { AbstractModel } from 'sabre-ngv-app/app/AbstractModel';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import SeatMapComponentShopping from '../SeatMapComponentShopping';
import { quicketConfig } from '../quicketConfig';
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';
import { Template } from 'sabre-ngv-core/decorators/classes/view/Template';

@CssClass('com-sabre-redapp-example3-web-customworkflow-web-module')
@Template('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
export class SeatMapShoppingView extends AbstractView<AbstractModel> {
    private currentSegment: FlightSegment | null = null;
    private flightSegments: any[] = [];
    private selectedSegmentIndex: number = 0;

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);

        this.currentSegment = cpa;
        this.updateFlightSegmentsFromSegment(cpa);
        this.tryRenderReactComponent();
    }

    private updateFlightSegmentsFromSegment(segment: FlightSegment): void {
        const segments = segment.getShoppingItinerary().getFlightSegments();

        this.flightSegments = segments.map(s => {
            const departureDateTime = s.getDepartureDate();
            return {
                id: s.getSegmentId(),
                segmentId: s.getSegmentId(),
                flightNumber: s.getFlightNumber(),
                origin: s.getOriginIata(),
                destination: s.getDestinationIata(),
                airMiles: s.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN',
                marketingAirline: s.getMarketingAirline(),
                cabinClass: 'A' // Пример: при необходимости можно вытянуть реально
            };
        });
    }

    tryRenderReactComponent(attempts = 0) {
        const MAX_ATTEMPTS = 10;
        const INTERVAL = 500;
        const rootElement = document.getElementById('seatmap-root');

        if (rootElement) {
            console.log('✅ [SeatMapShoppingView] Элемент seatmap-root найден. Начинаем рендеринг React компонента.');
            this.renderReactComponent();
        } else if (attempts < MAX_ATTEMPTS) {
            console.warn(`⚠️ [SeatMapShoppingView] Элемент seatmap-root не найден. Повторная попытка через ${INTERVAL} мс. Попытка ${attempts + 1}/${MAX_ATTEMPTS}`);
            setTimeout(() => this.tryRenderReactComponent(attempts + 1), INTERVAL);
        } else {
            console.error('❌ [SeatMapShoppingView] Не удалось найти элемент seatmap-root после максимального числа попыток.');
        }
    }

    renderReactComponent() {
        if (!this.currentSegment) {
            console.warn('⚠️ Нет сохранённого сегмента. React компонент не будет отрендерен.');
            return;
        }

        if (!this.flightSegments?.length) {
            console.warn('⚠️ flightSegments пуст. Переинициализация из текущего сегмента.');
            this.updateFlightSegmentsFromSegment(this.currentSegment);
        }

        let rootElement = document.getElementById('seatmap-root');

        if (rootElement) {
            ReactDOM.unmountComponentAtNode(rootElement);
            rootElement.innerHTML = '';
        } else {
            rootElement = document.createElement('div');
            rootElement.id = 'seatmap-root';
            document.body.appendChild(rootElement);
        }

        const data = {
            flightSegments: this.flightSegments,
            selectedSegmentIndex: this.selectedSegmentIndex
        };

        ReactDOM.render(
            React.createElement(SeatMapComponentShopping, { config: quicketConfig, data }),
            rootElement
        );

        console.log('📌 [SeatMapShoppingView] React Component успешно отрендерен в #seatmap-root.');
    }
}


        // // 🔨 Хардкодим данные для проверки
        // const flightData = {
        //     airlineCode: 'LH',
        //     flightNo: '123',
        //     departureDate: '2025-04-22',
        //     departure: 'MUC',
        //     arrival: 'FRA'
        // };
        // console.log('📌 [SeatMapShoppingView] Hardcoded flight data:', flightData);
        // this.flightSegments = [flightData];
        // this.selectedSegmentIndex = 0;