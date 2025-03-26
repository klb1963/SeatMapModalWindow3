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
