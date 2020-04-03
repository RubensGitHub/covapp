import {RequestModel} from '../rest/request.model';

export class WordPairRequest extends RequestModel {
    constructor(public language: string,
                public answer: string) {
        super()
    }

}
