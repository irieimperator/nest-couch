"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.NestCouchModule = void 0;
var common_1 = require("@nestjs/common");
var nest_couch_service_1 = require("./nest-couch.service");
var constants_1 = require("./constants");
var nest_couch_providers_1 = require("./nest-couch.providers");
var nest_couch_connection_provider_1 = require("./nest-couch-connection.provider");
var NestCouchModule = /** @class */ (function () {
    function NestCouchModule() {
    }
    NestCouchModule_1 = NestCouchModule;
    NestCouchModule.register = function (options) {
        return {
            module: NestCouchModule_1,
            providers: nest_couch_providers_1.createNestCouchProviders(options)
        };
    };
    NestCouchModule.registerAsync = function (options) {
        return {
            module: NestCouchModule_1,
            providers: __spreadArrays(this.createProviders(options))
        };
    };
    NestCouchModule.createProviders = function (options) {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }
        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    };
    NestCouchModule.createOptionsProvider = function (options) {
        var _this = this;
        if (options.useFactory) {
            return {
                provide: constants_1.NEST_COUCH_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: constants_1.NEST_COUCH_OPTIONS,
            useFactory: function (optionsFactory) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, optionsFactory.createNestCouchOptions()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
            inject: [options.useExisting || options.useClass]
        };
    };
    var NestCouchModule_1;
    NestCouchModule = NestCouchModule_1 = __decorate([
        common_1.Global(),
        common_1.Module({
            providers: [nest_couch_service_1.NestCouchService, nest_couch_connection_provider_1.connectionFactory],
            exports: [nest_couch_service_1.NestCouchService, nest_couch_connection_provider_1.connectionFactory]
        })
    ], NestCouchModule);
    return NestCouchModule;
}());
exports.NestCouchModule = NestCouchModule;
