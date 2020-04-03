import {BaseError} from './service_error.type';

export class NotImplementedError extends BaseError {

  constructor () {
    super ('Functionality not implemented.');
    // Set the prototype explicitly.
    Object.setPrototypeOf (this, NotImplementedError.prototype);
  }

}
