import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { AbstractModel } from 'sabre-ngv-app/app/AbstractModel';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';
import { Template } from 'sabre-ngv-core/decorators/classes/view/Template';
import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
import { showSeatMapModal } from '../showSeatMapModal';


@CssClass('com-sabre-redapp-example3-web-customworkflow-web-module')
@Template('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
export class SeatMapShoppingView extends AbstractView<AbstractModel> {

    selfDrawerContextModelPropagated(cpa: FlightSegment): void {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);

    const segments = cpa.getShoppingItinerary().getFlightSegments();
    const segmentsData = segments.map(segment => {
        segment.getFlightDetails({ isMachineRequest: false }).always(result => {
            console.log(`📌 [SeatMapShoppingView] Air miles post-details call: ${result?.getAirMiles()}`)
        });

        return {
            ArrivalDateTime: '2025-04-01T10:00:00', // Пример данных, замените реальными
            BookingClassAvail: [{ Availability: '9', ResBookDesigCode: 'Y' }],
            ChangeArrivalDateIndicator: '0',
            ChangeDayIndicator: '0',
            ChangeDepartureDateIndicator: '0',
            DepartureDateTime: '2025-04-01T06:00:00', // Пример данных
            ElapsedTime: '0400',
            Equipment: [{ AirEquipType: '737' }],
            FlightNumber: segment.getFlightNumber(),
            MarketingAirline: { Code: segment.getCompanyShortName() || 'XX' },
            OriginLocation: { LocationCode: segment.getOriginIata() || 'XXX' },
            DestinationLocation: { LocationCode: segment.getDestinationIata() || 'XXX' },
            Meal: ['B'],
            MarriageGrp: '',
            OnTimePerformance: '',
            OperatingAirline: { Code: 'XX', FlightNumber: segment.getFlightNumber() },
            SeatsRemaining: { Number: 9, BelowMin: false },
            SmokingAllowed: false,
            StopQuantity: '0',
            CodeShareInd: '',
            FlightSubSegment: []
        };
    });

         // ✅ Создаем объект типа PublicAirAvailabilityData
         const data: PublicAirAvailabilityData = {
            rowRPH: 1,
            flightSegments: segmentsData as any  // Приведение типа, чтобы удовлетворить типизацию
        };

    // ✅ Вызов модального окна
    showSeatMapModal(data); 
    console.log('📌 [SeatMapShoppingView] Render call replaced with showSeatMapModal.');
    }

}