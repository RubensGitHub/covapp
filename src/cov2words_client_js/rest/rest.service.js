var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ConfigurationFactory } from '../core/configuration_factory.service';
import { ServiceError } from '../error_handling/service_error.type';
import { ServiceResponse } from './service_response.type';
var RestService = /** @class */ (function () {
    function RestService(httpClient, configurationFactory) {
        this.httpClient = httpClient;
        this.configurationFactory = configurationFactory;
        /**
         * Base path appended to base url for an
         * inheriting service instance. Should be
         * overwritten by inheriting service instance.
         *
         * @type {string} Base path
         */
        this.basePath = '';
        ////////
        this._getBaseUrl = this.getBaseUrl;
        this._post = this.post;
        // initially use default config
        this.configure(this.configurationFactory.getDefaultConfiguration());
    }
    ////////
    /**
     * Gets the current configuration.
     *
     * @deprecated
     * @returns {Configuration} Current configuration
     */
    RestService.prototype.getConfiguration = function () {
        return this.configuration;
    };
    /**
     * Returns the service instance's individual base url.
     * basePath needs to be set in inheriting class.
     *
     * @returns {string} Service instance's individual base url
     */
    RestService.prototype.getBaseUrl = function () {
        return this.configuration.getBaseUrl() + this.basePath;
    };
    /**
     * Sets the configuration.
     *
     * @param {Configuration} configuration Configuration to use
     */
    RestService.prototype.configure = function (configuration) {
        this.configuration = configuration;
        this.headers = this.configuration.RequestHeader;
    };
    /**
     * Performs an REST POST request.
     *
     * @param url API endpoint url
     * @param body HTTP body
     * @param additional Additional parameters
     * @returns {Promise<T extends ResponseModel | void>} Resolves on success, otherwise error
     */
    RestService.prototype.post = function (url, body, additional) {
        var _this = this;
        if (!additional) {
            additional = {
                'headers': this.headers
            };
        }
        return this
            .httpClient
            .post(url, body, additional)
            .toPromise()
            .then(function (res) { return _this.mapResponse(res); }, this.handleError);
    };
    RestService.prototype.mapResponse = function (response) {
        var res = new ServiceResponse(response);
        if (res.wasSuccessful()) {
            // Return only relevant data
            return res.getData();
        }
        else {
            // Throw client error that needs to be caught by higher-level services using .catch()
            throw res.getError();
        }
    };
    RestService.prototype.handleError = function (error) {
        // TODO handle HTTP Error
        // TODO handle other errors
        console.error('Handling error...');
        console.error(error);
        // Throw error that needss to be caught by higher-level services using .catch()
        // TODO replace by custom error type
        return Promise
            .reject(new ServiceError(-1, 'Unknown error.'));
    };
    ;
    RestService = __decorate([
        Injectable()
        /**
         * Base REST Service.
         */
        ,
        __metadata("design:paramtypes", [HttpClient,
            ConfigurationFactory])
    ], RestService);
    return RestService;
}());
export { RestService };
//# sourceMappingURL=rest.service.js.map