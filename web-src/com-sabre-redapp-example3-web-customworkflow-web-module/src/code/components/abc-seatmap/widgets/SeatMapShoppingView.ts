import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";
import {FlightSegment} from "sabre-ngv-app/app/common/data/flight/FlightSegment";
import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';
import {Template} from 'sabre-ngv-core/decorators/classes/view/Template';

@CssClass('com-sabre-redapp-example3-web-tilewidgets-web-module')
@Template('com-sabre-redapp-example3-web-tilewidgets-web-module:SampleDrawerView')
export class SeatMapShoppingView extends AbstractView<AbstractModel> {

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        const segments = cpa.getShoppingItinerary().getFlightSegments();
        const segmentsData = segments.map(segment => {
            segment.getFlightDetails({ isMachineRequest: false }).always(result => {
                console.log(`Air miles post-details call: ${result?.getAirMiles()}`)
            });

            return {
                segmentId: segment.getSegmentId(),
                flightNumber: segment.getFlightNumber(),
                origin: segment.getOriginIata(),
                destination: segment.getDestinationIata(),
                airMiles: segment.getAirMiles(),
                hiddenStopsCount: segment.getFlightStops()?.length,
            };
        });

        this.getModel().set('data', JSON.stringify(segmentsData, null, 4));
        this.render();
    }
}
