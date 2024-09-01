"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.checkLevel = exports.logLevels = exports.LogLevel = void 0;
var chalk_1 = require("chalk");
var R = require("ramda");
var types_d_js_1 = require("./types.d.js");
var types_d_js_2 = require("./types.d.js");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return types_d_js_2.LogLevel; } });
var format_1 = require("date-fns/format");
exports.logLevels = (_a = {},
    _a[types_d_js_1.LogLevel.debug] = { filter: 0, setColor: chalk_1.default.cyan, setBackgroundColor: chalk_1.default.bgCyan, key: types_d_js_1.LogLevel.debug },
    _a[types_d_js_1.LogLevel.info] = { filter: 1, setColor: chalk_1.default.white, setBackgroundColor: chalk_1.default.bgWhite, key: types_d_js_1.LogLevel.info },
    _a[types_d_js_1.LogLevel.warn] = { filter: 2, setColor: chalk_1.default.yellow, setBackgroundColor: chalk_1.default.bgYellow, key: types_d_js_1.LogLevel.warn },
    _a[types_d_js_1.LogLevel.error] = { filter: 3, setColor: chalk_1.default.red, setBackgroundColor: chalk_1.default.bgRed, key: types_d_js_1.LogLevel.error },
    _a);
var checkLevel = function (currentLevel, level) {
    return exports.logLevels[level].filter >= exports.logLevels[currentLevel].filter;
};
exports.checkLevel = checkLevel;
var createLogger = function (context, currentLevel) {
    return R.pipe(R.keys, R.map(function (key) {
        var _a;
        var _b = exports.logLevels[key], setColor = _b.setColor, setBackgroundColor = _b.setBackgroundColor;
        return _a = {},
            _a[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if ((0, exports.checkLevel)(currentLevel, key))
                    console[key].apply(console, __spreadArray([setColor((0, format_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')),
                        setColor("| ".concat(context)),
                        '\t'], R.map(function (arg) { return setColor(arg); }, args), false));
            },
            _a;
    }), R.mergeAll, R.assoc('context', context))(exports.logLevels);
};
exports.createLogger = createLogger;
