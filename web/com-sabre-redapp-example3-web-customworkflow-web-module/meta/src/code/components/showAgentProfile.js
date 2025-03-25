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
