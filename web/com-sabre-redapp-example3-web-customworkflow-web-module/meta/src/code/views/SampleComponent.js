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
