import * as React from 'react';
import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { AbstractModel } from 'sabre-ngv-app/app/AbstractModel';
import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import { CssClass } from 'sabre-ngv-core/decorators/classes/view/CssClass';
import { getService } from '../../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import SeatMapComponent from './SeatMapComponent';
import { quicketConfig } from './quicketConfig';
import { getFlightFromSabreData } from './getFlightFromSabreData';

@CssClass('com-sabre-redapp-example3-web-customworkflow-web-module')
export class SeatMapShoppingDrawerView extends AbstractView<AbstractModel> {

  selfDrawerContextModelPropagated(cpa: FlightSegment): void {
    const segment = cpa;

    const sabreData = {
      flightSegments: [this.extractSegment(segment)],
      dateOfFlight: segment.getDepartureDate()?.toISOString().split('T')[0] || '2025-04-21'
    };

    const modalOptions: ReactModalOptions = {
      header: 'SeatMap Viewer (Shopping)',
      component: React.createElement(SeatMapComponent, {
        config: quicketConfig,
        data: sabreData
      }),
      modalClassName: 'react-tile-modal-class'
    };

    getService(PublicModalsService).showReactModal(modalOptions);
  }

  private extractSegment(segment: FlightSegment) {
    return {
      OriginLocation: {
        EncodeDecodeElement: {
          Code: segment.getOriginIata()
        }
      },
      DestinationLocation: {
        EncodeDecodeElement: {
          Code: segment.getDestinationIata()
        }
      },
      DisclosureAirline: {
        EncodeDecodeElement: {
          Code: segment.getMarketingAirline()
        }
      },
      FlightNumber: segment.getFlightNumber(),
      Equipment: {
        EncodeDecodeElement: {
          Code: segment.getEquipmentCode || '388'
        }
      }
    };
  }
}