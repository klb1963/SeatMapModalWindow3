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
    var flight = (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex); // это рейс с сегментом
    var flightSegments = data.flightSegments || [];
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
            // не отправляем, пока не полчили эти данные
            // availability: JSON.stringify(seatMapData.availability),
            // passengers: JSON.stringify(seatMapData.passengers)
        };
        console.log('📤 postMessage payload:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        sendToIframe(); // ⬅️ отправка при изменении сегмента
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
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
                console.log('✅ iframe loaded, sending data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"))});
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightFromSabreData = void 0;
var getFlightFromSabreData = function (data) {
    var _a, _b, _c, _d, _e, _f;
    var segment = (_a = data.flightSegments) === null || _a === void 0 ? void 0 : _a[0];
    return {
        id: (segment === null || segment === void 0 ? void 0 : segment.flightNumber) || 'UNKNOWN',
        airlineCode: ((_b = segment === null || segment === void 0 ? void 0 : segment.DisclosureAirline) === null || _b === void 0 ? void 0 : _b.Code) || 'LH',
        flightNo: (segment === null || segment === void 0 ? void 0 : segment.flightNumber) || '410',
        departureDate: data.dateOfFlight || '2024-04-20',
        departure: ((_d = (_c = segment === null || segment === void 0 ? void 0 : segment.originLocation) === null || _c === void 0 ? void 0 : _c.EncodeDecodedElement) === null || _d === void 0 ? void 0 : _d.Code) || 'MUC',
        arrival: ((_f = (_e = segment === null || segment === void 0 ? void 0 : segment.destinationLocation) === null || _e === void 0 ? void 0 : _e.EncodeDecodedElement) === null || _f === void 0 ? void 0 : _f.Code) || 'JFK',
        cabinClass: 'A' // либо получаем из PNR, либо временно хардкодим
    };
};
exports.getFlightFromSabreData = getFlightFromSabreData;


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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailTile","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/widgets/SeatMapAvailView","sabre-ngv-modals/services/PublicModalService"], false, function (require, exports, module) {
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
var SeatMapAvailView_1 = require("./components/abc-seatmap/widgets/SeatMapAvailView"); // ✅ модальное окно открываемое по клику на TileWidget
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvcXVpY2tldENvbmZpZy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93Mi93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvdHJhbnNmb3JtRmxpZ2h0LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9hYmMtc2VhdG1hcC93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcudHN4IiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzIvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2FjdGlvbnMuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NhbGxFeHRlcm5hbFNlcnZpY2UudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NhbGxMYXNMYXgudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm0udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvYWN0aW9ucy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvTW9kYWxDb21wb25lbnQudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9yZWZyZXNoVHJpcFN1bW1hcnkudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93Mi93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dCdXR0b25BY3Rpb24udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dJbnRlcnN0aXRpYWwudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3Nob3dSdW50aW1lLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzIvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL3Nob3dTZWF0TWFwTW9kYWwuanMiLCJzcmMvY29kZS9Db250ZXh0LnRzIiwic3JjL2NvZGUvaW5kZXgudHMiLCJzcmMvY29kZS9pbnRlcmZhY2VzL1N0b3JlRGF0YS50cyIsInNyYy9jb2RlL01haW4udHMiLCJzcmMvY29kZS9yZWR1Y2Vycy9Mb2NhbFN0b3JlLnRzIiwic3JjL2NvZGUvc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlLnRzIiwic3JjL2NvZGUvdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93Mi93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL3V0aWxzL3RyYW5zZm9ybUZsaWdodC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3cyL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvdmlld3MvYXZhaWwvc2VhdG1hcC9TZWF0TWFwQXZhaWxUaWxlLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1NlYXRNYXBNb2RhbFdpbmRvdzIvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS92aWV3cy9hdmFpbC9zZWF0bWFwL1NlYXRNYXBBdmFpbFZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU0sc0JBQXNCLEdBQUcsVUFBQyxJQUFTLEVBQUUsWUFBd0I7O0lBQXhCLDZCQUFBLEVBQUEsZ0JBQXdCO0lBQ3hFLElBQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUcsWUFBWSxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQW9CLFlBQVksZUFBWSxDQUFDLENBQUM7UUFDM0QsT0FBTztZQUNMLEVBQUUsRUFBRSxTQUFTO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUs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LEtBQWEsRUFBRSxHQUFXO0lBQzlELElBQU0sSUFBSSxHQUFlO1FBQ3JCLEtBQUssT0FBQTtRQUNMLE1BQU0sRUFBRTtZQUNKO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRzthQUNaO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTDtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO0tBQ0osQ0FBQztJQUNGLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFsQlksUUFBQSx1QkFBdUIsMkJBa0JuQzs7Ozs7O0FDdEJEO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7QUFDQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSA9IChkYXRhOiBhbnksIHNlZ21lbnRJbmRleDogbnVtYmVyID0gMCkgPT4ge1xuICBjb25zdCBzZWdtZW50ID0gZGF0YS5mbGlnaHRTZWdtZW50cz8uW3NlZ21lbnRJbmRleF07XG5cbiAgaWYgKCFzZWdtZW50KSB7XG4gICAgY29uc29sZS53YXJuKGCgDyBTZWdtZW50IGluZGV4ICR7c2VnbWVudEluZGV4fSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdVTktOT1dOJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LkRlcGFydHVyZURhdGVUaW1lO1xuICBjb25zdCBkZXBhcnR1cmVEYXRlID0gZGVwYXJ0dXJlRGF0ZVRpbWUuc3BsaXQoJ1QnKVswXTsgLy8gHkFCMDI7TzU8IEI+O0w6PiA0MEJDXG5cbiAgcmV0dXJuIHtcbiAgICBpZDogJzExMScsIC8vIBw+Nj0+ID8+NzY1IEEzNT01QDhAPjIwQkwgSUQgOD0wRzVcbiAgICBhaXJsaW5lQ29kZTogc2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlcixcbiAgICBkZXBhcnR1cmVEYXRlLFxuICAgIGRlcGFydHVyZTogc2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBhcnJpdmFsOiBzZWdtZW50LkRlc3RpbmF0aW9uTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgY2FiaW5DbGFzczogJ0EnIC8vIB8+OjAgRDg6QThAPjIwPT4sIDw+Nj0+IEAwQUg4QDhCTFxuICB9O1xufTsiLCJleHBvcnQgY29uc3QgcXVpY2tldENvbmZpZyA9IHtcbiAgICB3aWR0aDogNDAwLFxuICAgIGxhbmc6ICdFTicsXG4gICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgcmlnaHRUb0xlZnQ6IGZhbHNlLFxuICAgIHZpc2libGVGdXNlbGFnZTogdHJ1ZSxcbiAgICB2aXNpYmxlV2luZ3M6IHRydWUsXG4gICAgYnVpbHRJbkRlY2tTZWxlY3RvcjogdHJ1ZSxcbiAgICBzaW5nbGVEZWNrTW9kZTogdHJ1ZSxcbiAgICBidWlsdEluVG9vbHRpcDogdHJ1ZSxcbiAgICBleHRlcm5hbFBhc3Nlbmdlck1hbmFnZW1lbnQ6IGZhbHNlLFxuICAgIHRvb2x0aXBPbkhvdmVyOiBmYWxzZSxcbiAgICBjb2xvclRoZW1lOiB7XG4gICAgICAgIHNlYXRMYWJlbENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBzZWF0U3Ryb2tlQ29sb3I6ICdncmF5J1xuICAgIH1cbn07IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YSB9IGZyb20gJy4uL2FiYy1zZWF0bWFwL2dldEZsaWdodEZyb21TYWJyZURhdGEnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcFByb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGRhdGE6IGFueTsgLy8gMjw1QUI+IGZsaWdodCBCNT81QEwgPz47Q0cwNTwgMjVBTCBkYXRhXG59XG5cbmNvbnN0IFNlYXRNYXBDb21wb25lbnQ6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgZmxpZ2h0ID0gZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YShkYXRhLCBzZWdtZW50SW5kZXgpOyAvLyBNQj4gQDU5QSBBIEE1Mzw1PUI+PFxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodCxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGRlY2tzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ21haW4tZGVjaycsXG4gICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGF2YWlsYWJpbGl0eTogW1xuICAgICAgeyBsYWJlbDogJzFBJywgcHJpY2U6IDUwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnZ3JlZW4nLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgIHsgbGFiZWw6ICcyQScsIHByaWNlOiAzMCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2xpZ2h0Ymx1ZScgfVxuICAgIF0sXG4gICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgfTtcblxuICBjb25zdCBzZW5kVG9JZnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5sYXlvdXQpLFxuXG4gICAgICAvLyA9NSA+Qj9AMDI7TzU8LCA/PjowID01ID8+O0c4OzggTUI4IDQwPT1LNVxuICAgICAgLy8gYXZhaWxhYmlsaXR5OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5hdmFpbGFiaWxpdHkpLFxuICAgICAgLy8gcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcblxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnPeQgcG9zdE1lc3NhZ2UgcGF5bG9hZDonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vIAUPID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1XG4gICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBkZWJ1Zzo8L3N0cm9uZz5cbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZmxpZ2h0LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PiAqL31cblxuICAgICAgPGRpdiBzdHlsZSA9IHt7bWFyZ2luQm90dG9tOiAnMXJlbSd9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cblxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJzZWdtZW50U2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VnbWVudEluZGV4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VnbWVudEluZGV4KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfT5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fT5cbiAgICAgICAgICAgICAge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnWFgnfSB7c2VnbWVudC5GbGlnaHROdW1iZXIgfHwgJzAwMCd9XG4gICAgICAgICAgICAgICZuYnNwO5ImbmJzcDtcbiAgICAgICAgICAgICAge3NlZ21lbnQuT3JpZ2luTG9jYXRpb24/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUgfHwgJz8/Pyd9IBNcbiAgICAgICAgICAgICAge3NlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J31cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiA8YnV0dG9uIG9uQ2xpY2s9e3NlbmRUb0lmcmFtZX0gc3R5bGU9e3sgbWFyZ2luOiAnMXJlbSAwJyB9fT5cbiAgICAgICAgPQEgHkI/QDAyOEJMIDQwPT1LNSAyQENHPUNOXG4gICAgICA8L2J1dHRvbj4gKi99XG5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcFIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnQ7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50JztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCA+Qj4xQDA2NT04TyA6MEBCS1xuXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwTW9kYWwoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IHZvaWQge1xuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyJyxcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCAyNUFMID4xSjU6QiBCOD8wIFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgRjU7ODo+PFxuICAgIH0pLFxuICAgIG9uSGlkZTogKCkgPT4gY29uc29sZS5sb2coJ1tTZWF0TWFwIE1vZGFsXSBDbG9zZWQnKVxuICB9O1xuXG4gIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChvcHRpb25zKTtcbn0iLG51bGwsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICBcbiAgICAvLyBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAvLyAgICAvLyAgYWxlcnQoXCI9gCBNb2RhbCBzaG91bGQgb3BlbiBoZXJlIVwiKTsgLy8gEkA1PDU9PUs5IEI1QUI+Mks5IGFsZXJ0IDI8NUFCPiBzaG93TW9kYWxcbiAgICAvLyB9O1xuICAgICAgICAvLyBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30gPiBcbiAgICAgICAgICAgIDxzdHJvbmc+QUJDIFNlYXQgTWFwPC9zdHJvbmc+XG4gICAgICAgICAgICA8b2w+XG4gICAgICAgICAgICAgICAge2RhdGEuZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBGbGlnaHQge3NlZ21lbnQuTWFya2V0aW5nQWlybGluZS5GbGlnaHROdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L29sPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gXG5cbi8vIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEnO1xuLy8gaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0NvbnRleHQnO1xuLy8gaW1wb3J0IHtJU2VhdE1hcFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1zZWF0bWFwL3NlcnZpY2VzL0lTZWF0TWFwU2VydmljZSc7XG5cbi8vIGV4cG9ydCBjb25zdCBTZWF0TWFwQXZhaWxUaWxlID0gKGRhdGE6IFB1YmxpY0FpckF2YWlsYWJpbGl0eURhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuLy8gICAgIGNvbnN0IGhhbmRsZU9wZW5TZWF0TWFwID0gYXN5bmMgKGZsaWdodFNlZ21lbnROdW1iZXI6IG51bWJlcikgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhgPesgT3BlbmluZyBTZWF0IE1hcCBmb3Igc2VnbWVudDogJHtmbGlnaHRTZWdtZW50TnVtYmVyfWApO1xuICAgIFxuLy8gICAgICAgICB0cnkge1xuLy8gICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRTZXJ2aWNlKElTZWF0TWFwU2VydmljZSkub3BlblNlYXRNYXBGb3JGbGlnaHRTZWdtZW50KGZsaWdodFNlZ21lbnROdW1iZXIpO1xuICAgIFxuLy8gICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5tb2RhbE9wZW5lZENvcnJlY3RseSkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYKAPIEVycm9yIG9wZW5pbmcgU2VhdCBNYXA6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfWApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTCBGYWlsZWQgdG8gb3BlbiBTZWF0IE1hcDpgLCBlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuXG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4vLyAgICAgICAgICAgICA8c3Ryb25nPkFCQyBTZWF0IE1hcDwvc3Ryb25nPlxuLy8gICAgICAgICAgICAgPG9sPlxuLy8gICAgICAgICAgICAgICAgIHtkYXRhLmZsaWdodFNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IChcbi8vICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgRmxpZ2h0IHtzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmUuRmxpZ2h0TnVtYmVyfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcGVuU2VhdE1hcChpbmRleCArIDEpfT4+kSBPcGVuIFNlYXQgTWFwPC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4vLyAgICAgICAgICAgICAgICAgKSl9XG4vLyAgICAgICAgICAgICA8L29sPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuLy8gfTtcblxuXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwTW9kYWwgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVmlldyA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJz2AIFNlYXRNYXBBdmFpbFZpZXcgZGF0YTonLCBkYXRhKTsgLy8gOz4zIDIgPj1BPjtMXG4gICAgICBzaG93U2VhdE1hcE1vZGFsKGRhdGEpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+XG4gICAgfSwgW10pO1xuICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgIDxwPh5COkBLMjA1PCBTZWF0TWFwIFZpZXdlci4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07IixudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1B1YmxpY01vZGFsc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7UmVhY3RNb2RhbE9wdGlvbnN9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7RXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcic7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHthY3Rpb25zfSBmcm9tICcuL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvYWN0aW9ucyc7XG5pbXBvcnQge01vZGFsQ29tcG9uZW50fSBmcm9tICcuL2V4dGVybmFsU2VydmljZVN1YkNvbXBvbmVudHMvTW9kYWxDb21wb25lbnQnO1xuaW1wb3J0IHtMb2NhbFN0b3JlfSBmcm9tICcuLi9yZWR1Y2Vycy9Mb2NhbFN0b3JlJztcblxuY29uc3QgbW9kYWxTZXJ2aWNlOiBQdWJsaWNNb2RhbHNTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTtcblxuZXhwb3J0IGNvbnN0IGNhbGxFeHRlcm5hbFNlcnZpY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgbG9jYWxTdG9yZSA9IG5ldyBMb2NhbFN0b3JlKCk7XG5cbiAgICBjb25zdCBvblN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RvcmVEYXRhID0gbG9jYWxTdG9yZS5nZXREYXRhKCk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gSlNPTi5wYXJzZShzdG9yZURhdGEuaGVhZGVycyk7XG5cbiAgICAgICAgZ2V0U2VydmljZShFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3IpLmNhbGxTZXJ2aWNlKHN0b3JlRGF0YS51cmwsIHN0b3JlRGF0YS5tZXRob2QsIHN0b3JlRGF0YS5ib2R5LCBoZWFkZXJzKS5kb25lKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlT2JqZWN0ID0gSlNPTi5wYXJzZShyZXNwb25zZSBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZU9iamVjdCwgbnVsbCwgMik7XG4gICAgICAgICAgICBsb2NhbFN0b3JlLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAncmVzcG9uc2UnLCBuZXdWYWw6IHJlc3BvbnNlU3RyaW5nfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZ3ZNb2RhbE9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXI6ICdFeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InLFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxDb21wb25lbnQpLFxuICAgICAgICBvblN1Ym1pdDogb25TdWJtaXQsXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnMob25DbG9zZSwgb25TdWJtaXQpLFxuICAgICAgICBzdG9yZTogbG9jYWxTdG9yZS5zdG9yZVxuICAgIH1cblxuICAgIG1vZGFsU2VydmljZS5zaG93UmVhY3RNb2RhbChuZ3ZNb2RhbE9wdGlvbnMpO1xufTsiLCJpbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5pbXBvcnQge2NmLCBnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNhbGxMYXNMYXggPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoNTAwMCk7XG5cbiAgICBjZignMUxBU0xBWCcpLnNlbmQoKS5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcblxuICAgICAgICBjb25zdCBoYXNTaWduSW5SZXNwb25zZSA9IHJlc3BvbnNlLmdldERhdGFTdHJ1Y3RzKClcbiAgICAgICAgICAgIC5maWx0ZXIoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddICYmIGRhdGFbJ2QuU2NyZWVuJ11bJ2QuVGV4dCddKVxuICAgICAgICAgICAgLm1hcChkYXRhID0+IGRhdGFbJ2QuU2NyZWVuJ11bJ2QuVGV4dCddKVxuICAgICAgICAgICAgLnNvbWUoZGF0YSA9PiBkYXRhLmluY2x1ZGVzKCdTSUdOIElOJykpO1xuXG4gICAgICAgIGlmIChoYXNTaWduSW5SZXNwb25zZSkge1xuICAgICAgICAgICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0Vycm9yJywgJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgICAgICB9XG4gICAgfSk7XG59IiwiaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RHJvcGRvd25GaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL0Ryb3Bkb3duRmllbGQnO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LW5vdGlmaWNhdGlvbi9zZXJ2aWNlL0lOb3RpZmljYXRpb25TZXJ2aWNlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uVHlwZX0gZnJvbSAnc2FicmUtbmd2LW5vdGlmaWNhdGlvbi9pbnRlcmZhY2VzL05vdGlmaWNhdGlvblR5cGUnO1xuXG5jb25zdCBub3RpZmljYXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm90aWZpY2F0aW9uRm9ybSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ05vdGlmaWNhdGlvbicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGl0bGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NvbnRlbnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdEUk9QRE9XTicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdOb25lJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdJbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdXYXJuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdeKC0/WzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGltZW91dCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUaW1lb3V0IGluIG1zJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXihbMS05XVswLTldKnwwKSQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBDdXN0b21Gb3JtUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xuXG4gICAgaWYgKHJlc3VsdC5hY3Rpb24gPT09ICdvaycpIHtcbiAgICAgICAgc2hvd05vdGlmaWNhdGlvbihyZXN1bHQpO1xuICAgIH1cbn1cblxuY29uc3Qgc2hvd05vdGlmaWNhdGlvbiA9IChmb3JtOiBDdXN0b21Gb3JtKTogdm9pZCA9PiB7XG4gICAgY29uc3QgdHlwZSA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndHlwZScpIGFzIERyb3Bkb3duRmllbGQpLnZhbHVlO1xuXG4gICAgY29uc3QgaWQgPSBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5zaG93Tm90aWZpY2F0aW9uKHtcbiAgICAgICAgdGl0bGU6IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGl0bGUnKSBhcyBUZXh0RmllbGQpLnZhbHVlLFxuICAgICAgICBjb250ZW50OiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2NvbnRlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlLFxuICAgICAgICB0eXBlOiB0eXBlID09PSAnTm9uZScgPyB1bmRlZmluZWQgOiB0eXBlIGFzIE5vdGlmaWNhdGlvblR5cGUsXG4gICAgICAgIHByaW9yaXR5OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3ByaW9yaXR5JykgYXMgVGV4dEZpZWxkKS52YWx1ZSksXG4gICAgICAgIHRpbWVvdXQ6IHBhcnNlSW50KChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZW91dCcpIGFzIFRleHRGaWVsZCkudmFsdWUpXG4gICAgfSk7XG5cbiAgICBub3RpZmljYXRpb25zLnB1c2goaWQpO1xufVxuXG5leHBvcnQgY29uc3QgaGlkZU5vdGlmaWNhdGlvbnMgPSAoKSA9PiB7XG4gICAgbm90aWZpY2F0aW9ucy5mb3JFYWNoKGlkID0+IGdldFNlcnZpY2UoSU5vdGlmaWNhdGlvblNlcnZpY2UpLmhpZGVOb3RpZmljYXRpb24oaWQpKTtcbiAgICBub3RpZmljYXRpb25zLmxlbmd0aCA9IDA7XG59IiwiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEYXRlc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRGF0ZXNTZXJ2aWNlJztcbmltcG9ydCB7Q29tbWFuZE1lc3NhZ2VCYXNpY1JzfSBmcm9tICdzYWJyZS1uZ3YtcG9zLWNkbS9jb21tc2cnO1xuaW1wb3J0IHtJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY29tbXNnL3NlcnZpY2VzL0lDb21tYW5kTWVzc2FnZVNlcnZpY2UnO1xuaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuXG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUG5yRm9ybSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB0ZW5EYXlzQWhlYWRGbGlnaHQgPSAnMScgKyBnZXRTZXJ2aWNlKERhdGVzU2VydmljZSkuZ2V0Tm93KCkuYWRkKDEwLCAnZGF5cycpLmZvcm1hdCgnRERNTU0nKS50b1VwcGVyQ2FzZSgpICsgJ0xBU0xBWFxcdTAwQTVBQSc7XG5cbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ0NyZWF0ZSBQTlInLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnLURPRS9KT0hOJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2ZsaWdodCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRlbkRheXNBaGVhZEZsaWdodFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpY2tldCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcwMVkyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2FnZW50JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FnZW50IEluZm8nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNkFHRU5UJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3Bob25lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzkxMjM0NTY3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVMaW1pdCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUaWNrZXRpbmcgdGltZSBsaW1pdCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc3VEFXLydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBDdXN0b21Gb3JtUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNlbGZTdWJtaXRQbnJBY3Rpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNlbGZTdWJtaXRQbnJBY3Rpb24gPSBhc3luYyAoZm9ybTogQ3VzdG9tRm9ybSk6IFByb21pc2U8dm9pZD4gPT4ge1xuXG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG5cbiAgICBjb25zdCBuYW1lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnbmFtZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgZmxpZ2h0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnZmxpZ2h0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCB0aWNrZXRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aWNrZXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGFnZW50SW5mb1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2FnZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBwaG9uZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3Bob25lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCB0YXdScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICd0aW1lTGltaXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDE1MDAwKTtcblxuICAgIGNvbnN0IG5hbWVSc1N0YXR1cyA9IGF3YWl0IHNlbmRDb21tYW5kKG5hbWVScSwgJ05hbWUnKTtcbiAgICBjb25zdCBmbGlnaHRzU3RhdHVzID0gbmFtZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKGZsaWdodFJxLCAnRmxpZ2h0IGxpc3QnKTtcbiAgICBjb25zdCB0aWNrZXRSc1N0YXR1cyA9IGZsaWdodHNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGlja2V0UnEsICdUaWNrZXQnKTtcbiAgICBjb25zdCBhZ2VudEluZm9Sc1N0YXR1cyA9IHRpY2tldFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKGFnZW50SW5mb1JxLCAnYWdlbnRJbmZvJyk7XG4gICAgY29uc3QgcGhvbmVSc1N0YXR1cyA9IGFnZW50SW5mb1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHBob25lUnEsICdQaG9uZScpO1xuICAgIGNvbnN0IHRhd1JzU3RhdHVzID0gcGhvbmVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0YXdScSwgJ1RBVycpO1xuICAgIGNvbnN0IHdwUnNTdGF0dXMgPSB0YXdSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnV1AnLCAnV1AnKTtcbiAgICBjb25zdCBwcVJzU3RhdHVzID0gd3BSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnUFEnLCAnUFEnKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgIHBxUnNTdGF0dXMgJiYgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCAnUE5SIGNyZWF0ZWQnKTtcbn1cblxuY29uc3Qgc2VuZENvbW1hbmQgPSBhc3luYyAoY29tbWFuZDogc3RyaW5nLCBmYWlsdXJlU2VnbWVudDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgcnNTdGF0dXM6IENvbW1hbmRNZXNzYWdlQmFzaWNScyA9IGF3YWl0IGdldFNlcnZpY2UoSUNvbW1hbmRNZXNzYWdlU2VydmljZSkuc2VuZChjb21tYW5kKTtcbiAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gcnNTdGF0dXMuU3RhdHVzLlN1Y2Nlc3M7XG5cbiAgICBpZiAoaXNTdWNjZXNzICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXSAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0uVGV4dC5pbmNsdWRlcygnU0lHTiBJTicpKSB7XG4gICAgICAgIGlzU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBoYW5kbGVGYWlsdXJlKCdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICB9IGVsc2UgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgICAgaGFuZGxlRmFpbHVyZShmYWlsdXJlU2VnbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU3VjY2Vzcztcbn1cblxuY29uc3QgaGFuZGxlRmFpbHVyZSA9IChzZWdtZW50OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsIGAke3NlZ21lbnR9IGNyZWF0aW9uIGZhaWxlZGApO1xufSIsImltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IChvbkNsb3NlOiAoKSA9PiB2b2lkLCBvblN1Ym1pdDogKCkgPT4gdm9pZCk6IEpTWC5FbGVtZW50W10gPT4gW1xuICAgIDxCdXR0b25cbiAgICAgICAga2V5PXsxfVxuICAgICAgICBjbGFzc05hbWU9XCJidG4tc2Vjb25kYXJ5XCJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICA+XG4gICAgICAgIENsb3NlXG4gICAgPC9CdXR0b24+LFxuICAgIDxCdXR0b25cbiAgICAgICAga2V5PXsxfVxuICAgICAgICBjbGFzc05hbWU9XCJidG4tc3VjY2Vzc1wiXG4gICAgICAgIG9uQ2xpY2s9e29uU3VibWl0fVxuICAgID5cbiAgICAgICAgU3VibWl0XG4gICAgPC9CdXR0b24+XSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7U3RvcmVEYXRhfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1N0b3JlRGF0YSc7XG5cbmludGVyZmFjZSBTdG9yZUFjdGlvbnMge1xuICAgIHNldFVybDogKHVybDogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldE1ldGhvZDogKG1ldGhvZDogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEJvZHk6IChib2R5OiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc2V0SGVhZGVyczogKGhlYWRlcnM6IHN0cmluZykgPT4gdm9pZDtcbn1cblxudHlwZSBDb21wb25lbnRQcm9wcyA9IFN0b3JlRGF0YSAmIFN0b3JlQWN0aW9ucztcblxuY29uc3QgTW9kYWxDb21wb25lbnRQdXJlID0gKHByb3BzOiBDb21wb25lbnRQcm9wcykgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZSd9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cnfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbC14cy02J30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsndXJsLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tdXJsLWZpZWxkYH0+VVJMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tdXJsLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgdXJsLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldFVybChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J21ldGhvZC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LW1ldGhvZC1maWVsZGB9Pk1ldGhvZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LW1ldGhvZC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIG1ldGhvZC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRNZXRob2QoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5tZXRob2R9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydib2R5LWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9PkJvZHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1ib2R5LWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgYm9keS1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRCb2R5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXs1fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnaGVhZGVycy1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfT5IZWFkZXJzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0taGVhZGVycy1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGhlYWRlcnMtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0SGVhZGVycyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmhlYWRlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17MTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17OTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbC14cy02J30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncmVzcG9uc2UtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1yZXNwb25zZS1maWVsZGB9PlJlc3BvbnNlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCByZXNwb25zZS1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLnJlc3BvbnNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezMwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlOiBTdG9yZURhdGEpOiBTdG9yZURhdGEge1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VXJsOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3VybCcsIG5ld1ZhbH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldE1ldGhvZDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdtZXRob2QnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRCb2R5OiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ2JvZHknLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRIZWFkZXJzOiAobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ2hlYWRlcnMnLCBuZXdWYWx9KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBNb2RhbENvbXBvbmVudCA9IGNvbm5lY3Q8U3RvcmVEYXRhLCBTdG9yZUFjdGlvbnMsIG5ldmVyPihtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTW9kYWxDb21wb25lbnRQdXJlKTtcbiIsImltcG9ydCB7UG5yUHVibGljU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9QbnJQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyaXBTdW1tYXJ5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHBuclB1YmxpY1NlcnZpY2U6IFBuclB1YmxpY1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFBuclB1YmxpY1NlcnZpY2UpO1xuICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgY29uc3QgcmVjb3JkTG9jYXRvciA9IHBuclB1YmxpY1NlcnZpY2UuZ2V0UmVjb3JkTG9jYXRvcigpO1xuICAgIGlmIChyZWNvcmRMb2NhdG9yKSB7XG4gICAgICAgIHBuclB1YmxpY1NlcnZpY2UucmVmcmVzaERhdGEoKTtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignSW5mbycsICdBY3RpdmUgUE5SIGhhcyBiZWVuIHJlZnJlc2hlZC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdFcnJvcicsICdUaGVyZSBpcyBubyBhY3RpdmUgUE5SIHRvIHJlZnJlc2guJyk7XG4gICAgfVxufSIsbnVsbCwiaW1wb3J0IHtBZ2VudFByb2ZpbGVTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0FnZW50UHJvZmlsZVNlcnZpY2UnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuY29uc3QgTk9UX0FWQUlMQUJMRSA9ICdOb3QgQXZhaWxhYmxlJztcbmV4cG9ydCBjb25zdCBzaG93QWdlbnRQcm9maWxlID0gKCk6IHZvaWQgPT4ge1xuXG4gICAgY29uc3Qgc2VydmljZTogQWdlbnRQcm9maWxlU2VydmljZSA9IGdldFNlcnZpY2UoQWdlbnRQcm9maWxlU2VydmljZSk7XG4gICAgY29uc3QgYWdlbnRJZCA9IHNlcnZpY2UuZ2V0QWdlbnRJZCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgbG9jYWxlID0gc2VydmljZS5nZXRMb2NhbGUoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IHBjYyA9IHNlcnZpY2UuZ2V0UGNjKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjb3VudHJ5ID0gc2VydmljZS5nZXRDb3VudHJ5KCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCByZWdpb24gPSBzZXJ2aWNlLmdldFJlZ2lvbigpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJCdXNpbmVzc1VuaXQgPSBzZXJ2aWNlLmdldEN1c3RvbWVyQnVzaW5lc3NVbml0KCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBjdXN0b21lckVtcGxveWVlSWQgPSBzZXJ2aWNlLmdldEN1c3RvbWVyRW1wbG95ZWVJZCgpIHx8IE5PVF9BVkFJTEFCTEU7XG5cbiAgICBjb25zdCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbiA9IGBBZ2VudCBJRDogKioke2FnZW50SWR9KipcXG5gICtcbiAgICAgICAgYFBzZXVkbyBDaXR5IENvZGU6ICoqJHtwY2N9KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgQWdlbmN5IENvdW50cnk6ICoqJHtjb3VudHJ5fSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBSZWdpb246ICoqJHtyZWdpb259KipcXG5gICtcbiAgICAgICAgYEFnZW50J3MgTG9jYWxlOiAqKiR7bG9jYWxlfSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBCdXNpbmVzcyBVbml0OiAqKiR7Y3VzdG9tZXJCdXNpbmVzc1VuaXR9KipcXG5gICtcbiAgICAgICAgYEN1c3RvbWVyIEVtcGxveWVlIElEOiAqKiR7Y3VzdG9tZXJFbXBsb3llZUlkfSoqXFxuYDtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQWdlbnQgUHJvZmlsZScsIGFnZW50UHJvZmlsZURlc2NyaXB0aW9uKVxufSIsImltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge0Jhbm5lckNvbmZpZ30gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9CYW5uZXJDb25maWcnO1xuaW1wb3J0IHtzaG93QnV0dG9uQWN0aW9ufSBmcm9tICcuL3Nob3dCdXR0b25BY3Rpb24nO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dCYW5uZXJzID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG5cbiAgICBjb25zdCBjb25maWdJbmZvOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHRleHQ6ICdJbmZvIGJhbm5lciB3aXRob3V0IHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnSW5mbyk7XG5cbiAgICBjb25zdCBjb25maWdFcnJvcjogQmFubmVyQ29uZmlnPSB7XG4gICAgICAgIHR5cGU6ICdFcnJvcicsXG4gICAgICAgIHRleHQ6ICdFcnJvciBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdFcnJvcik7XG5cbiAgICBjb25zdCBjb25maWdTdWNjZXNzOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdTdWNjZXNzJyxcbiAgICAgICAgdGV4dDogJ1N1Y2Nlc3MgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MgdGl0bGUnLFxuICAgIH07XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdTdWNjZXNzKTtcblxuICAgIGNvbnN0IGNvbmZpZ1dhcm5pbmc6IEJhbm5lckNvbmZpZyA9IHtcbiAgICAgICAgdHlwZTogJ1dhcm5pbmcnLFxuICAgICAgICB0ZXh0OiAnV2FybmluZyBiYW5uZXIgdGV4dCcsXG4gICAgICAgIHRpdGxlOiAnV2FybmluZyB0aXRsZScsXG4gICAgICAgIGxhYmVsOiAnV2FybmluZyBhY3Rpb24nLFxuICAgICAgICBhY3Rpb246IHNob3dCdXR0b25BY3Rpb25cbiAgICB9XG4gICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcihjb25maWdXYXJuaW5nKTtcbn0iLCJpbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QnV0dG9uQWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdXYXJuaW5nIGFjdGlvbicsICdUaGUgd2FybmluZyBhY3Rpb24gYnV0dG9uIGhhcyBiZWVuIHByZXNzZWQuJylcbn0iLCJpbXBvcnQge0ludGVyc3RpdGlhbFNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0ludGVyc3RpdGlhbCA9ICgpOiB2b2lkID0+IHtcbiAgICBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpLnNob3dJbnRlcnN0aXRpYWwoNTAwMCk7XG59IiwiaW1wb3J0IHtFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBzaG93UnVudGltZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlOiBFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UgPSBnZXRTZXJ2aWNlKEVudmlyb25tZW50UHVibGljU2VydmljZSk7XG5cbiAgICBjb25zdCBydW50aW1lID0gc2VydmljZS5nZXRSdW50aW1lKCkgfHwgJ05vdCBBdmFpbGFibGUnO1xuXG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ1J1bm5pbmcgb24nLCBgUnVubmluZyBvbjogJHtydW50aW1lfWApO1xufSIsbnVsbCwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7SU1vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7STE4blNlcnZpY2UsIFNjb3BlZFRyYW5zbGF0b3J9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0kxOG5TZXJ2aWNlXCI7XG5cbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY29udGV4dDogSU1vZHVsZUNvbnRleHQgPSBuZXcgTW9kdWxlQ29udGV4dChcImNvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGVcIik7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNmOiBJTW9kdWxlQ29udGV4dFsnY2YnXSA9IGNvbnRleHQuY2YuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsncmVnaXN0ZXJTZXJ2aWNlJ10gPSBjb250ZXh0LnJlZ2lzdGVyU2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBnZXRTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsnZ2V0U2VydmljZSddID0gY29udGV4dC5nZXRTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHQ6IFNjb3BlZFRyYW5zbGF0b3IgPSBnZXRTZXJ2aWNlKEkxOG5TZXJ2aWNlKS5nZXRTY29wZWRUcmFuc2xhdG9yKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlL3RyYW5zbGF0aW9ucycpO1xuIiwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7TWFpbn0gZnJvbSAnLi9NYWluJztcbmltcG9ydCB7SU1vZHVsZU1hbmlmZXN0fSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVNYW5pZmVzdCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5cbi8qKlxuICogIEF1dG9nZW5lcmF0ZWQgY2xhc3MgcmVwcmVzZW50aW5nIG1vZHVsZSBpbiBydW50aW1lLlxuICoqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlX2NvbV9zYWJyZV9yZWRhcHBfZXhhbXBsZTNfd2ViX2N1c3RvbXdvcmtmbG93X3dlYl9tb2R1bGUgZXh0ZW5kcyBNYWluIHtcbiAgICBjb25zdHJ1Y3RvcihtYW5pZmVzdDogSU1vZHVsZU1hbmlmZXN0KSB7XG4gICAgICAgIHN1cGVyKG1hbmlmZXN0KTtcbiAgICAgICAgY29udGV4dC5zZXRNb2R1bGUodGhpcyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBTdG9yZURhdGEge1xuICAgIHVybDogc3RyaW5nO1xuICAgIG1ldGhvZDogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZztcbiAgICBoZWFkZXJzOiBzdHJpbmc7XG4gICAgcmVzcG9uc2U6IHN0cmluZztcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2dldFNlcnZpY2UsIHJlZ2lzdGVyU2VydmljZX0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7RXh0ZW5zaW9uUG9pbnRTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7TW9kdWxlfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZSc7XG5pbXBvcnQge1JlZEFwcFNpZGVQYW5lbEJ1dHRvbn0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7UmVkQXBwU2lkZVBhbmVsQ29uZmlnfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9SZWRBcHBTaWRlUGFuZWxDb25maWcnO1xuaW1wb3J0IHtDdXN0b21Xb3JrZmxvd1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcbmltcG9ydCB7Y3JlYXRlUG5yRm9ybX0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuckZvcm0nO1xuaW1wb3J0IHtjYWxsTGFzTGF4fSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbExhc0xheCc7XG5pbXBvcnQge3Nob3dSdW50aW1lfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUnO1xuaW1wb3J0IHtzaG93SW50ZXJzdGl0aWFsfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbCc7XG5pbXBvcnQge3Nob3dBZ2VudFByb2ZpbGV9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlJztcbmltcG9ydCB7c2hvd0Jhbm5lcnN9IGZyb20gJy4vY29tcG9uZW50cy9zaG93QmFubmVycyc7XG5pbXBvcnQge3JlZnJlc2hUcmlwU3VtbWFyeX0gZnJvbSAnLi9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeSc7XG5pbXBvcnQge2NhbGxFeHRlcm5hbFNlcnZpY2V9IGZyb20gJy4vY29tcG9uZW50cy9jYWxsRXh0ZXJuYWxTZXJ2aWNlJztcbmltcG9ydCB7Y3JlYXRlTm90aWZpY2F0aW9uRm9ybSwgaGlkZU5vdGlmaWNhdGlvbnN9IGZyb20gXCIuL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybVwiO1xuaW1wb3J0IHtzaG93U2VhdE1hcE1vZGFsfSBmcm9tICcuL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvc2hvd1NlYXRNYXBNb2RhbCc7XG5cbmltcG9ydCB7UHVibGljQWlyQXZhaWxhYmlsaXR5U2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlTZXJ2aWNlJztcbmltcG9ydCB7U2VhdE1hcEF2YWlsVGlsZX0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZSc7IC8vIAUgQXZhaWxhYmlsaXR5IFRpbGVXaWRnZXRcbmltcG9ydCB7U2VhdE1hcEF2YWlsVmlld30gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldyc7ICAgLy8gBSA8PjQwO0w9PjUgPjo9PiA+QjpASzIwNTw+NSA/PiA6Ozg6QyA9MCBUaWxlV2lkZ2V0XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge1B1YmxpY01vZGFsc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBNb2R1bGUge1xuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU2VhdE1hcEF2YWlsVGlsZSgpOyAvLyA9SCBhZGQgQXZhaWxhYmlsaXR5IFRpbGVXaWRnZXRcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgICAgIHJlZ2lzdGVyU2VydmljZShDdXN0b21Xb3JrZmxvd1NlcnZpY2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXAoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgYmFzZUNzc0NsYXNzTmFtZXMgPSAnYnRuIGJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b24gcmVkYXBwLXdlYi1jdXN0b213b3JrZmxvdyc7XG5cbiAgICAgICAgY29uc3Qgc2VsZlJlbW92ZUJ0biA9IG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1JlbW92YWJsZSBCdXR0b24nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVtb3ZlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsZlJlbW92ZUJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlnID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IGJhbm5lcnMnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYmFubmVycycsIHNob3dCYW5uZXJzKSxcbiAgICAgICAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0V4dGVybmFsIHNlcnZpY2UgY2FsbCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1leHRlcm5hbHNlcnZpY2VjYWxsJywgY2FsbEV4dGVybmFsU2VydmljZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWRBcHAgcGxhdGZvcm0nLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcGxhdGZvcm0nLCBzaG93UnVudGltZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdMQVMgLSBMQVgnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWN0aW9uJywgY2FsbExhc0xheCksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgUE5SJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBucicsIGNyZWF0ZVBuckZvcm0pLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBpbnRlcnN0aXRpYWwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctaW50ZXJzdGl0aWFsJywgc2hvd0ludGVyc3RpdGlhbCksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdTaG93IEFnZW50IFByb2ZpbGUnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctYWdlbnRwcm9maWxlJywgc2hvd0FnZW50UHJvZmlsZSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZWZyZXNoIFRyaXAgU3VtbWFyeScsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1yZWZyZXNodHJpcCcsIHJlZnJlc2hUcmlwU3VtbWFyeSksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdDcmVhdGUgbm90aWZpY2F0aW9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWNyZWF0ZU5vdGlmaWNhdGlvbicsIGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0pLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignSGlkZSBub3RpZmljYXRpb25zJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWhpZGVOb3RpZmljYXRpb24nLCBoaWRlTm90aWZpY2F0aW9ucyksXG4gICAgICAgICAgICBzZWxmUmVtb3ZlQnRuLFxuICAgICAgICAgICAgLy8gbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignT3BlbiBBQkMgU2VhdE1hcCcsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1zaG93U2VhdE1hcCcsIHNob3dTZWF0TWFwTW9kYWwpLFxuICAgICAgICBdKTtcblxuICAgICAgICBnZXRTZXJ2aWNlKEV4dGVuc2lvblBvaW50U2VydmljZSkuYWRkQ29uZmlnKCdyZWRBcHBTaWRlUGFuZWwnLCBjb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGFpckF2YWlsYWJpbGl0eVNlcnZpY2U6IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UpO1xuICAgIFxuICAgICAgICBjb25zdCBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsID0gKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdBQkMgU2VhdCBNYXAnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQXZhaWxWaWV3LCBkYXRhKSxcbiAgICAgICAgICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3JlYWN0LXRpbGUtbW9kYWwtY2xhc3MnXG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICBhaXJBdmFpbGFiaWxpdHlTZXJ2aWNlLmNyZWF0ZUFpckF2YWlsYWJpbGl0eVNlYXJjaFRpbGUoXG4gICAgICAgICAgICBTZWF0TWFwQXZhaWxUaWxlLFxuICAgICAgICAgICAgc2hvd1NlYXRNYXBBdmFpbGFiaWxpdHlNb2RhbCxcbiAgICAgICAgICAgICdBQkMgU2VhdCBNYXAnIC8vIAUgNzAzPjs+Mj46IDI4NDY1QjBcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtTdG9yZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvU3RvcmVEYXRhJztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBTdG9yZURhdGEgPSB7XG4gICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzEnLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgYm9keTogJycsXG4gICAgaGVhZGVyczogJ3t9JyxcbiAgICByZXNwb25zZTogJydcbn1cblxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RvcmVEYXRhID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnU0VUX1BBUkFNRVRFUic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24ubmV3VmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yZSB7XG5cbiAgICBwdWJsaWMgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuICAgIGdldERhdGEoKTogU3RvcmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7SUN1c3RvbVdvcmtmbG93fSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL2ludGVyZmFjZXMvSUN1c3RvbVdvcmtmbG93JztcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0lBcmVhU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB3aXRoIGRlY2xhcmF0aXZlIGN1c3RvbSB3b3JrZmxvdyBpbiBtYW5pZmVzdC5qc29uLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlIGV4dGVuZHMgSUN1c3RvbVdvcmtmbG93IHtcbiAgICBzdGF0aWMgU0VSVklDRV9OQU1FID0gJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUtQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlJztcblxuICAgIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElBcmVhU2VydmljZSk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQ3VzdG9tIFdvcmtmbG93IFNlcnZpY2UgU3VjY2VzcycpO1xuICAgIH1cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsbnVsbCxudWxsLG51bGxdfQ== 