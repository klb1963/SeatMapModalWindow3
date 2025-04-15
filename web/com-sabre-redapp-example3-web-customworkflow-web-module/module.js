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
    var config = _a.config, flightSegments = _a.flightSegments, selectedSegmentIndex = _a.selectedSegmentIndex;
    var _b = (0, react_1.useState)(selectedSegmentIndex), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    var currentSegment = flightSegments[segmentIndex] || {};
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
            layout: JSON.stringify(seatMapData.layout)
            // availability: JSON.stringify(seatMapData.availability),
            // passengers: JSON.stringify(seatMapData.passengers)
        };
        console.log('📤 [SeatMapComponent] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        console.log("\uD83D\uDD04 Segment index changed: " + segmentIndex);
        sendToIframe();
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) { return (React.createElement("option", { key: index, value: index },
                segment.marketingAirline || 'XX',
                " ",
                segment.flightNumber || '000',
                " \u2192 ",
                segment.origin || '???',
                " \u2013 ",
                segment.destination || '???')); }))),
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(currentSegment, null, 2))),
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
var quicketConfig_1 = require("./quicketConfig");
function showSeatMapPricingModal() {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
    // 🟡 Получаем сохранённые сегменты из sessionStorage
    var raw = window.sessionStorage.getItem('flightSegmentsForPricing');
    var segments = [];
    try {
        segments = raw ? JSON.parse(raw) : [];
    }
    catch (e) {
        console.error('❌ Ошибка разбора данных flightSegmentsForPricing из sessionStorage:', e);
    }
    if (!segments.length) {
        alert('❗ Нет доступных сегментов рейса для отображения карты мест.');
        return;
    }
    var options = {
        header: 'SeatMap Viewer (Pricing)',
        component: React.createElement(SeatMapComponentPricing_1.default, {
            config: quicketConfig_1.quicketConfig,
            flightSegments: segments,
            selectedSegmentIndex: 0 // можно начать с первого
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options);
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapPricingModal"], false, function (require, exports, module) {
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
        (0, showSeatMapPricingModal_1.showSeatMapPricingModal)(); // Вызов функции показа модального окна c данными (data)
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
        var aircraftTypes = {
            '359': 'Airbus A350-900',
            '388': 'Airbus A380-800',
            '77W': 'Boeing 777-300ER',
            '320': 'Airbus A320',
            '321': 'Airbus A321',
            '738': 'Boeing 737-800',
            '787': 'Boeing 787 Dreamliner'
        };
        this.flightSegments = segments.map(function (s) {
            var _a;
            var departureDateTime = s.getDepartureDate();
            var equipmentCode = ((_a = s.getEquipmentCode) === null || _a === void 0 ? void 0 : _a.call(s)) || 'UNKNOWN';
            var equipmentDescription = aircraftTypes[equipmentCode] || 'Not Available';
            return {
                id: s.getSegmentId(),
                segmentId: s.getSegmentId(),
                flightNumber: s.getFlightNumber(),
                origin: s.getOriginIata(),
                destination: s.getDestinationIata(),
                airMiles: s.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN',
                marketingAirline: s.getMarketingAirline(),
                cabinClass: 'A',
                aircraft: {
                    code: equipmentCode,
                    description: equipmentDescription
                }
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
        // 💾 Сохраняем flightSegments в sessionStorage для использования в Pricing
        try {
            window.sessionStorage.setItem('flightSegmentsForPricing', JSON.stringify(this.flightSegments));
            console.log('💾 [SeatMapShoppingView] Сегменты маршрута сохранены в sessionStorage:', this.flightSegments);
        }
        catch (error) {
            console.error('❌ Ошибка при сохранении данных в sessionStorage:', error);
        }
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
    // Reservation Info Window
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZXh0cmFjdFNlZ21lbnREYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9nZXRGbGlnaHRGcm9tU2FicmVEYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9xdWlja2V0Q29uZmlnLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRBdmFpbC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRQcmljaW5nLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudFNob3BwaW5nLnRzeCIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdEcmF3ZXJWaWV3LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBTaG9wcGluZ1ZpZXcuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwQXZhaWxNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWxGb3JTZWdtZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcFByaWNpbmdNb2RhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3RyYW5zZm9ybUZsaWdodC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVGlsZS50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1ZpZXcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1RpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVmlldy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hY3Rpb25zLmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsRXh0ZXJuYWxTZXJ2aWNlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jYWxsTGFzTGF4LnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5LnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBDb21wb25lbnQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dCYW5uZXJzLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QnV0dG9uQWN0aW9uLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93UnVudGltZS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9zaG93U2VhdE1hcE1vZGFsLmpzIiwic3JjL2NvZGUvQ29udGV4dC50cyIsInNyYy9jb2RlL2luZGV4LnRzIiwic3JjL2NvZGUvaW50ZXJmYWNlcy9TdG9yZURhdGEudHMiLCJzcmMvY29kZS9NYWluLnRzIiwic3JjL2NvZGUvcmVkdWNlcnMvTG9jYWxTdG9yZS50cyIsInNyYy9jb2RlL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZS50cyIsInNyYy9jb2RlL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS91dGlscy90cmFuc2Zvcm1GbGlnaHQuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVGlsZS5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdmlld3MvYXZhaWwvc2VhdG1hcC9TZWF0TWFwQXZhaWxWaWV3LmpzIiwic3JjL2NvZGUvdmlld3MvU2FtcGxlQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBZ0Isa0JBQWtCLENBQUMsT0FBc0I7SUFDckQsT0FBTztRQUNILFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQ3BDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRTtRQUN4RCxhQUFhLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1FBQzVDLEdBQUcsRUFBRSxPQUFPLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxLQUFLO1FBQy9DLE1BQU0sRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFO1FBQy9CLFdBQVcsRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUU7UUFDekMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QyxjQUFjLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFoQixDQUFnQixDQUFDO1FBQzdFLFVBQVUsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFO0tBQy9CLENBQUM7QUFDTixDQUFDO0FBWkQsZ0RBWUM7Ozs7Ozs7OztBQ2RNLElBQU0sc0JBQXNCLEdBQUcsVUFBQyxJQUFTLEVBQUUsWUFBd0I7O0lBQXhCLDZCQUFBLEVBQUEsZ0JBQXdCO0lBQ3hFLElBQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUcsWUFBWSxDQUFDLENBQUM7SUFFcEQsSUFBSSxD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QTs7OztBQ0ZBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBLDZCQUErQjtBQUUvQjtJQUFxQyxtQ0FBc0M7SUFBM0U7O0lBV0EsQ0FBQztJQVRHLGdDQUFNLEdBQU47UUFDSSxPQUFPLENBQ0gsNkJBQUssU0FBUyxFQUFDLGdFQUFnRTtZQUMzRSw2QkFBSyxTQUFTLEVBQUMsa0JBQWtCLHFCQUUzQixDQUNKLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFDTCxzQkFBQztBQUFELENBWEEsQUFXQyxDQVhvQyxLQUFLLENBQUMsU0FBUyxHQVduRDtBQVhZLDBDQUFlIiwiZmlsZSI6Im1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U2VnbWVudERhdGEoc2VnbWVudDogRmxpZ2h0U2VnbWVudCk6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZsaWdodE51bWJlcjogc2VnbWVudC5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgbWFya2V0aW5nQ2Fycmllcjogc2VnbWVudC5nZXRNYXJrZXRpbmdPcGVyYXRpbmdBaXJsaW5lKCksXG4gICAgICAgIGRlcGFydHVyZURhdGU6IHNlZ21lbnQuZ2V0UmF3RGVwYXJ0dXJlRGF0ZSgpLFxuICAgICAgICByYmQ6IHNlZ21lbnQuZ2V0U2VsZWN0ZWRCb29raW5nQ2xhc3MoKSB8fCAnTi9BJyxcbiAgICAgICAgb3JpZ2luOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSxcbiAgICAgICAgZGVzdGluYXRpb246IHNlZ21lbnQuZ2V0RGVzdGluYXRpb25JYXRhKCksXG4gICAgICAgIGVxdWlwbWVudENvZGU6IHNlZ21lbnQuZ2V0RXF1aXBtZW50Q29kZSgpLFxuICAgICAgICBlcXVpcG1lbnRDb2Rlczogc2VnbWVudC5nZXRFcXVpcG1lbnRDb2RlcygpLm1hcChjb2RlSW5mbyA9PiBTdHJpbmcoY29kZUluZm8pKSxcbiAgICAgICAgc2VnbWVudFJwaDogc2VnbWVudC5nZXRScGgoKVxuICAgIH07XG59IiwiZXhwb3J0IGNvbnN0IGdldEZsaWdodEZyb21TYWJyZURhdGEgPSAoZGF0YTogYW55LCBzZWdtZW50SW5kZXg6IG51bWJlciA9IDApID0+IHtcbiAgY29uc3Qgc2VnbWVudCA9IGRhdGEuZmxpZ2h0U2VnbWVudHM/LltzZWdtZW50SW5kZXhdO1xuXG4gIGlmICghc2VnbWVudCkge1xuICAgIGNvbnNvbGUud2FybihgoA8gU2VnbWVudCBpbmRleCAke3NlZ21lbnRJbmRleH0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnVU5LTk9XTicsXG4gICAgICBhaXJsaW5lQ29kZTogJycsXG4gICAgICBmbGlnaHRObzogJycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnJyxcbiAgICAgIGRlcGFydHVyZTogJycsXG4gICAgICBhcnJpdmFsOiAnJyxcbiAgICAgIGNhYmluQ2xhc3M6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCc9zCBbZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YV0gHz47PUs1IDQwPT1LNSBBNTM8NT1CMDonLCBKU09OLnN0cmluZ2lmeShzZWdtZW50LCBudWxsLCAyKSk7XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LkRlcGFydHVyZURhdGVUaW1lO1xuXG4gIGlmICghZGVwYXJ0dXJlRGF0ZVRpbWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ6APIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSBEZXBhcnR1cmVEYXRlVGltZSA+QkFDQkFCMkM1QiAyIDQwPT1LRSBBNTM8NT1CMCEnKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJycsXG4gICAgICBmbGlnaHRObzogc2VnbWVudC5GbGlnaHROdW1iZXIgfHwgJycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnJyxcbiAgICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGNhYmluQ2xhc3M6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGRlcGFydHVyZURhdGUgPSBkZXBhcnR1cmVEYXRlVGltZS5zcGxpdCgnVCcpWzBdOyAvLyAeQUIwMjtPNTwgQj47TDo+IDQwQkNcblxuICByZXR1cm4ge1xuICAgIGlkOiAnMDAxJyxcbiAgICBhaXJsaW5lQ29kZTogc2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlcixcbiAgICBkZXBhcnR1cmVEYXRlLFxuICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBhcnJpdmFsOiBzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgY2FiaW5DbGFzczogJ0EnXG4gIH07XG59OyIsImV4cG9ydCBjb25zdCBxdWlja2V0Q29uZmlnID0ge1xuICAgIHdpZHRoOiA0MDAsXG4gICAgbGFuZzogJ0VOJyxcbiAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICByaWdodFRvTGVmdDogZmFsc2UsXG4gICAgdmlzaWJsZUZ1c2VsYWdlOiB0cnVlLFxuICAgIHZpc2libGVXaW5nczogdHJ1ZSxcbiAgICBidWlsdEluRGVja1NlbGVjdG9yOiB0cnVlLFxuICAgIHNpbmdsZURlY2tNb2RlOiB0cnVlLFxuICAgIGJ1aWx0SW5Ub29sdGlwOiB0cnVlLFxuICAgIGV4dGVybmFsUGFzc2VuZ2VyTWFuYWdlbWVudDogZmFsc2UsXG4gICAgdG9vbHRpcE9uSG92ZXI6IGZhbHNlLFxuICAgIGNvbG9yVGhlbWU6IHtcbiAgICAgICAgc2VhdExhYmVsQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHNlYXRTdHJva2VDb2xvcjogJ2dyYXknXG4gICAgfVxufTsiLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldEZsaWdodEZyb21TYWJyZURhdGEgfSBmcm9tICcuL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTtcbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudEF2YWlsOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vID0NIBs+MzhAQzU8IDJFPjRPSTg1IDQwPT1LNVxuICBjb25zb2xlLmxvZygnPTkgW1NlYXRNYXBDb21wb25lbnRdIHJlY2VpdmVkIHByb3BzOicsIHsgY29uZmlnLCBkYXRhIH0pO1xuXG4gIGNvbnN0IGZsaWdodCA9IGdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KTsgLy8gTUI+IEE1Mzw1PUIgPz47NUIwIGMgNDBCPjlcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0KTtcbiAgXG4gIC8vIGZsaWdodCA0O08gP0A+MjVAOjhcbiAgLy8gZmxpZ2h0OntcbiAgLy8gICBpZDogJzAwMScsIFxuICAvLyAgICAgYWlybGluZUNvZGU6ICdMSCcsXG4gIC8vICAgICBmbGlnaHRObzogJzEyMycsXG4gIC8vICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNC0yMicsIFxuICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgLy8gICAgIGFycml2YWw6ICdGUkEnLFxuICAvLyAgICAgY2FiaW5DbGFzczogJ0EnXG4gIC8vIH0sXG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodCxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShmbGlnaHQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwQ29tcG9uZW50XSBpZnJhbWUgbG9hZGVkLCBzZW5kaW5nIGRhdGEuLi4nKTtcbiAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudEF2YWlsOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNlYXRNYXBDb21wb25lbnRQcmljaW5nUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZmxpZ2h0U2VnbWVudHM6IGFueVtdO1xuICBzZWxlY3RlZFNlZ21lbnRJbmRleDogbnVtYmVyO1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzogUmVhY3QuRkM8U2VhdE1hcENvbXBvbmVudFByaWNpbmdQcm9wcz4gPSAoe1xuICBjb25maWcsXG4gIGZsaWdodFNlZ21lbnRzLFxuICBzZWxlY3RlZFNlZ21lbnRJbmRleFxufSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoc2VsZWN0ZWRTZWdtZW50SW5kZXgpO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gZmxpZ2h0U2VnbWVudHNbc2VnbWVudEluZGV4XSB8fCB7fTtcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0OiB7XG4gICAgICBpZDogJzAwMScsXG4gICAgICBhaXJsaW5lQ29kZTogY3VycmVudFNlZ21lbnQubWFya2V0aW5nQWlybGluZSB8fCAnTEgnLFxuICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgIGRlcGFydHVyZURhdGU6IGN1cnJlbnRTZWdtZW50LmRlcGFydHVyZURhdGVUaW1lIHx8ICcyMDI1LTA0LTIyJyxcbiAgICAgIGRlcGFydHVyZTogY3VycmVudFNlZ21lbnQub3JpZ2luIHx8ICdNVUMnLFxuICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICBjYWJpbkNsYXNzOiBjdXJyZW50U2VnbWVudC5jYWJpbkNsYXNzIHx8ICdBJ1xuICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBhdmFpbGFiaWxpdHk6IFtcbiAgICAgIHsgbGFiZWw6ICcxQScsIHByaWNlOiA1MCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2dyZWVuJywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcxQicsIHByaWNlOiA0NSwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ3llbGxvdycsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMkEnLCBwcmljZTogMzAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdsaWdodGJsdWUnIH1cbiAgICBdLFxuICAgIHBhc3NlbmdlcnM6IFt7IGlkOiAnUEFYMScsIG5hbWU6ICcYMjA9PjIgGC4YLicsIHR5cGU6ICdBRFQnIH1dXG4gIH07XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSBvciBjb250ZW50V2luZG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KVxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7XG4gIH0sIFtzZWdtZW50SW5kZXhdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ1hYJ30ge3NlZ21lbnQuZmxpZ2h0TnVtYmVyIHx8ICcwMDAnfSCSIHtzZWdtZW50Lm9yaWdpbiB8fCAnPz8/J30gEyB7c2VnbWVudC5kZXN0aW5hdGlvbiB8fCAnPz8/J31cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGN1cnJlbnRTZWdtZW50LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aWZyYW1lXG4gICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICBvbkxvYWQ9eygpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnBSBbU2VhdE1hcENvbXBvbmVudF0gaWZyYW1lIGxvYWRlZCwgc2VuZGluZyBkYXRhLi4uJyk7XG4gICAgICAgICAgc2VuZFRvSWZyYW1lKCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFByaWNpbmc7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTsgLy8gFDA9PUs1LCA6PkI+QEs1ID9AOEU+NE9CIDg3IFNob3BwaW5nIEFGNT0wQDhPXG59XG5cbmNvbnN0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZzogUmVhY3QuRkM8U2VhdE1hcFByb3BzPiA9ICh7IGNvbmZpZywgZGF0YSB9KSA9PiB7XG4gIGNvbnN0IFtzZWdtZW50SW5kZXgsIHNldFNlZ21lbnRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgaWZyYW1lUmVmID0gdXNlUmVmPEhUTUxJRnJhbWVFbGVtZW50PihudWxsKTtcblxuLy8gHz47Q0cwNTwgQjU6Q0k4OSBBNTM8NT1CXG4gIGNvbnN0IGZsaWdodFNlZ21lbnRzID0gZGF0YS5mbGlnaHRTZWdtZW50cyB8fCBbXTtcbiAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBmbGlnaHRTZWdtZW50c1tzZWdtZW50SW5kZXhdIHx8IHt9O1xuXG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudFNob3BwaW5nXSAfPjtDRzU9PUs1IDQwPT1LNTonLCBkYXRhKTtcblxuICAgICAgICAvLyAvLyA9KCAlMEA0Oj40ODwgNDA9PUs1IDQ7TyA/QD4yNUA6OFxuICAgICAgICAvLyBjb25zdCBmbGlnaHREYXRhID0ge1xuICAgICAgICAvLyAgICAgYWlybGluZUNvZGU6ICdMSCcsXG4gICAgICAgIC8vICAgICBmbGlnaHRObzogJzEyMycsXG4gICAgICAgIC8vICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNC0yMicsXG4gICAgICAgIC8vICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAgICAgICAvLyAgICAgYXJyaXZhbDogJ0ZSQSdcbiAgICAgICAgLy8gfTtcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0OiB7XG5cbiAgICAgICAgaWQ6ICcwMDEnLCAgLy8gIzE1NDhBTCwgR0I+ID81QDU0MDVCQU8gaWRcbiAgICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogY3VycmVudFNlZ21lbnQuZGVwYXJ0dXJlRGF0ZVRpbWUgfHwgJzIwMjUtMDQtMjInLFxuICAgICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICAgIGNhYmluQ2xhc3M6IGN1cnJlbnRTZWdtZW50LmNhYmluQ2xhc3MgfHwgJ0EnXG5cbiAgICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9O1xuXG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudFNob3BwaW5nXSAhRD5APDhAPjIwPT1LNSA0MD09SzUgNDtPID5CP0AwMjo4OicsIHNlYXRNYXBEYXRhKTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIDg7OCBjb250ZW50V2luZG93ID01IDQ+QUJDPzU9LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gHkI/QDAyOjAgNDA9PUtFIDIgaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZW5kVG9JZnJhbWUoKTtcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICB7LyogRmxpZ2h0IEluZm8gU2VjdGlvbiAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIGZvbnRTaXplOiAnMC45cmVtJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgPHN0cm9uZz496yBGbGlnaHQgaW5mbzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoY3VycmVudFNlZ21lbnQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nIH19PlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlZ21lbnRTZWxlY3RcIj4SSzE1QDhCNSBBNTM8NT1COiA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJzZWdtZW50U2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VnbWVudEluZGV4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VnbWVudEluZGV4KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICA+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ1hYJ30ge3NlZ21lbnQuZmxpZ2h0TnVtYmVyIHx8ICcwMDAnfToge3NlZ21lbnQub3JpZ2lufSCSIHtzZWdtZW50LmRlc3RpbmF0aW9ufVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8aWZyYW1lXG4gICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICBvbkxvYWQ9e3NlbmRUb0lmcmFtZX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmc7IixudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCBTZWF0TWFwQ29tcG9uZW50QXZhaWwgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50QXZhaWwnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuLy8gZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwQXZhaWxNb2RhbChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogdm9pZCB7XG5cbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCBWaWV3ZXInLFxuICAgIC8vIEE+NzQwNTwgUmVhY3QtOj48Pz49NT1CID0wID5BPT4yNSBTZWF0TWFwQ29tcG9uZW50XG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnRBdmFpbCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCBkYXRhIC0gPjFKNTpCIEI4PzAgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBGNTs4Oj48XG4gICAgfSksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgXG59IixudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcblxuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRQcmljaW5nIGZyb20gJy4vU2VhdE1hcENvbXBvbmVudFByaWNpbmcnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcFByaWNpbmdNb2RhbCgpOiB2b2lkIHtcbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTtcblxuICAvLyA94SAfPjtDRzA1PCBBPkVAMD1RPT1LNSBBNTM8NT1CSyA4NyBzZXNzaW9uU3RvcmFnZVxuICBjb25zdCByYXcgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmxpZ2h0U2VnbWVudHNGb3JQcmljaW5nJyk7XG4gIGxldCBzZWdtZW50czogYW55W10gPSBbXTtcblxuICB0cnkge1xuICAgIHNlZ21lbnRzID0gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDogW107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdMIB5IODE6MCBAMDcxPkAwIDQwPT1LRSBmbGlnaHRTZWdtZW50c0ZvclByaWNpbmcgODcgc2Vzc2lvblN0b3JhZ2U6JywgZSk7XG4gIH1cblxuICBpZiAoIXNlZ21lbnRzLmxlbmd0aCkge1xuICAgIGFsZXJ0KCdXIB01QiA0PkFCQz89S0UgQTUzPDU9Qj4yIEA1OUEwIDQ7TyA+Qj4xQDA2NT04TyA6MEBCSyA8NUFCLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyIChQcmljaW5nKScsXG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnRQcmljaW5nLCB7XG4gICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICBmbGlnaHRTZWdtZW50czogc2VnbWVudHMsICAgICAgICAvLyA9BCA/NUA1NDBRPCBBPkVAMD1RPT1LNSBBNTM8NT1CS1xuICAgICAgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IDAgICAgICAgICAgLy8gPD42PT4gPTBHMEJMIEEgPzVAMj4zPlxuICAgIH0pLFxuICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIE1vZGFsXSBDbG9zZWQnKVxuICB9O1xuXG4gIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTtcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuLy8gZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YVxuXG5pbnRlcmZhY2UgU2VhdE1hcFNob3BwaW5nRGF0YSB7XG4gICAgZmxpZ2h0U2VnbWVudHM6IGFueVtdOyAgLy8gHD42PT4gNzA8NT04QkwgPTAgOj49OkA1Qj1LOSBCOD8sIDVBOzggODcyNUFCNT1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwU2hvcHBpbmdNb2RhbChkYXRhOiBTZWF0TWFwU2hvcHBpbmdEYXRhKTogdm9pZCB7XG5cbiAgICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAgIGlmICghbW9kYWxTZXJ2aWNlIHx8IHR5cGVvZiBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBQdWJsaWNNb2RhbHNTZXJ2aWNlIG5vdCBhdmFpbGFibGUgb3Igbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAgLy8gPcwgFzA6QEtCTCAyQTUgP0A1NEs0Q0k4NSA8PjQwO0w9SzUgPjo9MCA/NUA1NCA+QjpAS0I4NTwgPT4yPjM+XG4gICAgIHRyeSB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEFsbCBwcmV2aW91cyBtb2RhbHMgY2xvc2VkLicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3IgaGlkaW5nIG1vZGFsczonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCBWaWV3ZXInLFxuICAgICAgICAvLyBBPjc0MDU8IFJlYWN0LTo+PD8+PTU9QiA9MCA+QT0+MjUgU2VhdE1hcENvbXBvbmVudFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KSxcbiAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgU2hvcHBpbmcgTW9kYWxdIENsb3NlZCcpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBNb2RhbCBkYXRhOicsIGRhdGEpO1xuXG4gICAgLy8gH0A+MjVAOjAgPTAgND5BQkM/PT5BQkwgPDVCPjQwIGBzaG93UmVhY3RNb2RhbGBcbiAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3Igc2hvd2luZyBtb2RhbDonLCBlcnJvcik7XG4gICAgfVxuXG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBaXJQcmljaW5nRGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3Jlc3BvbnNlL2ludGVyZmFjZXMvQWlyUHJpY2luZ0RhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwUHJpY2luZ01vZGFsJztcblxuZXhwb3J0IGNvbnN0IFByaWNpbmdUaWxlID0gKGRhdGE6IEFpclByaWNpbmdEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz0YIBo7ODogPz4gOj0+Pzo1IFNlYXRNYXBzIEFCQyAzNjAgMiBQcmljaW5nVGlsZScpO1xuICAgIHNob3dTZWF0TWFwUHJpY2luZ01vZGFsKCk7IC8vIBJLNz4yIDw+NDA7TD0+Mz4gPjo9MFxuICB9O1xuXG4gIC8vID3mICQ+QDw4QEM1PCA/PjQ/OEFMIEEgQTUzPDU9QjA8OCAob3JpZ2luLWRlc3RpbmF0aW9uOmFpcmxpbmUgZmxpZ2h0Tm8gLi4uKVxuICBsZXQgc2VnbWVudExhYmVsID0gJyc7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZsaWdodFNlZ21lbnRzRm9yUHJpY2luZycpO1xuICAgIGNvbnN0IHNlZ21lbnRzID0gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDogW107XG5cbiAgICBzZWdtZW50TGFiZWwgPSBzZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIGAke3NlZ21lbnQub3JpZ2lufS0ke3NlZ21lbnQuZGVzdGluYXRpb259OiR7c2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lfSAke3NlZ21lbnQuZmxpZ2h0TnVtYmVyfWA7XG4gICAgfSkuam9pbignICcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignoA8gHkg4MTowID9AOCA4NzI7NUc1PTg4IGZsaWdodFNlZ21lbnRzRm9yUHJpY2luZyAyIFByaWNpbmdUaWxlOicsIGUpO1xuICAgIHNlZ21lbnRMYWJlbCA9ICdBQkMgU2VhdCBNYXAnO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJzZGstcHJpY2luZy1jdXN0b20tdGlsZS1jb250ZW50XCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCdcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICB7c2VnbWVudExhYmVsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPVwiYWJjLXNlYXRtYXAtYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnNHB4IDEycHgnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyZjczYmMnLFxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4J1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBTZWF0TWFwcyBBQkMgMzYwXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWlyUHJpY2luZ0RhdGEgfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwUHJpY2luZ01vZGFsIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcFByaWNpbmdNb2RhbCc7XG5cbi8vIFRPRE8gOj5AQDU6Qj1LOSAySzE+QCBBNTM8NT1CMFxuXG5leHBvcnQgY29uc3QgUHJpY2luZ1ZpZXcgPSAoZGF0YTogQWlyUHJpY2luZ0RhdGEpIDogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPYAgUHJpY2luZ1ZpZXcgZGF0YTonLCBkYXRhKTsgLy8gGz4zIDQ7TyA+QjswNDo4XG4gICAgICAgIHNob3dTZWF0TWFwUHJpY2luZ01vZGFsKCk7IC8vIBJLNz4yIERDPTpGODggPz46MDcwIDw+NDA7TD0+Mz4gPjo9MCBjIDQwPT1LPDggKGRhdGEpXG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstcHJpY2luZy1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgICAgICBcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfSBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCcgfX0+IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8b2w+XG4gICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+ICBcbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvb2w+XG5cbiAgICAgICAgICAgIHsvKiAUPjEwMjs1PTAgOj0+PzowKi99XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFiYy1zZWF0bWFwLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmY3M2JjJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjRweCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnMjVweCcgLy8gBSAUPjEwMjs1PT4gQTw1STU9ODUgMjs1Mj4gPTAgMjVweFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgU2VhdE1hcHMgQUJDIDM2MFxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFxuXG4vLyBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbi8vIGltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9Db250ZXh0Jztcbi8vIGltcG9ydCB7SVNlYXRNYXBTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytc2VhdG1hcC9zZXJ2aWNlcy9JU2VhdE1hcFNlcnZpY2UnO1xuXG4vLyBleHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbi8vICAgICBjb25zdCBoYW5kbGVPcGVuU2VhdE1hcCA9IGFzeW5jIChmbGlnaHRTZWdtZW50TnVtYmVyOiBudW1iZXIpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYD3rIE9wZW5pbmcgU2VhdCBNYXAgZm9yIHNlZ21lbnQ6ICR7ZmxpZ2h0U2VnbWVudE51bWJlcn1gKTtcbiAgICBcbi8vICAgICAgICAgdHJ5IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0U2VydmljZShJU2VhdE1hcFNlcnZpY2UpLm9wZW5TZWF0TWFwRm9yRmxpZ2h0U2VnbWVudChmbGlnaHRTZWdtZW50TnVtYmVyKTtcbiAgICBcbi8vICAgICAgICAgICAgIGlmICghcmVzcG9uc2UubW9kYWxPcGVuZWRDb3JyZWN0bHkpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGCgDyBFcnJvciBvcGVuaW5nIFNlYXQgTWFwOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX1gKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEwgRmFpbGVkIHRvIG9wZW4gU2VhdCBNYXA6YCwgZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfTtcblxuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuLy8gICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbi8vICAgICAgICAgICAgIDxvbD5cbi8vICAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4vLyAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlT3BlblNlYXRNYXAoaW5kZXggKyAxKX0+PpEgT3BlbiBTZWF0IE1hcDwvYnV0dG9uPlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICkpfVxuLy8gICAgICAgICAgICAgPC9vbD5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgKTtcbi8vIH07XG5cblxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcEF2YWlsTW9kYWwgfSBmcm9tICcuLi9zaG93U2VhdE1hcEF2YWlsTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVmlldyA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJz2AIFNlYXRNYXBBdmFpbFZpZXcgZGF0YTonLCBkYXRhKTsgLy8gOz4zIDIgPj1BPjtMXG4gICAgICBzaG93U2VhdE1hcEF2YWlsTW9kYWwoZGF0YSk7IC8vIDJLN0syMDU8IERDPTpGOE4gPz46MDcwIDw+NDA7TD0+Mz4gPjo9MCBjIDQwPT1LPDggKGRhdGEpXG4gICAgfSwgW10pO1xuICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgIDxwPh5COkBLMjA1PCBTZWF0TWFwIFZpZXdlci4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07IiwiaW1wb3J0IHsgVGlsZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGUnO1xuaW1wb3J0IHsgVGlsZU9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlT3B0aW9ucyc7XG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IHsgV2l0aG91dEZvY3VzT25DbGljayB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9taXhpbnMvV2l0aG91dEZvY3VzT25DbGljayc7XG5pbXBvcnQgeyBJbml0aWFsIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL0luaXRpYWwnO1xuaW1wb3J0IHsgTWl4aW4gfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvTWl4aW4nO1xuaW1wb3J0IHsgQ3NzQ2xhc3MgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5pbXBvcnQgeyBleHRyYWN0U2VnbWVudERhdGEgfSBmcm9tICcuLi9leHRyYWN0U2VnbWVudERhdGEnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLXRpbGV3aWRnZXRzLXdlYi1tb2R1bGUnLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSlcbkBJbml0aWFsPFRpbGVPcHRpb25zPih7XG4gICAgY2FwdGlvbjogJ1NlYXRNYXBzIEFCQyAzNjAnLFxuICAgIGNsYXNzTmFtZTogJ3dlYi1haXItc2hvcHBpbmctd2lkZ2V0LXNhbXBsZSdcbn0pXG5ATWl4aW4oV2l0aG91dEZvY3VzT25DbGljaylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdUaWxlIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiBpbXBsZW1lbnRzIFdpdGhvdXRGb2N1c09uQ2xpY2sge1xuICAgIGRlY2xhcmUgY29udGV4dDogYW55O1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50U2VnbWVudDogRmxpZ2h0U2VnbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgc2hhcmVkTW9kZWw6IGFueSA9IG51bGw7XG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlZ21lbnQgPSBjcGE7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gY3BhO1xuICAgICAgICAgICAgY29uc3Qgc2hhcmVkU2VnbWVudERhdGEgPSBleHRyYWN0U2VnbWVudERhdGEoc2VnbWVudCk7XG5cbiAgICAgICAgICAgIC8vICE+RUAwPU81PCA4OzggPz4yQj5APT4gOEE/PjtMN0M1PCBzaGFyZWRNb2RlbFxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dD8uc2hhcmVkQ29udGV4dE1vZGVsPy5zZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsID0gdGhpcy5jb250ZXh0LnNoYXJlZENvbnRleHRNb2RlbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLnNldCgnc2VsZWN0ZWRTZWdtZW50Rm9yUHJpY2luZycsIHNoYXJlZFNlZ21lbnREYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnBSAhPkVAMD04OzggQTUzPDU9QiAyIFNoYXJlZENvbnRleHRNb2RlbDonLCBzaGFyZWRTZWdtZW50RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcmVkTW9kZWw/LnNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuc2V0KCdzZWxlY3RlZFNlZ21lbnRGb3JQcmljaW5nJywgc2hhcmVkU2VnbWVudERhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd7DyAfPjJCPkA9PiBBPkVAMD04OzggQTUzPDU9QiAyIFNoYXJlZENvbnRleHRNb2RlbDonLCBzaGFyZWRTZWdtZW50RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gU2hhcmVkQ29udGV4dE1vZGVsID01ND5BQkM/NT0gFCBBNTM8NT1CID01IEE+RUAwPVE9LicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHNlZ21lbnQuZ2V0T3JpZ2luSWF0YSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gc2VnbWVudC5nZXRNYXJrZXRpbmdBaXJsaW5lKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmxpZ2h0TnVtYmVyID0gc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7b3JpZ2lufS0ke2Rlc3RpbmF0aW9ufToke2NhcnJpZXJ9ICR7ZmxpZ2h0TnVtYmVyfWA7XG4gICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbGVIdG1sID0gYFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyBmb250LXNpemU6IDEycHg7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA4cHg7XCI+JHtsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFiYy1zZWF0bWFwLWJ1dHRvblwiIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwcHggMTJweCAxMnB4IDEycHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3M2JjO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VhdE1hcHMgQUJDIDM2MFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YUNvbnRlbnQodGlsZUh0bWwpO1xuXG4gICAgICAgICAgICAvLyAeMUAwMT5CRzg6IDo7ODowXG4gICAgICAgICAgICB0aGlzLiRlbC5vZmYoJ2NsaWNrJywgJy5hYmMtc2VhdG1hcC1idXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGljaycsICcuYWJjLXNlYXRtYXAtYnV0dG9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9ASAaOzg6ID8+IDo9Pj86NSAUID8+MkI+QD0+IDg9OEY4OEBDNTwgVmlldycpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQnLCB0aGlzLm1vZGVsKTsgLy8gBSA9MEI4Mj0+XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTCAeSDgxOjAgMiBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmU2VsZWN0ZWRGYXJlQ2hhbmdlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGEpO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nIGZyb20gJy4uL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZyc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi4vcXVpY2tldENvbmZpZyc7XG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlOlNob3BwaW5nVGlsZVZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuICAgIHByaXZhdGUgY3VycmVudFNlZ21lbnQ6IEZsaWdodFNlZ21lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGZsaWdodFNlZ21lbnRzOiBhbnlbXSA9IFtdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZCBjYWxsZWQgd2l0aCBjcGE6JywgY3BhKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRTZWdtZW50ID0gY3BhO1xuICAgICAgICB0aGlzLnVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQoY3BhKTtcbiAgICAgICAgdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRmxpZ2h0U2VnbWVudHNGcm9tU2VnbWVudChzZWdtZW50OiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gc2VnbWVudC5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGFpcmNyYWZ0VHlwZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgICAgICAnMzU5JzogJ0FpcmJ1cyBBMzUwLTkwMCcsXG4gICAgICAgICAgICAnMzg4JzogJ0FpcmJ1cyBBMzgwLTgwMCcsXG4gICAgICAgICAgICAnNzdXJzogJ0JvZWluZyA3NzctMzAwRVInLFxuICAgICAgICAgICAgJzMyMCc6ICdBaXJidXMgQTMyMCcsXG4gICAgICAgICAgICAnMzIxJzogJ0FpcmJ1cyBBMzIxJyxcbiAgICAgICAgICAgICc3MzgnOiAnQm9laW5nIDczNy04MDAnLFxuICAgICAgICAgICAgJzc4Nyc6ICdCb2VpbmcgNzg3IERyZWFtbGluZXInXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZmxpZ2h0U2VnbWVudHMgPSBzZWdtZW50cy5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHMuZ2V0RGVwYXJ0dXJlRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXF1aXBtZW50Q29kZSA9IHMuZ2V0RXF1aXBtZW50Q29kZT8uKCkgfHwgJ1VOS05PV04nO1xuICAgICAgICAgICAgY29uc3QgZXF1aXBtZW50RGVzY3JpcHRpb24gPSBhaXJjcmFmdFR5cGVzW2VxdWlwbWVudENvZGVdIHx8ICdOb3QgQXZhaWxhYmxlJztcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IHMuZ2V0U2VnbWVudElkKCksXG4gICAgICAgICAgICAgICAgc2VnbWVudElkOiBzLmdldFNlZ21lbnRJZCgpLFxuICAgICAgICAgICAgICAgIGZsaWdodE51bWJlcjogcy5nZXRGbGlnaHROdW1iZXIoKSxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHMuZ2V0T3JpZ2luSWF0YSgpLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBzLmdldERlc3RpbmF0aW9uSWF0YSgpLFxuICAgICAgICAgICAgICAgIGFpck1pbGVzOiBzLmdldEFpck1pbGVzKCksXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZVRpbWU6IGRlcGFydHVyZURhdGVUaW1lID8gZGVwYXJ0dXJlRGF0ZVRpbWUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJ1VOS05PV04nLFxuICAgICAgICAgICAgICAgIG1hcmtldGluZ0FpcmxpbmU6IHMuZ2V0TWFya2V0aW5nQWlybGluZSgpLFxuICAgICAgICAgICAgICAgIGNhYmluQ2xhc3M6ICdBJyxcbiAgICAgICAgICAgICAgICBhaXJjcmFmdDoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBlcXVpcG1lbnRDb2RlLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZXF1aXBtZW50RGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyA9IDApIHtcbiAgICAgICAgY29uc3QgTUFYX0FUVEVNUFRTID0gMTA7XG4gICAgICAgIGNvbnN0IElOVEVSVkFMID0gNTAwO1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcblxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9MDk0NT0uIB0wRzg9MDU8IEA1PTQ1QDg9MyBSZWFjdCA6Pjw/Pj01PUIwLicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHRzIDwgTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYKAPIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9NSA9MDk0NT0uIB8+MkI+QD0wTyA/Pj9LQjowIEc1QDU3ICR7SU5URVJWQUx9IDxBLiAfPj9LQjowICR7YXR0ZW1wdHMgKyAxfS8ke01BWF9BVFRFTVBUU31gKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyArIDEpLCBJTlRFUlZBTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAdNSBDNDA7PkFMID0wOUI4IE07NTw1PUIgc2VhdG1hcC1yb290ID8+QTs1IDwwOkE4PDA7TD0+Mz4gRzhBOzAgPz4/S0I+Oi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJlYWN0Q29tcG9uZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFNlZ21lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gHTVCIEE+RUAwPVE9PT4zPiBBNTM8NT1CMC4gUmVhY3QgOj48Pz49NT1CID01IDFDNDVCID5CQDU9NDVANT0uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKCF0aGlzLmZsaWdodFNlZ21lbnRzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gZmxpZ2h0U2VnbWVudHMgP0NBQi4gHzVANTg9OEY4MDs4NzBGOE8gODcgQjU6Q0k1Mz4gQTUzPDU9QjAuJyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQodGhpcy5jdXJyZW50U2VnbWVudCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuICAgIFxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUocm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgcm9vdEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcm9vdEVsZW1lbnQuaWQgPSAnc2VhdG1hcC1yb290JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBmbGlnaHRTZWdtZW50czogdGhpcy5mbGlnaHRTZWdtZW50cyxcbiAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIC8vID2+ICE+RUAwPU81PCBmbGlnaHRTZWdtZW50cyAyIHNlc3Npb25TdG9yYWdlIDQ7TyA4QT8+O0w3PjIwPThPIDIgUHJpY2luZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZsaWdodFNlZ21lbnRzRm9yUHJpY2luZycsIEpTT04uc3RyaW5naWZ5KHRoaXMuZmxpZ2h0U2VnbWVudHMpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9viBbU2VhdE1hcFNob3BwaW5nVmlld10gITUzPDU9QksgPDBASEBDQjAgQT5FQDA9NT1LIDIgc2Vzc2lvblN0b3JhZ2U6JywgdGhpcy5mbGlnaHRTZWdtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIB5IODE6MCA/QDggQT5FQDA9NT04OCA0MD09S0UgMiBzZXNzaW9uU3RvcmFnZTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcsIHsgY29uZmlnOiBxdWlja2V0Q29uZmlnLCBkYXRhIH0pLFxuICAgICAgICAgICAgcm9vdEVsZW1lbnRcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBSZWFjdCBDb21wb25lbnQgQ0E/NUg9PiA+QkA1PTQ1QDU9IDIgI3NlYXRtYXAtcm9vdC4nKTtcbiAgICB9XG59XG4iLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7UHVibGljTW9kYWxzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHtSZWFjdE1vZGFsT3B0aW9uc30gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHtFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3J9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge2FjdGlvbnN9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zJztcbmltcG9ydCB7TW9kYWxDb21wb25lbnR9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudCc7XG5pbXBvcnQge0xvY2FsU3RvcmV9IGZyb20gJy4uL3JlZHVjZXJzL0xvY2FsU3RvcmUnO1xuXG5jb25zdCBtb2RhbFNlcnZpY2U6IFB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG5leHBvcnQgY29uc3QgY2FsbEV4dGVybmFsU2VydmljZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBsb2NhbFN0b3JlID0gbmV3IExvY2FsU3RvcmUoKTtcblxuICAgIGNvbnN0IG9uU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdG9yZURhdGEgPSBsb2NhbFN0b3JlLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSBKU09OLnBhcnNlKHN0b3JlRGF0YS5oZWFkZXJzKTtcblxuICAgICAgICBnZXRTZXJ2aWNlKEV4dGVybmFsU2VydmljZUNvbm5lY3RvcikuY2FsbFNlcnZpY2Uoc3RvcmVEYXRhLnVybCwgc3RvcmVEYXRhLm1ldGhvZCwgc3RvcmVEYXRhLmJvZHksIGhlYWRlcnMpLmRvbmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSBKU09OLnBhcnNlKHJlc3BvbnNlIGFzIHN0cmluZyk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlT2JqZWN0LCBudWxsLCAyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmUuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAge3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdyZXNwb25zZScsIG5ld1ZhbDogcmVzcG9uc2VTdHJpbmd9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLmNsb3NlUmVhY3RNb2RhbCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ndk1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ0V4dGVybmFsU2VydmljZUNvbm5lY3RvcicsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbENvbXBvbmVudCksXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdCxcbiAgICAgICAgYWN0aW9uczogYWN0aW9ucyhvbkNsb3NlLCBvblN1Ym1pdCksXG4gICAgICAgIHN0b3JlOiBsb2NhbFN0b3JlLnN0b3JlXG4gICAgfVxuXG4gICAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG5ndk1vZGFsT3B0aW9ucyk7XG59OyIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Y2YsIGdldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY2FsbExhc0xheCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcblxuICAgIGNmKCcxTEFTTEFYJykuc2VuZCgpLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuXG4gICAgICAgIGNvbnN0IGhhc1NpZ25JblJlc3BvbnNlID0gcmVzcG9uc2UuZ2V0RGF0YVN0cnVjdHMoKVxuICAgICAgICAgICAgLmZpbHRlcihkYXRhID0+IGRhdGFbJ2QuU2NyZWVuJ10gJiYgZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAubWFwKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAuc29tZShkYXRhID0+IGRhdGEuaW5jbHVkZXMoJ1NJR04gSU4nKSk7XG5cbiAgICAgICAgaWYgKGhhc1NpZ25JblJlc3BvbnNlKSB7XG4gICAgICAgICAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnRXJyb3InLCAnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCJpbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEcm9wZG93bkZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvRHJvcGRvd25GaWVsZCc7XG5pbXBvcnQge0lOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL3NlcnZpY2UvSU5vdGlmaWNhdGlvblNlcnZpY2UnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25UeXBlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL2ludGVyZmFjZXMvTm90aWZpY2F0aW9uVHlwZSc7XG5cbmNvbnN0IG5vdGlmaWNhdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnTm90aWZpY2F0aW9uJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aXRsZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY29udGVudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndHlwZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0RST1BET1dOJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ05vbmUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0luZm8nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oLT9bMS05XVswLTldKnwwKSQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lb3V0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpbWVvdXQgaW4gbXMnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdeKFsxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG5cbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzaG93Tm90aWZpY2F0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKGZvcm06IEN1c3RvbUZvcm0pOiB2b2lkID0+IHtcbiAgICBjb25zdCB0eXBlID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0eXBlJykgYXMgRHJvcGRvd25GaWVsZCkudmFsdWU7XG5cbiAgICBjb25zdCBpZCA9IGdldFNlcnZpY2UoSU5vdGlmaWNhdGlvblNlcnZpY2UpLnNob3dOb3RpZmljYXRpb24oe1xuICAgICAgICB0aXRsZTogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aXRsZScpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIGNvbnRlbnQ6IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnY29udGVudCcpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIHR5cGU6IHR5cGUgPT09ICdOb25lJyA/IHVuZGVmaW5lZCA6IHR5cGUgYXMgTm90aWZpY2F0aW9uVHlwZSxcbiAgICAgICAgcHJpb3JpdHk6IHBhcnNlSW50KChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncHJpb3JpdHknKSBhcyBUZXh0RmllbGQpLnZhbHVlKSxcbiAgICAgICAgdGltZW91dDogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aW1lb3V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZSlcbiAgICB9KTtcblxuICAgIG5vdGlmaWNhdGlvbnMucHVzaChpZCk7XG59XG5cbmV4cG9ydCBjb25zdCBoaWRlTm90aWZpY2F0aW9ucyA9ICgpID0+IHtcbiAgICBub3RpZmljYXRpb25zLmZvckVhY2goaWQgPT4gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuaGlkZU5vdGlmaWNhdGlvbihpZCkpO1xuICAgIG5vdGlmaWNhdGlvbnMubGVuZ3RoID0gMDtcbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0RhdGVzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9EYXRlc1NlcnZpY2UnO1xuaW1wb3J0IHtDb21tYW5kTWVzc2FnZUJhc2ljUnN9IGZyb20gJ3NhYnJlLW5ndi1wb3MtY2RtL2NvbW1zZyc7XG5pbXBvcnQge0lDb21tYW5kTWVzc2FnZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jb21tc2cvc2VydmljZXMvSUNvbW1hbmRNZXNzYWdlU2VydmljZSc7XG5pbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5cbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbnJGb3JtID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHRlbkRheXNBaGVhZEZsaWdodCA9ICcxJyArIGdldFNlcnZpY2UoRGF0ZXNTZXJ2aWNlKS5nZXROb3coKS5hZGQoMTAsICdkYXlzJykuZm9ybWF0KCdERE1NTScpLnRvVXBwZXJDYXNlKCkgKyAnTEFTTEFYXFx1MDBBNUFBJztcblxuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnQ3JlYXRlIFBOUicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICctRE9FL0pPSE4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGVuRGF5c0FoZWFkRmxpZ2h0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGlja2V0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzAxWTInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnYWdlbnQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWdlbnQgSW5mbycsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc2QUdFTlQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnOTEyMzQ1NjcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGltZUxpbWl0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpY2tldGluZyB0aW1lIGxpbWl0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzdUQVcvJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG4gICAgaWYgKHJlc3VsdC5hY3Rpb24gPT09ICdvaycpIHtcbiAgICAgICAgc2VsZlN1Ym1pdFBuckFjdGlvbihyZXN1bHQpO1xuICAgIH1cbn1cblxuY29uc3Qgc2VsZlN1Ym1pdFBuckFjdGlvbiA9IGFzeW5jIChmb3JtOiBDdXN0b21Gb3JtKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGNvbnN0IG5hbWVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICduYW1lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBmbGlnaHRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdmbGlnaHQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRpY2tldFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpY2tldCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgYWdlbnRJbmZvUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnYWdlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHBob25lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncGhvbmUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRhd1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVMaW1pdCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoMTUwMDApO1xuXG4gICAgY29uc3QgbmFtZVJzU3RhdHVzID0gYXdhaXQgc2VuZENvbW1hbmQobmFtZVJxLCAnTmFtZScpO1xuICAgIGNvbnN0IGZsaWdodHNTdGF0dXMgPSBuYW1lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoZmxpZ2h0UnEsICdGbGlnaHQgbGlzdCcpO1xuICAgIGNvbnN0IHRpY2tldFJzU3RhdHVzID0gZmxpZ2h0c1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0aWNrZXRScSwgJ1RpY2tldCcpO1xuICAgIGNvbnN0IGFnZW50SW5mb1JzU3RhdHVzID0gdGlja2V0UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoYWdlbnRJbmZvUnEsICdhZ2VudEluZm8nKTtcbiAgICBjb25zdCBwaG9uZVJzU3RhdHVzID0gYWdlbnRJbmZvUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQocGhvbmVScSwgJ1Bob25lJyk7XG4gICAgY29uc3QgdGF3UnNTdGF0dXMgPSBwaG9uZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRhd1JxLCAnVEFXJyk7XG4gICAgY29uc3Qgd3BSc1N0YXR1cyA9IHRhd1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdXUCcsICdXUCcpO1xuICAgIGNvbnN0IHBxUnNTdGF0dXMgPSB3cFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdQUScsICdQUScpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG4gICAgcHFSc1N0YXR1cyAmJiBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsICdQTlIgY3JlYXRlZCcpO1xufVxuXG5jb25zdCBzZW5kQ29tbWFuZCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcsIGZhaWx1cmVTZWdtZW50OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCByc1N0YXR1czogQ29tbWFuZE1lc3NhZ2VCYXNpY1JzID0gYXdhaXQgZ2V0U2VydmljZShJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlKS5zZW5kKGNvbW1hbmQpO1xuICAgIGxldCBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSByc1N0YXR1cy5TdGF0dXMuU3VjY2VzcztcblxuICAgIGlmIChpc1N1Y2Nlc3MgJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXS5UZXh0LmluY2x1ZGVzKCdTSUdOIElOJykpIHtcbiAgICAgICAgaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgIH0gZWxzZSBpZiAoIWlzU3VjY2Vzcykge1xuICAgICAgICBoYW5kbGVGYWlsdXJlKGZhaWx1cmVTZWdtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdWNjZXNzO1xufVxuXG5jb25zdCBoYW5kbGVGYWlsdXJlID0gKHNlZ21lbnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgYCR7c2VnbWVudH0gY3JlYXRpb24gZmFpbGVkYCk7XG59IiwiaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0gKG9uQ2xvc2U6ICgpID0+IHZvaWQsIG9uU3VibWl0OiAoKSA9PiB2b2lkKTogSlNYLkVsZW1lbnRbXSA9PiBbXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgID5cbiAgICAgICAgQ2xvc2VcbiAgICA8L0J1dHRvbj4sXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zdWNjZXNzXCJcbiAgICAgICAgb25DbGljaz17b25TdWJtaXR9XG4gICAgPlxuICAgICAgICBTdWJtaXRcbiAgICA8L0J1dHRvbj5dIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuaW50ZXJmYWNlIFN0b3JlQWN0aW9ucyB7XG4gICAgc2V0VXJsOiAodXJsOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0TWV0aG9kOiAobWV0aG9kOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0Qm9keTogKGJvZHk6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRIZWFkZXJzOiAoaGVhZGVyczogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG50eXBlIENvbXBvbmVudFByb3BzID0gU3RvcmVEYXRhICYgU3RvcmVBY3Rpb25zO1xuXG5jb25zdCBNb2RhbENvbXBvbmVudFB1cmUgPSAocHJvcHM6IENvbXBvbmVudFByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJ30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jvdyd9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyd1cmwtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfT5VUkw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCB1cmwtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbWV0aG9kLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH0+TWV0aG9kPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgbWV0aG9kLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldE1ldGhvZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLm1ldGhvZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2JvZHktZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1ib2R5LWZpZWxkYH0+Qm9keTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBib2R5LWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEJvZHkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydoZWFkZXJzLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0taGVhZGVycy1maWVsZGB9PkhlYWRlcnM8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgaGVhZGVycy1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRIZWFkZXJzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuaGVhZGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyZXNwb25zZS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH0+UmVzcG9uc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1yZXNwb25zZS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHJlc3BvbnNlLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMucmVzcG9uc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17MzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGU6IFN0b3JlRGF0YSk6IFN0b3JlRGF0YSB7XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVcmw6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAndXJsJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TWV0aG9kOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ21ldGhvZCcsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEJvZHk6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnYm9keScsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEhlYWRlcnM6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnaGVhZGVycycsIG5ld1ZhbH0pXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IE1vZGFsQ29tcG9uZW50ID0gY29ubmVjdDxTdG9yZURhdGEsIFN0b3JlQWN0aW9ucywgbmV2ZXI+KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNb2RhbENvbXBvbmVudFB1cmUpO1xuIiwiaW1wb3J0IHtQbnJQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL1BuclB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCByZWZyZXNoVHJpcFN1bW1hcnkgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG5yUHVibGljU2VydmljZTogUG5yUHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoUG5yUHVibGljU2VydmljZSk7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICBjb25zdCByZWNvcmRMb2NhdG9yID0gcG5yUHVibGljU2VydmljZS5nZXRSZWNvcmRMb2NhdG9yKCk7XG4gICAgaWYgKHJlY29yZExvY2F0b3IpIHtcbiAgICAgICAgcG5yUHVibGljU2VydmljZS5yZWZyZXNoRGF0YSgpO1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdJbmZvJywgJ0FjdGl2ZSBQTlIgaGFzIGJlZW4gcmVmcmVzaGVkLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0Vycm9yJywgJ1RoZXJlIGlzIG5vIGFjdGl2ZSBQTlIgdG8gcmVmcmVzaC4nKTtcbiAgICB9XG59IixudWxsLCJpbXBvcnQge0FnZW50UHJvZmlsZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQWdlbnRQcm9maWxlU2VydmljZSc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5jb25zdCBOT1RfQVZBSUxBQkxFID0gJ05vdCBBdmFpbGFibGUnO1xuZXhwb3J0IGNvbnN0IHNob3dBZ2VudFByb2ZpbGUgPSAoKTogdm9pZCA9PiB7XG5cbiAgICBjb25zdCBzZXJ2aWNlOiBBZ2VudFByb2ZpbGVTZXJ2aWNlID0gZ2V0U2VydmljZShBZ2VudFByb2ZpbGVTZXJ2aWNlKTtcbiAgICBjb25zdCBhZ2VudElkID0gc2VydmljZS5nZXRBZ2VudElkKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBsb2NhbGUgPSBzZXJ2aWNlLmdldExvY2FsZSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcGNjID0gc2VydmljZS5nZXRQY2MoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGNvdW50cnkgPSBzZXJ2aWNlLmdldENvdW50cnkoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IHJlZ2lvbiA9IHNlcnZpY2UuZ2V0UmVnaW9uKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjdXN0b21lckJ1c2luZXNzVW5pdCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJCdXNpbmVzc1VuaXQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyRW1wbG95ZWVJZCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJFbXBsb3llZUlkKCkgfHwgTk9UX0FWQUlMQUJMRTtcblxuICAgIGNvbnN0IGFnZW50UHJvZmlsZURlc2NyaXB0aW9uID0gYEFnZW50IElEOiAqKiR7YWdlbnRJZH0qKlxcbmAgK1xuICAgICAgICBgUHNldWRvIENpdHkgQ29kZTogKioke3BjY30qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgQ291bnRyeTogKioke2NvdW50cnl9KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgQWdlbmN5IFJlZ2lvbjogKioke3JlZ2lvbn0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBMb2NhbGU6ICoqJHtsb2NhbGV9KipcXG5gICtcbiAgICAgICAgYEN1c3RvbWVyIEJ1c2luZXNzIFVuaXQ6ICoqJHtjdXN0b21lckJ1c2luZXNzVW5pdH0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgRW1wbG95ZWUgSUQ6ICoqJHtjdXN0b21lckVtcGxveWVlSWR9KipcXG5gO1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdBZ2VudCBQcm9maWxlJywgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24pXG59IiwiaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7QmFubmVyQ29uZmlnfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Jhbm5lckNvbmZpZyc7XG5pbXBvcnQge3Nob3dCdXR0b25BY3Rpb259IGZyb20gJy4vc2hvd0J1dHRvbkFjdGlvbic7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0Jhbm5lcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcblxuICAgIGNvbnN0IGNvbmZpZ0luZm86IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdGV4dDogJ0luZm8gYmFubmVyIHdpdGhvdXQgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdJbmZvKTtcblxuICAgIGNvbnN0IGNvbmZpZ0Vycm9yOiBCYW5uZXJDb25maWc9IHtcbiAgICAgICAgdHlwZTogJ0Vycm9yJyxcbiAgICAgICAgdGV4dDogJ0Vycm9yIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdFcnJvciB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0Vycm9yKTtcblxuICAgIGNvbnN0IGNvbmZpZ1N1Y2Nlc3M6IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdHlwZTogJ1N1Y2Nlc3MnLFxuICAgICAgICB0ZXh0OiAnU3VjY2VzcyBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnU3VjY2VzcyB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1N1Y2Nlc3MpO1xuXG4gICAgY29uc3QgY29uZmlnV2FybmluZzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnV2FybmluZycsXG4gICAgICAgIHRleHQ6ICdXYXJuaW5nIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdXYXJuaW5nIHRpdGxlJyxcbiAgICAgICAgbGFiZWw6ICdXYXJuaW5nIGFjdGlvbicsXG4gICAgICAgIGFjdGlvbjogc2hvd0J1dHRvbkFjdGlvblxuICAgIH1cbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1dhcm5pbmcpO1xufSIsImltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dCdXR0b25BY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ1dhcm5pbmcgYWN0aW9uJywgJ1RoZSB3YXJuaW5nIGFjdGlvbiBidXR0b24gaGFzIGJlZW4gcHJlc3NlZC4nKVxufSIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93SW50ZXJzdGl0aWFsID0gKCk6IHZvaWQgPT4ge1xuICAgIGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSkuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcbn0iLCJpbXBvcnQge0Vudmlyb25tZW50UHVibGljU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dSdW50aW1lID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2U6IEVudmlyb25tZW50UHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlKTtcblxuICAgIGNvbnN0IHJ1bnRpbWUgPSBzZXJ2aWNlLmdldFJ1bnRpbWUoKSB8fCAnTm90IEF2YWlsYWJsZSc7XG5cbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnUnVubmluZyBvbicsIGBSdW5uaW5nIG9uOiAke3J1bnRpbWV9YCk7XG59IixudWxsLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtJTW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtJMThuU2VydmljZSwgU2NvcGVkVHJhbnNsYXRvcn0gZnJvbSBcInNhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSTE4blNlcnZpY2VcIjtcblxuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjb250ZXh0OiBJTW9kdWxlQ29udGV4dCA9IG5ldyBNb2R1bGVDb250ZXh0KFwiY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZVwiKTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY2Y6IElNb2R1bGVDb250ZXh0WydjZiddID0gY29udGV4dC5jZi5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlclNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydyZWdpc3RlclNlcnZpY2UnXSA9IGNvbnRleHQucmVnaXN0ZXJTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGdldFNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydnZXRTZXJ2aWNlJ10gPSBjb250ZXh0LmdldFNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgdDogU2NvcGVkVHJhbnNsYXRvciA9IGdldFNlcnZpY2UoSTE4blNlcnZpY2UpLmdldFNjb3BlZFRyYW5zbGF0b3IoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvdHJhbnNsYXRpb25zJyk7XG4iLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtNYWlufSBmcm9tICcuL01haW4nO1xuaW1wb3J0IHtJTW9kdWxlTWFuaWZlc3R9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZU1hbmlmZXN0JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi9Db250ZXh0JztcblxuLyoqXG4gKiAgQXV0b2dlbmVyYXRlZCBjbGFzcyByZXByZXNlbnRpbmcgbW9kdWxlIGluIHJ1bnRpbWUuXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGVfY29tX3NhYnJlX3JlZGFwcF9leGFtcGxlM193ZWJfY3VzdG9td29ya2Zsb3dfd2ViX21vZHVsZSBleHRlbmRzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKG1hbmlmZXN0OiBJTW9kdWxlTWFuaWZlc3QpIHtcbiAgICAgICAgc3VwZXIobWFuaWZlc3QpO1xuICAgICAgICBjb250ZXh0LnNldE1vZHVsZSh0aGlzKTtcbiAgICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFN0b3JlRGF0YSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nO1xuICAgIGhlYWRlcnM6IHN0cmluZztcbiAgICByZXNwb25zZTogc3RyaW5nO1xufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UsIHJlZ2lzdGVyU2VydmljZSB9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qb2ludFNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbiB9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9SZWRBcHBTaWRlUGFuZWxDb25maWcnO1xuXG5pbXBvcnQgeyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVQbnJGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0nO1xuaW1wb3J0IHsgY2FsbExhc0xheCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxsTGFzTGF4JztcbmltcG9ydCB7IHNob3dSdW50aW1lIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dSdW50aW1lJztcbmltcG9ydCB7IHNob3dJbnRlcnN0aXRpYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbCc7XG5pbXBvcnQgeyBzaG93QWdlbnRQcm9maWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUnO1xuaW1wb3J0IHsgc2hvd0Jhbm5lcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMnO1xuaW1wb3J0IHsgcmVmcmVzaFRyaXBTdW1tYXJ5IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeSc7XG5pbXBvcnQgeyBjYWxsRXh0ZXJuYWxTZXJ2aWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxFeHRlcm5hbFNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSwgaGlkZU5vdGlmaWNhdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybSc7XG5cbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcnO1xuXG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5cbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RyYXdlclNlcnZpY2UnO1xuaW1wb3J0IHsgTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9jb25maWdzL2RyYXdlci9MYXJnZVdpZGdldERyYXdlckNvbmZpZyc7XG5cbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1RpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlJztcbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3JztcblxuaW1wb3J0IHsgSUFpclByaWNpbmdTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvc2VydmljZXMvSUFpclByaWNpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByaWNpbmdUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUnO1xuaW1wb3J0IHsgUHJpY2luZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVmlldyc7XG5cbmltcG9ydCB7IE5vdmljZUJ1dHRvbkNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL05vdmljZUJ1dHRvbkNvbmZpZyc7XG5pbXBvcnQgeyBTYW1wbGVDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdzL1NhbXBsZUNvbXBvbmVudCc7XG5cbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Q29tbWFuZE1lc3NhZ2VSZXNlcnZhdGlvblJzfSBmcm9tICdzYWJyZS1uZ3YtcG9zLWNkbS9yZXNlcnZhdGlvbic7XG5pbXBvcnQge0lSZXNlcnZhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1yZXNlcnZhdGlvbi9zZXJ2aWNlcy9JUmVzZXJ2YXRpb25TZXJ2aWNlJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5cbmV4cG9ydCBjbGFzcyBNYWluIGV4dGVuZHMgTW9kdWxlIHtcbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgdGhpcy5yZWdpc3RlclNlcnZpY2VzKCk7XG4gICAgdGhpcy5zZXR1cFNpZGVQYW5lbEJ1dHRvbnMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwU2hvcHBpbmdUaWxlKCk7XG5cbiAgICBjb25zdCBvbkNsaWNrID0gKGlzT3BlbjogYm9vbGVhbikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0NvbW1hbmQgSGVscGVyIEJ1dHRvbiBvbkNsaWNrJywgaXNPcGVuKTtcbiAgICAgIC8vIGluc2VydCBsb2dpYyBoZXJlXG4gICAgfTtcbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0NvbW1hbmQgSGVscGVyIFBvcG92ZXIgb25DbG9zZScpO1xuICAgICAgLy8gaW5zZXJ0IGxvZ2ljIGhlcmVcbiAgICB9O1xuXG4gICAgY29uc3QgY29uZmlnID0gbmV3IE5vdmljZUJ1dHRvbkNvbmZpZyhcbiAgICAgIC8vIERlZmluZSBsYWJlbCBmb3IgdGhpcyBidXR0b24uXG4gICAgICAnU2FtcGxlIGJ1dHRvbicsXG4gICAgICAvLyBPbiB0b3Agb2YgdGV4dCB3ZSBhZGQgYW4gaWNvbiBmcm9tIEZvbnQgQXdlc29tZS5cbiAgICAgICdmYS1jb21tZW50JyxcbiAgICAgIC8vIERlY29yYXRvciBpcyB1c2VkIHRvIGFwcGx5IHN0eWxlcyB0byB0aGUgYnV0dG9uIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gQ29tbWFuZCBIZWxwZXIgQmFyLlxuICAgICAgJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWNvbW1hbmQtaGVscGVyLWJ1dHRvbi13ZWItbW9kdWxlJyxcbiAgICAgIC8vIEJhc2UgUmVhY3QgY2xhc3MgdG8gYmUgbW91bnRlZCBhcyByb290IGluIFJlYWN0RE9NLnJlbmRlcigpLlxuICAgICAgU2FtcGxlQ29tcG9uZW50LFxuICAgICAgLy8gUHJpb3JpdHkgb2YgdGhlIGJ1dHRvbiBkZXRlcm1pbmVzIGJ1dHRvbiBwb3NpdGlvbiBpbiB0aGUgQ29tbWFuZCBIZWxwZXIgQmFyLlxuICAgICAgLTEwMDAsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25DbG9zZVxuICAgICk7XG5cbiAgICAvLyBBZGQgYnV0dG9uIGNvbmZpZ3VyYXRpb24gdG8gYWRkIGEgY29tbWFuZCBoZWxwZXIgYnV0dG9uLlxuICAgIGdldFNlcnZpY2UoRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlKS5hZGRDb25maWcoJ25vdmljZS1idXR0b25zJywgY29uZmlnKTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNlcnZpY2VzKCk6IHZvaWQge1xuICAgIHJlZ2lzdGVyU2VydmljZShDdXN0b21Xb3JrZmxvd1NlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNpZGVQYW5lbEJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZUNzc0NsYXNzTmFtZXMgPSAnYnRuIGJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b24gcmVkYXBwLXdlYi1jdXN0b213b3JrZmxvdyc7XG5cbiAgICBjb25zdCBzZWxmUmVtb3ZlQnRuID0gbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVtb3ZhYmxlIEJ1dHRvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZW1vdmUnLCAoKSA9PiB7XG4gICAgICBzZWxmUmVtb3ZlQnRuLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29uZmlnID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGJhbm5lcnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYmFubmVycycsIHNob3dCYW5uZXJzKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0V4dGVybmFsIHNlcnZpY2UgY2FsbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1leHRlcm5hbHNlcnZpY2VjYWxsJywgY2FsbEV4dGVybmFsU2VydmljZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWRBcHAgcGxhdGZvcm0nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcGxhdGZvcm0nLCBzaG93UnVudGltZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdMQVMgLSBMQVgnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWN0aW9uJywgY2FsbExhc0xheCksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgUE5SJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBucicsIGNyZWF0ZVBuckZvcm0pLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBpbnRlcnN0aXRpYWwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaW50ZXJzdGl0aWFsJywgc2hvd0ludGVyc3RpdGlhbCksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IEFnZW50IFByb2ZpbGUnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWdlbnRwcm9maWxlJywgc2hvd0FnZW50UHJvZmlsZSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWZyZXNoIFRyaXAgU3VtbWFyeScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZWZyZXNodHJpcCcsIHJlZnJlc2hUcmlwU3VtbWFyeSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgbm90aWZpY2F0aW9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWNyZWF0ZU5vdGlmaWNhdGlvbicsIGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0pLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignSGlkZSBub3RpZmljYXRpb25zJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWhpZGVOb3RpZmljYXRpb24nLCBoaWRlTm90aWZpY2F0aW9ucyksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZXNlcnZhdGlvbicsICdidG4gYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvbiByZWRhcHAtd2ViLXJlc2VydmF0aW9uJywgdGhpcy5zaG93UmVzZXJ2YXRpb24pLFxuICAgICAgc2VsZlJlbW92ZUJ0blxuICAgIF0pO1xuXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygncmVkQXBwU2lkZVBhbmVsJywgY29uZmlnKTtcbiAgfVxuXG4gIC8vIEF2YWlsYWJpbGl0eVRpbGVcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgYWlyQXZhaWxhYmlsaXR5U2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSk7IC8vIDI9Q0JANT09ODkgQTVAMjhBIDQ7TyA/QDU0PkFCMDI7NT04TyA0MD09S0UgMiBAMDw6MEUgQXZhaWxhYmlsaXR5XG5cbiAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuXG4gICAgICBjb25zb2xlLmxvZygnPeUgW0F2YWlsYWJpbGl0eV0gUmVjZWl2ZWQgRGF0YTonLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XG5cbiAgICAgIGNvbnN0IG1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ1NlYXRNYXBzIEFCQyAzNjAnLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcEF2YWlsVmlldywgZGF0YSksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH07XG5cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobW9kYWxPcHRpb25zKTtcbiAgICB9O1xuXG4gICAgYWlyQXZhaWxhYmlsaXR5U2VydmljZS5jcmVhdGVBaXJBdmFpbGFiaWxpdHlTZWFyY2hUaWxlKFxuICAgICAgU2VhdE1hcEF2YWlsVGlsZSxcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwsXG4gICAgICAnU2VhdE1hcHMgQUJDIDM2MCdcbiAgICApO1xuICB9XG5cbiAgLy8gU2hvcHBpbmdUaWxlIFxuICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcFNob3BwaW5nVGlsZSgpOiB2b2lkIHtcbiAgICAvLyA+P0A1NDU7TzU8IGNvbmZpZyBzaG9wcGluZ0RyYXdlckNvbmZpZ1xuICAgIGNvbnN0IHNob3BwaW5nRHJhd2VyQ29uZmlnID0gbmV3IExhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnKFNlYXRNYXBTaG9wcGluZ1RpbGUsIFNlYXRNYXBTaG9wcGluZ1ZpZXcsIHtcbiAgICAgIHRpdGxlOiAnU2hvcHBpbmcgVGlsZSBXaWRnZXQnIC8vIDcwMz47PjI+OiA+Oj0wXG4gICAgfSk7XG4gICAgLy8gMks3MksyMDU8IEE1QDI4QSBBIE1CODwgY29uZmlnIHNob3BwaW5nRHJhd2VyQ29uZmlnXG4gICAgZ2V0U2VydmljZShEcmF3ZXJTZXJ2aWNlKS5hZGRDb25maWcoWydzaG9wcGluZy1mbGlnaHQtc2VnbWVudCddLCBzaG9wcGluZ0RyYXdlckNvbmZpZyk7XG5cbiAgICAvLyBQcmljaW5nIFRpbGVcbiAgICBjb25zdCBzaG93UHJpY2luZ01vZGFsID0gdGhpcy5jcmVhdGVTaG93TW9kYWxBY3Rpb24oUHJpY2luZ1ZpZXcsICdQcmljaW5nIERhdGEnKTtcbiAgICBnZXRTZXJ2aWNlKElBaXJQcmljaW5nU2VydmljZSkuY3JlYXRlUHJpY2luZ1RpbGUoUHJpY2luZ1RpbGUsIHNob3dQcmljaW5nTW9kYWwsICdBQkMgU2VhdCBNYXAnKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTaG93TW9kYWxBY3Rpb24odmlldzogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8YW55PiwgaGVhZGVyOiBzdHJpbmcpOiAoZGF0YTogYW55KSA9PiB2b2lkIHtcbiAgICByZXR1cm4gKChkYXRhKSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCc95SBbUHJpY2luZ10gUmVjZWl2ZWQgRGF0YSAoRnVsbCBPYmplY3QpOicsIE9iamVjdC5rZXlzKGRhdGEpKTtcbiAgICAgIGNvbnNvbGUubG9nKCc95SBbUHJpY2luZ10gRnVsbCBEYXRhOicsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcblxuICAgICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgdmlldyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgICksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH1cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gUmVzZXJ2YXRpb24gSW5mbyBXaW5kb3dcbiAgcHJpdmF0ZSBzaG93UmVzZXJ2YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDE1MDAwKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uUHJvbWlzZTogUHJvbWlzZTxDb21tYW5kTWVzc2FnZVJlc2VydmF0aW9uUnM+ID0gZ2V0U2VydmljZShJUmVzZXJ2YXRpb25TZXJ2aWNlKS5nZXRSZXNlcnZhdGlvbigpO1xuXG4gICAgcmVzZXJ2YXRpb25Qcm9taXNlLnRoZW4oKHJlc2VydmF0aW9uOiBDb21tYW5kTWVzc2FnZVJlc2VydmF0aW9uUnMpID0+IHtcbiAgICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnUmVzZXJ2YXRpb24gRGF0YScsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAncmVzZXJ2YXRpb25EYXRhJyxcbiAgICAgICAgICAgIHR5cGU6ICdQQVJBR1JBUEgnLFxuICAgICAgICAgICAgdGV4dDogJ2BgYFxcbicgK1xuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShyZXNlcnZhdGlvbiwgbnVsbCwgMikgK1xuICAgICAgICAgICAgICAnXFxuYGBgJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgICAgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgcmVjZWl2aW5nIHJlc2VydmF0aW9uJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNsYXNzIFNhbXBsZUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWNvcmQ8c3RyaW5nLCBuZXZlcj4+IHtcblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY29tbWFuZC1oZWxwZXItYnV0dG9uLXdlYi1tb2R1bGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGUtY29tcG9uZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgSGVsbG8gV29ybGQhISFcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== 