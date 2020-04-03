/**
 * Represents an Cov2Words API response.
 */
export class ResponseModel {

    constructor(response: any) {
        const keys = Object.keys(response);
        for (let i = 0; i < keys.length; ++i) {
            const k = keys[i];
            // TODO if k not exists on
            if (response.hasOwnProperty(k) !== true) {
                throw new Error('Object does not define property "' + k + '".');
            }
            this[k] = response[k];
        }

    }

}
