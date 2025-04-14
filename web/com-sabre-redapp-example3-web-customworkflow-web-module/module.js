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
        // 🔍 Добавляем логирование для изучения данных cpa
        console.log('📥 [Shopping] cpa Object:', cpa);
        console.log('📥 [Shopping] Available methods on cpa:', Object.keys(cpa));
        try {
            var shoppingItinerary = cpa.getShoppingItinerary();
            console.log('📥 [Shopping] shoppingItinerary:', shoppingItinerary);
            var flightSegments = shoppingItinerary.getFlightSegments();
            console.log('📥 [Shopping] Flight Segments:', flightSegments);
            // Логируем каждый сегмент отдельно
            flightSegments.forEach(function (segment, index) {
                console.log("\uD83D\uDCE5 [Shopping] Flight Segment " + index + ":", segment);
            });
            // Извлекаем номера рейсов для отображения в Tile
            var flightNumbers = cpa.getShoppingItinerary().getFlightSegments().map(function (segment) { return segment.getFlightNumber(); });
            var segmentsHtml = flightNumbers.length > 1
                ? "<div style=\"margin-bottom: 5px; text-align: center;\">Segments:<br />" + flightNumbers.join(', ') + "</div>"
                : "<div style=\"margin-bottom: 5px; text-align: center;\">Segment: " + (flightNumbers.join(', ') || 'N/A') + "</div>";
            // Добавляем кнопку SeatMaps ABC 360
            var buttonHtml = "\n        <div style=\"margin-top: 4px; display: flex; justify-content: center;\">\n            <button class=\"abc-seatmap-button\" style=\"\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: 6px 10px 20px 10px;\n                background-color: #2f73bc;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n                font-size: 12px;\n                height: 24px;\n            \">\n                SeatMaps ABC 360\n            </button>\n        </div>\n    ";
            this.setDataContent(segmentsHtml + buttonHtml);
        }
        catch (error) {
            console.error('❌ [Shopping] Error retrieving flight segments:', error);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50QXZhaWwudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwQ29tcG9uZW50UHJpY2luZy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZy50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcFNob3BwaW5nRHJhd2VyVmlldy5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9TZWF0TWFwU2hvcHBpbmdWaWV3LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcEF2YWlsTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC9zaG93U2VhdE1hcE1vZGFsRm9yU2VnbWVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC90cmFuc2Zvcm1GbGlnaHQuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvUHJpY2luZ1RpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1ByaWNpbmdWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwQXZhaWxWaWV3LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdUaWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3czL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdXRpbHMvdHJhbnNmb3JtRmxpZ2h0LmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzMvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFRpbGUuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93My93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3ZpZXdzL2F2YWlsL3NlYXRtYXAvU2VhdE1hcEF2YWlsVmlldy5qcyIsInNyYy9jb2RlL3ZpZXdzL1NhbXBsZUNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU0sc0JBQXNCLEdBQUcsVUFBQyxJQUFTLEVBQUUsWUFBd0I7O0lBQXhCLDZCQUFBLEVBQUEsZ0JBQXdCO0lBQ3hFLElBQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUcsWUFBWSxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQW9CLFlBQVksZUFBWSxDQUFDLENBQUM7UUFDM0QsT0FBTztZQUNMLEVBQUUsRUFBRSxTQUFTO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUM7S0FDSDtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckcsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFFcEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEVBQThFLENBQUMsQ0FBQztRQUM3RixPQUFPO1lBQ0wsRUFBRSxFQUFFLFNBQVM7WUFDYixXQUFXLEVBQUUsQ0FBQSxNQUFBLE1BQUEsT0FBTyxDQUFDLGdCQUFnQiwwQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxLQUFJLEVB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QUNyQixLQUFLLE9BQUE7UUFDTCxNQUFNLEVBQUU7WUFDSjtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLEdBQUc7YUFDWjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksRUFBRSxFQUFFLFFBQVE7Z0JBQ1osS0FBSyxFQUFFLE9BQU87YUFDakI7U0FDSjtLQUNKLENBQUM7SUFDRixJQUFBLG9CQUFVLEVBQUMseUNBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsdUJBQXVCLDJCQWtCbkM7Ozs7OztBQ3RCRDtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQSw2QkFBK0I7QUFFL0I7SUFBcUMsbUNBQXNDO0lBQTNFOztJQVdBLENBQUM7SUFURyxnQ0FBTSxHQUFOO1FBQ0ksT0FBTyxDQUNILDZCQUFLLFNBQVMsRUFBQyxnRUFBZ0U7WUFDM0UsNkJBQUssU0FBUyxFQUFDLGtCQUFrQixxQkFFM0IsQ0FDSixDQUNULENBQUM7SUFDTixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYb0MsS0FBSyxDQUFDLFNBQVMsR0FXbkQ7QUFYWSwwQ0FBZSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coJz3MIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSAfPjs9SzUgNDA9PUs1IEE1Mzw1PUIwOicsIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQsIG51bGwsIDIpKTtcblxuICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuRGVwYXJ0dXJlRGF0ZVRpbWU7XG5cbiAgaWYgKCFkZXBhcnR1cmVEYXRlVGltZSkge1xuICAgIGNvbnNvbGUud2FybignoA8gW2dldEZsaWdodEZyb21TYWJyZURhdGFdIERlcGFydHVyZURhdGVUaW1lID5CQUNCQUIyQzVCIDIgNDA9PUtFIEE1Mzw1PUIwIScpO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1VOS05PV04nLFxuICAgICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlciB8fCAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLFxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnQSdcbiAgfTtcbn07IiwiZXhwb3J0IGNvbnN0IHF1aWNrZXRDb25maWcgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBsYW5nOiAnRU4nLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICB2aXNpYmxlRnVzZWxhZ2U6IHRydWUsXG4gICAgdmlzaWJsZVdpbmdzOiB0cnVlLFxuICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgc2luZ2xlRGVja01vZGU6IHRydWUsXG4gICAgYnVpbHRJblRvb2x0aXA6IHRydWUsXG4gICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICB0b29sdGlwT25Ib3ZlcjogZmFsc2UsXG4gICAgY29sb3JUaGVtZToge1xuICAgICAgICBzZWF0TGFiZWxDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgc2VhdFN0cm9rZUNvbG9yOiAnZ3JheSdcbiAgICB9XG59OyIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgLy8gPQ0gGz4zOEBDNTwgMkU+NE9JODUgNDA9PUs1XG4gIGNvbnNvbGUubG9nKCc9OSBbU2VhdE1hcENvbXBvbmVudF0gcmVjZWl2ZWQgcHJvcHM6JywgeyBjb25maWcsIGRhdGEgfSk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQTUzPDU9QiA/Pjs1QjAgYyA0MEI+OVxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHQpO1xuICBcbiAgLy8gZmxpZ2h0IDQ7TyA/QD4yNUA6OFxuICAvLyBmbGlnaHQ6e1xuICAvLyAgIGlkOiAnMDAxJywgXG4gIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJywgXG4gIC8vICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAvLyAgICAgYXJyaXZhbDogJ0ZSQScsXG4gIC8vICAgICBjYWJpbkNsYXNzOiAnQSdcbiAgLy8gfSxcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG5cbiAgICAgIC8vIEAwQTo+PDw1PUI4QD4yMEJMID9AOCA9NT4xRT40ODw+QUI4XG4gICAgICAvLyBhdmFpbGFiaWxpdHk6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmF2YWlsYWJpbGl0eSksXG4gICAgICAvLyBwYXNzZW5nZXJzOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5wYXNzZW5nZXJzKVxuXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWUgd2l0aCBkYXRhOicsIHtcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gIH07XG5cbiAgY29uc29sZS5sb2coJz7gIFNlYXRNYXBDb21wb25lbnQgaXMgcmVuZGVyaW5nIScpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz3gDyBTZWF0TWFwQ29tcG9uZW50IG1vdW50ZWQnKTtcbiAgICBjb25zb2xlLmxvZyhgPQQgU2VnbWVudCBpbmRleCBjaGFuZ2VkOiAke3NlZ21lbnRJbmRleH1gKTtcbiAgICBzZW5kVG9JZnJhbWUoKTsgLy8gPkI/QDAyOjAgP0A4IDg3PDU9NT04OCBBNTM8NT1CMFxuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qID46PT4gQSA0MD09Szw4ID4gQDU5QTUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGZsaWdodCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4vZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzogUmVhY3QuRkM8U2VhdE1hcFByb3BzPiA9ICh7IGNvbmZpZywgZGF0YSB9KSA9PiB7XG4gIGNvbnN0IFtzZWdtZW50SW5kZXgsIHNldFNlZ21lbnRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgaWZyYW1lUmVmID0gdXNlUmVmPEhUTUxJRnJhbWVFbGVtZW50PihudWxsKTtcblxuICAvLyA9DSAbPjM4QEM1PCAyRT40T0k4NSA0MD09SzVcbiAgLy8gY29uc29sZS5sb2coJz05IFtTZWF0TWFwQ29tcG9uZW50XSByZWNlaXZlZCBwcm9wczonLCB7IGNvbmZpZywgZGF0YSB9KTtcbiAgXG4gIGNvbnNvbGUubG9nKCc95SBbU2VhdE1hcENvbXBvbmVudF0gSW5jb21pbmcgZGF0YTonLCBkYXRhKTtcblxuLy8gHz47Q0cwNTwgQjU6Q0k4OSBBNTM8NT1CXG5jb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5jb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgLy8gPQ0gGz4zOEBDNTwgQUQ+QDw4QD4yMD09SzkgZmxpZ2h0XG4gIGNvbnNvbGUubG9nKCcIDyBbU2VhdE1hcENvbXBvbmVudF0gcGFyc2VkIGZsaWdodDonLCBmbGlnaHRTZWdtZW50cyk7XG4gIFxuICAvLyBmbGlnaHQgNDtPID9APjI1QDo4XG4gIC8vIGZsaWdodDp7XG4gIC8vICAgaWQ6ICcwMDEnLCBcbiAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLCBcbiAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gIC8vICAgICBhcnJpdmFsOiAnRlJBJyxcbiAgLy8gICAgIGNhYmluQ2xhc3M6ICdBJ1xuICAvLyB9LFxuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQ6IHtcbiAgICAgICAgaWQ6ICcwMDEnLCAgLy8gIzE1NDhBTCwgR0I+ID81QDU0MDVCQU8gaWRcbiAgICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgICAgZmxpZ2h0Tm86IGN1cnJlbnRTZWdtZW50LmZsaWdodE51bWJlciB8fCAnMTIzJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogY3VycmVudFNlZ21lbnQuZGVwYXJ0dXJlRGF0ZVRpbWUgfHwgJzIwMjUtMDQtMjInLFxuICAgICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgICAgYXJyaXZhbDogY3VycmVudFNlZ21lbnQuZGVzdGluYXRpb24gfHwgJ0ZSQScsXG4gICAgICAgIGNhYmluQ2xhc3M6IGN1cnJlbnRTZWdtZW50LmNhYmluQ2xhc3MgfHwgJ0EnXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA8PjY9PiBAMEE6Pjw8NT1COEA+MjBCTCA/QDggPTU+MUU+NDg8PkFCOFxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRdIHNlbmRpbmcgdG8gaWZyYW1lIHdpdGggZGF0YTonLCB7XG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gIH0pO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0+XG4gICAgICAgICAge2ZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0+XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJ1hYJ30ge3NlZ21lbnQuRmxpZ2h0TnVtYmVyIHx8ICcwMDAnfVxuICAgICAgICAgICAgICAmbmJzcDuSJm5ic3A7XG4gICAgICAgICAgICAgIHtzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfSATXG4gICAgICAgICAgICAgIHtzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50UHJpY2luZzsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwUHJvcHMge1xuICBjb25maWc6IGFueTtcbiAgZGF0YTogYW55OyAvLyAUMD09SzUsIDo+Qj5ASzUgP0A4RT40T0IgODcgU2hvcHBpbmcgQUY1PTBAOE9cbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4vLyAfPjtDRzA1PCBCNTpDSTg5IEE1Mzw1PUJcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuICBjb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB8+O0NHNT09SzUgNDA9PUs1OicsIGRhdGEpO1xuXG4gICAgICAgIC8vIC8vID0oICUwQDQ6PjQ4PCA0MD09SzUgNDtPID9APjI1QDo4XG4gICAgICAgIC8vIGNvbnN0IGZsaWdodERhdGEgPSB7XG4gICAgICAgIC8vICAgICBhaXJsaW5lQ29kZTogJ0xIJyxcbiAgICAgICAgLy8gICAgIGZsaWdodE5vOiAnMTIzJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZURhdGU6ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgLy8gICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIC8vICAgICBhcnJpdmFsOiAnRlJBJ1xuICAgICAgICAvLyB9O1xuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZyxcbiAgICBmbGlnaHQ6IHtcblxuICAgICAgICBpZDogJzAwMScsICAvLyAjMTU0OEFMLCBHQj4gPzVANTQwNUJBTyBpZFxuICAgICAgICBhaXJsaW5lQ29kZTogY3VycmVudFNlZ21lbnQubWFya2V0aW5nQWlybGluZSB8fCAnTEgnLFxuICAgICAgICBmbGlnaHRObzogY3VycmVudFNlZ21lbnQuZmxpZ2h0TnVtYmVyIHx8ICcxMjMnLFxuICAgICAgICBkZXBhcnR1cmVEYXRlOiBjdXJyZW50U2VnbWVudC5kZXBhcnR1cmVEYXRlVGltZSB8fCAnMjAyNS0wNC0yMicsXG4gICAgICAgIGRlcGFydHVyZTogY3VycmVudFNlZ21lbnQub3JpZ2luIHx8ICdNVUMnLFxuICAgICAgICBhcnJpdmFsOiBjdXJyZW50U2VnbWVudC5kZXN0aW5hdGlvbiB8fCAnRlJBJyxcbiAgICAgICAgY2FiaW5DbGFzczogY3VycmVudFNlZ21lbnQuY2FiaW5DbGFzcyB8fCAnQSdcblxuICAgICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH07XG5cbiAgY29uc29sZS5sb2coJwgPIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddICFEPkA8OEA+MjA9PUs1IDQwPT1LNSA0O08gPkI/QDAyOjg6Jywgc2VhdE1hcERhdGEpO1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgODs4IGNvbnRlbnRXaW5kb3cgPTUgND5BQkM/NT0uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudFNob3BwaW5nXSAeQj9AMDI6MCA0MD09S0UgMiBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNlbmRUb0lmcmFtZSgpO1xuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiBGbGlnaHQgSW5mbyBTZWN0aW9uICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fT5cbiAgICAgICAgICAgICAge3NlZ21lbnQubWFya2V0aW5nQWlybGluZSB8fCAnWFgnfSB7c2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzAwMCd9OiB7c2VnbWVudC5vcmlnaW59IJIge3NlZ21lbnQuZGVzdGluYXRpb259XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17c2VuZFRvSWZyYW1lfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnRTaG9wcGluZzsiLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnRBdmFpbCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG4vLyBkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIFxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBBdmFpbE1vZGFsKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwcyBBQkMgMzYwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudEF2YWlsLCB7XG4gICAgICBjb25maWc6IHF1aWNrZXRDb25maWcsXG4gICAgICBkYXRhIC8vID81QDU0MFE8IGRhdGEgLSA+MUo1OkIgQjg/MCBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICBcbn0iLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuXG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFByaWNpbmcgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50UHJpY2luZyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudEF2YWlsIGZyb20gJy4vU2VhdE1hcENvbXBvbmVudEF2YWlsJztcblxuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5pbXBvcnQgeyBBaXJQcmljaW5nRGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3Jlc3BvbnNlL2ludGVyZmFjZXMvQWlyUHJpY2luZ0RhdGEnO1xuXG4vLyBkYXRhOiBBaXJQcmljaW5nRGF0YVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoZGF0YTogQWlyUHJpY2luZ0RhdGEpOiB2b2lkIHtcblxuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAvLyBEPkA8OEBDNTwgb3B0aW9ucyA0O08gPzVANTQwRzggMiA8PjQwO0w9PjUgPjo9PlxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlcicsXG4gICAgLy8gQT43NDA1PCBSZWFjdC06Pjw/Pj01PUIgPTAgPkE9PjI1IFNlYXRNYXBDb21wb25lbnRcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudFByaWNpbmcsIHtcbiAgICAgIGNvbmZpZzogcXVpY2tldENvbmZpZyxcbiAgICAgIGRhdGEgLy8gPzVANTQwUTwgZGF0YSAtID4xSjU6QiBCOD8wIEFpclByaWNpbmdEYXRhIEY1Ozg6PjxcbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICBcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudCBmcm9tICcuL1NlYXRNYXBDb21wb25lbnRBdmFpbCc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggPkI+MUAwNjU9OE8gOjBAQktcblxuLy8gZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YVxuXG5pbnRlcmZhY2UgU2VhdE1hcFNob3BwaW5nRGF0YSB7XG4gICAgZmxpZ2h0U2VnbWVudHM6IGFueVtdOyAgLy8gHD42PT4gNzA8NT04QkwgPTAgOj49OkA1Qj1LOSBCOD8sIDVBOzggODcyNUFCNT1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwU2hvcHBpbmdNb2RhbChkYXRhOiBTZWF0TWFwU2hvcHBpbmdEYXRhKTogdm9pZCB7XG5cbiAgICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAgIGlmICghbW9kYWxTZXJ2aWNlIHx8IHR5cGVvZiBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBQdWJsaWNNb2RhbHNTZXJ2aWNlIG5vdCBhdmFpbGFibGUgb3Igbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAgLy8gPcwgFzA6QEtCTCAyQTUgP0A1NEs0Q0k4NSA8PjQwO0w9SzUgPjo9MCA/NUA1NCA+QjpAS0I4NTwgPT4yPjM+XG4gICAgIHRyeSB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEFsbCBwcmV2aW91cyBtb2RhbHMgY2xvc2VkLicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3IgaGlkaW5nIG1vZGFsczonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCBWaWV3ZXInLFxuICAgICAgICAvLyBBPjc0MDU8IFJlYWN0LTo+PD8+PTU9QiA9MCA+QT0+MjUgU2VhdE1hcENvbXBvbmVudFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KSxcbiAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgU2hvcHBpbmcgTW9kYWxdIENsb3NlZCcpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBNb2RhbCBkYXRhOicsIGRhdGEpO1xuXG4gICAgLy8gH0A+MjVAOjAgPTAgND5BQkM/PT5BQkwgPDVCPjQwIGBzaG93UmVhY3RNb2RhbGBcbiAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3Igc2hvd2luZyBtb2RhbDonLCBlcnJvcik7XG4gICAgfVxuXG59IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0FpclByaWNpbmdEYXRhfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcblxuZXhwb3J0IGNvbnN0IFByaWNpbmdUaWxlID0gKGRhdGE6IEFpclByaWNpbmdEYXRhKSA6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZGstcHJpY2luZy1jdXN0b20tdGlsZS1jb250ZW50XCIgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmc6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PkFCQyBTZWF0IE1hcDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYmMtc2VhdG1hcC1idXR0b25cIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzRweCA4cHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmY3M2JjJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4J1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQUJDIFNlYXQgTWFwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFpclByaWNpbmdEYXRhIH0gZnJvbSAnc2FicmUtbmd2LXByaWNpbmcvcmVzcG9uc2UvaW50ZXJmYWNlcy9BaXJQcmljaW5nRGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcFByaWNpbmdNb2RhbCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwnO1xuXG4vLyBUT0RPIDo+QEA1OkI9SzkgMksxPkAgQTUzPDU9QjBcblxuZXhwb3J0IGNvbnN0IFByaWNpbmdWaWV3ID0gKGRhdGE6IEFpclByaWNpbmdEYXRhKSA6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJz2AIFByaWNpbmdWaWV3IGRhdGE6JywgZGF0YSk7IC8vIBs+MyA0O08gPkI7MDQ6OFxuICAgICAgICBzaG93U2VhdE1hcFByaWNpbmdNb2RhbChkYXRhKTsgLy8gEks3PjIgREM9OkY4OCA/PjowNzAgPD40MDtMPT4zPiA+Oj0wIGMgNDA9PUs8OCAoZGF0YSlcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1wcmljaW5nLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbiAgICAgICAgICAgIDxwPh5COkBLMjA1PCBTZWF0TWFwIFZpZXdlci4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JyB9fT4gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9saT4gIFxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9vbD5cblxuICAgICAgICAgICAgey8qIBQ+MTAyOzU9MCA6PT4/OjAqL31cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJjLXNlYXRtYXAtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyZjczYmMnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICcyNXB4JyAvLyAFIBQ+MTAyOzU9PiBBPDVJNT04NSAyOzUyPiA9MCAyNXB4XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBTZWF0TWFwcyBBQkMgMzYwXG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gXG5cbi8vIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuLy8gaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0NvbnRleHQnO1xuLy8gaW1wb3J0IHtJU2VhdE1hcFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1zZWF0bWFwL3NlcnZpY2VzL0lTZWF0TWFwU2VydmljZSc7XG5cbi8vIGV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuLy8gICAgIGNvbnN0IGhhbmRsZU9wZW5TZWF0TWFwID0gYXN5bmMgKGZsaWdodFNlZ21lbnROdW1iZXI6IG51bWJlcikgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhgPesgT3BlbmluZyBTZWF0IE1hcCBmb3Igc2VnbWVudDogJHtmbGlnaHRTZWdtZW50TnVtYmVyfWApO1xuICAgIFxuLy8gICAgICAgICB0cnkge1xuLy8gICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRTZXJ2aWNlKElTZWF0TWFwU2VydmljZSkub3BlblNlYXRNYXBGb3JGbGlnaHRTZWdtZW50KGZsaWdodFNlZ21lbnROdW1iZXIpO1xuICAgIFxuLy8gICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5tb2RhbE9wZW5lZENvcnJlY3RseSkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYKAPIEVycm9yIG9wZW5pbmcgU2VhdCBNYXA6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfWApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTCBGYWlsZWQgdG8gb3BlbiBTZWF0IE1hcDpgLCBlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuXG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4vLyAgICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuLy8gICAgICAgICAgICAgPG9sPlxuLy8gICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbi8vICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcGVuU2VhdE1hcChpbmRleCArIDEpfT4+kSBPcGVuIFNlYXQgTWFwPC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4vLyAgICAgICAgICAgICAgICAgKSl9XG4vLyAgICAgICAgICAgICA8L29sPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuLy8gfTtcblxuXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwQXZhaWxNb2RhbCB9IGZyb20gJy4uL3Nob3dTZWF0TWFwQXZhaWxNb2RhbCc7XG5cbmV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxWaWV3ID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnPYAgU2VhdE1hcEF2YWlsVmlldyBkYXRhOicsIGRhdGEpOyAvLyA7PjMgMiA+PUE+O0xcbiAgICAgIHNob3dTZWF0TWFwQXZhaWxNb2RhbChkYXRhKTsgLy8gMks3SzIwNTwgREM9OkY4TiA/PjowNzAgPD40MDtMPT4zPiA+Oj0wIGMgNDA9PUs8OCAoZGF0YSlcbiAgICB9LCBbXSk7XG4gIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1zZWF0bWFwLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbiAgICAgICAgPHA+HkI6QEsyMDU8IFNlYXRNYXAgVmlld2VyLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTsiLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvd2lkZ2V0cy9kcmF3ZXIvdmlld3MvZWxlbWVudHMvVGlsZSc7XG5pbXBvcnQgeyBUaWxlT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGVPcHRpb25zJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgeyBXaXRob3V0Rm9jdXNPbkNsaWNrIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL21peGlucy9XaXRob3V0Rm9jdXNPbkNsaWNrJztcbmltcG9ydCB7IEluaXRpYWwgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvSW5pdGlhbCc7XG5pbXBvcnQgeyBNaXhpbiB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy9NaXhpbic7XG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcblxuQENzc0NsYXNzKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi10aWxld2lkZ2V0cy13ZWItbW9kdWxlJywgeyBvdmVyd3JpdGU6IGZhbHNlIH0pXG5ASW5pdGlhbDxUaWxlT3B0aW9ucz4oe1xuICAgIGNhcHRpb246ICdTZWF0TWFwcyBBQkMgMzYwJywgLy8gODxPIHRpbGVcbiAgICBjbGFzc05hbWU6ICd3ZWItYWlyLXNob3BwaW5nLXdpZGdldC1zYW1wbGUnXG59KVxuQE1peGluKFdpdGhvdXRGb2N1c09uQ2xpY2spXG5leHBvcnQgY2xhc3MgU2VhdE1hcFNob3BwaW5nVGlsZSBleHRlbmRzIFRpbGU8RmxpZ2h0U2VnbWVudD4gaW1wbGVtZW50cyBXaXRob3V0Rm9jdXNPbkNsaWNrIHtcblxuICAgIHNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vID0NIBQ+MTAyO081PCA7PjM4QD4yMD04NSA0O08gODdDRzU9OE8gNDA9PUtFIGNwYVxuICAgICAgICBjb25zb2xlLmxvZygnPeUgW1Nob3BwaW5nXSBjcGEgT2JqZWN0OicsIGNwYSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc95SBbU2hvcHBpbmddIEF2YWlsYWJsZSBtZXRob2RzIG9uIGNwYTonLCBPYmplY3Qua2V5cyhjcGEpKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2hvcHBpbmdJdGluZXJhcnkgPSBjcGEuZ2V0U2hvcHBpbmdJdGluZXJhcnkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc95SBbU2hvcHBpbmddIHNob3BwaW5nSXRpbmVyYXJ5OicsIHNob3BwaW5nSXRpbmVyYXJ5KTtcblxuICAgICAgICAgICAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBzaG9wcGluZ0l0aW5lcmFyeS5nZXRGbGlnaHRTZWdtZW50cygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJz3lIFtTaG9wcGluZ10gRmxpZ2h0IFNlZ21lbnRzOicsIGZsaWdodFNlZ21lbnRzKTtcblxuICAgICAgICAgICAgLy8gGz4zOEBDNTwgOjA2NEs5IEE1Mzw1PUIgPkI0NTtMPT5cbiAgICAgICAgICAgIGZsaWdodFNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYD3lIFtTaG9wcGluZ10gRmxpZ2h0IFNlZ21lbnQgJHtpbmRleH06YCwgc2VnbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAvLyAYNzI7NTowNTwgPT48NUAwIEA1OUE+MiA0O08gPkI+MUAwNjU9OE8gMiBUaWxlXG4gICAgICAgICAgICBjb25zdCBmbGlnaHROdW1iZXJzID0gY3BhLmdldFNob3BwaW5nSXRpbmVyYXJ5KCkuZ2V0RmxpZ2h0U2VnbWVudHMoKS5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQuZ2V0RmxpZ2h0TnVtYmVyKCkpO1xuXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50c0h0bWwgPSBmbGlnaHROdW1iZXJzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICA/IGA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+U2VnbWVudHM6PGJyIC8+JHtmbGlnaHROdW1iZXJzLmpvaW4oJywgJyl9PC9kaXY+YFxuICAgICAgICAgICAgICAgIDogYDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA1cHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5TZWdtZW50OiAke2ZsaWdodE51bWJlcnMuam9pbignLCAnKSB8fCAnTi9BJ308L2Rpdj5gO1xuXG4gICAgICAgICAgICAvLyAUPjEwMjtPNTwgOj0+PzpDIFNlYXRNYXBzIEFCQyAzNjBcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkh0bWwgPSBgXG4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiA0cHg7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFiYy1zZWF0bWFwLWJ1dHRvblwiIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDZweCAxMHB4IDIwcHggMTBweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3M2JjO1xuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICAgICAgXCI+XG4gICAgICAgICAgICAgICAgU2VhdE1hcHMgQUJDIDM2MFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFDb250ZW50KHNlZ21lbnRzSHRtbCArIGJ1dHRvbkh0bWwpO1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTaG9wcGluZ10gRXJyb3IgcmV0cmlldmluZyBmbGlnaHQgc2VnbWVudHM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGZTZWxlY3RlZEZhcmVDaGFuZ2VkKGNwYTogRmxpZ2h0U2VnbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGZEcmF3ZXJDb250ZXh0TW9kZWxQcm9wYWdhdGVkKGNwYSk7XG4gICAgfVxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7ICAvLyAFIC8yPUs5IDg8Pz5AQiBSZWFjdERPTVxuaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nIGZyb20gJy4uL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZyc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi4vcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4ID5CPjFAMDY1PThPIDowQEJLXG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlOlNob3BwaW5nVGlsZVZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuXG4gICAgcHJpdmF0ZSBmbGlnaHRTZWdtZW50czogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkU2VnbWVudEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQoY3BhOiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQgY2FsbGVkIHdpdGggY3BhOicsIGNwYSk7XG5cbiAgICAgICAgLy8gLy8gPSggJTBANDo+NDg8IDQwPT1LNSA0O08gP0A+MjVAOjhcbiAgICAgICAgLy8gY29uc3QgZmxpZ2h0RGF0YSA9IHtcbiAgICAgICAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAgICAgICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgICAgICAgLy8gICAgIGFycml2YWw6ICdGUkEnXG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCc9zCBbU2VhdE1hcFNob3BwaW5nVmlld10gSGFyZGNvZGVkIGZsaWdodCBkYXRhOicsIGZsaWdodERhdGEpO1xuICAgICAgICAvLyB0aGlzLmZsaWdodFNlZ21lbnRzID0gW2ZsaWdodERhdGFdO1xuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4ID0gMDtcblxuICAgICAgICBjb25zdCBzZWdtZW50cyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG4gICAgICAgIHRoaXMuZmxpZ2h0U2VnbWVudHMgPSBzZWdtZW50cy5tYXAoc2VnbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHNlZ21lbnQuZ2V0RGVwYXJ0dXJlRGF0ZSgpO1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogJzAwMScsXG4gICAgICAgICAgICAgICAgc2VnbWVudElkOiBzZWdtZW50LmdldFNlZ21lbnRJZCgpLFxuICAgICAgICAgICAgICAgIGZsaWdodE51bWJlcjogc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKSxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHNlZ21lbnQuZ2V0T3JpZ2luSWF0YSgpLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBzZWdtZW50LmdldERlc3RpbmF0aW9uSWF0YSgpLFxuICAgICAgICAgICAgICAgIGFpck1pbGVzOiBzZWdtZW50LmdldEFpck1pbGVzKCksXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZVRpbWU6IGRlcGFydHVyZURhdGVUaW1lID8gZGVwYXJ0dXJlRGF0ZVRpbWUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJ1VOS05PV04nLCAvLyAUPjEwMjs1PTg1IDQwQktcbiAgICAgICAgICAgICAgICBtYXJrZXRpbmdBaXJsaW5lOiBzZWdtZW50LmdldE1hcmtldGluZ0FpcmxpbmUoKSxcbiAgICAgICAgICAgICAgICBjYWJpbkNsYXNzOiAnQScgLy8gH0A4PDVALCA8PjY9PiA/NUA1NDAyMEJMIEA1MDtMPUs1IDQwPT1LNVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gH0A+MUM1PCBANT00NUA4QkwgUmVhY3QgOj48Pz49NT1CIEEgNzA0NUA2Oj45LCBHQj4xSyAzMEAwPUI4QD4yMEJMID0wOzhHODUgTTs1PDU9QjBcbiAgICAgICAgdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRyeVJlbmRlclJlYWN0Q29tcG9uZW50KGF0dGVtcHRzID0gMCkge1xuICAgICAgICBjb25zdCBNQVhfQVRURU1QVFMgPSAxMDtcbiAgICAgICAgY29uc3QgSU5URVJWQUwgPSA1MDA7IC8vIBg9QjVAMjA7IDw1NjRDID8+P0tCOjA8OCAoMiA8ODs7OEE1OkM9NDBFKVxuXG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuXG4gICAgICAgIGlmIChyb290RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgc2VhdG1hcC1yb290ID0wOTQ1PS4gHTBHOD0wNTwgQDU9NDVAOD0zIFJlYWN0IDo+PD8+PTU9QjAuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlYWN0Q29tcG9uZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0ZW1wdHMgPCBNQVhfQVRURU1QVFMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgoA8gW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgc2VhdG1hcC1yb290ID01ID0wOTQ1PS4gHz4yQj5APTBPID8+P0tCOjAgRzVANTcgJHtJTlRFUlZBTH0gPEEuIB8+P0tCOjAgJHthdHRlbXB0cyArIDF9LyR7TUFYX0FUVEVNUFRTfWApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyeVJlbmRlclJlYWN0Q29tcG9uZW50KGF0dGVtcHRzICsgMSksIElOVEVSVkFMKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIB01IEM0MDs+QUwgPTA5QjggTTs1PDU9QiBzZWF0bWFwLXJvb3QgPz5BOzUgPDA6QTg8MDtMPT4zPiBHOEE7MCA/Pj9LQj46LicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUmVhY3RDb21wb25lbnQoKSB7XG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuICAgIFxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIB5HOEkwNTwgP0A1NEs0Q0k4OSBANT00NUAgPzVANTQgQjU8LCA6MDogQT0+MjAgPkJANT00NUA4QkwgUmVhY3QgOj48Pz49NT1CXG4gICAgICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHJvb3RFbGVtZW50KTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZmxpZ2h0U2VnbWVudHM6IHRoaXMuZmxpZ2h0U2VnbWVudHMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IHRoaXMuc2VsZWN0ZWRTZWdtZW50SW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcsIHsgY29uZmlnOiBxdWlja2V0Q29uZmlnLCBkYXRhIH0pLFxuICAgICAgICAgICAgICAgIHJvb3RFbGVtZW50XG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBSZWFjdCBDb21wb25lbnQgQ0E/NUg9PiA+QkA1PTQ1QDU9IDIgI3NlYXRtYXAtcm9vdC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW1NlYXRNYXBTaG9wcGluZ1ZpZXddIC07NTw1PUIgQSBpZD1cInNlYXRtYXAtcm9vdFwiID01ID0wOTQ1PSA/QDggPz4/S0I6NSBANT00NUA4PTMwLicpO1xuICAgICAgICB9XG4gICAgfVxufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSwgcmVnaXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQnV0dG9uIH0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbENvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL1JlZEFwcFNpZGVQYW5lbENvbmZpZyc7XG5cbmltcG9ydCB7IEN1c3RvbVdvcmtmbG93U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVBuckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybSc7XG5pbXBvcnQgeyBjYWxsTGFzTGF4IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHsgc2hvd1J1bnRpbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUnO1xuaW1wb3J0IHsgc2hvd0ludGVyc3RpdGlhbCB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93SW50ZXJzdGl0aWFsJztcbmltcG9ydCB7IHNob3dBZ2VudFByb2ZpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQgeyBzaG93QmFubmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QmFubmVycyc7XG5pbXBvcnQgeyByZWZyZXNoVHJpcFN1bW1hcnkgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVmcmVzaFRyaXBTdW1tYXJ5JztcbmltcG9ydCB7IGNhbGxFeHRlcm5hbFNlcnZpY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb25Gb3JtLCBoaWRlTm90aWZpY2F0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVOb3RpZmljYXRpb25Gb3JtJztcblxuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxUaWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZSc7XG5pbXBvcnQgeyBTZWF0TWFwQXZhaWxWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldyc7XG5cbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRHJhd2VyU2VydmljZSc7XG5pbXBvcnQgeyBMYXJnZVdpZGdldERyYXdlckNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2NvbmZpZ3MvZHJhd2VyL0xhcmdlV2lkZ2V0RHJhd2VyQ29uZmlnJztcblxuaW1wb3J0IHsgU2VhdE1hcFNob3BwaW5nVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1RpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcFNob3BwaW5nVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBTaG9wcGluZ1ZpZXcnO1xuXG5pbXBvcnQgeyBJQWlyUHJpY2luZ1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9zZXJ2aWNlcy9JQWlyUHJpY2luZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJpY2luZ1RpbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvd2lkZ2V0cy9QcmljaW5nVGlsZSc7XG5pbXBvcnQgeyBQcmljaW5nVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1ByaWNpbmdWaWV3JztcblxuaW1wb3J0IHsgTm92aWNlQnV0dG9uQ29uZmlnIH0gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvTm92aWNlQnV0dG9uQ29uZmlnJztcbmltcG9ydCB7IFNhbXBsZUNvbXBvbmVudCB9IGZyb20gJy4vdmlld3MvU2FtcGxlQ29tcG9uZW50JztcblxuaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtDb21tYW5kTWVzc2FnZVJlc2VydmF0aW9uUnN9IGZyb20gJ3NhYnJlLW5ndi1wb3MtY2RtL3Jlc2VydmF0aW9uJztcbmltcG9ydCB7SVJlc2VydmF0aW9uU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXJlc2VydmF0aW9uL3NlcnZpY2VzL0lSZXNlcnZhdGlvblNlcnZpY2UnO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcblxuZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBNb2R1bGUge1xuICBpbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2VydmljZXMoKTtcbiAgICB0aGlzLnNldHVwU2lkZVBhbmVsQnV0dG9ucygpO1xuICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7XG4gICAgdGhpcy5yZWdpc3RlclNlYXRNYXBTaG9wcGluZ1RpbGUoKTtcblxuICAgIGNvbnN0IG9uQ2xpY2sgPSAoaXNPcGVuOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnQ29tbWFuZCBIZWxwZXIgQnV0dG9uIG9uQ2xpY2snLCBpc09wZW4pO1xuICAgICAgLy8gaW5zZXJ0IGxvZ2ljIGhlcmVcbiAgICB9O1xuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnQ29tbWFuZCBIZWxwZXIgUG9wb3ZlciBvbkNsb3NlJyk7XG4gICAgICAvLyBpbnNlcnQgbG9naWMgaGVyZVxuICAgIH07XG5cbiAgICBjb25zdCBjb25maWcgPSBuZXcgTm92aWNlQnV0dG9uQ29uZmlnKFxuICAgICAgLy8gRGVmaW5lIGxhYmVsIGZvciB0aGlzIGJ1dHRvbi5cbiAgICAgICdTYW1wbGUgYnV0dG9uJyxcbiAgICAgIC8vIE9uIHRvcCBvZiB0ZXh0IHdlIGFkZCBhbiBpY29uIGZyb20gRm9udCBBd2Vzb21lLlxuICAgICAgJ2ZhLWNvbW1lbnQnLFxuICAgICAgLy8gRGVjb3JhdG9yIGlzIHVzZWQgdG8gYXBwbHkgc3R5bGVzIHRvIHRoZSBidXR0b24gdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiBDb21tYW5kIEhlbHBlciBCYXIuXG4gICAgICAnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY29tbWFuZC1oZWxwZXItYnV0dG9uLXdlYi1tb2R1bGUnLFxuICAgICAgLy8gQmFzZSBSZWFjdCBjbGFzcyB0byBiZSBtb3VudGVkIGFzIHJvb3QgaW4gUmVhY3RET00ucmVuZGVyKCkuXG4gICAgICBTYW1wbGVDb21wb25lbnQsXG4gICAgICAvLyBQcmlvcml0eSBvZiB0aGUgYnV0dG9uIGRldGVybWluZXMgYnV0dG9uIHBvc2l0aW9uIGluIHRoZSBDb21tYW5kIEhlbHBlciBCYXIuXG4gICAgICAtMTAwMCxcbiAgICAgIG9uQ2xpY2ssXG4gICAgICBvbkNsb3NlXG4gICAgKTtcblxuICAgIC8vIEFkZCBidXR0b24gY29uZmlndXJhdGlvbiB0byBhZGQgYSBjb21tYW5kIGhlbHBlciBidXR0b24uXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygnbm92aWNlLWJ1dHRvbnMnLCBjb25maWcpO1xuXG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKEN1c3RvbVdvcmtmbG93U2VydmljZSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2lkZVBhbmVsQnV0dG9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlQ3NzQ2xhc3NOYW1lcyA9ICdidG4gYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvbiByZWRhcHAtd2ViLWN1c3RvbXdvcmtmbG93JztcblxuICAgIGNvbnN0IHNlbGZSZW1vdmVCdG4gPSBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZW1vdmFibGUgQnV0dG9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXJlbW92ZScsICgpID0+IHtcbiAgICAgIHNlbGZSZW1vdmVCdG4uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb25maWcgPSBuZXcgUmVkQXBwU2lkZVBhbmVsQ29uZmlnKFtcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgYmFubmVycycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1iYW5uZXJzJywgc2hvd0Jhbm5lcnMpLFxuICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignRXh0ZXJuYWwgc2VydmljZSBjYWxsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWV4dGVybmFsc2VydmljZWNhbGwnLCBjYWxsRXh0ZXJuYWxTZXJ2aWNlKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlZEFwcCBwbGF0Zm9ybScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbGF0Zm9ybScsIHNob3dSdW50aW1lKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0xBUyAtIExBWCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1hY3Rpb24nLCBjYWxsTGFzTGF4KSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0NyZWF0ZSBQTlInLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcG5yJywgY3JlYXRlUG5yRm9ybSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGludGVyc3RpdGlhbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1pbnRlcnN0aXRpYWwnLCBzaG93SW50ZXJzdGl0aWFsKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgQWdlbnQgUHJvZmlsZScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1hZ2VudHByb2ZpbGUnLCBzaG93QWdlbnRQcm9maWxlKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlZnJlc2ggVHJpcCBTdW1tYXJ5JywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXJlZnJlc2h0cmlwJywgcmVmcmVzaFRyaXBTdW1tYXJ5KSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0NyZWF0ZSBub3RpZmljYXRpb24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctY3JlYXRlTm90aWZpY2F0aW9uJywgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSksXG4gICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdIaWRlIG5vdGlmaWNhdGlvbnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaGlkZU5vdGlmaWNhdGlvbicsIGhpZGVOb3RpZmljYXRpb25zKSxcbiAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Jlc2VydmF0aW9uJywgJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItcmVzZXJ2YXRpb24nLCB0aGlzLnNob3dSZXNlcnZhdGlvbiksXG4gICAgICBzZWxmUmVtb3ZlQnRuXG4gICAgXSk7XG5cbiAgICBnZXRTZXJ2aWNlKEV4dGVuc2lvblBvaW50U2VydmljZSkuYWRkQ29uZmlnKCdyZWRBcHBTaWRlUGFuZWwnLCBjb25maWcpO1xuICB9XG5cbiAgLy8gQXZhaWxhYmlsaXR5VGlsZVxuICBwcml2YXRlIHJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlKTsgLy8gMj1DQkA1PT04OSBBNUAyOEEgNDtPID9ANTQ+QUIwMjs1PThPIDQwPT1LRSAyIEAwPDowRSBBdmFpbGFiaWxpdHlcblxuICAgIGNvbnN0IHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwgPSAoZGF0YTogYW55KSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCc95SBbQXZhaWxhYmlsaXR5XSBSZWNlaXZlZCBEYXRhOicsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcblxuICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCcsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQXZhaWxWaWV3LCBkYXRhKSxcbiAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdyZWFjdC10aWxlLW1vZGFsLWNsYXNzJ1xuICAgICAgfTtcblxuICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlLmNyZWF0ZUFpckF2YWlsYWJpbGl0eVNlYXJjaFRpbGUoXG4gICAgICBTZWF0TWFwQXZhaWxUaWxlLFxuICAgICAgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCxcbiAgICAgICdTZWF0TWFwcyBBQkMgMzYwJ1xuICAgICk7XG4gIH1cblxuICAvLyBTaG9wcGluZ1RpbGUgXG4gIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwU2hvcHBpbmdUaWxlKCk6IHZvaWQge1xuICAgIC8vID4/QDU0NTtPNTwgY29uZmlnIHNob3BwaW5nRHJhd2VyQ29uZmlnXG4gICAgY29uc3Qgc2hvcHBpbmdEcmF3ZXJDb25maWcgPSBuZXcgTGFyZ2VXaWRnZXREcmF3ZXJDb25maWcoU2VhdE1hcFNob3BwaW5nVGlsZSwgU2VhdE1hcFNob3BwaW5nVmlldywge1xuICAgICAgdGl0bGU6ICdTaG9wcGluZyBUaWxlIFdpZGdldCcgLy8gNzAzPjs+Mj46ID46PTBcbiAgICB9KTtcbiAgICAvLyAySzcySzIwNTwgQTVAMjhBIEEgTUI4PCBjb25maWcgc2hvcHBpbmdEcmF3ZXJDb25maWdcbiAgICBnZXRTZXJ2aWNlKERyYXdlclNlcnZpY2UpLmFkZENvbmZpZyhbJ3Nob3BwaW5nLWZsaWdodC1zZWdtZW50J10sIHNob3BwaW5nRHJhd2VyQ29uZmlnKTtcblxuICAgIC8vIFByaWNpbmcgVGlsZVxuICAgIGNvbnN0IHNob3dQcmljaW5nTW9kYWwgPSB0aGlzLmNyZWF0ZVNob3dNb2RhbEFjdGlvbihQcmljaW5nVmlldywgJ1ByaWNpbmcgRGF0YScpO1xuICAgIGdldFNlcnZpY2UoSUFpclByaWNpbmdTZXJ2aWNlKS5jcmVhdGVQcmljaW5nVGlsZShQcmljaW5nVGlsZSwgc2hvd1ByaWNpbmdNb2RhbCwgJ0FCQyBTZWF0IE1hcCcpO1xuXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNob3dNb2RhbEFjdGlvbih2aWV3OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxhbnk+LCBoZWFkZXI6IHN0cmluZyk6IChkYXRhOiBhbnkpID0+IHZvaWQge1xuICAgIHJldHVybiAoKGRhdGEpID0+IHtcblxuICAgICAgY29uc29sZS5sb2coJz3lIFtQcmljaW5nXSBSZWNlaXZlZCBEYXRhIChGdWxsIE9iamVjdCk6JywgT2JqZWN0LmtleXMoZGF0YSkpO1xuICAgICAgY29uc29sZS5sb2coJz3lIFtQcmljaW5nXSBGdWxsIERhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xuXG4gICAgICBjb25zdCBuZ3ZNb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXIsXG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICB2aWV3LFxuICAgICAgICAgIGRhdGFcbiAgICAgICAgKSxcbiAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdyZWFjdC10aWxlLW1vZGFsLWNsYXNzJ1xuICAgICAgfVxuICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChuZ3ZNb2RhbE9wdGlvbnMpO1xuICAgIH0pXG4gIH1cblxuICAvLyBSZXNlcnZhaW9uIEluZm8gV2luZG93XG4gIHByaXZhdGUgc2hvd1Jlc2VydmF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCByZXNlcnZhdGlvblByb21pc2U6IFByb21pc2U8Q29tbWFuZE1lc3NhZ2VSZXNlcnZhdGlvblJzPiA9IGdldFNlcnZpY2UoSVJlc2VydmF0aW9uU2VydmljZSkuZ2V0UmVzZXJ2YXRpb24oKTtcblxuICAgIHJlc2VydmF0aW9uUHJvbWlzZS50aGVuKChyZXNlcnZhdGlvbjogQ29tbWFuZE1lc3NhZ2VSZXNlcnZhdGlvblJzKSA9PiB7XG4gICAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ1Jlc2VydmF0aW9uIERhdGEnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3Jlc2VydmF0aW9uRGF0YScsXG4gICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgIHRleHQ6ICdgYGBcXG4nICtcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzZXJ2YXRpb24sIG51bGwsIDIpICtcbiAgICAgICAgICAgICAgJ1xcbmBgYCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH07XG4gICAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICAgIGdldFNlcnZpY2UoSUN1c3RvbUZvcm1zU2VydmljZSkub3BlbkZvcm0oZm9ybSk7XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHJlY2VpdmluZyByZXNlcnZhdGlvbicsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7U3RvcmVEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL1N0b3JlRGF0YSc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZTogU3RvcmVEYXRhID0ge1xuICAgIHVybDogJ2h0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS90b2Rvcy8xJyxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGJvZHk6ICcnLFxuICAgIGhlYWRlcnM6ICd7fScsXG4gICAgcmVzcG9uc2U6ICcnXG59XG5cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0b3JlRGF0YSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ1NFVF9QQVJBTUVURVInOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBbYWN0aW9uLmZpZWxkXTogYWN0aW9uLm5ld1ZhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmUge1xuXG4gICAgcHVibGljIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcik7XG5cbiAgICBnZXREYXRhKCk6IFN0b3JlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0lDdXN0b21Xb3JrZmxvd30gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9pbnRlcmZhY2VzL0lDdXN0b21Xb3JrZmxvdyc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuLyoqXG4gKiBTZXJ2aWNlIHVzZWQgd2l0aCBkZWNsYXJhdGl2ZSBjdXN0b20gd29ya2Zsb3cgaW4gbWFuaWZlc3QuanNvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbVdvcmtmbG93U2VydmljZSBleHRlbmRzIElDdXN0b21Xb3JrZmxvdyB7XG4gICAgc3RhdGljIFNFUlZJQ0VfTkFNRSA9ICdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlLUN1c3RvbVdvcmtmbG93U2VydmljZSc7XG5cbiAgICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdJbmZvJywgJ0N1c3RvbSBXb3JrZmxvdyBTZXJ2aWNlIFN1Y2Nlc3MnKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCA9ICh0aXRsZTogc3RyaW5nLCBtc2c6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2ZsaWdodCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BBUkFHUkFQSCcsXG4gICAgICAgICAgICAgICAgdGV4dDogbXNnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDbG9zZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbn0iLG51bGwsbnVsbCxudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTYW1wbGVDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UmVjb3JkPHN0cmluZywgbmV2ZXI+PiB7XG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWNvbW1hbmQtaGVscGVyLWJ1dHRvbi13ZWItbW9kdWxlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2FtcGxlLWNvbXBvbmVudCc+XG4gICAgICAgICAgICAgICAgICAgIEhlbGxvIFdvcmxkISEhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0= 