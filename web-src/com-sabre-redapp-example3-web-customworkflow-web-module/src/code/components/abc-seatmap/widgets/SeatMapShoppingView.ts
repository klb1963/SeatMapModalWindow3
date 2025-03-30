import * as React from 'react';
import * as ReactDOM from 'react-dom';  // ✅ Явный импорт ReactDOM
import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { AbstractModel } from 'sabre-ngv-app/app/AbstractModel';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import SeatMapComponentShopping from '../SeatMapComponentShopping';
import { quicketConfig } from '../quicketConfig'; // config с настройками отображения карты
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';
import { Template } from 'sabre-ngv-core/decorators/classes/view/Template';

@CssClass('com-sabre-redapp-example3-web-customworkflow-web-module')
@Template('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
export class SeatMapShoppingView extends AbstractView<AbstractModel> {

    private flightSegments: any[] = [];
    private selectedSegmentIndex: number = 0;

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);

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

        const segments = cpa.getShoppingItinerary().getFlightSegments();
        this.flightSegments = segments.map(segment => {
            const departureDateTime = segment.getDepartureDate();
    
            return {
                id: '001',
                segmentId: segment.getSegmentId(),
                flightNumber: segment.getFlightNumber(),
                origin: segment.getOriginIata(),
                destination: segment.getDestinationIata(),
                airMiles: segment.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN', // Добавление даты
                marketingAirline: segment.getMarketingAirline(),
                cabinClass: 'Economy' // Пример, можно передавать реальные данные
            };
        });

        // Пробуем рендерить React компонент с задержкой, чтобы гарантировать наличие элемента
        this.tryRenderReactComponent();
    }

    tryRenderReactComponent(attempts = 0) {
        const MAX_ATTEMPTS = 10;
        const INTERVAL = 500; // Интервал между попытками (в миллисекундах)

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
        const rootElement = document.getElementById('seatmap-root');
    
        if (rootElement) {
            // Очищаем предыдущий рендер перед тем, как снова отрендерить React компонент
            ReactDOM.unmountComponentAtNode(rootElement);
    
            const data = {
                flightSegments: this.flightSegments,
                selectedSegmentIndex: this.selectedSegmentIndex
            };
    
            ReactDOM.render(
                React.createElement(SeatMapComponentShopping, { config: quicketConfig, data }),
                rootElement
            );
    
            console.log('📌 [SeatMapShoppingView] React Component успешно отрендерен в #seatmap-root.');
        } else {
            console.error('❌ [SeatMapShoppingView] Элемент с id="seatmap-root" не найден при попытке рендеринга.');
        }
    }
}