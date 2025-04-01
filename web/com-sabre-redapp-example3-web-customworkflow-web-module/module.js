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
    console.log('🔹 [SeatMapComponent] received props:', { config: config, data: data });
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
            } }, "ABC Seat Map")));
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uniqueRenderKey = 0; // Добавляем уникальный ключ
        return _this;
    }
    SeatMapShoppingTile.prototype.selfDrawerContextModelPropagated = function (cpa) {
        this.uniqueRenderKey++; // Увеличиваем ключ каждый раз при вызове метода
        var flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map(function (segment) { return segment.getFlightNumber(); });
        var segmentsHtml = flightNumbers.length > 1
            ? "<div style=\"margin-bottom: 5px; text-align: center;\">Segments:<br />" + flightNumbers.join(', ') + "</div>"
            : "<div style=\"margin-bottom: 5px; text-align: center;\">Segment: " + (flightNumbers.join(', ') || 'N/A') + "</div>";
        // Добавляем кнопку ABC SeatMap
        var buttonHtml = "\n        <div style=\"margin-top: 4px; display: flex; justify-content: center;\">\n            <button class=\"abc-seatmap-button\" style=\"\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: 6px 10px 20px 10px;\n                background-color: #2f73bc;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n                font-size: 12px;\n                height: 24px;\n            \">\n                ABC Seat Map\n            </button>\n        </div>\n    ";
        this.setDataContent(segmentsHtml + buttonHtml);
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
                cabinClass: 'A' // Пример, можно передавать реальные данные
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService","sabre-ngv-app/app/services/impl/DrawerService","sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapShoppingView","sabre-ngv-pricing/services/IAirPricingService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/PricingView"], false, function (require, exports, module) {
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
            var ngvModalOptions = {
                header: header,
                component: React.createElement(view, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(ngvModalOptions);
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module", ["com-sabre-redapp-example3-web-customworkflow-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50QXZhaWwudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50UHJpY2luZy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZy50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldy5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdWaWV3LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcEF2YWlsTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsRm9yU2VnbWVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC90cmFuc2Zvcm1GbGlnaHQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1ByaWNpbmdWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdXRpbHMvdHJhbnNmb3JtRmxpZ2h0LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFRpbGUuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTSxzQkFBc0IsR0FBRyxVQUFDLElBQVMsRUFBRSxZQUF3Qjs7SUFBeEIsNkJBQUEsRUFBQSxnQkFBd0I7SUFDeEUsSUFBTSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRyxZQUFZLENBQUMsQ0FBQztJQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBb0IsWUFBWSxlQUFZLENBQUMsQ0FBQztRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLFNBQVM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztLQUNIO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUVwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1FBQzdGLE9BQU87WUFDTCxFQUFFLEVBQUUsU0FBUztZQUNiLFdBQVcsRUFBRSxDQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsZ0JBQWdCLDBDQUFFLG1CQUFtQiwwQ0FBRSxJQUFJLEtBQUksRUFBRTtZQUN0RSxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVksSUFB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Q3JFO0lBTE0sa0NBQVksR0FBRywrRUFBK0UsQ0FBQztJQU0xRyw0QkFBQztDQVBELEFBT0MsQ0FQMEMsaUNBQWUsR0FPekQ7QUFQWSxzREFBcUI7Ozs7Ozs7OztBQ05sQywyRkFBd0Y7QUFDeEYsc0NBQXNDO0FBRS9CLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxLQUFhLEVBQUUsR0FBVztJQUM5RCxJQUFNLElBQUksR0FBZTtRQUNyQixLQUFLLE9BQUE7UUFDTCxNQUFNLEVBQUU7WUFDSjtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLEdBQUc7YUFDWjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksRUFBRSxFQUFFLFFBQVE7Z0JBQ1osS0FBSyxFQUFFLE9BQU87YUFDakI7U0FDSjtLQUNKLENBQUM7SUFDRixJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsdUJBQXVCLDJCQWtCbkM7Ozs7OztBQ3RCRDtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0EiLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldEZsaWdodEZyb21TYWJyZURhdGEgPSAoZGF0YTogYW55LCBzZWdtZW50SW5kZXg6IG51bWJlciA9IDApID0+IHtcbiAgY29uc3Qgc2VnbWVudCA9IGRhdGEuZmxpZ2h0U2VnbWVudHM/LltzZWdtZW50SW5kZXhdO1xuXG4gIGlmICghc2VnbWVudCkge1xuICAgIGNvbnNvbGUud2FybihgoA8gU2VnbWVudCBpbmRleCAke3NlZ21lbnRJbmRleH0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnVU5LTk9XTicsXG4gICAgICBhaXJsaW5lQ29kZTogJycsXG4gICAgICBmbGlnaHRObzogJycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnJyxcbiAgICAgIGRlcGFydHVyZTogJycsXG4gICAgICBhcnJpdmFsOiAnJyxcbiAgICAgIGNhYmluQ2xhc3M6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCc9zCBbZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YV0gHz47PUs1IDQwPT1LNSBBNTM8NT1CMDonLCBKU09OLnN0cmluZ2lmeShzZWdtZW50LCBudWxsLCAyKSk7XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LkRlcGFydHVyZURhdGVUaW1lO1xuXG4gIGlmICghZGVwYXJ0dXJlRGF0ZVRpbWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ6APIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSBEZXBhcnR1cmVEYXRlVGltZSA+QkFDQkFCMkM1QiAyIDQwPT1LRSBBNTM8NT1CMCEnKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJycsXG4gICAgICBmbGlnaHRObzogc2VnbWVudC5GbGlnaHROdW1iZXIgfHwgJycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnJyxcbiAgICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGNhYmluQ2xhc3M6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGRlcGFydHVyZURhdGUgPSBkZXBhcnR1cmVEYXRlVGltZS5zcGxpdCgnVCcpWzBdOyAvLyAeQUIwMjtPNTwgQj47TDo+IDQwQkNcblxuICByZXR1cm4ge1xuICAgIGlkOiAnMDAxJyxcbiAgICBhaXJsaW5lQ29kZTogc2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlcixcbiAgICBkZXBhcnR1cmVEYXRlLFxuICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBhcnJpdmFsOiBzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgY2FiaW5DbGFzczogJ0EnXG4gIH07XG59OyIsImV4cG9ydCBjb25zdCBxdWlja2V0Q29uZmlnID0ge1xuICAgIHdpZHRoOiA0MDAsXG4gICAgbGFuZzogJ0VOJyxcbiAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICByaWdodFRvTGVmdDogZmFsc2UsXG4gICAgdmlzaWJsZUZ1c2VsYWdlOiB0cnVlLFxuICAgIHZpc2libGVXaW5nczogdHJ1ZSxcbiAgICBidWlsdEluRGVja1NlbGVjdG9yOiB0cnVlLFxuICAgIHNpbmdsZURlY2tNb2RlOiB0cnVlLFxuICAgIGJ1aWx0SW5Ub29sdGlwOiB0cnVlLFxuICAgIGV4dGVybmFsUGFzc2VuZ2VyTWFuYWdlbWVudDogZmFsc2UsXG4gICAgdG9vbHRpcE9uSG92ZXI6IGZhbHNlLFxuICAgIGNvbG9yVGhlbWU6IHtcbiAgICAgICAgc2VhdExhYmVsQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHNlYXRTdHJva2VDb2xvcjogJ2dyYXknXG4gICAgfVxufTsiLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldEZsaWdodEZyb21TYWJyZURhdGEgfSBmcm9tICcuL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTtcbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudEF2YWlsOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vID0NIBs+MzhAQzU8IDJFPjRPSTg1IDQwPT1LNVxuICBjb25zb2xlLmxvZygnPTkgW1NlYXRNYXBDb21wb25lbnRdIHJlY2VpdmVkIHByb3BzOicsIHsgY29uZmlnLCBkYXRhIH0pO1xuXG4gIGNvbnN0IGZsaWdodCA9IGdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KTsgLy8gTUI+IEA1OUEgQSBBNTM8NT1CPjxcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0KTtcbiAgXG4gIC8vIGZsaWdodCA0O08gP0A+MjVAOjhcbiAgLy8gZmxpZ2h0OntcbiAgLy8gICBpZDogJzAwMScsIFxuICAvLyAgICAgYWlybGluZUNvZGU6ICdMSCcsXG4gIC8vICAgICBmbGlnaHRObzogJzEyMycsXG4gIC8vICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNC0yMicsIFxuICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgLy8gICAgIGFycml2YWw6ICdGUkEnLFxuICAvLyAgICAgY2FiaW5DbGFzczogJ0EnXG4gIC8vIH0sXG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodCxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA8PjY9PiBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShmbGlnaHQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwQ29tcG9uZW50XSBpZnJhbWUgbG9hZGVkLCBzZW5kaW5nIGRhdGEuLi4nKTtcbiAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudEF2YWlsOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldEZsaWdodEZyb21TYWJyZURhdGEgfSBmcm9tICcuL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTtcbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFByaWNpbmc6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zOEBDNTwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbi8vIB8+O0NHMDU8IEI1OkNJODkgQTUzPDU9QlxuY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuY29uc3QgY3VycmVudFNlZ21lbnQgPSBmbGlnaHRTZWdtZW50c1tzZWdtZW50SW5kZXhdIHx8IHt9O1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0U2VnbWVudHMpO1xuICBcbiAgLy8gZmxpZ2h0IDQ7TyA/QD4yNUA6OFxuICAvLyBmbGlnaHQ6e1xuICAvLyAgIGlkOiAnMDAxJywgXG4gIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJywgXG4gIC8vICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAvLyAgICAgYXJyaXZhbDogJ0ZSQScsXG4gIC8vICAgICBjYWJpbkNsYXNzOiAnQSdcbiAgLy8gfSxcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0OiB7XG4gICAgICAgIGlkOiAnMDAxJywgIC8vICMxNTQ4QUwsIEdCPiA/NUA1NDA1QkFPIGlkXG4gICAgICAgIGFpcmxpbmVDb2RlOiBjdXJyZW50U2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdMSCcsXG4gICAgICAgIGZsaWdodE5vOiBjdXJyZW50U2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzEyMycsXG4gICAgICAgIGRlcGFydHVyZURhdGU6IGN1cnJlbnRTZWdtZW50LmRlcGFydHVyZURhdGVUaW1lIHx8ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgZGVwYXJ0dXJlOiBjdXJyZW50U2VnbWVudC5vcmlnaW4gfHwgJ01VQycsXG4gICAgICAgIGFycml2YWw6IGN1cnJlbnRTZWdtZW50LmRlc3RpbmF0aW9uIHx8ICdGUkEnLFxuICAgICAgICBjYWJpbkNsYXNzOiBjdXJyZW50U2VnbWVudC5jYWJpbkNsYXNzIHx8ICdBJ1xuICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBhdmFpbGFiaWxpdHk6IFtcbiAgICAgIHsgbGFiZWw6ICcxQScsIHByaWNlOiA1MCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2dyZWVuJywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcxQicsIHByaWNlOiA0NSwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ3llbGxvdycsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMkEnLCBwcmljZTogMzAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdsaWdodGJsdWUnIH1cbiAgICBdLFxuICAgIHBhc3NlbmdlcnM6IFt7IGlkOiAnUEFYMScsIG5hbWU6ICcYMjA9PjIgGC4YLicsIHR5cGU6ICdBRFQnIH1dXG4gIH07XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSBvciBjb250ZW50V2luZG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcblxuICAgICAgLy8gPD42PT4gQDBBOj48PDU9QjhAPjIwQkwgP0A4ID01PjFFPjQ4PD5BQjhcbiAgICAgIC8vIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgIC8vIHBhc3NlbmdlcnM6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLnBhc3NlbmdlcnMpXG5cbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZSB3aXRoIGRhdGE6Jywge1xuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICBjb25zb2xlLmxvZygnPuAgU2VhdE1hcENvbXBvbmVudCBpcyByZW5kZXJpbmchJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPeAPIFNlYXRNYXBDb21wb25lbnQgbW91bnRlZCcpO1xuICAgIGNvbnNvbGUubG9nKGA9BCBTZWdtZW50IGluZGV4IGNoYW5nZWQ6ICR7c2VnbWVudEluZGV4fWApO1xuICAgIHNlbmRUb0lmcmFtZSgpOyAvLyA+Qj9AMDI6MCA/QDggODc8NT01PTg4IEE1Mzw1PUIwXG4gIH0sIFtzZWdtZW50SW5kZXhdKTtcblxuICByZXR1cm4gKFxuXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICB7LyogPjo9PiBBIDQwPT1LPDggPiBANTlBNSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIGZvbnRTaXplOiAnMC45cmVtJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgPHN0cm9uZz496yBGbGlnaHQgaW5mbzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoY3VycmVudFNlZ21lbnQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwQ29tcG9uZW50XSBpZnJhbWUgbG9hZGVkLCBzZW5kaW5nIGRhdGEuLi4nKTtcbiAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFByaWNpbmc7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55OyAvLyAUMD09SzUsIDo+Qj5ASzUgP0A4RT40T0IgODcgU2hvcHBpbmcgQUY1PTBAOE9cbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4vLyAfPjtDRzA1PCBCNTpDSTg5IEE1Mzw1PUJcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuICBjb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB8+O0NHNT09SzUgNDA9PUs1OicsIGRhdGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuXG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodDoge1xuXG4gICAgICAgIGlkOiAnMDAxJywgIC8vICMxNTQ4QUwsIEdCPiA/NUA1NDA1QkFPIGlkXG4gICAgICAgIGFpcmxpbmVDb2RlOiBjdXJyZW50U2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdMSCcsXG4gICAgICAgIGZsaWdodE5vOiBjdXJyZW50U2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzEyMycsXG4gICAgICAgIGRlcGFydHVyZURhdGU6IGN1cnJlbnRTZWdtZW50LmRlcGFydHVyZURhdGVUaW1lIHx8ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgZGVwYXJ0dXJlOiBjdXJyZW50U2VnbWVudC5vcmlnaW4gfHwgJ01VQycsXG4gICAgICAgIGFycml2YWw6IGN1cnJlbnRTZWdtZW50LmRlc3RpbmF0aW9uIHx8ICdGUkEnLFxuICAgICAgICBjYWJpbkNsYXNzOiBjdXJyZW50U2VnbWVudC5jYWJpbkNsYXNzIHx8ICdBJ1xuXG4gICAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gIUQ+QDw4QD4yMD09SzUgNDA9PUs1IDQ7TyA+Qj9AMDI6ODonLCBzZWF0TWFwRGF0YSk7XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSA4OzggY29udGVudFdpbmRvdyA9NSA0PkFCQz81PS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB5CP0AwMjowIDQwPT1LRSAyIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2VuZFRvSWZyYW1lKCk7XG4gIH0sIFtzZWdtZW50SW5kZXhdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qIEZsaWdodCBJbmZvIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGN1cnJlbnRTZWdtZW50LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdYWCd9IHtzZWdtZW50LmZsaWdodE51bWJlciB8fCAnMDAwJ306IHtzZWdtZW50Lm9yaWdpbn0gkiB7c2VnbWVudC5kZXN0aW5hdGlvbn1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXtzZW5kVG9JZnJhbWV9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOyIsbnVsbCxudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudEF2YWlsIGZyb20gJy4vU2VhdE1hcENvbXBvbmVudEF2YWlsJztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuLy8gZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwQXZhaWxNb2RhbChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogdm9pZCB7XG5cbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyOiAnU2VhdE1hcCBWaWV3ZXInLFxuICAgIC8vIEE+NzQwNTwgUmVhY3QtOj48Pz49NT1CID0wID5BPT4yNSBTZWF0TWFwQ29tcG9uZW50XG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnRBdmFpbCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCBkYXRhIC0gPjFKNTpCIEI4PzAgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBGNTs4Oj48XG4gICAgfSksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgXG59IixudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZyBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRQcmljaW5nJztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG5pbXBvcnQgeyBBaXJQcmljaW5nRGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3Jlc3BvbnNlL2ludGVyZmFjZXMvQWlyUHJpY2luZ0RhdGEnO1xuXG4vLyBkYXRhOiBBaXJQcmljaW5nRGF0YVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoZGF0YTogQWlyUHJpY2luZ0RhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudFByaWNpbmcsIHtcbiAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgIGRhdGEgLy8gPzVANTQwUTwgZGF0YSAtID4xSjU6QiBCOD8wIEFpclByaWNpbmdEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICBcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuLy8gZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YVxuXG5pbnRlcmZhY2UgU2VhdE1hcFNob3BwaW5nRGF0YSB7XG4gICAgZmxpZ2h0U2VnbWVudHM6IGFueVtdOyAgLy8gHD42PT4gNzA8NT04QkwgPTAgOj49OkA1Qj1LOSBCOD8sIDVBOzggODcyNUFCNT1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwU2hvcHBpbmdNb2RhbChkYXRhOiBTZWF0TWFwU2hvcHBpbmdEYXRhKTogdm9pZCB7XG5cbiAgICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAgIGlmICghbW9kYWxTZXJ2aWNlIHx8IHR5cGVvZiBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBQdWJsaWNNb2RhbHNTZXJ2aWNlIG5vdCBhdmFpbGFibGUgb3Igbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAgLy8gPcwgFzA6QEtCTCAyQTUgP0A1NEs0Q0k4NSA8PjQwO0w9SzUgPjo9MCA/NUA1NCA+QjpAS0I4NTwgPT4yPjM+XG4gICAgIHRyeSB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEFsbCBwcmV2aW91cyBtb2RhbHMgY2xvc2VkLicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3IgaGlkaW5nIG1vZGFsczonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnQUJDIFNlYXRNYXAgU2hvcHBpbmcgVmlld2VyJyxcbiAgICAgICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSksXG4gICAgICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIFNob3BwaW5nIE1vZGFsXSBDbG9zZWQnKVxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPcwgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gTW9kYWwgZGF0YTonLCBkYXRhKTtcblxuICAgIC8vIB9APjI1QDowID0wIDQ+QUJDPz0+QUJMIDw1Qj40MCBgc2hvd1JlYWN0TW9kYWxgXG4gICAgdHJ5IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEVycm9yIHNob3dpbmcgbW9kYWw6JywgZXJyb3IpO1xuICAgIH1cblxufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtBaXJQcmljaW5nRGF0YX0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvcmVzcG9uc2UvaW50ZXJmYWNlcy9BaXJQcmljaW5nRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBQcmljaW5nVGlsZSA9IChkYXRhOiBBaXJQcmljaW5nRGF0YSkgOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2RrLXByaWNpbmctY3VzdG9tLXRpbGUtY29udGVudFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBwYWRkaW5nOiAnMTBweCcgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5BQkMgU2VhdCBNYXA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJjLXNlYXRtYXAtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNzNiYycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCdcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEFCQyBTZWF0IE1hcFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBaXJQcmljaW5nRGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3Jlc3BvbnNlL2ludGVyZmFjZXMvQWlyUHJpY2luZ0RhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwUHJpY2luZ01vZGFsJztcblxuLy8gVE9ETyA6PkBANTpCPUs5IDJLMT5AIEE1Mzw1PUIwXG5cbmV4cG9ydCBjb25zdCBQcmljaW5nVmlldyA9IChkYXRhOiBBaXJQcmljaW5nRGF0YSkgOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9gCBQcmljaW5nVmlldyBkYXRhOicsIGRhdGEpOyAvLyAbPjMgNDtPID5COzA0OjhcbiAgICAgICAgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoZGF0YSk7IC8vIBJLNz4yIERDPTpGODggPz46MDcwIDw+NDA7TD0+Mz4gPjo9MCBjIDQwPT1LPDggKGRhdGEpXG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstcHJpY2luZy1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgICAgICBcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfSA+IFxuICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBcblxuLy8gaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG4vLyBpbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQ29udGV4dCc7XG4vLyBpbXBvcnQge0lTZWF0TWFwU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXNlYXRtYXAvc2VydmljZXMvSVNlYXRNYXBTZXJ2aWNlJztcblxuLy8gZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4vLyAgICAgY29uc3QgaGFuZGxlT3BlblNlYXRNYXAgPSBhc3luYyAoZmxpZ2h0U2VnbWVudE51bWJlcjogbnVtYmVyKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGA96yBPcGVuaW5nIFNlYXQgTWFwIGZvciBzZWdtZW50OiAke2ZsaWdodFNlZ21lbnROdW1iZXJ9YCk7XG4gICAgXG4vLyAgICAgICAgIHRyeSB7XG4vLyAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFNlcnZpY2UoSVNlYXRNYXBTZXJ2aWNlKS5vcGVuU2VhdE1hcEZvckZsaWdodFNlZ21lbnQoZmxpZ2h0U2VnbWVudE51bWJlcik7XG4gICAgXG4vLyAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm1vZGFsT3BlbmVkQ29ycmVjdGx5KSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgoA8gRXJyb3Igb3BlbmluZyBTZWF0IE1hcDogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9YCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBMIEZhaWxlZCB0byBvcGVuIFNlYXQgTWFwOmAsIGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH07XG5cbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbi8vICAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4vLyAgICAgICAgICAgICA8b2w+XG4vLyAgICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuLy8gICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5TZWF0TWFwKGluZGV4ICsgMSl9Pj6RIE9wZW4gU2VhdCBNYXA8L2J1dHRvbj5cbi8vICAgICAgICAgICAgICAgICAgICAgPC9saT5cbi8vICAgICAgICAgICAgICAgICApKX1cbi8vICAgICAgICAgICAgIDwvb2w+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICk7XG4vLyB9O1xuXG5cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBBdmFpbE1vZGFsIH0gZnJvbSAnLi4vc2hvd1NlYXRNYXBBdmFpbE1vZGFsJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFZpZXcgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCc9gCBTZWF0TWFwQXZhaWxWaWV3IGRhdGE6JywgZGF0YSk7IC8vIDs+MyAyID49QT47TFxuICAgICAgc2hvd1NlYXRNYXBBdmFpbE1vZGFsKGRhdGEpOyAvLyAySzdLMjA1PCBEQz06RjhOID8+OjA3MCA8PjQwO0w9PjM+ID46PTAgYyA0MD09Szw4IChkYXRhKVxuICAgIH0sIFtdKTtcbiAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICA8cD4eQjpASzIwNTwgU2VhdE1hcCBWaWV3ZXIuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9OyIsImltcG9ydCB7VGlsZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZSc7XG5pbXBvcnQge1RpbGVPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlT3B0aW9ucyc7XG5pbXBvcnQge0ZsaWdodFNlZ21lbnR9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9kYXRhL2ZsaWdodC9GbGlnaHRTZWdtZW50JztcbmltcG9ydCB7V2l0aG91dEZvY3VzT25DbGlja30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL21peGlucy9XaXRob3V0Rm9jdXNPbkNsaWNrJztcbmltcG9ydCB7SW5pdGlhbH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL0luaXRpYWwnO1xuaW1wb3J0IHtNaXhpbn0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL01peGluJztcbmltcG9ydCB7Q3NzQ2xhc3N9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlJywgeyBvdmVyd3JpdGU6IGZhbHNlIH0pXG5ASW5pdGlhbDxUaWxlT3B0aW9ucz4oe1xuICAgIGNhcHRpb246ICdBQkMgU2VhdE1hcCcsIC8vIDg8TyB0aWxlXG4gICAgY2xhc3NOYW1lOiAnd2ViLWFpci1zaG9wcGluZy13aWRnZXQtc2FtcGxlJ1xufSlcbkBNaXhpbihXaXRob3V0Rm9jdXNPbkNsaWNrKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1RpbGUgZXh0ZW5kcyBUaWxlPEZsaWdodFNlZ21lbnQ+IGltcGxlbWVudHMgV2l0aG91dEZvY3VzT25DbGljayB7XG5cbiAgICBwcml2YXRlIHVuaXF1ZVJlbmRlcktleSA9IDA7IC8vIBQ+MTAyO081PCBDPTg6MDtMPUs5IDo7TkdcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy51bmlxdWVSZW5kZXJLZXkrKzsgLy8gIzI1OzhHODIwNTwgOjtORyA6MDY0SzkgQDA3ID9AOCAySzc+MjUgPDVCPjQwXG5cbiAgICAgICAgY29uc3QgZmxpZ2h0TnVtYmVycyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCkubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LmdldEZsaWdodE51bWJlcigpKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudHNIdG1sID0gZmxpZ2h0TnVtYmVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+U2VnbWVudHM6PGJyIC8+JHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJyl9PC9kaXY+YFxuICAgICAgICAgICAgOiBgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDVweDsgdGV4dC1hbGlnbjogY2VudGVyO1wiPlNlZ21lbnQ6ICR7ZmxpZ2h0TnVtYmVycy5qb2luKCcsICcpIHx8ICdOL0EnfTwvZGl2PmA7XG4gICAgICAgIFxuICAgICAgICAvLyAUPjEwMjtPNTwgOj0+PzpDIEFCQyBTZWF0TWFwXG4gICAgICAgIGNvbnN0IGJ1dHRvbkh0bWwgPSBgXG4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiA0cHg7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFiYy1zZWF0bWFwLWJ1dHRvblwiIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDZweCAxMHB4IDIwcHggMTBweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3M2JjO1xuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICAgICAgXCI+XG4gICAgICAgICAgICAgICAgQUJDIFNlYXQgTWFwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAgICAgdGhpcy5zZXREYXRhQ29udGVudChzZWdtZW50c0h0bWwgKyBidXR0b25IdG1sKTtcbiAgICB9XG5cbiAgICBzZWxmU2VsZWN0ZWRGYXJlQ2hhbmdlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGEpO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nOyAgLy8gBSAvMj1LOSA4PD8+QEIgUmVhY3RET01cbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZyBmcm9tICcuLi9TZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4uL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuaW1wb3J0IHsgQ3NzQ2xhc3MgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L1RlbXBsYXRlJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJylcbkBUZW1wbGF0ZSgnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZTpTaG9wcGluZ1RpbGVWaWV3JylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3PEFic3RyYWN0TW9kZWw+IHtcblxuICAgIHByaXZhdGUgZmxpZ2h0U2VnbWVudHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZFNlZ21lbnRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkIGNhbGxlZCB3aXRoIGNwYTonLCBjcGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIEhhcmRjb2RlZCBmbGlnaHQgZGF0YTonLCBmbGlnaHREYXRhKTtcbiAgICAgICAgLy8gdGhpcy5mbGlnaHRTZWdtZW50cyA9IFtmbGlnaHREYXRhXTtcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZFNlZ21lbnRJbmRleCA9IDA7XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgICAgICB0aGlzLmZsaWdodFNlZ21lbnRzID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LmdldERlcGFydHVyZURhdGUoKTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcwMDEnLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRJZDogc2VnbWVudC5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCksXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKSxcbiAgICAgICAgICAgICAgICBhaXJNaWxlczogc2VnbWVudC5nZXRBaXJNaWxlcygpLFxuICAgICAgICAgICAgICAgIGRlcGFydHVyZURhdGVUaW1lOiBkZXBhcnR1cmVEYXRlVGltZSA/IGRlcGFydHVyZURhdGVUaW1lLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICdVTktOT1dOJywgLy8gFD4xMDI7NT04NSA0MEJLXG4gICAgICAgICAgICAgICAgbWFya2V0aW5nQWlybGluZTogc2VnbWVudC5nZXRNYXJrZXRpbmdBaXJsaW5lKCksXG4gICAgICAgICAgICAgICAgY2FiaW5DbGFzczogJ0EnIC8vIB9AODw1QCwgPD42PT4gPzVANTQwMjBCTCBANTA7TD1LNSA0MD09SzVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIB9APjFDNTwgQDU9NDVAOEJMIFJlYWN0IDo+PD8+PTU9QiBBIDcwNDVANjo+OSwgR0I+MUsgMzBAMD1COEA+MjBCTCA9MDs4Rzg1IE07NTw1PUIwXG4gICAgICAgIHRoaXMudHJ5UmVuZGVyUmVhY3RDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyA9IDApIHtcbiAgICAgICAgY29uc3QgTUFYX0FUVEVNUFRTID0gMTA7XG4gICAgICAgIGNvbnN0IElOVEVSVkFMID0gNTAwOyAvLyAYPUI1QDIwOyA8NTY0QyA/Pj9LQjowPDggKDIgPDg7OzhBNTpDPTQwRSlcblxuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcblxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9MDk0NT0uIB0wRzg9MDU8IEA1PTQ1QDg9MyBSZWFjdCA6Pjw/Pj01PUIwLicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHRzIDwgTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYKAPIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9NSA9MDk0NT0uIB8+MkI+QD0wTyA/Pj9LQjowIEc1QDU3ICR7SU5URVJWQUx9IDxBLiAfPj9LQjowICR7YXR0ZW1wdHMgKyAxfS8ke01BWF9BVFRFTVBUU31gKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyArIDEpLCBJTlRFUlZBTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAdNSBDNDA7PkFMID0wOUI4IE07NTw1PUIgc2VhdG1hcC1yb290ID8+QTs1IDwwOkE4PDA7TD0+Mz4gRzhBOzAgPz4/S0I+Oi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJlYWN0Q29tcG9uZW50KCkge1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcbiAgICBcbiAgICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyAeRzhJMDU8ID9ANTRLNENJODkgQDU9NDVAID81QDU0IEI1PCwgOjA6IEE9PjIwID5CQDU9NDVAOEJMIFJlYWN0IDo+PD8+PTU9QlxuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShyb290RWxlbWVudCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGZsaWdodFNlZ21lbnRzOiB0aGlzLmZsaWdodFNlZ21lbnRzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4XG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudFNob3BwaW5nLCB7IGNvbmZpZzogcXVpY2tldENvbmZpZywgZGF0YSB9KSxcbiAgICAgICAgICAgICAgICByb290RWxlbWVudFxuICAgICAgICAgICAgKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gUmVhY3QgQ29tcG9uZW50IENBPzVIPT4gPkJANT00NUA1PSAyICNzZWF0bWFwLXJvb3QuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIEEgaWQ9XCJzZWF0bWFwLXJvb3RcIiA9NSA9MDk0NT0gP0A4ID8+P0tCOjUgQDU9NDVAOD0zMC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7UHVibGljTW9kYWxzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHtSZWFjdE1vZGFsT3B0aW9uc30gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHtFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3J9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge2FjdGlvbnN9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zJztcbmltcG9ydCB7TW9kYWxDb21wb25lbnR9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudCc7XG5pbXBvcnQge0xvY2FsU3RvcmV9IGZyb20gJy4uL3JlZHVjZXJzL0xvY2FsU3RvcmUnO1xuXG5jb25zdCBtb2RhbFNlcnZpY2U6IFB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG5leHBvcnQgY29uc3QgY2FsbEV4dGVybmFsU2VydmljZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBsb2NhbFN0b3JlID0gbmV3IExvY2FsU3RvcmUoKTtcblxuICAgIGNvbnN0IG9uU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdG9yZURhdGEgPSBsb2NhbFN0b3JlLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSBKU09OLnBhcnNlKHN0b3JlRGF0YS5oZWFkZXJzKTtcblxuICAgICAgICBnZXRTZXJ2aWNlKEV4dGVybmFsU2VydmljZUNvbm5lY3RvcikuY2FsbFNlcnZpY2Uoc3RvcmVEYXRhLnVybCwgc3RvcmVEYXRhLm1ldGhvZCwgc3RvcmVEYXRhLmJvZHksIGhlYWRlcnMpLmRvbmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSBKU09OLnBhcnNlKHJlc3BvbnNlIGFzIHN0cmluZyk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlT2JqZWN0LCBudWxsLCAyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmUuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAge3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdyZXNwb25zZScsIG5ld1ZhbDogcmVzcG9uc2VTdHJpbmd9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLmNsb3NlUmVhY3RNb2RhbCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ndk1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ0V4dGVybmFsU2VydmljZUNvbm5lY3RvcicsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbENvbXBvbmVudCksXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdCxcbiAgICAgICAgYWN0aW9uczogYWN0aW9ucyhvbkNsb3NlLCBvblN1Ym1pdCksXG4gICAgICAgIHN0b3JlOiBsb2NhbFN0b3JlLnN0b3JlXG4gICAgfVxuXG4gICAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG5ndk1vZGFsT3B0aW9ucyk7XG59OyIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Y2YsIGdldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY2FsbExhc0xheCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcblxuICAgIGNmKCcxTEFTTEFYJykuc2VuZCgpLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuXG4gICAgICAgIGNvbnN0IGhhc1NpZ25JblJlc3BvbnNlID0gcmVzcG9uc2UuZ2V0RGF0YVN0cnVjdHMoKVxuICAgICAgICAgICAgLmZpbHRlcihkYXRhID0+IGRhdGFbJ2QuU2NyZWVuJ10gJiYgZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAubWFwKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAuc29tZShkYXRhID0+IGRhdGEuaW5jbHVkZXMoJ1NJR04gSU4nKSk7XG5cbiAgICAgICAgaWYgKGhhc1NpZ25JblJlc3BvbnNlKSB7XG4gICAgICAgICAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnRXJyb3InLCAnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCJpbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEcm9wZG93bkZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvRHJvcGRvd25GaWVsZCc7XG5pbXBvcnQge0lOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL3NlcnZpY2UvSU5vdGlmaWNhdGlvblNlcnZpY2UnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25UeXBlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL2ludGVyZmFjZXMvTm90aWZpY2F0aW9uVHlwZSc7XG5cbmNvbnN0IG5vdGlmaWNhdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnTm90aWZpY2F0aW9uJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aXRsZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY29udGVudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndHlwZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0RST1BET1dOJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ05vbmUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0luZm8nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oLT9bMS05XVswLTldKnwwKSQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lb3V0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpbWVvdXQgaW4gbXMnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdeKFsxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG5cbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzaG93Tm90aWZpY2F0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKGZvcm06IEN1c3RvbUZvcm0pOiB2b2lkID0+IHtcbiAgICBjb25zdCB0eXBlID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0eXBlJykgYXMgRHJvcGRvd25GaWVsZCkudmFsdWU7XG5cbiAgICBjb25zdCBpZCA9IGdldFNlcnZpY2UoSU5vdGlmaWNhdGlvblNlcnZpY2UpLnNob3dOb3RpZmljYXRpb24oe1xuICAgICAgICB0aXRsZTogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aXRsZScpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIGNvbnRlbnQ6IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnY29udGVudCcpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIHR5cGU6IHR5cGUgPT09ICdOb25lJyA/IHVuZGVmaW5lZCA6IHR5cGUgYXMgTm90aWZpY2F0aW9uVHlwZSxcbiAgICAgICAgcHJpb3JpdHk6IHBhcnNlSW50KChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncHJpb3JpdHknKSBhcyBUZXh0RmllbGQpLnZhbHVlKSxcbiAgICAgICAgdGltZW91dDogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aW1lb3V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZSlcbiAgICB9KTtcblxuICAgIG5vdGlmaWNhdGlvbnMucHVzaChpZCk7XG59XG5cbmV4cG9ydCBjb25zdCBoaWRlTm90aWZpY2F0aW9ucyA9ICgpID0+IHtcbiAgICBub3RpZmljYXRpb25zLmZvckVhY2goaWQgPT4gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuaGlkZU5vdGlmaWNhdGlvbihpZCkpO1xuICAgIG5vdGlmaWNhdGlvbnMubGVuZ3RoID0gMDtcbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0RhdGVzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9EYXRlc1NlcnZpY2UnO1xuaW1wb3J0IHtDb21tYW5kTWVzc2FnZUJhc2ljUnN9IGZyb20gJ3NhYnJlLW5ndi1wb3MtY2RtL2NvbW1zZyc7XG5pbXBvcnQge0lDb21tYW5kTWVzc2FnZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jb21tc2cvc2VydmljZXMvSUNvbW1hbmRNZXNzYWdlU2VydmljZSc7XG5pbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5cbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbnJGb3JtID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHRlbkRheXNBaGVhZEZsaWdodCA9ICcxJyArIGdldFNlcnZpY2UoRGF0ZXNTZXJ2aWNlKS5nZXROb3coKS5hZGQoMTAsICdkYXlzJykuZm9ybWF0KCdERE1NTScpLnRvVXBwZXJDYXNlKCkgKyAnTEFTTEFYXFx1MDBBNUFBJztcblxuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnQ3JlYXRlIFBOUicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICctRE9FL0pPSE4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGVuRGF5c0FoZWFkRmxpZ2h0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGlja2V0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzAxWTInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnYWdlbnQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWdlbnQgSW5mbycsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc2QUdFTlQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnOTEyMzQ1NjcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGltZUxpbWl0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpY2tldGluZyB0aW1lIGxpbWl0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzdUQVcvJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG4gICAgaWYgKHJlc3VsdC5hY3Rpb24gPT09ICdvaycpIHtcbiAgICAgICAgc2VsZlN1Ym1pdFBuckFjdGlvbihyZXN1bHQpO1xuICAgIH1cbn1cblxuY29uc3Qgc2VsZlN1Ym1pdFBuckFjdGlvbiA9IGFzeW5jIChmb3JtOiBDdXN0b21Gb3JtKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGNvbnN0IG5hbWVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICduYW1lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBmbGlnaHRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdmbGlnaHQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRpY2tldFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpY2tldCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgYWdlbnRJbmZvUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnYWdlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHBob25lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncGhvbmUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRhd1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVMaW1pdCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoMTUwMDApO1xuXG4gICAgY29uc3QgbmFtZVJzU3RhdHVzID0gYXdhaXQgc2VuZENvbW1hbmQobmFtZVJxLCAnTmFtZScpO1xuICAgIGNvbnN0IGZsaWdodHNTdGF0dXMgPSBuYW1lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoZmxpZ2h0UnEsICdGbGlnaHQgbGlzdCcpO1xuICAgIGNvbnN0IHRpY2tldFJzU3RhdHVzID0gZmxpZ2h0c1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0aWNrZXRScSwgJ1RpY2tldCcpO1xuICAgIGNvbnN0IGFnZW50SW5mb1JzU3RhdHVzID0gdGlja2V0UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoYWdlbnRJbmZvUnEsICdhZ2VudEluZm8nKTtcbiAgICBjb25zdCBwaG9uZVJzU3RhdHVzID0gYWdlbnRJbmZvUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQocGhvbmVScSwgJ1Bob25lJyk7XG4gICAgY29uc3QgdGF3UnNTdGF0dXMgPSBwaG9uZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRhd1JxLCAnVEFXJyk7XG4gICAgY29uc3Qgd3BSc1N0YXR1cyA9IHRhd1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdXUCcsICdXUCcpO1xuICAgIGNvbnN0IHBxUnNTdGF0dXMgPSB3cFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdQUScsICdQUScpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG4gICAgcHFSc1N0YXR1cyAmJiBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsICdQTlIgY3JlYXRlZCcpO1xufVxuXG5jb25zdCBzZW5kQ29tbWFuZCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcsIGZhaWx1cmVTZWdtZW50OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCByc1N0YXR1czogQ29tbWFuZE1lc3NhZ2VCYXNpY1JzID0gYXdhaXQgZ2V0U2VydmljZShJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlKS5zZW5kKGNvbW1hbmQpO1xuICAgIGxldCBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSByc1N0YXR1cy5TdGF0dXMuU3VjY2VzcztcblxuICAgIGlmIChpc1N1Y2Nlc3MgJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXS5UZXh0LmluY2x1ZGVzKCdTSUdOIElOJykpIHtcbiAgICAgICAgaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgIH0gZWxzZSBpZiAoIWlzU3VjY2Vzcykge1xuICAgICAgICBoYW5kbGVGYWlsdXJlKGZhaWx1cmVTZWdtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdWNjZXNzO1xufVxuXG5jb25zdCBoYW5kbGVGYWlsdXJlID0gKHNlZ21lbnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgYCR7c2VnbWVudH0gY3JlYXRpb24gZmFpbGVkYCk7XG59IiwiaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0gKG9uQ2xvc2U6ICgpID0+IHZvaWQsIG9uU3VibWl0OiAoKSA9PiB2b2lkKTogSlNYLkVsZW1lbnRbXSA9PiBbXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgID5cbiAgICAgICAgQ2xvc2VcbiAgICA8L0J1dHRvbj4sXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zdWNjZXNzXCJcbiAgICAgICAgb25DbGljaz17b25TdWJtaXR9XG4gICAgPlxuICAgICAgICBTdWJtaXRcbiAgICA8L0J1dHRvbj5dIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuaW50ZXJmYWNlIFN0b3JlQWN0aW9ucyB7XG4gICAgc2V0VXJsOiAodXJsOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0TWV0aG9kOiAobWV0aG9kOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0Qm9keTogKGJvZHk6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRIZWFkZXJzOiAoaGVhZGVyczogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG50eXBlIENvbXBvbmVudFByb3BzID0gU3RvcmVEYXRhICYgU3RvcmVBY3Rpb25zO1xuXG5jb25zdCBNb2RhbENvbXBvbmVudFB1cmUgPSAocHJvcHM6IENvbXBvbmVudFByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJ30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jvdyd9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyd1cmwtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfT5VUkw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCB1cmwtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbWV0aG9kLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH0+TWV0aG9kPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgbWV0aG9kLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldE1ldGhvZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLm1ldGhvZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2JvZHktZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1ib2R5LWZpZWxkYH0+Qm9keTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBib2R5LWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEJvZHkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydoZWFkZXJzLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0taGVhZGVycy1maWVsZGB9PkhlYWRlcnM8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgaGVhZGVycy1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRIZWFkZXJzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuaGVhZGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyZXNwb25zZS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH0+UmVzcG9uc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1yZXNwb25zZS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHJlc3BvbnNlLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMucmVzcG9uc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17MzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGU6IFN0b3JlRGF0YSk6IFN0b3JlRGF0YSB7XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVcmw6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAndXJsJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TWV0aG9kOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ21ldGhvZCcsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEJvZHk6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnYm9keScsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEhlYWRlcnM6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnaGVhZGVycycsIG5ld1ZhbH0pXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IE1vZGFsQ29tcG9uZW50ID0gY29ubmVjdDxTdG9yZURhdGEsIFN0b3JlQWN0aW9ucywgbmV2ZXI+KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNb2RhbENvbXBvbmVudFB1cmUpO1xuIiwiaW1wb3J0IHtQbnJQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL1BuclB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCByZWZyZXNoVHJpcFN1bW1hcnkgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG5yUHVibGljU2VydmljZTogUG5yUHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoUG5yUHVibGljU2VydmljZSk7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICBjb25zdCByZWNvcmRMb2NhdG9yID0gcG5yUHVibGljU2VydmljZS5nZXRSZWNvcmRMb2NhdG9yKCk7XG4gICAgaWYgKHJlY29yZExvY2F0b3IpIHtcbiAgICAgICAgcG5yUHVibGljU2VydmljZS5yZWZyZXNoRGF0YSgpO1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdJbmZvJywgJ0FjdGl2ZSBQTlIgaGFzIGJlZW4gcmVmcmVzaGVkLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0Vycm9yJywgJ1RoZXJlIGlzIG5vIGFjdGl2ZSBQTlIgdG8gcmVmcmVzaC4nKTtcbiAgICB9XG59IixudWxsLCJpbXBvcnQge0FnZW50UHJvZmlsZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQWdlbnRQcm9maWxlU2VydmljZSc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5jb25zdCBOT1RfQVZBSUxBQkxFID0gJ05vdCBBdmFpbGFibGUnO1xuZXhwb3J0IGNvbnN0IHNob3dBZ2VudFByb2ZpbGUgPSAoKTogdm9pZCA9PiB7XG5cbiAgICBjb25zdCBzZXJ2aWNlOiBBZ2VudFByb2ZpbGVTZXJ2aWNlID0gZ2V0U2VydmljZShBZ2VudFByb2ZpbGVTZXJ2aWNlKTtcbiAgICBjb25zdCBhZ2VudElkID0gc2VydmljZS5nZXRBZ2VudElkKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBsb2NhbGUgPSBzZXJ2aWNlLmdldExvY2FsZSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcGNjID0gc2VydmljZS5nZXRQY2MoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGNvdW50cnkgPSBzZXJ2aWNlLmdldENvdW50cnkoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IHJlZ2lvbiA9IHNlcnZpY2UuZ2V0UmVnaW9uKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjdXN0b21lckJ1c2luZXNzVW5pdCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJCdXNpbmVzc1VuaXQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyRW1wbG95ZWVJZCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJFbXBsb3llZUlkKCkgfHwgTk9UX0FWQUlMQUJMRTtcblxuICAgIGNvbnN0IGFnZW50UHJvZmlsZURlc2NyaXB0aW9uID0gYEFnZW50IElEOiAqKiR7YWdlbnRJZH0qKlxcbmAgK1xuICAgICAgICBgUHNldWRvIENpdHkgQ29kZTogKioke3BjY30qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgQ291bnRyeTogKioke2NvdW50cnl9KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgQWdlbmN5IFJlZ2lvbjogKioke3JlZ2lvbn0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBMb2NhbGU6ICoqJHtsb2NhbGV9KipcXG5gICtcbiAgICAgICAgYEN1c3RvbWVyIEJ1c2luZXNzIFVuaXQ6ICoqJHtjdXN0b21lckJ1c2luZXNzVW5pdH0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgRW1wbG95ZWUgSUQ6ICoqJHtjdXN0b21lckVtcGxveWVlSWR9KipcXG5gO1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdBZ2VudCBQcm9maWxlJywgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24pXG59IiwiaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7QmFubmVyQ29uZmlnfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Jhbm5lckNvbmZpZyc7XG5pbXBvcnQge3Nob3dCdXR0b25BY3Rpb259IGZyb20gJy4vc2hvd0J1dHRvbkFjdGlvbic7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0Jhbm5lcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcblxuICAgIGNvbnN0IGNvbmZpZ0luZm86IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdGV4dDogJ0luZm8gYmFubmVyIHdpdGhvdXQgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdJbmZvKTtcblxuICAgIGNvbnN0IGNvbmZpZ0Vycm9yOiBCYW5uZXJDb25maWc9IHtcbiAgICAgICAgdHlwZTogJ0Vycm9yJyxcbiAgICAgICAgdGV4dDogJ0Vycm9yIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdFcnJvciB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0Vycm9yKTtcblxuICAgIGNvbnN0IGNvbmZpZ1N1Y2Nlc3M6IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdHlwZTogJ1N1Y2Nlc3MnLFxuICAgICAgICB0ZXh0OiAnU3VjY2VzcyBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnU3VjY2VzcyB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1N1Y2Nlc3MpO1xuXG4gICAgY29uc3QgY29uZmlnV2FybmluZzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnV2FybmluZycsXG4gICAgICAgIHRleHQ6ICdXYXJuaW5nIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdXYXJuaW5nIHRpdGxlJyxcbiAgICAgICAgbGFiZWw6ICdXYXJuaW5nIGFjdGlvbicsXG4gICAgICAgIGFjdGlvbjogc2hvd0J1dHRvbkFjdGlvblxuICAgIH1cbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1dhcm5pbmcpO1xufSIsImltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dCdXR0b25BY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ1dhcm5pbmcgYWN0aW9uJywgJ1RoZSB3YXJuaW5nIGFjdGlvbiBidXR0b24gaGFzIGJlZW4gcHJlc3NlZC4nKVxufSIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93SW50ZXJzdGl0aWFsID0gKCk6IHZvaWQgPT4ge1xuICAgIGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSkuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcbn0iLCJpbXBvcnQge0Vudmlyb25tZW50UHVibGljU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dSdW50aW1lID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2U6IEVudmlyb25tZW50UHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlKTtcblxuICAgIGNvbnN0IHJ1bnRpbWUgPSBzZXJ2aWNlLmdldFJ1bnRpbWUoKSB8fCAnTm90IEF2YWlsYWJsZSc7XG5cbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnUnVubmluZyBvbicsIGBSdW5uaW5nIG9uOiAke3J1bnRpbWV9YCk7XG59IixudWxsLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtJTW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtJMThuU2VydmljZSwgU2NvcGVkVHJhbnNsYXRvcn0gZnJvbSBcInNhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSTE4blNlcnZpY2VcIjtcblxuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjb250ZXh0OiBJTW9kdWxlQ29udGV4dCA9IG5ldyBNb2R1bGVDb250ZXh0KFwiY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZVwiKTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY2Y6IElNb2R1bGVDb250ZXh0WydjZiddID0gY29udGV4dC5jZi5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlclNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydyZWdpc3RlclNlcnZpY2UnXSA9IGNvbnRleHQucmVnaXN0ZXJTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGdldFNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydnZXRTZXJ2aWNlJ10gPSBjb250ZXh0LmdldFNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgdDogU2NvcGVkVHJhbnNsYXRvciA9IGdldFNlcnZpY2UoSTE4blNlcnZpY2UpLmdldFNjb3BlZFRyYW5zbGF0b3IoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvdHJhbnNsYXRpb25zJyk7XG4iLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtNYWlufSBmcm9tICcuL01haW4nO1xuaW1wb3J0IHtJTW9kdWxlTWFuaWZlc3R9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZU1hbmlmZXN0JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi9Db250ZXh0JztcblxuLyoqXG4gKiAgQXV0b2dlbmVyYXRlZCBjbGFzcyByZXByZXNlbnRpbmcgbW9kdWxlIGluIHJ1bnRpbWUuXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGVfY29tX3NhYnJlX3JlZGFwcF9leGFtcGxlM193ZWJfY3VzdG9td29ya2Zsb3dfd2ViX21vZHVsZSBleHRlbmRzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKG1hbmlmZXN0OiBJTW9kdWxlTWFuaWZlc3QpIHtcbiAgICAgICAgc3VwZXIobWFuaWZlc3QpO1xuICAgICAgICBjb250ZXh0LnNldE1vZHVsZSh0aGlzKTtcbiAgICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFN0b3JlRGF0YSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nO1xuICAgIGhlYWRlcnM6IHN0cmluZztcbiAgICByZXNwb25zZTogc3RyaW5nO1xufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UsIHJlZ2lzdGVyU2VydmljZSB9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qb2ludFNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbiB9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9SZWRBcHBTaWRlUGFuZWxDb25maWcnO1xuXG5pbXBvcnQgeyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVQbnJGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0nO1xuaW1wb3J0IHsgY2FsbExhc0xheCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxsTGFzTGF4JztcbmltcG9ydCB7IHNob3dSdW50aW1lIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dSdW50aW1lJztcbmltcG9ydCB7IHNob3dJbnRlcnN0aXRpYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbCc7XG5pbXBvcnQgeyBzaG93QWdlbnRQcm9maWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUnO1xuaW1wb3J0IHsgc2hvd0Jhbm5lcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMnO1xuaW1wb3J0IHsgcmVmcmVzaFRyaXBTdW1tYXJ5IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeSc7XG5pbXBvcnQgeyBjYWxsRXh0ZXJuYWxTZXJ2aWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxFeHRlcm5hbFNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSwgaGlkZU5vdGlmaWNhdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybSc7XG5cbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcnO1xuXG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5cbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RyYXdlclNlcnZpY2UnO1xuaW1wb3J0IHsgTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9jb25maWdzL2RyYXdlci9MYXJnZVdpZGdldERyYXdlckNvbmZpZyc7XG5cbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1RpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlJztcbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3JztcblxuaW1wb3J0IHsgSUFpclByaWNpbmdTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvc2VydmljZXMvSUFpclByaWNpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByaWNpbmdUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUnO1xuaW1wb3J0IHsgUHJpY2luZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVmlldyc7XG5cblxuZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBNb2R1bGUge1xuICBpbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VydmljZXMoKTtcbiAgICB0aGlzLnNldHVwU2lkZVBhbmVsQnV0dG9ucygpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJTZXJ2aWNlcygpOiB2b2lkIHtcbiAgICByZWdpc3RlclNlcnZpY2UoQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTaWRlUGFuZWxCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VDc3NDbGFzc05hbWVzID0gJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItY3VzdG9td29ya2Zsb3cnO1xuXG4gICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBSZWRBcHBTaWRlUGFuZWxDb25maWcoW1xuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBiYW5uZXJzJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWJhbm5lcnMnLCBzaG93QmFubmVycyksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdFeHRlcm5hbCBzZXJ2aWNlIGNhbGwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctZXh0ZXJuYWxzZXJ2aWNlY2FsbCcsIGNhbGxFeHRlcm5hbFNlcnZpY2UpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVkQXBwIHBsYXRmb3JtJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBsYXRmb3JtJywgc2hvd1J1bnRpbWUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignTEFTIC0gTEFYJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFjdGlvbicsIGNhbGxMYXNMYXgpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIFBOUicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbnInLCBjcmVhdGVQbnJGb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgaW50ZXJzdGl0aWFsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWludGVyc3RpdGlhbCcsIHNob3dJbnRlcnN0aXRpYWwpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBBZ2VudCBQcm9maWxlJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFnZW50cHJvZmlsZScsIHNob3dBZ2VudFByb2ZpbGUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVmcmVzaCBUcmlwIFN1bW1hcnknLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVmcmVzaHRyaXAnLCByZWZyZXNoVHJpcFN1bW1hcnkpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIG5vdGlmaWNhdGlvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1jcmVhdGVOb3RpZmljYXRpb24nLCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0hpZGUgbm90aWZpY2F0aW9ucycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1oaWRlTm90aWZpY2F0aW9uJywgaGlkZU5vdGlmaWNhdGlvbnMpLFxuICAgICAgc2VsZlJlbW92ZUJ0blxuICAgIF0pO1xuXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygncmVkQXBwU2lkZVBhbmVsJywgY29uZmlnKTtcbiAgfVxuXG4gIC8vIEF2YWlsYWJpbGl0eVRpbGVcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgYWlyQXZhaWxhYmlsaXR5U2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSk7IC8vIDI9Q0JANT09ODkgQTVAMjhBIDQ7TyA/QDU0PkFCMDI7NT04TyA0MD09S0UgMiBAMDw6MEUgQXZhaWxhYmlsaXR5XG5cbiAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnQUJDIFNlYXRNYXAgKEF2YWlsYWJpbGl0eSknLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcEF2YWlsVmlldywgZGF0YSksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH07XG5cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobW9kYWxPcHRpb25zKTtcbiAgICB9O1xuXG4gICAgYWlyQXZhaWxhYmlsaXR5U2VydmljZS5jcmVhdGVBaXJBdmFpbGFiaWxpdHlTZWFyY2hUaWxlKFxuICAgICAgU2VhdE1hcEF2YWlsVGlsZSxcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwsXG4gICAgICAnQUJDIFNlYXRNYXAnXG4gICAgKTtcbiAgfVxuXG4gIC8vIFNob3BwaW5nVGlsZSBcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTogdm9pZCB7XG4gICAgLy8gPj9ANTQ1O081PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBjb25zdCBzaG9wcGluZ0RyYXdlckNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhTZWF0TWFwU2hvcHBpbmdUaWxlLCBTZWF0TWFwU2hvcHBpbmdWaWV3LCB7XG4gICAgICB0aXRsZTogJ1Nob3BwaW5nIFRpbGUgV2lkZ2V0JyAvLyA3MDM+Oz4yPjogPjo9MFxuICAgIH0pO1xuICAgIC8vIDJLNzJLMjA1PCBBNUAyOEEgQSBNQjg8IGNvbmZpZyBzaG9wcGluZ0RyYXdlckNvbmZpZ1xuICAgIGdldFNlcnZpY2UoRHJhd2VyU2VydmljZSkuYWRkQ29uZmlnKFsnc2hvcHBpbmctZmxpZ2h0LXNlZ21lbnQnXSwgc2hvcHBpbmdEcmF3ZXJDb25maWcpO1xuXG4gICAgLy8gUHJpY2luZyBUaWxlXG4gICAgY29uc3Qgc2hvd1ByaWNpbmdNb2RhbCA9IHRoaXMuY3JlYXRlU2hvd01vZGFsQWN0aW9uKFByaWNpbmdWaWV3LCAnUHJpY2luZyBEYXRhJyk7XG4gICAgZ2V0U2VydmljZShJQWlyUHJpY2luZ1NlcnZpY2UpLmNyZWF0ZVByaWNpbmdUaWxlKFByaWNpbmdUaWxlLCBzaG93UHJpY2luZ01vZGFsLCAnQUJDIFNlYXQgTWFwJyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2hvd01vZGFsQWN0aW9uKHZpZXc6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PGFueT4sIGhlYWRlcjogc3RyaW5nKTogKGRhdGE6IGFueSkgPT4gdm9pZCB7XG4gICAgcmV0dXJuICgoZGF0YSkgPT4ge1xuICAgICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgdmlldyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgICksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH1cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbiAgICB9KVxuICB9XG5cblxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGU6IFN0b3JlRGF0YSA9IHtcbiAgICB1cmw6ICdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMScsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBib2R5OiAnJyxcbiAgICBoZWFkZXJzOiAne30nLFxuICAgIHJlc3BvbnNlOiAnJ1xufVxuXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdG9yZURhdGEgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdTRVRfUEFSQU1FVEVSJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi5uZXdWYWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlIHtcblxuICAgIHB1YmxpYyBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xuXG4gICAgZ2V0RGF0YSgpOiBTdG9yZURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtJQ3VzdG9tV29ya2Zsb3d9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvaW50ZXJmYWNlcy9JQ3VzdG9tV29ya2Zsb3cnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbi8qKlxuICogU2VydmljZSB1c2VkIHdpdGggZGVjbGFyYXRpdmUgY3VzdG9tIHdvcmtmbG93IGluIG1hbmlmZXN0Lmpzb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgZXh0ZW5kcyBJQ3VzdG9tV29ya2Zsb3cge1xuICAgIHN0YXRpYyBTRVJWSUNFX05BTUUgPSAnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS1DdXN0b21Xb3JrZmxvd1NlcnZpY2UnO1xuXG4gICAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignSW5mbycsICdDdXN0b20gV29ya2Zsb3cgU2VydmljZSBTdWNjZXNzJyk7XG4gICAgfVxufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGggPSAodGl0bGU6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdQQVJBR1JBUEgnLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2xvc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG59IixudWxsLG51bGwsbnVsbF19 