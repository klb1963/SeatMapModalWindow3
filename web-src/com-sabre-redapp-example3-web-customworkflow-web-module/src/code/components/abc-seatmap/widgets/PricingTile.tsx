import * as React from 'react';
import {AirPricingData} from 'sabre-ngv-pricing/response/interfaces/AirPricingData';

export const PricingTile = (data: AirPricingData) : React.ReactElement => {
    return (
        <div className={'sdk-pricing-custom-tile-content'}>
            ABC Seat Map
        </div>
    );
}
