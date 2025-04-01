import * as React from 'react';
import {AirPricingData} from 'sabre-ngv-pricing/response/interfaces/AirPricingData';

export const PricingTile = (data: AirPricingData) : React.ReactElement => {
    return (
        <div className="sdk-pricing-custom-tile-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>ABC Seat Map</div>
            <button 
                className="abc-seatmap-button"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 8px',
                    backgroundColor: '#2f73bc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                ABC Seat Map
            </button>
        </div>
    );
}
