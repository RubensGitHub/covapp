import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {ApplicationContext} from '../core/application_context.service';

import {Configuration} from '../config/config.type';
import {ServiceError} from '../error_handling/service_error.type';
import {CONTEXT} from './context.type';
import {RequestModel} from './request.model';
import {ResponseModel} from './response.model';
import {ServiceResponse} from './service_response.type';

/**
 * Base REST Service.
 *
 * Ensure this one is only imported once as a module provider throughout the project to avoid multiple instances.
 */
@Injectable()
export class RestService {

    private configuration: Configuration;

    /**
     * Base path appended to base url for an
     * inheriting service instance. Should be
     * overwritten by inheriting service instance.
     *
     * @type {string} Base path
     */
    protected basePath = '';

    ////////

    constructor(private httpClient: HttpClient,
                private applicationContext: ApplicationContext) {
        this.setContext(this.applicationContext.getContext());
    }

    ////////

    /**
     * Sets operating API key context (SYSTEM/ENTERPRISE).
     *
     * @deprecated Handled automatically
     * @param context Context to use
     */
    public setContext(context: CONTEXT) {
        this.applicationContext.setContext(context);
        this.configure(this.applicationContext.getConfiguration());
    }

    /**
     * Returns the configuration base url.
     *
     * @returns {string} Configuration base url.
     */
    public getBaseUrl() {
        return this.configuration.getBaseUrl();
    }

    /**
     * Sets the configuration.
     *
     * @param {Configuration} configuration Configuration to use
     */
    public configure(configuration: Configuration) {
        this.configuration = configuration;
    }

    /**
     * Performs a REST POST request.
     *
     * @deprecated Use context-switching-enabled postContextualized()
     * @param {string} url API endpoint url
     * @param body HTTP body
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional parameters
     * @returns {Promise<T extends ResponseModel | void>} Resolves on success, otherwise error
     */
    public post<T extends ResponseModel | void>(url: string, body: RequestModel, params?: HttpParams, additional?): Promise<T> {
        return this
            .httpClient
            .post(url, body, this.buildOptions(additional, params))
            .toPromise()
            .then((res) => RestService.mapResponse<T>(res), RestService.handleError);
    }

    /**
     * Performs a REST GET request.
     *
     * @deprecated Use context-switching-enabled getContextualized()
     * @param {string} url API endpoint url
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional things
     */
    public get<T extends ResponseModel | void>(url: string, params?: HttpParams, additional?): Promise<T> {
        return this
            .httpClient
            .get(url, this.buildOptions(additional, params))
            .toPromise()
            .then((res) => RestService.mapResponse<T>(res), RestService.handleError);
    }

    /**
     * Performs a REST POST request.
     *
     * @param {string} url API endpoint url
     * @param body HTTP body
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional parameters
     * @returns {Promise<T extends ResponseModel | void>} Resolves on success, otherwise error
     */
    public postContextualized<T extends ResponseModel | void>(url: string, body: RequestModel, params?: HttpParams, additional?): Promise<T> {
        return this
            .httpClient
            .post(url, body, this.buildOptions(additional, params))
            .toPromise()
            .then((res) => RestService.mapResponse<T>(res), RestService.handleError);
    }

    public getContextualizedRaw<T extends ResponseModel | void>(url: string, params?: HttpParams, additional?): Promise<T> {
        return this
            .httpClient
            .get(url, this.buildOptions(additional, params))
            .toPromise()
            .then((res) => <T>(res), RestService.handleError);
    }

    /**
     * Performs a REST GET request.
     *
     * @param {string} url API endpoint url
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional things
     */
    public getContextualized<T extends ResponseModel | void>(url: string, params?: HttpParams, additional?): Promise<T> {
        return this
            .httpClient
            .get(url, this.buildOptions(additional, params))
            .toPromise()
            .then((res) => RestService.mapResponse<T>(res), RestService.handleError);
    }

    private buildOptions(additional, params?: HttpParams) {
        let options = {
            'headers': this.configuration.getHeaders()
        };
        if (additional) {
            const keys = Object.keys(additional);
            // merge default and additional options
            // we can't simply Object.assign() as nested properties are not merged but overwritten
            for (let k of keys) {
                if (typeof (options[k]) !== 'object') {
                    options[k] = additional[k];
                } else {
                    options[k] = Object.assign({}, options[k], additional[k]);
                }
            }
        }
        if (params) {
            options['params'] = params;
        }
        options['headers'] = options['headers'];
        return options;
    }

    protected static mapResponse<T extends ResponseModel | void>(response: any): T {
        let res = new ServiceResponse<T>(response);
        if (res.wasSuccessful()) {
            // Return only relevant data
            return res.getData();
        } else {
            // Throw client error that needs to be caught by higher-level services using .catch()
            throw res.getError();
        }
    }

    protected static handleError(error: any) {
        // TODO handle HTTP Error
        // TODO handle other errors
        console.error('Handling error...');
        console.error(error);
        // Throw error that needss to be caught by higher-level services using .catch()
        // TODO replace by custom error type
        return Promise
            .reject(new ServiceError(-1, 'Unknown error.'));
    };

    ////////

    public _getBaseUrl = this.getBaseUrl;
    public _post = this.post;
}
