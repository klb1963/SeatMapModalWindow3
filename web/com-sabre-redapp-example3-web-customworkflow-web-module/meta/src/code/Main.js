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
var SeatMapAvailView_1 = require("./components/abc-seatmap/widgets/SeatMapAvailView"); // ✅ модальное окно, открываемое по клику на TileWidget
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var DrawerService_1 = require("sabre-ngv-app/app/services/impl/DrawerService");
var LargeWidgetDrawerConfig_1 = require("sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig");
var Tile_1 = require("sabre-ngv-app/app/widgets/drawer/views/elements/Tile");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var SeatMapComponent_1 = require("./components/abc-seatmap/SeatMapComponent");
var quicketConfig_1 = require("./components/abc-seatmap/quicketConfig");
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
        this.registerSeatMapShoppingTile(); // 👈 add Shopping TileWidget
        this.registerSeatMapShoppingWidget(); // 👈 add Shopping Widget (открывает карту)
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
    Main.prototype.registerSeatMapShoppingTile = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService);
        // Создаём функцию для отображения модального окна
        var showSeatMapShoppingModal = function (segment) {
            var _a;
            console.log('🟢 [Modal] Segment passed to modal:', segment);
            var data = {
                flightSegments: [segment],
                dateOfFlight: (_a = segment.getDepartureDate()) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0]
            };
            console.log('📦 [Modal] Data for SeatMapComponent:', data);
            var modalOptions = {
                header: '🛋️ ABC SeatMap (Shopping)',
                component: React.createElement(SeatMapComponent_1.default, {
                    config: quicketConfig_1.quicketConfig,
                    data: data
                }),
                modalClassName: 'react-tile-modal-class',
                onHide: function () { return console.log('[🛬 SeatMap Shopping Modal Closed]'); }
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        // Регистрируем плитку и указываем обработчик клика
        var shoppingTileConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.selfDrawerContextModelPropagated = function (segment) {
                this.setDataContent("<button class=\"btn btn-primary\">\uD83D\uDC40 Show SeatMap</button>");
            };
            class_1.prototype.onClick = function () {
                console.log('🟢 [Tile Click] SeatMap clicked');
                var segment = this.getModel();
                console.log('📦 [Tile Click] Segment:', segment);
                showSeatMapShoppingModal(this.getModel());
            };
            return class_1;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_2, _super);
            // View необязателен, можно передать пустую заглушку
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_2;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Viewer' });
        drawerService.addConfig(['shopping-flight-segment'], shoppingTileConfig);
    };
    Main.prototype.registerSeatMapShoppingWidget = function () {
        var drawerService = (0, Context_1.getService)(DrawerService_1.DrawerService);
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
                this.setDataContent("<button class=\"btn btn-outline-primary\"> \uD83D\uDECB\uFE0F Open SeatMap Viewer</button>");
            };
            class_3.prototype.onClick = function () {
                console.log('🟢 [Tile Click] SeatMap clicked');
                var segment = this.getModel();
                console.log('📦 [Tile Click] Segment:', segment);
                showSeatMapShoppingModal(segment);
            };
            return class_3;
        }(Tile_1.Tile)), /** @class */ (function (_super) {
            __extends(class_4, _super);
            function class_4() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_4;
        }(AbstractView_1.AbstractView)), { title: 'SeatMap Shopping Viewer' });
        drawerService.addConfig(['shopping-flight-segment'], shoppingWidgetTileConfig);
    };
    return Main;
}(Module_1.Module));
exports.Main = Main;
