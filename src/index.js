'use strict';
function init(component) {
  return component && typeof component === "object" && "default" in component ? component['default'] : component;
}

var axiosComponent = init(require("axios"));

var fakerComponent = init(require("faker"));

class birdLiteClass {
  constructor() {
    this.request = axiosComponent.create(
      {
        'baseURL': "https://api-bird.prod.birdapp.com",
        'headers': {
          'Device-id': fakerComponent["random"]['uuid'](),
          'platform': "ios", 'App-Name': "bird", 'App-Version': "4.70.0", 'App-Type': "rider"
        }
      });
    this.authRequest = axiosComponent.create(
      {
        'baseURL': "https://api-auth.prod.birdapp.com/api/v1",
        'headers': {
          'Device-id': fakerComponent["random"]["uuid"](), 'platform': "ios", 'App-Name': "bird", 'App-Version': "4.70.0", 'App-Type': "rider"
        }
      });
    this.accessToken = null;
    this.request.interceptors.request.use(tmp => {
      Object.assign(tmp['headers'], { 'Authorization': "Bearer " + this['accessToken'] });
      return tmp;
    }, tmp2 => Promise.resolve(tmp2));
  }

  setAccessToken(param) {
    this.accessToken = param;
  }

  async login(tmpEmail = fakerComponent["internet"]['email']()) {
    try {
      let axiosResponse = await this.authRequest({
        'method': 'POST',
        'url': '/auth/email',
        'data': { 'email': tmpEmail },
        'responseType': 'json'
      });
      const { validation_required } = axiosResponse.data;

      if (!validation_required) {
        const { tokens } = axiosResponse.data;
        this.setAccessToken(tokens["access"]);
      }

      console.log(axiosResponse.data);

      return axiosResponse.data;
    } catch (error) {
      console.log('error with login', error);
      return error;
    }
  }

  async verifyEmail(token) {
    try {
      let axiosVerificationResponse = await this.authRequest(
        {
          'method': "POST",
          'url': "/auth/magic-link/use",
          'data':
            { 'token': token },
          'responseType': "json"
        });
      this['setAccessToken'](axiosVerificationResponse.data['access']);
      return axiosVerificationResponse.data;
    } catch (error) {
      console.log('error\x20with\x20verifyEmail', error);
      return error;
    }
  }

  async getScootersNearby(lat, lon, radius = 500) {
    try {
      let axiosResponse = await this["request"]({ 'method': 'GET', 'url': "/bird/nearby", 'params': { 'latitude': lat, 'longitude': lon, 'radius': radius }, 'headers': { 'Location': JSON.stringify({ 'latitude': lat, 'longitude': lon, 'altitude': 500, 'accuracy': 100, 'speed': -1, 'heading': -1 }) }, 'responseType': 'json' });
      return axiosResponse.data["birds"];

    } catch (error) {
      console.log("error with getScootersNearby", error);
      return _0x1ac9d9;
    }
  }

  async getConfigByLocation({ latitude, longitude }) {
    try {
      let req = await this["request"]({ 'method': 'GET', 'url': '/config/location', 'params': { 'latitude': latitude, 'longitude': longitude }, 'responseType': "json" });
      return req.data;
    } catch (error) {
      console.log("config error", error);
      return error;
    }
  }

} module["exports"] = birdLiteClass;
