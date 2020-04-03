import {RequestModel} from '../rest/request.model';
import {WordRequest} from "./word.request";

export class AnswerRequest extends RequestModel {
    constructor(public language: string,
                public words: Array<WordRequest>) {
        super()
    }
}
