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

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        const flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map((segment) => segment.getFlightNumber());
        const segmentsHtml = flightNumbers.length > 1
            ? `<div>Segments:<br />${flightNumbers.join(', ')}</div>`
            : `<div>Segment: ${flightNumbers.join(', ') || 'N/A'}</div>`
        const priceHtml = `<div>Price: ${cpa.getShoppingItinerary().getPrice()}</div>`;

        this.setDataContent(segmentsHtml + priceHtml);
    }

    selfSelectedFareChanged(cpa: FlightSegment): void {
        this.selfDrawerContextModelPropagated(cpa);
    }
}