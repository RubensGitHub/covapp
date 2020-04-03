import { ServiceError } from '../error_handling/service_error.type';
var ServiceResponse = /** @class */ (function () {
    function ServiceResponse(response) {
        this.data = response;
        this.errorCode = response.error_code;
        this.errorMessage = response.error_message;
    }
    ServiceResponse.prototype.wasSuccessful = function () {
        return this.errorCode === 0 && this.errorMessage === null;
    };
    ServiceResponse.prototype.getData = function () {
        return this.data;
    };
    /**
     * Gets an error instance.
     */
    ServiceResponse.prototype.getError = function () {
        return new ServiceError(this.errorCode, this.errorMessage);
    };
    return ServiceResponse;
}());
export { ServiceResponse };
//# sourceMappingURL=service_response.type.js.map