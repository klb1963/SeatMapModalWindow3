System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightFromSabreData = void 0;
var getFlightFromSabreData = function (data, segmentIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
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
    console.log('📌 [getFlightFromSabreData] Полные данные сегмента:', JSON.stringify(segment, null, 2));
    var departureDateTime = segment.DepartureDateTime;
    if (!departureDateTime) {
        console.warn('⚠️ [getFlightFromSabreData] DepartureDateTime отсутствует в данных сегмента!');
        return {
            id: 'UNKNOWN',
            airlineCode: ((_c = (_b = segment.MarketingAirline) === null || _b === void 0 ? void 0 : _b.EncodeDecodeElement) === null || _c === void 0 ? void 0 : _c.Code) || '',
            flightNo: segment.FlightNumber || '',
            departureDate: '',
            departure: ((_e = (_d = segment.OriginLocation) === null || _d === void 0 ? void 0 : _d.EncodeDecodeElement) === null || _e === void 0 ? void 0 : _e.Code) || '',
            arrival: ((_g = (_f = segment.DestinationLocation) === null || _f === void 0 ? void 0 : _f.EncodeDecodeElement) === null || _g === void 0 ? void 0 : _g.Code) || '',
            cabinClass: ''
        };
    }
    var departureDate = departureDateTime.split('T')[0]; // Оставляем только дату
    return {
        id: '001',
        airlineCode: (_j = (_h = segment.MarketingAirline) === null || _h === void 0 ? void 0 : _h.EncodeDecodeElement) === null || _j === void 0 ? void 0 : _j.Code,
        flightNo: segment.FlightNumber,
        departureDate: departureDate,
        departure: (_l = (_k = segment.OriginLocation) === null || _k === void 0 ? void 0 : _k.EncodeDecodeElement) === null || _l === void 0 ? void 0 : _l.Code,
        arrival: (_o = (_m = segment.DestinationLocation) === null || _m === void 0 ? void 0 : _m.EncodeDecodeElement) === null || _o === void 0 ? void 0 : _o.Code,
        cabinClass: 'A'
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
        flight: {
            id: '001',
            airlineCode: 'LH',
            flightNo: '123',
            departureDate: '2025-04-22',
            departure: 'MUC',
            arrival: 'FRA',
            cabinClass: 'A'
        },
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
        console.log('📤 [SeatMapComponent] sending to iframe with data:', {
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
        });
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var getFlightFromSabreData_1 = require("./getFlightFromSabreData");
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
    // flight для проверки
    // flight:{
    //   id: '001', 
    //     airlineCode: 'LH',
    //     flightNo: '123',
    //     departureDate: '2025-04-22', 
    //     departure: 'MUC',
    //     arrival: 'FRA',
    //     cabinClass: 'A'
    // },
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
        console.log('📤 [SeatMapComponent] sending to iframe with data:', {
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
        });
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentShopping", ["react","react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentShopping = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // Получаем текущий сегмент
    var flightSegments = data.flightSegments || [];
    var currentSegment = flightSegments[segmentIndex] || {};
    console.log('✈️ [SeatMapComponentShopping] Полученные данные:', data);
    // // 🔨 Хардкодим данные для проверки
    // const flightData = {
    //     airlineCode: 'LH',
    //     flightNo: '123',
    //     departureDate: '2025-04-22',
    //     departure: 'MUC',
    //     arrival: 'FRA'
    // };
    var seatMapData = {
        config: config,
        flight: {
            id: '001',
            airlineCode: currentSegment.marketingAirline || 'LH',
            flightNo: currentSegment.flightNumber || '123',
            departureDate: currentSegment.departureDateTime || '2025-04-22',
            departure: currentSegment.origin || 'MUC',
            arrival: currentSegment.destination || 'FRA',
            cabinClass: currentSegment.cabinClass || 'A'
        },
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
        }
    };
    console.log('✈️ [SeatMapComponentShopping] Сформированные данные для отправки:', seatMapData);
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe или contentWindow не доступен.');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
        };
        console.log('📤 [SeatMapComponentShopping] Отправка данных в iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        sendToIframe();
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(currentSegment, null, 2))),
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) { return (React.createElement("option", { key: index, value: index },
                segment.marketingAirline || 'XX',
                " ",
                segment.flightNumber || '000',
                ": ",
                segment.origin,
                " \u2192 ",
                segment.destination)); }))),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: sendToIframe })));
};
exports.default = SeatMapComponentShopping;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentShopping.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentShopping"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentShopping"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView", ["react","sabre-ngv-app/app/AbstractView","sabre-ngv-core/decorators/classes/view/CssClass","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function __(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}}(),__decorate=this&&this.__decorate||function(e,t,r,o){var a,n=arguments.length,i=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(n<3?a(i):n>3?a(t,r,i):a(t,r))||i);return n>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapShoppingDrawerView=void 0;var React=require("react"),AbstractView_1=require("sabre-ngv-app/app/AbstractView"),CssClass_1=require("sabre-ngv-core/decorators/classes/view/CssClass"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig"),SeatMapShoppingDrawerView=function(e){function SeatMapShoppingDrawerView(){return null!==e&&e.apply(this,arguments)||this}return __extends(SeatMapShoppingDrawerView,e),SeatMapShoppingDrawerView.prototype.selfDrawerContextModelPropagated=function(e){var t,r=e,o={flightSegments:[this.extractSegment(r)],dateOfFlight:(null===(t=r.getDepartureDate())||void 0===t?void 0:t.toISOString().split("T")[0])||"2025-04-21"},a={header:"SeatMap Viewer (Shopping)",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:o}),modalClassName:"react-tile-modal-class"};(0,Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(a)},SeatMapShoppingDrawerView.prototype.extractSegment=function(e){return{OriginLocation:{EncodeDecodeElement:{Code:e.getOriginIata()}},DestinationLocation:{EncodeDecodeElement:{Code:e.getDestinationIata()}},DisclosureAirline:{EncodeDecodeElement:{Code:e.getMarketingAirline()}},FlightNumber:e.getFlightNumber(),Equipment:{EncodeDecodeElement:{Code:e.getEquipmentCode||"388"}}}},__decorate([(0,CssClass_1.CssClass)("com-sabre-redapp-example3-web-customworkflow-web-module")],SeatMapShoppingDrawerView)}(AbstractView_1.AbstractView);exports.SeatMapShoppingDrawerView=SeatMapShoppingDrawerView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingDrawerView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports, module) {
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),SeatMapComponent_1=require("./SeatMapComponent"),SeatMapShoppingView=function(e){return console.log("[SeatMapShoppingView] received props:",e),React.createElement(SeatMapComponent_1.default,__assign({},e))};exports.default=SeatMapShoppingView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapShoppingView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentAvail_1 = require("./SeatMapComponentAvail");
var quicketConfig_1 = require("./quicketConfig"); // config с настройками отображения карты
function showSeatMapModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    // формируем options для передачи в модальное окно
    var options = {
        header: 'SeatMap Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentAvail_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data // передаём data - объект типа PublicAirAvailabilityData целиком
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options); // показываем модальное окно с его options
}
exports.showSeatMapModal = showSeatMapModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapModalForSegment=void 0;var React=require("react"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig");function showSeatMapModalForSegment(e){var o,t=(0,Context_1.getService)(PublicModalService_1.PublicModalsService),a={flightSegments:[e],dateOfFlight:(null===(o=e.getDepartureDate())||void 0===o?void 0:o.toISOString().split("T")[0])||"2025-04-21"};console.log("[✅ showSeatMapModalForSegment] Will open modal with data:",a);var r={header:"SeatMap Viewer (from Segment)",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:a}),onHide:function(){return console.log("[SeatMap Modal for Segment] Closed")}};t.showReactModal(r)}exports.showSeatMapModalForSegment=showSeatMapModalForSegment;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapShoppingModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapShoppingModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentAvail_1 = require("./SeatMapComponentAvail");
var quicketConfig_1 = require("./quicketConfig"); // config с настройками отображения карты
function showSeatMapShoppingModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    if (!modalService || typeof modalService.showReactModal !== 'function') {
        console.error('❌ [showSeatMapShoppingModal] PublicModalsService not available or not configured properly.');
        return;
    }
    // 📌 Закрыть все предыдущие модальные окна перед открытием нового
    try {
        modalService.closeReactModal();
        console.log('📌 [showSeatMapShoppingModal] All previous modals closed.');
    }
    catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error hiding modals:', error);
    }
    // формируем options для передачи в модальное окно
    var options = {
        header: 'ABC SeatMap Shopping Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentAvail_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data
        }),
        onHide: function () { return console.log('[SeatMap Shopping Modal] Closed'); }
    };
    console.log('📌 [showSeatMapShoppingModal] Modal data:', data);
    // Проверка на доступность метода `showReactModal`
    try {
        modalService.showReactModal(options); // показываем модальное окно с его options
    }
    catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error showing modal:', error);
    }
}
exports.showSeatMapShoppingModal = showSeatMapShoppingModal;


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
        (0, showSeatMapModal_1.showSeatMapModal)(data); // вызываем функцию показа модального окна c данными (data)
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
            caption: 'ABC SeatMap',
            className: 'web-air-shopping-widget-sample'
        }),
        (0, Mixin_1.Mixin)(WithoutFocusOnClick_1.WithoutFocusOnClick)
    ], SeatMapShoppingTile);
    return SeatMapShoppingTile;
}(Tile_1.Tile));
exports.SeatMapShoppingTile = SeatMapShoppingTile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView", ["react","react-dom","sabre-ngv-app/app/AbstractView","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentShopping","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig","sabre-ngv-core/decorators/classes/view/CssClass","sabre-ngv-core/decorators/classes/view/Template"], false, function (require, exports, module) {
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
var React = require("react");
var ReactDOM = require("react-dom"); // ✅ Явный импорт ReactDOM
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var SeatMapComponentShopping_1 = require("../SeatMapComponentShopping");
var quicketConfig_1 = require("../quicketConfig"); // config с настройками отображения карты
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var Template_1 = require("sabre-ngv-core/decorators/classes/view/Template");
var SeatMapShoppingView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingView, _super);
    function SeatMapShoppingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flightSegments = [];
        _this.selectedSegmentIndex = 0;
        return _this;
    }
    SeatMapShoppingView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);
        // // 🔨 Хардкодим данные для проверки
        // const flightData = {
        //     airlineCode: 'LH',
        //     flightNo: '123',
        //     departureDate: '2025-04-22',
        //     departure: 'MUC',
        //     arrival: 'FRA'
        // };
        // console.log('📌 [SeatMapShoppingView] Hardcoded flight data:', flightData);
        // this.flightSegments = [flightData];
        // this.selectedSegmentIndex = 0;
        var segments = cpa.getShoppingItinerary().getFlightSegments();
        this.flightSegments = segments.map(function (segment) {
            var departureDateTime = segment.getDepartureDate();
            return {
                id: '001',
                segmentId: segment.getSegmentId(),
                flightNumber: segment.getFlightNumber(),
                origin: segment.getOriginIata(),
                destination: segment.getDestinationIata(),
                airMiles: segment.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN',
                marketingAirline: segment.getMarketingAirline(),
                cabinClass: 'Economy' // Пример, можно передавать реальные данные
            };
        });
        // Пробуем рендерить React компонент с задержкой, чтобы гарантировать наличие элемента
        this.tryRenderReactComponent();
    };
    SeatMapShoppingView.prototype.tryRenderReactComponent = function (attempts) {
        var _this = this;
        if (attempts === void 0) { attempts = 0; }
        var MAX_ATTEMPTS = 10;
        var INTERVAL = 500; // Интервал между попытками (в миллисекундах)
        var rootElement = document.getElementById('seatmap-root');
        if (rootElement) {
            console.log('✅ [SeatMapShoppingView] Элемент seatmap-root найден. Начинаем рендеринг React компонента.');
            this.renderReactComponent();
        }
        else if (attempts < MAX_ATTEMPTS) {
            console.warn("\u26A0\uFE0F [SeatMapShoppingView] \u042D\u043B\u0435\u043C\u0435\u043D\u0442 seatmap-root \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0447\u0435\u0440\u0435\u0437 " + INTERVAL + " \u043C\u0441. \u041F\u043E\u043F\u044B\u0442\u043A\u0430 " + (attempts + 1) + "/" + MAX_ATTEMPTS);
            setTimeout(function () { return _this.tryRenderReactComponent(attempts + 1); }, INTERVAL);
        }
        else {
            console.error('❌ [SeatMapShoppingView] Не удалось найти элемент seatmap-root после максимального числа попыток.');
        }
    };
    SeatMapShoppingView.prototype.renderReactComponent = function () {
        var rootElement = document.getElementById('seatmap-root');
        if (rootElement) {
            // Очищаем предыдущий рендер перед тем, как снова отрендерить React компонент
            ReactDOM.unmountComponentAtNode(rootElement);
            var data = {
                flightSegments: this.flightSegments,
                selectedSegmentIndex: this.selectedSegmentIndex
            };
            ReactDOM.render(React.createElement(SeatMapComponentShopping_1.default, { config: quicketConfig_1.quicketConfig, data: data }), rootElement);
            console.log('📌 [SeatMapShoppingView] React Component успешно отрендерен в #seatmap-root.');
        }
        else {
            console.error('❌ [SeatMapShoppingView] Элемент с id="seatmap-root" не найден при попытке рендеринга.');
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50QXZhaWwudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcudHN4IiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBTaG9wcGluZ0RyYXdlclZpZXcuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nVmlldy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsRm9yU2VnbWVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3RyYW5zZm9ybUZsaWdodC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdXRpbHMvdHJhbnNmb3JtRmxpZ2h0LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFRpbGUuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTSxzQkFBc0IsR0FBRyxVQUFDLElBQVMsRUFBRSxZQUF3Qjs7SUFBeEIsNkJBQUEsRUFBQSxnQkFBd0I7SUFDeEUsSUFBTSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRyxZQUFZLENBQUMsQ0FBQztJQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBb0IsWUFBWSxlQUFZLENBQUMsQ0FBQztRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLFNBQVM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztLQUNIO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUVwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1FBQzdGLE9BQU87WUFDTCxFQUFFLEVBQUUsU0FBUztZQUNiLFdBQVcsRUFBRSxDQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsZ0JBQWdCLDBDQUFFLG1CQUFtQiwwQ0FBRSxJQUFJLEtBQUksRUFBRTtZQUN0RSxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVksSUFBSSxFQUFFO1lBQ3BDLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxDQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsY0FBYywwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxLQUFJLEVBQUU7WUFDbEUsT0FBTyxFQUFFLENBQUEsTUFBQSxNQUFBLE9BQU8sQ0FBQyxtQkFBbUIsMENBQUUsbUJBQW1CLDBDQUFFLElBQUksS0FBSSxFQUFFO1lBQ3JFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztLQUNIO0lBRUQsSUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO0lBRS9FLE9BQU87UUFDTCxFQUFFLEVBQUUsS0FBSztRQUNULFdBQVcsRUFBRSxNQUFBLE1BQUEsT0FBTyxDQUFDLGdCQUFnQiwwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSTtRQUNoRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVk7UUFDOUIsYUFBYSxlQUFBO1FBQ2IsU0FBUyxFQUFFLE1BQUEsTUFBQSxPQUFPLENBQUMsY0FBYywwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSTtRQUM1RCxPQUFPLEVBQUUsTUFBQSxNQUFBLE9BQU8sQ0FBQyxtQkFBbUIsMENBQUUsbUJBQW1CLDBDQUFFLElBQUk7UUFDL0QsVUFBVSxFQUFFLEdBQUc7S0FDaEIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTVDVyxRQUFBLHNCQUFzQiwwQkE0Q2pDOzs7Ozs7Ozs7QUM1Q1csUUFBQSxhQUFhLEdBQUc7SUFDekIsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsSUFBSTtJQUNWLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsY0FBYyxFQUFFLElBQUk7SUFDcEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsMkJBQTJCLEVBQUUsS0FBSztJQUNsQyxjQUFjLEVBQUUsS0FBSztJQUNyQixVQUFVLEVBQUU7UUFDUixjQUFjLEVBQUUsT0FBTztRQUN2QixlQUFlLEVBQUUsTUFBTTtLQUMxQjtDQUNKLENBQUM7Ozs7OztBQ2hCRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkdBLDZCQUErQjtBQUMvQiwrQkFBb0Q7QUFDcEQsbUVBQWtFO0FBT2xFLElBQU0sZ0JBQWdCLEdBQTJCLFVBQUMsRUFBZ0I7UUFBZCxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7SUFDeEQsSUFBQSxLQUFrQyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQTVDLFlBQVksUUFBQSxFQUFFLGVBQWUsUUFBZSxDQUFDO0lBQ3BELElBQU0sU0FBUyxHQUFHLElBQUEsY0FBTSxFQUFvQixJQUFJLENBQUMsQ0FBQztJQUVsRCw4QkFBOEI7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztJQUV2RSxJQUFNLE1BQU0sR0FBRyxJQUFBLCtDQUFzQixFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUNsRixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUVqRCxvQ0FBb0M7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU1RCxzQkFBc0I7SUFDdEIsV0FBVztJQUNYLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLG9DQUFvQztJQUNwQyx3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixLQUFLO0lBRUwsSUFBTSxXQUFXLEdBQUc7UUFDbEIsTUFBTSxRQUFBO1FBQ04sTUFBTSxRQUFBO1FBQ04sTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFO2dCQUNMO29CQUNFLEVBQUUsRUFBRSxXQUFXO29CQUNmLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxHQUFHO29CQUNWLE1BQU0sRUFBRSxHQUFHO29CQUNYLElBQUksRUFBRTt3QkFDSixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO3dCQUNwRixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7cUJBQ3ZEO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELFlBQVksRUFBRTtZQUNaLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFGLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNGLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtTQUNoRTtRQUNELFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUMvRCxDQUFDO0lBRUYsSUFBTSxZQUFZLEdBQUc7UUFDbkIsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsYUFBYSxDQUFBLEVBQUU7WUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1lBQ3pELE9BQU87U0FDUjtRQUVELElBQU0sT0FBTyxHQUFHO1lBQ2QsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFFMUMsNENBQTRDO1lBQzVDLDBEQUEwRDtZQUMxRCxxREFBcUQ7U0FFdEQsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUU7WUFDaEUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQzdDLENBQUMsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUVqRCxJQUFBLGlCQUFTLEVBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBNkIsWUFBYyxDQUFDLENBQUM7UUFDekQsWUFBWSxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7SUFDcEQsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVuQixPQUFPLENBRUwsNkJBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUU3Qiw2QkFBSyxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUNyRSxnRUFBZ0M7WUFDaEMsaUNBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFPLENBQ3hDO1FBRU4sNkJBQUssS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRTtZQUNsQywrQkFBTyxPQUFPLEVBQUMsZUFBZSxvR0FBMkI7WUFDekQsZ0NBQ0UsRUFBRSxFQUFDLGVBQWUsRUFDbEIsS0FBSyxFQUFFLFlBQVksRUFDbkIsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXZDLENBQXVDLElBQ3ZELGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFZLEVBQUUsS0FBYTs7Z0JBQUssT0FBQSxDQUNuRCxnQ0FBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO29CQUM3QixDQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsZ0JBQWdCLDBDQUFFLG1CQUFtQiwwQ0FBRSxJQUFJLEtBQUksSUFBSTs7b0JBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxLQUFLOztvQkFFM0YsQ0FBQSxNQUFBLE1BQUEsT0FBTyxDQUFDLGNBQWMsMENBQUUsbUJBQW1CLDBDQUFFLElBQUksS0FBSSxLQUFLOztvQkFDMUQsQ0FBQSxNQUFBLE1BQUEsT0FBTyxDQUFDLG1CQUFtQiwwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxLQUFJLEtBQUssQ0FDekQsQ0FDVixDQUFBO2FBQUEsQ0FBQyxDQUNLLENBQ0w7UUFFTixnQ0FDRSxHQUFHLEVBQUUsU0FBUyxFQUNkLEdBQUcsRUFBQyxxQ0FBcUMsRUFDekMsS0FBSyxFQUFDLE1BQU0sRUFDWixNQUFNLEVBQUMsS0FBSyxFQUNaLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUNuQyxLQUFLLEVBQUMsZUFBZSxFQUNyQixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2dCQUNuRSxZQUFZLEVBQUUsQ0FBQztZQUNqQixDQUFDLEdBQ0QsQ0FDRSxDQUVQLENBQUM7QUFFSixDQUFDLENBQUM7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUMxSWhDLDZCQUErQjtBQUMvQiwrQkFBb0Q7QUFPcEQsSUFBTSx3QkFBd0IsR0FBMkIsVUFBQyxFQUFnQjtRQUFkLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtJQUNoRSxJQUFBLEtBQWtDLElBQUEsZ0JBQVEsRUFBQyxDQUFDLENBQUMsRUFBNUMsWUFBWSxRQUFBLEVBQUUsZUFBZSxRQUFlLENBQUM7SUFDcEQsSUFBTSxTQUFTLEdBQUcsSUFBQSxjQUFNLEVBQW9CLElBQUksQ0FBQyxDQUFDO0lBRXBELDJCQUEyQjtJQUN6QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUNqRCxJQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFaEUsc0NBQXNDO0lBQ3RDLHVCQUF1QjtJQUN2Qix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLG1DQUFtQztJQUNuQyx3QkFBd0I7SUFDeEIscUJBQXFCO0lBQ3JCLEtBQUs7SUFHWCxJQUFNLFdBQVcsR0FBRztRQUNsQixNQUFNLFFBQUE7UUFDTixNQUFNLEVBQUU7WUFFSixFQUFFLEVBQUUsS0FBSztZQUNULFdBQVcsRUFBRSxjQUFjLENBQUMsZ0JBQWdCLElBQUksSUFBSTtZQUNwRCxRQUFRLEVBQUUsY0FBYyxDQUFDLFlBQVksSUFBSSxLQUFLO1lBQzlDLGFBQWEsRUFBRSxjQUFjLENBQUMsaUJBQWlCLElBQUksWUFBWTtZQUMvRCxTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sSUFBSSxLQUFLO1lBQ3pDLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxJQUFJLEtBQUs7WUFDNUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxVQUFVLElBQUksR0FBRztTQUU3QztRQUNILE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRTtnQkFDTDtvQkFDRSxFQUFFLEVBQUUsV0FBVztvQkFDZixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsR0FBRztvQkFDVixNQUFNLEVBQUUsR0FBRztvQkFDWCxJQUFJLEVBQUU7d0JBQ0osRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTt3QkFDcEYsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO3FCQUN2RDtpQkFDRjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtRUFBbUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUU5RixJQUFNLFlBQVksR0FBRztRQUNuQixJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxhQUFhLENBQUEsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNSO1FBRUQsSUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDMUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUMzQyxDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0lBRUYsSUFBQSxpQkFBUyxFQUFDO1FBQ1IsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVuQixPQUFPLENBQ0wsNkJBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUU3Qiw2QkFBSyxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUNyRSxnRUFBZ0M7WUFDaEMsaUNBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFPLENBQ2hEO1FBQ04sNkJBQUssS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRTtZQUNsQywrQkFBTyxPQUFPLEVBQUMsZUFBZSxvR0FBMkI7WUFDekQsZ0NBQ0UsRUFBRSxFQUFDLGVBQWUsRUFDbEIsS0FBSyxFQUFFLFlBQVksRUFDbkIsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXZDLENBQXVDLElBRXZELGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFZLEVBQUUsS0FBYSxJQUFLLE9BQUEsQ0FDbkQsZ0NBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDN0IsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUk7O2dCQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksS0FBSzs7Z0JBQUksT0FBTyxDQUFDLE1BQU07O2dCQUFLLE9BQU8sQ0FBQyxXQUFXLENBQ3BHLENBQ1YsRUFKb0QsQ0FJcEQsQ0FBQyxDQUNLLENBQ0w7UUFDTixnQ0FDRSxHQUFHLEVBQUUsU0FBUyxFQUNkLEdBQUcsRUFBQyxxQ0FBcUMsRUFDekMsS0FBSyxFQUFDLE1BQU0sRUFDWixNQUFNLEVBQUMsS0FBSyxFQUNaLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUNuQyxLQUFLLEVBQUMsZUFBZSxFQUNyQixNQUFNLEVBQUUsWUFBWSxHQUNwQixDQUNFLENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLGtCQUFlLHdCQUF3QixDQUFDOzs7Ozs7QUNuSHhDO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLDZCQUErQjtBQUMvQix5Q0FBMkM7QUFDM0MsbUZBQW1GO0FBRW5GLGlFQUF1RDtBQUN2RCxpREFBZ0QsQ0FBQyx5Q0FBeUM7QUFJMUYsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBK0I7SUFFOUQsSUFBTSxZQUFZLEdBQUcsSUFBQSxvQkFBVSxFQUFDLHdDQUFtQixDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7SUFFdkYsa0RBQWtEO0lBQ2xELElBQU0sT0FBTyxHQUFzQjtRQUNqQyxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLHFEQUFxRDtRQUNyRCxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQywrQkFBZ0IsRUFBRTtZQUMvQyxNQUFNLEVBQUUsNkJBQWE7WUFDckIsSUFBSSxNQUFBLENBQUMsZ0VBQWdFO1NBQ3RFLENBQUM7UUFDRixNQUFNLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBckMsQ0FBcUM7S0FDcEQsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7QUFFbEYsQ0FBQztBQWpCRCw0Q0FpQkM7Ozs7OztBQzFCRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSw2QkFBK0I7QUFDL0IseUNBQTJDO0FBQzNDLG1GQUFtRjtBQUVuRixpRUFBdUQ7QUFDdkQsaURBQWdELENBQUMseUNBQXlDO0FBTTFGLFNBQWdCLHdCQUF3QixDQUFDLElBQXlCO0lBRTlELElBQU0sWUFBWSxHQUFHLElBQUEsb0JBQVUsRUFBQyx3Q0FBbUIsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO0lBRXZGLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxZQUFZLENBQUMsY0FBYyxLQUFLLFVBQVUsRUFBRTtRQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLDRGQUE0RixDQUFDLENBQUM7UUFDNUcsT0FBTztLQUNWO0lBRUEsa0VBQWtFO0lBQ2xFLElBQUk7UUFDRCxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO0tBQzVFO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdFO0lBRUQsa0RBQWtEO0lBQ2xELElBQU0sT0FBTyxHQUFzQjtRQUMvQixNQUFNLEVBQUUsNkJBQTZCO1FBQ3JDLHFEQUFxRDtRQUNyRCxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQywrQkFBZ0IsRUFBRTtZQUM3QyxNQUFNLEVBQUUsNkJBQWE7WUFDckIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsTUFBTSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLEVBQTlDLENBQThDO0tBQy9ELENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRS9ELGtEQUFrRDtJQUNsRCxJQUFJO1FBQ0EsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztLQUNuRjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3RTtBQUVMLENBQUM7QUFyQ0QsNERBcUNDOzs7Ozs7QUNoREQ7QUFDQTtBQUNBOzs7Ozs7O0FDRkEsNkJBQStCO0FBR3hCLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUErQjtJQUU1RCxPQUFPLENBQ0gsNkJBQUssU0FBUyxFQUFFLGlDQUFpQztRQUM3QyxtREFBNkI7UUFDN0IsZ0NBQ0ssSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLE9BQUEsQ0FDekMsNEJBQUksR0FBRyxFQUFFLEtBQUs7O1lBQ0YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FDNUMsQ0FDUixFQUo0QyxDQUk1QyxDQUFDLENBQ0QsQ0FDSCxDQUNULENBQUM7QUFDTixDQUFDLENBQUM7QUFkVyxRQUFBLGdCQUFnQixvQkFjM0I7QUFpQkYsNkNBQTZDO0FBRTdDLGtDQUFrQztBQUNsQyw0R0FBNEc7QUFDNUcsaURBQWlEO0FBQ2pELDhFQUE4RTtBQUU5RSw2RkFBNkY7QUFDN0YseUVBQXlFO0FBQ3pFLGtGQUFrRjtBQUVsRixnQkFBZ0I7QUFDaEIsbUhBQW1IO0FBRW5ILG9EQUFvRDtBQUNwRCx3RkFBd0Y7QUFDeEYsZ0JBQWdCO0FBQ2hCLDRCQUE0QjtBQUM1QixrRUFBa0U7QUFDbEUsWUFBWTtBQUNaLFNBQVM7QUFFVCxlQUFlO0FBQ2YsOERBQThEO0FBQzlELDRDQUE0QztBQUM1QyxtQkFBbUI7QUFDbkIsaUVBQWlFO0FBQ2pFLHVDQUF1QztBQUN2Qyx5RUFBeUU7QUFDekUseUdBQXlHO0FBQ3pHLDRCQUE0QjtBQUM1QixzQkFBc0I7QUFDdEIsb0JBQW9CO0FBQ3BCLGlCQUFpQjtBQUNqQixTQUFTO0FBQ1QsS0FBSzs7Ozs7Ozs7O0FDckVMLDZCQUErQjtBQUMvQiwrQkFBa0M7QUFFbEMscUZBQW9GO0FBRTdFLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUErQjtJQUM1RCxJQUFBLGlCQUFTLEVBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUMvRCxJQUFBLG1DQUFnQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMkRBQTJEO0lBQ3JGLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLE9BQU8sQ0FDTCw2QkFBSyxTQUFTLEVBQUUsaUNBQWlDO1FBQy9DLDBHQUFrQyxDQUM5QixDQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFYUyxRQUFBLGdCQUFnQixvQkFXekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCSiw2RUFBMEU7QUFHMUUsMkZBQXdGO0FBQ3hGLHFFQUFrRTtBQUNsRSxpRUFBOEQ7QUFDOUQsNEVBQXlFO0FBUXpFO0lBQXlDLHVDQUFtQjtJQUE1RDs7SUFlQSxDQUFDO0lBYkcsOERBQWdDLEdBQWhDLFVBQWlDLEdBQWtCO1FBQy9DLElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFDakgsSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyx5QkFBdUIsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBUTtZQUN6RCxDQUFDLENBQUMsb0JBQWlCLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxZQUFRLENBQUE7UUFDaEUsSUFBTSxTQUFTLEdBQUcsaUJBQWUsR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVEsQ0FBQztRQUUvRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQscURBQXVCLEdBQXZCLFVBQXdCLEdBQWtCO1FBQ3RDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBZFEsbUJBQW1CO1FBTi9CLElBQUEsbUJBQVEsRUFBQyxzREFBc0QsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUN0RixJQUFBLGlCQUFPLEVBQWM7WUFDbEIsT0FBTyxFQUFFLGFBQWE7WUFDdEIsU0FBUyxFQUFFLGdDQUFnQztTQUM5QyxDQUFDO1FBQ0QsSUFBQSxhQUFLLEVBQUMseUNBQW1CLENBQUM7T0FDZCxtQkFBbUIsQ0FlL0I7SUFBRCwwQkFBQztDQWZELEFBZUMsQ0Fmd0MsV0FBSSxHQWU1QztBQWZZLGtEQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZGhDLDZCQUErQjtBQUMvQixvQ0FBc0MsQ0FBRSwwQkFBMEI7QUFDbEUsK0RBQThEO0FBRzlELHdFQUFtRTtBQUNuRSxrREFBaUQsQ0FBQyx5Q0FBeUM7QUFDM0YsNEVBQTJFO0FBQzNFLDRFQUEyRTtBQUkzRTtJQUF5Qyx1Q0FBMkI7SUFBcEU7UUFBQSxxRUFnRkM7UUE5RVcsb0JBQWMsR0FBVSxFQUFFLENBQUM7UUFDM0IsMEJBQW9CLEdBQVcsQ0FBQyxDQUFDOztJQTZFN0MsQ0FBQztJQTNFRyw4REFBZ0MsR0FBaEMsVUFBaUMsR0FBa0I7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0RUFBNEUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvRixzQ0FBc0M7UUFDdEMsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsbUNBQW1DO1FBQ25DLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIsS0FBSztRQUNMLDhFQUE4RTtRQUM5RSxzQ0FBc0M7UUFDdEMsaUNBQWlDO1FBRWpDLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN0QyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXJELE9BQU87Z0JBQ0gsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pDLFlBQVksRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUN2QyxNQUFNLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDL0IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQy9CLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2hHLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtnQkFDL0MsVUFBVSxFQUFFLFNBQVMsQ0FBQywyQ0FBMkM7YUFDcEUsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0ZBQXNGO1FBQ3RGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxxREFBdUIsR0FBdkIsVUFBd0IsUUFBWTtRQUFwQyxpQkFlQztRQWZ1Qix5QkFBQSxFQUFBLFlBQVk7UUFDaEMsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDZDQUE2QztRQUVuRSxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVELElBQUksV0FBVyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyRkFBMkYsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLEdBQUcsWUFBWSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb1JBQW9GLFFBQVEsbUVBQWdCLFFBQVEsR0FBRyxDQUFDLFVBQUksWUFBYyxDQUFDLENBQUM7WUFDekosVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLGtHQUFrRyxDQUFDLENBQUM7U0FDckg7SUFDTCxDQUFDO0lBRUQsa0RBQW9CLEdBQXBCO1FBQ0ksSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1RCxJQUFJLFdBQVcsRUFBRTtZQUNiLDZFQUE2RTtZQUM3RSxRQUFRLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFN0MsSUFBTSxJQUFJLEdBQUc7Z0JBQ1QsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNuQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2FBQ2xELENBQUM7WUFFRixRQUFRLENBQUMsTUFBTSxDQUNYLEtBQUssQ0FBQyxhQUFhLENBQUMsa0NBQXdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsNkJBQWEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQzlFLFdBQVcsQ0FDZCxDQUFDO1lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1NBQy9GO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLHVGQUF1RixDQUFDLENBQUM7U0FDMUc7SUFDTCxDQUFDO0lBL0VRLG1CQUFtQjtRQUYvQixJQUFBLG1CQUFRLEVBQUMseURBQXlELENBQUM7UUFDbkUsSUFBQSxtQkFBUSxFQUFDLDBFQUEwRSxDQUFDO09BQ3hFLG1CQUFtQixDQWdGL0I7SUFBRCwwQkFBQztDQWhGRCxBQWdGQyxDQWhGd0MsMkJBQVksR0FnRnBEO0FBaEZZLGtEQUFtQjs7Ozs7O0FDWmhDO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLDZCQUErQjtBQUMvQixtRkFBaUY7QUFFakYscUdBQWtHO0FBQ2xHLHNDQUFzQztBQUN0QyxrRUFBK0Q7QUFDL0QsZ0ZBQTZFO0FBQzdFLHFEQUFrRDtBQUVsRCxJQUFNLFlBQVksR0FBd0IsSUFBQSxvQkFBVSxFQUFDLHdDQUFtQixDQUFDLENBQUM7QUFFbkUsSUFBTSxtQkFBbUIsR0FBRztJQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztJQUVwQyxJQUFNLFFBQVEsR0FBRztRQUNiLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFNLE9BQU8sR0FBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkUsSUFBQSxvQkFBVSxFQUFDLG1EQUF3QixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDcEgsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFrQixDQUFDLENBQUM7WUFDdEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9ELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNyQixFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFDLENBQ3JFLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtJQUNELElBQU0sT0FBTyxHQUFHO1FBQ1osWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQTtJQUVELElBQU0sZUFBZSxHQUFzQjtRQUN2QyxNQUFNLEVBQUUsMEJBQTBCO1FBQ2xDLFNBQVMsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLCtCQUFjLENBQUM7UUFDOUMsUUFBUSxFQUFFLFFBQVE7UUFDbEIsT0FBTyxFQUFFLElBQUEsaUJBQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQ25DLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztLQUMxQixDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUE1QlcsUUFBQSxtQkFBbUIsdUJBNEI5Qjs7Ozs7Ozs7O0FDdkNGLDJGQUF3RjtBQUN4RixzQ0FBMEM7QUFDMUMsNEVBQXlFO0FBRWxFLElBQU0sVUFBVSxHQUFHO0lBQ3RCLElBQU0sbUJBQW1CLEdBQUcsSUFBQSxvQkFBVSxFQUFDLHlDQUFtQixDQUFDLENBQUM7SUFFNUQsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsSUFBQSxZQUFFLEVBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtRQUMvQixtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXZDLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUM5QyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUE5QyxDQUE4QyxDQUFDO2FBQzlELEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQzthQUN2QyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFFNUMsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQixJQUFBLGlEQUF1QixFQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFqQlksUUFBQSxVQUFVLGNBaUJ0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJELHNDQUFzQztBQUV0QywyRkFBd0Y7QUFJeEYsNEZBQXlGO0FBR3pGLElBQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztBQUU1QixJQUFNLHNCQUFzQixHQUFHOzs7OztnQkFDNUIsSUFBSSxHQUFlO29CQUNyQixLQUFLLEVBQUUsY0FBYztvQkFDckIsTUFBTSxFQUFFO3dCQUNKOzRCQUNJLEVBQUUsRUFBRSxPQUFPO3lCQUNkO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxTQUFTO3lCQUNoQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsTUFBTTs0QkFDVixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsS0FBSyxFQUFFO2dDQUNIO29DQUNJLEVBQUUsRUFBRSxNQUFNO2lDQUNiO2dDQUNEO29DQUNJLEVBQUUsRUFBRSxNQUFNO2lDQUNiO2dDQUNEO29DQUNJLEVBQUUsRUFBRSxTQUFTO2lDQUNoQjtnQ0FDRDtvQ0FDSSxFQUFFLEVBQUUsT0FBTztpQ0FDZDtnQ0FDRDtvQ0FDSSxFQUFFLEVBQUUsU0FBUztpQ0FDaEI7NkJBQ0o7eUJBQ0o7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLFVBQVU7NEJBQ2QsVUFBVSxFQUFFO2dDQUNSLEtBQUssRUFBRSxxQkFBcUI7NkJBQy9CO3lCQUNKO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxTQUFTOzRCQUNiLEtBQUssRUFBRSxlQUFlOzRCQUN0QixVQUFVLEVBQUU7Z0NBQ1IsS0FBSyxFQUFFLG1CQUFtQjs2QkFDN0I7eUJBQ0o7cUJBQ0o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLEVBQUUsRUFBRSxRQUFROzRCQUNaLEtBQUssRUFBRSxRQUFRO3lCQUNsQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsSUFBSTs0QkFDUixLQUFLLEVBQUUsUUFBUTt5QkFDbEI7cUJBQ0o7aUJBQ0osQ0FBQztnQkFFMkIscUJBQU0sSUFBQSxvQkFBVSxFQUFDLHlDQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBM0UsTUFBTSxHQUFpQixTQUFvRDtnQkFFakYsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDeEIsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVCOzs7O0tBQ0osQ0FBQTtBQTlEWSxRQUFBLHNCQUFzQiwwQkE4RGxDO0FBRUQsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLElBQWdCO0lBQ3RDLElBQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQW5CLENBQW1CLENBQW1CLENBQUMsS0FBSyxDQUFDO0lBRXJGLElBQU0sRUFBRSxHQUFHLElBQUEsb0JBQVUsRUFBQywyQ0FBb0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1FBQ3pELEtBQUssRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFwQixDQUFvQixDQUFlLENBQUMsS0FBSztRQUMzRSxPQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBdEIsQ0FBc0IsQ0FBZSxDQUFDLEtBQUs7UUFDL0UsSUFBSSxFQUFFLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBd0I7UUFDNUQsUUFBUSxFQUFFLFFBQVEsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUF2QixDQUF1QixDQUFlLENBQUMsS0FBSyxDQUFDO1FBQzNGLE9BQU8sRUFBRSxRQUFRLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBdEIsQ0FBc0IsQ0FBZSxDQUFDLEtBQUssQ0FBQztLQUM1RixDQUFDLENBQUM7SUFFSCxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQTtBQUVNLElBQU0saUJBQWlCLEdBQUc7SUFDN0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLElBQUEsb0JBQVUsRUFBQywyQ0FBb0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDLENBQUM7SUFDbkYsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxpQkFBaUIscUJBRzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRkQsMkZBQXdGO0FBR3hGLDZFQUEwRTtBQUUxRSwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBRXhGLHNDQUFzQztBQUN0Qyw0RUFBeUU7QUFFbEUsSUFBTSxhQUFhLEdBQUc7Ozs7O2dCQUNuQixrQkFBa0IsR0FBRyxHQUFHLEdBQUcsSUFBQSxvQkFBVSxFQUFDLDJCQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztnQkFFOUgsSUFBSSxHQUFlO29CQUNyQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsTUFBTSxFQUFFO3dCQUNKOzRCQUNJLEVBQUUsRUFBRSxNQUFNOzRCQUNWLEtBQUssRUFBRSxXQUFXO3lCQUNyQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsUUFBUTs0QkFDWixLQUFLLEVBQUUsa0JBQWtCO3lCQUM1Qjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsUUFBUTs0QkFDWixLQUFLLEVBQUUsTUFBTTt5QkFDaEI7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLE9BQU87NEJBQ1gsS0FBSyxFQUFFLFlBQVk7NEJBQ25CLEtBQUssRUFBRSxRQUFRO3lCQUNsQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsT0FBTzs0QkFDWCxLQUFLLEVBQUUsVUFBVTt5QkFDcEI7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLFdBQVc7NEJBQ2YsS0FBSyxFQUFFLHNCQUFzQjs0QkFDN0IsS0FBSyxFQUFFLE9BQU87eUJBQ2pCO3FCQUNKO29CQUNELE9BQU8sRUFBRTt3QkFDTDs0QkFDSSxFQUFFLEVBQUUsUUFBUTs0QkFDWixLQUFLLEVBQUUsUUFBUTt5QkFDbEI7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLElBQUk7NEJBQ1IsS0FBSyxFQUFFLFFBQVE7eUJBQ2xCO3FCQUNKO2lCQUNKLENBQUM7Z0JBRTJCLHFCQUFNLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQTNFLE1BQU0sR0FBaUIsU0FBb0Q7Z0JBQ2pGLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ3hCLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMvQjs7OztLQUNKLENBQUE7QUFqRFksUUFBQSxhQUFhLGlCQWlEekI7QUFFRCxJQUFNLG1CQUFtQixHQUFHLFVBQU8sSUFBZ0I7Ozs7O2dCQUV6QyxtQkFBbUIsR0FBRyxJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQztnQkFFdEQsTUFBTSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQW5CLENBQW1CLENBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JGLFFBQVEsR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFyQixDQUFxQixDQUFlLENBQUMsS0FBSyxDQUFDO2dCQUN6RixRQUFRLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBckIsQ0FBcUIsQ0FBZSxDQUFDLEtBQUssQ0FBQztnQkFDekYsV0FBVyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQXBCLENBQW9CLENBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQzNGLE9BQU8sR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFwQixDQUFvQixDQUFlLENBQUMsS0FBSyxDQUFDO2dCQUN2RixLQUFLLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLFdBQVcsRUFBeEIsQ0FBd0IsQ0FBZSxDQUFDLEtBQUssQ0FBQztnQkFFL0YsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXZCLHFCQUFNLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUE7O2dCQUFoRCxZQUFZLEdBQUcsU0FBaUM7Z0JBQ2hDLEtBQUEsWUFBWSxDQUFBO3lCQUFaLHdCQUFZO2dCQUFJLHFCQUFNLFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUE7O3NCQUExQyxTQUEwQzs7O2dCQUExRSxhQUFhLEtBQTZEO2dCQUN6RCxLQUFBLGFBQWEsQ0FBQTt5QkFBYix3QkFBYTtnQkFBSSxxQkFBTSxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFBOztzQkFBckMsU0FBcUM7OztnQkFBdkUsY0FBYyxLQUF5RDtnQkFDbkQsS0FBQSxjQUFjLENBQUE7eUJBQWQsd0JBQWM7Z0JBQUkscUJBQU0sV0FBVyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBQTs7c0JBQTNDLFNBQTJDOzs7Z0JBQWpGLGlCQUFpQixLQUFnRTtnQkFDakUsS0FBQSxpQkFBaUIsQ0FBQTt5QkFBakIsd0JBQWlCO2dCQUFJLHFCQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3NCQUFuQyxTQUFtQzs7O2dCQUF4RSxhQUFhLEtBQTJEO2dCQUMxRCxLQUFBLGFBQWEsQ0FBQTt5QkFBYix5QkFBYTtnQkFBSSxxQkFBTSxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFBOztzQkFBL0IsU0FBK0I7OztnQkFBOUQsV0FBVyxLQUFtRDtnQkFDakQsS0FBQSxXQUFXLENBQUE7eUJBQVgseUJBQVc7Z0JBQUkscUJBQU0sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7c0JBQTdCLFNBQTZCOzs7Z0JBQXpELFVBQVUsS0FBK0M7Z0JBQzVDLEtBQUEsVUFBVSxDQUFBO3lCQUFWLHlCQUFVO2dCQUFJLHFCQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3NCQUE3QixTQUE2Qjs7O2dCQUF4RCxVQUFVLEtBQThDO2dCQUU5RCxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN2QyxVQUFVLElBQUksSUFBQSxpREFBdUIsRUFBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7S0FDdEUsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLFVBQU8sT0FBZSxFQUFFLGNBQXNCOzs7O29CQUN0QixxQkFBTSxJQUFBLG9CQUFVLEVBQUMsK0NBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dCQUF4RixRQUFRLEdBQTBCLFNBQXNEO2dCQUMxRixTQUFTLEdBQVksUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBRWpELElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2xHLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUNuRDtxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNuQixhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ2pDO2dCQUVELHNCQUFPLFNBQVMsRUFBQzs7O0tBQ3BCLENBQUE7QUFFRCxJQUFNLGFBQWEsR0FBRyxVQUFDLE9BQWU7SUFDbEMsSUFBQSxpREFBdUIsRUFBQyxZQUFZLEVBQUssT0FBTyxxQkFBa0IsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQTs7Ozs7Ozs7O0FDekdELG1EQUF1QztBQUN2Qyw2QkFBK0I7QUFFeEIsSUFBTSxPQUFPLEdBQUcsVUFBQyxPQUFtQixFQUFFLFFBQW9CLElBQW9CLE9BQUE7SUFDakYsb0JBQUMsd0JBQU0sSUFDSCxHQUFHLEVBQUUsQ0FBQyxFQUNOLFNBQVMsRUFBQyxlQUFlLEVBQ3pCLE9BQU8sRUFBRSxPQUFPLFlBR1g7SUFDVCxvQkFBQyx3QkFBTSxJQUNILEdBQUcsRUFBRSxDQUFDLEVBQ04sU0FBUyxFQUFDLGFBQWEsRUFDdkIsT0FBTyxFQUFFLFFBQVEsYUFHWjtDQUFDLEVBZHVFLENBY3ZFLENBQUE7QUFkRCxRQUFBLE9BQU8sV0FjTjs7Ozs7Ozs7O0FDakJkLDZCQUErQjtBQUMvQiwyQ0FBb0M7QUFDcEMseUNBQXNDO0FBWXRDLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxLQUFxQjtJQUM3QyxPQUFPLENBQ0gsNkJBQUssU0FBUyxFQUFFLHlEQUF5RDtRQUNyRSw2QkFBSyxTQUFTLEVBQUUsS0FBSztZQUNqQiw2QkFBSyxTQUFTLEVBQUUsVUFBVTtnQkFDdEIsNkJBQUssU0FBUyxFQUFFLHNCQUFzQjtvQkFDbEMsK0JBQU8sT0FBTyxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLGVBQVksVUFBYTtvQkFDbkUsK0JBQ0ksRUFBRSxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLGVBQVksRUFDMUMsU0FBUyxFQUFFLHdCQUF3QixFQUNuQyxRQUFRLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLEVBQzdDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxHQUNsQixDQUNBO2dCQUNOLDZCQUFLLFNBQVMsRUFBRSx5QkFBeUI7b0JBQ3JDLCtCQUFPLE9BQU8sRUFBSyxpQkFBTyxDQUFDLGFBQWEsRUFBRSxrQkFBZSxhQUFnQjtvQkFDekUsK0JBQ0ksRUFBRSxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLGtCQUFlLEVBQzdDLFNBQVMsRUFBRSwyQkFBMkIsRUFDdEMsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUEvQixDQUErQixFQUNoRCxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FDckIsQ0FDQTtnQkFDTiw2QkFBSyxTQUFTLEVBQUUsdUJBQXVCO29CQUNuQywrQkFBTyxPQUFPLEVBQUssaUJBQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWEsV0FBYztvQkFDckUsa0NBQ0ksRUFBRSxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLGdCQUFhLEVBQzNDLFNBQVMsRUFBRSx5QkFBeUIsRUFDcEMsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUE3QixDQUE2QixFQUM5QyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDakIsSUFBSSxFQUFFLENBQUMsRUFDUCxJQUFJLEVBQUUsRUFBRSxHQUNWLENBQ0E7Z0JBQ04sNkJBQUssU0FBUyxFQUFFLDBCQUEwQjtvQkFDdEMsK0JBQU8sT0FBTyxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLG1CQUFnQixjQUFpQjtvQkFDM0Usa0NBQ0ksRUFBRSxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLG1CQUFnQixFQUM5QyxTQUFTLEVBQUUsNEJBQTRCLEVBQ3ZDLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsRUFDakQsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQ3BCLElBQUksRUFBRSxFQUFFLEVBQ1IsSUFBSSxFQUFFLEVBQUUsR0FDVixDQUNBLENBQ0o7WUFDTiw2QkFBSyxTQUFTLEVBQUUsVUFBVTtnQkFDdEIsNkJBQUssU0FBUyxFQUFFLDJCQUEyQjtvQkFDdkMsK0JBQU8sT0FBTyxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLG9CQUFpQixlQUFrQjtvQkFDN0Usa0NBQ0ksRUFBRSxFQUFLLGlCQUFPLENBQUMsYUFBYSxFQUFFLG9CQUFpQixFQUMvQyxTQUFTLEVBQUUsNkJBQTZCLEVBQ3hDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUNyQixJQUFJLEVBQUUsRUFBRSxFQUNSLElBQUksRUFBRSxFQUFFLEdBQ1YsQ0FDQSxDQUNKLENBQ0osQ0FDSixDQUNULENBQUM7QUFDTixDQUFDLENBQUE7QUFFRCxTQUFTLGVBQWUsQ0FBQyxLQUFnQjtJQUNyQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLFFBQVE7SUFDaEMsT0FBTztRQUNILE1BQU0sRUFBRSxVQUFDLE1BQU07WUFDWCxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFBO1FBQzNELENBQUM7UUFDRCxTQUFTLEVBQUUsVUFBQyxNQUFNO1lBQ2QsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQTtRQUM5RCxDQUFDO1FBQ0QsT0FBTyxFQUFFLFVBQUMsTUFBTTtZQUNaLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUE7UUFDNUQsQ0FBQztRQUNELFVBQVUsRUFBRSxVQUFDLE1BQU07WUFDZixRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFBO1FBQy9ELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRVcsUUFBQSxjQUFjLEdBQUcsSUFBQSxxQkFBTyxFQUFpQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7QUNsRy9ILHFGQUFrRjtBQUNsRiw2RUFBMEU7QUFDMUUsc0NBQXNDO0FBRS9CLElBQU0sa0JBQWtCLEdBQUc7SUFDOUIsSUFBTSxnQkFBZ0IsR0FBcUIsSUFBQSxvQkFBVSxFQUFDLG1DQUFnQixDQUFDLENBQUM7SUFDeEUsSUFBTSxXQUFXLEdBQWlCLElBQUEsb0JBQVUsRUFBQywyQkFBWSxDQUFDLENBQUM7SUFDM0QsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxRCxJQUFJLGFBQWEsRUFBRTtRQUNmLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7S0FDcEU7U0FBTTtRQUNILFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLG9DQUFvQyxDQUFDLENBQUM7S0FDekU7QUFDTCxDQUFDLENBQUE7QUFWWSxRQUFBLGtCQUFrQixzQkFVOUI7Ozs7OztBQ2REO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLDJGQUF3RjtBQUN4Riw0RUFBeUU7QUFDekUsc0NBQXNDO0FBRXRDLElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUMvQixJQUFNLGdCQUFnQixHQUFHO0lBRTVCLElBQU0sT0FBTyxHQUF3QixJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQztJQUNyRSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksYUFBYSxDQUFDO0lBQ3RELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFDcEQsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLGFBQWEsQ0FBQztJQUM5QyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksYUFBYSxDQUFDO0lBQ3RELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFDcEQsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFDaEYsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxhQUFhLENBQUM7SUFFNUUsSUFBTSx1QkFBdUIsR0FBRyxpQkFBZSxPQUFPLFNBQU07U0FDeEQseUJBQXVCLEdBQUcsU0FBTSxDQUFBO1NBQ2hDLCtCQUE2QixPQUFPLFNBQU0sQ0FBQTtTQUMxQyw4QkFBNEIsTUFBTSxTQUFNLENBQUE7U0FDeEMsdUJBQXFCLE1BQU0sU0FBTSxDQUFBO1NBQ2pDLCtCQUE2QixvQkFBb0IsU0FBTSxDQUFBO1NBQ3ZELDZCQUEyQixrQkFBa0IsU0FBTSxDQUFBLENBQUM7SUFDeEQsSUFBQSxpREFBdUIsRUFBQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtBQUNyRSxDQUFDLENBQUE7QUFuQlksUUFBQSxnQkFBZ0Isb0JBbUI1Qjs7Ozs7Ozs7O0FDeEJELDZFQUEwRTtBQUUxRSx1REFBb0Q7QUFDcEQsc0NBQXNDO0FBRS9CLElBQU0sV0FBVyxHQUFHO0lBQ3ZCLElBQU0sV0FBVyxHQUFpQixJQUFBLG9CQUFVLEVBQUMsMkJBQVksQ0FBQyxDQUFDO0lBRTNELElBQU0sVUFBVSxHQUFpQjtRQUM3QixJQUFJLEVBQUUsMkJBQTJCO0tBQ3BDLENBQUM7SUFDRixXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRW5DLElBQU0sV0FBVyxHQUFnQjtRQUM3QixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxtQkFBbUI7UUFDekIsS0FBSyxFQUFFLGFBQWE7S0FDdkIsQ0FBQztJQUNGLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFcEMsSUFBTSxhQUFhLEdBQWlCO1FBQ2hDLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixLQUFLLEVBQUUsZUFBZTtLQUN6QixDQUFDO0lBQ0YsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV0QyxJQUFNLGFBQWEsR0FBaUI7UUFDaEMsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLEtBQUssRUFBRSxlQUFlO1FBQ3RCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsTUFBTSxFQUFFLG1DQUFnQjtLQUMzQixDQUFBO0lBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUE7QUE5QlksUUFBQSxXQUFXLGVBOEJ2Qjs7Ozs7Ozs7O0FDbkNELDRFQUF5RTtBQUVsRSxJQUFNLGdCQUFnQixHQUFHO0lBQzVCLElBQUEsaURBQXVCLEVBQUMsZ0JBQWdCLEVBQUUsNkNBQTZDLENBQUMsQ0FBQTtBQUM1RixDQUFDLENBQUE7QUFGWSxRQUFBLGdCQUFnQixvQkFFNUI7Ozs7Ozs7OztBQ0pELDJGQUF3RjtBQUN4RixzQ0FBc0M7QUFFL0IsSUFBTSxnQkFBZ0IsR0FBRztJQUM1QixJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUE7QUFGWSxRQUFBLGdCQUFnQixvQkFFNUI7Ozs7Ozs7OztBQ0xELHFHQUFrRztBQUNsRyxzQ0FBc0M7QUFDdEMsNEVBQXlFO0FBRWxFLElBQU0sV0FBVyxHQUFHO0lBQ3ZCLElBQU0sT0FBTyxHQUE2QixJQUFBLG9CQUFVLEVBQUMsbURBQXdCLENBQUMsQ0FBQztJQUUvRSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksZUFBZSxDQUFDO0lBRXhELElBQUEsaURBQXVCLEVBQUMsWUFBWSxFQUFFLGlCQUFlLE9BQVMsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQTtBQU5ZLFFBQUEsV0FBVyxlQU12Qjs7Ozs7O0FDVkQ7QUFDQTtBQUNBOzs7OztBQ0RBLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDOzs7QUFHdkMsc0VBQW1FO0FBQ25FLDJFQUEwRjtBQUUxRixpQkFBaUI7QUFDSixRQUFBLE9BQU8sR0FBbUIsSUFBSSw2QkFBYSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7QUFDcEgsaUJBQWlCO0FBQ0osUUFBQSxFQUFFLEdBQXlCLGVBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxDQUFDO0FBQ2pFLGlCQUFpQjtBQUNKLFFBQUEsZUFBZSxHQUFzQyxlQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsQ0FBQztBQUN4RyxpQkFBaUI7QUFDSixRQUFBLFVBQVUsR0FBaUMsZUFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLENBQUM7QUFDekYsaUJBQWlCO0FBQ0osUUFBQSxDQUFDLEdBQXFCLElBQUEsa0JBQVUsRUFBQyx5QkFBVyxDQUFDLENBQUMsbUJBQW1CLENBQUMsc0VBQXNFLENBQUMsQ0FBQzs7Ozs7OztBQ3ZCdkosdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXZDLCtCQUE0QjtBQUU1QixxQ0FBa0M7QUFFbEM7O0lBRUk7QUFDSjtJQUE0RixrRkFBSTtJQUM1Rix3RUFBWSxRQUF5QjtRQUFyQyxZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQUVsQjtRQURHLGlCQUFPLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxDQUFDOztJQUM1QixDQUFDO0lBQ0wscUVBQUM7QUFBRCxDQUxBLEFBS0MsQ0FMMkYsV0FBSSxHQUsvRjs7Ozs7OztBQ3ZCRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBLDZCQUErQjtBQUMvQixxQ0FBd0Q7QUFDeEQscUZBQW9GO0FBQ3BGLHdEQUF1RDtBQUN2RCxnR0FBK0Y7QUFDL0Ysb0ZBQW1GO0FBRW5GLDBFQUF5RTtBQUN6RSw0REFBMkQ7QUFDM0Qsc0RBQXFEO0FBQ3JELHdEQUF1RDtBQUN2RCxrRUFBaUU7QUFDakUsa0VBQWlFO0FBQ2pFLHdEQUF1RDtBQUN2RCxzRUFBcUU7QUFDckUsd0VBQXVFO0FBQ3ZFLDhFQUFnRztBQUVoRyxnSEFBK0c7QUFDL0csc0ZBQXFGO0FBQ3JGLHNGQUFxRjtBQUdyRixtRkFBbUY7QUFFbkYsK0VBQThFO0FBQzlFLGlHQUFnRztBQVVoRyw0RkFBMkY7QUFDM0YsNEZBQTJGO0FBSTNGO0lBQTBCLHdCQUFNO0lBQWhDOztJQXNFQSxDQUFDO0lBckVDLG1CQUFJLEdBQUo7UUFDRSxpQkFBTSxJQUFJLFdBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTywrQkFBZ0IsR0FBeEI7UUFDRSxJQUFBLHlCQUFlLEVBQUMsNkNBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sb0NBQXFCLEdBQTdCO1FBQ0UsSUFBTSxpQkFBaUIsR0FBRywrREFBK0QsQ0FBQztRQUUxRixJQUFNLGFBQWEsR0FBRyxJQUFJLDZDQUFxQixDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixHQUFHLFNBQVMsRUFBRTtZQUNqRyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQztZQUN2QyxJQUFJLDZDQUFxQixDQUFDLGNBQWMsRUFBRSxpQkFBaUIsR0FBRyxVQUFVLEVBQUUseUJBQVcsQ0FBQztZQUN0RixJQUFJLDZDQUFxQixDQUFDLHVCQUF1QixFQUFFLGlCQUFpQixHQUFHLHNCQUFzQixFQUFFLHlDQUFtQixDQUFDO1lBQ25ILElBQUksNkNBQXFCLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEdBQUcsV0FBVyxFQUFFLHlCQUFXLENBQUM7WUFDMUYsSUFBSSw2Q0FBcUIsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLEdBQUcsU0FBUyxFQUFFLHVCQUFVLENBQUM7WUFDakYsSUFBSSw2Q0FBcUIsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEdBQUcsTUFBTSxFQUFFLDZCQUFhLENBQUM7WUFDbEYsSUFBSSw2Q0FBcUIsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsR0FBRyxlQUFlLEVBQUUsbUNBQWdCLENBQUM7WUFDckcsSUFBSSw2Q0FBcUIsQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsR0FBRyxlQUFlLEVBQUUsbUNBQWdCLENBQUM7WUFDdEcsSUFBSSw2Q0FBcUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsR0FBRyxjQUFjLEVBQUUsdUNBQWtCLENBQUM7WUFDekcsSUFBSSw2Q0FBcUIsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsR0FBRyxxQkFBcUIsRUFBRSwrQ0FBc0IsQ0FBQztZQUNuSCxJQUFJLDZDQUFxQixDQUFDLG9CQUFvQixFQUFFLGlCQUFpQixHQUFHLG1CQUFtQixFQUFFLDBDQUFpQixDQUFDO1lBQzNHLGFBQWE7U0FDZCxDQUFDLENBQUM7UUFFSCxJQUFBLG9CQUFVLEVBQUMsNkNBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELG1CQUFtQjtJQUNYLHVDQUF3QixHQUFoQztRQUNFLElBQU0sc0JBQXNCLEdBQUcsSUFBQSxvQkFBVSxFQUFDLDJEQUE0QixDQUFDLENBQUMsQ0FBQyxvRUFBb0U7UUFFN0ksSUFBTSw0QkFBNEIsR0FBRyxVQUFDLElBQVM7WUFDN0MsSUFBTSxZQUFZLEdBQXNCO2dCQUN0QyxNQUFNLEVBQUUsNEJBQTRCO2dCQUNwQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxtQ0FBZ0IsRUFBRSxJQUFJLENBQUM7Z0JBQ3RELGNBQWMsRUFBRSx3QkFBd0I7YUFDekMsQ0FBQztZQUVGLElBQUEsb0JBQVUsRUFBQyx3Q0FBbUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUM7UUFFRixzQkFBc0IsQ0FBQywrQkFBK0IsQ0FDcEQsbUNBQWdCLEVBQ2hCLDRCQUE0QixFQUM1QixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlO0lBQ1AsMENBQTJCLEdBQW5DO1FBQ0UseUNBQXlDO1FBQ3pDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxpREFBdUIsQ0FBQyx5Q0FBbUIsRUFBRSx5Q0FBbUIsRUFBRTtZQUNqRyxLQUFLLEVBQUUscUJBQXFCLENBQUMsaUJBQWlCO1NBQy9DLENBQUMsQ0FBQztRQUNILHNEQUFzRDtRQUN0RCxJQUFBLG9CQUFVLEVBQUMsNkJBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUV6RixDQUFDO0lBR0gsV0FBQztBQUFELENBdEVBLEFBc0VDLENBdEV5QixlQUFNLEdBc0UvQjtBQXRFWSxvQkFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q2pCLCtCQUFpQztBQUdqQyxJQUFNLFlBQVksR0FBYztJQUM1QixHQUFHLEVBQUUsOENBQThDO0lBQ25ELE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLEVBQUU7SUFDUixPQUFPLEVBQUUsSUFBSTtJQUNiLFFBQVEsRUFBRSxFQUFFO0NBQ2YsQ0FBQTtBQUVELFNBQVMsT0FBTyxDQUFDLEtBQStCLEVBQUUsTUFBTTs7SUFBdkMsc0JBQUEsRUFBQSxvQkFBK0I7SUFFNUMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2pCLEtBQUssZUFBZTtZQUNoQiw2QkFDTyxLQUFLLGdCQUNQLE1BQU0sQ0FBQyxLQUFLLElBQUcsTUFBTSxDQUFDLE1BQU0sT0FDL0I7UUFDTjtZQUNJLE9BQU8sS0FBSyxDQUFBO0tBQ25CO0FBQ0wsQ0FBQztBQUVEO0lBQUE7UUFFVyxVQUFLLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBTXhDLENBQUM7SUFKRyw0QkFBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTCxpQkFBQztBQUFELENBUkEsQUFRQyxJQUFBO0FBUlksZ0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCdkIsd0ZBQXFGO0FBQ3JGLDZFQUEwRTtBQUMxRSxzQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUEyQyx5Q0FBZTtJQUExRDs7SUFPQSxDQUFDO0lBSlMsdUNBQU8sR0FBYjs7OztnQkFDVSxXQUFXLEdBQWlCLElBQUEsb0JBQVUsRUFBQywyQkFBWSxDQUFDLENBQUM7Z0JBQzNELFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7Ozs7S0FDckU7SUFMTSxrQ0FBWSxHQUFHLCtFQUErRSxDQUFDO0lBTTFHLDRCQUFDO0NBUEQsQUFPQyxDQVAwQyxpQ0FBZSxHQU96RDtBQVBZLHNEQUFxQjs7Ozs7Ozs7O0FDTmxDLDJGQUF3RjtBQUN4RixzQ0FBc0M7QUFFL0IsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQWEsRUFBRSxHQUFXO0lBQzlELElBQU0sSUFBSSxHQUFlO1FBQ3JCLEtBQUssT0FBQTtRQUNMLE1BQU0sRUFBRTtZQUNKO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRzthQUNaO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTDtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO0tBQ0osQ0FBQztJQUNGLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFsQlksUUFBQSx1QkFBdUIsMkJBa0JuQzs7Ozs7O0FDdEJEO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coJz3MIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSAfPjs9SzUgNDA9PUs1IEE1Mzw1PUIwOicsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQsIG51bGwsIDIpKTtcblxuICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuRGVwYXJ0dXJlRGF0ZVRpbWU7XG5cbiAgaWYgKCFkZXBhcnR1cmVEYXRlVGltZSkge1xuICAgIGNvbnNvbGUud2FybignoA8gW2dldEZsaWdodEZyb21TYWJyZURhdGFdIERlcGFydHVyZURhdGVUaW1lID5CQUNCQUIyQzVCIDIgNDA9PUtFIEE1Mzw1PUIwIScpO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1VOS05PV04nLFxuICAgICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlciB8fCAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLFxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnQSdcbiAgfTtcbn07IiwiZXhwb3J0IGNvbnN0IHF1aWNrZXRDb25maWcgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBsYW5nOiAnRU4nLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICB2aXNpYmxlRnVzZWxhZ2U6IHRydWUsXG4gICAgdmlzaWJsZVdpbmdzOiB0cnVlLFxuICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgc2luZ2xlRGVja01vZGU6IHRydWUsXG4gICAgYnVpbHRJblRvb2x0aXA6IHRydWUsXG4gICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICB0b29sdGlwT25Ib3ZlcjogZmFsc2UsXG4gICAgY29sb3JUaGVtZToge1xuICAgICAgICBzZWF0TGFiZWxDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgc2VhdFN0cm9rZUNvbG9yOiAnZ3JheSdcbiAgICB9XG59OyIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50OiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vID0NIBs+MzhAQzU8IDJFPjRPSTg1IDQwPT1LNVxuICBjb25zb2xlLmxvZygnPTkgW1NlYXRNYXBDb21wb25lbnRdIHJlY2VpdmVkIHByb3BzOicsIHsgY29uZmlnLCBkYXRhIH0pO1xuXG4gIGNvbnN0IGZsaWdodCA9IGdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KTsgLy8gTUI+IEA1OUEgQSBBNTM8NT1CPjxcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0KTtcbiAgXG4gIC8vIGZsaWdodCA0O08gP0A+MjVAOjhcbiAgLy8gZmxpZ2h0OntcbiAgLy8gICBpZDogJzAwMScsIFxuICAvLyAgICAgYWlybGluZUNvZGU6ICdMSCcsXG4gIC8vICAgICBmbGlnaHRObzogJzEyMycsXG4gIC8vICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNC0yMicsIFxuICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgLy8gICAgIGFycml2YWw6ICdGUkEnLFxuICAvLyAgICAgY2FiaW5DbGFzczogJ0EnXG4gIC8vIH0sXG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodCxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA8PjY9PiBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShmbGlnaHQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwQ29tcG9uZW50XSBpZnJhbWUgbG9hZGVkLCBzZW5kaW5nIGRhdGEuLi4nKTtcbiAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudDsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55OyAvLyAUMD09SzUsIDo+Qj5ASzUgP0A4RT40T0IgODcgU2hvcHBpbmcgQUY1PTBAOE9cbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4vLyAfPjtDRzA1PCBCNTpDSTg5IEE1Mzw1PUJcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuICBjb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB8+O0NHNT09SzUgNDA9PUs1OicsIGRhdGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuXG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodDoge1xuXG4gICAgICAgIGlkOiAnMDAxJywgIC8vICMxNTQ4QUwsIEdCPiA/NUA1NDA1QkFPIGlkXG4gICAgICAgIGFpcmxpbmVDb2RlOiBjdXJyZW50U2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdMSCcsXG4gICAgICAgIGZsaWdodE5vOiBjdXJyZW50U2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzEyMycsXG4gICAgICAgIGRlcGFydHVyZURhdGU6IGN1cnJlbnRTZWdtZW50LmRlcGFydHVyZURhdGVUaW1lIHx8ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgZGVwYXJ0dXJlOiBjdXJyZW50U2VnbWVudC5vcmlnaW4gfHwgJ01VQycsXG4gICAgICAgIGFycml2YWw6IGN1cnJlbnRTZWdtZW50LmRlc3RpbmF0aW9uIHx8ICdGUkEnLFxuICAgICAgICBjYWJpbkNsYXNzOiBjdXJyZW50U2VnbWVudC5jYWJpbkNsYXNzIHx8ICdBJ1xuXG4gICAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gIUQ+QDw4QD4yMD09SzUgNDA9PUs1IDQ7TyA+Qj9AMDI6ODonLCBzZWF0TWFwRGF0YSk7XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSA4OzggY29udGVudFdpbmRvdyA9NSA0PkFCQz81PS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB5CP0AwMjowIDQwPT1LRSAyIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2VuZFRvSWZyYW1lKCk7XG4gIH0sIFtzZWdtZW50SW5kZXhdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qIEZsaWdodCBJbmZvIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGN1cnJlbnRTZWdtZW50LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdYWCd9IHtzZWdtZW50LmZsaWdodE51bWJlciB8fCAnMDAwJ306IHtzZWdtZW50Lm9yaWdpbn0gkiB7c2VnbWVudC5kZXN0aW5hdGlvbn1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXtzZW5kVG9JZnJhbWV9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOyIsbnVsbCxudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcE1vZGFsKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCBkYXRhIC0gPjFKNTpCIEI4PzAgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBGNTs4Oj48XG4gICAgfSksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgXG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuaW50ZXJmYWNlIFNlYXRNYXBTaG9wcGluZ0RhdGEge1xuICAgIGZsaWdodFNlZ21lbnRzOiBhbnlbXTsgIC8vIBw+Nj0+IDcwPDU9OEJMID0wIDo+PTpANUI9SzkgQjg/LCA1QTs4IDg3MjVBQjU9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcFNob3BwaW5nTW9kYWwoZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YSk6IHZvaWQge1xuXG4gICAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgICBpZiAoIW1vZGFsU2VydmljZSB8fCB0eXBlb2YgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gUHVibGljTW9kYWxzU2VydmljZSBub3QgYXZhaWxhYmxlIG9yIG5vdCBjb25maWd1cmVkIHByb3Blcmx5LicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgIC8vID3MIBcwOkBLQkwgMkE1ID9ANTRLNENJODUgPD40MDtMPUs1ID46PTAgPzVANTQgPkI6QEtCODU8ID0+Mj4zPlxuICAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBBbGwgcHJldmlvdXMgbW9kYWxzIGNsb3NlZC4nKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEVycm9yIGhpZGluZyBtb2RhbHM6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIC8vIEQ+QDw4QEM1PCBvcHRpb25zIDQ7TyA/NUA1NDBHOCAyIDw+NDA7TD0+NSA+Oj0+XG4gICAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ0FCQyBTZWF0TWFwIFNob3BwaW5nIFZpZXdlcicsXG4gICAgICAgIC8vIEE+NzQwNTwgUmVhY3QtOj48Pz49NT1CID0wID5BPT4yNSBTZWF0TWFwQ29tcG9uZW50XG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLFxuICAgICAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBTaG9wcGluZyBNb2RhbF0gQ2xvc2VkJylcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3MIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIE1vZGFsIGRhdGE6JywgZGF0YSk7XG5cbiAgICAvLyAfQD4yNUA6MCA9MCA0PkFCQz89PkFCTCA8NUI+NDAgYHNob3dSZWFjdE1vZGFsYFxuICAgIHRyeSB7XG4gICAgICAgIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTsgLy8gPz46MDdLMjA1PCA8PjQwO0w9PjUgPjo9PiBBIDUzPiBvcHRpb25zXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBFcnJvciBzaG93aW5nIG1vZGFsOicsIGVycm9yKTtcbiAgICB9XG5cbn0iLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICAgICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30gPiBcbiAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4gICAgICAgICAgICA8b2w+XG4gICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L29sPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gXG5cbi8vIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuLy8gaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0NvbnRleHQnO1xuLy8gaW1wb3J0IHtJU2VhdE1hcFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1zZWF0bWFwL3NlcnZpY2VzL0lTZWF0TWFwU2VydmljZSc7XG5cbi8vIGV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuLy8gICAgIGNvbnN0IGhhbmRsZU9wZW5TZWF0TWFwID0gYXN5bmMgKGZsaWdodFNlZ21lbnROdW1iZXI6IG51bWJlcikgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhgPesgT3BlbmluZyBTZWF0IE1hcCBmb3Igc2VnbWVudDogJHtmbGlnaHRTZWdtZW50TnVtYmVyfWApO1xuICAgIFxuLy8gICAgICAgICB0cnkge1xuLy8gICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRTZXJ2aWNlKElTZWF0TWFwU2VydmljZSkub3BlblNlYXRNYXBGb3JGbGlnaHRTZWdtZW50KGZsaWdodFNlZ21lbnROdW1iZXIpO1xuICAgIFxuLy8gICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5tb2RhbE9wZW5lZENvcnJlY3RseSkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYKAPIEVycm9yIG9wZW5pbmcgU2VhdCBNYXA6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfWApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTCBGYWlsZWQgdG8gb3BlbiBTZWF0IE1hcDpgLCBlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuXG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4vLyAgICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuLy8gICAgICAgICAgICAgPG9sPlxuLy8gICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbi8vICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcGVuU2VhdE1hcChpbmRleCArIDEpfT4+kSBPcGVuIFNlYXQgTWFwPC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4vLyAgICAgICAgICAgICAgICAgKSl9XG4vLyAgICAgICAgICAgICA8L29sPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuLy8gfTtcblxuXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwTW9kYWwgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVmlldyA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJz2AIFNlYXRNYXBBdmFpbFZpZXcgZGF0YTonLCBkYXRhKTsgLy8gOz4zIDIgPj1BPjtMXG4gICAgICBzaG93U2VhdE1hcE1vZGFsKGRhdGEpOyAvLyAySzdLMjA1PCBEQz06RjhOID8+OjA3MCA8PjQwO0w9PjM+ID46PTAgYyA0MD09Szw4IChkYXRhKVxuICAgIH0sIFtdKTtcbiAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9OyIsImltcG9ydCB7VGlsZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZSc7XG5pbXBvcnQge1RpbGVPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlT3B0aW9ucyc7XG5pbXBvcnQge0ZsaWdodFNlZ21lbnR9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7V2l0aG91dEZvY3VzT25DbGlja30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL21peGlucy9XaXRob3V0Rm9jdXNPbkNsaWNrJztcbmltcG9ydCB7SW5pdGlhbH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL0luaXRpYWwnO1xuaW1wb3J0IHtNaXhpbn0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL01peGluJztcbmltcG9ydCB7Q3NzQ2xhc3N9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlJywgeyBvdmVyd3JpdGU6IGZhbHNlIH0pXG5ASW5pdGlhbDxUaWxlT3B0aW9ucz4oe1xuICAgIGNhcHRpb246ICdBQkMgU2VhdE1hcCcsIC8vIDg8TyB0aWxlXG4gICAgY2xhc3NOYW1lOiAnd2ViLWFpci1zaG9wcGluZy13aWRnZXQtc2FtcGxlJ1xufSlcbkBNaXhpbihXaXRob3V0Rm9jdXNPbkNsaWNrKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1RpbGUgZXh0ZW5kcyBUaWxlPEZsaWdodFNlZ21lbnQ+IGltcGxlbWVudHMgV2l0aG91dEZvY3VzT25DbGljayB7XG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmxpZ2h0TnVtYmVycyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCkubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LmdldEZsaWdodE51bWJlcigpKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudHNIdG1sID0gZmxpZ2h0TnVtYmVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGA8ZGl2PlNlZ21lbnRzOjxiciAvPiR7ZmxpZ2h0TnVtYmVycy5qb2luKCcsICcpfTwvZGl2PmBcbiAgICAgICAgICAgIDogYDxkaXY+U2VnbWVudDogJHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJykgfHwgJ04vQSd9PC9kaXY+YFxuICAgICAgICBjb25zdCBwcmljZUh0bWwgPSBgPGRpdj5QcmljZTogJHtjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRQcmljZSgpfTwvZGl2PmA7XG5cbiAgICAgICAgdGhpcy5zZXREYXRhQ29udGVudChzZWdtZW50c0h0bWwgKyBwcmljZUh0bWwpO1xuICAgIH1cblxuICAgIHNlbGZTZWxlY3RlZEZhcmVDaGFuZ2VkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYSk7XG4gICAgfVxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7ICAvLyAFIC8yPUs5IDg8Pz5AQiBSZWFjdERPTVxuaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nIGZyb20gJy4uL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZyc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlOlNob3BwaW5nVGlsZVZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuXG4gICAgcHJpdmF0ZSBmbGlnaHRTZWdtZW50czogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkU2VnbWVudEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQgY2FsbGVkIHdpdGggY3BhOicsIGNwYSk7XG5cbiAgICAgICAgLy8gLy8gPSggJTBANDo+NDg8IDQwPT1LNSA0O08gP0A+MjVAOjhcbiAgICAgICAgLy8gY29uc3QgZmxpZ2h0RGF0YSA9IHtcbiAgICAgICAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAgICAgICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgICAgICAgLy8gICAgIGFycml2YWw6ICdGUkEnXG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gSGFyZGNvZGVkIGZsaWdodCBkYXRhOicsIGZsaWdodERhdGEpO1xuICAgICAgICAvLyB0aGlzLmZsaWdodFNlZ21lbnRzID0gW2ZsaWdodERhdGFdO1xuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4ID0gMDtcblxuICAgICAgICBjb25zdCBzZWdtZW50cyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG4gICAgICAgIHRoaXMuZmxpZ2h0U2VnbWVudHMgPSBzZWdtZW50cy5tYXAoc2VnbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuZ2V0RGVwYXJ0dXJlRGF0ZSgpO1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogJzAwMScsXG4gICAgICAgICAgICAgICAgc2VnbWVudElkOiBzZWdtZW50LmdldFNlZ21lbnRJZCgpLFxuICAgICAgICAgICAgICAgIGZsaWdodE51bWJlcjogc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKSxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHNlZ21lbnQuZ2V0T3JpZ2luSWF0YSgpLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBzZWdtZW50LmdldERlc3RpbmF0aW9uSWF0YSgpLFxuICAgICAgICAgICAgICAgIGFpck1pbGVzOiBzZWdtZW50LmdldEFpck1pbGVzKCksXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZVRpbWU6IGRlcGFydHVyZURhdGVUaW1lID8gZGVwYXJ0dXJlRGF0ZVRpbWUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJ1VOS05PV04nLCAvLyAUPjEwMjs1PTg1IDQwQktcbiAgICAgICAgICAgICAgICBtYXJrZXRpbmdBaXJsaW5lOiBzZWdtZW50LmdldE1hcmtldGluZ0FpcmxpbmUoKSxcbiAgICAgICAgICAgICAgICBjYWJpbkNsYXNzOiAnRWNvbm9teScgLy8gH0A4PDVALCA8PjY9PiA/NUA1NDAyMEJMIEA1MDtMPUs1IDQwPT1LNVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gH0A+MUM1PCBANT00NUA4QkwgUmVhY3QgOj48Pz49NT1CIEEgNzA0NUA2Oj45LCBHQj4xSyAzMEAwPUI4QD4yMEJMID0wOzhHODUgTTs1PDU9QjBcbiAgICAgICAgdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRyeVJlbmRlclJlYWN0Q29tcG9uZW50KGF0dGVtcHRzID0gMCkge1xuICAgICAgICBjb25zdCBNQVhfQVRURU1QVFMgPSAxMDtcbiAgICAgICAgY29uc3QgSU5URVJWQUwgPSA1MDA7IC8vIBg9QjVAMjA7IDw1NjRDID8+P0tCOjA8OCAoMiA8ODs7OEE1OkM9NDBFKVxuXG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuXG4gICAgICAgIGlmIChyb290RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgc2VhdG1hcC1yb290ID0wOTQ1PS4gHTBHOD0wNTwgQDU9NDVAOD0zIFJlYWN0IDo+PD8+PTU9QjAuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlYWN0Q29tcG9uZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0ZW1wdHMgPCBNQVhfQVRURU1QVFMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgoA8gW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgc2VhdG1hcC1yb290ID01ID0wOTQ1PS4gHz4yQj5APTBPID8+P0tCOjAgRzVANTcgJHtJTlRFUlZBTH0gPEEuIB8+P0tCOjAgJHthdHRlbXB0cyArIDF9LyR7TUFYX0FUVEVNUFRTfWApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyeVJlbmRlclJlYWN0Q29tcG9uZW50KGF0dGVtcHRzICsgMSksIElOVEVSVkFMKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIB01IEM0MDs+QUwgPTA5QjggTTs1PDU9QiBzZWF0bWFwLXJvb3QgPz5BOzUgPDA6QTg8MDtMPT4zPiBHOEE7MCA/Pj9LQj46LicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUmVhY3RDb21wb25lbnQoKSB7XG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuICAgIFxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIB5HOEkwNTwgP0A1NEs0Q0k4OSBANT00NUAgPzVANTQgQjU8LCA6MDogQT0+MjAgPkJANT00NUA4QkwgUmVhY3QgOj48Pz49NT1CXG4gICAgICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHJvb3RFbGVtZW50KTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZmxpZ2h0U2VnbWVudHM6IHRoaXMuZmxpZ2h0U2VnbWVudHMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IHRoaXMuc2VsZWN0ZWRTZWdtZW50SW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcsIHsgY29uZmlnOiBxdWlja2V0Q29uZmlnLCBkYXRhIH0pLFxuICAgICAgICAgICAgICAgIHJvb3RFbGVtZW50XG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBSZWFjdCBDb21wb25lbnQgQ0E/NUg9PiA+QkA1PTQ1QDU9IDIgI3NlYXRtYXAtcm9vdC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgQSBpZD1cInNlYXRtYXAtcm9vdFwiID01ID0wOTQ1PSA/QDggPz4/S0I6NSBANT00NUA4PTMwLicpO1xuICAgICAgICB9XG4gICAgfVxufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSwgcmVnaXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQnV0dG9uIH0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbENvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL1JlZEFwcFNpZGVQYW5lbENvbmZpZyc7XG5cbmltcG9ydCB7IEN1c3RvbVdvcmtmbG93U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVBuckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybSc7XG5pbXBvcnQgeyBjYWxsTGFzTGF4IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHsgc2hvd1J1bnRpbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUnO1xuaW1wb3J0IHsgc2hvd0ludGVyc3RpdGlhbCB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsJztcbmltcG9ydCB7IHNob3dBZ2VudFByb2ZpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQgeyBzaG93QmFubmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QmFubmVycyc7XG5pbXBvcnQgeyByZWZyZXNoVHJpcFN1bW1hcnkgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5JztcbmltcG9ydCB7IGNhbGxFeHRlcm5hbFNlcnZpY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb25Gb3JtLCBoaWRlTm90aWZpY2F0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtJztcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldyc7XG5cbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRHJhd2VyU2VydmljZSc7XG5pbXBvcnQgeyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2NvbmZpZ3MvZHJhd2VyL0xhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnJztcblxuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5cbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudEF2YWlsJztcblxuaW1wb3J0IHsgU2VhdE1hcFNob3BwaW5nVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1RpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcFNob3BwaW5nVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcnO1xuXG5cblxuZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBNb2R1bGUge1xuICBpbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VydmljZXMoKTtcbiAgICB0aGlzLnNldHVwU2lkZVBhbmVsQnV0dG9ucygpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJTZXJ2aWNlcygpOiB2b2lkIHtcbiAgICByZWdpc3RlclNlcnZpY2UoQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTaWRlUGFuZWxCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VDc3NDbGFzc05hbWVzID0gJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItY3VzdG9td29ya2Zsb3cnO1xuXG4gICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBSZWRBcHBTaWRlUGFuZWxDb25maWcoW1xuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBiYW5uZXJzJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWJhbm5lcnMnLCBzaG93QmFubmVycyksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdFeHRlcm5hbCBzZXJ2aWNlIGNhbGwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctZXh0ZXJuYWxzZXJ2aWNlY2FsbCcsIGNhbGxFeHRlcm5hbFNlcnZpY2UpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVkQXBwIHBsYXRmb3JtJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBsYXRmb3JtJywgc2hvd1J1bnRpbWUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignTEFTIC0gTEFYJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFjdGlvbicsIGNhbGxMYXNMYXgpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIFBOUicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbnInLCBjcmVhdGVQbnJGb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgaW50ZXJzdGl0aWFsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWludGVyc3RpdGlhbCcsIHNob3dJbnRlcnN0aXRpYWwpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBBZ2VudCBQcm9maWxlJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFnZW50cHJvZmlsZScsIHNob3dBZ2VudFByb2ZpbGUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVmcmVzaCBUcmlwIFN1bW1hcnknLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVmcmVzaHRyaXAnLCByZWZyZXNoVHJpcFN1bW1hcnkpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIG5vdGlmaWNhdGlvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1jcmVhdGVOb3RpZmljYXRpb24nLCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0hpZGUgbm90aWZpY2F0aW9ucycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1oaWRlTm90aWZpY2F0aW9uJywgaGlkZU5vdGlmaWNhdGlvbnMpLFxuICAgICAgc2VsZlJlbW92ZUJ0blxuICAgIF0pO1xuXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygncmVkQXBwU2lkZVBhbmVsJywgY29uZmlnKTtcbiAgfVxuXG4gIC8vIEF2YWlsYWJpbGl0eVRpbGVcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgYWlyQXZhaWxhYmlsaXR5U2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSk7IC8vIDI9Q0JANT09ODkgQTVAMjhBIDQ7TyA/QDU0PkFCMDI7NT04TyA0MD09S0UgMiBAMDw6MEUgQXZhaWxhYmlsaXR5XG5cbiAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnQUJDIFNlYXRNYXAgKEF2YWlsYWJpbGl0eSknLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcEF2YWlsVmlldywgZGF0YSksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH07XG5cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobW9kYWxPcHRpb25zKTtcbiAgICB9O1xuXG4gICAgYWlyQXZhaWxhYmlsaXR5U2VydmljZS5jcmVhdGVBaXJBdmFpbGFiaWxpdHlTZWFyY2hUaWxlKFxuICAgICAgU2VhdE1hcEF2YWlsVGlsZSxcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwsXG4gICAgICAnQUJDIFNlYXRNYXAnXG4gICAgKTtcbiAgfVxuXG4gIC8vIFNob3BwaW5nVGlsZVxuICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nVGlsZSgpOiB2b2lkIHtcbiAgICAvLyA+P0A1NDU7TzU8IGNvbmZpZyBzaG9wcGluZ0RyYXdlckNvbmZpZ1xuICAgIGNvbnN0IHNob3BwaW5nRHJhd2VyQ29uZmlnID0gbmV3IExhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnKFNlYXRNYXBTaG9wcGluZ1RpbGUsIFNlYXRNYXBTaG9wcGluZ1ZpZXcsIHtcbiAgICAgIHRpdGxlOiAnU2hvcHBpbmcgVGlsZVdpZGdldCcgLy8gNzAzPjs+Mj46ID46PTBcbiAgICB9KTtcbiAgICAvLyAySzcySzIwNTwgQTVAMjhBIEEgTUI4PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBnZXRTZXJ2aWNlKERyYXdlclNlcnZpY2UpLmFkZENvbmZpZyhbJ3Nob3BwaW5nLWZsaWdodC1zZWdtZW50J10sIHNob3BwaW5nRHJhd2VyQ29uZmlnKTtcblxuICB9XG5cblxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGU6IFN0b3JlRGF0YSA9IHtcbiAgICB1cmw6ICdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMScsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBib2R5OiAnJyxcbiAgICBoZWFkZXJzOiAne30nLFxuICAgIHJlc3BvbnNlOiAnJ1xufVxuXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdG9yZURhdGEgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdTRVRfUEFSQU1FVEVSJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi5uZXdWYWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlIHtcblxuICAgIHB1YmxpYyBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xuXG4gICAgZ2V0RGF0YSgpOiBTdG9yZURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtJQ3VzdG9tV29ya2Zsb3d9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvaW50ZXJmYWNlcy9JQ3VzdG9tV29ya2Zsb3cnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbi8qKlxuICogU2VydmljZSB1c2VkIHdpdGggZGVjbGFyYXRpdmUgY3VzdG9tIHdvcmtmbG93IGluIG1hbmlmZXN0Lmpzb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgZXh0ZW5kcyBJQ3VzdG9tV29ya2Zsb3cge1xuICAgIHN0YXRpYyBTRVJWSUNFX05BTUUgPSAnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS1DdXN0b21Xb3JrZmxvd1NlcnZpY2UnO1xuXG4gICAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignSW5mbycsICdDdXN0b20gV29ya2Zsb3cgU2VydmljZSBTdWNjZXNzJyk7XG4gICAgfVxufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGggPSAodGl0bGU6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdQQVJBR1JBUEgnLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2xvc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG59IixudWxsLG51bGwsbnVsbF19 