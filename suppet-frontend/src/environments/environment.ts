// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import auth_config from '../../auth_config.json';

const apiHostUrl: string =  'http://192.168.56.120:8080';

export const environment = {
  production: false,
  apiHostUrl,
  auth: {
    domain: auth_config.domain,
    clientId: auth_config.clientId,
    redirectUri: window.location.origin,
    audience: 'https://suppet.eu.auth0.com/api/v2/',
    httpInterceptor: {
      allowedList: [apiHostUrl + '/*']
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
