import {Configuration} from './config.type';

/**
 * Mocks application environment.
 */
import {IApplicationEnvironment} from './application-environment.interface';

export class ApplicationEnvironmentMock implements IApplicationEnvironment {

  public getEnterpriseConfiguration (): Configuration {
    return undefined;
  }

  public get environmentConfiguration (): string {
    return "FOO";
  }

  public get monitoringDebounceInterval (): number {
    return 0;
  }

  public getSystemConfiguration (): Configuration {
    return undefined;
  }

  public get environmentVersion (): string {
    return "rfe646s";
  }

  public get recaptchaApiKey (): string {
    return "fofofof";
  }

  public get activeCurrencyIds (): number[] {
    return [];
  }

  public get isProduction (): boolean {
    return false;
  }

  public get navStackItems (): any {
    return {};
  }

  public get appId (): string {
    return "WEB_APP";
  }

}
