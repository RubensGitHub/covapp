import {RequestModel} from '../rest/request.model';

export class CombinationsResponse extends RequestModel {
    constructor(public combinations: number) {
        super()
    }
}
