"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapPricingModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentPricing_1 = require("./SeatMapComponentPricing");
var quicketConfig_1 = require("./quicketConfig"); // config с настройками отображения карты
// data: AirPricingData
function showSeatMapPricingModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    // формируем options для передачи в модальное окно
    var options = {
        header: 'SeatMap Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentPricing_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data // передаём data - объект типа AirPricingData целиком
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options); // показываем модальное окно с его options
}
exports.showSeatMapPricingModal = showSeatMapPricingModal;
