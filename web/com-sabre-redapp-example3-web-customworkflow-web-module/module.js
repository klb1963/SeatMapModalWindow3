System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent", ["react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SeatMapComponent = function () {
    var iframeRef = React.useRef(null);
    var seatMapData = {
        config: {
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
        },
        flight: {
            id: '111',
            airlineCode: 'EK',
            flightNo: '50',
            departureDate: '2025-04-21',
            departure: 'MUC',
            arrival: 'DXB',
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
                        {
                            label: '1',
                            seats: [
                                { label: 'A', x: 50, y: 50 },
                                { label: 'B', x: 100, y: 50 }
                            ]
                        },
                        {
                            label: '2',
                            seats: [{ label: 'A', x: 50, y: 100 }]
                        }
                    ]
                }
            ]
        },
        availability: [
            {
                label: '1A',
                price: 50,
                currency: 'USD',
                color: 'green',
                onlyForPassengerType: ['ADT']
            },
            {
                label: '1B',
                price: 45,
                currency: 'USD',
                color: 'yellow',
                onlyForPassengerType: ['ADT']
            },
            {
                label: '2A',
                price: 30,
                currency: 'USD',
                color: 'lightblue'
            }
        ],
        passengers: [
            {
                id: 'PAX1',
                name: 'Иванов И.И.',
                type: 'ADT'
            }
        ]
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow)
            return;
        iframe.contentWindow.postMessage({
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
            availability: JSON.stringify(seatMapData.availability),
            passengers: JSON.stringify(seatMapData.passengers)
        }, '*');
        console.log('📤 SeatMap data sent via postMessage');
    };
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("p", null, "\u2705 SeatMap \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"),
        React.createElement("button", { onClick: sendToIframe }, "\uD83D\uDCE4 \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0438 \u043A\u0430\u0440\u0442\u044B"),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/" // приходит механизм "отрисовки" и обмена данными 
            , 
            // src="localhost:3000" - npm start
            width: "100%", height: "800", style: { border: '1px solid #ccc', marginTop: '1rem' }, title: "SeatMapIframe" })));
};
exports.default = SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal", ["react","com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/SeatMapComponent"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapModal = void 0;
var React = require("react");
var Context_1 = require("../../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponent_1 = require("./SeatMapComponent");
function showSeatMapModal() {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
    var options = {
        header: 'SeatMap Viewer',
        component: React.createElement(SeatMapComponent_1.default),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options);
}
exports.showSeatMapModal = showSeatMapModal;


});
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal.js", ["com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"))});
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module/Main", ["com-sabre-redapp-example3-web-customworkflow-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-core/modules/Module","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-xp/configs/RedAppSidePanelConfig","com-sabre-redapp-example3-web-customworkflow-web-module/services/CustomWorkflowService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createPnrForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/callLasLax","com-sabre-redapp-example3-web-customworkflow-web-module/components/showRuntime","com-sabre-redapp-example3-web-customworkflow-web-module/components/showInterstitial","com-sabre-redapp-example3-web-customworkflow-web-module/components/showAgentProfile","com-sabre-redapp-example3-web-customworkflow-web-module/components/showBanners","com-sabre-redapp-example3-web-customworkflow-web-module/components/refreshTripSummary","com-sabre-redapp-example3-web-customworkflow-web-module/components/callExternalService","com-sabre-redapp-example3-web-customworkflow-web-module/components/createNotificationForm","com-sabre-redapp-example3-web-customworkflow-web-module/components/abc-seatmap/showSeatMapModal"], false, function (require, exports, module) {
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
var showSeatMapModal_1 = require("./components/abc-seatmap/showSeatMapModal");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.registerServices();
        this.setup();
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
            new RedAppSidePanelButton_1.RedAppSidePanelButton('Open ABC SeatMap', baseCssClassNames + '-showSeatMap', showSeatMapModal_1.showSeatMapModal),
        ]);
        (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('redAppSidePanel', config);
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
System.registerDynamic("com-sabre-redapp-example3-web-customworkflow-web-module", ["com-sabre-redapp-example3-web-customworkflow-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-example3-web-customworkflow-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvYWJjLXNlYXRtYXAvU2VhdE1hcENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93MS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvYWN0aW9ucy5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY2FsbExhc0xheC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlTm90aWZpY2F0aW9uRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9hY3Rpb25zLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0ZXJuYWxTZXJ2aWNlU3ViQ29tcG9uZW50cy9Nb2RhbENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZnJlc2hUcmlwU3VtbWFyeS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9TZWF0TWFwTW9kYWxXaW5kb3cxL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QWdlbnRQcm9maWxlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93QmFubmVycy50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0J1dHRvbkFjdGlvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd0ludGVyc3RpdGlhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1J1bnRpbWUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvU2VhdE1hcE1vZGFsV2luZG93MS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBNb2RhbC5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9pbmRleC50cyIsInNyYy9jb2RlL2ludGVyZmFjZXMvU3RvcmVEYXRhLnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3JlZHVjZXJzL0xvY2FsU3RvcmUudHMiLCJzcmMvY29kZS9zZXJ2aWNlcy9DdXN0b21Xb3JrZmxvd1NlcnZpY2UudHMiLCJzcmMvY29kZS91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBK0I7QUFFL0IsSUFBTSxnQkFBZ0IsR0FBYTtJQUNqQyxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFvQixJQUFJLENBQUMsQ0FBQztJQUV4RCxJQUFNLFdBQVcsR0FBRztRQUNsQixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsR0FBRztZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLEtBQUs7WUFDakIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsZUFBZSxFQUFFLElBQUk7WUFDckIsWUFBWSxFQUFFLElBQUk7WUFDbEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFVBQVUsRUFBRTtnQkFDVixj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QUFFL0IsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQWEsRUFBRSxHQUFXO0lBQzlELElBQU0sSUFBSSxHQUFlO1FBQ3JCLEtBQUssT0FBQTtRQUNMLE1BQU0sRUFBRTtZQUNKO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRzthQUNaO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTDtnQkFDSSxFQUFFLEVBQUUsUUFBUTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO0tBQ0osQ0FBQztJQUNGLElBQUEsb0JBQVUsRUFBQyx5Q0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFsQlksUUFBQSx1QkFBdUIsMkJBa0JuQyIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNlYXRNYXBDb21wb25lbnQ6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBpZnJhbWVSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgIGNvbmZpZzoge1xuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGxhbmc6ICdFTicsXG4gICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgIHJpZ2h0VG9MZWZ0OiBmYWxzZSxcbiAgICAgIHZpc2libGVGdXNlbGFnZTogdHJ1ZSxcbiAgICAgIHZpc2libGVXaW5nczogdHJ1ZSxcbiAgICAgIGJ1aWx0SW5EZWNrU2VsZWN0b3I6IHRydWUsXG4gICAgICBzaW5nbGVEZWNrTW9kZTogdHJ1ZSxcbiAgICAgIGJ1aWx0SW5Ub29sdGlwOiB0cnVlLFxuICAgICAgZXh0ZXJuYWxQYXNzZW5nZXJNYW5hZ2VtZW50OiBmYWxzZSxcbiAgICAgIHRvb2x0aXBPbkhvdmVyOiBmYWxzZSxcbiAgICAgIGNvbG9yVGhlbWU6IHtcbiAgICAgICAgc2VhdExhYmVsQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHNlYXRTdHJva2VDb2xvcjogJ2dyYXknXG4gICAgICB9XG4gICAgfSxcbiAgICBmbGlnaHQ6IHtcbiAgICAgIGlkOiAnMTExJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnRUsnLFxuICAgICAgZmxpZ2h0Tm86ICc1MCcsXG4gICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNC0yMScsXG4gICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAgICAgYXJyaXZhbDogJ0RYQicsXG4gICAgICBjYWJpbkNsYXNzOiAnQSdcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxJyxcbiAgICAgICAgICAgICAgc2VhdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdCJywgeDogMTAwLCB5OiA1MCB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMicsXG4gICAgICAgICAgICAgIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBhdmFpbGFiaWxpdHk6IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICcxQScsXG4gICAgICAgIHByaWNlOiA1MCxcbiAgICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnMUInLFxuICAgICAgICBwcmljZTogNDUsXG4gICAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxuICAgICAgICBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICcyQScsXG4gICAgICAgIHByaWNlOiAzMCxcbiAgICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgICBjb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICAgIH1cbiAgICBdLFxuICAgIHBhc3NlbmdlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdQQVgxJyxcbiAgICAgICAgbmFtZTogJxgyMD0+MiAYLhguJyxcbiAgICAgICAgdHlwZTogJ0FEVCdcbiAgICAgIH1cbiAgICBdXG4gIH07XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lIHx8ICFpZnJhbWUuY29udGVudFdpbmRvdykgcmV0dXJuO1xuXG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dCksXG4gICAgICAgIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgICAgcGFzc2VuZ2VyczogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEucGFzc2VuZ2VycylcbiAgICAgIH0sXG4gICAgICAnKidcbiAgICApO1xuXG4gICAgY29uc29sZS5sb2coJz3kIFNlYXRNYXAgZGF0YSBzZW50IHZpYSBwb3N0TWVzc2FnZScpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICA8cD4FIFNlYXRNYXAgOj49QjU5PTVAIDcwM0BDNjU9PC9wPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtzZW5kVG9JZnJhbWV9Pj3kIB5CP0AwMjhCTCA0MD09SzUgNDtPID5CQDhBPjI6OCA6MEBCSzwvYnV0dG9uPlxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIiAvLyA/QDhFPjQ4QiA8NUUwPTg3PCBcIj5CQDhBPjI6OFwiIDggPjE8NT0wIDQwPT1LPDggXG4gICAgICAgIC8vIHNyYz1cImxvY2FsaG9zdDozMDAwXCIgLSBucG0gc3RhcnRcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLCBtYXJnaW5Ub3A6ICcxcmVtJyB9fVxuICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnQ7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uLy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0ICBTZWF0TWFwQ29tcG9uZW50IGZyb20gJy4vU2VhdE1hcENvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2VhdE1hcE1vZGFsKCk6IHZvaWQge1xuICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlYWN0TW9kYWxPcHRpb25zID0ge1xuICAgIGhlYWRlcjogJ1NlYXRNYXAgVmlld2VyJyxcbiAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpO1xufSIsbnVsbCwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQdWJsaWNNb2RhbHNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQge1JlYWN0TW9kYWxPcHRpb25zfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQge0V4dGVybmFsU2VydmljZUNvbm5lY3Rvcn0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9FeHRlcm5hbFNlcnZpY2VDb25uZWN0b3InO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7YWN0aW9uc30gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL2FjdGlvbnMnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9leHRlcm5hbFNlcnZpY2VTdWJDb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcbmltcG9ydCB7TG9jYWxTdG9yZX0gZnJvbSAnLi4vcmVkdWNlcnMvTG9jYWxTdG9yZSc7XG5cbmNvbnN0IG1vZGFsU2VydmljZTogUHVibGljTW9kYWxzU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbmV4cG9ydCBjb25zdCBjYWxsRXh0ZXJuYWxTZXJ2aWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGxvY2FsU3RvcmUgPSBuZXcgTG9jYWxTdG9yZSgpO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IGxvY2FsU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhLmhlYWRlcnMpO1xuXG4gICAgICAgIGdldFNlcnZpY2UoRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yKS5jYWxsU2VydmljZShzdG9yZURhdGEudXJsLCBzdG9yZURhdGEubWV0aG9kLCBzdG9yZURhdGEuYm9keSwgaGVhZGVycykuZG9uZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IEpTT04ucGFyc2UocmVzcG9uc2UgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VPYmplY3QsIG51bGwsIDIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yZS5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICB7dHlwZTogJ1NFVF9QQVJBTUVURVInLCBmaWVsZDogJ3Jlc3BvbnNlJywgbmV3VmFsOiByZXNwb25zZVN0cmluZ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICBtb2RhbFNlcnZpY2UuY2xvc2VSZWFjdE1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmd2TW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnRXh0ZXJuYWxTZXJ2aWNlQ29ubmVjdG9yJyxcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsQ29tcG9uZW50KSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0LFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zKG9uQ2xvc2UsIG9uU3VibWl0KSxcbiAgICAgICAgc3RvcmU6IGxvY2FsU3RvcmUuc3RvcmVcbiAgICB9XG5cbiAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwobmd2TW9kYWxPcHRpb25zKTtcbn07IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtjZiwgZ2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge29wZW5DdXN0b21Gb3JtUGFyYWdyYXBofSBmcm9tICcuLi91dGlscy9vcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCc7XG5cbmV4cG9ydCBjb25zdCBjYWxsTGFzTGF4ID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xuXG4gICAgY2YoJzFMQVNMQVgnKS5zZW5kKCkuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2lnbkluUmVzcG9uc2UgPSByZXNwb25zZS5nZXREYXRhU3RydWN0cygpXG4gICAgICAgICAgICAuZmlsdGVyKGRhdGEgPT4gZGF0YVsnZC5TY3JlZW4nXSAmJiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBkYXRhWydkLlNjcmVlbiddWydkLlRleHQnXSlcbiAgICAgICAgICAgIC5zb21lKGRhdGEgPT4gZGF0YS5pbmNsdWRlcygnU0lHTiBJTicpKTtcblxuICAgICAgICBpZiAoaGFzU2lnbkluUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdFcnJvcicsICdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21Gb3JtUnN9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm1Scyc7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vZmllbGRzL1RleHRGaWVsZCc7XG5pbXBvcnQge0Ryb3Bkb3duRmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9Ecm9wZG93bkZpZWxkJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vc2VydmljZS9JTm90aWZpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvblR5cGV9IGZyb20gJ3NhYnJlLW5ndi1ub3RpZmljYXRpb24vaW50ZXJmYWNlcy9Ob3RpZmljYXRpb25UeXBlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogc3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbkZvcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdOb3RpZmljYXRpb24nLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnRFJPUERPV04nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnV2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXigtP1sxLTldWzAtOV0qfDApJCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGltZW91dCBpbiBtcycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogJ14oWzEtOV1bMC05XSp8MCkkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcblxuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNob3dOb3RpZmljYXRpb24gPSAoZm9ybTogQ3VzdG9tRm9ybSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3R5cGUnKSBhcyBEcm9wZG93bkZpZWxkKS52YWx1ZTtcblxuICAgIGNvbnN0IGlkID0gZ2V0U2VydmljZShJTm90aWZpY2F0aW9uU2VydmljZSkuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpdGxlJykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgY29udGVudDogKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjb250ZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gJ05vbmUnID8gdW5kZWZpbmVkIDogdHlwZSBhcyBOb3RpZmljYXRpb25UeXBlLFxuICAgICAgICBwcmlvcml0eTogcGFyc2VJbnQoKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwcmlvcml0eScpIGFzIFRleHRGaWVsZCkudmFsdWUpLFxuICAgICAgICB0aW1lb3V0OiBwYXJzZUludCgoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVvdXQnKSBhcyBUZXh0RmllbGQpLnZhbHVlKVxuICAgIH0pO1xuXG4gICAgbm90aWZpY2F0aW9ucy5wdXNoKGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhpZGVOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChpZCA9PiBnZXRTZXJ2aWNlKElOb3RpZmljYXRpb25TZXJ2aWNlKS5oaWRlTm90aWZpY2F0aW9uKGlkKSk7XG4gICAgbm90aWZpY2F0aW9ucy5sZW5ndGggPSAwO1xufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvcm0gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdGVuRGF5c0FoZWFkRmxpZ2h0ID0gJzEnICsgZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgxMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKSArICdMQVNMQVhcXHUwMEE1QUEnO1xuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1ET0UvSk9ITidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW5EYXlzQWhlYWRGbGlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aWNrZXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnMDFZMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhZ2VudCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBZ2VudCBJbmZvJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzZBR0VOVCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc5MTIzNDU2NydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblxuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ2FnZW50SW5mbycpO1xuICAgIGNvbnN0IHBob25lUnNTdGF0dXMgPSBhZ2VudEluZm9Sc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICBjb25zdCB0YXdSc1N0YXR1cyA9IHBob25lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUQVcnKTtcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1dQJywgJ1dQJyk7XG4gICAgY29uc3QgcHFSc1N0YXR1cyA9IHdwUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJ1BRJywgJ1BRJyk7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLmhpZGVJbnRlcnN0aXRpYWwoKTtcbiAgICBwcVJzU3RhdHVzICYmIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgJ1BOUiBjcmVhdGVkJyk7XG59XG5cbmNvbnN0IHNlbmRDb21tYW5kID0gYXN5bmMgKGNvbW1hbmQ6IHN0cmluZywgZmFpbHVyZVNlZ21lbnQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHJzU3RhdHVzOiBDb21tYW5kTWVzc2FnZUJhc2ljUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDb21tYW5kTWVzc2FnZVNlcnZpY2UpLnNlbmQoY29tbWFuZCk7XG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IHJzU3RhdHVzLlN0YXR1cy5TdWNjZXNzO1xuXG4gICAgaWYgKGlzU3VjY2VzcyAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0gJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdLlRleHQuaW5jbHVkZXMoJ1NJR04gSU4nKSkge1xuICAgICAgICBpc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaGFuZGxlRmFpbHVyZSgnQ29tbWFuZCBmYWlsZWQsIG5vdCBzaWduZWQgaW4uJyk7XG4gICAgfSBlbHNlIGlmICghaXNTdWNjZXNzKSB7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoZmFpbHVyZVNlZ21lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG59XG5cbmNvbnN0IGhhbmRsZUZhaWx1cmUgPSAoc2VnbWVudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCBgJHtzZWdtZW50fSBjcmVhdGlvbiBmYWlsZWRgKTtcbn0iLCJpbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSAob25DbG9zZTogKCkgPT4gdm9pZCwgb25TdWJtaXQ6ICgpID0+IHZvaWQpOiBKU1guRWxlbWVudFtdID0+IFtcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXNlY29uZGFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgPlxuICAgICAgICBDbG9zZVxuICAgIDwvQnV0dG9uPixcbiAgICA8QnV0dG9uXG4gICAgICAgIGtleT17MX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIlxuICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdH1cbiAgICA+XG4gICAgICAgIFN1Ym1pdFxuICAgIDwvQnV0dG9uPl0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi4vLi4vQ29udGV4dCc7XG5pbXBvcnQge1N0b3JlRGF0YX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9TdG9yZURhdGEnO1xuXG5pbnRlcmZhY2UgU3RvcmVBY3Rpb25zIHtcbiAgICBzZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRNZXRob2Q6IChtZXRob2Q6IHN0cmluZykgPT4gdm9pZDtcbiAgICBzZXRCb2R5OiAoYm9keTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHNldEhlYWRlcnM6IChoZWFkZXJzOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSBTdG9yZURhdGEgJiBTdG9yZUFjdGlvbnM7XG5cbmNvbnN0IE1vZGFsQ29tcG9uZW50UHVyZSA9IChwcm9wczogQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93J30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3VybC1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9PlVSTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXVybC1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIHVybC1maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBwcm9wcy5zZXRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydtZXRob2QtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfT5NZXRob2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1tZXRob2QtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBtZXRob2QtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0TWV0aG9kKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMubWV0aG9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm9keS1maWVsZCBmb3JtLWdyb3VwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWJvZHktZmllbGRgfT5Cb2R5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tYm9keS1maWVsZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZm9ybS1jb250cm9sIGJvZHktZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0Qm9keShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2hlYWRlcnMtZmllbGQgZm9ybS1ncm91cCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2NvbnRleHQuZ2V0TW9kdWxlTmFtZSgpfS1oZWFkZXJzLWZpZWxkYH0+SGVhZGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LWhlYWRlcnMtZmllbGRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Zvcm0tY29udHJvbCBoZWFkZXJzLWZpZWxkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHByb3BzLnNldEhlYWRlcnMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5oZWFkZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9ezkwfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtNid9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Jlc3BvbnNlLWZpZWxkIGZvcm0tZ3JvdXAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtjb250ZXh0LmdldE1vZHVsZU5hbWUoKX0tcmVzcG9uc2UtZmllbGRgfT5SZXNwb25zZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7Y29udGV4dC5nZXRNb2R1bGVOYW1lKCl9LXJlc3BvbnNlLWZpZWxkYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmb3JtLWNvbnRyb2wgcmVzcG9uc2UtZmllbGQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5yZXNwb25zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs5MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RvcmVEYXRhKTogU3RvcmVEYXRhIHtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVybDogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICd1cmwnLCBuZXdWYWx9KVxuICAgICAgICB9LFxuICAgICAgICBzZXRNZXRob2Q6IChuZXdWYWwpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnU0VUX1BBUkFNRVRFUicsIGZpZWxkOiAnbWV0aG9kJywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Qm9keTogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdib2R5JywgbmV3VmFsfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SGVhZGVyczogKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdTRVRfUEFSQU1FVEVSJywgZmllbGQ6ICdoZWFkZXJzJywgbmV3VmFsfSlcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb21wb25lbnQgPSBjb25uZWN0PFN0b3JlRGF0YSwgU3RvcmVBY3Rpb25zLCBuZXZlcj4obWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsQ29tcG9uZW50UHVyZSk7XG4iLCJpbXBvcnQge1BuclB1YmxpY1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZSc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmlwU3VtbWFyeSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwbnJQdWJsaWNTZXJ2aWNlOiBQbnJQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgIGNvbnN0IHJlY29yZExvY2F0b3IgPSBwbnJQdWJsaWNTZXJ2aWNlLmdldFJlY29yZExvY2F0b3IoKTtcbiAgICBpZiAocmVjb3JkTG9jYXRvcikge1xuICAgICAgICBwbnJQdWJsaWNTZXJ2aWNlLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoJ0luZm8nLCAnQWN0aXZlIFBOUiBoYXMgYmVlbiByZWZyZXNoZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJlYVNlcnZpY2Uuc2hvd0Jhbm5lcignRXJyb3InLCAnVGhlcmUgaXMgbm8gYWN0aXZlIFBOUiB0byByZWZyZXNoLicpO1xuICAgIH1cbn0iLG51bGwsImltcG9ydCB7QWdlbnRQcm9maWxlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9BZ2VudFByb2ZpbGVTZXJ2aWNlJztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmNvbnN0IE5PVF9BVkFJTEFCTEUgPSAnTm90IEF2YWlsYWJsZSc7XG5leHBvcnQgY29uc3Qgc2hvd0FnZW50UHJvZmlsZSA9ICgpOiB2b2lkID0+IHtcblxuICAgIGNvbnN0IHNlcnZpY2U6IEFnZW50UHJvZmlsZVNlcnZpY2UgPSBnZXRTZXJ2aWNlKEFnZW50UHJvZmlsZVNlcnZpY2UpO1xuICAgIGNvbnN0IGFnZW50SWQgPSBzZXJ2aWNlLmdldEFnZW50SWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlcnZpY2UuZ2V0TG9jYWxlKCkgfHwgTk9UX0FWQUlMQUJMRTtcbiAgICBjb25zdCBwY2MgPSBzZXJ2aWNlLmdldFBjYygpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY291bnRyeSA9IHNlcnZpY2UuZ2V0Q291bnRyeSgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgcmVnaW9uID0gc2VydmljZS5nZXRSZWdpb24oKSB8fCBOT1RfQVZBSUxBQkxFO1xuICAgIGNvbnN0IGN1c3RvbWVyQnVzaW5lc3NVbml0ID0gc2VydmljZS5nZXRDdXN0b21lckJ1c2luZXNzVW5pdCgpIHx8IE5PVF9BVkFJTEFCTEU7XG4gICAgY29uc3QgY3VzdG9tZXJFbXBsb3llZUlkID0gc2VydmljZS5nZXRDdXN0b21lckVtcGxveWVlSWQoKSB8fCBOT1RfQVZBSUxBQkxFO1xuXG4gICAgY29uc3QgYWdlbnRQcm9maWxlRGVzY3JpcHRpb24gPSBgQWdlbnQgSUQ6ICoqJHthZ2VudElkfSoqXFxuYCArXG4gICAgICAgIGBQc2V1ZG8gQ2l0eSBDb2RlOiAqKiR7cGNjfSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIEFnZW5jeSBDb3VudHJ5OiAqKiR7Y291bnRyeX0qKlxcbmAgK1xuICAgICAgICBgQWdlbnQncyBBZ2VuY3kgUmVnaW9uOiAqKiR7cmVnaW9ufSoqXFxuYCArXG4gICAgICAgIGBBZ2VudCdzIExvY2FsZTogKioke2xvY2FsZX0qKlxcbmAgK1xuICAgICAgICBgQ3VzdG9tZXIgQnVzaW5lc3MgVW5pdDogKioke2N1c3RvbWVyQnVzaW5lc3NVbml0fSoqXFxuYCArXG4gICAgICAgIGBDdXN0b21lciBFbXBsb3llZSBJRDogKioke2N1c3RvbWVyRW1wbG95ZWVJZH0qKlxcbmA7XG4gICAgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0FnZW50IFByb2ZpbGUnLCBhZ2VudFByb2ZpbGVEZXNjcmlwdGlvbilcbn0iLCJpbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtCYW5uZXJDb25maWd9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvQmFubmVyQ29uZmlnJztcbmltcG9ydCB7c2hvd0J1dHRvbkFjdGlvbn0gZnJvbSAnLi9zaG93QnV0dG9uQWN0aW9uJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBzaG93QmFubmVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuXG4gICAgY29uc3QgY29uZmlnSW5mbzogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0ZXh0OiAnSW5mbyBiYW5uZXIgd2l0aG91dCB0aXRsZScsXG4gICAgfTtcbiAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKGNvbmZpZ0luZm8pO1xuXG4gICAgY29uc3QgY29uZmlnRXJyb3I6IEJhbm5lckNvbmZpZz0ge1xuICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OiAnRXJyb3IgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnRXJyb3IpO1xuXG4gICAgY29uc3QgY29uZmlnU3VjY2VzczogQmFubmVyQ29uZmlnID0ge1xuICAgICAgICB0eXBlOiAnU3VjY2VzcycsXG4gICAgICAgIHRleHQ6ICdTdWNjZXNzIGJhbm5lciB0ZXh0JyxcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzIHRpdGxlJyxcbiAgICB9O1xuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnU3VjY2Vzcyk7XG5cbiAgICBjb25zdCBjb25maWdXYXJuaW5nOiBCYW5uZXJDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdXYXJuaW5nJyxcbiAgICAgICAgdGV4dDogJ1dhcm5pbmcgYmFubmVyIHRleHQnLFxuICAgICAgICB0aXRsZTogJ1dhcm5pbmcgdGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1dhcm5pbmcgYWN0aW9uJyxcbiAgICAgICAgYWN0aW9uOiBzaG93QnV0dG9uQWN0aW9uXG4gICAgfVxuICAgIGFyZWFTZXJ2aWNlLnNob3dCYW5uZXIoY29uZmlnV2FybmluZyk7XG59IiwiaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0J1dHRvbkFjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnV2FybmluZyBhY3Rpb24nLCAnVGhlIHdhcm5pbmcgYWN0aW9uIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkLicpXG59IiwiaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHNob3dJbnRlcnN0aXRpYWwgPSAoKTogdm9pZCA9PiB7XG4gICAgZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKS5zaG93SW50ZXJzdGl0aWFsKDUwMDApO1xufSIsImltcG9ydCB7RW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0Vudmlyb25tZW50UHVibGljU2VydmljZSc7XG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3Qgc2hvd1J1bnRpbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2VydmljZTogRW52aXJvbm1lbnRQdWJsaWNTZXJ2aWNlID0gZ2V0U2VydmljZShFbnZpcm9ubWVudFB1YmxpY1NlcnZpY2UpO1xuXG4gICAgY29uc3QgcnVudGltZSA9IHNlcnZpY2UuZ2V0UnVudGltZSgpIHx8ICdOb3QgQXZhaWxhYmxlJztcblxuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdSdW5uaW5nIG9uJywgYFJ1bm5pbmcgb246ICR7cnVudGltZX1gKTtcbn0iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1leGFtcGxlMy13ZWItY3VzdG9td29ya2Zsb3ctd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2V4YW1wbGUzX3dlYl9jdXN0b213b3JrZmxvd193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RvcmVEYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaGVhZGVyczogc3RyaW5nO1xuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG59IiwiaW1wb3J0IHtnZXRTZXJ2aWNlLCByZWdpc3RlclNlcnZpY2V9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQge0V4dGVuc2lvblBvaW50U2VydmljZX0gZnJvbSAnc2FicmUtbmd2LXhwL3NlcnZpY2VzL0V4dGVuc2lvblBvaW50U2VydmljZSc7XG5pbXBvcnQge01vZHVsZX0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHtSZWRBcHBTaWRlUGFuZWxCdXR0b259IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQge1JlZEFwcFNpZGVQYW5lbENvbmZpZ30gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvUmVkQXBwU2lkZVBhbmVsQ29uZmlnJztcbmltcG9ydCB7Q3VzdG9tV29ya2Zsb3dTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL0N1c3RvbVdvcmtmbG93U2VydmljZSc7XG5pbXBvcnQge2NyZWF0ZVBuckZvcm19IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGVQbnJGb3JtJztcbmltcG9ydCB7Y2FsbExhc0xheH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGxMYXNMYXgnO1xuaW1wb3J0IHtzaG93UnVudGltZX0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dSdW50aW1lJztcbmltcG9ydCB7c2hvd0ludGVyc3RpdGlhbH0gZnJvbSAnLi9jb21wb25lbnRzL3Nob3dJbnRlcnN0aXRpYWwnO1xuaW1wb3J0IHtzaG93QWdlbnRQcm9maWxlfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0FnZW50UHJvZmlsZSc7XG5pbXBvcnQge3Nob3dCYW5uZXJzfSBmcm9tICcuL2NvbXBvbmVudHMvc2hvd0Jhbm5lcnMnO1xuaW1wb3J0IHtyZWZyZXNoVHJpcFN1bW1hcnl9IGZyb20gJy4vY29tcG9uZW50cy9yZWZyZXNoVHJpcFN1bW1hcnknO1xuaW1wb3J0IHtjYWxsRXh0ZXJuYWxTZXJ2aWNlfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsbEV4dGVybmFsU2VydmljZSc7XG5pbXBvcnQge2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm0sIGhpZGVOb3RpZmljYXRpb25zfSBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWF0ZU5vdGlmaWNhdGlvbkZvcm1cIjtcbmltcG9ydCB7c2hvd1NlYXRNYXBNb2RhbH0gZnJvbSAnLi9jb21wb25lbnRzL2FiYy1zZWF0bWFwL3Nob3dTZWF0TWFwTW9kYWwnO1xuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlclNlcnZpY2VzKCk6IHZvaWQge1xuICAgICAgICByZWdpc3RlclNlcnZpY2UoQ3VzdG9tV29ya2Zsb3dTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGJhc2VDc3NDbGFzc05hbWVzID0gJ2J0biBidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uIHJlZGFwcC13ZWItY3VzdG9td29ya2Zsb3cnO1xuXG4gICAgICAgIGNvbnN0IHNlbGZSZW1vdmVCdG4gPSBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdSZW1vdmFibGUgQnV0dG9uJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXJlbW92ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNlbGZSZW1vdmVCdG4uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBSZWRBcHBTaWRlUGFuZWxDb25maWcoW1xuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBiYW5uZXJzJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWJhbm5lcnMnLCBzaG93QmFubmVycyksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKCdFeHRlcm5hbCBzZXJ2aWNlIGNhbGwnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctZXh0ZXJuYWxzZXJ2aWNlY2FsbCcsIGNhbGxFeHRlcm5hbFNlcnZpY2UpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVkQXBwIHBsYXRmb3JtJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLXBsYXRmb3JtJywgc2hvd1J1bnRpbWUpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignTEFTIC0gTEFYJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFjdGlvbicsIGNhbGxMYXNMYXgpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIFBOUicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1wbnInLCBjcmVhdGVQbnJGb3JtKSxcbiAgICAgICAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ1Nob3cgaW50ZXJzdGl0aWFsJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWludGVyc3RpdGlhbCcsIHNob3dJbnRlcnN0aXRpYWwpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignU2hvdyBBZ2VudCBQcm9maWxlJywgYmFzZUNzc0NsYXNzTmFtZXMgKyAnLWFnZW50cHJvZmlsZScsIHNob3dBZ2VudFByb2ZpbGUpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignUmVmcmVzaCBUcmlwIFN1bW1hcnknLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctcmVmcmVzaHRyaXAnLCByZWZyZXNoVHJpcFN1bW1hcnkpLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbignQ3JlYXRlIG5vdGlmaWNhdGlvbicsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1jcmVhdGVOb3RpZmljYXRpb24nLCBjcmVhdGVOb3RpZmljYXRpb25Gb3JtKSxcbiAgICAgICAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ0hpZGUgbm90aWZpY2F0aW9ucycsIGJhc2VDc3NDbGFzc05hbWVzICsgJy1oaWRlTm90aWZpY2F0aW9uJywgaGlkZU5vdGlmaWNhdGlvbnMpLFxuICAgICAgICAgICAgc2VsZlJlbW92ZUJ0bixcbiAgICAgICAgICAgIG5ldyBSZWRBcHBTaWRlUGFuZWxCdXR0b24oJ09wZW4gQUJDIFNlYXRNYXAnLCBiYXNlQ3NzQ2xhc3NOYW1lcyArICctc2hvd1NlYXRNYXAnLCBzaG93U2VhdE1hcE1vZGFsKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygncmVkQXBwU2lkZVBhbmVsJywgY29uZmlnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7U3RvcmVEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL1N0b3JlRGF0YSc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZTogU3RvcmVEYXRhID0ge1xuICAgIHVybDogJ2h0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS90b2Rvcy8xJyxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGJvZHk6ICcnLFxuICAgIGhlYWRlcnM6ICd7fScsXG4gICAgcmVzcG9uc2U6ICcnXG59XG5cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0b3JlRGF0YSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ1NFVF9QQVJBTUVURVInOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBbYWN0aW9uLmZpZWxkXTogYWN0aW9uLm5ld1ZhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmUge1xuXG4gICAgcHVibGljIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcik7XG5cbiAgICBnZXREYXRhKCk6IFN0b3JlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0lDdXN0b21Xb3JrZmxvd30gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9pbnRlcmZhY2VzL0lDdXN0b21Xb3JrZmxvdyc7XG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JQXJlYVNlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuLyoqXG4gKiBTZXJ2aWNlIHVzZWQgd2l0aCBkZWNsYXJhdGl2ZSBjdXN0b20gd29ya2Zsb3cgaW4gbWFuaWZlc3QuanNvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbVdvcmtmbG93U2VydmljZSBleHRlbmRzIElDdXN0b21Xb3JrZmxvdyB7XG4gICAgc3RhdGljIFNFUlZJQ0VfTkFNRSA9ICdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlLUN1c3RvbVdvcmtmbG93U2VydmljZSc7XG5cbiAgICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlID0gZ2V0U2VydmljZShJQXJlYVNlcnZpY2UpO1xuICAgICAgICBhcmVhU2VydmljZS5zaG93QmFubmVyKCdJbmZvJywgJ0N1c3RvbSBXb3JrZmxvdyBTZXJ2aWNlIFN1Y2Nlc3MnKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCA9ICh0aXRsZTogc3RyaW5nLCBtc2c6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2ZsaWdodCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BBUkFHUkFQSCcsXG4gICAgICAgICAgICAgICAgdGV4dDogbXNnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDbG9zZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbn0iXX0= 