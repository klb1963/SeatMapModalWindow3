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
