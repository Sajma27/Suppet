import auth_config from '../../auth_config.json';

const apiHostUrl: string =  'http://192.168.56.120:8080';

export const environment = {
  production: true,
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
