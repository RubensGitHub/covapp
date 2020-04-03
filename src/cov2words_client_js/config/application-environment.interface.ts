import {Configuration} from './config.type';

/**
 * Interface for the application environment.
 *
 * Needs to be implemented by a project-specific configuration factory.
 */
export interface IApplicationEnvironment {

    /**
     * Gets the app configuration using a system context (using system key for REST requests).
     *
     * @return {Configuration} System context configuration
     */
    getSystemConfiguration(): Configuration;

    /**
     * Gets the app configuration using an enterprise context (using enterprise key for REST
     * requests).
     *
     * @return {Configuration} Enterprise context configuration
     */
    getEnterpriseConfiguration(): Configuration;

    /**
     * The application ID.
     */
    appId: string;

    /**
     * Debounce time interval in seconds after which the same subsequent error is monitored again.
     */
    monitoringDebounceInterval: number;

    /**
     * Environment the app was build for (dev/prod).
     */
    environmentConfiguration: string;

    /**
     * App build version.
     */
    environmentVersion: string;

    /**
     * API key for using reCAPTCHA.
     */
    recaptchaApiKey: string;

    /**
     * IDs of all active currencies.
     */
    activeCurrencyIds: number[];

    /**
     * Whether the environment is a production environment.
     */
    isProduction: boolean;

    /**
     * NavStack items to display in top menu bar.
     */
    navStackItems: any;

}
