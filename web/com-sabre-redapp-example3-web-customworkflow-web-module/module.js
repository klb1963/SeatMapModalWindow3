System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightFromSabreData = void 0;
var getFlightFromSabreData = function (data, segmentIndex) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (segmentIndex === void 0) { segmentIndex = 0; }
    var segment = (_a = data.flightSegments) === null || _a === void 0 ? void 0 : _a[segmentIndex];
    if (!segment) {
        console.warn("\u26A0\uFE0F Segment index " + segmentIndex + " not found");
        return {
            id: 'UNKNOWN',
            airlineCode: '',
            flightNo: '',
            departureDate: '',
            departure: '',
            arrival: '',
            cabinClass: ''
        };
    }
    var departureDateTime = segment.DepartureDateTime;
    var departureDate = departureDateTime.split('T')[0]; // Оставляем только дату
    return {
        id: '111',
        airlineCode: (_c = (_b = segment.MarketingAirline) === null || _b === void 0 ? void 0 : _b.EncodeDecodeElement) === null || _c === void 0 ? void 0 : _c.Code,
        flightNo: segment.FlightNumber,
        departureDate: departureDate,
        departure: (_e = (_d = segment.OriginLocation) === null || _d === void 0 ? void 0 : _d.EncodeDecodeElement) === null || _e === void 0 ? void 0 : _e.Code,
        arrival: (_g = (_f = segment.DestinationLocation) === null || _f === void 0 ? void 0 : _f.EncodeDecodeElement) === null || _g === void 0 ? void 0 : _g.Code,
        cabinClass: 'A' // Пока фиксировано, можно расширить
    };
};
exports.getFlightFromSabreData = getFlightFromSabreData;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quicketConfig = void 0;
exports.quicketConfig = {
    width: 400,
    lang: 'EN',
    horizontal: false,
    rightToLeft: false,
    visibleFuselage: true,
    visibleWings: true,
    builtInDeckSelector: true,
    singleDeckMode: true,
    builtInTooltip: true,
    externalPassengerManagement: false,
    tooltipOnHover: false,
    colorTheme: {
        seatLabelColor: 'white',
        seatStrokeColor: 'gray'
    }
};


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var getFlightFromSabreData_1 = require("../abc-seatmap/getFlightFromSabreData");
var SeatMapComponent = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // 🔍 Логим входящие данные
    console.log('🔹 [SeatMapComponent] received props:', { config: config, data: data });
    var flight = (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex); // это рейс с сегментом
    var flightSegments = data.flightSegments || [];
    // 🔍 Логим сформированный flight
    console.log('✈️ [SeatMapComponent] parsed flight:', flight);
    var seatMapData = {
        config: config,
        flight: flight,
        layout: {
            decks: [
                {
                    id: 'main-deck',
                    name: 'Deck 1',
                    width: 600,
                    height: 400,
                    rows: [
                        { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                        { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                    ]
                }
            ]
        },
        availability: [
            { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
            { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
            { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
        ],
        passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
            // можно раскомментировать при необходимости
            // availability: JSON.stringify(seatMapData.availability),
            // passengers: JSON.stringify(seatMapData.passengers)
        };
        console.log('📤 [SeatMapComponent] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        console.log('🛠️ SeatMapComponent mounted');
        console.log("\uD83D\uDD04 Segment index changed: " + segmentIndex);
        sendToIframe(); // отправка при изменении сегмента
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(flight, null, 2))),
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) {
                var _a, _b, _c, _d, _e, _f;
                return (React.createElement("option", { key: index, value: index },
                    ((_b = (_a = segment.MarketingAirline) === null || _a === void 0 ? void 0 : _a.EncodeDecodeElement) === null || _b === void 0 ? void 0 : _b.Code) || 'XX',
                    " ",
                    segment.FlightNumber || '000',
                    "\u00A0\u2192\u00A0",
                    ((_d = (_c = segment.OriginLocation) === null || _c === void 0 ? void 0 : _c.EncodeDecodeElement) === null || _d === void 0 ? void 0 : _d.Code) || '???',
                    " \u2013",
                    ((_f = (_e = segment.DestinationLocation) === null || _e === void 0 ? void 0 : _e.EncodeDecodeElement) === null || _f === void 0 ? void 0 : _f.Code) || '???'));
            }))),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: function () {
                console.log('✅ [SeatMapComponent] iframe loaded, sending data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView", ["react","sabre-ngv-app/app/AbstractView","sabre-ngv-core/decorators/classes/view/CssClass","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponent_1 = require("./SeatMapComponent");
var quicketConfig_1 = require("./quicketConfig"); // config с настройками отображения карты
function showSeatMapModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
    var options = {
        header: 'SeatMap Viewer',
        component: React.createElement(SeatMapComponent_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data // передаём весь объект типа PublicAirAvailabilityData целиком
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options);
}
exports.showSeatMapModal = showSeatMapModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/transformFlight", [], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getFlightFromSabreData=void 0;var getFlightFromSabreData=function(e){var i,o,l,t,d,r,n=null===(i=e.flightSegments)||void 0===i?void 0:i[0];return{id:(null==n?void 0:n.flightNumber)||"UNKNOWN",airlineCode:(null===(o=null==n?void 0:n.DisclosureAirline)||void 0===o?void 0:o.Code)||"LH",flightNo:(null==n?void 0:n.flightNumber)||"410",departureDate:e.dateOfFlight||"2024-04-20",departure:(null===(t=null===(l=null==n?void 0:n.originLocation)||void 0===l?void 0:l.EncodeDecodedElement)||void 0===t?void 0:t.Code)||"MUC",arrival:(null===(r=null===(d=null==n?void 0:n.destinationLocation)||void 0===d?void 0:d.EncodeDecodedElement)||void 0===r?void 0:r.Code)||"JFK",cabinClass:"A"}};exports.getFlightFromSabreData=getFlightFromSabreData;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/transformFlight.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/transformFlight"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/transformFlight"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile", ["react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailTile = void 0;
var React = require("react");
var SeatMapAvailTile = function (data) {
    // const handleClick = () => {
    //    //  alert("🚀 Modal should open here!"); // Временный тестовый alert вместо showModal
    // };
    // onClick={handleClick}
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content' },
        React.createElement("strong", null, "ABC Seat Map"),
        React.createElement("ol", null, data.flightSegments.map(function (segment, index) { return (React.createElement("li", { key: index },
            "Flight ",
            segment.MarketingAirline.FlightNumber)); }))));
};
exports.SeatMapAvailTile = SeatMapAvailTile;
// ========================================= 
// import * as React from 'react';
// import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
// import { getService } from '../../../Context';
// import {ISeatMapService} from 'sabre-ngv-seatmap/services/ISeatMapService';
// export const SeatMapAvailTile = (data: PublicAirAvailabilityData): React.ReactElement => {
//     const handleOpenSeatMap = async (flightSegmentNumber: number) => {
//         console.log(`🛫 Opening Seat Map for segment: ${flightSegmentNumber}`);
//         try {
//             const response = await getService(ISeatMapService).openSeatMapForFlightSegment(flightSegmentNumber);
//             if (!response.modalOpenedCorrectly) {
//                 console.error(`⚠️ Error opening Seat Map: ${response.errorMessage}`);
//             }
//         } catch (error) {
//             console.error(`❌ Failed to open Seat Map:`, error);
//         }
//     };
//     return (
//         <div className={'sdk-seatmap-custom-tile-content'}>
//             <strong>ABC Seat Map</strong>
//             <ol>
//                 {data.flightSegments.map((segment, index) => (
//                     <li key={index}>
//                         Flight {segment.MarketingAirline.FlightNumber}
//                         <button onClick={() => handleOpenSeatMap(index + 1)}>🪑 Open Seat Map</button>
//                     </li>
//                 ))}
//             </ol>
//         </div>
//     );
// };


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailView = void 0;
var React = require("react");
var react_1 = require("react");
var showSeatMapModal_1 = require("../../../components/abc-seatmap/showSeatMapModal");
var SeatMapAvailView = function (data) {
    (0, react_1.useEffect)(function () {
        console.log('🚀 SeatMapAvailView data:', data); // лог в онсоль
        (0, showSeatMapModal_1.showSeatMapModal)(data); // показываем модальное окно
    }, []);
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content' },
        React.createElement("p", null, "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C SeatMap Viewer...")));
};
exports.SeatMapAvailView = SeatMapAvailView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile", ["sabre-ngv-app/app/widgets/drawer/views/elements/Tile","sabre-ngv-app/app/common/mixins/WithoutFocusOnClick","sabre-ngv-core/decorators/classes/Initial","sabre-ngv-core/decorators/classes/Mixin","sabre-ngv-core/decorators/classes/view/CssClass"], false, function (require, exports, module) {
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
exports.SeatMapShoppingTile = void 0;
var Tile_1 = require("sabre-ngv-app/app/widgets/drawer/views/elements/Tile");
var WithoutFocusOnClick_1 = require("sabre-ngv-app/app/common/mixins/WithoutFocusOnClick");
var Initial_1 = require("sabre-ngv-core/decorators/classes/Initial");
var Mixin_1 = require("sabre-ngv-core/decorators/classes/Mixin");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var SeatMapShoppingTile = /** @class */ (function (_super) {
    __extends(SeatMapShoppingTile, _super);
    function SeatMapShoppingTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeatMapShoppingTile.prototype.selfDrawerContextModelPropagated = function (cpa) {
        var itinerary = cpa.getShoppingItinerary();
        var flightSegments = itinerary.getFlightSegments();
        var price = itinerary.getPrice();
        var flightNumbers = flightSegments.map(function (seg) { return seg.getFlightNumber(); });
        var segmentInfo = flightNumbers.length > 1
            ? "<div>Segments:<br/>" + flightNumbers.join(', ') + "</div>"
            : "<div>Segment: " + (flightNumbers[0] || 'N/A') + "</div>";
        var priceInfo = "<div>Price: " + price + "</div>";
        this.setDataContent(segmentInfo + priceInfo);
    };
    SeatMapShoppingTile.prototype.selfSelectedFareChanged = function (cpa) {
        this.selfDrawerContextModelPropagated(cpa);
    };
    SeatMapShoppingTile = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-customworkflow-web-module', { overwrite: false }),
        (0, Initial_1.Initial)({
            caption: 'ABC Seat Map (SHOPPING)',
            className: 'sdk-seatmap-custom-tile'
        }),
        (0, Mixin_1.Mixin)(WithoutFocusOnClick_1.WithoutFocusOnClick)
    ], SeatMapShoppingTile);
    return SeatMapShoppingTile;
}(Tile_1.Tile));
exports.SeatMapShoppingTile = SeatMapShoppingTile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView", ["sabre-ngv-app/app/AbstractView","sabre-ngv-core/decorators/classes/view/CssClass","sabre-ngv-core/decorators/classes/view/Template"], false, function (require, exports, module) {
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
var SeatMapShoppingView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingView, _super);
    function SeatMapShoppingView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeatMapShoppingView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        var segments = cpa.getShoppingItinerary().getFlightSegments();
        var segmentsData = segments.map(function (segment) {
            var _a;
            segment.getFlightDetails({ isMachineRequest: false }).always(function (result) {
                console.log("Air miles post-details call: " + (result === null || result === void 0 ? void 0 : result.getAirMiles()));
            });
            return {
                segmentId: segment.getSegmentId(),
                flightNumber: segment.getFlightNumber(),
                origin: segment.getOriginIata(),
                destination: segment.getDestinationIata(),
                airMiles: segment.getAirMiles(),
                hiddenStopsCount: (_a = segment.getFlightStops()) === null || _a === void 0 ? void 0 : _a.length,
            };
        });
        this.getModel().set('data', JSON.stringify(segmentsData, null, 4));
        this.render();
    };
    SeatMapShoppingView = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-tilewidgets-web-module'),
        (0, Template_1.Template)('com-sabre-redapp-example3-web-tilewidgets-web-module:SampleDrawerView')
    ], SeatMapShoppingView);
    return SeatMapShoppingView;
}(AbstractView_1.AbstractView));
exports.SeatMapShoppingView = SeatMapShoppingView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/actions", ["react-bootstrap","react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.actions=void 0;var react_bootstrap_1=require("react-bootstrap"),React=require("react"),actions=function(t){return[React.createElement(react_bootstrap_1.Button,{key:1,className:"btn-success",onClick:t},"Submit")]};exports.actions=actions;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/actions.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/actions"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/actions"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService", ["react","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/ExternalServiceConnector","com-sabre-redapp-example3-web-customworkflow-web-module/Context","com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/actions","com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/ModalComponent","com-sabre-redapp-example3-web-customworkflow-web-module/reducers/LocalStore"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExternalService = void 0;
var React = require("react");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var ExternalServiceConnector_1 = require("sabre-ngv-app/app/services/impl/ExternalServiceConnector");
var Context_1 = require("../Context");
var actions_1 = require("./externalServiceSubComponents/actions");
var ModalComponent_1 = require("./externalServiceSubComponents/ModalComponent");
var LocalStore_1 = require("../reducers/LocalStore");
var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
var callExternalService = function () {
    var localStore = new LocalStore_1.LocalStore();
    var onSubmit = function () {
        var storeData = localStore.getData();
        var headers = JSON.parse(storeData.headers);
        (0, Context_1.getService)(ExternalServiceConnector_1.ExternalServiceConnector).callService(storeData.url, storeData.method, storeData.body, headers).done(function (response) {
            var responseObject = JSON.parse(response);
            var responseString = JSON.stringify(responseObject, null, 2);
            localStore.store.dispatch({ type: 'SET_PARAMETER', field: 'response', newVal: responseString });
        });
    };
    var onClose = function () {
        modalService.closeReactModal();
    };
    var ngvModalOptions = {
        header: 'ExternalServiceConnector',
        component: React.createElement(ModalComponent_1.ModalComponent),
        onSubmit: onSubmit,
        actions: (0, actions_1.actions)(onClose, onSubmit),
        store: localStore.store
    };
    modalService.showReactModal(ngvModalOptions);
};
exports.callExternalService = callExternalService;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax", ["sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-example3-web-customworkflow-web-module/Context","com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLasLax = void 0;
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../Context");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var callLasLax = function () {
    var interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
    interstitialService.showInterstitial(5000);
    (0, Context_1.cf)('1LASLAX').send().done(function (response) {
        interstitialService.hideInterstitial();
        var hasSignInResponse = response.getDataStructs()
            .filter(function (data) { return data['d.Screen'] && data['d.Screen']['d.Text']; })
            .map(function (data) { return data['d.Screen']['d.Text']; })
            .some(function (data) { return data.includes('SIGN IN'); });
        if (hasSignInResponse) {
            (0, openCustomFormParagraph_1.openCustomFormParagraph)('Error', 'Command failed, not signed in.');
        }
    });
};
exports.callLasLax = callLasLax;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm", ["com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-notification/service/INotificationService"], false, function (require, exports, module) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideNotifications = exports.createNotificationForm = void 0;
var Context_1 = require("../Context");
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var INotificationService_1 = require("sabre-ngv-notification/service/INotificationService");
var notifications = [];
var createNotificationForm = function () { return __awaiter(void 0, void 0, void 0, function () {
    var form, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = {
                    title: 'Notification',
                    fields: [
                        {
                            id: 'title',
                        },
                        {
                            id: 'content',
                        },
                        {
                            id: 'type',
                            type: 'DROPDOWN',
                            items: [
                                {
                                    id: 'None',
                                },
                                {
                                    id: 'Info',
                                },
                                {
                                    id: 'Warning',
                                },
                                {
                                    id: 'Error',
                                },
                                {
                                    id: 'Success',
                                }
                            ]
                        },
                        {
                            id: 'priority',
                            validation: {
                                regex: '^(-?[1-9][0-9]*|0)$',
                            }
                        },
                        {
                            id: 'timeout',
                            label: 'Timeout in ms',
                            validation: {
                                regex: '^([1-9][0-9]*|0)$',
                            }
                        }
                    ],
                    actions: [
                        {
                            id: 'cancel',
                            label: 'Cancel'
                        },
                        {
                            id: 'ok',
                            label: 'Submit'
                        }
                    ]
                };
                return [4 /*yield*/, (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form)];
            case 1:
                result = _a.sent();
                if (result.action === 'ok') {
                    showNotification(result);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createNotificationForm = createNotificationForm;
var showNotification = function (form) {
    var type = form.fields.find(function (field) { return field.id === 'type'; }).value;
    var id = (0, Context_1.getService)(INotificationService_1.INotificationService).showNotification({
        title: form.fields.find(function (field) { return field.id === 'title'; }).value,
        content: form.fields.find(function (field) { return field.id === 'content'; }).value,
        type: type === 'None' ? undefined : type,
        priority: parseInt(form.fields.find(function (field) { return field.id === 'priority'; }).value),
        timeout: parseInt(form.fields.find(function (field) { return field.id === 'timeout'; }).value)
    });
    notifications.push(id);
};
var hideNotifications = function () {
    notifications.forEach(function (id) { return (0, Context_1.getService)(INotificationService_1.INotificationService).hideNotification(id); });
    notifications.length = 0;
};
exports.hideNotifications = hideNotifications;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-example3-web-customworkflow-web-module/Context","com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPnrForm = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var DatesService_1 = require("sabre-ngv-app/app/services/impl/DatesService");
var ICommandMessageService_1 = require("sabre-ngv-commsg/services/ICommandMessageService");
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../Context");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var createPnrForm = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tenDaysAheadFlight, form, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenDaysAheadFlight = '1' + (0, Context_1.getService)(DatesService_1.DatesService).getNow().add(10, 'days').format('DDMMM').toUpperCase() + 'LASLAX\u00A5AA';
                form = {
                    title: 'Create PNR',
                    fields: [
                        {
                            id: 'name',
                            value: '-DOE/JOHN'
                        },
                        {
                            id: 'flight',
                            value: tenDaysAheadFlight
                        },
                        {
                            id: 'ticket',
                            value: '01Y2'
                        },
                        {
                            id: 'agent',
                            label: 'Agent Info',
                            value: '6AGENT'
                        },
                        {
                            id: 'phone',
                            value: '91234567'
                        },
                        {
                            id: 'timeLimit',
                            label: 'Ticketing time limit',
                            value: '7TAW/'
                        }
                    ],
                    actions: [
                        {
                            id: 'cancel',
                            label: 'Cancel'
                        },
                        {
                            id: 'ok',
                            label: 'Submit'
                        }
                    ]
                };
                return [4 /*yield*/, (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form)];
            case 1:
                result = _a.sent();
                if (result.action === 'ok') {
                    selfSubmitPnrAction(result);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createPnrForm = createPnrForm;
var selfSubmitPnrAction = function (form) { return __awaiter(void 0, void 0, void 0, function () {
    var interstitialService, nameRq, flightRq, ticketRq, agentInfoRq, phoneRq, tawRq, nameRsStatus, flightsStatus, _a, ticketRsStatus, _b, agentInfoRsStatus, _c, phoneRsStatus, _d, tawRsStatus, _e, wpRsStatus, _f, pqRsStatus, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
                nameRq = form.fields.find(function (field) { return field.id === 'name'; }).value;
                flightRq = form.fields.find(function (field) { return field.id === 'flight'; }).value;
                ticketRq = form.fields.find(function (field) { return field.id === 'ticket'; }).value;
                agentInfoRq = form.fields.find(function (field) { return field.id === 'agent'; }).value;
                phoneRq = form.fields.find(function (field) { return field.id === 'phone'; }).value;
                tawRq = form.fields.find(function (field) { return field.id === 'timeLimit'; }).value;
                interstitialService.showInterstitial(15000);
                return [4 /*yield*/, sendCommand(nameRq, 'Name')];
            case 1:
                nameRsStatus = _h.sent();
                _a = nameRsStatus;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, sendCommand(flightRq, 'Flight list')];
            case 2:
                _a = (_h.sent());
                _h.label = 3;
            case 3:
                flightsStatus = _a;
                _b = flightsStatus;
                if (!_b) return [3 /*break*/, 5];
                return [4 /*yield*/, sendCommand(ticketRq, 'Ticket')];
            case 4:
                _b = (_h.sent());
                _h.label = 5;
            case 5:
                ticketRsStatus = _b;
                _c = ticketRsStatus;
                if (!_c) return [3 /*break*/, 7];
                return [4 /*yield*/, sendCommand(agentInfoRq, 'agentInfo')];
            case 6:
                _c = (_h.sent());
                _h.label = 7;
            case 7:
                agentInfoRsStatus = _c;
                _d = agentInfoRsStatus;
                if (!_d) return [3 /*break*/, 9];
                return [4 /*yield*/, sendCommand(phoneRq, 'Phone')];
            case 8:
                _d = (_h.sent());
                _h.label = 9;
            case 9:
                phoneRsStatus = _d;
                _e = phoneRsStatus;
                if (!_e) return [3 /*break*/, 11];
                return [4 /*yield*/, sendCommand(tawRq, 'TAW')];
            case 10:
                _e = (_h.sent());
                _h.label = 11;
            case 11:
                tawRsStatus = _e;
                _f = tawRsStatus;
                if (!_f) return [3 /*break*/, 13];
                return [4 /*yield*/, sendCommand('WP', 'WP')];
            case 12:
                _f = (_h.sent());
                _h.label = 13;
            case 13:
                wpRsStatus = _f;
                _g = wpRsStatus;
                if (!_g) return [3 /*break*/, 15];
                return [4 /*yield*/, sendCommand('PQ', 'PQ')];
            case 14:
                _g = (_h.sent());
                _h.label = 15;
            case 15:
                pqRsStatus = _g;
                interstitialService.hideInterstitial();
                pqRsStatus && (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', 'PNR created');
                return [2 /*return*/];
        }
    });
}); };
var sendCommand = function (command, failureSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var rsStatus, isSuccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(command)];
            case 1:
                rsStatus = _a.sent();
                isSuccess = rsStatus.Status.Success;
                if (isSuccess && rsStatus.Status.Messages[0] && rsStatus.Status.Messages[0].Text.includes('SIGN IN')) {
                    isSuccess = false;
                    handleFailure('Command failed, not signed in.');
                }
                else if (!isSuccess) {
                    handleFailure(failureSegment);
                }
                return [2 /*return*/, isSuccess];
        }
    });
}); };
var handleFailure = function (segment) {
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', segment + " creation failed");
};


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/actions", ["react-bootstrap","react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var react_bootstrap_1 = require("react-bootstrap");
var React = require("react");
var actions = function (onClose, onSubmit) { return [
    React.createElement(react_bootstrap_1.Button, { key: 1, className: "btn-secondary", onClick: onClose }, "Close"),
    React.createElement(react_bootstrap_1.Button, { key: 1, className: "btn-success", onClick: onSubmit }, "Submit")
]; };
exports.actions = actions;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/actions.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/actions"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/actions"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/ModalComponent", ["react","react-redux","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalComponent = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var Context_1 = require("../../Context");
var ModalComponentPure = function (props) {
    return (React.createElement("div", { className: 'com-sabre-redapp-example3-web-customworkflow-web-module' },
        React.createElement("div", { className: 'row' },
            React.createElement("div", { className: 'col-xs-6' },
                React.createElement("div", { className: 'url-field form-group' },
                    React.createElement("label", { htmlFor: Context_1.context.getModuleName() + "-url-field" }, "URL"),
                    React.createElement("input", { id: Context_1.context.getModuleName() + "-url-field", className: 'form-control url-field', onChange: function (e) { return props.setUrl(e.target.value); }, value: props.url })),
                React.createElement("div", { className: 'method-field form-group' },
                    React.createElement("label", { htmlFor: Context_1.context.getModuleName() + "-method-field" }, "Method"),
                    React.createElement("input", { id: Context_1.context.getModuleName() + "-method-field", className: 'form-control method-field', onChange: function (e) { return props.setMethod(e.target.value); }, value: props.method })),
                React.createElement("div", { className: 'body-field form-group' },
                    React.createElement("label", { htmlFor: Context_1.context.getModuleName() + "-body-field" }, "Body"),
                    React.createElement("textarea", { id: Context_1.context.getModuleName() + "-body-field", className: 'form-control body-field', onChange: function (e) { return props.setBody(e.target.value); }, value: props.body, rows: 5, cols: 90 })),
                React.createElement("div", { className: 'headers-field form-group' },
                    React.createElement("label", { htmlFor: Context_1.context.getModuleName() + "-headers-field" }, "Headers"),
                    React.createElement("textarea", { id: Context_1.context.getModuleName() + "-headers-field", className: 'form-control headers-field', onChange: function (e) { return props.setHeaders(e.target.value); }, value: props.headers, rows: 10, cols: 90 }))),
            React.createElement("div", { className: 'col-xs-6' },
                React.createElement("div", { className: 'response-field form-group' },
                    React.createElement("label", { htmlFor: Context_1.context.getModuleName() + "-response-field" }, "Response"),
                    React.createElement("textarea", { id: Context_1.context.getModuleName() + "-response-field", className: 'form-control response-field', value: props.response, rows: 30, cols: 90 }))))));
};
function mapStateToProps(state) {
    return state;
}
var mapDispatchToProps = function (dispatch) {
    return {
        setUrl: function (newVal) {
            dispatch({ type: 'SET_PARAMETER', field: 'url', newVal: newVal });
        },
        setMethod: function (newVal) {
            dispatch({ type: 'SET_PARAMETER', field: 'method', newVal: newVal });
        },
        setBody: function (newVal) {
            dispatch({ type: 'SET_PARAMETER', field: 'body', newVal: newVal });
        },
        setHeaders: function (newVal) {
            dispatch({ type: 'SET_PARAMETER', field: 'headers', newVal: newVal });
        }
    };
};
exports.ModalComponent = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(ModalComponentPure);


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/ModalComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/ModalComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/externalServiceSubComponents/ModalComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary", ["sabre-ngv-app/app/services/impl/PnrPublicService","sabre-ngv-app/app/services/impl/IAreaService","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTripSummary = void 0;
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
var IAreaService_1 = require("sabre-ngv-app/app/services/impl/IAreaService");
var Context_1 = require("../Context");
var refreshTripSummary = function () {
    var pnrPublicService = (0, Context_1.getService)(PnrPublicService_1.PnrPublicService);
    var areaService = (0, Context_1.getService)(IAreaService_1.IAreaService);
    var recordLocator = pnrPublicService.getRecordLocator();
    if (recordLocator) {
        pnrPublicService.refreshData();
        areaService.showBanner('Info', 'Active PNR has been refreshed.');
    }
    else {
        areaService.showBanner('Error', 'There is no active PNR to refresh.');
    }
};
exports.refreshTripSummary = refreshTripSummary;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/SeatMapComponent", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),SeatMapComponent=function(){var e=React.useRef(null),t={width:400,lang:"EN",horizontal:!1,rightToLeft:!1,visibleFuselage:!0,visibleWings:!0,builtInDeckSelector:!0,singleDeckMode:!0,builtInTooltip:!0,externalPassengerManagement:!1,tooltipOnHover:!1,colorTheme:{seatLabelColor:"white",seatStrokeColor:"gray"}},a={id:"111",airlineCode:"EK",flightNo:"50",departureDate:"2025-03-21",departure:"MUC",arrival:"DXB",cabinClass:"A"},r={decks:[{id:"main-deck",name:"Deck 1",width:600,height:400,rows:[{label:"1",seats:[{label:"A",x:50,y:50},{label:"B",x:100,y:50}]},{label:"2",seats:[{label:"A",x:50,y:100}]}]}]},l=[{label:"1A",price:50,currency:"USD",color:"green",onlyForPassengerType:["ADT"]},{label:"1B",price:45,currency:"USD",color:"yellow",onlyForPassengerType:["ADT"]},{label:"2A",price:30,currency:"USD",color:"lightblue"}],i=[{id:"PAX1",name:"Иванов И.И.",type:"ADT"}];return React.createElement("div",{style:{padding:"1rem"}},React.createElement("p",null,"✅ SeatMap контейнер загружен"),React.createElement("button",{onClick:function(){var n=e.current;n&&n.contentWindow&&(n.contentWindow.postMessage({type:"seatMaps",config:JSON.stringify(t),flight:JSON.stringify(a),layout:JSON.stringify(r),availability:JSON.stringify(l),passengers:JSON.stringify(i)},"*"),console.log("📤 SeatMap data sent via postMessage"))}},"📤 Отправить данные для отрисовки карты"),React.createElement("iframe",{ref:e,src:"https://quicket.io/react-proxy-app/",width:"100%",height:"600",style:{border:"1px solid #ccc",marginTop:"1rem"},title:"SeatMapIframe"}))};exports.default=SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/SeatMapComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile", ["sabre-ngv-app/app/services/impl/AgentProfileService","com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAgentProfile = void 0;
var AgentProfileService_1 = require("sabre-ngv-app/app/services/impl/AgentProfileService");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var Context_1 = require("../Context");
var NOT_AVAILABLE = 'Not Available';
var showAgentProfile = function () {
    var service = (0, Context_1.getService)(AgentProfileService_1.AgentProfileService);
    var agentId = service.getAgentId() || NOT_AVAILABLE;
    var locale = service.getLocale() || NOT_AVAILABLE;
    var pcc = service.getPcc() || NOT_AVAILABLE;
    var country = service.getCountry() || NOT_AVAILABLE;
    var region = service.getRegion() || NOT_AVAILABLE;
    var customerBusinessUnit = service.getCustomerBusinessUnit() || NOT_AVAILABLE;
    var customerEmployeeId = service.getCustomerEmployeeId() || NOT_AVAILABLE;
    var agentProfileDescription = "Agent ID: **" + agentId + "**\n" +
        ("Pseudo City Code: **" + pcc + "**\n") +
        ("Agent's Agency Country: **" + country + "**\n") +
        ("Agent's Agency Region: **" + region + "**\n") +
        ("Agent's Locale: **" + locale + "**\n") +
        ("Customer Business Unit: **" + customerBusinessUnit + "**\n") +
        ("Customer Employee ID: **" + customerEmployeeId + "**\n");
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Agent Profile', agentProfileDescription);
};
exports.showAgentProfile = showAgentProfile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners", ["sabre-ngv-app/app/services/impl/IAreaService","com-sabre-redapp-example3-web-customworkflow-web-module/components/showButtonAction","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBanners = void 0;
var IAreaService_1 = require("sabre-ngv-app/app/services/impl/IAreaService");
var showButtonAction_1 = require("./showButtonAction");
var Context_1 = require("../Context");
var showBanners = function () {
    var areaService = (0, Context_1.getService)(IAreaService_1.IAreaService);
    var configInfo = {
        text: 'Info banner without title',
    };
    areaService.showBanner(configInfo);
    var configError = {
        type: 'Error',
        text: 'Error banner text',
        title: 'Error title',
    };
    areaService.showBanner(configError);
    var configSuccess = {
        type: 'Success',
        text: 'Success banner text',
        title: 'Success title',
    };
    areaService.showBanner(configSuccess);
    var configWarning = {
        type: 'Warning',
        text: 'Warning banner text',
        title: 'Warning title',
        label: 'Warning action',
        action: showButtonAction_1.showButtonAction
    };
    areaService.showBanner(configWarning);
};
exports.showBanners = showBanners;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showButtonAction", ["com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showButtonAction = void 0;
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var showButtonAction = function () {
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Warning action', 'The warning action button has been pressed.');
};
exports.showButtonAction = showButtonAction;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showButtonAction.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showButtonAction"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showButtonAction"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial", ["sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showInterstitial = void 0;
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../Context");
var showInterstitial = function () {
    (0, Context_1.getService)(InterstitialService_1.InterstitialService).showInterstitial(5000);
};
exports.showInterstitial = showInterstitial;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime", ["sabre-ngv-app/app/services/impl/EnvironmentPublicService","com-sabre-redapp-example3-web-customworkflow-web-module/Context","com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRuntime = void 0;
var EnvironmentPublicService_1 = require("sabre-ngv-app/app/services/impl/EnvironmentPublicService");
var Context_1 = require("../Context");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var showRuntime = function () {
    var service = (0, Context_1.getService)(EnvironmentPublicService_1.EnvironmentPublicService);
    var runtime = service.getRuntime() || 'Not Available';
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Running on', "Running on: " + runtime);
};
exports.showRuntime = showRuntime;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showSeatMapModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/SeatMapComponent"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapModal=void 0;var React=require("react"),Context_1=require("../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent");function showSeatMapModal(){var e=(0,Context_1.getService)(PublicModalService_1.PublicModalsService),a={header:"SeatMap Viewer",component:React.createElement(SeatMapComponent_1.default),onHide:function(){return console.log("[SeatMap Modal] Closed")}};e.showReactModal(a)}exports.showSeatMapModal=showSeatMapModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/showSeatMapModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/showSeatMapModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/showSeatMapModal"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Context", ["sabre-ngv-core/modules/ModuleContext","sabre-ngv-app/app/services/impl/I18nService"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.getService = exports.registerService = exports.cf = exports.context = void 0;
var ModuleContext_1 = require("sabre-ngv-core/modules/ModuleContext");
var I18nService_1 = require("sabre-ngv-app/app/services/impl/I18nService");
/** @internal **/
exports.context = new ModuleContext_1.ModuleContext("com-sabre-redapp-example3-web-customworkflow-web-module");
/** @internal **/
exports.cf = exports.context.cf.bind(exports.context);
/** @internal **/
exports.registerService = exports.context.registerService.bind(exports.context);
/** @internal **/
exports.getService = exports.context.getService.bind(exports.context);
/** @internal **/
exports.t = (0, exports.getService)(I18nService_1.I18nService).getScopedTranslator('com-sabre-redapp-example3-web-customworkflow-web-module/translations');


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Context.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/Context"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/index", ["com-sabre-redapp-example3-web-customworkflow-web-module/Main","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var Context_1 = require("./Context");
/**
 *  Autogenerated class representing module in runtime.
 **/
var Module_com_sabre_redapp_example3_web_customworkflow_web_module = /** @class */ (function (_super) {
    __extends(Module_com_sabre_redapp_example3_web_customworkflow_web_module, _super);
    function Module_com_sabre_redapp_example3_web_customworkflow_web_module(manifest) {
        var _this = _super.call(this, manifest) || this;
        Context_1.context.setModule(_this);
        return _this;
    }
    return Module_com_sabre_redapp_example3_web_customworkflow_web_module;
}(Main_1.Main));
exports.default = Module_com_sabre_redapp_example3_web_customworkflow_web_module;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/index.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/index"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/interfaces/StoreData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/interfaces/StoreData.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/interfaces/StoreData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/interfaces/StoreData"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/DrawerService","sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig","sabre-ngv-app/app/widgets/drawer/views/elements/Tile","sabre-ngv-app/app/AbstractView","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var React = require("react");
var Context_1 = require("./Context");
var ExtensionPointService_1 = require("sabre-ngv-xp/services/ExtensionPointService");
var Module_1 = require("sabre-ngv-core/modules/Module");
var RedAppSidePanelButton_1 = require("sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton");
var RedAppSidePanelConfig_1 = require("sabre-ngv-xp/configs/RedAppSidePanelConfig");
var CustomWorkflowService_1 = require("./services/CustomWorkflowService");
var createPnrForm_1 = require("./components/createPnrForm");
var callLasLax_1 = require("./components/callLasLax");
var showRuntime_1 = require("./components/showRuntime");
var showInterstitial_1 = require("./components/showInterstitial");
var showAgentProfile_1 = require("./components/showAgentProfile");
var showBanners_1 = require("./components/showBanners");
var refreshTripSummary_1 = require("./components/refreshTripSummary");
var callExternalService_1 = require("./components/callExternalService");
var createNotificationForm_1 = require("./components/createNotificationForm");
var PublicAirAvailabilityService_1 = require("sabre-ngv-airAvailability/services/PublicAirAvailabilityService");
var SeatMapAvailTile_1 = require("./components/abc-seatmap/widgets/SeatMapAvailTile"); // ✅ Availability TileWidget
var SeatMapAvailView_1 = require("./components/abc-seatmap/widgets/SeatMapAvailView"); // ✅ модальное окно, открываемое по клику на TileWidget
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var DrawerService_1 = require("sabre-ngv-app/app/services/impl/DrawerService");
var LargeWidgetDrawerConfig_1 = require("sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig");
var Tile_1 = require("sabre-ngv-app/app/widgets/drawer/views/elements/Tile");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var SeatMapComponent_1 = require("./components/abc-seatmap/SeatMapComponent");
var quicketConfig_1 = require("./components/abc-seatmap/quicketConfig");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.registerServices();
        this.setup();
        this.registerSeatMapAvailTile(); // 👈 add Availability TileWidget
        this.registerSeatMapShoppingTile(); // 👈 add Shopping TileWidget
        this.registerSeatMapShoppingWidget(); // 👈 add Shopping Widget (открывает карту)
    };
    Main.prototype.registerServices = function () {
        (0, Context_1.registerService)(CustomWorkflowService_1.CustomWorkflowService);
    };
    Main.prototype.setup = function () {
        var baseCssClassNames = 'btn btn-secondary side-panel-button redapp-web-customworkflow';
        var selfRemoveBtn = new RedAppSidePanelButton_1.RedAppSidePanelButton('Removable Button', baseCssClassNames + '-remove', function () {
            selfRemoveBtn.setVisible(false);
        });
        var config = new RedAppSidePanelConfig_1.RedAppSidePanelConfig([
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Show banners', baseCssClassNames + '-banners', showBanners_1.showBanners),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('External service call', baseCssClassNames + '-externalservicecall', callExternalService_1.callExternalService),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('RedApp platform', baseCssClassNames + '-platform', showRuntime_1.showRuntime),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('LAS - LAX', baseCssClassNames + '-action', callLasLax_1.callLasLax),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Create PNR', baseCssClassNames + '-pnr', createPnrForm_1.createPnrForm),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Show interstitial', baseCssClassNames + '-interstitial', showInterstitial_1.showInterstitial),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Show Agent Profile', baseCssClassNames + '-agentprofile', showAgentProfile_1.showAgentProfile),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Refresh Trip Summary', baseCssClassNames + '-refreshtrip', refreshTripSummary_1.refreshTripSummary),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Create notification', baseCssClassNames + '-createNotification', createNotificationForm_1.createNotificationForm),
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Hide notifications', baseCssClassNames + '-hideNotification', createNotificationForm_1.hideNotifications),
            selfRemoveBtn,
            // new RedAppSidePanelButton('Open ABC SeatMap', baseCssClassNames + '-showSeatMap', showSeatMapModal),
        ]);
        (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('redAppSidePanel', config);
    };
    Main.prototype.registerSeatMapAvailTile = function () {
        var airAvailabilityService = (0, Context_1.getService)(PublicAirAvailabilityService_1.PublicAirAvailabilityService);
        var showSeatMapAvailabilityModal = function (data) {
            var modalOptions = {
                header: 'ABC Seat Map',
                component: React.createElement(SeatMapAvailView_1.SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        airAvailabilityService.createAirAvailabilitySearchTile(SeatMapAvailTile_1.SeatMapAvailTile, showSeatMapAvailabilityModal, 'ABC Seat Map' // ✅ заголовок виджета
        );
    };
    Main.prototype.registerSeatMapShoppingTile = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService);
        // Создаём функцию для отображения модального окна
        var showSeatMapShoppingModal = function (segment) {
            var _a;
            console.log('🟢 [Modal] Segment passed to modal:', segment);
            var data = {
                flightSegments: [segment],
                dateOfFlight: (_a = segment.getDepartureDate()) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0]
            };
            console.log('📦 [Modal] Data for SeatMapComponent:', data);
            var modalOptions = {
                header: '🛋️ ABC SeatMap (Shopping)',
                component: React.createElement(SeatMapComponent_1.default, {
                    config: quicketConfig_1.quicketConfig,
                    data: data
                }),
                modalClassName: 'react-tile-modal-class',
                onHide: function () { return console.log('[🛬 SeatMap Shopping Modal Closed]'); }
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        // Регистрируем плитку и указываем обработчик клика
        var shoppingTileConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.selfDrawerContextModelPropagated = function (segment) {
                this.setDataContent("<button class=\"btn btn-primary\">\uD83D\uDC40 Show SeatMap</button>");
            };
            class_1.prototype.onClick = function () {
                console.log('🟢 [Tile Click] SeatMap clicked');
                var segment = this.getModel();
                console.log('📦 [Tile Click] Segment:', segment);
                showSeatMapShoppingModal(this.getModel());
            };
            return class_1;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_2, _super);
            // View необязателен, можно передать пустую заглушку
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_2;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Viewer' });
        drawerService.addConfig(['shopping-flight-segment'], shoppingTileConfig);
    };
    Main.prototype.registerSeatMapShoppingWidget = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService);
        var showSeatMapShoppingModal = function (segment) {
            var _a;
            var data = {
                flightSegments: [segment],
                dateOfFlight: (_a = segment.getDepartureDate()) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0]
            };
            var modalOptions = {
                header: '🛋️ ABC SeatMap (Shopping Widget)',
                component: React.createElement(SeatMapComponent_1.default, {
                    config: quicketConfig_1.quicketConfig,
                    data: data
                }),
                modalClassName: 'react-tile-modal-class',
                onHide: function () { return console.log('[🛬 SeatMap Shopping Widget Modal Closed]'); }
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        var shoppingWidgetTileConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(/** @class */ (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_3.prototype.selfDrawerContextModelPropagated = function (segment) {
                this.setDataContent("<button class=\"btn btn-outline-primary\"> \uD83D\uDECB\uFE0F Open SeatMap Viewer</button>");
            };
            class_3.prototype.onClick = function () {
                console.log('🟢 [Tile Click] SeatMap clicked');
                var segment = this.getModel();
                console.log('📦 [Tile Click] Segment:', segment);
                showSeatMapShoppingModal(segment);
            };
            return class_3;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_4, _super);
            function class_4() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_4;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Shopping Viewer' });
        drawerService.addConfig(['shopping-flight-segment'], shoppingWidgetTileConfig);
    };
    return Main;
}(Module_1.Module));
exports.Main = Main;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/Main"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/Main"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/reducers/LocalStore", ["redux"], false, function (require, exports, module) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStore = void 0;
var redux_1 = require("redux");
var defaultState = {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET',
    body: '',
    headers: '{}',
    response: ''
};
function reducer(state, action) {
    var _a;
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case 'SET_PARAMETER':
            return __assign(__assign({}, state), (_a = {}, _a[action.field] = action.newVal, _a));
        default:
            return state;
    }
}
var LocalStore = /** @class */ (function () {
    function LocalStore() {
        this.store = (0, redux_1.createStore)(reducer);
    }
    LocalStore.prototype.getData = function () {
        return this.store.getState();
    };
    return LocalStore;
}());
exports.LocalStore = LocalStore;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/reducers/LocalStore.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/reducers/LocalStore"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/reducers/LocalStore"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService", ["sabre-ngv-redAppSidePanel/interfaces/ICustomWorkflow","sabre-ngv-app/app/services/impl/IAreaService","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorkflowService = void 0;
var ICustomWorkflow_1 = require("sabre-ngv-redAppSidePanel/interfaces/ICustomWorkflow");
var IAreaService_1 = require("sabre-ngv-app/app/services/impl/IAreaService");
var Context_1 = require("../Context");
/**
 * Service used with declarative custom workflow in manifest.json.
 */
var CustomWorkflowService = /** @class */ (function (_super) {
    __extends(CustomWorkflowService, _super);
    function CustomWorkflowService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomWorkflowService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var areaService;
            return __generator(this, function (_a) {
                areaService = (0, Context_1.getService)(IAreaService_1.IAreaService);
                areaService.showBanner('Info', 'Custom Workflow Service Success');
                return [2 /*return*/];
            });
        });
    };
    CustomWorkflowService.SERVICE_NAME = 'com-sabre-redapp-example3-web-customworkflow-web-module-CustomWorkflowService';
    return CustomWorkflowService;
}(ICustomWorkflow_1.ICustomWorkflow));
exports.CustomWorkflowService = CustomWorkflowService;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph", ["sabre-ngv-custom-forms/services/ICustomFormsService","com-sabre-redapp-example3-web-customworkflow-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCustomFormParagraph = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var Context_1 = require("../Context");
var openCustomFormParagraph = function (title, msg) {
    var form = {
        title: title,
        fields: [
            {
                id: 'flight',
                type: 'PARAGRAPH',
                text: msg
            }
        ],
        actions: [
            {
                id: 'cancel',
                label: 'Close'
            }
        ]
    };
    (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form);
};
exports.openCustomFormParagraph = openCustomFormParagraph;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/utils/openCustomFormParagraph"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/utils/transformFlight", [], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getFlightFromSabreData=void 0;var getFlightFromSabreData=function(e){var i,o,r,l,t,d,a,n=null===(i=e.flightSegments)||void 0===i?void 0:i[0];return{departureDate:e.dateOfFlight||"2024-04-20",departureTime:(null==n?void 0:n.departureTime)||"12:10",arrivalTime:(null==n?void 0:n.arrivalTime)||"15:00",departureAirport:(null===(r=null===(o=null==n?void 0:n.originLocation)||void 0===o?void 0:o.EncodeDecodedElement)||void 0===r?void 0:r.Code)||"MUC",arrivalAirport:(null===(t=null===(l=null==n?void 0:n.destinationLocation)||void 0===l?void 0:l.EncodeDecodedElement)||void 0===t?void 0:t.Code)||"JFK",marketingCarrier:(null===(d=null==n?void 0:n.DisclosureAirline)||void 0===d?void 0:d.Code)||"LH",flightNumber:(null==n?void 0:n.flightNumber)||"410",aircraftType:(null===(a=null==n?void 0:n.equipment)||void 0===a?void 0:a.Code)||"359"}};exports.getFlightFromSabreData=getFlightFromSabreData;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/utils/transformFlight.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/utils/transformFlight"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/utils/transformFlight"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailTile", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapAvailTile=void 0;var React=require("react"),SeatMapAvailTile=function(e){return React.createElement("div",{className:"sdk-seatmap-custom-tile-content",onClick:function(){}},React.createElement("strong",null,"ABC Seat Map"),React.createElement("ol",null,e.flightSegments.map(function(e,t){return React.createElement("li",{key:t},"Flight ",e.MarketingAirline.FlightNumber)})))};exports.SeatMapAvailTile=SeatMapAvailTile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailView", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapAvailView=void 0;var React=require("react"),SeatMapAvailView=function(e){return React.createElement("div",{className:"sdk-seatmap-custom-tile-content"},React.createElement("pre",null,JSON.stringify(e,null,2)))};exports.SeatMapAvailView=SeatMapAvailView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/views/avail/seatmap/SeatMapAvailView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module", ["com-sabre-redapp-example3-web-customworkflow-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBTaG9wcGluZ0RyYXdlclZpZXcudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvdHJhbnNmb3JtRmxpZ2h0LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1RpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVmlldy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hY3Rpb25zLmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsRXh0ZXJuYWxTZXJ2aWNlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsTGFzTGF4LnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5LnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBDb21wb25lbnQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dCYW5uZXJzLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QnV0dG9uQWN0aW9uLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93UnVudGltZS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9zaG93U2VhdE1hcE1vZGFsLmpzIiwic3JjL2NvZGUvQ29udGV4dC50cyIsInNyYy9jb2RlL2luZGV4LnRzIiwic3JjL2NvZGUvaW50ZXJmYWNlcy9TdG9yZURhdGEudHMiLCJzcmMvY29kZS9NYWluLnRzIiwic3JjL2NvZGUvcmVkdWNlcnMvTG9jYWxTdG9yZS50cyIsInNyYy9jb2RlL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZS50cyIsInNyYy9jb2RlL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS91dGlscy90cmFuc2Zvcm1GbGlnaHQuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVGlsZS5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdmlld3MvYXZhaWwvc2VhdG1hcC9TZWF0TWFwQXZhaWxWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxJQUFNLHNCQUFzQixHQUFHLFVBQUMsSUFBUyxFQUFFLFlBQXdCOztJQUF4Qiw2QkFBQSxFQUFBLGdCQUF3QjtJQUN4RSxJQUFNLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFHLFlBQVksQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixP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Q0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7Ozs7S0FDckU7SUFMTSxrQ0FBWSxHQUFHLCtFQUErRSxDQUFDO0lBTTFHLDRCQUFDO0NBUEQsQUFPQyxDQVAwQyxpQ0FBZSxHQU96RDtBQVBZLHNEQUFxQjs7Ozs7Ozs7O0FDTmxDLDJGQUF3RjtBQUN4RixzQ0FBc0M7QUFFL0IsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQWEsRUFBRSxHQUFXO0lBQzlELElBQU0sSUFBSSxHQUFlO1FBQ3JCLEtBQUssT0FBQTtRQUNMLE1BQU0sRUFBRTtZQUNKO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRzthQUNaO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTDtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO0tBQ0osQ0FBQztJQUNGLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFsQlksUUFBQSx1QkFBdUIsMkJBa0JuQzs7Ozs7O0FDdEJEO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LkRlcGFydHVyZURhdGVUaW1lO1xuICBjb25zdCBkZXBhcnR1cmVEYXRlID0gZGVwYXJ0dXJlRGF0ZVRpbWUuc3BsaXQoJ1QnKVswXTsgLy8gHkFCMDI7TzU8IEI+O0w6PiA0MEJDXG5cbiAgcmV0dXJuIHtcbiAgICBpZDogJzExMScsIC8vIBw+Nj0+ID8+NzY1IEEzNT01QDhAPjIwQkwgSUQgOD0wRzVcbiAgICBhaXJsaW5lQ29kZTogc2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlcixcbiAgICBkZXBhcnR1cmVEYXRlLFxuICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBhcnJpdmFsOiBzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgY2FiaW5DbGFzczogJ0EnIC8vIB8+OjAgRDg6QThAPjIwPT4sIDw+Nj0+IEAwQUg4QDhCTFxuICB9O1xufTsiLCJleHBvcnQgY29uc3QgcXVpY2tldENvbmZpZyA9IHtcbiAgICB3aWR0aDogNDAwLFxuICAgIGxhbmc6ICdFTicsXG4gICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgcmlnaHRUb0xlZnQ6IGZhbHNlLFxuICAgIHZpc2libGVGdXNlbGFnZTogdHJ1ZSxcbiAgICB2aXNpYmxlV2luZ3M6IHRydWUsXG4gICAgYnVpbHRJbkRlY2tTZWxlY3RvcjogdHJ1ZSxcbiAgICBzaW5nbGVEZWNrTW9kZTogdHJ1ZSxcbiAgICBidWlsdEluVG9vbHRpcDogdHJ1ZSxcbiAgICBleHRlcm5hbFBhc3Nlbmdlck1hbmFnZW1lbnQ6IGZhbHNlLFxuICAgIHRvb2x0aXBPbkhvdmVyOiBmYWxzZSxcbiAgICBjb2xvclRoZW1lOiB7XG4gICAgICAgIHNlYXRMYWJlbENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBzZWF0U3Ryb2tlQ29sb3I6ICdncmF5J1xuICAgIH1cbn07IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4uL2FiYy1zZWF0bWFwL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTsgLy8gMjw1QUI+IGZsaWdodCBCNT81QEwgPz47Q0cwNTwgMjVBTCBkYXRhXG59XG5cbmNvbnN0IFNlYXRNYXBDb21wb25lbnQ6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zODwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQDU5QSBBIEE1Mzw1PUI+PFxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgLy8gPQ0gGz4zODwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHQpO1xuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQsXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBhdmFpbGFiaWxpdHk6IFtcbiAgICAgIHsgbGFiZWw6ICcxQScsIHByaWNlOiA1MCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2dyZWVuJywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcxQicsIHByaWNlOiA0NSwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ3llbGxvdycsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMkEnLCBwcmljZTogMzAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdsaWdodGJsdWUnIH1cbiAgICBdLFxuICAgIHBhc3NlbmdlcnM6IFt7IGlkOiAnUEFYMScsIG5hbWU6ICcYMjA9PjIgGC4YLicsIHR5cGU6ICdBRFQnIH1dXG4gIH07XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSBvciBjb250ZW50V2luZG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcblxuICAgICAgLy8gPD42PT4gQDBBOj48PDU9QjhAPjIwQkwgP0A4ID01PjFFPjQ4PD5BQjhcbiAgICAgIC8vIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgIC8vIHBhc3NlbmdlcnM6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLnBhc3NlbmdlcnMpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICB7LyogPjo9PiBBIDQwPT1LPDggPiBANTlBNSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIGZvbnRTaXplOiAnMC45cmVtJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgPHN0cm9uZz496yBGbGlnaHQgaW5mbzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZmxpZ2h0LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nIH19PlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlZ21lbnRTZWxlY3RcIj4SSzE1QDhCNSBBNTM8NT1COiA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJzZWdtZW50U2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VnbWVudEluZGV4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VnbWVudEluZGV4KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfT5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fT5cbiAgICAgICAgICAgICAge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnWFgnfSB7c2VnbWVudC5GbGlnaHROdW1iZXIgfHwgJzAwMCd9XG4gICAgICAgICAgICAgICZuYnNwO5ImbmJzcDtcbiAgICAgICAgICAgICAge3NlZ21lbnQuT3JpZ2luTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9IBNcbiAgICAgICAgICAgICAge3NlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J31cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aWZyYW1lXG4gICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICBvbkxvYWQ9eygpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnBSBbU2VhdE1hcENvbXBvbmVudF0gaWZyYW1lIGxvYWRlZCwgc2VuZGluZyBkYXRhLi4uJyk7XG4gICAgICAgICAgc2VuZFRvSWZyYW1lKCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudDsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBYnN0cmFjdFZpZXcgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0TW9kZWwnO1xuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IENzc0NsYXNzIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50JztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbkBDc3NDbGFzcygnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZScpXG5leHBvcnQgY2xhc3MgU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldyBleHRlbmRzIEFic3RyYWN0VmlldzxBYnN0cmFjdE1vZGVsPiB7XG5cbiAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc2VnbWVudCA9IGNwYTtcblxuICAgIGNvbnN0IHNhYnJlRGF0YSA9IHtcbiAgICAgIGZsaWdodFNlZ21lbnRzOiBbdGhpcy5leHRyYWN0U2VnbWVudChzZWdtZW50KV0sXG4gICAgICBkYXRlT2ZGbGlnaHQ6IHNlZ21lbnQuZ2V0RGVwYXJ0dXJlRGF0ZSgpPy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gfHwgJzIwMjUtMDQtMjEnXG4gICAgfTtcblxuICAgIGNvbnN0IG1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlciAoU2hvcHBpbmcpJyxcbiAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50LCB7XG4gICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgZGF0YTogc2FicmVEYXRhXG4gICAgICB9KSxcbiAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICB9O1xuXG4gICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0U2VnbWVudChzZWdtZW50OiBGbGlnaHRTZWdtZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE9yaWdpbkxvY2F0aW9uOiB7XG4gICAgICAgIEVuY29kZURlY29kZUVsZW1lbnQ6IHtcbiAgICAgICAgICBDb2RlOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGVzdGluYXRpb25Mb2NhdGlvbjoge1xuICAgICAgICBFbmNvZGVEZWNvZGVFbGVtZW50OiB7XG4gICAgICAgICAgQ29kZTogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGlzY2xvc3VyZUFpcmxpbmU6IHtcbiAgICAgICAgRW5jb2RlRGVjb2RlRWxlbWVudDoge1xuICAgICAgICAgIENvZGU6IHNlZ21lbnQuZ2V0TWFya2V0aW5nQWlybGluZSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBGbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCksXG4gICAgICBFcXVpcG1lbnQ6IHtcbiAgICAgICAgRW5jb2RlRGVjb2RlRWxlbWVudDoge1xuICAgICAgICAgIENvZGU6IHNlZ21lbnQuZ2V0RXF1aXBtZW50Q29kZSB8fCAnMzg4J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCBTZWF0TWFwQ29tcG9uZW50IGZyb20gJy4vU2VhdE1hcENvbXBvbmVudCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcE1vZGFsKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiB2b2lkIHtcbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTtcblxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlcicsXG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnQsIHtcbiAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgIGRhdGEgLy8gPzVANTQwUTwgMjVBTCA+MUo1OkIgQjg/MCBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7XG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgXG4gICAgLy8gY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgLy8gICAgLy8gIGFsZXJ0KFwiPYAgTW9kYWwgc2hvdWxkIG9wZW4gaGVyZSFcIik7IC8vIBJANTw1PT1LOSBCNUFCPjJLOSBhbGVydCAyPDVBQj4gc2hvd01vZGFsXG4gICAgLy8gfTtcbiAgICAgICAgLy8gb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9ID4gXG4gICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuICAgICAgICAgICAgPG9sPlxuICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFxuXG4vLyBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbi8vIGltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9Db250ZXh0Jztcbi8vIGltcG9ydCB7SVNlYXRNYXBTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytc2VhdG1hcC9zZXJ2aWNlcy9JU2VhdE1hcFNlcnZpY2UnO1xuXG4vLyBleHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbi8vICAgICBjb25zdCBoYW5kbGVPcGVuU2VhdE1hcCA9IGFzeW5jIChmbGlnaHRTZWdtZW50TnVtYmVyOiBudW1iZXIpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYD3rIE9wZW5pbmcgU2VhdCBNYXAgZm9yIHNlZ21lbnQ6ICR7ZmxpZ2h0U2VnbWVudE51bWJlcn1gKTtcbiAgICBcbi8vICAgICAgICAgdHJ5IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0U2VydmljZShJU2VhdE1hcFNlcnZpY2UpLm9wZW5TZWF0TWFwRm9yRmxpZ2h0U2VnbWVudChmbGlnaHRTZWdtZW50TnVtYmVyKTtcbiAgICBcbi8vICAgICAgICAgICAgIGlmICghcmVzcG9uc2UubW9kYWxPcGVuZWRDb3JyZWN0bHkpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGCgDyBFcnJvciBvcGVuaW5nIFNlYXQgTWFwOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX1gKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEwgRmFpbGVkIHRvIG9wZW4gU2VhdCBNYXA6YCwgZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfTtcblxuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuLy8gICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbi8vICAgICAgICAgICAgIDxvbD5cbi8vICAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4vLyAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlT3BlblNlYXRNYXAoaW5kZXggKyAxKX0+PpEgT3BlbiBTZWF0IE1hcDwvYnV0dG9uPlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICkpfVxuLy8gICAgICAgICAgICAgPC9vbD5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgKTtcbi8vIH07XG5cblxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcE1vZGFsIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFZpZXcgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCc9gCBTZWF0TWFwQXZhaWxWaWV3IGRhdGE6JywgZGF0YSk7IC8vIDs+MyAyID49QT47TFxuICAgICAgc2hvd1NlYXRNYXBNb2RhbChkYXRhKTsgLy8gPz46MDdLMjA1PCA8PjQwO0w9PjUgPjo9PlxuICAgIH0sIFtdKTtcbiAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9OyIsImltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IFRpbGVPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZU9wdGlvbnMnO1xuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFdpdGhvdXRGb2N1c09uQ2xpY2sgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vbWl4aW5zL1dpdGhvdXRGb2N1c09uQ2xpY2snO1xuaW1wb3J0IHsgSW5pdGlhbCB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9Jbml0aWFsJztcbmltcG9ydCB7IE1peGluIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL01peGluJztcbmltcG9ydCB7IENzc0NsYXNzIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSlcbkBJbml0aWFsPFRpbGVPcHRpb25zPih7XG4gICAgY2FwdGlvbjogJ0FCQyBTZWF0IE1hcCAoU0hPUFBJTkcpJyxcbiAgICBjbGFzc05hbWU6ICdzZGstc2VhdG1hcC1jdXN0b20tdGlsZSdcbn0pXG5ATWl4aW4oV2l0aG91dEZvY3VzT25DbGljaylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdUaWxlIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiBpbXBsZW1lbnRzIFdpdGhvdXRGb2N1c09uQ2xpY2sge1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0aW5lcmFyeSA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpO1xuICAgICAgICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGl0aW5lcmFyeS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgICAgICBjb25zdCBwcmljZSA9IGl0aW5lcmFyeS5nZXRQcmljZSgpO1xuXG4gICAgICAgIGNvbnN0IGZsaWdodE51bWJlcnMgPSBmbGlnaHRTZWdtZW50cy5tYXAoc2VnID0+IHNlZy5nZXRGbGlnaHROdW1iZXIoKSk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRJbmZvID0gZmxpZ2h0TnVtYmVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGA8ZGl2PlNlZ21lbnRzOjxici8+JHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJyl9PC9kaXY+YFxuICAgICAgICAgICAgOiBgPGRpdj5TZWdtZW50OiAke2ZsaWdodE51bWJlcnNbMF0gfHwgJ04vQSd9PC9kaXY+YDtcblxuICAgICAgICBjb25zdCBwcmljZUluZm8gPSBgPGRpdj5QcmljZTogJHtwcmljZX08L2Rpdj5gO1xuXG4gICAgICAgIHRoaXMuc2V0RGF0YUNvbnRlbnQoc2VnbWVudEluZm8gKyBwcmljZUluZm8pO1xuICAgIH1cblxuICAgIHNlbGZTZWxlY3RlZEZhcmVDaGFuZ2VkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYSk7XG4gICAgfVxufSIsImltcG9ydCB7QWJzdHJhY3RWaWV3fSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3XCI7XG5pbXBvcnQge0Fic3RyYWN0TW9kZWx9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsXCI7XG5pbXBvcnQge0ZsaWdodFNlZ21lbnR9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudFwiO1xuaW1wb3J0IHtDc3NDbGFzc30gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLXRpbGV3aWRnZXRzLXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlOlNhbXBsZURyYXdlclZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gY3BhLmdldFNob3BwaW5nSXRpbmVyYXJ5KCkuZ2V0RmxpZ2h0U2VnbWVudHMoKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudHNEYXRhID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgc2VnbWVudC5nZXRGbGlnaHREZXRhaWxzKHsgaXNNYWNoaW5lUmVxdWVzdDogZmFsc2UgfSkuYWx3YXlzKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFpciBtaWxlcyBwb3N0LWRldGFpbHMgY2FsbDogJHtyZXN1bHQ/LmdldEFpck1pbGVzKCl9YClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlZ21lbnRJZDogc2VnbWVudC5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCksXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKSxcbiAgICAgICAgICAgICAgICBhaXJNaWxlczogc2VnbWVudC5nZXRBaXJNaWxlcygpLFxuICAgICAgICAgICAgICAgIGhpZGRlblN0b3BzQ291bnQ6IHNlZ21lbnQuZ2V0RmxpZ2h0U3RvcHMoKT8ubGVuZ3RoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZXRNb2RlbCgpLnNldCgnZGF0YScsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnRzRGF0YSwgbnVsbCwgNCkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlLCByZWdpc3RlclNlcnZpY2V9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQge0V4dGVuc2lvblBvaW50U2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXhwL3NlcnZpY2VzL0V4dGVuc2lvblBvaW50U2VydmljZSc7XG5pbXBvcnQge01vZHVsZX0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHtSZWRBcHBTaWRlUGFuZWxCdXR0b259IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQge1JlZEFwcFNpZGVQYW5lbENvbmZpZ30gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvUmVkQXBwU2lkZVBhbmVsQ29uZmlnJztcbmltcG9ydCB7Q3VzdG9tV29ya2Zsb3dTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZSc7XG5pbXBvcnQge2NyZWF0ZVBuckZvcm19IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtJztcbmltcG9ydCB7Y2FsbExhc0xheH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHtzaG93UnVudGltZX0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dSdW50aW1lJztcbmltcG9ydCB7c2hvd0ludGVyc3RpdGlhbH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dJbnRlcnN0aXRpYWwnO1xuaW1wb3J0IHtzaG93QWdlbnRQcm9maWxlfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQge3Nob3dCYW5uZXJzfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMnO1xuaW1wb3J0IHtyZWZyZXNoVHJpcFN1bW1hcnl9IGZyb20gJy4vY29tcG9uZW50cy9yZWZyZXNoVHJpcFN1bW1hcnknO1xuaW1wb3J0IHtjYWxsRXh0ZXJuYWxTZXJ2aWNlfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQge2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm0sIGhpZGVOb3RpZmljYXRpb25zfSBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm1cIjtcblxuaW1wb3J0IHtQdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UnO1xuaW1wb3J0IHtTZWF0TWFwQXZhaWxUaWxlfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlJzsgLy8gBSBBdmFpbGFiaWxpdHkgVGlsZVdpZGdldFxuaW1wb3J0IHtTZWF0TWFwQXZhaWxWaWV3fSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3JzsgICAvLyAFIDw+NDA7TD0+NSA+Oj0+LCA+QjpASzIwNTw+NSA/PiA6Ozg6QyA9MCBUaWxlV2lkZ2V0XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge1B1YmxpY01vZGFsc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtEcmF3ZXJTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RyYXdlclNlcnZpY2UnO1xuaW1wb3J0IHtMYXJnZVdpZGdldERyYXdlckNvbmZpZ30gZnJvbSAnc2FicmUtbmd2LWNvcmUvY29uZmlncy9kcmF3ZXIvTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcnO1xuXG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IHsgVGlsZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGUnO1xuaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcblxuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnQnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC9xdWlja2V0Q29uZmlnJztcblxuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7IC8vID1IIGFkZCBBdmFpbGFiaWxpdHkgVGlsZVdpZGdldFxuICAgICAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nVGlsZSgpOyAvLyA9SCBhZGQgU2hvcHBpbmcgVGlsZVdpZGdldFxuICAgICAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nV2lkZ2V0KCk7IC8vID1IIGFkZCBTaG9wcGluZyBXaWRnZXQgKD5COkBLMjA1QiA6MEBCQylcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgICAgIHJlZ2lzdGVyU2VydmljZShDdXN0b21Xb3JrZmxvd1NlcnZpY2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXAoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgYmFzZUNzc0NsYXNzTmFtZXMgPSAnYnRuIGJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b24gcmVkYXBwLXdlYi1jdXN0b213b3JrZmxvdyc7XG5cbiAgICAgICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlnID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGJhbm5lcnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYmFubmVycycsIHNob3dCYW5uZXJzKSxcbiAgICAgICAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0V4dGVybmFsIHNlcnZpY2UgY2FsbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1leHRlcm5hbHNlcnZpY2VjYWxsJywgY2FsbEV4dGVybmFsU2VydmljZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWRBcHAgcGxhdGZvcm0nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcGxhdGZvcm0nLCBzaG93UnVudGltZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdMQVMgLSBMQVgnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWN0aW9uJywgY2FsbExhc0xheCksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgUE5SJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBucicsIGNyZWF0ZVBuckZvcm0pLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBpbnRlcnN0aXRpYWwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaW50ZXJzdGl0aWFsJywgc2hvd0ludGVyc3RpdGlhbCksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IEFnZW50IFByb2ZpbGUnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWdlbnRwcm9maWxlJywgc2hvd0FnZW50UHJvZmlsZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWZyZXNoIFRyaXAgU3VtbWFyeScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZWZyZXNodHJpcCcsIHJlZnJlc2hUcmlwU3VtbWFyeSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgbm90aWZpY2F0aW9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWNyZWF0ZU5vdGlmaWNhdGlvbicsIGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0pLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignSGlkZSBub3RpZmljYXRpb25zJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWhpZGVOb3RpZmljYXRpb24nLCBoaWRlTm90aWZpY2F0aW9ucyksXG4gICAgICAgICAgICBzZWxmUmVtb3ZlQnRuLFxuICAgICAgICAgICAgLy8gbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignT3BlbiBBQkMgU2VhdE1hcCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1zaG93U2VhdE1hcCcsIHNob3dTZWF0TWFwTW9kYWwpLFxuICAgICAgICBdKTtcblxuICAgICAgICBnZXRTZXJ2aWNlKEV4dGVuc2lvblBvaW50U2VydmljZSkuYWRkQ29uZmlnKCdyZWRBcHBTaWRlUGFuZWwnLCBjb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGFpckF2YWlsYWJpbGl0eVNlcnZpY2U6IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UpO1xuICAgIFxuICAgICAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdBQkMgU2VhdCBNYXAnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQXZhaWxWaWV3LCBkYXRhKSxcbiAgICAgICAgICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnXG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlLmNyZWF0ZUFpckF2YWlsYWJpbGl0eVNlYXJjaFRpbGUoXG4gICAgICAgICAgICBTZWF0TWFwQXZhaWxUaWxlLFxuICAgICAgICAgICAgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCxcbiAgICAgICAgICAgICdBQkMgU2VhdCBNYXAnIC8vIAUgNzAzPjs+Mj46IDI4NDY1QjBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nVGlsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZHJhd2VyU2VydmljZSA9IGdldFNlcnZpY2UoRHJhd2VyU2VydmljZSk7XG5cbiAgICAgICAgLy8gIT43NDBRPCBEQz06RjhOIDQ7TyA+Qj4xQDA2NT04TyA8PjQwO0w9PjM+ID46PTBcbiAgICAgICAgY29uc3Qgc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsID0gKHNlZ21lbnQ6IEZsaWdodFNlZ21lbnQpID0+IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJz3iIFtNb2RhbF0gU2VnbWVudCBwYXNzZWQgdG8gbW9kYWw6Jywgc2VnbWVudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZmxpZ2h0U2VnbWVudHM6IFtzZWdtZW50XSxcbiAgICAgICAgICAgICAgICBkYXRlT2ZGbGlnaHQ6IHNlZ21lbnQuZ2V0RGVwYXJ0dXJlRGF0ZSgpPy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc95iBbTW9kYWxdIERhdGEgZm9yIFNlYXRNYXBDb21wb25lbnQ6JywgZGF0YSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnPcsPIEFCQyBTZWF0TWFwIChTaG9wcGluZyknLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcycsXG4gICAgICAgICAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnWz3sIFNlYXRNYXAgU2hvcHBpbmcgTW9kYWwgQ2xvc2VkXScpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG1vZGFsT3B0aW9ucyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gIDUzOEFCQDhAQzU8ID87OEI6QyA4IEM6MDdLMjA1PCA+MUAwMT5CRzg6IDo7ODowXG4gICAgICAgIGNvbnN0IHNob3BwaW5nVGlsZUNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhcbiAgICAgICAgICAgIGNsYXNzIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiB7XG4gICAgICAgICAgICAgICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoc2VnbWVudDogRmxpZ2h0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFDb250ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj49QCBTaG93IFNlYXRNYXA8L2J1dHRvbj5gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz3iIFtUaWxlIENsaWNrXSBTZWF0TWFwIGNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IHRoaXMuZ2V0TW9kZWwoKSBhcyBGbGlnaHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPeYgW1RpbGUgQ2xpY2tdIFNlZ21lbnQ6Jywgc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWF0TWFwU2hvcHBpbmdNb2RhbCh0aGlzLmdldE1vZGVsKCkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBWaWV3ID01PjFPNzBCNTs1PSwgPD42PT4gPzVANTQwQkwgP0NBQkNOIDcwMztDSDpDXG4gICAgICAgICAgICBjbGFzcyBleHRlbmRzIEFic3RyYWN0VmlldzxBYnN0cmFjdE1vZGVsPiB7IH0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnU2VhdE1hcCBWaWV3ZXInIH1cbiAgICAgICAgKTtcblxuICAgICAgICBkcmF3ZXJTZXJ2aWNlLmFkZENvbmZpZyhbJ3Nob3BwaW5nLWZsaWdodC1zZWdtZW50J10sIHNob3BwaW5nVGlsZUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBTaG9wcGluZ1dpZGdldCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZHJhd2VyU2VydmljZSA9IGdldFNlcnZpY2UoRHJhd2VyU2VydmljZSk7XG4gICAgICBcbiAgICAgICAgY29uc3Qgc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsID0gKHNlZ21lbnQ6IEZsaWdodFNlZ21lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgZmxpZ2h0U2VnbWVudHM6IFtzZWdtZW50XSxcbiAgICAgICAgICAgIGRhdGVPZkZsaWdodDogc2VnbWVudC5nZXREZXBhcnR1cmVEYXRlKCk/LnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxuICAgICAgICAgIH07XG4gICAgICBcbiAgICAgICAgICBjb25zdCBtb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICAgICAgaGVhZGVyOiAnPcsPIEFCQyBTZWF0TWFwIChTaG9wcGluZyBXaWRnZXQpJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnLFxuICAgICAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnWz3sIFNlYXRNYXAgU2hvcHBpbmcgV2lkZ2V0IE1vZGFsIENsb3NlZF0nKVxuICAgICAgICAgIH07XG4gICAgICBcbiAgICAgICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG1vZGFsT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICBcbiAgICAgICAgY29uc3Qgc2hvcHBpbmdXaWRnZXRUaWxlQ29uZmlnID0gbmV3IExhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnKFxuICAgICAgICAgIGNsYXNzIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiB7XG4gICAgICAgICAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChzZWdtZW50OiBGbGlnaHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YUNvbnRlbnQoXG4gICAgICAgICAgICAgICAgYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeVwiPiA9yw8gT3BlbiBTZWF0TWFwIFZpZXdlcjwvYnV0dG9uPmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPeIgW1RpbGUgQ2xpY2tdIFNlYXRNYXAgY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLmdldE1vZGVsKCkgYXMgRmxpZ2h0U2VnbWVudDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPeYgW1RpbGUgQ2xpY2tdIFNlZ21lbnQ6Jywgc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge30sXG4gICAgICAgICAgeyB0aXRsZTogJ1NlYXRNYXAgU2hvcHBpbmcgVmlld2VyJyB9XG4gICAgICAgICk7XG4gICAgICBcbiAgICAgICAgZHJhd2VyU2VydmljZS5hZGRDb25maWcoWydzaG9wcGluZy1mbGlnaHQtc2VnbWVudCddLCBzaG9wcGluZ1dpZGdldFRpbGVDb25maWcpO1xuICAgICAgfVxuXG59XG5cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGxdfQ== 