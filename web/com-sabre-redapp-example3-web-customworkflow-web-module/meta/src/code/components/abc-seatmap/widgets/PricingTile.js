"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTile = void 0;
var React = require("react");
var showSeatMapPricingModal_1 = require("../../../components/abc-seatmap/showSeatMapPricingModal");
var PricingTile = function (data) {
    var handleClick = function () {
        console.log('🔘 Клик по кнопке SeatMaps ABC 360 в PricingTile');
        (0, showSeatMapPricingModal_1.showSeatMapPricingModal)(); // Вызов модального окна
    };
    // 📦 Формируем подпись с сегментами (origin-destination:airline flightNo ...)
    var segmentLabel = '';
    try {
        var raw = window.sessionStorage.getItem('flightSegmentsForPricing');
        var segments = raw ? JSON.parse(raw) : [];
        segmentLabel = segments.map(function (segment) {
            return segment.origin + "-" + segment.destination + ":" + segment.marketingAirline + " " + segment.flightNumber;
        }).join(' ');
    }
    catch (e) {
        console.error('⚠️ Ошибка при извлечении flightSegmentsForPricing в PricingTile:', e);
        segmentLabel = 'ABC Seat Map';
    }
    return (React.createElement("div", { className: "sdk-pricing-custom-tile-content", style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px'
        } },
        React.createElement("div", { style: { fontSize: '12px', marginBottom: '8px', textAlign: 'center' } }, segmentLabel),
        React.createElement("button", { className: "abc-seatmap-button", onClick: handleClick, style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                backgroundColor: '#2f73bc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
            } }, "SeatMaps ABC 360")));
};
exports.PricingTile = PricingTile;
