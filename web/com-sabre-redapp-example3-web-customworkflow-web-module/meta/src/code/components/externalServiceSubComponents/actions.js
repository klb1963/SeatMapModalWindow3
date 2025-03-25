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
