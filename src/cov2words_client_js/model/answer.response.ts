import {RequestModel} from '../rest/request.model';

export class AnswerResponse extends RequestModel {
    constructor(public answer: string,
                public answer_hash: string,
                public source: string,
                public is_proof_available: boolean
    ) {
        super()
    }
}
