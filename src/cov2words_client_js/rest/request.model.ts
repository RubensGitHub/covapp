/**
 * Represents an Cov2Words API request.
 */
export abstract class RequestModel {

  /**
   * Converts the actual class instance to a JSON string, e.g. to use in a REST request.
   *
   * @return {string} JSON string representation of the instance
   */
  public toBody (): string {
    return JSON.stringify (this);
  }

  /**
   * Creates a class instance from a JSON string.
   * Beware that this doesn't correctly map typed properties, e.g. arrays, to their TypeScript
   * types.
   *
   * @see https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class
   * @see https://stackoverflow.com/questions/29758765/json-to-typescript-class-instance
   * @see http://choly.ca/post/typescript-json/
   * @param {string} json JSON string to create instance from
   * @param {Constructor<M>} type Class to create an instance of
   * @return {RequestModel} Instance
   */
  public static fromJSON<T extends RequestModel> (json: string, type: Constructor<T>): T {
    let instance = new type ();
    let jsonObj = JSON.parse (json);
    const keys = Object.keys (jsonObj);
    for (let i = 0; i < keys.length; ++i) {
      const k = keys[i];
      instance[k] = jsonObj[k];
    }
    return instance;
  }

}

/**
 * Encapsulation of TypeScript type constructor.
 */
interface Constructor<M> {
  new (...args: any[]): M
}
