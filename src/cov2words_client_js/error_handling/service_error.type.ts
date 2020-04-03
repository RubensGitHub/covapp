
// I am a "hacky" class that helps extend the core Error object in TypeScript. This
// class uses a combination of TypeScript and old-school JavaScript configurations.
export class BaseError extends Error {

  constructor (public readonly message: string, private readonly inner: Error = null) {
    super ();
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = 'BaseError';
    // CAUTION: This doesn't appear to work in IE, but does work in Edge. In
    // IE, it shows up as undefined.
    this.stack = (new Error (message)).stack;
  }

  ////////

  public getMessage (): string {
    return this.message;
  }

  public getInner (): Error {
    return this.inner instanceof Error ? this.inner : null;
  }

}

/**
 * Represents an error that occured while calling an API endpoint.
 */
export class ServiceError extends BaseError {

  constructor (public readonly errorCode: number,
               public readonly errorMessage: string,
               inner: Error = null) {
    super (errorMessage, inner);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  ////////

  getCode (): number {
    return this.errorCode;
  }

}

