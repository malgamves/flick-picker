"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.importMediaFiles = void 0;
var weaviate_ts_client_1 = require("weaviate-ts-client");
var client_1 = require("./client");
var util_1 = require("./util");
// const sourceImages = 'source/input_images/';
// const sourceAudio = 'source/audio/';
// const sourceVideo = 'source/video/';
var sourceBase = 'public';
var sourceImages = sourceBase + '/image/';
var sourceAudio = sourceBase + '/audio/';
var sourceVideo = sourceBase + '/video/';
var client = (0, client_1.getWeaviateClient)();
var importMediaFiles = function (collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, insertImages(collectionName)];
            case 1:
                _a.sent();
                return [4 /*yield*/, insertAudio(collectionName)];
            case 2:
                _a.sent();
                return [4 /*yield*/, insertVideo(collectionName)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.importMediaFiles = importMediaFiles;
var insertImages = function (collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    var batcher, counter, batchSize, files, _i, files_1, file, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                batcher = client.batch.objectsBatcher();
                counter = 0;
                batchSize = 20;
                files = (0, util_1.listFiles)(sourceImages);
                console.log("Importing ".concat(files.length, " images."));
                _i = 0, files_1 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 4];
                file = files_1[_i];
                item = {
                    name: file.name,
                    image: (0, util_1.getBase64)(file.path),
                    media: 'image'
                };
                console.log("Adding [".concat(item.media, "]: ").concat(item.name));
                batcher = batcher.withObject({
                    class: collectionName,
                    properties: item,
                    id: (0, weaviate_ts_client_1.generateUuid5)(file.name)
                });
                if (!(++counter == batchSize)) return [3 /*break*/, 3];
                console.log("Flushing ".concat(counter, " items."));
                // flush the batch queue
                return [4 /*yield*/, batcher.do()];
            case 2:
                // flush the batch queue
                _a.sent();
                // restart the batch queue
                counter = 0;
                batcher = client.batch.objectsBatcher();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!(counter > 0)) return [3 /*break*/, 6];
                console.log("Flushing remaining ".concat(counter, " item(s)."));
                return [4 /*yield*/, batcher.do()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var insertAudio = function (collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    var batcher, counter, batchSize, files, _i, files_2, file, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                batcher = client.batch.objectsBatcher();
                counter = 0;
                batchSize = 3;
                files = (0, util_1.listFiles)(sourceAudio);
                console.log("Importing ".concat(files.length, " audio files."));
                _i = 0, files_2 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_2.length)) return [3 /*break*/, 4];
                file = files_2[_i];
                item = {
                    name: file.name,
                    audio: (0, util_1.getBase64)(file.path),
                    media: 'audio'
                };
                console.log("Adding [".concat(item.media, "]: ").concat(item.name));
                batcher = batcher.withObject({
                    class: collectionName,
                    properties: item,
                    id: (0, weaviate_ts_client_1.generateUuid5)(file.name)
                });
                if (!(++counter == batchSize)) return [3 /*break*/, 3];
                console.log("Flushing ".concat(counter, " items."));
                // flush the batch queue
                return [4 /*yield*/, batcher.do()];
            case 2:
                // flush the batch queue
                _a.sent();
                // restart the batch queue
                counter = 0;
                batcher = client.batch.objectsBatcher();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!(counter > 0)) return [3 /*break*/, 6];
                console.log("Flushing remaining ".concat(counter, " item(s)."));
                return [4 /*yield*/, batcher.do()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var insertVideo = function (collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    var batcher, counter, batchSize, files, _i, files_3, file, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                batcher = client.batch.objectsBatcher();
                counter = 0;
                batchSize = 1;
                files = (0, util_1.listFiles)(sourceVideo);
                console.log("Importing ".concat(files.length, " video files."));
                _i = 0, files_3 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_3.length)) return [3 /*break*/, 4];
                file = files_3[_i];
                item = {
                    name: file.name,
                    video: (0, util_1.getBase64)(file.path),
                    media: 'video'
                };
                console.log("Adding [".concat(item.media, "]: ").concat(item.name));
                batcher = batcher.withObject({
                    class: collectionName,
                    properties: item,
                    id: (0, weaviate_ts_client_1.generateUuid5)(file.name)
                });
                if (!(++counter == batchSize)) return [3 /*break*/, 3];
                console.log("Flushing ".concat(counter, " items."));
                // flush the batch queue
                return [4 /*yield*/, batcher.do()];
            case 2:
                // flush the batch queue
                _a.sent();
                // restart the batch queue
                counter = 0;
                batcher = client.batch.objectsBatcher();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!(counter > 0)) return [3 /*break*/, 6];
                console.log("Flushing remaining ".concat(counter, " item(s)."));
                return [4 /*yield*/, batcher.do()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
