import {CONTEXT} from './context.type';
import {RestService} from "./rest.service";
import {ResponseModel} from "./response.model";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

/**
 * Base REST implementation that should be inherited by actual service implementations.
 * Functions as a bridge between RestService and actual implementations as directly extending RestService would yield multiple instances and thus yield configuration problems.
 */
@Injectable()
export class RestServiceImplementation {

    protected basePath = '';

    ////////

    constructor(private restService: RestService) {
    }

    ////////

    /**
     * Returns the service instance's individual base url.
     * basePath needs to be set in inheriting class.
     *
     * @returns {string} Service instance's individual base url
     */
    protected getBaseUrl(): string {
        return this.restService.getBaseUrl() + this.basePath;
    }

    /**
     * Performs a REST POST request.
     *
     * @param {CONTEXT} context API key context to use
     * @param {string} url API endpoint url
     * @param body HTTP body
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional parameters
     * @returns {Promise<T extends ResponseModel | void>} Resolves on success, otherwise error
     */
    protected postContextualized<T extends ResponseModel | void>(url, body, params?: HttpParams, additional?): Promise<T> {
        return this.restService.postContextualized(url, body, params, additional);
    }

    /**
     * Performs a REST GET request.
     *
     * @param {CONTEXT} context API key context to use
     * @param {string} url API endpoint url
     * @param {HttpParams} params Path variables and query parameters. For the former, ensure to have a {variable_name} path segment in the url.
     * @param additional Additional things
     */
    public getContextualized<T extends ResponseModel | void>(url: string, params?: HttpParams, additional?): Promise<T> {
        return this.restService.getContextualized(url, params, additional);
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
    protected post<T extends ResponseModel | void>(url, body, params?: HttpParams, additional?): Promise<T> {
        return this.restService.post(url, body, params, additional);
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
        return this.restService.get(url, params, additional);
    }

}
