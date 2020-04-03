import {RequestModel} from '../rest/request.model';

export class WordRequest extends RequestModel {
    constructor(public word: string,
                public order: number) {
        super()
    }

}
