import { Tile } from 'sabre-ngv-app/app/widgets/drawer/views/elements/Tile';
import { TileOptions } from 'sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import { WithoutFocusOnClick } from 'sabre-ngv-app/app/common/mixins/WithoutFocusOnClick';
import { Initial } from 'sabre-ngv-core/decorators/classes/Initial';
import { Mixin } from 'sabre-ngv-core/decorators/classes/Mixin';
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';

@CssClass('com-sabre-redapp-example3-web-customworkflow-web-module', { overwrite: false })
@Initial<TileOptions>({
    caption: 'ABC Seat Map (SHOPPING)',
    className: 'sdk-seatmap-custom-tile'
})
@Mixin(WithoutFocusOnClick)
export class SeatMapShoppingTile extends Tile<FlightSegment> implements WithoutFocusOnClick {

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        const itinerary = cpa.getShoppingItinerary();
        const flightSegments = itinerary.getFlightSegments();
        const price = itinerary.getPrice();

        const flightNumbers = flightSegments.map(seg => seg.getFlightNumber());
        const segmentInfo = flightNumbers.length > 1
            ? `<div>Segments:<br/>${flightNumbers.join(', ')}</div>`
            : `<div>Segment: ${flightNumbers[0] || 'N/A'}</div>`;

        const priceInfo = `<div>Price: ${price}</div>`;

        this.setDataContent(segmentInfo + priceInfo);
    }

    selfSelectedFareChanged(cpa: FlightSegment): void {
        this.selfDrawerContextModelPropagated(cpa);
    }
}