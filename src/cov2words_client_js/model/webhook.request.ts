import {RequestModel} from '../rest/request.model';

export class WebhookRequest extends RequestModel {

constructor (public hash: string,
public currency: number,
public target: string) { super() }

}
