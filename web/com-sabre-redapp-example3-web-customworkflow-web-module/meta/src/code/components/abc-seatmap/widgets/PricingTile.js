"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTile = void 0;
var React = require("react");
var PricingTile = function (data) {
    return (React.createElement("div", { className: "sdk-pricing-custom-tile-content", style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' } },
        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' } }, "ABC Seat Map"),
        React.createElement("button", { className: "abc-seatmap-button", style: {
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
            } }, "ABC Seat Map")));
};
exports.PricingTile = PricingTile;
