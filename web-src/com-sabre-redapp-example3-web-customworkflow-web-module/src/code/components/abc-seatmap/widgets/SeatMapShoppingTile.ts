import { Tile } from 'sabre-ngv-app/app/widgets/drawer/views/elements/Tile';
import { TileOptions } from 'sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import { WithoutFocusOnClick } from 'sabre-ngv-app/app/common/mixins/WithoutFocusOnClick';
import { Initial } from 'sabre-ngv-core/decorators/classes/Initial';
import { Mixin } from 'sabre-ngv-core/decorators/classes/Mixin';
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';

@CssClass('com-sabre-redapp-example3-web-tilewidgets-web-module', { overwrite: false })
@Initial<TileOptions>({
    caption: 'SeatMaps ABC 360', // имя tile
    className: 'web-air-shopping-widget-sample'
})
@Mixin(WithoutFocusOnClick)
export class SeatMapShoppingTile extends Tile<FlightSegment> implements WithoutFocusOnClick {

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {

        // 🔍 Добавляем логирование для изучения данных cpa
        console.log('📥 [Shopping] cpa Object:', cpa);
        console.log('📥 [Shopping] Available methods on cpa:', Object.keys(cpa));

        try {
            const shoppingItinerary = cpa.getShoppingItinerary();
            console.log('📥 [Shopping] shoppingItinerary:', shoppingItinerary);

            const flightSegments = shoppingItinerary.getFlightSegments();
            console.log('📥 [Shopping] Flight Segments:', flightSegments);

            // Логируем каждый сегмент отдельно
            flightSegments.forEach((segment, index) => {
                console.log(`📥 [Shopping] Flight Segment ${index}:`, segment);
            });

            // Извлекаем номера рейсов для отображения в Tile
            const flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map((segment) => segment.getFlightNumber());

            const segmentsHtml = flightNumbers.length > 1
                ? `<div style="margin-bottom: 5px; text-align: center;">Segments:<br />${flightNumbers.join(', ')}</div>`
                : `<div style="margin-bottom: 5px; text-align: center;">Segment: ${flightNumbers.join(', ') || 'N/A'}</div>`;

            // Добавляем кнопку SeatMaps ABC 360
            const buttonHtml = `
        <div style="margin-top: 4px; display: flex; justify-content: center;">
            <button class="abc-seatmap-button" style="
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 6px 10px 20px 10px;
                background-color: #2f73bc;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                height: 24px;
            ">
                SeatMaps ABC 360
            </button>
        </div>
    `;
            this.setDataContent(segmentsHtml + buttonHtml);

        } catch (error) {
            console.error('❌ [Shopping] Error retrieving flight segments:', error);
        }
    }
    selfSelectedFareChanged(cpa: FlightSegment): void {
        this.selfDrawerContextModelPropagated(cpa);
    }
}