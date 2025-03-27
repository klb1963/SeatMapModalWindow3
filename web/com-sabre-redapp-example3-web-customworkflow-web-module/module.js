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
        id: '001',
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
    // 🔍 Логируем входящие данные
    console.log('🔹 [SeatMapComponent] received props:', { config: config, data: data });
    var flight = (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex); // это рейс с сегментом
    var flightSegments = data.flightSegments || [];
    // 🔍 Логируем сформированный flight
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports, module) {
"use strict";
// src/components/abc-seatmap/widgets/SeatMapShoppingView.tsx
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
var React = require("react");
var SeatMapComponent_1 = require("./SeatMapComponent");
var SeatMapShoppingView = function (props) {
    console.log('[SeatMapShoppingView] received props:', props);
    return React.createElement(SeatMapComponent_1.default, __assign({}, props));
};
exports.default = SeatMapShoppingView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView"))});
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/DrawerService","sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig","sabre-ngv-app/app/widgets/drawer/views/elements/Tile","sabre-ngv-app/app/AbstractView","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports, module) {
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
var SeatMapAvailTile_1 = require("./components/abc-seatmap/widgets/SeatMapAvailTile");
var SeatMapAvailView_1 = require("./components/abc-seatmap/widgets/SeatMapAvailView");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var DrawerService_1 = require("sabre-ngv-app/app/services/impl/DrawerService");
var LargeWidgetDrawerConfig_1 = require("sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig");
var Tile_1 = require("sabre-ngv-app/app/widgets/drawer/views/elements/Tile");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var quicketConfig_1 = require("./components/abc-seatmap/quicketConfig");
var SeatMapComponent_1 = require("./components/abc-seatmap/SeatMapComponent");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.registerServices();
        this.setupSidePanelButtons();
        this.registerSeatMapAvailTile();
        this.registerSeatMapShoppingTile();
        this.registerSeatMapShoppingWidget();
    };
    Main.prototype.registerServices = function () {
        (0, Context_1.registerService)(CustomWorkflowService_1.CustomWorkflowService);
    };
    Main.prototype.setupSidePanelButtons = function () {
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
            selfRemoveBtn
        ]);
        (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('redAppSidePanel', config);
    };
    // AvailabilityTile
    Main.prototype.registerSeatMapAvailTile = function () {
        var airAvailabilityService = (0, Context_1.getService)(PublicAirAvailabilityService_1.PublicAirAvailabilityService); // внутренний сервис для предоставления данных в рамках Availability
        var showSeatMapAvailabilityModal = function (data) {
            var modalOptions = {
                header: 'ABC SeatMap (Availability)',
                component: React.createElement(SeatMapAvailView_1.SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        airAvailabilityService.createAirAvailabilitySearchTile(SeatMapAvailTile_1.SeatMapAvailTile, showSeatMapAvailabilityModal, 'ABC SeatMap');
    };
    // ShoppingTile
    Main.prototype.registerSeatMapShoppingTile = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService); // внутренний сервис для предоставления данных
        var showSeatMapShoppingModal = function (segment) {
            var _a;
            var data = {
                flightSegments: [segment],
                dateOfFlight: (_a = segment.getDepartureDate()) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0]
            };
            var modalOptions = {
                header: '🛫 ABC SeatMap (Tile)',
                component: React.createElement(SeatMapComponent_1.default, {
                    config: quicketConfig_1.quicketConfig,
                    data: data
                }),
                modalClassName: 'react-tile-modal-class',
                onHide: function () { return console.log('[🛬 SeatMap Tile Modal Closed]'); }
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        var shoppingTileConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.selfDrawerContextModelPropagated = function (segment) {
                this.setDataContent("<button class=\"btn btn-primary\">Show SeatMap Tile</button>");
            };
            class_1.prototype.onClick = function () {
                var segment = this.getModel();
                console.log('[🧩 Tile] Segment:', segment);
                showSeatMapShoppingModal(segment);
            };
            return class_1;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_2;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Tile Viewer' });
        drawerService.addConfig(['shopping-flight-segment'], shoppingTileConfig);
    };
    // ShoppingWidget
    Main.prototype.registerSeatMapShoppingWidget = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService); // внутренний сервис для предоставления данных
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
                this.setDataContent("<button class=\"btn btn-outline-primary\">\uD83D\uDECB\uFE0F Open SeatMap Widget</button>");
            };
            class_3.prototype.onClick = function () {
                var segment = this.getModel(); // берем из модели текущий сегмент
                console.log('[🧩 Tile] Segment:', segment);
                showSeatMapShoppingModal(segment);
            };
            return class_3;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_4, _super);
            function class_4() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_4;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Widget Viewer' });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudC50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldy5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdWaWV3LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3RyYW5zZm9ybUZsaWdodC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdXRpbHMvdHJhbnNmb3JtRmxpZ2h0LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFRpbGUuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTSxzQkFBc0IsR0FBRyxVQUFDLElBQVMsRUFBRSxZQUF3Qjs7SUFBeEIsNkJBQUEsRUFBQSxnQkFBd0I7SUFDeEUsSUFBTSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRyxZQUFZLENBQUMsQ0FBQztJQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBb0IsWUFBWSxlQUFZLENBQUMsQ0FBQztRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLFNBQVM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztLQUNIO0lBRUQsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDcEQsSUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO0lBRS9FLE9BQU87UUFDTCxFQUFFLEVBQUUsS0FBSztRQUNULFdBQVcsRUFBRSxNQUFBLE1BQUEsT0FBTyxDQUFDLGdCQUFnQiwwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSTtRQUNoRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVk7UUFDOUIsYUFBYSxlQUFBO1FBQ2IsU0FBUyxFQUFFLE1BQUEsTUFBQSxPQUFPLENBQUMsY0FBYywwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSTtRQUM1RCxPQUFPLEVBQUUsTUFBQSxNQUFBLE9BQU8sQ0FBQyxtQkFBbUIsMENBQUUsbUJBQW1CLDBDQUFFLElBQUk7UUFDL0QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxvQ0FBb0M7S0FDckQsQ0FBQztBQUVKLENBQUMsQ0FBQztBQTdCVyxRQUFBLHNCQUFzQiwwQkE2QmpDOzs7Ozs7Ozs7QUM3QlcsUUFBQSxhQUFhLEdBQUc7SUFDekIsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsSUFBSTtJQUNWLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsY0FBYyxFQUFFLElBQUk7SUFDcEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsMkJBQTJCLEVBQUUsS0FBSztJQUNsQyxjQUFjLEVBQUUsS0FBSztJQUNyQixVQUFVLEVBQUU7UUFDUixjQUFjLEVBQUUsT0FBTztRQUN2QixlQUFlLEVBQUUsTUFBTTtLQUMxQjtDQUNKLENBQUM7Ozs7Ozs7O0FDaEJGLDZCQUErQjtBQUMvQiwrQkFBb0Q7QUFDcEQsZ0ZBQStFO0FBTy9FLElBQU0sZ0JBQWdCLEdBQTJCLFVBQUMsRUFBZ0I7UUFBZCxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7SUFDeEQsSUFBQSxLQUFrQyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQTVDLFlBQVksUUFBQSxFQUFFLGVBQWUsUUFBZSxDQUFDO0lBQ3BELElBQU0sU0FBUyxHQUFHLElBQUEsY0FBTSxFQUFvQixJQUFJLENBQUMsQ0FBQztJQUVsRCw4QkFBOEI7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztJQUV2RSxJQUFNLE1BQU0sR0FBRyxJQUFBLCtDQUFzQixFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUNsRixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUVqRCxvQ0FBb0M7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU1RCxJQUFNLFdBQVcsR0FBRztRQUNsQixNQUFNLFFBQUE7UUFDTixNQUFNLFFBQUE7UUFDTixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsRUFBRSxFQUFFLFdBQVc7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLEdBQUc7b0JBQ1gsSUFBSSxFQUFFO3dCQUNKLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7d0JBQ3BGLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtxQkFDdkQ7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUYsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0YsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO1NBQ2hFO1FBQ0QsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQy9ELENBQUM7SUFFRixJQUFNLFlBQVksR0FBRztRQUNuQixJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxhQUFhLENBQUEsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNSO1FBRUQsSUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDMUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUUxQyw0Q0FBNEM7WUFDNUMsMERBQTBEO1lBQzFELHFEQUFxRDtTQUV0RCxDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0lBRUYsSUFBQSxpQkFBUyxFQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQTZCLFlBQWMsQ0FBQyxDQUFDO1FBQ3pELFlBQVksRUFBRSxDQUFDLENBQUMsa0NBQWtDO0lBQ3BELENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFFbkIsT0FBTyxDQUNMLDZCQUFLLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFFN0IsNkJBQUssS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7WUFDckUsZ0VBQWdDO1lBQ2hDLGlDQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBTyxDQUN4QztRQUVOLDZCQUFLLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUU7WUFDbEMsK0JBQU8sT0FBTyxFQUFDLGVBQWUsb0dBQTJCO1lBQ3pELGdDQUNFLEVBQUUsRUFBQyxlQUFlLEVBQ2xCLEtBQUssRUFBRSxZQUFZLEVBQ25CLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF2QyxDQUF1QyxJQUN2RCxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBWSxFQUFFLEtBQWE7O2dCQUFLLE9BQUEsQ0FDbkQsZ0NBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztvQkFDN0IsQ0FBQSxNQUFBLE1BQUEsT0FBTyxDQUFDLGdCQUFnQiwwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxLQUFJLElBQUk7O29CQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksS0FBSzs7b0JBRTNGLENBQUEsTUFBQSxNQUFBLE9BQU8sQ0FBQyxjQUFjLDBDQUFFLG1CQUFtQiwwQ0FBRSxJQUFJLEtBQUksS0FBSzs7b0JBQzFELENBQUEsTUFBQSxNQUFBLE9BQU8sQ0FBQyxtQkFBbUIsMENBQUUsbUJBQW1CLDBDQUFFLElBQUksS0FBSSxLQUFLLENBQ3pELENBQ1YsQ0FBQTthQUFBLENBQUMsQ0FDSyxDQUNMO1FBRU4sZ0NBQ0UsR0FBRyxFQUFFLFNBQVMsRUFDZCxHQUFHLEVBQUMscUNBQXFDLEVBQ3pDLEtBQUssRUFBQyxNQUFNLEVBQ1osTUFBTSxFQUFDLEtBQUssRUFDWixLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFDbkMsS0FBSyxFQUFDLGVBQWUsRUFDckIsTUFBTSxFQUFFO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQztnQkFDbkUsWUFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQyxHQUNELENBQ0UsQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsa0JBQWUsZ0JBQWdCLENBQUM7Ozs7OztBQ3JIaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBLDZCQUErQjtBQUMvQix5Q0FBMkM7QUFDM0MsbUZBQW1GO0FBRW5GLHVEQUFrRDtBQUNsRCxpREFBZ0QsQ0FBQyx5Q0FBeUM7QUFJMUYsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBK0I7SUFDOUQsSUFBTSxZQUFZLEdBQUcsSUFBQSxvQkFBVSxFQUFDLHdDQUFtQixDQUFDLENBQUM7SUFFckQsSUFBTSxPQUFPLEdBQXNCO1FBQ2pDLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsMEJBQWdCLEVBQUU7WUFDL0MsTUFBTSxFQUFFLDZCQUFhO1lBQ3JCLElBQUksTUFBQSxDQUFDLDhEQUE4RDtTQUNwRSxDQUFDO1FBQ0YsTUFBTSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQXJDLENBQXFDO0tBQ3BELENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZDLENBQUM7QUFkRCw0Q0FjQzs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLDZCQUErQjtBQUd4QixJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBK0I7SUFFNUQsT0FBTyxDQUNILDZCQUFLLFNBQVMsRUFBRSxpQ0FBaUM7UUFDN0MsbURBQTZCO1FBQzdCLGdDQUNLLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLENBQ3pDLDRCQUFJLEdBQUcsRUFBRSxLQUFLOztZQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQzVDLENBQ1IsRUFKNEMsQ0FJNUMsQ0FBQyxDQUNELENBQ0gsQ0FDVCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBZFcsUUFBQSxnQkFBZ0Isb0JBYzNCO0FBaUJGLDZDQUE2QztBQUU3QyxrQ0FBa0M7QUFDbEMsNEdBQTRHO0FBQzVHLGlEQUFpRDtBQUNqRCw4RUFBOEU7QUFFOUUsNkZBQTZGO0FBQzdGLHlFQUF5RTtBQUN6RSxrRkFBa0Y7QUFFbEYsZ0JBQWdCO0FBQ2hCLG1IQUFtSDtBQUVuSCxvREFBb0Q7QUFDcEQsd0ZBQXdGO0FBQ3hGLGdCQUFnQjtBQUNoQiw0QkFBNEI7QUFDNUIsa0VBQWtFO0FBQ2xFLFlBQVk7QUFDWixTQUFTO0FBRVQsZUFBZTtBQUNmLDhEQUE4RDtBQUM5RCw0Q0FBNEM7QUFDNUMsbUJBQW1CO0FBQ25CLGlFQUFpRTtBQUNqRSx1Q0FBdUM7QUFDdkMseUVBQXlFO0FBQ3pFLHlHQUF5RztBQUN6Ryw0QkFBNEI7QUFDNUIsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQixpQkFBaUI7QUFDakIsU0FBUztBQUNULEtBQUs7Ozs7Ozs7OztBQ3JFTCw2QkFBK0I7QUFDL0IsK0JBQWtDO0FBRWxDLHFGQUFvRjtBQUU3RSxJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBK0I7SUFDNUQsSUFBQSxpQkFBUyxFQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDL0QsSUFBQSxtQ0FBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUN0RCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxPQUFPLENBQ0wsNkJBQUssU0FBUyxFQUFFLGlDQUFpQztRQUMvQywwR0FBa0MsQ0FDOUIsQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWFMsUUFBQSxnQkFBZ0Isb0JBV3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkosNkVBQTRFO0FBRzVFLDJGQUEwRjtBQUMxRixxRUFBb0U7QUFDcEUsaUVBQWdFO0FBQ2hFLDRFQUEyRTtBQVEzRTtJQUF5Qyx1Q0FBbUI7SUFBNUQ7O0lBb0JBLENBQUM7SUFsQkcsOERBQWdDLEdBQWhDLFVBQWlDLEdBQWtCO1FBQy9DLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzdDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVuQyxJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDdkUsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyx3QkFBc0IsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBUTtZQUN4RCxDQUFDLENBQUMsb0JBQWlCLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVEsQ0FBQztRQUV6RCxJQUFNLFNBQVMsR0FBRyxpQkFBZSxLQUFLLFdBQVEsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQscURBQXVCLEdBQXZCLFVBQXdCLEdBQWtCO1FBQ3RDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBbkJRLG1CQUFtQjtRQU4vQixJQUFBLG1CQUFRLEVBQUMseURBQXlELEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDekYsSUFBQSxpQkFBTyxFQUFjO1lBQ2xCLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsU0FBUyxFQUFFLHlCQUF5QjtTQUN2QyxDQUFDO1FBQ0QsSUFBQSxhQUFLLEVBQUMseUNBQW1CLENBQUM7T0FDZCxtQkFBbUIsQ0FvQi9CO0lBQUQsMEJBQUM7Q0FwQkQsQUFvQkMsQ0FwQndDLFdBQUksR0FvQjVDO0FBcEJZLGtEQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZGhDLCtEQUE0RDtBQUc1RCw0RUFBeUU7QUFDekUsNEVBQXlFO0FBSXpFO0lBQXlDLHVDQUEyQjtJQUFwRTs7SUFzQkEsQ0FBQztJQXBCRyw4REFBZ0MsR0FBaEMsVUFBaUMsR0FBa0I7UUFDL0MsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTzs7WUFDckMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFnQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxFQUFFLENBQUUsQ0FBQyxDQUFBO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztnQkFDSCxTQUFTLEVBQUUsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDakMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZDLE1BQU0sRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUMvQixXQUFXLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixFQUFFO2dCQUN6QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDL0IsZ0JBQWdCLEVBQUUsTUFBQSxPQUFPLENBQUMsY0FBYyxFQUFFLDBDQUFFLE1BQU07YUFDckQsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFyQlEsbUJBQW1CO1FBRi9CLElBQUEsbUJBQVEsRUFBQyxzREFBc0QsQ0FBQztRQUNoRSxJQUFBLG1CQUFRLEVBQUMsdUVBQXVFLENBQUM7T0FDckUsbUJBQW1CLENBc0IvQjtJQUFELDBCQUFDO0NBdEJELEFBc0JDLENBdEJ3QywyQkFBWSxHQXNCcEQ7QUF0Qlksa0RBQW1COzs7Ozs7QUNSaEM7QUFDQTtBQUNBOzs7Ozs7O0FDRkEsNkJBQStCO0FBQy9CLG1GQUFpRjtBQUVqRixxR0FBa0c7QUFDbEcsc0NBQXNDO0FBQ3RDLGtFQUErRDtBQUMvRCxnRkFBNkU7QUFDN0UscURBQWtEO0FBRWxELElBQU0sWUFBWSxHQUF3QixJQUFBLG9CQUFVLEVBQUMsd0NBQW1CLENBQUMsQ0FBQztBQUVuRSxJQUFNLG1CQUFtQixHQUFHO0lBQy9CLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO0lBRXBDLElBQU0sUUFBUSxHQUFHO1FBQ2IsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQU0sT0FBTyxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RSxJQUFBLG9CQUFVLEVBQUMsbURBQXdCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNwSCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQWtCLENBQUMsQ0FBQztZQUN0RCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ3JCLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUMsQ0FDckUsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBO0lBQ0QsSUFBTSxPQUFPLEdBQUc7UUFDWixZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFBO0lBRUQsSUFBTSxlQUFlLEdBQXNCO1FBQ3ZDLE1BQU0sRUFBRSwwQkFBMEI7UUFDbEMsU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsK0JBQWMsQ0FBQztRQUM5QyxRQUFRLEVBQUUsUUFBUTtRQUNsQixPQUFPLEVBQUUsSUFBQSxpQkFBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDbkMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0tBQzFCLENBQUE7SUFFRCxZQUFZLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQTVCVyxRQUFBLG1CQUFtQix1QkE0QjlCOzs7Ozs7Ozs7QUN2Q0YsMkZBQXdGO0FBQ3hGLHNDQUEwQztBQUMxQyw0RUFBeUU7QUFFbEUsSUFBTSxVQUFVLEdBQUc7SUFDdEIsSUFBTSxtQkFBbUIsR0FBRyxJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQztJQUU1RCxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUzQyxJQUFBLFlBQUUsRUFBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1FBQy9CLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFdkMsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFO2FBQzlDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQTlDLENBQThDLENBQUM7YUFDOUQsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUExQixDQUEwQixDQUFDO2FBQ3ZDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUU1QyxJQUFJLGlCQUFpQixFQUFFO1lBQ25CLElBQUEsaURBQXVCLEVBQUMsT0FBTyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQTtBQWpCWSxRQUFBLFVBQVUsY0FpQnRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkQsc0NBQXNDO0FBRXRDLDJGQUF3RjtBQUl4Riw0RkFBeUY7QUFHekYsSUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO0FBRTVCLElBQU0sc0JBQXNCLEdBQUc7Ozs7O2dCQUM1QixJQUFJLEdBQWU7b0JBQ3JCLEtBQUssRUFBRSxjQUFjO29CQUNyQixNQUFNLEVBQUU7d0JBQ0o7NEJBQ0ksRUFBRSxFQUFFLE9BQU87eUJBQ2Q7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLFNBQVM7eUJBQ2hCO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxNQUFNOzRCQUNWLElBQUksRUFBRSxVQUFVOzRCQUNoQixLQUFLLEVBQUU7Z0NBQ0g7b0NBQ0ksRUFBRSxFQUFFLE1BQU07aUNBQ2I7Z0NBQ0Q7b0NBQ0ksRUFBRSxFQUFFLE1BQU07aUNBQ2I7Z0NBQ0Q7b0NBQ0ksRUFBRSxFQUFFLFNBQVM7aUNBQ2hCO2dDQUNEO29DQUNJLEVBQUUsRUFBRSxPQUFPO2lDQUNkO2dDQUNEO29DQUNJLEVBQUUsRUFBRSxTQUFTO2lDQUNoQjs2QkFDSjt5QkFDSjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsVUFBVTs0QkFDZCxVQUFVLEVBQUU7Z0NBQ1IsS0FBSyxFQUFFLHFCQUFxQjs2QkFDL0I7eUJBQ0o7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLFNBQVM7NEJBQ2IsS0FBSyxFQUFFLGVBQWU7NEJBQ3RCLFVBQVUsRUFBRTtnQ0FDUixLQUFLLEVBQUUsbUJBQW1COzZCQUM3Qjt5QkFDSjtxQkFDSjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0w7NEJBQ0ksRUFBRSxFQUFFLFFBQVE7NEJBQ1osS0FBSyxFQUFFLFFBQVE7eUJBQ2xCO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxJQUFJOzRCQUNSLEtBQUssRUFBRSxRQUFRO3lCQUNsQjtxQkFDSjtpQkFDSixDQUFDO2dCQUUyQixxQkFBTSxJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUEzRSxNQUFNLEdBQWlCLFNBQW9EO2dCQUVqRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUN4QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUI7Ozs7S0FDSixDQUFBO0FBOURZLFFBQUEsc0JBQXNCLDBCQThEbEM7QUFFRCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBZ0I7SUFDdEMsSUFBTSxJQUFJLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBbkIsQ0FBbUIsQ0FBbUIsQ0FBQyxLQUFLLENBQUM7SUFFckYsSUFBTSxFQUFFLEdBQUcsSUFBQSxvQkFBVSxFQUFDLDJDQUFvQixDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsS0FBSyxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQXBCLENBQW9CLENBQWUsQ0FBQyxLQUFLO1FBQzNFLE9BQU8sRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUF0QixDQUFzQixDQUFlLENBQUMsS0FBSztRQUMvRSxJQUFJLEVBQUUsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUF3QjtRQUM1RCxRQUFRLEVBQUUsUUFBUSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQXZCLENBQXVCLENBQWUsQ0FBQyxLQUFLLENBQUM7UUFDM0YsT0FBTyxFQUFFLFFBQVEsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUF0QixDQUFzQixDQUFlLENBQUMsS0FBSyxDQUFDO0tBQzVGLENBQUMsQ0FBQztJQUVILGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFBO0FBRU0sSUFBTSxpQkFBaUIsR0FBRztJQUM3QixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsSUFBQSxvQkFBVSxFQUFDLDJDQUFvQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQXJELENBQXFELENBQUMsQ0FBQztJQUNuRixhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUE7QUFIWSxRQUFBLGlCQUFpQixxQkFHN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNGRCwyRkFBd0Y7QUFHeEYsNkVBQTBFO0FBRTFFLDJGQUF3RjtBQUN4RiwyRkFBd0Y7QUFFeEYsc0NBQXNDO0FBQ3RDLDRFQUF5RTtBQUVsRSxJQUFNLGFBQWEsR0FBRzs7Ozs7Z0JBQ25CLGtCQUFrQixHQUFHLEdBQUcsR0FBRyxJQUFBLG9CQUFVLEVBQUMsMkJBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLGdCQUFnQixDQUFDO2dCQUU5SCxJQUFJLEdBQWU7b0JBQ3JCLEtBQUssRUFBRSxZQUFZO29CQUNuQixNQUFNLEVBQUU7d0JBQ0o7NEJBQ0ksRUFBRSxFQUFFLE1BQU07NEJBQ1YsS0FBSyxFQUFFLFdBQVc7eUJBQ3JCO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxRQUFROzRCQUNaLEtBQUssRUFBRSxrQkFBa0I7eUJBQzVCO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxRQUFROzRCQUNaLEtBQUssRUFBRSxNQUFNO3lCQUNoQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsT0FBTzs0QkFDWCxLQUFLLEVBQUUsWUFBWTs0QkFDbkIsS0FBSyxFQUFFLFFBQVE7eUJBQ2xCO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxPQUFPOzRCQUNYLEtBQUssRUFBRSxVQUFVO3lCQUNwQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsV0FBVzs0QkFDZixLQUFLLEVBQUUsc0JBQXNCOzRCQUM3QixLQUFLLEVBQUUsT0FBTzt5QkFDakI7cUJBQ0o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLEVBQUUsRUFBRSxRQUFROzRCQUNaLEtBQUssRUFBRSxRQUFRO3lCQUNsQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsSUFBSTs0QkFDUixLQUFLLEVBQUUsUUFBUTt5QkFDbEI7cUJBQ0o7aUJBQ0osQ0FBQztnQkFFMkIscUJBQU0sSUFBQSxvQkFBVSxFQUFDLHlDQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBM0UsTUFBTSxHQUFpQixTQUFvRDtnQkFDakYsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDeEIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQy9COzs7O0tBQ0osQ0FBQTtBQWpEWSxRQUFBLGFBQWEsaUJBaUR6QjtBQUVELElBQU0sbUJBQW1CLEdBQUcsVUFBTyxJQUFnQjs7Ozs7Z0JBRXpDLG1CQUFtQixHQUFHLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDO2dCQUV0RCxNQUFNLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBbkIsQ0FBbUIsQ0FBZSxDQUFDLEtBQUssQ0FBQztnQkFDckYsUUFBUSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQXJCLENBQXFCLENBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pGLFFBQVEsR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFyQixDQUFxQixDQUFlLENBQUMsS0FBSyxDQUFDO2dCQUN6RixXQUFXLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8sRUFBcEIsQ0FBb0IsQ0FBZSxDQUFDLEtBQUssQ0FBQztnQkFDM0YsT0FBTyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQXBCLENBQW9CLENBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZGLEtBQUssR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssV0FBVyxFQUF4QixDQUF3QixDQUFlLENBQUMsS0FBSyxDQUFDO2dCQUUvRixtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdkIscUJBQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBQWhELFlBQVksR0FBRyxTQUFpQztnQkFDaEMsS0FBQSxZQUFZLENBQUE7eUJBQVosd0JBQVk7Z0JBQUkscUJBQU0sV0FBVyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsRUFBQTs7c0JBQTFDLFNBQTBDOzs7Z0JBQTFFLGFBQWEsS0FBNkQ7Z0JBQ3pELEtBQUEsYUFBYSxDQUFBO3lCQUFiLHdCQUFhO2dCQUFJLHFCQUFNLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3NCQUFyQyxTQUFxQzs7O2dCQUF2RSxjQUFjLEtBQXlEO2dCQUNuRCxLQUFBLGNBQWMsQ0FBQTt5QkFBZCx3QkFBYztnQkFBSSxxQkFBTSxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFBOztzQkFBM0MsU0FBMkM7OztnQkFBakYsaUJBQWlCLEtBQWdFO2dCQUNqRSxLQUFBLGlCQUFpQixDQUFBO3lCQUFqQix3QkFBaUI7Z0JBQUkscUJBQU0sV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBQTs7c0JBQW5DLFNBQW1DOzs7Z0JBQXhFLGFBQWEsS0FBMkQ7Z0JBQzFELEtBQUEsYUFBYSxDQUFBO3lCQUFiLHlCQUFhO2dCQUFJLHFCQUFNLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3NCQUEvQixTQUErQjs7O2dCQUE5RCxXQUFXLEtBQW1EO2dCQUNqRCxLQUFBLFdBQVcsQ0FBQTt5QkFBWCx5QkFBVztnQkFBSSxxQkFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFBOztzQkFBN0IsU0FBNkI7OztnQkFBekQsVUFBVSxLQUErQztnQkFDNUMsS0FBQSxVQUFVLENBQUE7eUJBQVYseUJBQVU7Z0JBQUkscUJBQU0sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7c0JBQTdCLFNBQTZCOzs7Z0JBQXhELFVBQVUsS0FBOEM7Z0JBRTlELG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3ZDLFVBQVUsSUFBSSxJQUFBLGlEQUF1QixFQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQzs7OztLQUN0RSxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQUcsVUFBTyxPQUFlLEVBQUUsY0FBc0I7Ozs7b0JBQ3RCLHFCQUFNLElBQUEsb0JBQVUsRUFBQywrQ0FBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQTs7Z0JBQXhGLFFBQVEsR0FBMEIsU0FBc0Q7Z0JBQzFGLFNBQVMsR0FBWSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFFakQsSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbEcsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7aUJBQ25EO3FCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ25CLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDakM7Z0JBRUQsc0JBQU8sU0FBUyxFQUFDOzs7S0FDcEIsQ0FBQTtBQUVELElBQU0sYUFBYSxHQUFHLFVBQUMsT0FBZTtJQUNsQyxJQUFBLGlEQUF1QixFQUFDLFlBQVksRUFBSyxPQUFPLHFCQUFrQixDQUFDLENBQUM7QUFDeEUsQ0FBQyxDQUFBOzs7Ozs7Ozs7QUN6R0QsbURBQXVDO0FBQ3ZDLDZCQUErQjtBQUV4QixJQUFNLE9BQU8sR0FBRyxVQUFDLE9BQW1CLEVBQUUsUUFBb0IsSUFBb0IsT0FBQTtJQUNqRixvQkFBQyx3QkFBTSxJQUNILEdBQUcsRUFBRSxDQUFDLEVBQ04sU0FBUyxFQUFDLGVBQWUsRUFDekIsT0FBTyxFQUFFLE9BQU8sWUFHWDtJQUNULG9CQUFDLHdCQUFNLElBQ0gsR0FBRyxFQUFFLENBQUMsRUFDTixTQUFTLEVBQUMsYUFBYSxFQUN2QixPQUFPLEVBQUUsUUFBUSxhQUdaO0NBQUMsRUFkdUUsQ0FjdkUsQ0FBQTtBQWRELFFBQUEsT0FBTyxXQWNOOzs7Ozs7Ozs7QUNqQmQsNkJBQStCO0FBQy9CLDJDQUFvQztBQUNwQyx5Q0FBc0M7QUFZdEMsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLEtBQXFCO0lBQzdDLE9BQU8sQ0FDSCw2QkFBSyxTQUFTLEVBQUUseURBQXlEO1FBQ3JFLDZCQUFLLFNBQVMsRUFBRSxLQUFLO1lBQ2pCLDZCQUFLLFNBQVMsRUFBRSxVQUFVO2dCQUN0Qiw2QkFBSyxTQUFTLEVBQUUsc0JBQXNCO29CQUNsQywrQkFBTyxPQUFPLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsZUFBWSxVQUFhO29CQUNuRSwrQkFDSSxFQUFFLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsZUFBWSxFQUMxQyxTQUFTLEVBQUUsd0JBQXdCLEVBQ25DLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsRUFDN0MsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQ2xCLENBQ0E7Z0JBQ04sNkJBQUssU0FBUyxFQUFFLHlCQUF5QjtvQkFDckMsK0JBQU8sT0FBTyxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLGtCQUFlLGFBQWdCO29CQUN6RSwrQkFDSSxFQUFFLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsa0JBQWUsRUFDN0MsU0FBUyxFQUFFLDJCQUEyQixFQUN0QyxRQUFRLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQS9CLENBQStCLEVBQ2hELEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxHQUNyQixDQUNBO2dCQUNOLDZCQUFLLFNBQVMsRUFBRSx1QkFBdUI7b0JBQ25DLCtCQUFPLE9BQU8sRUFBSyxpQkFBTyxDQUFDLGFBQWEsRUFBRSxnQkFBYSxXQUFjO29CQUNyRSxrQ0FDSSxFQUFFLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWEsRUFDM0MsU0FBUyxFQUFFLHlCQUF5QixFQUNwQyxRQUFRLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTdCLENBQTZCLEVBQzlDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUNqQixJQUFJLEVBQUUsQ0FBQyxFQUNQLElBQUksRUFBRSxFQUFFLEdBQ1YsQ0FDQTtnQkFDTiw2QkFBSyxTQUFTLEVBQUUsMEJBQTBCO29CQUN0QywrQkFBTyxPQUFPLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsbUJBQWdCLGNBQWlCO29CQUMzRSxrQ0FDSSxFQUFFLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsbUJBQWdCLEVBQzlDLFNBQVMsRUFBRSw0QkFBNEIsRUFDdkMsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFoQyxDQUFnQyxFQUNqRCxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDcEIsSUFBSSxFQUFFLEVBQUUsRUFDUixJQUFJLEVBQUUsRUFBRSxHQUNWLENBQ0EsQ0FDSjtZQUNOLDZCQUFLLFNBQVMsRUFBRSxVQUFVO2dCQUN0Qiw2QkFBSyxTQUFTLEVBQUUsMkJBQTJCO29CQUN2QywrQkFBTyxPQUFPLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsb0JBQWlCLGVBQWtCO29CQUM3RSxrQ0FDSSxFQUFFLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsb0JBQWlCLEVBQy9DLFNBQVMsRUFBRSw2QkFBNkIsRUFDeEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQ3JCLElBQUksRUFBRSxFQUFFLEVBQ1IsSUFBSSxFQUFFLEVBQUUsR0FDVixDQUNBLENBQ0osQ0FDSixDQUNKLENBQ1QsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVELFNBQVMsZUFBZSxDQUFDLEtBQWdCO0lBQ3JDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxJQUFNLGtCQUFrQixHQUFHLFVBQUMsUUFBUTtJQUNoQyxPQUFPO1FBQ0gsTUFBTSxFQUFFLFVBQUMsTUFBTTtZQUNYLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUE7UUFDM0QsQ0FBQztRQUNELFNBQVMsRUFBRSxVQUFDLE1BQU07WUFDZCxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFBO1FBQzlELENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBQyxNQUFNO1lBQ1osUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQTtRQUM1RCxDQUFDO1FBQ0QsVUFBVSxFQUFFLFVBQUMsTUFBTTtZQUNmLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUE7UUFDL0QsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRyxJQUFBLHFCQUFPLEVBQWlDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7OztBQ2xHL0gscUZBQWtGO0FBQ2xGLDZFQUEwRTtBQUMxRSxzQ0FBc0M7QUFFL0IsSUFBTSxrQkFBa0IsR0FBRztJQUM5QixJQUFNLGdCQUFnQixHQUFxQixJQUFBLG9CQUFVLEVBQUMsbUNBQWdCLENBQUMsQ0FBQztJQUN4RSxJQUFNLFdBQVcsR0FBaUIsSUFBQSxvQkFBVSxFQUFDLDJCQUFZLENBQUMsQ0FBQztJQUMzRCxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFELElBQUksYUFBYSxFQUFFO1FBQ2YsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztLQUNwRTtTQUFNO1FBQ0gsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztLQUN6RTtBQUNMLENBQUMsQ0FBQTtBQVZZLFFBQUEsa0JBQWtCLHNCQVU5Qjs7Ozs7O0FDZEQ7QUFDQTtBQUNBOzs7Ozs7O0FDRkEsMkZBQXdGO0FBQ3hGLDRFQUF5RTtBQUN6RSxzQ0FBc0M7QUFFdEMsSUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDO0FBQy9CLElBQU0sZ0JBQWdCLEdBQUc7SUFFNUIsSUFBTSxPQUFPLEdBQXdCLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDO0lBQ3JFLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFDdEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLGFBQWEsQ0FBQztJQUNwRCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksYUFBYSxDQUFDO0lBQzlDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFDdEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLGFBQWEsQ0FBQztJQUNwRCxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLGFBQWEsQ0FBQztJQUNoRixJQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLGFBQWEsQ0FBQztJQUU1RSxJQUFNLHVCQUF1QixHQUFHLGlCQUFlLE9BQU8sU0FBTTtTQUN4RCx5QkFBdUIsR0FBRyxTQUFNLENBQUE7U0FDaEMsK0JBQTZCLE9BQU8sU0FBTSxDQUFBO1NBQzFDLDhCQUE0QixNQUFNLFNBQU0sQ0FBQTtTQUN4Qyx1QkFBcUIsTUFBTSxTQUFNLENBQUE7U0FDakMsK0JBQTZCLG9CQUFvQixTQUFNLENBQUE7U0FDdkQsNkJBQTJCLGtCQUFrQixTQUFNLENBQUEsQ0FBQztJQUN4RCxJQUFBLGlEQUF1QixFQUFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JFLENBQUMsQ0FBQTtBQW5CWSxRQUFBLGdCQUFnQixvQkFtQjVCOzs7Ozs7Ozs7QUN4QkQsNkVBQTBFO0FBRTFFLHVEQUFvRDtBQUNwRCxzQ0FBc0M7QUFFL0IsSUFBTSxXQUFXLEdBQUc7SUFDdkIsSUFBTSxXQUFXLEdBQWlCLElBQUEsb0JBQVUsRUFBQywyQkFBWSxDQUFDLENBQUM7SUFFM0QsSUFBTSxVQUFVLEdBQWlCO1FBQzdCLElBQUksRUFBRSwyQkFBMkI7S0FDcEMsQ0FBQztJQUNGLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFbkMsSUFBTSxXQUFXLEdBQWdCO1FBQzdCLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixLQUFLLEVBQUUsYUFBYTtLQUN2QixDQUFDO0lBQ0YsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVwQyxJQUFNLGFBQWEsR0FBaUI7UUFDaEMsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLEtBQUssRUFBRSxlQUFlO0tBQ3pCLENBQUM7SUFDRixXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXRDLElBQU0sYUFBYSxHQUFpQjtRQUNoQyxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsS0FBSyxFQUFFLGVBQWU7UUFDdEIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixNQUFNLEVBQUUsbUNBQWdCO0tBQzNCLENBQUE7SUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQTtBQTlCWSxRQUFBLFdBQVcsZUE4QnZCOzs7Ozs7Ozs7QUNuQ0QsNEVBQXlFO0FBRWxFLElBQU0sZ0JBQWdCLEdBQUc7SUFDNUIsSUFBQSxpREFBdUIsRUFBQyxnQkFBZ0IsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzVGLENBQUMsQ0FBQTtBQUZZLFFBQUEsZ0JBQWdCLG9CQUU1Qjs7Ozs7Ozs7O0FDSkQsMkZBQXdGO0FBQ3hGLHNDQUFzQztBQUUvQixJQUFNLGdCQUFnQixHQUFHO0lBQzVCLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQTtBQUZZLFFBQUEsZ0JBQWdCLG9CQUU1Qjs7Ozs7Ozs7O0FDTEQscUdBQWtHO0FBQ2xHLHNDQUFzQztBQUN0Qyw0RUFBeUU7QUFFbEUsSUFBTSxXQUFXLEdBQUc7SUFDdkIsSUFBTSxPQUFPLEdBQTZCLElBQUEsb0JBQVUsRUFBQyxtREFBd0IsQ0FBQyxDQUFDO0lBRS9FLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxlQUFlLENBQUM7SUFFeEQsSUFBQSxpREFBdUIsRUFBQyxZQUFZLEVBQUUsaUJBQWUsT0FBUyxDQUFDLENBQUM7QUFDcEUsQ0FBQyxDQUFBO0FBTlksUUFBQSxXQUFXLGVBTXZCOzs7Ozs7QUNWRDtBQUNBO0FBQ0E7Ozs7O0FDREEsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7OztBQUd2QyxzRUFBbUU7QUFDbkUsMkVBQTBGO0FBRTFGLGlCQUFpQjtBQUNKLFFBQUEsT0FBTyxHQUFtQixJQUFJLDZCQUFhLENBQUMseURBQXlELENBQUMsQ0FBQztBQUNwSCxpQkFBaUI7QUFDSixRQUFBLEVBQUUsR0FBeUIsZUFBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLENBQUM7QUFDakUsaUJBQWlCO0FBQ0osUUFBQSxlQUFlLEdBQXNDLGVBQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxDQUFDO0FBQ3hHLGlCQUFpQjtBQUNKLFFBQUEsVUFBVSxHQUFpQyxlQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsQ0FBQztBQUN6RixpQkFBaUI7QUFDSixRQUFBLENBQUMsR0FBcUIsSUFBQSxrQkFBVSxFQUFDLHlCQUFXLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDOzs7Ozs7O0FDdkJ2Six1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFdkMsK0JBQTRCO0FBRTVCLHFDQUFrQztBQUVsQzs7SUFFSTtBQUNKO0lBQTRGLGtGQUFJO0lBQzVGLHdFQUFZLFFBQXlCO1FBQXJDLFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBRWxCO1FBREcsaUJBQU8sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQzVCLENBQUM7SUFDTCxxRUFBQztBQUFELENBTEEsQUFLQyxDQUwyRixXQUFJLEdBSy9GOzs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsNkJBQStCO0FBQy9CLHFDQUF3RDtBQUN4RCxxRkFBb0Y7QUFDcEYsd0RBQXVEO0FBQ3ZELGdHQUErRjtBQUMvRixvRkFBbUY7QUFFbkYsMEVBQXlFO0FBQ3pFLDREQUEyRDtBQUMzRCxzREFBcUQ7QUFDckQsd0RBQXVEO0FBQ3ZELGtFQUFpRTtBQUNqRSxrRUFBaUU7QUFDakUsd0RBQXVEO0FBQ3ZELHNFQUFxRTtBQUNyRSx3RUFBdUU7QUFDdkUsOEVBQWdHO0FBRWhHLGdIQUErRztBQUMvRyxzRkFBcUY7QUFDckYsc0ZBQXFGO0FBR3JGLG1GQUFtRjtBQUVuRiwrRUFBOEU7QUFDOUUsaUdBQWdHO0FBR2hHLDZFQUE0RTtBQUM1RSwrREFBOEQ7QUFHOUQsd0VBQXVFO0FBQ3ZFLDhFQUF5RTtBQUV6RTtJQUEwQix3QkFBTTtJQUFoQzs7SUE4SUEsQ0FBQztJQTdJQyxtQkFBSSxHQUFKO1FBQ0UsaUJBQU0sSUFBSSxXQUFFLENBQUM7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU8sK0JBQWdCLEdBQXhCO1FBQ0UsSUFBQSx5QkFBZSxFQUFDLDZDQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLG9DQUFxQixHQUE3QjtRQUNFLElBQU0saUJBQWlCLEdBQUcsK0RBQStELENBQUM7UUFFMUYsSUFBTSxhQUFhLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsR0FBRyxTQUFTLEVBQUU7WUFDakcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQU0sTUFBTSxHQUFHLElBQUksNkNBQXFCLENBQUM7WUFDdkMsSUFBSSw2Q0FBcUIsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLEdBQUcsVUFBVSxFQUFFLHlCQUFXLENBQUM7WUFDdEYsSUFBSSw2Q0FBcUIsQ0FBQyx1QkFBdUIsRUFBRSxpQkFBaUIsR0FBRyxzQkFBc0IsRUFBRSx5Q0FBbUIsQ0FBQztZQUNuSCxJQUFJLDZDQUFxQixDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixHQUFHLFdBQVcsRUFBRSx5QkFBVyxDQUFDO1lBQzFGLElBQUksNkNBQXFCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixHQUFHLFNBQVMsRUFBRSx1QkFBVSxDQUFDO1lBQ2pGLElBQUksNkNBQXFCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixHQUFHLE1BQU0sRUFBRSw2QkFBYSxDQUFDO1lBQ2xGLElBQUksNkNBQXFCLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEdBQUcsZUFBZSxFQUFFLG1DQUFnQixDQUFDO1lBQ3JHLElBQUksNkNBQXFCLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEdBQUcsZUFBZSxFQUFFLG1DQUFnQixDQUFDO1lBQ3RHLElBQUksNkNBQXFCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLEdBQUcsY0FBYyxFQUFFLHVDQUFrQixDQUFDO1lBQ3pHLElBQUksNkNBQXFCLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLEdBQUcscUJBQXFCLEVBQUUsK0NBQXNCLENBQUM7WUFDbkgsSUFBSSw2Q0FBcUIsQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsR0FBRyxtQkFBbUIsRUFBRSwwQ0FBaUIsQ0FBQztZQUMzRyxhQUFhO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsSUFBQSxvQkFBVSxFQUFDLDZDQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxtQkFBbUI7SUFDWCx1Q0FBd0IsR0FBaEM7UUFDRSxJQUFNLHNCQUFzQixHQUFHLElBQUEsb0JBQVUsRUFBQywyREFBNEIsQ0FBQyxDQUFDLENBQUMsb0VBQW9FO1FBRTdJLElBQU0sNEJBQTRCLEdBQUcsVUFBQyxJQUFTO1lBQzdDLElBQU0sWUFBWSxHQUFzQjtnQkFDdEMsTUFBTSxFQUFFLDRCQUE0QjtnQkFDcEMsU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsbUNBQWdCLEVBQUUsSUFBSSxDQUFDO2dCQUN0RCxjQUFjLEVBQUUsd0JBQXdCO2FBQ3pDLENBQUM7WUFFRixJQUFBLG9CQUFVLEVBQUMsd0NBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDO1FBRUYsc0JBQXNCLENBQUMsK0JBQStCLENBQ3BELG1DQUFnQixFQUNoQiw0QkFBNEIsRUFDNUIsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZTtJQUNQLDBDQUEyQixHQUFuQztRQUNFLElBQU0sYUFBYSxHQUFHLElBQUEsb0JBQVUsRUFBQyw2QkFBYSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7UUFFL0YsSUFBTSx3QkFBd0IsR0FBRyxVQUFDLE9BQXNCOztZQUN0RCxJQUFNLElBQUksR0FBRztnQkFDWCxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pCLFlBQVksRUFBRSxNQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSwwQ0FBRSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDdEUsQ0FBQztZQUVGLElBQU0sWUFBWSxHQUFzQjtnQkFDdEMsTUFBTSxFQUFFLHVCQUF1QjtnQkFDL0IsU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsMEJBQWdCLEVBQUU7b0JBQy9DLE1BQU0sRUFBRSw2QkFBYTtvQkFDckIsSUFBSSxNQUFBO2lCQUNMLENBQUM7Z0JBQ0YsY0FBYyxFQUFFLHdCQUF3QjtnQkFDeEMsTUFBTSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLEVBQTdDLENBQTZDO2FBQzVELENBQUM7WUFFRixJQUFBLG9CQUFVLEVBQUMsd0NBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDO1FBRUYsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGlEQUF1QjtZQUN0QywyQkFBbUI7WUFBakM7O1lBVUEsQ0FBQztZQVRDLGtEQUFnQyxHQUFoQyxVQUFpQyxPQUFzQjtnQkFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyw4REFBNEQsQ0FBQyxDQUFDO1lBQ3BGLENBQUM7WUFFRCx5QkFBTyxHQUFQO2dCQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQW1CLENBQUM7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDSCxjQUFDO1FBQUQsQ0FWQSxBQVVDLENBVmEsV0FBSTtZQVdKLDJCQUEyQjtZQUF6Qzs7WUFBMkMsQ0FBQztZQUFELGNBQUM7UUFBRCxDQUEzQyxBQUE0QyxDQUE5QiwyQkFBWSxJQUMxQixFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxDQUNqQyxDQUFDO1FBRUYsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsaUJBQWlCO0lBQ1QsNENBQTZCLEdBQXJDO1FBQ0UsSUFBTSxhQUFhLEdBQUcsSUFBQSxvQkFBVSxFQUFDLDZCQUFhLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUUvRixJQUFNLHdCQUF3QixHQUFHLFVBQUMsT0FBc0I7O1lBQ3RELElBQU0sSUFBSSxHQUFHO2dCQUNYLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDekIsWUFBWSxFQUFFLE1BQUEsT0FBTyxDQUFDLGdCQUFnQixFQUFFLDBDQUFFLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUN0RSxDQUFDO1lBRUYsSUFBTSxZQUFZLEdBQXNCO2dCQUN0QyxNQUFNLEVBQUUsbUNBQW1DO2dCQUMzQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQywwQkFBZ0IsRUFBRTtvQkFDL0MsTUFBTSxFQUFFLDZCQUFhO29CQUNyQixJQUFJLE1BQUE7aUJBQ0wsQ0FBQztnQkFDRixjQUFjLEVBQUUsd0JBQXdCO2dCQUN4QyxNQUFNLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsRUFBeEQsQ0FBd0Q7YUFDdkUsQ0FBQztZQUVGLElBQUEsb0JBQVUsRUFBQyx3Q0FBbUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUM7UUFFRixJQUFNLHdCQUF3QixHQUFHLElBQUksaURBQXVCO1lBQzVDLDJCQUFtQjtZQUFqQzs7WUFVQSxDQUFDO1lBVEMsa0RBQWdDLEdBQWhDLFVBQWlDLE9BQXNCO2dCQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLDJGQUEwRSxDQUFDLENBQUM7WUFDbEcsQ0FBQztZQUVELHlCQUFPLEdBQVA7Z0JBQ0UsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBbUIsQ0FBQyxDQUFDLGtDQUFrQztnQkFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0Msd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUNILGNBQUM7UUFBRCxDQVZBLEFBVUMsQ0FWYSxXQUFJO1lBV0osMkJBQTJCO1lBQXpDOztZQUEyQyxDQUFDO1lBQUQsY0FBQztRQUFELENBQTNDLEFBQTRDLENBQTlCLDJCQUFZLElBQzFCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQ25DLENBQUM7UUFFRixhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMseUJBQXlCLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0E5SUEsQUE4SUMsQ0E5SXlCLGVBQU0sR0E4SS9CO0FBOUlZLG9CQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDakIsK0JBQWlDO0FBR2pDLElBQU0sWUFBWSxHQUFjO0lBQzVCLEdBQUcsRUFBRSw4Q0FBOEM7SUFDbkQsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsRUFBRTtJQUNSLE9BQU8sRUFBRSxJQUFJO0lBQ2IsUUFBUSxFQUFFLEVBQUU7Q0FDZixDQUFBO0FBRUQsU0FBUyxPQUFPLENBQUMsS0FBK0IsRUFBRSxNQUFNOztJQUF2QyxzQkFBQSxFQUFBLG9CQUErQjtJQUU1QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDakIsS0FBSyxlQUFlO1lBQ2hCLDZCQUNPLEtBQUssZ0JBQ1AsTUFBTSxDQUFDLEtBQUssSUFBRyxNQUFNLENBQUMsTUFBTSxPQUMvQjtRQUNOO1lBQ0ksT0FBTyxLQUFLLENBQUE7S0FDbkI7QUFDTCxDQUFDO0FBRUQ7SUFBQTtRQUVXLFVBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFNeEMsQ0FBQztJQUpHLDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSxnQ0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJ2Qix3RkFBcUY7QUFDckYsNkVBQTBFO0FBQzFFLHNDQUFzQztBQUV0Qzs7R0FFRztBQUNIO0lBQTJDLHlDQUFlO0lBQTFEOztJQU9BLENBQUM7SUFKUyx1Q0FBTyxHQUFiOzs7O2dCQUNVLFdBQVcsR0FBaUIsSUFBQSxvQkFBVSxFQUFDLDJCQUFZLENBQUMsQ0FBQztnQkFDM0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsaUNBQWlDLENBQUMsQ0FBQzs7OztLQUNyRTtJQUxNLGtDQUFZLEdBQUcsK0VBQStFLENBQUM7SUFNMUcsNEJBQUM7Q0FQRCxBQU9DLENBUDBDLGlDQUFlLEdBT3pEO0FBUFksc0RBQXFCOzs7Ozs7Ozs7QUNObEMsMkZBQXdGO0FBQ3hGLHNDQUFzQztBQUUvQixJQUFNLHVCQUF1QixHQUFHLFVBQUMsS0FBYSxFQUFFLEdBQVc7SUFDOUQsSUFBTSxJQUFJLEdBQWU7UUFDckIsS0FBSyxPQUFBO1FBQ0wsTUFBTSxFQUFFO1lBQ0o7Z0JBQ0ksRUFBRSxFQUFFLFFBQVE7Z0JBQ1osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxHQUFHO2FBQ1o7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLEtBQUssRUFBRSxPQUFPO2FBQ2pCO1NBQ0o7S0FDSixDQUFDO0lBQ0YsSUFBQSxvQkFBVSxFQUFDLHlDQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQWxCWSxRQUFBLHVCQUF1QiwyQkFrQm5DOzs7Ozs7QUN0QkQ7QUFDQTtBQUNBOzs7O0FDRkE7QUFDQTtBQUNBOzs7O0FDRkE7QUFDQTtBQUNBIiwiZmlsZSI6Im1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXRGbGlnaHRGcm9tU2FicmVEYXRhID0gKGRhdGE6IGFueSwgc2VnbWVudEluZGV4OiBudW1iZXIgPSAwKSA9PiB7XG4gIGNvbnN0IHNlZ21lbnQgPSBkYXRhLmZsaWdodFNlZ21lbnRzPy5bc2VnbWVudEluZGV4XTtcblxuICBpZiAoIXNlZ21lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oYKAPIFNlZ21lbnQgaW5kZXggJHtzZWdtZW50SW5kZXh9IG5vdCBmb3VuZGApO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1VOS05PV04nLFxuICAgICAgYWlybGluZUNvZGU6ICcnLFxuICAgICAgZmxpZ2h0Tm86ICcnLFxuICAgICAgZGVwYXJ0dXJlRGF0ZTogJycsXG4gICAgICBkZXBhcnR1cmU6ICcnLFxuICAgICAgYXJyaXZhbDogJycsXG4gICAgICBjYWJpbkNsYXNzOiAnJ1xuICAgIH07XG4gIH1cblxuICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuRGVwYXJ0dXJlRGF0ZVRpbWU7XG4gIGNvbnN0IGRlcGFydHVyZURhdGUgPSBkZXBhcnR1cmVEYXRlVGltZS5zcGxpdCgnVCcpWzBdOyAvLyAeQUIwMjtPNTwgQj47TDo+IDQwQkNcblxuICByZXR1cm4ge1xuICAgIGlkOiAnMDAxJywgLy8gHD42PT4gPz43NjUgQTM1PTVAOEA+MjBCTCBJRCA4PTBHNVxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnQScgLy8gHz46MCBEODpBOEA+MjA9PiwgPD42PT4gQDBBSDhAOEJMXG4gIH07XG5cbn07IiwiZXhwb3J0IGNvbnN0IHF1aWNrZXRDb25maWcgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBsYW5nOiAnRU4nLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICB2aXNpYmxlRnVzZWxhZ2U6IHRydWUsXG4gICAgdmlzaWJsZVdpbmdzOiB0cnVlLFxuICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgc2luZ2xlRGVja01vZGU6IHRydWUsXG4gICAgYnVpbHRJblRvb2x0aXA6IHRydWUsXG4gICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICB0b29sdGlwT25Ib3ZlcjogZmFsc2UsXG4gICAgY29sb3JUaGVtZToge1xuICAgICAgICBzZWF0TGFiZWxDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgc2VhdFN0cm9rZUNvbG9yOiAnZ3JheSdcbiAgICB9XG59OyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldEZsaWdodEZyb21TYWJyZURhdGEgfSBmcm9tICcuLi9hYmMtc2VhdG1hcC9nZXRGbGlnaHRGcm9tU2FicmVEYXRhJztcblxuaW50ZXJmYWNlIFNlYXRNYXBQcm9wcyB7XG4gIGNvbmZpZzogYW55O1xuICBkYXRhOiBhbnk7IC8vIDI8NUFCPiBmbGlnaHQgQjU/NUBMID8+O0NHMDU8IDI1QUwgZGF0YVxufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50OiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vID0NIBs+MzhAQzU8IDJFPjRPSTg1IDQwPT1LNVxuICBjb25zb2xlLmxvZygnPTkgW1NlYXRNYXBDb21wb25lbnRdIHJlY2VpdmVkIHByb3BzOicsIHsgY29uZmlnLCBkYXRhIH0pO1xuXG4gIGNvbnN0IGZsaWdodCA9IGdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KTsgLy8gTUI+IEA1OUEgQSBBNTM8NT1CPjxcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0KTtcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG5cbiAgICAgIC8vIDw+Nj0+IEAwQTo+PDw1PUI4QD4yMEJMID9AOCA9NT4xRT40ODw+QUI4XG4gICAgICAvLyBhdmFpbGFiaWxpdHk6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmF2YWlsYWJpbGl0eSksXG4gICAgICAvLyBwYXNzZW5nZXJzOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5wYXNzZW5nZXJzKVxuXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICB7LyogPjo9PiBBIDQwPT1LPDggPiBANTlBNSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIGZvbnRTaXplOiAnMC45cmVtJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgPHN0cm9uZz496yBGbGlnaHQgaW5mbzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZmxpZ2h0LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nIH19PlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlZ21lbnRTZWxlY3RcIj4SSzE1QDhCNSBBNTM8NT1COiA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJzZWdtZW50U2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VnbWVudEluZGV4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VnbWVudEluZGV4KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfT5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fT5cbiAgICAgICAgICAgICAge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnWFgnfSB7c2VnbWVudC5GbGlnaHROdW1iZXIgfHwgJzAwMCd9XG4gICAgICAgICAgICAgICZuYnNwO5ImbmJzcDtcbiAgICAgICAgICAgICAge3NlZ21lbnQuT3JpZ2luTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9IBNcbiAgICAgICAgICAgICAge3NlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J31cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aWZyYW1lXG4gICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICBvbkxvYWQ9eygpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnBSBbU2VhdE1hcENvbXBvbmVudF0gaWZyYW1lIGxvYWRlZCwgc2VuZGluZyBkYXRhLi4uJyk7XG4gICAgICAgICAgc2VuZFRvSWZyYW1lKCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudDsiLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50JztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwTW9kYWwoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IHZvaWQge1xuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyJyxcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCAyNUFMID4xSjU6QiBCOD8wIFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgRjU7ODo+PFxuICAgIH0pLFxuICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIE1vZGFsXSBDbG9zZWQnKVxuICB9O1xuXG4gIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTtcbiAgXG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9ID4gXG4gICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuICAgICAgICAgICAgPG9sPlxuICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFxuXG4vLyBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbi8vIGltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9Db250ZXh0Jztcbi8vIGltcG9ydCB7SVNlYXRNYXBTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytc2VhdG1hcC9zZXJ2aWNlcy9JU2VhdE1hcFNlcnZpY2UnO1xuXG4vLyBleHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbi8vICAgICBjb25zdCBoYW5kbGVPcGVuU2VhdE1hcCA9IGFzeW5jIChmbGlnaHRTZWdtZW50TnVtYmVyOiBudW1iZXIpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYD3rIE9wZW5pbmcgU2VhdCBNYXAgZm9yIHNlZ21lbnQ6ICR7ZmxpZ2h0U2VnbWVudE51bWJlcn1gKTtcbiAgICBcbi8vICAgICAgICAgdHJ5IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0U2VydmljZShJU2VhdE1hcFNlcnZpY2UpLm9wZW5TZWF0TWFwRm9yRmxpZ2h0U2VnbWVudChmbGlnaHRTZWdtZW50TnVtYmVyKTtcbiAgICBcbi8vICAgICAgICAgICAgIGlmICghcmVzcG9uc2UubW9kYWxPcGVuZWRDb3JyZWN0bHkpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGCgDyBFcnJvciBvcGVuaW5nIFNlYXQgTWFwOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX1gKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEwgRmFpbGVkIHRvIG9wZW4gU2VhdCBNYXA6YCwgZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfTtcblxuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuLy8gICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbi8vICAgICAgICAgICAgIDxvbD5cbi8vICAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4vLyAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlT3BlblNlYXRNYXAoaW5kZXggKyAxKX0+PpEgT3BlbiBTZWF0IE1hcDwvYnV0dG9uPlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICkpfVxuLy8gICAgICAgICAgICAgPC9vbD5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgKTtcbi8vIH07XG5cblxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcE1vZGFsIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFZpZXcgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCc9gCBTZWF0TWFwQXZhaWxWaWV3IGRhdGE6JywgZGF0YSk7IC8vIDs+MyAyID49QT47TFxuICAgICAgc2hvd1NlYXRNYXBNb2RhbChkYXRhKTsgLy8gPz46MDdLMjA1PCA8PjQwO0w9PjUgPjo9PlxuICAgIH0sIFtdKTtcbiAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9OyIsImltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IFRpbGVPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZU9wdGlvbnMnO1xuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFdpdGhvdXRGb2N1c09uQ2xpY2sgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vbWl4aW5zL1dpdGhvdXRGb2N1c09uQ2xpY2snO1xuaW1wb3J0IHsgSW5pdGlhbCB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9Jbml0aWFsJztcbmltcG9ydCB7IE1peGluIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL01peGluJztcbmltcG9ydCB7IENzc0NsYXNzIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSlcbkBJbml0aWFsPFRpbGVPcHRpb25zPih7XG4gICAgY2FwdGlvbjogJ0FCQyBTZWF0IE1hcCAoU0hPUFBJTkcpJyxcbiAgICBjbGFzc05hbWU6ICdzZGstc2VhdG1hcC1jdXN0b20tdGlsZSdcbn0pXG5ATWl4aW4oV2l0aG91dEZvY3VzT25DbGljaylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdUaWxlIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiBpbXBsZW1lbnRzIFdpdGhvdXRGb2N1c09uQ2xpY2sge1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0aW5lcmFyeSA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpO1xuICAgICAgICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGl0aW5lcmFyeS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgICAgICBjb25zdCBwcmljZSA9IGl0aW5lcmFyeS5nZXRQcmljZSgpO1xuXG4gICAgICAgIGNvbnN0IGZsaWdodE51bWJlcnMgPSBmbGlnaHRTZWdtZW50cy5tYXAoc2VnID0+IHNlZy5nZXRGbGlnaHROdW1iZXIoKSk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRJbmZvID0gZmxpZ2h0TnVtYmVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGA8ZGl2PlNlZ21lbnRzOjxici8+JHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJyl9PC9kaXY+YFxuICAgICAgICAgICAgOiBgPGRpdj5TZWdtZW50OiAke2ZsaWdodE51bWJlcnNbMF0gfHwgJ04vQSd9PC9kaXY+YDtcblxuICAgICAgICBjb25zdCBwcmljZUluZm8gPSBgPGRpdj5QcmljZTogJHtwcmljZX08L2Rpdj5gO1xuXG4gICAgICAgIHRoaXMuc2V0RGF0YUNvbnRlbnQoc2VnbWVudEluZm8gKyBwcmljZUluZm8pO1xuICAgIH1cblxuICAgIHNlbGZTZWxlY3RlZEZhcmVDaGFuZ2VkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYSk7XG4gICAgfVxufSIsImltcG9ydCB7QWJzdHJhY3RWaWV3fSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3XCI7XG5pbXBvcnQge0Fic3RyYWN0TW9kZWx9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsXCI7XG5pbXBvcnQge0ZsaWdodFNlZ21lbnR9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudFwiO1xuaW1wb3J0IHtDc3NDbGFzc30gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLXRpbGV3aWRnZXRzLXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlOlNhbXBsZURyYXdlclZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gY3BhLmdldFNob3BwaW5nSXRpbmVyYXJ5KCkuZ2V0RmxpZ2h0U2VnbWVudHMoKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudHNEYXRhID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgc2VnbWVudC5nZXRGbGlnaHREZXRhaWxzKHsgaXNNYWNoaW5lUmVxdWVzdDogZmFsc2UgfSkuYWx3YXlzKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFpciBtaWxlcyBwb3N0LWRldGFpbHMgY2FsbDogJHtyZXN1bHQ/LmdldEFpck1pbGVzKCl9YClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlZ21lbnRJZDogc2VnbWVudC5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCksXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKSxcbiAgICAgICAgICAgICAgICBhaXJNaWxlczogc2VnbWVudC5nZXRBaXJNaWxlcygpLFxuICAgICAgICAgICAgICAgIGhpZGRlblN0b3BzQ291bnQ6IHNlZ21lbnQuZ2V0RmxpZ2h0U3RvcHMoKT8ubGVuZ3RoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZXRNb2RlbCgpLnNldCgnZGF0YScsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnRzRGF0YSwgbnVsbCwgNCkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSwgcmVnaXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQnV0dG9uIH0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbENvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL1JlZEFwcFNpZGVQYW5lbENvbmZpZyc7XG5cbmltcG9ydCB7IEN1c3RvbVdvcmtmbG93U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVBuckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybSc7XG5pbXBvcnQgeyBjYWxsTGFzTGF4IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHsgc2hvd1J1bnRpbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUnO1xuaW1wb3J0IHsgc2hvd0ludGVyc3RpdGlhbCB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsJztcbmltcG9ydCB7IHNob3dBZ2VudFByb2ZpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQgeyBzaG93QmFubmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QmFubmVycyc7XG5pbXBvcnQgeyByZWZyZXNoVHJpcFN1bW1hcnkgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5JztcbmltcG9ydCB7IGNhbGxFeHRlcm5hbFNlcnZpY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb25Gb3JtLCBoaWRlTm90aWZpY2F0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtJztcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldyc7XG5cbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRHJhd2VyU2VydmljZSc7XG5pbXBvcnQgeyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2NvbmZpZ3MvZHJhd2VyL0xhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnJztcblxuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5cbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBNYWluIGV4dGVuZHMgTW9kdWxlIHtcbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgdGhpcy5yZWdpc3RlclNlcnZpY2VzKCk7XG4gICAgdGhpcy5zZXR1cFNpZGVQYW5lbEJ1dHRvbnMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwU2hvcHBpbmdUaWxlKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBTaG9wcGluZ1dpZGdldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNlcnZpY2VzKCk6IHZvaWQge1xuICAgIHJlZ2lzdGVyU2VydmljZShDdXN0b21Xb3JrZmxvd1NlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNpZGVQYW5lbEJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZUNzc0NsYXNzTmFtZXMgPSAnYnRuIGJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b24gcmVkYXBwLXdlYi1jdXN0b213b3JrZmxvdyc7XG5cbiAgICBjb25zdCBzZWxmUmVtb3ZlQnRuID0gbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVtb3ZhYmxlIEJ1dHRvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZW1vdmUnLCAoKSA9PiB7XG4gICAgICBzZWxmUmVtb3ZlQnRuLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29uZmlnID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGJhbm5lcnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYmFubmVycycsIHNob3dCYW5uZXJzKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0V4dGVybmFsIHNlcnZpY2UgY2FsbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1leHRlcm5hbHNlcnZpY2VjYWxsJywgY2FsbEV4dGVybmFsU2VydmljZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWRBcHAgcGxhdGZvcm0nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcGxhdGZvcm0nLCBzaG93UnVudGltZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdMQVMgLSBMQVgnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWN0aW9uJywgY2FsbExhc0xheCksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgUE5SJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBucicsIGNyZWF0ZVBuckZvcm0pLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBpbnRlcnN0aXRpYWwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaW50ZXJzdGl0aWFsJywgc2hvd0ludGVyc3RpdGlhbCksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IEFnZW50IFByb2ZpbGUnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWdlbnRwcm9maWxlJywgc2hvd0FnZW50UHJvZmlsZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWZyZXNoIFRyaXAgU3VtbWFyeScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZWZyZXNodHJpcCcsIHJlZnJlc2hUcmlwU3VtbWFyeSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgbm90aWZpY2F0aW9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWNyZWF0ZU5vdGlmaWNhdGlvbicsIGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0pLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignSGlkZSBub3RpZmljYXRpb25zJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWhpZGVOb3RpZmljYXRpb24nLCBoaWRlTm90aWZpY2F0aW9ucyksXG4gICAgICBzZWxmUmVtb3ZlQnRuXG4gICAgXSk7XG5cbiAgICBnZXRTZXJ2aWNlKEV4dGVuc2lvblBvaW50U2VydmljZSkuYWRkQ29uZmlnKCdyZWRBcHBTaWRlUGFuZWwnLCBjb25maWcpO1xuICB9XG5cbiAgLy8gQXZhaWxhYmlsaXR5VGlsZVxuICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlKTsgLy8gMj1DQkA1PT04OSBBNUAyOEEgNDtPID9ANTQ+QUIwMjs1PThPIDQwPT1LRSAyIEAwPDowRSBBdmFpbGFiaWxpdHlcblxuICAgIGNvbnN0IHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgICBjb25zdCBtb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICdBQkMgU2VhdE1hcCAoQXZhaWxhYmlsaXR5KScsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQXZhaWxWaWV3LCBkYXRhKSxcbiAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdyZWFjdC10aWxlLW1vZGFsLWNsYXNzJ1xuICAgICAgfTtcblxuICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlLmNyZWF0ZUFpckF2YWlsYWJpbGl0eVNlYXJjaFRpbGUoXG4gICAgICBTZWF0TWFwQXZhaWxUaWxlLFxuICAgICAgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCxcbiAgICAgICdBQkMgU2VhdE1hcCdcbiAgICApO1xuICB9XG5cbiAgLy8gU2hvcHBpbmdUaWxlXG4gIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwU2hvcHBpbmdUaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRyYXdlclNlcnZpY2UgPSBnZXRTZXJ2aWNlKERyYXdlclNlcnZpY2UpOyAvLyAyPUNCQDU9PTg5IEE1QDI4QSA0O08gP0A1ND5BQjAyOzU9OE8gNDA9PUtFXG5cbiAgICBjb25zdCBzaG93U2VhdE1hcFNob3BwaW5nTW9kYWwgPSAoc2VnbWVudDogRmxpZ2h0U2VnbWVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZmxpZ2h0U2VnbWVudHM6IFtzZWdtZW50XSxcbiAgICAgICAgZGF0ZU9mRmxpZ2h0OiBzZWdtZW50LmdldERlcGFydHVyZURhdGUoKT8udG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICc96yBBQkMgU2VhdE1hcCAoVGlsZSknLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH0pLFxuICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnLFxuICAgICAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbPewgU2VhdE1hcCBUaWxlIE1vZGFsIENsb3NlZF0nKVxuICAgICAgfTtcblxuICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBzaG9wcGluZ1RpbGVDb25maWcgPSBuZXcgTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcoXG4gICAgICBjbGFzcyBleHRlbmRzIFRpbGU8RmxpZ2h0U2VnbWVudD4ge1xuICAgICAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChzZWdtZW50OiBGbGlnaHRTZWdtZW50KSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhQ29udGVudChgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlNob3cgU2VhdE1hcCBUaWxlPC9idXR0b24+YCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbkNsaWNrKCkge1xuICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLmdldE1vZGVsKCkgYXMgRmxpZ2h0U2VnbWVudDtcbiAgICAgICAgICBjb25zb2xlLmxvZygnWz7pIFRpbGVdIFNlZ21lbnQ6Jywgc2VnbWVudCk7XG4gICAgICAgICAgc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge30sXG4gICAgICB7IHRpdGxlOiAnU2VhdE1hcCBUaWxlIFZpZXdlcicgfVxuICAgICk7XG5cbiAgICBkcmF3ZXJTZXJ2aWNlLmFkZENvbmZpZyhbJ3Nob3BwaW5nLWZsaWdodC1zZWdtZW50J10sIHNob3BwaW5nVGlsZUNvbmZpZyk7XG4gIH1cblxuICAvLyBTaG9wcGluZ1dpZGdldFxuICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nV2lkZ2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IGRyYXdlclNlcnZpY2UgPSBnZXRTZXJ2aWNlKERyYXdlclNlcnZpY2UpOyAvLyAyPUNCQDU9PTg5IEE1QDI4QSA0O08gP0A1ND5BQjAyOzU9OE8gNDA9PUtFXG5cbiAgICBjb25zdCBzaG93U2VhdE1hcFNob3BwaW5nTW9kYWwgPSAoc2VnbWVudDogRmxpZ2h0U2VnbWVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZmxpZ2h0U2VnbWVudHM6IFtzZWdtZW50XSxcbiAgICAgICAgZGF0ZU9mRmxpZ2h0OiBzZWdtZW50LmdldERlcGFydHVyZURhdGUoKT8udG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICc9yw8gQUJDIFNlYXRNYXAgKFNob3BwaW5nIFdpZGdldCknLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH0pLFxuICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnLFxuICAgICAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbPewgU2VhdE1hcCBTaG9wcGluZyBXaWRnZXQgTW9kYWwgQ2xvc2VkXScpXG4gICAgICB9O1xuXG4gICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG1vZGFsT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3BwaW5nV2lkZ2V0VGlsZUNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhcbiAgICAgIGNsYXNzIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiB7XG4gICAgICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKHNlZ21lbnQ6IEZsaWdodFNlZ21lbnQpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFDb250ZW50KGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIj49yw8gT3BlbiBTZWF0TWFwIFdpZGdldDwvYnV0dG9uPmApO1xuICAgICAgICB9XG5cbiAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5nZXRNb2RlbCgpIGFzIEZsaWdodFNlZ21lbnQ7IC8vIDE1QDU8IDg3IDw+NDU7OCBCNTpDSTg5IEE1Mzw1PUJcbiAgICAgICAgICBjb25zb2xlLmxvZygnWz7pIFRpbGVdIFNlZ21lbnQ6Jywgc2VnbWVudCk7XG4gICAgICAgICAgc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge30sXG4gICAgICB7IHRpdGxlOiAnU2VhdE1hcCBXaWRnZXQgVmlld2VyJyB9XG4gICAgKTtcblxuICAgIGRyYXdlclNlcnZpY2UuYWRkQ29uZmlnKFsnc2hvcHBpbmctZmxpZ2h0LXNlZ21lbnQnXSwgc2hvcHBpbmdXaWRnZXRUaWxlQ29uZmlnKTtcbiAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGxdfQ== 