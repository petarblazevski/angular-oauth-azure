import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private oauthService: OAuthService) {

    // this.oauthService.loginUrl = 'https://login.windows.net/polarcape.onmicrosoft.com';
    this.oauthService.redirectUri = 'http://localhost:4200';

    this.oauthService.clientId = '89ab4e53-114c-4b21-8e98-5e6570ef3f33';

    this.oauthService.scope = 'openid profile email';

    this.oauthService.setStorage(sessionStorage);

    this.oauthService.oidc = true;

    this.oauthService.issuer = 'https://sts.windows.net/878f7122-0639-4e80-8ef3-51bc6f725d45/';
    this.oauthService.resource = '00000002-0000-0000-c000-000000000000';

    // this.oauthService.tokenEndpoint = 'https://login.windows.net/5c9b264f-33ad-4093-bb65-8d14aaec9f63/oauth2/token';

    this.oauthService.strictDiscoveryDocumentValidation = false;

    // this.oauthService.initImplicitFlow();
    // this.oauthService.responseType = 'code id_token';

    this.oauthService.loadDiscoveryDocument().then((d) => {
        console.log('discovery ok', this.oauthService);
        this.oauthService.tryLogin({
            onTokenReceived: context => {
                //
                // Output just for purpose of demonstration
                // Don't try this at home ... ;-)
                //
                console.log("logged in");
                console.log(context);
            }

        });
    });

  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public info() {
    console.log(this.oauthService.getIdentityClaims());
  }
}
