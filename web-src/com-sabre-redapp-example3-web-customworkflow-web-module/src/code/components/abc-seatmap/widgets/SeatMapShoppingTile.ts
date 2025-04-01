import {Tile} from 'sabre-ngv-app/app/widgets/drawer/views/elements/Tile';
import {TileOptions} from 'sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions';
import {FlightSegment} from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import {WithoutFocusOnClick} from 'sabre-ngv-app/app/common/mixins/WithoutFocusOnClick';
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {Mixin} from 'sabre-ngv-core/decorators/classes/Mixin';
import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';

@CssClass('com-sabre-redapp-example3-web-tilewidgets-web-module', { overwrite: false })
@Initial<TileOptions>({
    caption: 'ABC SeatMap', // имя tile
    className: 'web-air-shopping-widget-sample'
})
@Mixin(WithoutFocusOnClick)
export class SeatMapShoppingTile extends Tile<FlightSegment> implements WithoutFocusOnClick {

    private uniqueRenderKey = 0; // Добавляем уникальный ключ

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        
        this.uniqueRenderKey++; // Увеличиваем ключ каждый раз при вызове метода

        const flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map((segment) => segment.getFlightNumber());
        const segmentsHtml = flightNumbers.length > 1
            ? `<div style="margin-bottom: 5px; text-align: center;">Segments:<br />${flightNumbers.join(', ')}</div>`
            : `<div style="margin-bottom: 5px; text-align: center;">Segment: ${flightNumbers.join(', ') || 'N/A'}</div>`;
        
        // Добавляем кнопку ABC SeatMap
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
                ABC SeatMap
            </button>
        </div>
    `;
        this.setDataContent(segmentsHtml + buttonHtml);
    }

    selfSelectedFareChanged(cpa: FlightSegment): void {
        this.selfDrawerContextModelPropagated(cpa);
    }
}