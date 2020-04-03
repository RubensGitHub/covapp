import {RequestModel} from '../rest/request.model';
import {WordRequest} from "./word.request";
import {AnswerResponse} from "./answer.response";

export class WordPairResponse extends RequestModel {
    constructor(public language: string,
                public answer: string,
                public words: Array<WordRequest>,
                public answer_detail: AnswerResponse) {
        super()
    }
}
