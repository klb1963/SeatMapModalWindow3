"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapShoppingView = void 0;
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var Template_1 = require("sabre-ngv-core/decorators/classes/view/Template");
var showSeatMapModal_1 = require("../showSeatMapModal");
var SeatMapShoppingView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingView, _super);
    function SeatMapShoppingView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeatMapShoppingView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);
        var segments = cpa.getShoppingItinerary().getFlightSegments();
        var segmentsData = segments.map(function (segment) {
            segment.getFlightDetails({ isMachineRequest: false }).always(function (result) {
                console.log("\uD83D\uDCCC [SeatMapShoppingView] Air miles post-details call: " + (result === null || result === void 0 ? void 0 : result.getAirMiles()));
            });
            return {
                ArrivalDateTime: '2025-04-01T10:00:00',
                BookingClassAvail: [{ Availability: '9', ResBookDesigCode: 'Y' }],
                ChangeArrivalDateIndicator: '0',
                ChangeDayIndicator: '0',
                ChangeDepartureDateIndicator: '0',
                DepartureDateTime: '2025-04-01T06:00:00',
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
        var data = {
            rowRPH: 1,
            flightSegments: segmentsData // Приведение типа, чтобы удовлетворить типизацию
        };
        // ✅ Вызов модального окна
        (0, showSeatMapModal_1.showSeatMapModal)(data);
        console.log('📌 [SeatMapShoppingView] Render call replaced with showSeatMapModal.');
    };
    SeatMapShoppingView = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-customworkflow-web-module'),
        (0, Template_1.Template)('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
    ], SeatMapShoppingView);
    return SeatMapShoppingView;
}(AbstractView_1.AbstractView));
exports.SeatMapShoppingView = SeatMapShoppingView;
