import {ResponseModel} from '../rest/response.model';

export class WebhookInformationResponse extends ResponseModel {

public currency: number;
public hash: string;
public executed: boolean;
public tries: number;
public success: boolean;

}
