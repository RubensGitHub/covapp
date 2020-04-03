/**
 * Represents an Cov2Words API response.
 */
var ResponseModel = /** @class */ (function () {
    function ResponseModel(response) {
        var keys = Object.keys(response);
        for (var i = 0; i < keys.length; ++i) {
            var k = keys[i];
            console.log(k);
            // TODO if k not exists on
            if (response.hasOwnProperty(k) !== true) {
                throw new Error('Object does not define property "' + k + '".');
            }
            this[k] = response[k];
        }
    }
    return ResponseModel;
}());
export { ResponseModel };
//# sourceMappingURL=response.model.js.map