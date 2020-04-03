var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// I am a "hacky" class that helps extend the core Error object in TypeScript. This
// class uses a combination of TypeScript and old-school JavaScript configurations.
var BaseError = /** @class */ (function () {
    function BaseError(message) {
        this.name = 'BaseError';
        // CAUTION: This doesn't appear to work in IE, but does work in Edge. In
        // IE, it shows up as undefined.
        this.stack = (new Error(message)).stack;
    }
    return BaseError;
}());
export { BaseError };
// CAUTION: Instead of using the "extends" on the Class, we're going to explicitly
// define the prototype as extending the Error object.
BaseError.prototype = Object.create(Error.prototype);
/**
 * Represents an error that occured while calling an API endpoint.
 */
var ServiceError = /** @class */ (function (_super) {
    __extends(ServiceError, _super);
    function ServiceError(errorCode, errorMessage) {
        var _this = _super.call(this, errorMessage) || this;
        _this.errorCode = errorCode;
        _this.errorMessage = errorMessage;
        return _this;
    }
    ////////
    ServiceError.prototype.getCode = function () {
        return this.errorCode;
    };
    ServiceError.prototype.getMessage = function () {
        return this.errorMessage;
    };
    return ServiceError;
}(BaseError));
export { ServiceError };
//# sourceMappingURL=service_error.type.js.map