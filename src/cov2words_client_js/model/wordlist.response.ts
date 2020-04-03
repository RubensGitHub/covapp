import {RequestModel} from '../rest/request.model';

export class WordListResponse extends RequestModel {
    constructor(public words: string[],
                public combinations: number,
                public language: string) {
        super()
    }
}
