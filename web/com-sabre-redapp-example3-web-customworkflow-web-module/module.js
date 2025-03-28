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
    console.log('🧠 SeatMapComponent is rendering!');
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
"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function __(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}}(),__decorate=this&&this.__decorate||function(e,t,r,o){var a,n=arguments.length,i=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(n<3?a(i):n>3?a(t,r,i):a(t,r))||i);return n>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapShoppingDrawerView=void 0;var React=require("react"),AbstractView_1=require("sabre-ngv-app/app/AbstractView"),CssClass_1=require("sabre-ngv-core/decorators/classes/view/CssClass"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig"),SeatMapShoppingDrawerView=function(e){function SeatMapShoppingDrawerView(){return null!==e&&e.apply(this,arguments)||this}return __extends(SeatMapShoppingDrawerView,e),SeatMapShoppingDrawerView.prototype.selfDrawerContextModelPropagated=function(e){var t,r=e,o={flightSegments:[this.extractSegment(r)],dateOfFlight:(null===(t=r.getDepartureDate())||void 0===t?void 0:t.toISOString().split("T")[0])||"2025-04-21"},a={header:"SeatMap Viewer (Shopping)",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:o}),modalClassName:"react-tile-modal-class"};(0,Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(a)},SeatMapShoppingDrawerView.prototype.extractSegment=function(e){return{OriginLocation:{EncodeDecodeElement:{Code:e.getOriginIata()}},DestinationLocation:{EncodeDecodeElement:{Code:e.getDestinationIata()}},DisclosureAirline:{EncodeDecodeElement:{Code:e.getMarketingAirline()}},FlightNumber:e.getFlightNumber(),Equipment:{EncodeDecodeElement:{Code:e.getEquipmentCode||"388"}}}},__decorate([(0,CssClass_1.CssClass)("com-sabre-redapp-example3-web-customworkflow-web-module")],SeatMapShoppingDrawerView)}(AbstractView_1.AbstractView);exports.SeatMapShoppingDrawerView=SeatMapShoppingDrawerView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports, module) {
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),SeatMapComponent_1=require("./SeatMapComponent"),SeatMapShoppingView=function(e){return console.log("[SeatMapShoppingView] received props:",e),React.createElement(SeatMapComponent_1.default,__assign({},e))};exports.default=SeatMapShoppingView;


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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapModalForSegment=void 0;var React=require("react"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig");function showSeatMapModalForSegment(e){var o,t=(0,Context_1.getService)(PublicModalService_1.PublicModalsService),a={flightSegments:[e],dateOfFlight:(null===(o=e.getDepartureDate())||void 0===o?void 0:o.toISOString().split("T")[0])||"2025-04-21"};console.log("[✅ showSeatMapModalForSegment] Will open modal with data:",a);var r={header:"SeatMap Viewer (from Segment)",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:a}),onHide:function(){return console.log("[SeatMap Modal for Segment] Closed")}};t.showReactModal(r)}exports.showSeatMapModalForSegment=showSeatMapModalForSegment;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapShoppingModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapShoppingModal=void 0;var React=require("react"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig");function showSeatMapShoppingModal(e){var o,t={flightSegments:[e],dateOfFlight:(null===(o=e.getDepartureDate())||void 0===o?void 0:o.toISOString().split("T")[0])||"2025-04-21"},a={header:"🛫 SeatMap from Shopping Segment",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:t}),modalClassName:"react-tile-modal-class",onHide:function(){return console.log("[🛬 SeatMap Shopping Modal Closed]")}};(0,Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(a)}exports.showSeatMapShoppingModal=showSeatMapShoppingModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapShoppingModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapShoppingModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapShoppingModal"))});
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
        var flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map(function (segment) { return segment.getFlightNumber(); });
        var segmentsHtml = flightNumbers.length > 1
            ? "<div>Segments:<br />" + flightNumbers.join(', ') + "</div>"
            : "<div>Segment: " + (flightNumbers.join(', ') || 'N/A') + "</div>";
        var priceHtml = "<div>Price: " + cpa.getShoppingItinerary().getPrice() + "</div>";
        this.setDataContent(segmentsHtml + priceHtml);
    };
    SeatMapShoppingTile.prototype.selfSelectedFareChanged = function (cpa) {
        this.selfDrawerContextModelPropagated(cpa);
    };
    SeatMapShoppingTile = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-tilewidgets-web-module', { overwrite: false }),
        (0, Initial_1.Initial)({
            caption: 'Air Shopping',
            className: 'web-air-shopping-widget-sample'
        }),
        (0, Mixin_1.Mixin)(WithoutFocusOnClick_1.WithoutFocusOnClick)
    ], SeatMapShoppingTile);
    return SeatMapShoppingTile;
}(Tile_1.Tile));
exports.SeatMapShoppingTile = SeatMapShoppingTile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView", ["sabre-ngv-app/app/AbstractView","sabre-ngv-core/decorators/classes/view/CssClass","sabre-ngv-core/decorators/classes/view/Template","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports, module) {
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/DrawerService","sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView"], false, function (require, exports, module) {
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
var SeatMapShoppingTile_1 = require("./components/abc-seatmap/widgets/SeatMapShoppingTile");
var SeatMapShoppingView_1 = require("./components/abc-seatmap/widgets/SeatMapShoppingView");
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
        // определяем config shoppingDrawerConfig
        var shoppingDrawerConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(SeatMapShoppingTile_1.SeatMapShoppingTile, SeatMapShoppingView_1.SeatMapShoppingView, {
            title: 'Shopping TileWidget' // заголовок окна
        });
        // вызвываем сервис с этим config shoppingDrawerConfig
        (0, Context_1.getService)(DrawerService_1.DrawerService).addConfig(['shopping-flight-segment'], shoppingDrawerConfig);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudC50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldy5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdWaWV3LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWxGb3JTZWdtZW50LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC90cmFuc2Zvcm1GbGlnaHQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZS50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVGlsZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3LnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FjdGlvbnMuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NhbGxFeHRlcm5hbFNlcnZpY2UudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NhbGxMYXNMYXgudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm0udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvYWN0aW9ucy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvTW9kYWxDb21wb25lbnQudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9yZWZyZXNoVHJpcFN1bW1hcnkudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dCdXR0b25BY3Rpb24udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dJbnRlcnN0aXRpYWwudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dSdW50aW1lLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL3Nob3dTZWF0TWFwTW9kYWwuanMiLCJzcmMvY29kZS9Db250ZXh0LnRzIiwic3JjL2NvZGUvaW5kZXgudHMiLCJzcmMvY29kZS9pbnRlcmZhY2VzL1N0b3JlRGF0YS50cyIsInNyYy9jb2RlL01haW4udHMiLCJzcmMvY29kZS9yZWR1Y2Vycy9Mb2NhbFN0b3JlLnRzIiwic3JjL2NvZGUvc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlLnRzIiwic3JjL2NvZGUvdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3V0aWxzL3RyYW5zZm9ybUZsaWdodC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdmlld3MvYXZhaWwvc2VhdG1hcC9TZWF0TWFwQXZhaWxUaWxlLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU0sc0JBQXNCLEdBQUcsVUFBQyxJQUFTLEVBQUUsWUFBd0I7O0lBQXhCLDZCQUFBLEVBQUEsZ0JBQXdCO0lBQ3hFLElBQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUcsWUFBWSxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQW9CLFlBQVksZUFBWSxDQUFDLENBQUM7UUFDM0QsT0FBTztZQUNMLEVBQUUsRUFBRSxTQUFTO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUM7S0FDSDtJQUVE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akI7U0FDSjtLQUNKLENBQUM7SUFDRixJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsdUJBQXVCLDJCQWtCbkM7Ozs7OztBQ3RCRDtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0EiLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldEZsaWdodEZyb21TYWJyZURhdGEgPSAoZGF0YTogYW55LCBzZWdtZW50SW5kZXg6IG51bWJlciA9IDApID0+IHtcbiAgY29uc3Qgc2VnbWVudCA9IGRhdGEuZmxpZ2h0U2VnbWVudHM/LltzZWdtZW50SW5kZXhdO1xuXG4gIGlmICghc2VnbWVudCkge1xuICAgIGNvbnNvbGUud2FybihgoA8gU2VnbWVudCBpbmRleCAke3NlZ21lbnRJbmRleH0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnVU5LTk9XTicsXG4gICAgICBhaXJsaW5lQ29kZTogJycsXG4gICAgICBmbGlnaHRObzogJycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnJyxcbiAgICAgIGRlcGFydHVyZTogJycsXG4gICAgICBhcnJpdmFsOiAnJyxcbiAgICAgIGNhYmluQ2xhc3M6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGRlcGFydHVyZURhdGVUaW1lID0gc2VnbWVudC5EZXBhcnR1cmVEYXRlVGltZTtcbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLCAvLyAcPjY9PiA/Pjc2NSBBMzU9NUA4QD4yMEJMIElEIDg9MEc1XG4gICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBmbGlnaHRObzogc2VnbWVudC5GbGlnaHROdW1iZXIsXG4gICAgZGVwYXJ0dXJlRGF0ZSxcbiAgICBkZXBhcnR1cmU6IHNlZ21lbnQuT3JpZ2luTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGNhYmluQ2xhc3M6ICdBJyAvLyAfPjowIEQ4OkE4QD4yMD0+LCA8PjY9PiBAMEFIOEA4QkxcbiAgfTtcblxufTsiLCJleHBvcnQgY29uc3QgcXVpY2tldENvbmZpZyA9IHtcbiAgICB3aWR0aDogNDAwLFxuICAgIGxhbmc6ICdFTicsXG4gICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgcmlnaHRUb0xlZnQ6IGZhbHNlLFxuICAgIHZpc2libGVGdXNlbGFnZTogdHJ1ZSxcbiAgICB2aXNpYmxlV2luZ3M6IHRydWUsXG4gICAgYnVpbHRJbkRlY2tTZWxlY3RvcjogdHJ1ZSxcbiAgICBzaW5nbGVEZWNrTW9kZTogdHJ1ZSxcbiAgICBidWlsdEluVG9vbHRpcDogdHJ1ZSxcbiAgICBleHRlcm5hbFBhc3Nlbmdlck1hbmFnZW1lbnQ6IGZhbHNlLFxuICAgIHRvb2x0aXBPbkhvdmVyOiBmYWxzZSxcbiAgICBjb2xvclRoZW1lOiB7XG4gICAgICAgIHNlYXRMYWJlbENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBzZWF0U3Ryb2tlQ29sb3I6ICdncmF5J1xuICAgIH1cbn07IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4uL2FiYy1zZWF0bWFwL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTsgLy8gMjw1QUI+IGZsaWdodCBCNT81QEwgPz47Q0cwNTwgMjVBTCBkYXRhXG59XG5cbmNvbnN0IFNlYXRNYXBDb21wb25lbnQ6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zOEBDNTwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQDU5QSBBIEE1Mzw1PUI+PFxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHQpO1xuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQsXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBhdmFpbGFiaWxpdHk6IFtcbiAgICAgIHsgbGFiZWw6ICcxQScsIHByaWNlOiA1MCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2dyZWVuJywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcxQicsIHByaWNlOiA0NSwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ3llbGxvdycsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMkEnLCBwcmljZTogMzAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdsaWdodGJsdWUnIH1cbiAgICBdLFxuICAgIHBhc3NlbmdlcnM6IFt7IGlkOiAnUEFYMScsIG5hbWU6ICcYMjA9PjIgGC4YLicsIHR5cGU6ICdBRFQnIH1dXG4gIH07XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSBvciBjb250ZW50V2luZG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcblxuICAgICAgLy8gPD42PT4gQDBBOj48PDU9QjhAPjIwQkwgP0A4ID01PjFFPjQ4PD5BQjhcbiAgICAgIC8vIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgIC8vIHBhc3NlbmdlcnM6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLnBhc3NlbmdlcnMpXG5cbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShmbGlnaHQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwQ29tcG9uZW50XSBpZnJhbWUgbG9hZGVkLCBzZW5kaW5nIGRhdGEuLi4nKTtcbiAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudDsiLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50JztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwTW9kYWwoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IHZvaWQge1xuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyJyxcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCAyNUFMID4xSjU6QiBCOD8wIFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgRjU7ODo+PFxuICAgIH0pLFxuICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIE1vZGFsXSBDbG9zZWQnKVxuICB9O1xuXG4gIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTtcbiAgXG59IixudWxsLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgICAgICBcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfSA+IFxuICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBcblxuLy8gaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG4vLyBpbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQ29udGV4dCc7XG4vLyBpbXBvcnQge0lTZWF0TWFwU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXNlYXRtYXAvc2VydmljZXMvSVNlYXRNYXBTZXJ2aWNlJztcblxuLy8gZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4vLyAgICAgY29uc3QgaGFuZGxlT3BlblNlYXRNYXAgPSBhc3luYyAoZmxpZ2h0U2VnbWVudE51bWJlcjogbnVtYmVyKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGA96yBPcGVuaW5nIFNlYXQgTWFwIGZvciBzZWdtZW50OiAke2ZsaWdodFNlZ21lbnROdW1iZXJ9YCk7XG4gICAgXG4vLyAgICAgICAgIHRyeSB7XG4vLyAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFNlcnZpY2UoSVNlYXRNYXBTZXJ2aWNlKS5vcGVuU2VhdE1hcEZvckZsaWdodFNlZ21lbnQoZmxpZ2h0U2VnbWVudE51bWJlcik7XG4gICAgXG4vLyAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm1vZGFsT3BlbmVkQ29ycmVjdGx5KSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgoA8gRXJyb3Igb3BlbmluZyBTZWF0IE1hcDogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9YCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBMIEZhaWxlZCB0byBvcGVuIFNlYXQgTWFwOmAsIGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH07XG5cbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbi8vICAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4vLyAgICAgICAgICAgICA8b2w+XG4vLyAgICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuLy8gICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5TZWF0TWFwKGluZGV4ICsgMSl9Pj6RIE9wZW4gU2VhdCBNYXA8L2J1dHRvbj5cbi8vICAgICAgICAgICAgICAgICAgICAgPC9saT5cbi8vICAgICAgICAgICAgICAgICApKX1cbi8vICAgICAgICAgICAgIDwvb2w+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICk7XG4vLyB9O1xuXG5cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBNb2RhbCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbCc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxWaWV3ID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnPYAgU2VhdE1hcEF2YWlsVmlldyBkYXRhOicsIGRhdGEpOyAvLyA7PjMgMiA+PUE+O0xcbiAgICAgIHNob3dTZWF0TWFwTW9kYWwoZGF0YSk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT5cbiAgICB9LCBbXSk7XG4gIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbiAgICAgICAgPHA+HkI6QEsyMDU8IFNlYXRNYXAgVmlld2VyLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTsiLCJpbXBvcnQge1RpbGV9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGUnO1xuaW1wb3J0IHtUaWxlT3B0aW9uc30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZU9wdGlvbnMnO1xuaW1wb3J0IHtGbGlnaHRTZWdtZW50fSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQge1dpdGhvdXRGb2N1c09uQ2xpY2t9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9taXhpbnMvV2l0aG91dEZvY3VzT25DbGljayc7XG5pbXBvcnQge0luaXRpYWx9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9Jbml0aWFsJztcbmltcG9ydCB7TWl4aW59IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9NaXhpbic7XG5pbXBvcnQge0Nzc0NsYXNzfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5cbkBDc3NDbGFzcygnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItdGlsZXdpZGdldHMtd2ViLW1vZHVsZScsIHsgb3ZlcndyaXRlOiBmYWxzZSB9KVxuQEluaXRpYWw8VGlsZU9wdGlvbnM+KHtcbiAgICBjYXB0aW9uOiAnQWlyIFNob3BwaW5nJywgLy8gODxPIHRpbGVcbiAgICBjbGFzc05hbWU6ICd3ZWItYWlyLXNob3BwaW5nLXdpZGdldC1zYW1wbGUnXG59KVxuQE1peGluKFdpdGhvdXRGb2N1c09uQ2xpY2spXG5leHBvcnQgY2xhc3MgU2VhdE1hcFNob3BwaW5nVGlsZSBleHRlbmRzIFRpbGU8RmxpZ2h0U2VnbWVudD4gaW1wbGVtZW50cyBXaXRob3V0Rm9jdXNPbkNsaWNrIHtcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmbGlnaHROdW1iZXJzID0gY3BhLmdldFNob3BwaW5nSXRpbmVyYXJ5KCkuZ2V0RmxpZ2h0U2VnbWVudHMoKS5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCkpO1xuICAgICAgICBjb25zdCBzZWdtZW50c0h0bWwgPSBmbGlnaHROdW1iZXJzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgID8gYDxkaXY+U2VnbWVudHM6PGJyIC8+JHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJyl9PC9kaXY+YFxuICAgICAgICAgICAgOiBgPGRpdj5TZWdtZW50OiAke2ZsaWdodE51bWJlcnMuam9pbignLCAnKSB8fCAnTi9BJ308L2Rpdj5gXG4gICAgICAgIGNvbnN0IHByaWNlSHRtbCA9IGA8ZGl2PlByaWNlOiAke2NwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldFByaWNlKCl9PC9kaXY+YDtcblxuICAgICAgICB0aGlzLnNldERhdGFDb250ZW50KHNlZ21lbnRzSHRtbCArIHByaWNlSHRtbCk7XG4gICAgfVxuXG4gICAgc2VsZlNlbGVjdGVkRmFyZUNoYW5nZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcE1vZGFsIH0gZnJvbSAnLi4vc2hvd1NlYXRNYXBNb2RhbCc7XG5cblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJylcbkBUZW1wbGF0ZSgnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZTpTaG9wcGluZ1RpbGVWaWV3JylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3PEFic3RyYWN0TW9kZWw+IHtcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkIGNhbGxlZCB3aXRoIGNwYTonLCBjcGEpO1xuXG4gICAgY29uc3Qgc2VnbWVudHMgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgIGNvbnN0IHNlZ21lbnRzRGF0YSA9IHNlZ21lbnRzLm1hcChzZWdtZW50ID0+IHtcbiAgICAgICAgc2VnbWVudC5nZXRGbGlnaHREZXRhaWxzKHsgaXNNYWNoaW5lUmVxdWVzdDogZmFsc2UgfSkuYWx3YXlzKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIEFpciBtaWxlcyBwb3N0LWRldGFpbHMgY2FsbDogJHtyZXN1bHQ/LmdldEFpck1pbGVzKCl9YClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIEFycml2YWxEYXRlVGltZTogJzIwMjUtMDQtMDFUMTA6MDA6MDAnLCAvLyAfQDg8NUAgNDA9PUtFLCA3MDw1PThCNSBANTA7TD1LPDhcbiAgICAgICAgICAgIEJvb2tpbmdDbGFzc0F2YWlsOiBbeyBBdmFpbGFiaWxpdHk6ICc5JywgUmVzQm9va0Rlc2lnQ29kZTogJ1knIH1dLFxuICAgICAgICAgICAgQ2hhbmdlQXJyaXZhbERhdGVJbmRpY2F0b3I6ICcwJyxcbiAgICAgICAgICAgIENoYW5nZURheUluZGljYXRvcjogJzAnLFxuICAgICAgICAgICAgQ2hhbmdlRGVwYXJ0dXJlRGF0ZUluZGljYXRvcjogJzAnLFxuICAgICAgICAgICAgRGVwYXJ0dXJlRGF0ZVRpbWU6ICcyMDI1LTA0LTAxVDA2OjAwOjAwJywgLy8gH0A4PDVAIDQwPT1LRVxuICAgICAgICAgICAgRWxhcHNlZFRpbWU6ICcwNDAwJyxcbiAgICAgICAgICAgIEVxdWlwbWVudDogW3sgQWlyRXF1aXBUeXBlOiAnNzM3JyB9XSxcbiAgICAgICAgICAgIEZsaWdodE51bWJlcjogc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKSxcbiAgICAgICAgICAgIE1hcmtldGluZ0FpcmxpbmU6IHsgQ29kZTogc2VnbWVudC5nZXRDb21wYW55U2hvcnROYW1lKCkgfHwgJ1hYJyB9LFxuICAgICAgICAgICAgT3JpZ2luTG9jYXRpb246IHsgTG9jYXRpb25Db2RlOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSB8fCAnWFhYJyB9LFxuICAgICAgICAgICAgRGVzdGluYXRpb25Mb2NhdGlvbjogeyBMb2NhdGlvbkNvZGU6IHNlZ21lbnQuZ2V0RGVzdGluYXRpb25JYXRhKCkgfHwgJ1hYWCcgfSxcbiAgICAgICAgICAgIE1lYWw6IFsnQiddLFxuICAgICAgICAgICAgTWFycmlhZ2VHcnA6ICcnLFxuICAgICAgICAgICAgT25UaW1lUGVyZm9ybWFuY2U6ICcnLFxuICAgICAgICAgICAgT3BlcmF0aW5nQWlybGluZTogeyBDb2RlOiAnWFgnLCBGbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCkgfSxcbiAgICAgICAgICAgIFNlYXRzUmVtYWluaW5nOiB7IE51bWJlcjogOSwgQmVsb3dNaW46IGZhbHNlIH0sXG4gICAgICAgICAgICBTbW9raW5nQWxsb3dlZDogZmFsc2UsXG4gICAgICAgICAgICBTdG9wUXVhbnRpdHk6ICcwJyxcbiAgICAgICAgICAgIENvZGVTaGFyZUluZDogJycsXG4gICAgICAgICAgICBGbGlnaHRTdWJTZWdtZW50OiBbXVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgICAgICAvLyAFICE+NzQwNTwgPjFKNTpCIEI4PzAgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YVxuICAgICAgICAgY29uc3QgZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSA9IHtcbiAgICAgICAgICAgIHJvd1JQSDogMSxcbiAgICAgICAgICAgIGZsaWdodFNlZ21lbnRzOiBzZWdtZW50c0RhdGEgYXMgYW55ICAvLyAfQDgyNTQ1PTg1IEI4PzAsIEdCPjFLIEM0PjI7NUIyPkA4QkwgQjg/ODcwRjhOXG4gICAgICAgIH07XG5cbiAgICAvLyAFIBJLNz4yIDw+NDA7TD0+Mz4gPjo9MFxuICAgIHNob3dTZWF0TWFwTW9kYWwoZGF0YSk7IFxuICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gUmVuZGVyIGNhbGwgcmVwbGFjZWQgd2l0aCBzaG93U2VhdE1hcE1vZGFsLicpO1xuICAgIH1cblxufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSwgcmVnaXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQnV0dG9uIH0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbENvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL1JlZEFwcFNpZGVQYW5lbENvbmZpZyc7XG5cbmltcG9ydCB7IEN1c3RvbVdvcmtmbG93U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVBuckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybSc7XG5pbXBvcnQgeyBjYWxsTGFzTGF4IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHsgc2hvd1J1bnRpbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUnO1xuaW1wb3J0IHsgc2hvd0ludGVyc3RpdGlhbCB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsJztcbmltcG9ydCB7IHNob3dBZ2VudFByb2ZpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQgeyBzaG93QmFubmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QmFubmVycyc7XG5pbXBvcnQgeyByZWZyZXNoVHJpcFN1bW1hcnkgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5JztcbmltcG9ydCB7IGNhbGxFeHRlcm5hbFNlcnZpY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb25Gb3JtLCBoaWRlTm90aWZpY2F0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtJztcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldyc7XG5cbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRHJhd2VyU2VydmljZSc7XG5pbXBvcnQgeyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2NvbmZpZ3MvZHJhd2VyL0xhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnJztcblxuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5cbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudCc7XG5cbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1RpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlJztcbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3JztcblxuXG5cbmV4cG9ydCBjbGFzcyBNYWluIGV4dGVuZHMgTW9kdWxlIHtcbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgdGhpcy5yZWdpc3RlclNlcnZpY2VzKCk7XG4gICAgdGhpcy5zZXR1cFNpZGVQYW5lbEJ1dHRvbnMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwU2hvcHBpbmdUaWxlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKEN1c3RvbVdvcmtmbG93U2VydmljZSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2lkZVBhbmVsQnV0dG9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlQ3NzQ2xhc3NOYW1lcyA9ICdidG4gYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvbiByZWRhcHAtd2ViLWN1c3RvbXdvcmtmbG93JztcblxuICAgIGNvbnN0IHNlbGZSZW1vdmVCdG4gPSBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZW1vdmFibGUgQnV0dG9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXJlbW92ZScsICgpID0+IHtcbiAgICAgIHNlbGZSZW1vdmVCdG4uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb25maWcgPSBuZXcgUmVkQXBwU2lkZVBhbmVsQ29uZmlnKFtcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgYmFubmVycycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1iYW5uZXJzJywgc2hvd0Jhbm5lcnMpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignRXh0ZXJuYWwgc2VydmljZSBjYWxsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWV4dGVybmFsc2VydmljZWNhbGwnLCBjYWxsRXh0ZXJuYWxTZXJ2aWNlKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlZEFwcCBwbGF0Zm9ybScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbGF0Zm9ybScsIHNob3dSdW50aW1lKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0xBUyAtIExBWCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1hY3Rpb24nLCBjYWxsTGFzTGF4KSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0NyZWF0ZSBQTlInLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcG5yJywgY3JlYXRlUG5yRm9ybSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGludGVyc3RpdGlhbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1pbnRlcnN0aXRpYWwnLCBzaG93SW50ZXJzdGl0aWFsKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgQWdlbnQgUHJvZmlsZScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1hZ2VudHByb2ZpbGUnLCBzaG93QWdlbnRQcm9maWxlKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlZnJlc2ggVHJpcCBTdW1tYXJ5JywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXJlZnJlc2h0cmlwJywgcmVmcmVzaFRyaXBTdW1tYXJ5KSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0NyZWF0ZSBub3RpZmljYXRpb24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctY3JlYXRlTm90aWZpY2F0aW9uJywgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdIaWRlIG5vdGlmaWNhdGlvbnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaGlkZU5vdGlmaWNhdGlvbicsIGhpZGVOb3RpZmljYXRpb25zKSxcbiAgICAgIHNlbGZSZW1vdmVCdG5cbiAgICBdKTtcblxuICAgIGdldFNlcnZpY2UoRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlKS5hZGRDb25maWcoJ3JlZEFwcFNpZGVQYW5lbCcsIGNvbmZpZyk7XG4gIH1cblxuICAvLyBBdmFpbGFiaWxpdHlUaWxlXG4gIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGFpckF2YWlsYWJpbGl0eVNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UpOyAvLyAyPUNCQDU9PTg5IEE1QDI4QSA0O08gP0A1ND5BQjAyOzU9OE8gNDA9PUtFIDIgQDA8OjBFIEF2YWlsYWJpbGl0eVxuXG4gICAgY29uc3Qgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCA9IChkYXRhOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ0FCQyBTZWF0TWFwIChBdmFpbGFiaWxpdHkpJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBBdmFpbFZpZXcsIGRhdGEpLFxuICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnXG4gICAgICB9O1xuXG4gICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG1vZGFsT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGFpckF2YWlsYWJpbGl0eVNlcnZpY2UuY3JlYXRlQWlyQXZhaWxhYmlsaXR5U2VhcmNoVGlsZShcbiAgICAgIFNlYXRNYXBBdmFpbFRpbGUsXG4gICAgICBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsLFxuICAgICAgJ0FCQyBTZWF0TWFwJ1xuICAgICk7XG4gIH1cblxuICAvLyBTaG9wcGluZ1RpbGVcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTogdm9pZCB7XG4gICAgLy8gPj9ANTQ1O081PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBjb25zdCBzaG9wcGluZ0RyYXdlckNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhTZWF0TWFwU2hvcHBpbmdUaWxlLCBTZWF0TWFwU2hvcHBpbmdWaWV3LCB7XG4gICAgICB0aXRsZTogJ1Nob3BwaW5nIFRpbGVXaWRnZXQnIC8vIDcwMz47PjI+OiA+Oj0wXG4gICAgfSk7XG4gICAgLy8gMks3MksyMDU8IEE1QDI4QSBBIE1CODwgY29uZmlnIHNob3BwaW5nRHJhd2VyQ29uZmlnXG4gICAgZ2V0U2VydmljZShEcmF3ZXJTZXJ2aWNlKS5hZGRDb25maWcoWydzaG9wcGluZy1mbGlnaHQtc2VnbWVudCddLCBzaG9wcGluZ0RyYXdlckNvbmZpZyk7XG5cbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGxdfQ== 