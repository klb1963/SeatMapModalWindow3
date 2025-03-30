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
