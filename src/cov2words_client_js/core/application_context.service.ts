import {Injectable} from '@angular/core';
import {CONTEXT} from '../rest/context.type';
import {Configuration} from '../config/config.type';
import {ApplicationEnvironment} from '../config/application-environment.service';

/**
 * Active application context.
 */
@Injectable ()
export class ApplicationContext {

  private _configuration: Configuration;
  private _activeContext: CONTEXT;

  ////////

  constructor (private configurationFactory: ApplicationEnvironment) {
    this._configuration = this.configurationFactory.getSystemConfiguration ();
    this.setContext (CONTEXT.SYSTEM);
  }

  ////////

  /**
   * Gets current configuration.
   */
  public getConfiguration (): Configuration {
    return this._configuration;
  }

  /**
   * Sets current context
   *
   * @param {CONTEXT} context Context to set
   */
  public setContext (context: CONTEXT): void {
    this._activeContext = context;
    this._configuration = context == CONTEXT.SYSTEM
                         ? this.configurationFactory.getSystemConfiguration ()
                         : this.configurationFactory.getEnterpriseConfiguration ();
  }

  /**
   * Gets current context.
   */
  public getContext (): CONTEXT {
    return this._activeContext;
  }

}
