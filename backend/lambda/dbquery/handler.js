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
exports.handler = void 0;
var client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
var pg_1 = require("pg");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var secretsManagerClient, secretArn, getSecretValueCommand, secretValue, secretString, secret, pool, sqlQuery, rows, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                secretsManagerClient = new client_secrets_manager_1.SecretsManagerClient({ region: 'eu-west-1' });
                secretArn = process.env.DB_SECRET_ARN;
                if (!secretArn) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: JSON.stringify({ error: 'DB_SECRET_ARN environment variable not set' }),
                        }];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                getSecretValueCommand = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretArn });
                return [4 /*yield*/, secretsManagerClient.send(getSecretValueCommand)];
            case 2:
                secretValue = _a.sent();
                secretString = secretValue.SecretString;
                if (!secretString) {
                    return [2 /*return*/, {
                            statusCode: 500,
                            body: JSON.stringify({ error: 'Secret string is nil' }),
                        }];
                }
                secret = JSON.parse(secretString);
                pool = new pg_1.Pool({
                    host: secret.host,
                    user: secret.username,
                    password: secret.password,
                    database: secret.dbname,
                    port: secret.port,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                });
                sqlQuery = event.sqlQueryString;
                if (!sqlQuery) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: JSON.stringify({ error: 'No SQL query provided in the query string' }),
                        }];
                }
                return [4 /*yield*/, pool.query(sqlQuery)];
            case 3:
                rows = (_a.sent()).rows;
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify({ data: rows }),
                    }];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        statusCode: 500,
                        body: JSON.stringify({ error: "Database or AWS Secrets Manager error: ".concat(error_1.message) }),
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
