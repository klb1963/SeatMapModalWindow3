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
