import {RequestModel} from '../rest/request.model';

export class LanguageResponse extends RequestModel {
    constructor(public languages: string[]) {
        super()
    }
}
