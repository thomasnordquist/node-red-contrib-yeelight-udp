"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var Yeelight = /** @class */ (function () {
    // socket: Socket
    function Yeelight(status) {
        this.lastSeen = new Date();
        this.info = status;
        this.address = { ip: status.location.hostname, port: parseInt(status.location.port, 10) };
    }
    Yeelight.prototype.updateState = function (status) {
        this.info = status;
    };
    Yeelight.prototype.setPower = function (on) {
        return __awaiter(this, void 0, void 0, function () {
            var packet;
            return __generator(this, function (_a) {
                packet = {
                    id: Math.round(Math.random() * 1000000),
                    method: 'set_power',
                    params: [on ? 'on' : 'off', "smooth", 500]
                };
                return [2 /*return*/, this.send(packet)];
            });
        });
    };
    Yeelight.prototype.setBrightness = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var packet;
            return __generator(this, function (_a) {
                packet = {
                    id: Math.round(Math.random() * 1000000),
                    method: 'set_bright',
                    params: [value, "smooth", 500]
                };
                return [2 /*return*/, this.send(packet)];
            });
        });
    };
    Yeelight.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var power;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        power = !this.info.power;
                        return [4 /*yield*/, this.setPower(power)];
                    case 1:
                        _a.sent();
                        this.info.power = power;
                        return [2 /*return*/];
                }
            });
        });
    };
    Yeelight.prototype.send = function (packet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var socket = new net_1.Socket();
            var buffer = Buffer.from(JSON.stringify(packet) + "\r\n");
            socket.on('connect', function () {
                socket.write(buffer);
                socket.end();
                resolve();
            });
            socket.on('error', function () {
                socket.end();
                reject();
            });
            socket.connect(_this.address.port, _this.address.ip);
        });
    };
    return Yeelight;
}());
exports.default = Yeelight;
