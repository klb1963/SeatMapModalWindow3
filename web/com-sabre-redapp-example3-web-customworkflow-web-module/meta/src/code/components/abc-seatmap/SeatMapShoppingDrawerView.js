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
exports.SeatMapShoppingDrawerView = void 0;
var React = require("react");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponent_1 = require("./SeatMapComponent");
var quicketConfig_1 = require("./quicketConfig");
var SeatMapShoppingDrawerView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingDrawerView, _super);
    function SeatMapShoppingDrawerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeatMapShoppingDrawerView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        var _a;
        var segment = cpa;
        var sabreData = {
            flightSegments: [this.extractSegment(segment)],
            dateOfFlight: ((_a = segment.getDepartureDate()) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0]) || '2025-04-21'
        };
        var modalOptions = {
            header: 'SeatMap Viewer (Shopping)',
            component: React.createElement(SeatMapComponent_1.default, {
                config: quicketConfig_1.quicketConfig,
                data: sabreData
            }),
            modalClassName: 'react-tile-modal-class'
        };
        (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
    };
    SeatMapShoppingDrawerView.prototype.extractSegment = function (segment) {
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
    };
    SeatMapShoppingDrawerView = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-customworkflow-web-module')
    ], SeatMapShoppingDrawerView);
    return SeatMapShoppingDrawerView;
}(AbstractView_1.AbstractView));
exports.SeatMapShoppingDrawerView = SeatMapShoppingDrawerView;
