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
    return (React.createElement("div", { className: 'sdk-pricing-custom-tile-content' }, "ABC Seat Map"));
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
        var buttonHtml = "\n        <div style=\"margin-top: 4px; display: flex; justify-content: center;\">\n            <button class=\"abc-seatmap-button\" style=\"\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: 6px 10px 20px 10px;\n                background-color: #2f73bc;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n                font-size: 12px;\n                height: 24px;\n            \">\n                ABC SeatMap\n            </button>\n        </div>\n    ";
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50QXZhaWwudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50UHJpY2luZy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZy50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldy5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdWaWV3LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcEF2YWlsTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsRm9yU2VnbWVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC90cmFuc2Zvcm1GbGlnaHQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1ByaWNpbmdWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdXRpbHMvdHJhbnNmb3JtRmxpZ2h0LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFRpbGUuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTSxzQkFBc0IsR0FBRyxVQUFDLElBQVMsRUFBRSxZQUF3Qjs7SUFBeEIsNkJBQUEsRUFBQSxnQkFBd0I7SUFDeEUsSUFBTSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRyxZQUFZLENBQUMsQ0FBQztJQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBb0IsWUFBWSxlQUFZLENBQUMsQ0FBQztRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLFNBQVM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztLQUNIO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUVwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1FBQzdGLE9BQU87WUFDTCxFQUFFLEVBQUUsU0FBUztZQUNiLFdBQVcsRUFBRSxDQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsZ0JBQWdCLDBDQUFFLG1CQUFtQiwwQ0FBRSxJQUFJLEtBQUksRUFBRTtZQUN0RSxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVksSUFB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Ozs7O0FDdEJEO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coJz3MIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSAfPjs9SzUgNDA9PUs1IEE1Mzw1PUIwOicsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQsIG51bGwsIDIpKTtcblxuICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuRGVwYXJ0dXJlRGF0ZVRpbWU7XG5cbiAgaWYgKCFkZXBhcnR1cmVEYXRlVGltZSkge1xuICAgIGNvbnNvbGUud2FybignoA8gW2dldEZsaWdodEZyb21TYWJyZURhdGFdIERlcGFydHVyZURhdGVUaW1lID5CQUNCQUIyQzVCIDIgNDA9PUtFIEE1Mzw1PUIwIScpO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1VOS05PV04nLFxuICAgICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlciB8fCAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLFxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnQSdcbiAgfTtcbn07IiwiZXhwb3J0IGNvbnN0IHF1aWNrZXRDb25maWcgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBsYW5nOiAnRU4nLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICB2aXNpYmxlRnVzZWxhZ2U6IHRydWUsXG4gICAgdmlzaWJsZVdpbmdzOiB0cnVlLFxuICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgc2luZ2xlRGVja01vZGU6IHRydWUsXG4gICAgYnVpbHRJblRvb2x0aXA6IHRydWUsXG4gICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICB0b29sdGlwT25Ib3ZlcjogZmFsc2UsXG4gICAgY29sb3JUaGVtZToge1xuICAgICAgICBzZWF0TGFiZWxDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgc2VhdFN0cm9rZUNvbG9yOiAnZ3JheSdcbiAgICB9XG59OyIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zOEBDNTwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQDU5QSBBIEE1Mzw1PUI+PFxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHQpO1xuICBcbiAgLy8gZmxpZ2h0IDQ7TyA/QD4yNUA6OFxuICAvLyBmbGlnaHQ6e1xuICAvLyAgIGlkOiAnMDAxJywgXG4gIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJywgXG4gIC8vICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAvLyAgICAgYXJyaXZhbDogJ0ZSQScsXG4gIC8vICAgICBjYWJpbkNsYXNzOiAnQSdcbiAgLy8gfSxcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG5cbiAgICAgIC8vIDw+Nj0+IEAwQTo+PDw1PUI4QD4yMEJMID9AOCA9NT4xRT40ODw+QUI4XG4gICAgICAvLyBhdmFpbGFiaWxpdHk6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmF2YWlsYWJpbGl0eSksXG4gICAgICAvLyBwYXNzZW5nZXJzOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5wYXNzZW5nZXJzKVxuXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWUgd2l0aCBkYXRhOicsIHtcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gIH07XG5cbiAgY29uc29sZS5sb2coJz7gIFNlYXRNYXBDb21wb25lbnQgaXMgcmVuZGVyaW5nIScpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz3gDyBTZWF0TWFwQ29tcG9uZW50IG1vdW50ZWQnKTtcbiAgICBjb25zb2xlLmxvZyhgPQQgU2VnbWVudCBpbmRleCBjaGFuZ2VkOiAke3NlZ21lbnRJbmRleH1gKTtcbiAgICBzZW5kVG9JZnJhbWUoKTsgLy8gPkI/QDAyOjAgP0A4IDg3PDU9NT04OCBBNTM8NT1CMFxuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qID46PT4gQSA0MD09Szw4ID4gQDU5QTUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGZsaWdodCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzogUmVhY3QuRkM8U2VhdE1hcFByb3BzPiA9ICh7IGNvbmZpZywgZGF0YSB9KSA9PiB7XG4gIGNvbnN0IFtzZWdtZW50SW5kZXgsIHNldFNlZ21lbnRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgaWZyYW1lUmVmID0gdXNlUmVmPEhUTUxJRnJhbWVFbGVtZW50PihudWxsKTtcblxuICAvLyA9DSAbPjM4QEM1PCAyRT40T0k4NSA0MD09SzVcbiAgY29uc29sZS5sb2coJz05IFtTZWF0TWFwQ29tcG9uZW50XSByZWNlaXZlZCBwcm9wczonLCB7IGNvbmZpZywgZGF0YSB9KTtcblxuLy8gHz47Q0cwNTwgQjU6Q0k4OSBBNTM8NT1CXG5jb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5jb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHRTZWdtZW50cyk7XG4gIFxuICAvLyBmbGlnaHQgNDtPID9APjI1QDo4XG4gIC8vIGZsaWdodDp7XG4gIC8vICAgaWQ6ICcwMDEnLCBcbiAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLCBcbiAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gIC8vICAgICBhcnJpdmFsOiAnRlJBJyxcbiAgLy8gICAgIGNhYmluQ2xhc3M6ICdBJ1xuICAvLyB9LFxuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQ6IHtcbiAgICAgICAgaWQ6ICcwMDEnLCAgLy8gIzE1NDhBTCwgR0I+ID81QDU0MDVCQU8gaWRcbiAgICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogY3VycmVudFNlZ21lbnQuZGVwYXJ0dXJlRGF0ZVRpbWUgfHwgJzIwMjUtMDQtMjInLFxuICAgICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICAgIGNhYmluQ2xhc3M6IGN1cnJlbnRTZWdtZW50LmNhYmluQ2xhc3MgfHwgJ0EnXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA8PjY9PiBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRGbGlnaHRGcm9tU2FicmVEYXRhIH0gZnJvbSAnLi9nZXRGbGlnaHRGcm9tU2FicmVEYXRhJztcblxuaW50ZXJmYWNlIFNlYXRNYXBQcm9wcyB7XG4gIGNvbmZpZzogYW55O1xuICBkYXRhOiBhbnk7IC8vIBQwPT1LNSwgOj5CPkBLNSA/QDhFPjRPQiA4NyBTaG9wcGluZyBBRjU9MEA4T1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmc6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbi8vIB8+O0NHMDU8IEI1OkNJODkgQTUzPDU9QlxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG4gIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gZmxpZ2h0U2VnbWVudHNbc2VnbWVudEluZGV4XSB8fCB7fTtcblxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gHz47Q0c1PT1LNSA0MD09SzU6JywgZGF0YSk7XG5cbiAgICAgICAgLy8gLy8gPSggJTBANDo+NDg8IDQwPT1LNSA0O08gP0A+MjVAOjhcbiAgICAgICAgLy8gY29uc3QgZmxpZ2h0RGF0YSA9IHtcbiAgICAgICAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAgICAgICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgICAgICAgLy8gICAgIGFycml2YWw6ICdGUkEnXG4gICAgICAgIC8vIH07XG5cblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0OiB7XG5cbiAgICAgICAgaWQ6ICcwMDEnLCAgLy8gIzE1NDhBTCwgR0I+ID81QDU0MDVCQU8gaWRcbiAgICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogY3VycmVudFNlZ21lbnQuZGVwYXJ0dXJlRGF0ZVRpbWUgfHwgJzIwMjUtMDQtMjInLFxuICAgICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICAgIGNhYmluQ2xhc3M6IGN1cnJlbnRTZWdtZW50LmNhYmluQ2xhc3MgfHwgJ0EnXG5cbiAgICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICBkZWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgIG5hbWU6ICdEZWNrIDEnLFxuICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEnLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDUwIH0sIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9O1xuXG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudFNob3BwaW5nXSAhRD5APDhAPjIwPT1LNSA0MD09SzUgNDtPID5CP0AwMjo4OicsIHNlYXRNYXBEYXRhKTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIDg7OCBjb250ZW50V2luZG93ID01IDQ+QUJDPzU9LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gHkI/QDAyOjAgNDA9PUtFIDIgaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZW5kVG9JZnJhbWUoKTtcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICB7LyogRmxpZ2h0IEluZm8gU2VjdGlvbiAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIGZvbnRTaXplOiAnMC45cmVtJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgPHN0cm9uZz496yBGbGlnaHQgaW5mbzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoY3VycmVudFNlZ21lbnQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nIH19PlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlZ21lbnRTZWxlY3RcIj4SSzE1QDhCNSBBNTM8NT1COiA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJzZWdtZW50U2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VnbWVudEluZGV4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VnbWVudEluZGV4KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICA+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ1hYJ30ge3NlZ21lbnQuZmxpZ2h0TnVtYmVyIHx8ICcwMDAnfToge3NlZ21lbnQub3JpZ2lufSCSIHtzZWdtZW50LmRlc3RpbmF0aW9ufVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8aWZyYW1lXG4gICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICBvbkxvYWQ9e3NlbmRUb0lmcmFtZX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmc7IixudWxsLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCBTZWF0TWFwQ29tcG9uZW50QXZhaWwgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50QXZhaWwnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5cbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG4vLyBkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIFxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBBdmFpbE1vZGFsKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudEF2YWlsLCB7XG4gICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICBkYXRhIC8vID81QDU0MFE8IGRhdGEgLSA+MUo1OkIgQjg/MCBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICBcbn0iLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRQcmljaW5nIGZyb20gJy4vU2VhdE1hcENvbXBvbmVudFByaWNpbmcnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5cbmltcG9ydCB7IEFpclByaWNpbmdEYXRhIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvcmVzcG9uc2UvaW50ZXJmYWNlcy9BaXJQcmljaW5nRGF0YSc7XG5cbi8vIGRhdGE6IEFpclByaWNpbmdEYXRhXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcFByaWNpbmdNb2RhbChkYXRhOiBBaXJQcmljaW5nRGF0YSk6IHZvaWQge1xuXG4gIGNvbnN0IG1vZGFsU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7IC8vIDhBPz47TDdDNTwgUHVibGljTW9kYWxzU2VydmljZVxuXG4gIC8vIEQ+QDw4QEM1PCBvcHRpb25zIDQ7TyA/NUA1NDBHOCAyIDw+NDA7TD0+NSA+Oj0+XG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyJyxcbiAgICAvLyBBPjc0MDU8IFJlYWN0LTo+PD8+PTU9QiA9MCA+QT0+MjUgU2VhdE1hcENvbXBvbmVudFxuICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50UHJpY2luZywge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCBkYXRhIC0gPjFKNTpCIEI4PzAgQWlyUHJpY2luZ0RhdGEgRjU7ODo+PFxuICAgIH0pLFxuICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIE1vZGFsXSBDbG9zZWQnKVxuICB9O1xuXG4gIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTsgLy8gPz46MDdLMjA1PCA8PjQwO0w9PjUgPjo9PiBBIDUzPiBvcHRpb25zXG4gIFxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCBTZWF0TWFwQ29tcG9uZW50IGZyb20gJy4vU2VhdE1hcENvbXBvbmVudEF2YWlsJztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG4vLyBkYXRhOiBTZWF0TWFwU2hvcHBpbmdEYXRhXG5cbmludGVyZmFjZSBTZWF0TWFwU2hvcHBpbmdEYXRhIHtcbiAgICBmbGlnaHRTZWdtZW50czogYW55W107ICAvLyAcPjY9PiA3MDw1PThCTCA9MCA6Pj06QDVCPUs5IEI4PywgNUE7OCA4NzI1QUI1PVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsKGRhdGE6IFNlYXRNYXBTaG9wcGluZ0RhdGEpOiB2b2lkIHtcblxuICAgIGNvbnN0IG1vZGFsU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7IC8vIDhBPz47TDdDNTwgUHVibGljTW9kYWxzU2VydmljZVxuXG4gICAgaWYgKCFtb2RhbFNlcnZpY2UgfHwgdHlwZW9mIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIFB1YmxpY01vZGFsc1NlcnZpY2Ugbm90IGF2YWlsYWJsZSBvciBub3QgY29uZmlndXJlZCBwcm9wZXJseS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICAvLyA9zCAXMDpAS0JMIDJBNSA/QDU0SzRDSTg1IDw+NDA7TD1LNSA+Oj0wID81QDU0ID5COkBLQjg1PCA9PjI+Mz5cbiAgICAgdHJ5IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLmNsb3NlUmVhY3RNb2RhbCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnPcwgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gQWxsIHByZXZpb3VzIG1vZGFscyBjbG9zZWQuJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBFcnJvciBoaWRpbmcgbW9kYWxzOicsIGVycm9yKTtcbiAgICB9XG5cbiAgICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICAgIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICdBQkMgU2VhdE1hcCBTaG9wcGluZyBWaWV3ZXInLFxuICAgICAgICAvLyBBPjc0MDU8IFJlYWN0LTo+PD8+PTU9QiA9MCA+QT0+MjUgU2VhdE1hcENvbXBvbmVudFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KSxcbiAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgU2hvcHBpbmcgTW9kYWxdIENsb3NlZCcpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBNb2RhbCBkYXRhOicsIGRhdGEpO1xuXG4gICAgLy8gH0A+MjVAOjAgPTAgND5BQkM/PT5BQkwgPDVCPjQwIGBzaG93UmVhY3RNb2RhbGBcbiAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3Igc2hvd2luZyBtb2RhbDonLCBlcnJvcik7XG4gICAgfVxuXG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0FpclByaWNpbmdEYXRhfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcblxuZXhwb3J0IGNvbnN0IFByaWNpbmdUaWxlID0gKGRhdGE6IEFpclByaWNpbmdEYXRhKSA6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstcHJpY2luZy1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgICAgICBBQkMgU2VhdCBNYXBcbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFpclByaWNpbmdEYXRhIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvcmVzcG9uc2UvaW50ZXJmYWNlcy9BaXJQcmljaW5nRGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcFByaWNpbmdNb2RhbCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgUHJpY2luZ1ZpZXcgPSAoZGF0YTogQWlyUHJpY2luZ0RhdGEpIDogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPYAgUHJpY2luZ1ZpZXcgZGF0YTonLCBkYXRhKTsgLy8gGz4zIDQ7TyA+QjswNDo4XG4gICAgICAgIHNob3dTZWF0TWFwUHJpY2luZ01vZGFsKGRhdGEpOyAvLyASSzc+MiBEQz06Rjg4ID8+OjA3MCA8PjQwO0w9PjM+ID46PTAgYyA0MD09Szw4IChkYXRhKVxuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXByaWNpbmctY3VzdG9tLXRpbGUtY29udGVudCd9PlxuICAgICAgICAgICAgPHA+HkI6QEsyMDU8IFNlYXRNYXAgVmlld2VyLi4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICAgICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30gPiBcbiAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4gICAgICAgICAgICA8b2w+XG4gICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L29sPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gXG5cbi8vIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuLy8gaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0NvbnRleHQnO1xuLy8gaW1wb3J0IHtJU2VhdE1hcFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1zZWF0bWFwL3NlcnZpY2VzL0lTZWF0TWFwU2VydmljZSc7XG5cbi8vIGV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuLy8gICAgIGNvbnN0IGhhbmRsZU9wZW5TZWF0TWFwID0gYXN5bmMgKGZsaWdodFNlZ21lbnROdW1iZXI6IG51bWJlcikgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhgPesgT3BlbmluZyBTZWF0IE1hcCBmb3Igc2VnbWVudDogJHtmbGlnaHRTZWdtZW50TnVtYmVyfWApO1xuICAgIFxuLy8gICAgICAgICB0cnkge1xuLy8gICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRTZXJ2aWNlKElTZWF0TWFwU2VydmljZSkub3BlblNlYXRNYXBGb3JGbGlnaHRTZWdtZW50KGZsaWdodFNlZ21lbnROdW1iZXIpO1xuICAgIFxuLy8gICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5tb2RhbE9wZW5lZENvcnJlY3RseSkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYKAPIEVycm9yIG9wZW5pbmcgU2VhdCBNYXA6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfWApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTCBGYWlsZWQgdG8gb3BlbiBTZWF0IE1hcDpgLCBlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuXG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4vLyAgICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuLy8gICAgICAgICAgICAgPG9sPlxuLy8gICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbi8vICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcGVuU2VhdE1hcChpbmRleCArIDEpfT4+kSBPcGVuIFNlYXQgTWFwPC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4vLyAgICAgICAgICAgICAgICAgKSl9XG4vLyAgICAgICAgICAgICA8L29sPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuLy8gfTtcblxuXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwQXZhaWxNb2RhbCB9IGZyb20gJy4uL3Nob3dTZWF0TWFwQXZhaWxNb2RhbCc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxWaWV3ID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnPYAgU2VhdE1hcEF2YWlsVmlldyBkYXRhOicsIGRhdGEpOyAvLyA7PjMgMiA+PUE+O0xcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxNb2RhbChkYXRhKTsgLy8gMks3SzIwNTwgREM9OkY4TiA/PjowNzAgPD40MDtMPT4zPiA+Oj0wIGMgNDA9PUs8OCAoZGF0YSlcbiAgICB9LCBbXSk7XG4gIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbiAgICAgICAgPHA+HkI6QEsyMDU8IFNlYXRNYXAgVmlld2VyLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTsiLCJpbXBvcnQge1RpbGV9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGUnO1xuaW1wb3J0IHtUaWxlT3B0aW9uc30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZU9wdGlvbnMnO1xuaW1wb3J0IHtGbGlnaHRTZWdtZW50fSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQge1dpdGhvdXRGb2N1c09uQ2xpY2t9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9taXhpbnMvV2l0aG91dEZvY3VzT25DbGljayc7XG5pbXBvcnQge0luaXRpYWx9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9Jbml0aWFsJztcbmltcG9ydCB7TWl4aW59IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9NaXhpbic7XG5pbXBvcnQge0Nzc0NsYXNzfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5cbkBDc3NDbGFzcygnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItdGlsZXdpZGdldHMtd2ViLW1vZHVsZScsIHsgb3ZlcndyaXRlOiBmYWxzZSB9KVxuQEluaXRpYWw8VGlsZU9wdGlvbnM+KHtcbiAgICBjYXB0aW9uOiAnQUJDIFNlYXRNYXAnLCAvLyA4PE8gdGlsZVxuICAgIGNsYXNzTmFtZTogJ3dlYi1haXItc2hvcHBpbmctd2lkZ2V0LXNhbXBsZSdcbn0pXG5ATWl4aW4oV2l0aG91dEZvY3VzT25DbGljaylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdUaWxlIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiBpbXBsZW1lbnRzIFdpdGhvdXRGb2N1c09uQ2xpY2sge1xuXG4gICAgcHJpdmF0ZSB1bmlxdWVSZW5kZXJLZXkgPSAwOyAvLyAUPjEwMjtPNTwgQz04OjA7TD1LOSA6O05HXG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudW5pcXVlUmVuZGVyS2V5Kys7IC8vICMyNTs4RzgyMDU8IDo7TkcgOjA2NEs5IEAwNyA/QDggMks3PjI1IDw1Qj40MFxuXG4gICAgICAgIGNvbnN0IGZsaWdodE51bWJlcnMgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKSk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzSHRtbCA9IGZsaWdodE51bWJlcnMubGVuZ3RoID4gMVxuICAgICAgICAgICAgPyBgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDVweDsgdGV4dC1hbGlnbjogY2VudGVyO1wiPlNlZ21lbnRzOjxiciAvPiR7ZmxpZ2h0TnVtYmVycy5qb2luKCcsICcpfTwvZGl2PmBcbiAgICAgICAgICAgIDogYDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA1cHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5TZWdtZW50OiAke2ZsaWdodE51bWJlcnMuam9pbignLCAnKSB8fCAnTi9BJ308L2Rpdj5gO1xuICAgICAgICBcbiAgICAgICAgLy8gFD4xMDI7TzU8IDo9Pj86QyBBQkMgU2VhdE1hcFxuICAgICAgICBjb25zdCBidXR0b25IdG1sID0gYFxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogNHB4OyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhYmMtc2VhdG1hcC1idXR0b25cIiBzdHlsZT1cIlxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA2cHggMTBweCAyMHB4IDEwcHg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJmNzNiYztcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgICAgIFwiPlxuICAgICAgICAgICAgICAgIEFCQyBTZWF0TWFwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAgICAgdGhpcy5zZXREYXRhQ29udGVudChzZWdtZW50c0h0bWwgKyBidXR0b25IdG1sKTtcbiAgICB9XG5cbiAgICBzZWxmU2VsZWN0ZWRGYXJlQ2hhbmdlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGEpO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nOyAgLy8gBSAvMj1LOSA4PD8+QEIgUmVhY3RET01cbmltcG9ydCB7IEFic3RyYWN0VmlldyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RNb2RlbCc7XG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZyBmcm9tICcuLi9TZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4uL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuaW1wb3J0IHsgQ3NzQ2xhc3MgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L1RlbXBsYXRlJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJylcbkBUZW1wbGF0ZSgnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZTpTaG9wcGluZ1RpbGVWaWV3JylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3PEFic3RyYWN0TW9kZWw+IHtcblxuICAgIHByaXZhdGUgZmxpZ2h0U2VnbWVudHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZFNlZ21lbnRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkIGNhbGxlZCB3aXRoIGNwYTonLCBjcGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnPcwgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIEhhcmRjb2RlZCBmbGlnaHQgZGF0YTonLCBmbGlnaHREYXRhKTtcbiAgICAgICAgLy8gdGhpcy5mbGlnaHRTZWdtZW50cyA9IFtmbGlnaHREYXRhXTtcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZFNlZ21lbnRJbmRleCA9IDA7XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgICAgICB0aGlzLmZsaWdodFNlZ21lbnRzID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LmdldERlcGFydHVyZURhdGUoKTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcwMDEnLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRJZDogc2VnbWVudC5nZXRTZWdtZW50SWQoKSxcbiAgICAgICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCksXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBzZWdtZW50LmdldE9yaWdpbklhdGEoKSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKSxcbiAgICAgICAgICAgICAgICBhaXJNaWxlczogc2VnbWVudC5nZXRBaXJNaWxlcygpLFxuICAgICAgICAgICAgICAgIGRlcGFydHVyZURhdGVUaW1lOiBkZXBhcnR1cmVEYXRlVGltZSA/IGRlcGFydHVyZURhdGVUaW1lLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICdVTktOT1dOJywgLy8gFD4xMDI7NT04NSA0MEJLXG4gICAgICAgICAgICAgICAgbWFya2V0aW5nQWlybGluZTogc2VnbWVudC5nZXRNYXJrZXRpbmdBaXJsaW5lKCksXG4gICAgICAgICAgICAgICAgY2FiaW5DbGFzczogJ0EnIC8vIB9AODw1QCwgPD42PT4gPzVANTQwMjBCTCBANTA7TD1LNSA0MD09SzVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIB9APjFDNTwgQDU9NDVAOEJMIFJlYWN0IDo+PD8+PTU9QiBBIDcwNDVANjo+OSwgR0I+MUsgMzBAMD1COEA+MjBCTCA9MDs4Rzg1IE07NTw1PUIwXG4gICAgICAgIHRoaXMudHJ5UmVuZGVyUmVhY3RDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyA9IDApIHtcbiAgICAgICAgY29uc3QgTUFYX0FUVEVNUFRTID0gMTA7XG4gICAgICAgIGNvbnN0IElOVEVSVkFMID0gNTAwOyAvLyAYPUI1QDIwOyA8NTY0QyA/Pj9LQjowPDggKDIgPDg7OzhBNTpDPTQwRSlcblxuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcblxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9MDk0NT0uIB0wRzg9MDU8IEA1PTQ1QDg9MyBSZWFjdCA6Pjw/Pj01PUIwLicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHRzIDwgTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYKAPIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9NSA9MDk0NT0uIB8+MkI+QD0wTyA/Pj9LQjowIEc1QDU3ICR7SU5URVJWQUx9IDxBLiAfPj9LQjowICR7YXR0ZW1wdHMgKyAxfS8ke01BWF9BVFRFTVBUU31gKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyArIDEpLCBJTlRFUlZBTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAdNSBDNDA7PkFMID0wOUI4IE07NTw1PUIgc2VhdG1hcC1yb290ID8+QTs1IDwwOkE4PDA7TD0+Mz4gRzhBOzAgPz4/S0I+Oi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJlYWN0Q29tcG9uZW50KCkge1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcbiAgICBcbiAgICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyAeRzhJMDU8ID9ANTRLNENJODkgQDU9NDVAID81QDU0IEI1PCwgOjA6IEE9PjIwID5CQDU9NDVAOEJMIFJlYWN0IDo+PD8+PTU9QlxuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShyb290RWxlbWVudCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGZsaWdodFNlZ21lbnRzOiB0aGlzLmZsaWdodFNlZ21lbnRzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4XG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudFNob3BwaW5nLCB7IGNvbmZpZzogcXVpY2tldENvbmZpZywgZGF0YSB9KSxcbiAgICAgICAgICAgICAgICByb290RWxlbWVudFxuICAgICAgICAgICAgKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gUmVhY3QgQ29tcG9uZW50IENBPzVIPT4gPkJANT00NUA1PSAyICNzZWF0bWFwLXJvb3QuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIEEgaWQ9XCJzZWF0bWFwLXJvb3RcIiA9NSA9MDk0NT0gP0A4ID8+P0tCOjUgQDU9NDVAOD0zMC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7UHVibGljTW9kYWxzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHtSZWFjdE1vZGFsT3B0aW9uc30gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHtFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3J9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge2FjdGlvbnN9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zJztcbmltcG9ydCB7TW9kYWxDb21wb25lbnR9IGZyb20gJy4vZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudCc7XG5pbXBvcnQge0xvY2FsU3RvcmV9IGZyb20gJy4uL3JlZHVjZXJzL0xvY2FsU3RvcmUnO1xuXG5jb25zdCBtb2RhbFNlcnZpY2U6IFB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG5leHBvcnQgY29uc3QgY2FsbEV4dGVybmFsU2VydmljZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBsb2NhbFN0b3JlID0gbmV3IExvY2FsU3RvcmUoKTtcblxuICAgIGNvbnN0IG9uU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdG9yZURhdGEgPSBsb2NhbFN0b3JlLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSBKU09OLnBhcnNlKHN0b3JlRGF0YS5oZWFkZXJzKTtcblxuICAgICAgICBnZXRTZXJ2aWNlKEV4dGVybmFsU2VydmljZUNvbm5lY3RvcikuY2FsbFNlcnZpY2Uoc3RvcmVEYXRhLnVybCwgc3RvcmVEYXRhLm1ldGhvZCwgc3RvcmVEYXRhLmJvZHksIGhlYWRlcnMpLmRvbmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSBKU09OLnBhcnNlKHJlc3BvbnNlIGFzIHN0cmluZyk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlT2JqZWN0LCBudWxsLCAyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmUuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAge3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdyZXNwb25zZScsIG5ld1ZhbDogcmVzcG9uc2VTdHJpbmd9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgbW9kYWxTZXJ2aWNlLmNsb3NlUmVhY3RNb2RhbCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ndk1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcjogJ0V4dGVybmFsU2VydmljZUNvbm5lY3RvcicsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbENvbXBvbmVudCksXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdCxcbiAgICAgICAgYWN0aW9uczogYWN0aW9ucyhvbkNsb3NlLCBvblN1Ym1pdCksXG4gICAgICAgIHN0b3JlOiBsb2NhbFN0b3JlLnN0b3JlXG4gICAgfVxuXG4gICAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG5ndk1vZGFsT3B0aW9ucyk7XG59OyIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Y2YsIGdldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY2FsbExhc0xheCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcblxuICAgIGNmKCcxTEFTTEFYJykuc2VuZCgpLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuXG4gICAgICAgIGNvbnN0IGhhc1NpZ25JblJlc3BvbnNlID0gcmVzcG9uc2UuZ2V0RGF0YVN0cnVjdHMoKVxuICAgICAgICAgICAgLmZpbHRlcihkYXRhID0+IGRhdGFbJ2QuU2NyZWVuJ10gJiYgZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAubWFwKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXVsnZC5UZXh0J10pXG4gICAgICAgICAgICAuc29tZShkYXRhID0+IGRhdGEuaW5jbHVkZXMoJ1NJR04gSU4nKSk7XG5cbiAgICAgICAgaWYgKGhhc1NpZ25JblJlc3BvbnNlKSB7XG4gICAgICAgICAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnRXJyb3InLCAnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCJpbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEcm9wZG93bkZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvRHJvcGRvd25GaWVsZCc7XG5pbXBvcnQge0lOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL3NlcnZpY2UvSU5vdGlmaWNhdGlvblNlcnZpY2UnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25UeXBlfSBmcm9tICdzYWJyZS1uZ3Ytbm90aWZpY2F0aW9uL2ludGVyZmFjZXMvTm90aWZpY2F0aW9uVHlwZSc7XG5cbmNvbnN0IG5vdGlmaWNhdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnTm90aWZpY2F0aW9uJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aXRsZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY29udGVudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndHlwZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0RST1BET1dOJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ05vbmUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0luZm8nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oLT9bMS05XVswLTldKnwwKSQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lb3V0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpbWVvdXQgaW4gbXMnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdeKFsxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG5cbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzaG93Tm90aWZpY2F0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKGZvcm06IEN1c3RvbUZvcm0pOiB2b2lkID0+IHtcbiAgICBjb25zdCB0eXBlID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0eXBlJykgYXMgRHJvcGRvd25GaWVsZCkudmFsdWU7XG5cbiAgICBjb25zdCBpZCA9IGdldFNlcnZpY2UoSU5vdGlmaWNhdGlvblNlcnZpY2UpLnNob3dOb3RpZmljYXRpb24oe1xuICAgICAgICB0aXRsZTogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aXRsZScpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIGNvbnRlbnQ6IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnY29udGVudCcpIGFzIFRleHRGaWVsZCkudmFsdWUsXG4gICAgICAgIHR5cGU6IHR5cGUgPT09ICdOb25lJyA/IHVuZGVmaW5lZCA6IHR5cGUgYXMgTm90aWZpY2F0aW9uVHlwZSxcbiAgICAgICAgcHJpb3JpdHk6IHBhcnNlSW50KChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncHJpb3JpdHknKSBhcyBUZXh0RmllbGQpLnZhbHVlKSxcbiAgICAgICAgdGltZW91dDogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aW1lb3V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZSlcbiAgICB9KTtcblxuICAgIG5vdGlmaWNhdGlvbnMucHVzaChpZCk7XG59XG5cbmV4cG9ydCBjb25zdCBoaWRlTm90aWZpY2F0aW9ucyA9ICgpID0+IHtcbiAgICBub3RpZmljYXRpb25zLmZvckVhY2goaWQgPT4gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuaGlkZU5vdGlmaWNhdGlvbihpZCkpO1xuICAgIG5vdGlmaWNhdGlvbnMubGVuZ3RoID0gMDtcbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0RhdGVzU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9EYXRlc1NlcnZpY2UnO1xuaW1wb3J0IHtDb21tYW5kTWVzc2FnZUJhc2ljUnN9IGZyb20gJ3NhYnJlLW5ndi1wb3MtY2RtL2NvbW1zZyc7XG5pbXBvcnQge0lDb21tYW5kTWVzc2FnZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jb21tc2cvc2VydmljZXMvSUNvbW1hbmRNZXNzYWdlU2VydmljZSc7XG5pbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5cbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbnJGb3JtID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHRlbkRheXNBaGVhZEZsaWdodCA9ICcxJyArIGdldFNlcnZpY2UoRGF0ZXNTZXJ2aWNlKS5nZXROb3coKS5hZGQoMTAsICdkYXlzJykuZm9ybWF0KCdERE1NTScpLnRvVXBwZXJDYXNlKCkgKyAnTEFTTEFYXFx1MDBBNUFBJztcblxuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlOiAnQ3JlYXRlIFBOUicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICctRE9FL0pPSE4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGVuRGF5c0FoZWFkRmxpZ2h0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGlja2V0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzAxWTInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnYWdlbnQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWdlbnQgSW5mbycsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc2QUdFTlQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnOTEyMzQ1NjcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGltZUxpbWl0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1RpY2tldGluZyB0aW1lIGxpbWl0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzdUQVcvJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ29rJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N1Ym1pdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IEN1c3RvbUZvcm1ScyA9IGF3YWl0IGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG4gICAgaWYgKHJlc3VsdC5hY3Rpb24gPT09ICdvaycpIHtcbiAgICAgICAgc2VsZlN1Ym1pdFBuckFjdGlvbihyZXN1bHQpO1xuICAgIH1cbn1cblxuY29uc3Qgc2VsZlN1Ym1pdFBuckFjdGlvbiA9IGFzeW5jIChmb3JtOiBDdXN0b21Gb3JtKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGNvbnN0IG5hbWVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICduYW1lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBmbGlnaHRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdmbGlnaHQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRpY2tldFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpY2tldCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgYWdlbnRJbmZvUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnYWdlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHBob25lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncGhvbmUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRhd1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVMaW1pdCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoMTUwMDApO1xuXG4gICAgY29uc3QgbmFtZVJzU3RhdHVzID0gYXdhaXQgc2VuZENvbW1hbmQobmFtZVJxLCAnTmFtZScpO1xuICAgIGNvbnN0IGZsaWdodHNTdGF0dXMgPSBuYW1lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoZmxpZ2h0UnEsICdGbGlnaHQgbGlzdCcpO1xuICAgIGNvbnN0IHRpY2tldFJzU3RhdHVzID0gZmxpZ2h0c1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0aWNrZXRScSwgJ1RpY2tldCcpO1xuICAgIGNvbnN0IGFnZW50SW5mb1JzU3RhdHVzID0gdGlja2V0UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoYWdlbnRJbmZvUnEsICdhZ2VudEluZm8nKTtcbiAgICBjb25zdCBwaG9uZVJzU3RhdHVzID0gYWdlbnRJbmZvUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQocGhvbmVScSwgJ1Bob25lJyk7XG4gICAgY29uc3QgdGF3UnNTdGF0dXMgPSBwaG9uZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRhd1JxLCAnVEFXJyk7XG4gICAgY29uc3Qgd3BSc1N0YXR1cyA9IHRhd1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdXUCcsICdXUCcpO1xuICAgIGNvbnN0IHBxUnNTdGF0dXMgPSB3cFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdQUScsICdQUScpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG4gICAgcHFSc1N0YXR1cyAmJiBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsICdQTlIgY3JlYXRlZCcpO1xufVxuXG5jb25zdCBzZW5kQ29tbWFuZCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcsIGZhaWx1cmVTZWdtZW50OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCByc1N0YXR1czogQ29tbWFuZE1lc3NhZ2VCYXNpY1JzID0gYXdhaXQgZ2V0U2VydmljZShJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlKS5zZW5kKGNvbW1hbmQpO1xuICAgIGxldCBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSByc1N0YXR1cy5TdGF0dXMuU3VjY2VzcztcblxuICAgIGlmIChpc1N1Y2Nlc3MgJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXS5UZXh0LmluY2x1ZGVzKCdTSUdOIElOJykpIHtcbiAgICAgICAgaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgIH0gZWxzZSBpZiAoIWlzU3VjY2Vzcykge1xuICAgICAgICBoYW5kbGVGYWlsdXJlKGZhaWx1cmVTZWdtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdWNjZXNzO1xufVxuXG5jb25zdCBoYW5kbGVGYWlsdXJlID0gKHNlZ21lbnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgYCR7c2VnbWVudH0gY3JlYXRpb24gZmFpbGVkYCk7XG59IiwiaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0gKG9uQ2xvc2U6ICgpID0+IHZvaWQsIG9uU3VibWl0OiAoKSA9PiB2b2lkKTogSlNYLkVsZW1lbnRbXSA9PiBbXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgID5cbiAgICAgICAgQ2xvc2VcbiAgICA8L0J1dHRvbj4sXG4gICAgPEJ1dHRvblxuICAgICAgICBrZXk9ezF9XG4gICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zdWNjZXNzXCJcbiAgICAgICAgb25DbGljaz17b25TdWJtaXR9XG4gICAgPlxuICAgICAgICBTdWJtaXRcbiAgICA8L0J1dHRvbj5dIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuaW50ZXJmYWNlIFN0b3JlQWN0aW9ucyB7XG4gICAgc2V0VXJsOiAodXJsOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0TWV0aG9kOiAobWV0aG9kOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0Qm9keTogKGJvZHk6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRIZWFkZXJzOiAoaGVhZGVyczogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG50eXBlIENvbXBvbmVudFByb3BzID0gU3RvcmVEYXRhICYgU3RvcmVBY3Rpb25zO1xuXG5jb25zdCBNb2RhbENvbXBvbmVudFB1cmUgPSAocHJvcHM6IENvbXBvbmVudFByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlJ30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jvdyd9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyd1cmwtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfT5VUkw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS11cmwtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCB1cmwtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbWV0aG9kLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH0+TWV0aG9kPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tbWV0aG9kLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgbWV0aG9kLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldE1ldGhvZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLm1ldGhvZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2JvZHktZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1ib2R5LWZpZWxkYH0+Qm9keTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBib2R5LWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEJvZHkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydoZWFkZXJzLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0taGVhZGVycy1maWVsZGB9PkhlYWRlcnM8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgaGVhZGVycy1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRIZWFkZXJzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuaGVhZGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29sLXhzLTYnfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyZXNwb25zZS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH0+UmVzcG9uc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1yZXNwb25zZS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHJlc3BvbnNlLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMucmVzcG9uc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17MzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGU6IFN0b3JlRGF0YSk6IFN0b3JlRGF0YSB7XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVcmw6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAndXJsJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TWV0aG9kOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ21ldGhvZCcsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEJvZHk6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnYm9keScsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldEhlYWRlcnM6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnaGVhZGVycycsIG5ld1ZhbH0pXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IE1vZGFsQ29tcG9uZW50ID0gY29ubmVjdDxTdG9yZURhdGEsIFN0b3JlQWN0aW9ucywgbmV2ZXI+KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNb2RhbENvbXBvbmVudFB1cmUpO1xuIiwiaW1wb3J0IHtQbnJQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL1BuclB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCByZWZyZXNoVHJpcFN1bW1hcnkgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG5yUHVibGljU2VydmljZTogUG5yUHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoUG5yUHVibGljU2VydmljZSk7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICBjb25zdCByZWNvcmRMb2NhdG9yID0gcG5yUHVibGljU2VydmljZS5nZXRSZWNvcmRMb2NhdG9yKCk7XG4gICAgaWYgKHJlY29yZExvY2F0b3IpIHtcbiAgICAgICAgcG5yUHVibGljU2VydmljZS5yZWZyZXNoRGF0YSgpO1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdJbmZvJywgJ0FjdGl2ZSBQTlIgaGFzIGJlZW4gcmVmcmVzaGVkLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0Vycm9yJywgJ1RoZXJlIGlzIG5vIGFjdGl2ZSBQTlIgdG8gcmVmcmVzaC4nKTtcbiAgICB9XG59IixudWxsLCJpbXBvcnQge0FnZW50UHJvZmlsZVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQWdlbnRQcm9maWxlU2VydmljZSc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5jb25zdCBOT1RfQVZBSUxBQkxFID0gJ05vdCBBdmFpbGFibGUnO1xuZXhwb3J0IGNvbnN0IHNob3dBZ2VudFByb2ZpbGUgPSAoKTogdm9pZCA9PiB7XG5cbiAgICBjb25zdCBzZXJ2aWNlOiBBZ2VudFByb2ZpbGVTZXJ2aWNlID0gZ2V0U2VydmljZShBZ2VudFByb2ZpbGVTZXJ2aWNlKTtcbiAgICBjb25zdCBhZ2VudElkID0gc2VydmljZS5nZXRBZ2VudElkKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBsb2NhbGUgPSBzZXJ2aWNlLmdldExvY2FsZSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcGNjID0gc2VydmljZS5nZXRQY2MoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGNvdW50cnkgPSBzZXJ2aWNlLmdldENvdW50cnkoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IHJlZ2lvbiA9IHNlcnZpY2UuZ2V0UmVnaW9uKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjdXN0b21lckJ1c2luZXNzVW5pdCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJCdXNpbmVzc1VuaXQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyRW1wbG95ZWVJZCA9IHNlcnZpY2UuZ2V0Q3VzdG9tZXJFbXBsb3llZUlkKCkgfHwgTk9UX0FWQUlMQUJMRTtcblxuICAgIGNvbnN0IGFnZW50UHJvZmlsZURlc2NyaXB0aW9uID0gYEFnZW50IElEOiAqKiR7YWdlbnRJZH0qKlxcbmAgK1xuICAgICAgICBgUHNldWRvIENpdHkgQ29kZTogKioke3BjY30qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgQ291bnRyeTogKioke2NvdW50cnl9KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgQWdlbmN5IFJlZ2lvbjogKioke3JlZ2lvbn0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBMb2NhbGU6ICoqJHtsb2NhbGV9KipcXG5gICtcbiAgICAgICAgYEN1c3RvbWVyIEJ1c2luZXNzIFVuaXQ6ICoqJHtjdXN0b21lckJ1c2luZXNzVW5pdH0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgRW1wbG95ZWUgSUQ6ICoqJHtjdXN0b21lckVtcGxveWVlSWR9KipcXG5gO1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdBZ2VudCBQcm9maWxlJywgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24pXG59IiwiaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7QmFubmVyQ29uZmlnfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Jhbm5lckNvbmZpZyc7XG5pbXBvcnQge3Nob3dCdXR0b25BY3Rpb259IGZyb20gJy4vc2hvd0J1dHRvbkFjdGlvbic7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0Jhbm5lcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcblxuICAgIGNvbnN0IGNvbmZpZ0luZm86IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdGV4dDogJ0luZm8gYmFubmVyIHdpdGhvdXQgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdJbmZvKTtcblxuICAgIGNvbnN0IGNvbmZpZ0Vycm9yOiBCYW5uZXJDb25maWc9IHtcbiAgICAgICAgdHlwZTogJ0Vycm9yJyxcbiAgICAgICAgdGV4dDogJ0Vycm9yIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdFcnJvciB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0Vycm9yKTtcblxuICAgIGNvbnN0IGNvbmZpZ1N1Y2Nlc3M6IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdHlwZTogJ1N1Y2Nlc3MnLFxuICAgICAgICB0ZXh0OiAnU3VjY2VzcyBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnU3VjY2VzcyB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1N1Y2Nlc3MpO1xuXG4gICAgY29uc3QgY29uZmlnV2FybmluZzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnV2FybmluZycsXG4gICAgICAgIHRleHQ6ICdXYXJuaW5nIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdXYXJuaW5nIHRpdGxlJyxcbiAgICAgICAgbGFiZWw6ICdXYXJuaW5nIGFjdGlvbicsXG4gICAgICAgIGFjdGlvbjogc2hvd0J1dHRvbkFjdGlvblxuICAgIH1cbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ1dhcm5pbmcpO1xufSIsImltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dCdXR0b25BY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ1dhcm5pbmcgYWN0aW9uJywgJ1RoZSB3YXJuaW5nIGFjdGlvbiBidXR0b24gaGFzIGJlZW4gcHJlc3NlZC4nKVxufSIsImltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93SW50ZXJzdGl0aWFsID0gKCk6IHZvaWQgPT4ge1xuICAgIGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSkuc2hvd0ludGVyc3RpdGlhbCg1MDAwKTtcbn0iLCJpbXBvcnQge0Vudmlyb25tZW50UHVibGljU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IHNob3dSdW50aW1lID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2U6IEVudmlyb25tZW50UHVibGljU2VydmljZSA9IGdldFNlcnZpY2UoRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlKTtcblxuICAgIGNvbnN0IHJ1bnRpbWUgPSBzZXJ2aWNlLmdldFJ1bnRpbWUoKSB8fCAnTm90IEF2YWlsYWJsZSc7XG5cbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnUnVubmluZyBvbicsIGBSdW5uaW5nIG9uOiAke3J1bnRpbWV9YCk7XG59IixudWxsLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtJTW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtJMThuU2VydmljZSwgU2NvcGVkVHJhbnNsYXRvcn0gZnJvbSBcInNhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSTE4blNlcnZpY2VcIjtcblxuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjb250ZXh0OiBJTW9kdWxlQ29udGV4dCA9IG5ldyBNb2R1bGVDb250ZXh0KFwiY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZVwiKTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY2Y6IElNb2R1bGVDb250ZXh0WydjZiddID0gY29udGV4dC5jZi5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlclNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydyZWdpc3RlclNlcnZpY2UnXSA9IGNvbnRleHQucmVnaXN0ZXJTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGdldFNlcnZpY2U6IElNb2R1bGVDb250ZXh0WydnZXRTZXJ2aWNlJ10gPSBjb250ZXh0LmdldFNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgdDogU2NvcGVkVHJhbnNsYXRvciA9IGdldFNlcnZpY2UoSTE4blNlcnZpY2UpLmdldFNjb3BlZFRyYW5zbGF0b3IoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvdHJhbnNsYXRpb25zJyk7XG4iLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtNYWlufSBmcm9tICcuL01haW4nO1xuaW1wb3J0IHtJTW9kdWxlTWFuaWZlc3R9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZU1hbmlmZXN0JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi9Db250ZXh0JztcblxuLyoqXG4gKiAgQXV0b2dlbmVyYXRlZCBjbGFzcyByZXByZXNlbnRpbmcgbW9kdWxlIGluIHJ1bnRpbWUuXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGVfY29tX3NhYnJlX3JlZGFwcF9leGFtcGxlM193ZWJfY3VzdG9td29ya2Zsb3dfd2ViX21vZHVsZSBleHRlbmRzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKG1hbmlmZXN0OiBJTW9kdWxlTWFuaWZlc3QpIHtcbiAgICAgICAgc3VwZXIobWFuaWZlc3QpO1xuICAgICAgICBjb250ZXh0LnNldE1vZHVsZSh0aGlzKTtcbiAgICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFN0b3JlRGF0YSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nO1xuICAgIGhlYWRlcnM6IHN0cmluZztcbiAgICByZXNwb25zZTogc3RyaW5nO1xufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFNlcnZpY2UsIHJlZ2lzdGVyU2VydmljZSB9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qb2ludFNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbiB9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9SZWRBcHBTaWRlUGFuZWxDb25maWcnO1xuXG5pbXBvcnQgeyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVQbnJGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0nO1xuaW1wb3J0IHsgY2FsbExhc0xheCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxsTGFzTGF4JztcbmltcG9ydCB7IHNob3dSdW50aW1lIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dSdW50aW1lJztcbmltcG9ydCB7IHNob3dJbnRlcnN0aXRpYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbCc7XG5pbXBvcnQgeyBzaG93QWdlbnRQcm9maWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dBZ2VudFByb2ZpbGUnO1xuaW1wb3J0IHsgc2hvd0Jhbm5lcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMnO1xuaW1wb3J0IHsgcmVmcmVzaFRyaXBTdW1tYXJ5IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeSc7XG5pbXBvcnQgeyBjYWxsRXh0ZXJuYWxTZXJ2aWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxFeHRlcm5hbFNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSwgaGlkZU5vdGlmaWNhdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybSc7XG5cbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcnO1xuXG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5cbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RyYXdlclNlcnZpY2UnO1xuaW1wb3J0IHsgTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9jb25maWdzL2RyYXdlci9MYXJnZVdpZGdldERyYXdlckNvbmZpZyc7XG5cbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1RpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlJztcbmltcG9ydCB7IFNlYXRNYXBTaG9wcGluZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3JztcblxuaW1wb3J0IHsgSUFpclByaWNpbmdTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvc2VydmljZXMvSUFpclByaWNpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByaWNpbmdUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUnO1xuaW1wb3J0IHsgUHJpY2luZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVmlldyc7XG5cblxuZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBNb2R1bGUge1xuICBpbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VydmljZXMoKTtcbiAgICB0aGlzLnNldHVwU2lkZVBhbmVsQnV0dG9ucygpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJTZXJ2aWNlcygpOiB2b2lkIHtcbiAgICByZWdpc3RlclNlcnZpY2UoQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTaWRlUGFuZWxCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VDc3NDbGFzc05hbWVzID0gJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItY3VzdG9td29ya2Zsb3cnO1xuXG4gICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBSZWRBcHBTaWRlUGFuZWxDb25maWcoW1xuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBiYW5uZXJzJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWJhbm5lcnMnLCBzaG93QmFubmVycyksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdFeHRlcm5hbCBzZXJ2aWNlIGNhbGwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctZXh0ZXJuYWxzZXJ2aWNlY2FsbCcsIGNhbGxFeHRlcm5hbFNlcnZpY2UpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVkQXBwIHBsYXRmb3JtJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBsYXRmb3JtJywgc2hvd1J1bnRpbWUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignTEFTIC0gTEFYJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFjdGlvbicsIGNhbGxMYXNMYXgpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIFBOUicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbnInLCBjcmVhdGVQbnJGb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgaW50ZXJzdGl0aWFsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWludGVyc3RpdGlhbCcsIHNob3dJbnRlcnN0aXRpYWwpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBBZ2VudCBQcm9maWxlJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFnZW50cHJvZmlsZScsIHNob3dBZ2VudFByb2ZpbGUpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVmcmVzaCBUcmlwIFN1bW1hcnknLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVmcmVzaHRyaXAnLCByZWZyZXNoVHJpcFN1bW1hcnkpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIG5vdGlmaWNhdGlvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1jcmVhdGVOb3RpZmljYXRpb24nLCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0hpZGUgbm90aWZpY2F0aW9ucycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1oaWRlTm90aWZpY2F0aW9uJywgaGlkZU5vdGlmaWNhdGlvbnMpLFxuICAgICAgc2VsZlJlbW92ZUJ0blxuICAgIF0pO1xuXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygncmVkQXBwU2lkZVBhbmVsJywgY29uZmlnKTtcbiAgfVxuXG4gIC8vIEF2YWlsYWJpbGl0eVRpbGVcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgYWlyQXZhaWxhYmlsaXR5U2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSk7IC8vIDI9Q0JANT09ODkgQTVAMjhBIDQ7TyA/QDU0PkFCMDI7NT04TyA0MD09S0UgMiBAMDw6MEUgQXZhaWxhYmlsaXR5XG5cbiAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnQUJDIFNlYXRNYXAgKEF2YWlsYWJpbGl0eSknLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcEF2YWlsVmlldywgZGF0YSksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH07XG5cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobW9kYWxPcHRpb25zKTtcbiAgICB9O1xuXG4gICAgYWlyQXZhaWxhYmlsaXR5U2VydmljZS5jcmVhdGVBaXJBdmFpbGFiaWxpdHlTZWFyY2hUaWxlKFxuICAgICAgU2VhdE1hcEF2YWlsVGlsZSxcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwsXG4gICAgICAnQUJDIFNlYXRNYXAnXG4gICAgKTtcbiAgfVxuXG4gIC8vIFNob3BwaW5nVGlsZSBcbiAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTogdm9pZCB7XG4gICAgLy8gPj9ANTQ1O081PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBjb25zdCBzaG9wcGluZ0RyYXdlckNvbmZpZyA9IG5ldyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyhTZWF0TWFwU2hvcHBpbmdUaWxlLCBTZWF0TWFwU2hvcHBpbmdWaWV3LCB7XG4gICAgICB0aXRsZTogJ1Nob3BwaW5nIFRpbGUgV2lkZ2V0JyAvLyA3MDM+Oz4yPjogPjo9MFxuICAgIH0pO1xuICAgIC8vIDJLNzJLMjA1PCBBNUAyOEEgQSBNQjg8IGNvbmZpZyBzaG9wcGluZ0RyYXdlckNvbmZpZ1xuICAgIGdldFNlcnZpY2UoRHJhd2VyU2VydmljZSkuYWRkQ29uZmlnKFsnc2hvcHBpbmctZmxpZ2h0LXNlZ21lbnQnXSwgc2hvcHBpbmdEcmF3ZXJDb25maWcpO1xuXG4gICAgLy8gUHJpY2luZyBUaWxlXG4gICAgY29uc3Qgc2hvd1ByaWNpbmdNb2RhbCA9IHRoaXMuY3JlYXRlU2hvd01vZGFsQWN0aW9uKFByaWNpbmdWaWV3LCAnUHJpY2luZyBEYXRhJyk7XG4gICAgZ2V0U2VydmljZShJQWlyUHJpY2luZ1NlcnZpY2UpLmNyZWF0ZVByaWNpbmdUaWxlKFByaWNpbmdUaWxlLCBzaG93UHJpY2luZ01vZGFsLCAnQUJDIFNlYXQgTWFwJyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2hvd01vZGFsQWN0aW9uKHZpZXc6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PGFueT4sIGhlYWRlcjogc3RyaW5nKTogKGRhdGE6IGFueSkgPT4gdm9pZCB7XG4gICAgcmV0dXJuICgoZGF0YSkgPT4ge1xuICAgICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgdmlldyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgICksXG4gICAgICAgIG1vZGFsQ2xhc3NOYW1lOiAncmVhY3QtdGlsZS1tb2RhbC1jbGFzcydcbiAgICAgIH1cbiAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbiAgICB9KVxuICB9XG5cblxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGU6IFN0b3JlRGF0YSA9IHtcbiAgICB1cmw6ICdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMScsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBib2R5OiAnJyxcbiAgICBoZWFkZXJzOiAne30nLFxuICAgIHJlc3BvbnNlOiAnJ1xufVxuXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdG9yZURhdGEgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdTRVRfUEFSQU1FVEVSJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi5uZXdWYWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlIHtcblxuICAgIHB1YmxpYyBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xuXG4gICAgZ2V0RGF0YSgpOiBTdG9yZURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtJQ3VzdG9tV29ya2Zsb3d9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvaW50ZXJmYWNlcy9JQ3VzdG9tV29ya2Zsb3cnO1xuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSUFyZWFTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbi8qKlxuICogU2VydmljZSB1c2VkIHdpdGggZGVjbGFyYXRpdmUgY3VzdG9tIHdvcmtmbG93IGluIG1hbmlmZXN0Lmpzb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21Xb3JrZmxvd1NlcnZpY2UgZXh0ZW5kcyBJQ3VzdG9tV29ya2Zsb3cge1xuICAgIHN0YXRpYyBTRVJWSUNFX05BTUUgPSAnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS1DdXN0b21Xb3JrZmxvd1NlcnZpY2UnO1xuXG4gICAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSA9IGdldFNlcnZpY2UoSUFyZWFTZXJ2aWNlKTtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignSW5mbycsICdDdXN0b20gV29ya2Zsb3cgU2VydmljZSBTdWNjZXNzJyk7XG4gICAgfVxufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGggPSAodGl0bGU6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdQQVJBR1JBUEgnLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2xvc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG59IixudWxsLG51bGwsbnVsbF19 