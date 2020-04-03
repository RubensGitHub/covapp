import {RequestModel} from '../rest/request.model';

export class WordListRequest extends RequestModel {
    constructor(public language: string) {
        super()
    }
}
