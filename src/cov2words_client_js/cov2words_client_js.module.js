var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecaptchaComponent } from './components/recaptcha.component';
import { ConfigurationFactory } from './core/configuration_factory.service';
import { DomainService } from './core/domain.service';
import { SessionService } from './core/session.service';
import { RestService } from './rest/rest.service';
import { AccountService } from './rest_services/account.service';
import { AccountBillingService } from './rest_services/account_billing.service';
import { ContactService } from './rest_services/contact.service';
import { LoginService } from './session/login.service';
import { UserSession } from './session/user_session.service';
var Cov2WordsClientJSModule = /** @class */ (function () {
    /**
     * Contains functionality related to user session management.
     */
    function Cov2WordsClientJSModule() {
    }
    Cov2WordsClientJSModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule // Rest service
            ],
            declarations: [
                RecaptchaComponent
            ],
            providers: [
                // core
                DomainService,
                SessionService,
                // rest
                RestService,
                // rest_services
                AccountService,
                AccountBillingService,
                ContactService,
                // session
                LoginService,
                UserSession,
                ConfigurationFactory
            ],
            exports: [
                RecaptchaComponent
            ]
        })
        /**
         * Contains functionality related to user session management.
         */
    ], Cov2WordsClientJSModule);
    return Cov2WordsClientJSModule;
}());
export { Cov2WordsClientJSModule };
//# sourceMappingURL=cov2words_client_js.module.js.map