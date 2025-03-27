"use strict";
// src/components/abc-seatmap/widgets/SeatMapShoppingView.tsx
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
var React = require("react");
var SeatMapComponent_1 = require("./SeatMapComponent");
var SeatMapShoppingView = function (props) {
    console.log('[SeatMapShoppingView] received props:', props);
    return React.createElement(SeatMapComponent_1.default, __assign({}, props));
};
exports.default = SeatMapShoppingView;
