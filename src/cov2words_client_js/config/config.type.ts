/**
 * Represents an (web) app configuration.
 */
import {HttpHeaders} from '@angular/common/http';

export class Configuration {

    private readonly _apiBaseUrl: string = '<NOT_SET>';
    private _requestHeader: HttpHeaders = null;
    private readonly _requestFormat = 'application/json';

    ////////

    constructor(apiBaseUrl: string) {
        this._apiBaseUrl = apiBaseUrl;
    }

    ////////

    /**
     * Sets the API key to be used for building REST request headers.
     *
     * @param {string} apiKey API key to use
     */
    public setHeaders(): void {
        this._requestHeader = new HttpHeaders({
            'Content-Type': this._requestFormat,
            'Accept': this._requestFormat
        });
    }

    /**
     * Gets base url.
     *
     * @returns {string} Base url
     */
    public getBaseUrl(): string {
        return this._apiBaseUrl;
    }

    /**
     * Gets HTTP headers.
     *
     * @returns {HttpHeaders} HTTP Headers
     */
    public getHeaders(): HttpHeaders {
        return this._requestHeader;
    }

}
