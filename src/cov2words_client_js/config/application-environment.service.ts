import {Injectable} from '@angular/core';
import {NotImplementedError} from '../error_handling/not_implemented_error.type';
import {IApplicationEnvironment} from './application-environment.interface';
import {Configuration} from './config.type';

/**
 * Represents the environment the application is running in.
 *
 * A project-specific override has to be activated via the main app module, e.g.
 *   {provide: ApplicationEnvironment useClass: WebEnvironment}
 */
@Injectable ({
  providedIn: 'root'
})
export class ApplicationEnvironment implements IApplicationEnvironment {

  public getSystemConfiguration (): Configuration {
    throw new NotImplementedError ();
  }

  public getEnterpriseConfiguration (): Configuration {
    throw new NotImplementedError ();
  }

  public get monitoringDebounceInterval (): number {
    throw new NotImplementedError ();
  }

  public get environmentConfiguration (): string {
    throw new NotImplementedError ();
  }

  public get environmentVersion (): string {
    throw new NotImplementedError ();
  }

  public get recaptchaApiKey (): string {
    throw new NotImplementedError ();
  }

  public get activeCurrencyIds (): number[] {
    throw new NotImplementedError ();
  }

  public get isProduction (): boolean {
    throw new NotImplementedError ();
  }

  public get navStackItems (): any {
    throw new NotImplementedError ();
  }

  public get appId (): string {
    throw new NotImplementedError ();
  }

}
