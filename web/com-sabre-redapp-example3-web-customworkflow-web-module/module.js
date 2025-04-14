System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/extractSegmentData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSegmentData = void 0;
function extractSegmentData(segment) {
    return {
        flightNumber: segment.getSegmentId(),
        marketingCarrier: segment.getMarketingOperatingAirline(),
        departureDate: segment.getRawDepartureDate(),
        rbd: segment.getSelectedBookingClass() || 'N/A',
        origin: segment.getOriginIata(),
        destination: segment.getDestinationIata(),
        equipmentCode: segment.getEquipmentCode(),
        equipmentCodes: segment.getEquipmentCodes().map(function (codeInfo) { return String(codeInfo); }),
        segmentRph: segment.getRph()
    };
}
exports.extractSegmentData = extractSegmentData;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/extractSegmentData.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/extractSegmentData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/extractSegmentData"))});
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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),react_1=require("react"),getFlightFromSabreData_1=require("../abc-seatmap/getFlightFromSabreData"),SeatMapComponent=function(e){var t=e.config,o=e.data,a=(0,react_1.useState)(0),n=a[0],l=a[1],i=(0,react_1.useRef)(null);console.log("🔹 [SeatMapComponent] received props:",{config:t,data:o});var r=(0,getFlightFromSabreData_1.getFlightFromSabreData)(o,n),c=o.flightSegments||[];console.log("✈️ [SeatMapComponent] parsed flight:",r);var g={config:t,flight:{id:"001",airlineCode:"LH",flightNo:"123",departureDate:"2025-04-22",departure:"MUC",arrival:"FRA",cabinClass:"A"},layout:{decks:[{id:"main-deck",name:"Deck 1",width:600,height:400,rows:[{label:"1",seats:[{label:"A",x:50,y:50},{label:"B",x:100,y:50}]},{label:"2",seats:[{label:"A",x:50,y:100}]}]}]},availability:[{label:"1A",price:50,currency:"USD",color:"green",onlyForPassengerType:["ADT"]},{label:"1B",price:45,currency:"USD",color:"yellow",onlyForPassengerType:["ADT"]},{label:"2A",price:30,currency:"USD",color:"lightblue"}],passengers:[{id:"PAX1",name:"Иванов И.И.",type:"ADT"}]},s=function(){var e=i.current;if(null==e?void 0:e.contentWindow){var t={type:"seatMaps",config:JSON.stringify(g.config),flight:JSON.stringify(g.flight),layout:JSON.stringify(g.layout)};console.log("📤 [SeatMapComponent] sending to iframe with data:",{config:JSON.stringify(g.config),flight:JSON.stringify(g.flight)}),console.log("📤 [SeatMapComponent] sending to iframe:",t),e.contentWindow.postMessage(t,"*")}else console.warn("⚠️ iframe or contentWindow not available")};return console.log("🧠 SeatMapComponent is rendering!"),(0,react_1.useEffect)(function(){console.log("🛠️ SeatMapComponent mounted"),console.log("🔄 Segment index changed: "+n),s()},[n]),React.createElement("div",{style:{padding:"1rem"}},React.createElement("div",{style:{marginBottom:"1rem",fontSize:"0.9rem",color:"#333"}},React.createElement("strong",null,"🛫 Flight info:"),React.createElement("pre",null,JSON.stringify(r,null,2))),React.createElement("div",{style:{marginBottom:"1rem"}},React.createElement("label",{htmlFor:"segmentSelect"},"Выберите сегмент: "),React.createElement("select",{id:"segmentSelect",value:n,onChange:function(e){return l(Number(e.target.value))}},c.map(function(e,t){var o,a,n,l,i,r;return React.createElement("option",{key:t,value:t},(null===(a=null===(o=e.MarketingAirline)||void 0===o?void 0:o.EncodeDecodeElement)||void 0===a?void 0:a.Code)||"XX"," ",e.FlightNumber||"000"," → ",(null===(l=null===(n=e.OriginLocation)||void 0===n?void 0:n.EncodeDecodeElement)||void 0===l?void 0:l.Code)||"???"," –",(null===(r=null===(i=e.DestinationLocation)||void 0===i?void 0:i.EncodeDecodeElement)||void 0===r?void 0:r.Code)||"???")}))),React.createElement("iframe",{ref:i,src:"https://quicket.io/react-proxy-app/",width:"100%",height:"800",style:{border:"1px solid #ccc"},title:"SeatMapIframe",onLoad:function(){console.log("✅ [SeatMapComponent] iframe loaded, sending data..."),s()}}))};exports.default=SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/getFlightFromSabreData"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var getFlightFromSabreData_1 = require("./getFlightFromSabreData");
var SeatMapComponentAvail = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // 🔍 Логируем входящие данные
    console.log('🔹 [SeatMapComponent] received props:', { config: config, data: data });
    var flight = (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex); // это сегмент полета c датой
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
            // раскомментировать при необходимости
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
exports.default = SeatMapComponentAvail;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentPricing", ["react","react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentPricing = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // 🔍 Логируем входящие данные
    // console.log('🔹 [SeatMapComponent] received props:', { config, data });
    console.log('📥 [SeatMapComponent] Incoming data:', data);
    // Получаем текущий сегмент
    var flightSegments = data.flightSegments || [];
    var currentSegment = flightSegments[segmentIndex] || {};
    // 🔍 Логируем сформированный flight
    console.log('✈️ [SeatMapComponent] parsed flight:', flightSegments);
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
            React.createElement("pre", null, JSON.stringify(currentSegment, null, 2))),
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
exports.default = SeatMapComponentPricing;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentPricing.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentPricing"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentPricing"))});
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapAvailModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapAvailModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentAvail_1 = require("./SeatMapComponentAvail");
var quicketConfig_1 = require("./quicketConfig"); // config с настройками отображения карты
// data: PublicAirAvailabilityData 
function showSeatMapAvailModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    // формируем options для передачи в модальное окно
    var options = {
        header: 'SeatMaps ABC 360 Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentAvail_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data // передаём data - объект типа PublicAirAvailabilityData целиком
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options); // показываем модальное окно с его options
}
exports.showSeatMapAvailModal = showSeatMapAvailModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapAvailModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapAvailModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapAvailModal"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentAvail","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapModal=void 0;var React=require("react"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponentAvail_1=require("./SeatMapComponentAvail"),quicketConfig_1=require("./quicketConfig");function showSeatMapModal(e){var a=(0,Context_1.getService)(PublicModalService_1.PublicModalsService),o={header:"SeatMap Viewer",component:React.createElement(SeatMapComponentAvail_1.default,{config:quicketConfig_1.quicketConfig,data:e}),onHide:function(){return console.log("[SeatMap Modal] Closed")}};a.showReactModal(o)}exports.showSeatMapModal=showSeatMapModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showSeatMapModalForSegment=void 0;var React=require("react"),Context_1=require("../../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapComponent_1=require("./SeatMapComponent"),quicketConfig_1=require("./quicketConfig");function showSeatMapModalForSegment(e){var o,t=(0,Context_1.getService)(PublicModalService_1.PublicModalsService),a={flightSegments:[e],dateOfFlight:(null===(o=e.getDepartureDate())||void 0===o?void 0:o.toISOString().split("T")[0])||"2025-04-21"};console.log("[✅ showSeatMapModalForSegment] Will open modal with data:",a);var r={header:"SeatMap Viewer (from Segment)",component:React.createElement(SeatMapComponent_1.default,{config:quicketConfig_1.quicketConfig,data:a}),onHide:function(){return console.log("[SeatMap Modal for Segment] Closed")}};t.showReactModal(r)}exports.showSeatMapModalForSegment=showSeatMapModalForSegment;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModalForSegment"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponentPricing","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/quicketConfig"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal"))});
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
        header: 'SeatMaps ABC 360 Viewer',
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile", ["react"], false, function (require, exports, module) {
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
            } }, "SeatMaps ABC 360")));
};
exports.PricingTile = PricingTile;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingView = void 0;
var React = require("react");
var react_1 = require("react");
var showSeatMapPricingModal_1 = require("../../../components/abc-seatmap/showSeatMapPricingModal");
// TODO корректный выбор сегмента
var PricingView = function (data) {
    (0, react_1.useEffect)(function () {
        console.log('🚀 PricingView data:', data); // Лог для отладки
        (0, showSeatMapPricingModal_1.showSeatMapPricingModal)(data); // Вызов функции показа модального окна c данными (data)
    }, []);
    return (React.createElement("div", { className: 'sdk-pricing-custom-tile-content' },
        React.createElement("p", null, "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C SeatMap Viewer...")));
};
exports.PricingView = PricingView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile", ["react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailTile = void 0;
var React = require("react");
var SeatMapAvailTile = function (data) {
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content', style: { padding: '10px' } },
        React.createElement("ol", null, data.flightSegments.map(function (segment, index) { return (React.createElement("li", { key: index },
            "Flight ",
            segment.MarketingAirline.FlightNumber)); })),
        React.createElement("button", { className: "abc-seatmap-button", style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 10px',
                backgroundColor: '#2f73bc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                height: '24px',
                marginBottom: '10px',
                marginLeft: '25px' // ✅ Добавлено смещение влево на 25px
            } }, "SeatMaps ABC 360")));
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView", ["react","react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapAvailModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailView = void 0;
var React = require("react");
var react_1 = require("react");
var showSeatMapAvailModal_1 = require("../showSeatMapAvailModal");
var SeatMapAvailView = function (data) {
    (0, react_1.useEffect)(function () {
        console.log('🚀 SeatMapAvailView data:', data); // лог в онсоль
        (0, showSeatMapAvailModal_1.showSeatMapAvailModal)(data); // вызываем функцию показа модального окна c данными (data)
    }, []);
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content' },
        React.createElement("p", null, "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C SeatMap Viewer...")));
};
exports.SeatMapAvailView = SeatMapAvailView;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile", ["sabre-ngv-app/app/widgets/drawer/views/elements/Tile","sabre-ngv-app/app/common/mixins/WithoutFocusOnClick","sabre-ngv-core/decorators/classes/Initial","sabre-ngv-core/decorators/classes/Mixin","sabre-ngv-core/decorators/classes/view/CssClass","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/extractSegmentData"], false, function (require, exports, module) {
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
var extractSegmentData_1 = require("../extractSegmentData");
var SeatMapShoppingTile = /** @class */ (function (_super) {
    __extends(SeatMapShoppingTile, _super);
    function SeatMapShoppingTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSegment = null;
        _this.sharedModel = null;
        return _this;
    }
    SeatMapShoppingTile.prototype.selfDrawerContextModelPropagated = function (cpa) {
        var _this = this;
        var _a, _b, _c;
        try {
            this.currentSegment = cpa;
            var segment = cpa;
            var sharedSegmentData = (0, extractSegmentData_1.extractSegmentData)(segment);
            // Сохраняем или повторно используем sharedModel
            if ((_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.sharedContextModel) === null || _b === void 0 ? void 0 : _b.set) {
                this.sharedModel = this.context.sharedContextModel;
                this.sharedModel.set('selectedSegmentForPricing', sharedSegmentData);
                console.log('✅ Сохранили сегмент в SharedContextModel:', sharedSegmentData);
            }
            else if ((_c = this.sharedModel) === null || _c === void 0 ? void 0 : _c.set) {
                this.sharedModel.set('selectedSegmentForPricing', sharedSegmentData);
                console.log('♻️ Повторно сохранили сегмент в SharedContextModel:', sharedSegmentData);
            }
            else {
                console.warn('⚠️ SharedContextModel недоступен — сегмент не сохранён.');
            }
            var segments = cpa.getShoppingItinerary().getFlightSegments();
            var label = segments.map(function (segment) {
                var origin = segment.getOriginIata();
                var destination = segment.getDestinationIata();
                var carrier = segment.getMarketingAirline();
                var flightNumber = segment.getFlightNumber();
                return origin + "-" + destination + ":" + carrier + " " + flightNumber;
            }).join(' ');
            var tileHtml = "\n                <div style=\"display: flex; flex-direction: column; align-items: center; font-size: 12px;\">\n                    <div style=\"margin-bottom: 8px;\">" + label + "</div>\n                    <button class=\"abc-seatmap-button\" style=\"\n                        padding: 0px 12px 12px 12px;\n                        background-color: #2f73bc;\n                        color: white;\n                        border: none;\n                        border-radius: 4px;\n                        cursor: pointer;\n                        font-size: 12px;\">\n                        SeatMaps ABC 360\n                    </button>\n                </div>\n            ";
            this.setDataContent(tileHtml);
            // Обработчик клика
            this.$el.off('click', '.abc-seatmap-button');
            this.$el.on('click', '.abc-seatmap-button', function () {
                console.log('🔁 Клик по кнопке — повторно инициируем View');
                _this.trigger('selfDrawerContextModelPropagated', _this.model); // ✅ нативно
            });
        }
        catch (error) {
            console.error('❌ Ошибка в selfDrawerContextModelPropagated:', error);
        }
    };
    SeatMapShoppingTile.prototype.selfSelectedFareChanged = function (cpa) {
        this.selfDrawerContextModelPropagated(cpa);
    };
    SeatMapShoppingTile = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-tilewidgets-web-module', { overwrite: false }),
        (0, Initial_1.Initial)({
            caption: 'SeatMaps ABC 360',
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
var ReactDOM = require("react-dom");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var SeatMapComponentShopping_1 = require("../SeatMapComponentShopping");
var quicketConfig_1 = require("../quicketConfig");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var Template_1 = require("sabre-ngv-core/decorators/classes/view/Template");
var SeatMapShoppingView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingView, _super);
    function SeatMapShoppingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSegment = null;
        _this.flightSegments = [];
        _this.selectedSegmentIndex = 0;
        return _this;
    }
    SeatMapShoppingView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);
        this.currentSegment = cpa;
        this.updateFlightSegmentsFromSegment(cpa);
        this.tryRenderReactComponent();
    };
    SeatMapShoppingView.prototype.updateFlightSegmentsFromSegment = function (segment) {
        var segments = segment.getShoppingItinerary().getFlightSegments();
        this.flightSegments = segments.map(function (s) {
            var departureDateTime = s.getDepartureDate();
            return {
                id: s.getSegmentId(),
                segmentId: s.getSegmentId(),
                flightNumber: s.getFlightNumber(),
                origin: s.getOriginIata(),
                destination: s.getDestinationIata(),
                airMiles: s.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN',
                marketingAirline: s.getMarketingAirline(),
                cabinClass: 'A' // Пример: при необходимости можно вытянуть реально
            };
        });
    };
    SeatMapShoppingView.prototype.tryRenderReactComponent = function (attempts) {
        var _this = this;
        if (attempts === void 0) { attempts = 0; }
        var MAX_ATTEMPTS = 10;
        var INTERVAL = 500;
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
        var _a;
        if (!this.currentSegment) {
            console.warn('⚠️ Нет сохранённого сегмента. React компонент не будет отрендерен.');
            return;
        }
        if (!((_a = this.flightSegments) === null || _a === void 0 ? void 0 : _a.length)) {
            console.warn('⚠️ flightSegments пуст. Переинициализация из текущего сегмента.');
            this.updateFlightSegmentsFromSegment(this.currentSegment);
        }
        var rootElement = document.getElementById('seatmap-root');
        if (rootElement) {
            ReactDOM.unmountComponentAtNode(rootElement);
            rootElement.innerHTML = '';
        }
        else {
            rootElement = document.createElement('div');
            rootElement.id = 'seatmap-root';
            document.body.appendChild(rootElement);
        }
        var data = {
            flightSegments: this.flightSegments,
            selectedSegmentIndex: this.selectedSegmentIndex
        };
        ReactDOM.render(React.createElement(SeatMapComponentShopping_1.default, { config: quicketConfig_1.quicketConfig, data: data }), rootElement);
        console.log('📌 [SeatMapShoppingView] React Component успешно отрендерен в #seatmap-root.');
    };
    SeatMapShoppingView = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-customworkflow-web-module'),
        (0, Template_1.Template)('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
    ], SeatMapShoppingView);
    return SeatMapShoppingView;
}(AbstractView_1.AbstractView));
exports.SeatMapShoppingView = SeatMapShoppingView;
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/DrawerService","sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView","sabre-ngv-pricing/services/IAirPricingService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView","sabre-ngv-xp/configs/NoviceButtonConfig","com-sabre-redapp-example3-web-customworkflow-web-module/views/SampleComponent","sabre-ngv-app/app/services/impl/InterstitialService","sabre-ngv-reservation/services/IReservationService","sabre-ngv-custom-forms/services/ICustomFormsService"], false, function (require, exports, module) {
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
var IAirPricingService_1 = require("sabre-ngv-pricing/services/IAirPricingService");
var PricingTile_1 = require("./components/abc-seatmap/widgets/PricingTile");
var PricingView_1 = require("./components/abc-seatmap/widgets/PricingView");
var NoviceButtonConfig_1 = require("sabre-ngv-xp/configs/NoviceButtonConfig");
var SampleComponent_1 = require("./views/SampleComponent");
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var IReservationService_1 = require("sabre-ngv-reservation/services/IReservationService");
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
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
        var onClick = function (isOpen) {
            console.log('Command Helper Button onClick', isOpen);
            // insert logic here
        };
        var onClose = function () {
            console.log('Command Helper Popover onClose');
            // insert logic here
        };
        var config = new NoviceButtonConfig_1.NoviceButtonConfig(
        // Define label for this button.
        'Sample button', 
        // On top of text we add an icon from Font Awesome.
        'fa-comment', 
        // Decorator is used to apply styles to the button that will be displayed in Command Helper Bar.
        'com-sabre-redapp-example3-web-command-helper-button-web-module', 
        // Base React class to be mounted as root in ReactDOM.render().
        SampleComponent_1.SampleComponent, 
        // Priority of the button determines button position in the Command Helper Bar.
        -1000, onClick, onClose);
        // Add button configuration to add a command helper button.
        (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('novice-buttons', config);
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
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Reservation', 'btn btn-secondary side-panel-button redapp-web-reservation', this.showReservation),
            selfRemoveBtn
        ]);
        (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('redAppSidePanel', config);
    };
    // AvailabilityTile
    Main.prototype.registerSeatMapAvailTile = function () {
        var airAvailabilityService = (0, Context_1.getService)(PublicAirAvailabilityService_1.PublicAirAvailabilityService); // внутренний сервис для предоставления данных в рамках Availability
        var showSeatMapAvailabilityModal = function (data) {
            console.log('📥 [Availability] Received Data:', JSON.stringify(data, null, 2));
            var modalOptions = {
                header: 'SeatMaps ABC 360',
                component: React.createElement(SeatMapAvailView_1.SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        airAvailabilityService.createAirAvailabilitySearchTile(SeatMapAvailTile_1.SeatMapAvailTile, showSeatMapAvailabilityModal, 'SeatMaps ABC 360');
    };
    // ShoppingTile 
    Main.prototype.registerSeatMapShoppingTile = function () {
        // определяем config shoppingDrawerConfig
        var shoppingDrawerConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(SeatMapShoppingTile_1.SeatMapShoppingTile, SeatMapShoppingView_1.SeatMapShoppingView, {
            title: 'Shopping Tile Widget' // заголовок окна
        });
        // вызвываем сервис с этим config shoppingDrawerConfig
        (0, Context_1.getService)(DrawerService_1.DrawerService).addConfig(['shopping-flight-segment'], shoppingDrawerConfig);
        // Pricing Tile
        var showPricingModal = this.createShowModalAction(PricingView_1.PricingView, 'Pricing Data');
        (0, Context_1.getService)(IAirPricingService_1.IAirPricingService).createPricingTile(PricingTile_1.PricingTile, showPricingModal, 'ABC Seat Map');
    };
    Main.prototype.createShowModalAction = function (view, header) {
        return (function (data) {
            console.log('📥 [Pricing] Received Data (Full Object):', Object.keys(data));
            console.log('📥 [Pricing] Full Data:', JSON.stringify(data, null, 2));
            var ngvModalOptions = {
                header: header,
                component: React.createElement(view, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(ngvModalOptions);
        });
    };
    // Reservaion Info Window
    Main.prototype.showReservation = function () {
        var interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
        interstitialService.showInterstitial(15000);
        var reservationPromise = (0, Context_1.getService)(IReservationService_1.IReservationService).getReservation();
        reservationPromise.then(function (reservation) {
            var form = {
                title: 'Reservation Data',
                fields: [
                    {
                        id: 'reservationData',
                        type: 'PARAGRAPH',
                        text: '```\n' +
                            JSON.stringify(reservation, null, 2) +
                            '\n```'
                    }
                ]
            };
            interstitialService.hideInterstitial();
            (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form);
        }).catch(function (error) {
            interstitialService.hideInterstitial();
            console.error('Error while receiving reservation', error);
        });
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/SampleComponent", ["react"], false, function (require, exports, module) {
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
exports.SampleComponent = void 0;
var React = require("react");
var SampleComponent = /** @class */ (function (_super) {
    __extends(SampleComponent, _super);
    function SampleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SampleComponent.prototype.render = function () {
        return (React.createElement("div", { className: 'com-sabre-redapp-example3-web-command-helper-button-web-module' },
            React.createElement("div", { className: 'sample-component' }, "Hello World!!!")));
    };
    return SampleComponent;
}(React.Component));
exports.SampleComponent = SampleComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/views/SampleComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/views/SampleComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/views/SampleComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module", ["com-sabre-redapp-example3-web-customworkflow-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZXh0cmFjdFNlZ21lbnREYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9nZXRGbGlnaHRGcm9tU2FicmVEYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9xdWlja2V0Q29uZmlnLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRBdmFpbC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRQcmljaW5nLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudFNob3BwaW5nLnRzeCIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdEcmF3ZXJWaWV3LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBTaG9wcGluZ1ZpZXcuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwQXZhaWxNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWxGb3JTZWdtZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcFByaWNpbmdNb2RhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3RyYW5zZm9ybUZsaWdodC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVGlsZS50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1ZpZXcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1RpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVmlldy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hY3Rpb25zLmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsRXh0ZXJuYWxTZXJ2aWNlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsTGFzTGF4LnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5LnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBDb21wb25lbnQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dCYW5uZXJzLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QnV0dG9uQWN0aW9uLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93UnVudGltZS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9zaG93U2VhdE1hcE1vZGFsLmpzIiwic3JjL2NvZGUvQ29udGV4dC50cyIsInNyYy9jb2RlL2luZGV4LnRzIiwic3JjL2NvZGUvaW50ZXJmYWNlcy9TdG9yZURhdGEudHMiLCJzcmMvY29kZS9NYWluLnRzIiwic3JjL2NvZGUvcmVkdWNlcnMvTG9jYWxTdG9yZS50cyIsInNyYy9jb2RlL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZS50cyIsInNyYy9jb2RlL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS91dGlscy90cmFuc2Zvcm1GbGlnaHQuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVGlsZS5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdmlld3MvYXZhaWwvc2VhdG1hcC9TZWF0TWFwQXZhaWxWaWV3LmpzIiwic3JjL2NvZGUvdmlld3MvU2FtcGxlQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBZ0Isa0JBQWtCLENBQUMsT0FBc0I7SUFDckQsT0FBTztRQUNILFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQ3BDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRTtRQUN4RCxhQUFhLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1FBQzVDLEdBQUcsRUFBRSxPQUFPLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxLQUFLO1FBQy9DLE1BQU0sRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFO1FBQy9CLFdBQVcsRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUU7UUFDekMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QyxjQUFjLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFoQixDQUFnQixDQUFDO1FBQzdFLFVBQVUsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFO0tBQy9CLENBQUM7QUFDTixDQUFDO0FBWkQsZ0RBWUM7Ozs7Ozs7OztBQ2RNLElBQU0sc0JBQXNCLEdBQUcsVUFBQyxJQUFTLEVBQUUsWUFBd0I7O0lBQXhCLDZCQUFBLEVBQUEsZ0JBQXdCO0lBQ3hFLElBQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUcsWUFBWSxDQUFDLENBQUM7SUFFcEQsSUFBSSxD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QkFBVSxFQUFDLHlDQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQWxCWSxRQUFBLHVCQUF1QiwyQkFrQm5DOzs7Ozs7QUN0QkQ7QUFDQTtBQUNBOzs7O0FDRkE7QUFDQTtBQUNBOzs7O0FDRkE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkEsNkJBQStCO0FBRS9CO0lBQXFDLG1DQUFzQztJQUEzRTs7SUFXQSxDQUFDO0lBVEcsZ0NBQU0sR0FBTjtRQUNJLE9BQU8sQ0FDSCw2QkFBSyxTQUFTLEVBQUMsZ0VBQWdFO1lBQzNFLDZCQUFLLFNBQVMsRUFBQyxrQkFBa0IscUJBRTNCLENBQ0osQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FYQSxBQVdDLENBWG9DLEtBQUssQ0FBQyxTQUFTLEdBV25EO0FBWFksMENBQWUiLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTZWdtZW50RGF0YShzZWdtZW50OiBGbGlnaHRTZWdtZW50KTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmxpZ2h0TnVtYmVyOiBzZWdtZW50LmdldFNlZ21lbnRJZCgpLFxuICAgICAgICBtYXJrZXRpbmdDYXJyaWVyOiBzZWdtZW50LmdldE1hcmtldGluZ09wZXJhdGluZ0FpcmxpbmUoKSxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogc2VnbWVudC5nZXRSYXdEZXBhcnR1cmVEYXRlKCksXG4gICAgICAgIHJiZDogc2VnbWVudC5nZXRTZWxlY3RlZEJvb2tpbmdDbGFzcygpIHx8ICdOL0EnLFxuICAgICAgICBvcmlnaW46IHNlZ21lbnQuZ2V0T3JpZ2luSWF0YSgpLFxuICAgICAgICBkZXN0aW5hdGlvbjogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKSxcbiAgICAgICAgZXF1aXBtZW50Q29kZTogc2VnbWVudC5nZXRFcXVpcG1lbnRDb2RlKCksXG4gICAgICAgIGVxdWlwbWVudENvZGVzOiBzZWdtZW50LmdldEVxdWlwbWVudENvZGVzKCkubWFwKGNvZGVJbmZvID0+IFN0cmluZyhjb2RlSW5mbykpLFxuICAgICAgICBzZWdtZW50UnBoOiBzZWdtZW50LmdldFJwaCgpXG4gICAgfTtcbn0iLCJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coJz3MIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSAfPjs9SzUgNDA9PUs1IEE1Mzw1PUIwOicsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQsIG51bGwsIDIpKTtcblxuICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuRGVwYXJ0dXJlRGF0ZVRpbWU7XG5cbiAgaWYgKCFkZXBhcnR1cmVEYXRlVGltZSkge1xuICAgIGNvbnNvbGUud2FybignoA8gW2dldEZsaWdodEZyb21TYWJyZURhdGFdIERlcGFydHVyZURhdGVUaW1lID5CQUNCQUIyQzVCIDIgNDA9PUtFIEE1Mzw1PUIwIScpO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1VOS05PV04nLFxuICAgICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlciB8fCAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLFxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnQSdcbiAgfTtcbn07IiwiZXhwb3J0IGNvbnN0IHF1aWNrZXRDb25maWcgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBsYW5nOiAnRU4nLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICB2aXNpYmxlRnVzZWxhZ2U6IHRydWUsXG4gICAgdmlzaWJsZVdpbmdzOiB0cnVlLFxuICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgc2luZ2xlRGVja01vZGU6IHRydWUsXG4gICAgYnVpbHRJblRvb2x0aXA6IHRydWUsXG4gICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICB0b29sdGlwT25Ib3ZlcjogZmFsc2UsXG4gICAgY29sb3JUaGVtZToge1xuICAgICAgICBzZWF0TGFiZWxDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgc2VhdFN0cm9rZUNvbG9yOiAnZ3JheSdcbiAgICB9XG59OyIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zOEBDNTwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQTUzPDU9QiA/Pjs1QjAgYyA0MEI+OVxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHQpO1xuICBcbiAgLy8gZmxpZ2h0IDQ7TyA/QD4yNUA6OFxuICAvLyBmbGlnaHQ6e1xuICAvLyAgIGlkOiAnMDAxJywgXG4gIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJywgXG4gIC8vICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAvLyAgICAgYXJyaXZhbDogJ0ZSQScsXG4gIC8vICAgICBjYWJpbkNsYXNzOiAnQSdcbiAgLy8gfSxcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG5cbiAgICAgIC8vIEAwQTo+PDw1PUI4QD4yMEJMID9AOCA9NT4xRT40ODw+QUI4XG4gICAgICAvLyBhdmFpbGFiaWxpdHk6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmF2YWlsYWJpbGl0eSksXG4gICAgICAvLyBwYXNzZW5nZXJzOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5wYXNzZW5nZXJzKVxuXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWUgd2l0aCBkYXRhOicsIHtcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gIH07XG5cbiAgY29uc29sZS5sb2coJz7gIFNlYXRNYXBDb21wb25lbnQgaXMgcmVuZGVyaW5nIScpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz3gDyBTZWF0TWFwQ29tcG9uZW50IG1vdW50ZWQnKTtcbiAgICBjb25zb2xlLmxvZyhgPQQgU2VnbWVudCBpbmRleCBjaGFuZ2VkOiAke3NlZ21lbnRJbmRleH1gKTtcbiAgICBzZW5kVG9JZnJhbWUoKTsgLy8gPkI/QDAyOjAgP0A4IDg3PDU9NT04OCBBNTM8NT1CMFxuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qID46PT4gQSA0MD09Szw4ID4gQDU5QTUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGZsaWdodCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzogUmVhY3QuRkM8U2VhdE1hcFByb3BzPiA9ICh7IGNvbmZpZywgZGF0YSB9KSA9PiB7XG4gIGNvbnN0IFtzZWdtZW50SW5kZXgsIHNldFNlZ21lbnRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgaWZyYW1lUmVmID0gdXNlUmVmPEhUTUxJRnJhbWVFbGVtZW50PihudWxsKTtcblxuICAvLyA9DSAbPjM4QEM1PCAyRT40T0k4NSA0MD09SzVcbiAgLy8gY29uc29sZS5sb2coJz05IFtTZWF0TWFwQ29tcG9uZW50XSByZWNlaXZlZCBwcm9wczonLCB7IGNvbmZpZywgZGF0YSB9KTtcbiAgXG4gIGNvbnNvbGUubG9nKCc95SBbU2VhdE1hcENvbXBvbmVudF0gSW5jb21pbmcgZGF0YTonLCBkYXRhKTtcblxuLy8gHz47Q0cwNTwgQjU6Q0k4OSBBNTM8NT1CXG5jb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5jb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHRTZWdtZW50cyk7XG4gIFxuICAvLyBmbGlnaHQgNDtPID9APjI1QDo4XG4gIC8vIGZsaWdodDp7XG4gIC8vICAgaWQ6ICcwMDEnLCBcbiAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLCBcbiAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gIC8vICAgICBhcnJpdmFsOiAnRlJBJyxcbiAgLy8gICAgIGNhYmluQ2xhc3M6ICdBJ1xuICAvLyB9LFxuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQ6IHtcbiAgICAgICAgaWQ6ICcwMDEnLCAgLy8gIzE1NDhBTCwgR0I+ID81QDU0MDVCQU8gaWRcbiAgICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogY3VycmVudFNlZ21lbnQuZGVwYXJ0dXJlRGF0ZVRpbWUgfHwgJzIwMjUtMDQtMjInLFxuICAgICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICAgIGNhYmluQ2xhc3M6IGN1cnJlbnRTZWdtZW50LmNhYmluQ2xhc3MgfHwgJ0EnXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA8PjY9PiBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55OyAvLyAUMD09SzUsIDo+Qj5ASzUgP0A4RT40T0IgODcgU2hvcHBpbmcgQUY1PTBAOE9cbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4vLyAfPjtDRzA1PCBCNTpDSTg5IEE1Mzw1PUJcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuICBjb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB8+O0NHNT09SzUgNDA9PUs1OicsIGRhdGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQ6IHtcblxuICAgICAgICBpZDogJzAwMScsICAvLyAjMTU0OEFMLCBHQj4gPzVANTQwNUJBTyBpZFxuICAgICAgICBhaXJsaW5lQ29kZTogY3VycmVudFNlZ21lbnQubWFya2V0aW5nQWlybGluZSB8fCAnTEgnLFxuICAgICAgICBmbGlnaHRObzogY3VycmVudFNlZ21lbnQuZmxpZ2h0TnVtYmVyIHx8ICcxMjMnLFxuICAgICAgICBkZXBhcnR1cmVEYXRlOiBjdXJyZW50U2VnbWVudC5kZXBhcnR1cmVEYXRlVGltZSB8fCAnMjAyNS0wNC0yMicsXG4gICAgICAgIGRlcGFydHVyZTogY3VycmVudFNlZ21lbnQub3JpZ2luIHx8ICdNVUMnLFxuICAgICAgICBhcnJpdmFsOiBjdXJyZW50U2VnbWVudC5kZXN0aW5hdGlvbiB8fCAnRlJBJyxcbiAgICAgICAgY2FiaW5DbGFzczogY3VycmVudFNlZ21lbnQuY2FiaW5DbGFzcyB8fCAnQSdcblxuICAgICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH07XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddICFEPkA8OEA+MjA9PUs1IDQwPT1LNSA0O08gPkI/QDAyOjg6Jywgc2VhdE1hcERhdGEpO1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgODs4IGNvbnRlbnRXaW5kb3cgPTUgND5BQkM/NT0uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudFNob3BwaW5nXSAeQj9AMDI6MCA0MD09S0UgMiBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNlbmRUb0lmcmFtZSgpO1xuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiBGbGlnaHQgSW5mbyBTZWN0aW9uICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fT5cbiAgICAgICAgICAgICAge3NlZ21lbnQubWFya2V0aW5nQWlybGluZSB8fCAnWFgnfSB7c2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzAwMCd9OiB7c2VnbWVudC5vcmlnaW59IJIge3NlZ21lbnQuZGVzdGluYXRpb259XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17c2VuZFRvSWZyYW1lfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZzsiLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRBdmFpbCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG4vLyBkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIFxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBBdmFpbE1vZGFsKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwcyBBQkMgMzYwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudEF2YWlsLCB7XG4gICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICBkYXRhIC8vID81QDU0MFE8IGRhdGEgLSA+MUo1OkIgQjg/MCBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICBcbn0iLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuXG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFByaWNpbmcgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50UHJpY2luZyc7XG5cbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuaW1wb3J0IHsgQWlyUHJpY2luZ0RhdGEgfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcblxuLy8gZGF0YTogQWlyUHJpY2luZ0RhdGFcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwUHJpY2luZ01vZGFsKGRhdGE6IEFpclByaWNpbmdEYXRhKTogdm9pZCB7XG5cbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyOiAnU2VhdE1hcCBWaWV3ZXInLFxuICAgIC8vIEE+NzQwNTwgUmVhY3QtOj48Pz49NT1CID0wID5BPT4yNSBTZWF0TWFwQ29tcG9uZW50XG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnRQcmljaW5nLCB7XG4gICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICBkYXRhIC8vID81QDU0MFE8IGRhdGEgLSA+MUo1OkIgQjg/MCBBaXJQcmljaW5nRGF0YSBGNTs4Oj48XG4gICAgfSksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50QXZhaWwnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5cbi8vIGRhdGE6IFNlYXRNYXBTaG9wcGluZ0RhdGFcblxuaW50ZXJmYWNlIFNlYXRNYXBTaG9wcGluZ0RhdGEge1xuICAgIGZsaWdodFNlZ21lbnRzOiBhbnlbXTsgIC8vIBw+Nj0+IDcwPDU9OEJMID0wIDo+PTpANUI9SzkgQjg/LCA1QTs4IDg3MjVBQjU9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcFNob3BwaW5nTW9kYWwoZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YSk6IHZvaWQge1xuXG4gICAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgICBpZiAoIW1vZGFsU2VydmljZSB8fCB0eXBlb2YgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gUHVibGljTW9kYWxzU2VydmljZSBub3QgYXZhaWxhYmxlIG9yIG5vdCBjb25maWd1cmVkIHByb3Blcmx5LicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgIC8vID3MIBcwOkBLQkwgMkE1ID9ANTRLNENJODUgPD40MDtMPUs1ID46PTAgPzVANTQgPkI6QEtCODU8ID0+Mj4zPlxuICAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBBbGwgcHJldmlvdXMgbW9kYWxzIGNsb3NlZC4nKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEVycm9yIGhpZGluZyBtb2RhbHM6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIC8vIEQ+QDw4QEM1PCBvcHRpb25zIDQ7TyA/NUA1NDBHOCAyIDw+NDA7TD0+NSA+Oj0+XG4gICAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ1NlYXRNYXBzIEFCQyAzNjAgVmlld2VyJyxcbiAgICAgICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSksXG4gICAgICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIFNob3BwaW5nIE1vZGFsXSBDbG9zZWQnKVxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPcwgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gTW9kYWwgZGF0YTonLCBkYXRhKTtcblxuICAgIC8vIB9APjI1QDowID0wIDQ+QUJDPz0+QUJMIDw1Qj40MCBgc2hvd1JlYWN0TW9kYWxgXG4gICAgdHJ5IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEVycm9yIHNob3dpbmcgbW9kYWw6JywgZXJyb3IpO1xuICAgIH1cblxufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtBaXJQcmljaW5nRGF0YX0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvcmVzcG9uc2UvaW50ZXJmYWNlcy9BaXJQcmljaW5nRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBQcmljaW5nVGlsZSA9IChkYXRhOiBBaXJQcmljaW5nRGF0YSkgOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2RrLXByaWNpbmctY3VzdG9tLXRpbGUtY29udGVudFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBwYWRkaW5nOiAnMTBweCcgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5BQkMgU2VhdCBNYXA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJjLXNlYXRtYXAtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNzNiYycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCdcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNlYXRNYXBzIEFCQyAzNjBcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWlyUHJpY2luZ0RhdGEgfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwUHJpY2luZ01vZGFsIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcFByaWNpbmdNb2RhbCc7XG5cbi8vIFRPRE8gOj5AQDU6Qj1LOSAySzE+QCBBNTM8NT1CMFxuXG5leHBvcnQgY29uc3QgUHJpY2luZ1ZpZXcgPSAoZGF0YTogQWlyUHJpY2luZ0RhdGEpIDogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPYAgUHJpY2luZ1ZpZXcgZGF0YTonLCBkYXRhKTsgLy8gGz4zIDQ7TyA+QjswNDo4XG4gICAgICAgIHNob3dTZWF0TWFwUHJpY2luZ01vZGFsKGRhdGEpOyAvLyASSzc+MiBEQz06Rjg4ID8+OjA3MCA8PjQwO0w9PjM+ID46PTAgYyA0MD09Szw4IChkYXRhKVxuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXByaWNpbmctY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICAgICAgPHA+HkI6QEsyMDU8IFNlYXRNYXAgVmlld2VyLi4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICAgICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30gc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnIH19PiBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPG9sPlxuICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICA8L2xpPiAgXG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L29sPlxuXG4gICAgICAgICAgICB7LyogFD4xMDI7NT0wIDo9Pj86MCovfVxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYmMtc2VhdG1hcC1idXR0b25cIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNzNiYycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI0cHgnLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogJzI1cHgnIC8vIAUgFD4xMDI7NT0+IEE8NUk1PTg1IDI7NTI+ID0wIDI1cHhcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNlYXRNYXBzIEFCQyAzNjBcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBcblxuLy8gaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG4vLyBpbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQ29udGV4dCc7XG4vLyBpbXBvcnQge0lTZWF0TWFwU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXNlYXRtYXAvc2VydmljZXMvSVNlYXRNYXBTZXJ2aWNlJztcblxuLy8gZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4vLyAgICAgY29uc3QgaGFuZGxlT3BlblNlYXRNYXAgPSBhc3luYyAoZmxpZ2h0U2VnbWVudE51bWJlcjogbnVtYmVyKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGA96yBPcGVuaW5nIFNlYXQgTWFwIGZvciBzZWdtZW50OiAke2ZsaWdodFNlZ21lbnROdW1iZXJ9YCk7XG4gICAgXG4vLyAgICAgICAgIHRyeSB7XG4vLyAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFNlcnZpY2UoSVNlYXRNYXBTZXJ2aWNlKS5vcGVuU2VhdE1hcEZvckZsaWdodFNlZ21lbnQoZmxpZ2h0U2VnbWVudE51bWJlcik7XG4gICAgXG4vLyAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm1vZGFsT3BlbmVkQ29ycmVjdGx5KSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgoA8gRXJyb3Igb3BlbmluZyBTZWF0IE1hcDogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9YCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBMIEZhaWxlZCB0byBvcGVuIFNlYXQgTWFwOmAsIGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH07XG5cbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbi8vICAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4vLyAgICAgICAgICAgICA8b2w+XG4vLyAgICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuLy8gICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5TZWF0TWFwKGluZGV4ICsgMSl9Pj6RIE9wZW4gU2VhdCBNYXA8L2J1dHRvbj5cbi8vICAgICAgICAgICAgICAgICAgICAgPC9saT5cbi8vICAgICAgICAgICAgICAgICApKX1cbi8vICAgICAgICAgICAgIDwvb2w+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICk7XG4vLyB9O1xuXG5cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBBdmFpbE1vZGFsIH0gZnJvbSAnLi4vc2hvd1NlYXRNYXBBdmFpbE1vZGFsJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFZpZXcgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCc9gCBTZWF0TWFwQXZhaWxWaWV3IGRhdGE6JywgZGF0YSk7IC8vIDs+MyAyID49QT47TFxuICAgICAgc2hvd1NlYXRNYXBBdmFpbE1vZGFsKGRhdGEpOyAvLyAySzdLMjA1PCBEQz06RjhOID8+OjA3MCA8PjQwO0w9PjM+ID46PTAgYyA0MD09Szw4IChkYXRhKVxuICAgIH0sIFtdKTtcbiAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9OyIsImltcG9ydCB7IFRpbGUgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlJztcbmltcG9ydCB7IFRpbGVPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZU9wdGlvbnMnO1xuaW1wb3J0IHsgRmxpZ2h0U2VnbWVudCB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7IFdpdGhvdXRGb2N1c09uQ2xpY2sgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vbWl4aW5zL1dpdGhvdXRGb2N1c09uQ2xpY2snO1xuaW1wb3J0IHsgSW5pdGlhbCB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9Jbml0aWFsJztcbmltcG9ydCB7IE1peGluIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL01peGluJztcbmltcG9ydCB7IENzc0NsYXNzIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvQ3NzQ2xhc3MnO1xuaW1wb3J0IHsgZXh0cmFjdFNlZ21lbnREYXRhIH0gZnJvbSAnLi4vZXh0cmFjdFNlZ21lbnREYXRhJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlJywgeyBvdmVyd3JpdGU6IGZhbHNlIH0pXG5ASW5pdGlhbDxUaWxlT3B0aW9ucz4oe1xuICAgIGNhcHRpb246ICdTZWF0TWFwcyBBQkMgMzYwJyxcbiAgICBjbGFzc05hbWU6ICd3ZWItYWlyLXNob3BwaW5nLXdpZGdldC1zYW1wbGUnXG59KVxuQE1peGluKFdpdGhvdXRGb2N1c09uQ2xpY2spXG5leHBvcnQgY2xhc3MgU2VhdE1hcFNob3BwaW5nVGlsZSBleHRlbmRzIFRpbGU8RmxpZ2h0U2VnbWVudD4gaW1wbGVtZW50cyBXaXRob3V0Rm9jdXNPbkNsaWNrIHtcbiAgICBkZWNsYXJlIGNvbnRleHQ6IGFueTtcblxuICAgIHByaXZhdGUgY3VycmVudFNlZ21lbnQ6IEZsaWdodFNlZ21lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHNoYXJlZE1vZGVsOiBhbnkgPSBudWxsO1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWdtZW50ID0gY3BhO1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGNwYTtcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlZFNlZ21lbnREYXRhID0gZXh0cmFjdFNlZ21lbnREYXRhKHNlZ21lbnQpO1xuXG4gICAgICAgICAgICAvLyAhPkVAMD1PNTwgODs4ID8+MkI+QD0+IDhBPz47TDdDNTwgc2hhcmVkTW9kZWxcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQ/LnNoYXJlZENvbnRleHRNb2RlbD8uc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbCA9IHRoaXMuY29udGV4dC5zaGFyZWRDb250ZXh0TW9kZWw7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC5zZXQoJ3NlbGVjdGVkU2VnbWVudEZvclByaWNpbmcnLCBzaGFyZWRTZWdtZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJwUgIT5FQDA9ODs4IEE1Mzw1PUIgMiBTaGFyZWRDb250ZXh0TW9kZWw6Jywgc2hhcmVkU2VnbWVudERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXJlZE1vZGVsPy5zZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLnNldCgnc2VsZWN0ZWRTZWdtZW50Rm9yUHJpY2luZycsIHNoYXJlZFNlZ21lbnREYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnew8gHz4yQj5APT4gQT5FQDA9ODs4IEE1Mzw1PUIgMiBTaGFyZWRDb250ZXh0TW9kZWw6Jywgc2hhcmVkU2VnbWVudERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ6APIFNoYXJlZENvbnRleHRNb2RlbCA9NTQ+QUJDPzU9IBQgQTUzPDU9QiA9NSBBPkVAMD1RPS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpO1xuXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHNlZ21lbnRzLm1hcChzZWdtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBzZWdtZW50LmdldE9yaWdpbklhdGEoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHNlZ21lbnQuZ2V0RGVzdGluYXRpb25JYXRhKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FycmllciA9IHNlZ21lbnQuZ2V0TWFya2V0aW5nQWlybGluZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZsaWdodE51bWJlciA9IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke29yaWdpbn0tJHtkZXN0aW5hdGlvbn06JHtjYXJyaWVyfSAke2ZsaWdodE51bWJlcn1gO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuXG4gICAgICAgICAgICBjb25zdCB0aWxlSHRtbCA9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogOHB4O1wiPiR7bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhYmMtc2VhdG1hcC1idXR0b25cIiBzdHlsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMHB4IDEycHggMTJweCAxMnB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJmNzNiYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlYXRNYXBzIEFCQyAzNjBcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICB0aGlzLnNldERhdGFDb250ZW50KHRpbGVIdG1sKTtcblxuICAgICAgICAgICAgLy8gHjFAMDE+Qkc4OiA6Ozg6MFxuICAgICAgICAgICAgdGhpcy4kZWwub2ZmKCdjbGljaycsICcuYWJjLXNlYXRtYXAtYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignY2xpY2snLCAnLmFiYy1zZWF0bWFwLWJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPQEgGjs4OiA/PiA6PT4/OjUgFCA/PjJCPkA9PiA4PThGODhAQzU8IFZpZXcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3NlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkJywgdGhpcy5tb2RlbCk7IC8vIAUgPTBCODI9PlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgHkg4MTowIDIgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZlNlbGVjdGVkRmFyZUNoYW5nZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhKTtcbiAgICB9XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZyBmcm9tICcuLi9TZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4uL3F1aWNrZXRDb25maWcnO1xuaW1wb3J0IHsgQ3NzQ2xhc3MgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L1RlbXBsYXRlJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJylcbkBUZW1wbGF0ZSgnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZTpTaG9wcGluZ1RpbGVWaWV3JylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3PEFic3RyYWN0TW9kZWw+IHtcbiAgICBwcml2YXRlIGN1cnJlbnRTZWdtZW50OiBGbGlnaHRTZWdtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBmbGlnaHRTZWdtZW50czogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkU2VnbWVudEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQgY2FsbGVkIHdpdGggY3BhOicsIGNwYSk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50U2VnbWVudCA9IGNwYTtcbiAgICAgICAgdGhpcy51cGRhdGVGbGlnaHRTZWdtZW50c0Zyb21TZWdtZW50KGNwYSk7XG4gICAgICAgIHRoaXMudHJ5UmVuZGVyUmVhY3RDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQoc2VnbWVudDogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnQuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpO1xuXG4gICAgICAgIHRoaXMuZmxpZ2h0U2VnbWVudHMgPSBzZWdtZW50cy5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHMuZ2V0RGVwYXJ0dXJlRGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogcy5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50SWQ6IHMuZ2V0U2VnbWVudElkKCksXG4gICAgICAgICAgICAgICAgZmxpZ2h0TnVtYmVyOiBzLmdldEZsaWdodE51bWJlcigpLFxuICAgICAgICAgICAgICAgIG9yaWdpbjogcy5nZXRPcmlnaW5JYXRhKCksXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb246IHMuZ2V0RGVzdGluYXRpb25JYXRhKCksXG4gICAgICAgICAgICAgICAgYWlyTWlsZXM6IHMuZ2V0QWlyTWlsZXMoKSxcbiAgICAgICAgICAgICAgICBkZXBhcnR1cmVEYXRlVGltZTogZGVwYXJ0dXJlRGF0ZVRpbWUgPyBkZXBhcnR1cmVEYXRlVGltZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnVU5LTk9XTicsXG4gICAgICAgICAgICAgICAgbWFya2V0aW5nQWlybGluZTogcy5nZXRNYXJrZXRpbmdBaXJsaW5lKCksXG4gICAgICAgICAgICAgICAgY2FiaW5DbGFzczogJ0EnIC8vIB9AODw1QDogP0A4ID01PjFFPjQ4PD5BQjggPD42PT4gMktCTz1DQkwgQDUwO0w9PlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5UmVuZGVyUmVhY3RDb21wb25lbnQoYXR0ZW1wdHMgPSAwKSB7XG4gICAgICAgIGNvbnN0IE1BWF9BVFRFTVBUUyA9IDEwO1xuICAgICAgICBjb25zdCBJTlRFUlZBTCA9IDUwMDtcbiAgICAgICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhdG1hcC1yb290Jyk7XG5cbiAgICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnBSBbU2VhdE1hcFNob3BwaW5nVmlld10gLTs1PDU9QiBzZWF0bWFwLXJvb3QgPTA5NDU9LiAdMEc4PTA1PCBANT00NUA4PTMgUmVhY3QgOj48Pz49NT1CMC4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVhY3RDb21wb25lbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRlbXB0cyA8IE1BWF9BVFRFTVBUUykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGCgDyBbU2VhdE1hcFNob3BwaW5nVmlld10gLTs1PDU9QiBzZWF0bWFwLXJvb3QgPTUgPTA5NDU9LiAfPjJCPkA9ME8gPz4/S0I6MCBHNUA1NyAke0lOVEVSVkFMfSA8QS4gHz4/S0I6MCAke2F0dGVtcHRzICsgMX0vJHtNQVhfQVRURU1QVFN9YCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJ5UmVuZGVyUmVhY3RDb21wb25lbnQoYXR0ZW1wdHMgKyAxKSwgSU5URVJWQUwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTCBbU2VhdE1hcFNob3BwaW5nVmlld10gHTUgQzQwOz5BTCA9MDlCOCBNOzU8NT1CIHNlYXRtYXAtcm9vdCA/PkE7NSA8MDpBODwwO0w9PjM+IEc4QTswID8+P0tCPjouJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJSZWFjdENvbXBvbmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRTZWdtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ6APIB01QiBBPkVAMD1RPT0+Mz4gQTUzPDU9QjAuIFJlYWN0IDo+PD8+PTU9QiA9NSAxQzQ1QiA+QkA1PTQ1QDU9LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmZsaWdodFNlZ21lbnRzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gZmxpZ2h0U2VnbWVudHMgP0NBQi4gHzVANTg9OEY4MDs4NzBGOE8gODcgQjU6Q0k1Mz4gQTUzPDU9QjAuJyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQodGhpcy5jdXJyZW50U2VnbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhdG1hcC1yb290Jyk7XG5cbiAgICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHJvb3RFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHJvb3RFbGVtZW50LmlkID0gJ3NlYXRtYXAtcm9vdCc7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBmbGlnaHRTZWdtZW50czogdGhpcy5mbGlnaHRTZWdtZW50cyxcbiAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4XG4gICAgICAgIH07XG5cbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcsIHsgY29uZmlnOiBxdWlja2V0Q29uZmlnLCBkYXRhIH0pLFxuICAgICAgICAgICAgcm9vdEVsZW1lbnRcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIFJlYWN0IENvbXBvbmVudCBDQT81SD0+ID5CQDU9NDVANT0gMiAjc2VhdG1hcC1yb290LicpO1xuICAgIH1cbn1cblxuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIEhhcmRjb2RlZCBmbGlnaHQgZGF0YTonLCBmbGlnaHREYXRhKTtcbiAgICAgICAgLy8gdGhpcy5mbGlnaHRTZWdtZW50cyA9IFtmbGlnaHREYXRhXTtcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZFNlZ21lbnRJbmRleCA9IDA7IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1B1YmxpY01vZGFsc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7UmVhY3RNb2RhbE9wdGlvbnN9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7RXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcic7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHthY3Rpb25zfSBmcm9tICcuL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvYWN0aW9ucyc7XG5pbXBvcnQge01vZGFsQ29tcG9uZW50fSBmcm9tICcuL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvTW9kYWxDb21wb25lbnQnO1xuaW1wb3J0IHtMb2NhbFN0b3JlfSBmcm9tICcuLi9yZWR1Y2Vycy9Mb2NhbFN0b3JlJztcblxuY29uc3QgbW9kYWxTZXJ2aWNlOiBQdWJsaWNNb2RhbHNTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTtcblxuZXhwb3J0IGNvbnN0IGNhbGxFeHRlcm5hbFNlcnZpY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgbG9jYWxTdG9yZSA9IG5ldyBMb2NhbFN0b3JlKCk7XG5cbiAgICBjb25zdCBvblN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RvcmVEYXRhID0gbG9jYWxTdG9yZS5nZXREYXRhKCk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gSlNPTi5wYXJzZShzdG9yZURhdGEuaGVhZGVycyk7XG5cbiAgICAgICAgZ2V0U2VydmljZShFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3IpLmNhbGxTZXJ2aWNlKHN0b3JlRGF0YS51cmwsIHN0b3JlRGF0YS5tZXRob2QsIHN0b3JlRGF0YS5ib2R5LCBoZWFkZXJzKS5kb25lKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlT2JqZWN0ID0gSlNPTi5wYXJzZShyZXNwb25zZSBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZU9iamVjdCwgbnVsbCwgMik7XG4gICAgICAgICAgICBsb2NhbFN0b3JlLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAncmVzcG9uc2UnLCBuZXdWYWw6IHJlc3BvbnNlU3RyaW5nfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZ3ZNb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICdFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxDb21wb25lbnQpLFxuICAgICAgICBvblN1Ym1pdDogb25TdWJtaXQsXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnMob25DbG9zZSwgb25TdWJtaXQpLFxuICAgICAgICBzdG9yZTogbG9jYWxTdG9yZS5zdG9yZVxuICAgIH1cblxuICAgIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChuZ3ZNb2RhbE9wdGlvbnMpO1xufTsiLCJpbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5pbXBvcnQge2NmLCBnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNhbGxMYXNMYXggPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoNTAwMCk7XG5cbiAgICBjZignMUxBU0xBWCcpLnNlbmQoKS5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcblxuICAgICAgICBjb25zdCBoYXNTaWduSW5SZXNwb25zZSA9IHJlc3BvbnNlLmdldERhdGFTdHJ1Y3RzKClcbiAgICAgICAgICAgIC5maWx0ZXIoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddICYmIGRhdGFbJ2QuU2NyZWVuJ11bJ2QuVGV4dCddKVxuICAgICAgICAgICAgLm1hcChkYXRhID0+IGRhdGFbJ2QuU2NyZWVuJ11bJ2QuVGV4dCddKVxuICAgICAgICAgICAgLnNvbWUoZGF0YSA9PiBkYXRhLmluY2x1ZGVzKCdTSUdOIElOJykpO1xuXG4gICAgICAgIGlmIChoYXNTaWduSW5SZXNwb25zZSkge1xuICAgICAgICAgICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0Vycm9yJywgJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgICAgICB9XG4gICAgfSk7XG59IiwiaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RHJvcGRvd25GaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL0Ryb3Bkb3duRmllbGQnO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LW5vdGlmaWNhdGlvbi9zZXJ2aWNlL0lOb3RpZmljYXRpb25TZXJ2aWNlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uVHlwZX0gZnJvbSAnc2FicmUtbmd2LW5vdGlmaWNhdGlvbi9pbnRlcmZhY2VzL05vdGlmaWNhdGlvblR5cGUnO1xuXG5jb25zdCBub3RpZmljYXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ05vdGlmaWNhdGlvbicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGl0bGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NvbnRlbnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdEUk9QRE9XTicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdOb25lJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdJbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdXYXJuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdeKC0/WzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGltZW91dCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUaW1lb3V0IGluIG1zJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXihbMS05XVswLTldKnwwKSQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBDdXN0b21Gb3JtUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xuXG4gICAgaWYgKHJlc3VsdC5hY3Rpb24gPT09ICdvaycpIHtcbiAgICAgICAgc2hvd05vdGlmaWNhdGlvbihyZXN1bHQpO1xuICAgIH1cbn1cblxuY29uc3Qgc2hvd05vdGlmaWNhdGlvbiA9IChmb3JtOiBDdXN0b21Gb3JtKTogdm9pZCA9PiB7XG4gICAgY29uc3QgdHlwZSA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndHlwZScpIGFzIERyb3Bkb3duRmllbGQpLnZhbHVlO1xuXG4gICAgY29uc3QgaWQgPSBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5zaG93Tm90aWZpY2F0aW9uKHtcbiAgICAgICAgdGl0bGU6IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGl0bGUnKSBhcyBUZXh0RmllbGQpLnZhbHVlLFxuICAgICAgICBjb250ZW50OiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2NvbnRlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlLFxuICAgICAgICB0eXBlOiB0eXBlID09PSAnTm9uZScgPyB1bmRlZmluZWQgOiB0eXBlIGFzIE5vdGlmaWNhdGlvblR5cGUsXG4gICAgICAgIHByaW9yaXR5OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3ByaW9yaXR5JykgYXMgVGV4dEZpZWxkKS52YWx1ZSksXG4gICAgICAgIHRpbWVvdXQ6IHBhcnNlSW50KChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZW91dCcpIGFzIFRleHRGaWVsZCkudmFsdWUpXG4gICAgfSk7XG5cbiAgICBub3RpZmljYXRpb25zLnB1c2goaWQpO1xufVxuXG5leHBvcnQgY29uc3QgaGlkZU5vdGlmaWNhdGlvbnMgPSAoKSA9PiB7XG4gICAgbm90aWZpY2F0aW9ucy5mb3JFYWNoKGlkID0+IGdldFNlcnZpY2UoSU5vdGlmaWNhdGlvblNlcnZpY2UpLmhpZGVOb3RpZmljYXRpb24oaWQpKTtcbiAgICBub3RpZmljYXRpb25zLmxlbmd0aCA9IDA7XG59IiwiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEYXRlc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRGF0ZXNTZXJ2aWNlJztcbmltcG9ydCB7Q29tbWFuZE1lc3NhZ2VCYXNpY1JzfSBmcm9tICdzYWJyZS1uZ3YtcG9zLWNkbS9jb21tc2cnO1xuaW1wb3J0IHtJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY29tbXNnL3NlcnZpY2VzL0lDb21tYW5kTWVzc2FnZVNlcnZpY2UnO1xuaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuXG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUG5yRm9ybSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB0ZW5EYXlzQWhlYWRGbGlnaHQgPSAnMScgKyBnZXRTZXJ2aWNlKERhdGVzU2VydmljZSkuZ2V0Tm93KCkuYWRkKDEwLCAnZGF5cycpLmZvcm1hdCgnRERNTU0nKS50b1VwcGVyQ2FzZSgpICsgJ0xBU0xBWFxcdTAwQTVBQSc7XG5cbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ0NyZWF0ZSBQTlInLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnLURPRS9KT0hOJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2ZsaWdodCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRlbkRheXNBaGVhZEZsaWdodFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpY2tldCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcwMVkyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2FnZW50JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FnZW50IEluZm8nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNkFHRU5UJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3Bob25lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzkxMjM0NTY3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVMaW1pdCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUaWNrZXRpbmcgdGltZSBsaW1pdCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc3VEFXLydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBDdXN0b21Gb3JtUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNlbGZTdWJtaXRQbnJBY3Rpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNlbGZTdWJtaXRQbnJBY3Rpb24gPSBhc3luYyAoZm9ybTogQ3VzdG9tRm9ybSk6IFByb21pc2U8dm9pZD4gPT4ge1xuXG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG5cbiAgICBjb25zdCBuYW1lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnbmFtZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgZmxpZ2h0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnZmxpZ2h0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCB0aWNrZXRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aWNrZXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGFnZW50SW5mb1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2FnZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBwaG9uZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3Bob25lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCB0YXdScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aW1lTGltaXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDE1MDAwKTtcblxuICAgIGNvbnN0IG5hbWVSc1N0YXR1cyA9IGF3YWl0IHNlbmRDb21tYW5kKG5hbWVScSwgJ05hbWUnKTtcbiAgICBjb25zdCBmbGlnaHRzU3RhdHVzID0gbmFtZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKGZsaWdodFJxLCAnRmxpZ2h0IGxpc3QnKTtcbiAgICBjb25zdCB0aWNrZXRSc1N0YXR1cyA9IGZsaWdodHNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGlja2V0UnEsICdUaWNrZXQnKTtcbiAgICBjb25zdCBhZ2VudEluZm9Sc1N0YXR1cyA9IHRpY2tldFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKGFnZW50SW5mb1JxLCAnYWdlbnRJbmZvJyk7XG4gICAgY29uc3QgcGhvbmVSc1N0YXR1cyA9IGFnZW50SW5mb1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHBob25lUnEsICdQaG9uZScpO1xuICAgIGNvbnN0IHRhd1JzU3RhdHVzID0gcGhvbmVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0YXdScSwgJ1RBVycpO1xuICAgIGNvbnN0IHdwUnNTdGF0dXMgPSB0YXdSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnV1AnLCAnV1AnKTtcbiAgICBjb25zdCBwcVJzU3RhdHVzID0gd3BSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnUFEnLCAnUFEnKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgIHBxUnNTdGF0dXMgJiYgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCAnUE5SIGNyZWF0ZWQnKTtcbn1cblxuY29uc3Qgc2VuZENvbW1hbmQgPSBhc3luYyAoY29tbWFuZDogc3RyaW5nLCBmYWlsdXJlU2VnbWVudDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgcnNTdGF0dXM6IENvbW1hbmRNZXNzYWdlQmFzaWNScyA9IGF3YWl0IGdldFNlcnZpY2UoSUNvbW1hbmRNZXNzYWdlU2VydmljZSkuc2VuZChjb21tYW5kKTtcbiAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gcnNTdGF0dXMuU3RhdHVzLlN1Y2Nlc3M7XG5cbiAgICBpZiAoaXNTdWNjZXNzICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXSAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0uVGV4dC5pbmNsdWRlcygnU0lHTiBJTicpKSB7XG4gICAgICAgIGlzU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBoYW5kbGVGYWlsdXJlKCdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICB9IGVsc2UgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgICAgaGFuZGxlRmFpbHVyZShmYWlsdXJlU2VnbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU3VjY2Vzcztcbn1cblxuY29uc3QgaGFuZGxlRmFpbHVyZSA9IChzZWdtZW50OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsIGAke3NlZ21lbnR9IGNyZWF0aW9uIGZhaWxlZGApO1xufSIsImltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IChvbkNsb3NlOiAoKSA9PiB2b2lkLCBvblN1Ym1pdDogKCkgPT4gdm9pZCk6IEpTWC5FbGVtZW50W10gPT4gW1xuICAgIDxCdXR0b25cbiAgICAgICAga2V5PXsxfVxuICAgICAgICBjbGFzc05hbWU9XCJidG4tc2Vjb25kYXJ5XCJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICA+XG4gICAgICAgIENsb3NlXG4gICAgPC9CdXR0b24+LFxuICAgIDxCdXR0b25cbiAgICAgICAga2V5PXsxfVxuICAgICAgICBjbGFzc05hbWU9XCJidG4tc3VjY2Vzc1wiXG4gICAgICAgIG9uQ2xpY2s9e29uU3VibWl0fVxuICAgID5cbiAgICAgICAgU3VibWl0XG4gICAgPC9CdXR0b24+XSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7U3RvcmVEYXRhfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1N0b3JlRGF0YSc7XG5cbmludGVyZmFjZSBTdG9yZUFjdGlvbnMge1xuICAgIHNldFVybDogKHVybDogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldE1ldGhvZDogKG1ldGhvZDogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEJvZHk6IChib2R5OiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0SGVhZGVyczogKGhlYWRlcnM6IHN0cmluZykgPT4gdm9pZDtcbn1cblxudHlwZSBDb21wb25lbnRQcm9wcyA9IFN0b3JlRGF0YSAmIFN0b3JlQWN0aW9ucztcblxuY29uc3QgTW9kYWxDb21wb25lbnRQdXJlID0gKHByb3BzOiBDb21wb25lbnRQcm9wcykgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZSd9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cnfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbC14cy02J30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsndXJsLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tdXJsLWZpZWxkYH0+VVJMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tdXJsLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgdXJsLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldFVybChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J21ldGhvZC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LW1ldGhvZC1maWVsZGB9Pk1ldGhvZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LW1ldGhvZC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIG1ldGhvZC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRNZXRob2QoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5tZXRob2R9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydib2R5LWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9PkJvZHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1ib2R5LWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgYm9keS1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRCb2R5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXs1fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnaGVhZGVycy1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfT5IZWFkZXJzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0taGVhZGVycy1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGhlYWRlcnMtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0SGVhZGVycyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmhlYWRlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17MTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbC14cy02J30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncmVzcG9uc2UtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1yZXNwb25zZS1maWVsZGB9PlJlc3BvbnNlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCByZXNwb25zZS1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLnJlc3BvbnNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezMwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlOiBTdG9yZURhdGEpOiBTdG9yZURhdGEge1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VXJsOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3VybCcsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldE1ldGhvZDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdtZXRob2QnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRCb2R5OiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ2JvZHknLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRIZWFkZXJzOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ2hlYWRlcnMnLCBuZXdWYWx9KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBNb2RhbENvbXBvbmVudCA9IGNvbm5lY3Q8U3RvcmVEYXRhLCBTdG9yZUFjdGlvbnMsIG5ldmVyPihtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTW9kYWxDb21wb25lbnRQdXJlKTtcbiIsImltcG9ydCB7UG5yUHVibGljU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9QbnJQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyaXBTdW1tYXJ5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHBuclB1YmxpY1NlcnZpY2U6IFBuclB1YmxpY1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFBuclB1YmxpY1NlcnZpY2UpO1xuICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgY29uc3QgcmVjb3JkTG9jYXRvciA9IHBuclB1YmxpY1NlcnZpY2UuZ2V0UmVjb3JkTG9jYXRvcigpO1xuICAgIGlmIChyZWNvcmRMb2NhdG9yKSB7XG4gICAgICAgIHBuclB1YmxpY1NlcnZpY2UucmVmcmVzaERhdGEoKTtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignSW5mbycsICdBY3RpdmUgUE5SIGhhcyBiZWVuIHJlZnJlc2hlZC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdFcnJvcicsICdUaGVyZSBpcyBubyBhY3RpdmUgUE5SIHRvIHJlZnJlc2guJyk7XG4gICAgfVxufSIsbnVsbCwiaW1wb3J0IHtBZ2VudFByb2ZpbGVTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0FnZW50UHJvZmlsZVNlcnZpY2UnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuY29uc3QgTk9UX0FWQUlMQUJMRSA9ICdOb3QgQXZhaWxhYmxlJztcbmV4cG9ydCBjb25zdCBzaG93QWdlbnRQcm9maWxlID0gKCk6IHZvaWQgPT4ge1xuXG4gICAgY29uc3Qgc2VydmljZTogQWdlbnRQcm9maWxlU2VydmljZSA9IGdldFNlcnZpY2UoQWdlbnRQcm9maWxlU2VydmljZSk7XG4gICAgY29uc3QgYWdlbnRJZCA9IHNlcnZpY2UuZ2V0QWdlbnRJZCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgbG9jYWxlID0gc2VydmljZS5nZXRMb2NhbGUoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IHBjYyA9IHNlcnZpY2UuZ2V0UGNjKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjb3VudHJ5ID0gc2VydmljZS5nZXRDb3VudHJ5KCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCByZWdpb24gPSBzZXJ2aWNlLmdldFJlZ2lvbigpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJCdXNpbmVzc1VuaXQgPSBzZXJ2aWNlLmdldEN1c3RvbWVyQnVzaW5lc3NVbml0KCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjdXN0b21lckVtcGxveWVlSWQgPSBzZXJ2aWNlLmdldEN1c3RvbWVyRW1wbG95ZWVJZCgpIHx8IE5PVF9BVkFJTEFCTEU7XG5cbiAgICBjb25zdCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbiA9IGBBZ2VudCBJRDogKioke2FnZW50SWR9KipcXG5gICtcbiAgICAgICAgYFBzZXVkbyBDaXR5IENvZGU6ICoqJHtwY2N9KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgQWdlbmN5IENvdW50cnk6ICoqJHtjb3VudHJ5fSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBSZWdpb246ICoqJHtyZWdpb259KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgTG9jYWxlOiAqKiR7bG9jYWxlfSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBCdXNpbmVzcyBVbml0OiAqKiR7Y3VzdG9tZXJCdXNpbmVzc1VuaXR9KipcXG5gICtcbiAgICAgICAgYEN1c3RvbWVyIEVtcGxveWVlIElEOiAqKiR7Y3VzdG9tZXJFbXBsb3llZUlkfSoqXFxuYDtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQWdlbnQgUHJvZmlsZScsIGFnZW50UHJvZmlsZURlc2NyaXB0aW9uKVxufSIsImltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge0Jhbm5lckNvbmZpZ30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9CYW5uZXJDb25maWcnO1xuaW1wb3J0IHtzaG93QnV0dG9uQWN0aW9ufSBmcm9tICcuL3Nob3dCdXR0b25BY3Rpb24nO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dCYW5uZXJzID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG5cbiAgICBjb25zdCBjb25maWdJbmZvOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHRleHQ6ICdJbmZvIGJhbm5lciB3aXRob3V0IHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnSW5mbyk7XG5cbiAgICBjb25zdCBjb25maWdFcnJvcjogQmFubmVyQ29uZmlnPSB7XG4gICAgICAgIHR5cGU6ICdFcnJvcicsXG4gICAgICAgIHRleHQ6ICdFcnJvciBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdFcnJvcik7XG5cbiAgICBjb25zdCBjb25maWdTdWNjZXNzOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdTdWNjZXNzJyxcbiAgICAgICAgdGV4dDogJ1N1Y2Nlc3MgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdTdWNjZXNzKTtcblxuICAgIGNvbnN0IGNvbmZpZ1dhcm5pbmc6IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdHlwZTogJ1dhcm5pbmcnLFxuICAgICAgICB0ZXh0OiAnV2FybmluZyBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnV2FybmluZyB0aXRsZScsXG4gICAgICAgIGxhYmVsOiAnV2FybmluZyBhY3Rpb24nLFxuICAgICAgICBhY3Rpb246IHNob3dCdXR0b25BY3Rpb25cbiAgICB9XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdXYXJuaW5nKTtcbn0iLCJpbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QnV0dG9uQWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdXYXJuaW5nIGFjdGlvbicsICdUaGUgd2FybmluZyBhY3Rpb24gYnV0dG9uIGhhcyBiZWVuIHByZXNzZWQuJylcbn0iLCJpbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0ludGVyc3RpdGlhbCA9ICgpOiB2b2lkID0+IHtcbiAgICBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpLnNob3dJbnRlcnN0aXRpYWwoNTAwMCk7XG59IiwiaW1wb3J0IHtFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBzaG93UnVudGltZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlOiBFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UgPSBnZXRTZXJ2aWNlKEVudmlyb25tZW50UHVibGljU2VydmljZSk7XG5cbiAgICBjb25zdCBydW50aW1lID0gc2VydmljZS5nZXRSdW50aW1lKCkgfHwgJ05vdCBBdmFpbGFibGUnO1xuXG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ1J1bm5pbmcgb24nLCBgUnVubmluZyBvbjogJHtydW50aW1lfWApO1xufSIsbnVsbCwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7SU1vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7STE4blNlcnZpY2UsIFNjb3BlZFRyYW5zbGF0b3J9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0kxOG5TZXJ2aWNlXCI7XG5cbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY29udGV4dDogSU1vZHVsZUNvbnRleHQgPSBuZXcgTW9kdWxlQ29udGV4dChcImNvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGVcIik7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNmOiBJTW9kdWxlQ29udGV4dFsnY2YnXSA9IGNvbnRleHQuY2YuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsncmVnaXN0ZXJTZXJ2aWNlJ10gPSBjb250ZXh0LnJlZ2lzdGVyU2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBnZXRTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsnZ2V0U2VydmljZSddID0gY29udGV4dC5nZXRTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHQ6IFNjb3BlZFRyYW5zbGF0b3IgPSBnZXRTZXJ2aWNlKEkxOG5TZXJ2aWNlKS5nZXRTY29wZWRUcmFuc2xhdG9yKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL3RyYW5zbGF0aW9ucycpO1xuIiwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7TWFpbn0gZnJvbSAnLi9NYWluJztcbmltcG9ydCB7SU1vZHVsZU1hbmlmZXN0fSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVNYW5pZmVzdCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5cbi8qKlxuICogIEF1dG9nZW5lcmF0ZWQgY2xhc3MgcmVwcmVzZW50aW5nIG1vZHVsZSBpbiBydW50aW1lLlxuICoqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlX2NvbV9zYWJyZV9yZWRhcHBfZXhhbXBsZTNfd2ViX2N1c3RvbXdvcmtmbG93X3dlYl9tb2R1bGUgZXh0ZW5kcyBNYWluIHtcbiAgICBjb25zdHJ1Y3RvcihtYW5pZmVzdDogSU1vZHVsZU1hbmlmZXN0KSB7XG4gICAgICAgIHN1cGVyKG1hbmlmZXN0KTtcbiAgICAgICAgY29udGV4dC5zZXRNb2R1bGUodGhpcyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBTdG9yZURhdGEge1xuICAgIHVybDogc3RyaW5nO1xuICAgIG1ldGhvZDogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZztcbiAgICBoZWFkZXJzOiBzdHJpbmc7XG4gICAgcmVzcG9uc2U6IHN0cmluZztcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlLCByZWdpc3RlclNlcnZpY2UgfSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXhwL3NlcnZpY2VzL0V4dGVuc2lvblBvaW50U2VydmljZSc7XG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZSc7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxCdXR0b24gfSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL21vZGVscy9SZWRBcHBTaWRlUGFuZWxCdXR0b24nO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQ29uZmlnIH0gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvUmVkQXBwU2lkZVBhbmVsQ29uZmlnJztcblxuaW1wb3J0IHsgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlUG5yRm9ybSB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtJztcbmltcG9ydCB7IGNhbGxMYXNMYXggfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbExhc0xheCc7XG5pbXBvcnQgeyBzaG93UnVudGltZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93UnVudGltZSc7XG5pbXBvcnQgeyBzaG93SW50ZXJzdGl0aWFsIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dJbnRlcnN0aXRpYWwnO1xuaW1wb3J0IHsgc2hvd0FnZW50UHJvZmlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlJztcbmltcG9ydCB7IHNob3dCYW5uZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dCYW5uZXJzJztcbmltcG9ydCB7IHJlZnJlc2hUcmlwU3VtbWFyeSB9IGZyb20gJy4vY29tcG9uZW50cy9yZWZyZXNoVHJpcFN1bW1hcnknO1xuaW1wb3J0IHsgY2FsbEV4dGVybmFsU2VydmljZSB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxsRXh0ZXJuYWxTZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0sIGhpZGVOb3RpZmljYXRpb25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm0nO1xuXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlJztcbmltcG9ydCB7IFNlYXRNYXBBdmFpbFRpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlJztcbmltcG9ydCB7IFNlYXRNYXBBdmFpbFZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3JztcblxuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9EcmF3ZXJTZXJ2aWNlJztcbmltcG9ydCB7IExhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvY29uZmlncy9kcmF3ZXIvTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcnO1xuXG5pbXBvcnQgeyBTZWF0TWFwU2hvcHBpbmdUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVGlsZSc7XG5pbXBvcnQgeyBTZWF0TWFwU2hvcHBpbmdWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVmlldyc7XG5cbmltcG9ydCB7IElBaXJQcmljaW5nU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3NlcnZpY2VzL0lBaXJQcmljaW5nU2VydmljZSc7XG5pbXBvcnQgeyBQcmljaW5nVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1ByaWNpbmdUaWxlJztcbmltcG9ydCB7IFByaWNpbmdWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1ZpZXcnO1xuXG5pbXBvcnQgeyBOb3ZpY2VCdXR0b25Db25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9Ob3ZpY2VCdXR0b25Db25maWcnO1xuaW1wb3J0IHsgU2FtcGxlQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3cy9TYW1wbGVDb21wb25lbnQnO1xuXG5pbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlUmVzZXJ2YXRpb25Sc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vcmVzZXJ2YXRpb24nO1xuaW1wb3J0IHtJUmVzZXJ2YXRpb25TZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtcmVzZXJ2YXRpb24vc2VydmljZXMvSVJlc2VydmF0aW9uU2VydmljZSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG4gIGluaXQoKTogdm9pZCB7XG4gICAgc3VwZXIuaW5pdCgpO1xuICAgIHRoaXMucmVnaXN0ZXJTZXJ2aWNlcygpO1xuICAgIHRoaXMuc2V0dXBTaWRlUGFuZWxCdXR0b25zKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nVGlsZSgpO1xuXG4gICAgY29uc3Qgb25DbGljayA9IChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdDb21tYW5kIEhlbHBlciBCdXR0b24gb25DbGljaycsIGlzT3Blbik7XG4gICAgICAvLyBpbnNlcnQgbG9naWMgaGVyZVxuICAgIH07XG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdDb21tYW5kIEhlbHBlciBQb3BvdmVyIG9uQ2xvc2UnKTtcbiAgICAgIC8vIGluc2VydCBsb2dpYyBoZXJlXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBOb3ZpY2VCdXR0b25Db25maWcoXG4gICAgICAvLyBEZWZpbmUgbGFiZWwgZm9yIHRoaXMgYnV0dG9uLlxuICAgICAgJ1NhbXBsZSBidXR0b24nLFxuICAgICAgLy8gT24gdG9wIG9mIHRleHQgd2UgYWRkIGFuIGljb24gZnJvbSBGb250IEF3ZXNvbWUuXG4gICAgICAnZmEtY29tbWVudCcsXG4gICAgICAvLyBEZWNvcmF0b3IgaXMgdXNlZCB0byBhcHBseSBzdHlsZXMgdG8gdGhlIGJ1dHRvbiB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIENvbW1hbmQgSGVscGVyIEJhci5cbiAgICAgICdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jb21tYW5kLWhlbHBlci1idXR0b24td2ViLW1vZHVsZScsXG4gICAgICAvLyBCYXNlIFJlYWN0IGNsYXNzIHRvIGJlIG1vdW50ZWQgYXMgcm9vdCBpbiBSZWFjdERPTS5yZW5kZXIoKS5cbiAgICAgIFNhbXBsZUNvbXBvbmVudCxcbiAgICAgIC8vIFByaW9yaXR5IG9mIHRoZSBidXR0b24gZGV0ZXJtaW5lcyBidXR0b24gcG9zaXRpb24gaW4gdGhlIENvbW1hbmQgSGVscGVyIEJhci5cbiAgICAgIC0xMDAwLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uQ2xvc2VcbiAgICApO1xuXG4gICAgLy8gQWRkIGJ1dHRvbiBjb25maWd1cmF0aW9uIHRvIGFkZCBhIGNvbW1hbmQgaGVscGVyIGJ1dHRvbi5cbiAgICBnZXRTZXJ2aWNlKEV4dGVuc2lvblBvaW50U2VydmljZSkuYWRkQ29uZmlnKCdub3ZpY2UtYnV0dG9ucycsIGNvbmZpZyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJTZXJ2aWNlcygpOiB2b2lkIHtcbiAgICByZWdpc3RlclNlcnZpY2UoQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTaWRlUGFuZWxCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VDc3NDbGFzc05hbWVzID0gJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItY3VzdG9td29ya2Zsb3cnO1xuXG4gICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBSZWRBcHBTaWRlUGFuZWxDb25maWcoW1xuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBiYW5uZXJzJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWJhbm5lcnMnLCBzaG93QmFubmVycyksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdFeHRlcm5hbCBzZXJ2aWNlIGNhbGwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctZXh0ZXJuYWxzZXJ2aWNlY2FsbCcsIGNhbGxFeHRlcm5hbFNlcnZpY2UpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVkQXBwIHBsYXRmb3JtJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBsYXRmb3JtJywgc2hvd1J1bnRpbWUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignTEFTIC0gTEFYJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFjdGlvbicsIGNhbGxMYXNMYXgpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIFBOUicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbnInLCBjcmVhdGVQbnJGb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgaW50ZXJzdGl0aWFsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWludGVyc3RpdGlhbCcsIHNob3dJbnRlcnN0aXRpYWwpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBBZ2VudCBQcm9maWxlJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFnZW50cHJvZmlsZScsIHNob3dBZ2VudFByb2ZpbGUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVmcmVzaCBUcmlwIFN1bW1hcnknLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVmcmVzaHRyaXAnLCByZWZyZXNoVHJpcFN1bW1hcnkpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIG5vdGlmaWNhdGlvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1jcmVhdGVOb3RpZmljYXRpb24nLCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0hpZGUgbm90aWZpY2F0aW9ucycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1oaWRlTm90aWZpY2F0aW9uJywgaGlkZU5vdGlmaWNhdGlvbnMpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVzZXJ2YXRpb24nLCAnYnRuIGJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b24gcmVkYXBwLXdlYi1yZXNlcnZhdGlvbicsIHRoaXMuc2hvd1Jlc2VydmF0aW9uKSxcbiAgICAgIHNlbGZSZW1vdmVCdG5cbiAgICBdKTtcblxuICAgIGdldFNlcnZpY2UoRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlKS5hZGRDb25maWcoJ3JlZEFwcFNpZGVQYW5lbCcsIGNvbmZpZyk7XG4gIH1cblxuICAvLyBBdmFpbGFiaWxpdHlUaWxlXG4gIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGFpckF2YWlsYWJpbGl0eVNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UpOyAvLyAyPUNCQDU9PTg5IEE1QDI4QSA0O08gP0A1ND5BQjAyOzU9OE8gNDA9PUtFIDIgQDA8OjBFIEF2YWlsYWJpbGl0eVxuXG4gICAgY29uc3Qgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCA9IChkYXRhOiBhbnkpID0+IHtcblxuICAgICAgY29uc29sZS5sb2coJz3lIFtBdmFpbGFiaWxpdHldIFJlY2VpdmVkIERhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xuXG4gICAgICBjb25zdCBtb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICdTZWF0TWFwcyBBQkMgMzYwJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBBdmFpbFZpZXcsIGRhdGEpLFxuICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnXG4gICAgICB9O1xuXG4gICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG1vZGFsT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGFpckF2YWlsYWJpbGl0eVNlcnZpY2UuY3JlYXRlQWlyQXZhaWxhYmlsaXR5U2VhcmNoVGlsZShcbiAgICAgIFNlYXRNYXBBdmFpbFRpbGUsXG4gICAgICBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsLFxuICAgICAgJ1NlYXRNYXBzIEFCQyAzNjAnXG4gICAgKTtcbiAgfVxuXG4gIC8vIFNob3BwaW5nVGlsZSBcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTogdm9pZCB7XG4gICAgLy8gPj9ANTQ1O081PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBjb25zdCBzaG9wcGluZ0RyYXdlckNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhTZWF0TWFwU2hvcHBpbmdUaWxlLCBTZWF0TWFwU2hvcHBpbmdWaWV3LCB7XG4gICAgICB0aXRsZTogJ1Nob3BwaW5nIFRpbGUgV2lkZ2V0JyAvLyA3MDM+Oz4yPjogPjo9MFxuICAgIH0pO1xuICAgIC8vIDJLNzJLMjA1PCBBNUAyOEEgQSBNQjg8IGNvbmZpZyBzaG9wcGluZ0RyYXdlckNvbmZpZ1xuICAgIGdldFNlcnZpY2UoRHJhd2VyU2VydmljZSkuYWRkQ29uZmlnKFsnc2hvcHBpbmctZmxpZ2h0LXNlZ21lbnQnXSwgc2hvcHBpbmdEcmF3ZXJDb25maWcpO1xuXG4gICAgLy8gUHJpY2luZyBUaWxlXG4gICAgY29uc3Qgc2hvd1ByaWNpbmdNb2RhbCA9IHRoaXMuY3JlYXRlU2hvd01vZGFsQWN0aW9uKFByaWNpbmdWaWV3LCAnUHJpY2luZyBEYXRhJyk7XG4gICAgZ2V0U2VydmljZShJQWlyUHJpY2luZ1NlcnZpY2UpLmNyZWF0ZVByaWNpbmdUaWxlKFByaWNpbmdUaWxlLCBzaG93UHJpY2luZ01vZGFsLCAnQUJDIFNlYXQgTWFwJyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2hvd01vZGFsQWN0aW9uKHZpZXc6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PGFueT4sIGhlYWRlcjogc3RyaW5nKTogKGRhdGE6IGFueSkgPT4gdm9pZCB7XG4gICAgcmV0dXJuICgoZGF0YSkgPT4ge1xuXG4gICAgICBjb25zb2xlLmxvZygnPeUgW1ByaWNpbmddIFJlY2VpdmVkIERhdGEgKEZ1bGwgT2JqZWN0KTonLCBPYmplY3Qua2V5cyhkYXRhKSk7XG4gICAgICBjb25zb2xlLmxvZygnPeUgW1ByaWNpbmddIEZ1bGwgRGF0YTonLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XG5cbiAgICAgIGNvbnN0IG5ndk1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcixcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgZGF0YVxuICAgICAgICApLFxuICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnXG4gICAgICB9XG4gICAgICBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpLnNob3dSZWFjdE1vZGFsKG5ndk1vZGFsT3B0aW9ucyk7XG4gICAgfSlcbiAgfVxuXG4gIC8vIFJlc2VydmFpb24gSW5mbyBXaW5kb3dcbiAgcHJpdmF0ZSBzaG93UmVzZXJ2YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDE1MDAwKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uUHJvbWlzZTogUHJvbWlzZTxDb21tYW5kTWVzc2FnZVJlc2VydmF0aW9uUnM+ID0gZ2V0U2VydmljZShJUmVzZXJ2YXRpb25TZXJ2aWNlKS5nZXRSZXNlcnZhdGlvbigpO1xuXG4gICAgcmVzZXJ2YXRpb25Qcm9taXNlLnRoZW4oKHJlc2VydmF0aW9uOiBDb21tYW5kTWVzc2FnZVJlc2VydmF0aW9uUnMpID0+IHtcbiAgICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnUmVzZXJ2YXRpb24gRGF0YScsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAncmVzZXJ2YXRpb25EYXRhJyxcbiAgICAgICAgICAgIHR5cGU6ICdQQVJBR1JBUEgnLFxuICAgICAgICAgICAgdGV4dDogJ2BgYFxcbicgK1xuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShyZXNlcnZhdGlvbiwgbnVsbCwgMikgK1xuICAgICAgICAgICAgICAnXFxuYGBgJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgICAgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgcmVjZWl2aW5nIHJlc2VydmF0aW9uJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNsYXNzIFNhbXBsZUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWNvcmQ8c3RyaW5nLCBuZXZlcj4+IHtcblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY29tbWFuZC1oZWxwZXItYnV0dG9uLXdlYi1tb2R1bGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGUtY29tcG9uZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgSGVsbG8gV29ybGQhISFcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== 