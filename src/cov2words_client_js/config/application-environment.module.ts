import {NgModule} from '@angular/core';
import {ApplicationEnvironment} from './application-environment.service';

/**
 * Implements environment logic.
 *
 * Should not have any dependencies!
 */
@NgModule ({
  providers: [
    ApplicationEnvironment
  ]
})
export class ApplicationEnvironmentModule {}
