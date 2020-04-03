import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {ApplicationEnvironment} from './config/application-environment.service';
import {ApplicationContext} from './core/application_context.service';
import {RestService} from './rest/rest.service';
import {WordService} from "./rest_services/word.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule // Rest service
    ],
    providers: [ // DI
        // core
        ApplicationContext,
        // format
        // rest
        RestService,
        // rest_services
        WordService,
        // session
        ApplicationEnvironment
    ]
})

/**
 * Contains functionality related to user session management.
 *
 * Requires LoggingModule and ConfigModule to be loaded.
 */
export class Cov2WordsClientJSModule {

    // We ensure the Navigation service is instantiated for sure
    // We ensure this module is only loaded once to avoid singletons being loaded multiple times
    constructor(@Optional() @SkipSelf() parentModule: Cov2WordsClientJSModule) {
        if (parentModule) {
            throw new Error(
                'Cov2WordsClientJSModule is already loaded. Import it in the AppModule only');
        }
    }

}
