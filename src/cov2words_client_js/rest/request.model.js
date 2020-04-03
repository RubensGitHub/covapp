/**
 * Represents an Cov2Words API request.
 */
var RequestModel = /** @class */ (function () {
    function RequestModel() {
    }
    RequestModel.prototype.toBody = function () {
        return JSON
            .stringify(this);
    };
    return RequestModel;
}());
export { RequestModel };
//# sourceMappingURL=request.model.js.map