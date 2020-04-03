import {HttpResponse} from '@angular/common/http';
import {ServiceError} from '../error_handling/service_error.type';
import {ResponseModel} from './response.model';
import {RestDownload} from './rest_download.type';

export class ServiceResponse<T extends ResponseModel | void> {

    private readonly data: any;
    private readonly errorCode: number = 0;
    private readonly errorMessage: string = null;
    private readonly errorId: string = null;
    private readonly download: any;
    private readonly isDownload: boolean;

    constructor(response: any) {
        if (response instanceof HttpResponse) {
            const fileName = ServiceResponse.getFileNameFromResponseContentDisposition(response);
            this.download = new RestDownload(fileName, response.body);
            this.isDownload = true;
        } else {
            this.data = response.data;
            this.errorCode = response.error_code;
            this.errorMessage = response.error_message;
            this.errorId = response.error_id;
            this.isDownload = false;
        }
    }

    public wasSuccessful() {
        return this.errorCode === 0 && this.errorMessage === null;
    }

    public getData(): T {
        return this.isDownload ? <T>this.download : <T>this.data;
    }

    /**
     * Gets an error instance.
     */
    public getError(): ServiceError {
        return new ServiceError(this.errorCode, this.errorMessage);
    }

    /**
     * Derives file name from the http response
     * by looking inside content-disposition
     * @param res http Response
     * @todo refactor:move somewhere else
     */
    private static getFileNameFromResponseContentDisposition = (res: HttpResponse<any>) => {
        const contentDisposition = res.headers.get('content-disposition') || '';
        const matches = /filename=([^;]+)/ig.exec(contentDisposition);
        const fileName = (matches[1] || 'untitled').trim();
        return fileName;
    };

}
