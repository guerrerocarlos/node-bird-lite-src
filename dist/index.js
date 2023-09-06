var criptedpieces = ['aW9z', 'YmlyZA==', 'NC43MC4w', 'cmlkZXI=', 'YXV0aFJlcXVlc3Q=', 'aHR0cHM6Ly9hcGktYXV0aC5wcm9kLmJpcmRhcHAuY29tL2FwaS92MQ==', 'dXVpZA==', 'YWNjZXNzVG9rZW4=', 'cmVxdWVzdA==', 'aW50ZXJjZXB0b3Jz', 'dXNl', 'YXNzaWdu', 'QmVhcmVyIA==', 'cmVqZWN0', 'c2V0QWNjZXNzVG9rZW4=', 'bG9naW4=', 'aW50ZXJuZXQ=', 'L2F1dGgvZW1haWw=', 'ZGF0YQ==', 'YWNjZXNz', 'bG9n', 'dmVyaWZ5RW1haWw=', 'UE9TVA==', 'L2F1dGgvbWFnaWMtbGluay91c2U=', 'anNvbg==', 'Z2V0U2Nvb3RlcnNOZWFyYnk=', 'L2JpcmQvbmVhcmJ5', 'c3RyaW5naWZ5', 'YmlyZHM=', 'ZXJyb3Igd2l0aCBnZXRTY29vdGVyc05lYXJieQ==', 'ZXJyb3Igd2l0aCBnZXRDb25maWdCeUxvY2F0aW9u', 'ZXhwb3J0cw==', 'b2JqZWN0', 'ZGVmYXVsdA==', 'YXhpb3M=', 'ZmFrZXI=', 'Y3JlYXRl', 'aHR0cHM6Ly9hcGktYmlyZC5wcm9kLmJpcmRhcHAuY29t', 'cmFuZG9t'];

(function (piece, deckey) {
  var decoder = function (param) {
    console.log("==", param)
    while (--param) {
      let t = piece.shift()
      console.log(">", t)
      piece.push(t);
    }
  };
  decoder(++deckey);
  console.log(piece)
}(criptedpieces, 0x1cd));

// console.log("♥️", criptedpieces)

var tools = function (paramA) {
  var hexparamA = paramA
  paramA = paramA - 0x0;
  var criptoPiece = criptedpieces[paramA];
  if (tools.configured === undefined) {
    tools.decripter = function (param) {
      var binary = atob(param);
      var result = [];
      var binaryLength = binary.length
      for (var i = 0x0; i < binaryLength; i++) {
        result += '%' + ('00' + binary['charCodeAt'](i)['toString'](0x10))['slice'](-0x2);
      }
      let decodedResult = decodeURIComponent(result)
      return decodedResult;
    };
    tools['storage'] = {};
    tools['configured'] = true;
  }
  var tempStorage = tools['storage'][paramA];

  if (tempStorage === undefined) {
    criptoPiece = tools['decripter'](criptoPiece);
    tools['storage'][paramA] = criptoPiece;
  } else {
    criptoPiece = tempStorage;
  }
  console.log(hexparamA, criptoPiece.toString())
  return criptoPiece;
};

'use strict';
function init(component) {
  return component && typeof component === "object" && "default" in component ? component['default'] : component;
}

var axiosComponent = init(require("axios"));

var fakerComponent = init(require("faker"));

class birdLiteClass {
  constructor() {
    this['request'] = axiosComponent["create"](
      {
        'baseURL': "https://api-bird.prod.birdapp.com",
        'headers': {
          'Device-id': fakerComponent["random"]['uuid'](),
          'platform': "ios", 'App-Name': "bird", 'App-Version': "4.70.0", 'App-Type': "rider"
        }
      });
    this["authRequest"] = axiosComponent["create"](
      {
        'baseURL': "https://api-auth.prod.birdapp.com/api/v1",
        'headers': {
          'Device-id': fakerComponent["random"]["uuid"](), 'platform': "ios", 'App-Name': "bird", 'App-Version': "4.70.0", 'App-Type': "rider"
        }
      });
    this["accessToken"] = null;
    this["request"]["interceptors"]["request"]["use"](_0x2dcadc => {
      Object[tools('0x12')](_0x2dcadc['headers'], { 'Authorization': tools('0x13') + this['accessToken'] });
      return _0x2dcadc;
    }, _0x32795c => Promise[tools('0x14')](_0x32795c));
  } ["setAccessToken"](_0x5065ff) {
    this["accessToken"] = _0x5065ff;
  } async["login"](_0x40f756 = fakerComponent[tools('0x17')]['email']()) {
    try {
      let _0x42418b = await this['authRequest']({ 'method': 'POST', 'url': tools('0x18'), 'data': { 'email': _0x40f756 }, 'responseType': 'json' });
      const { validation_required } = _0x42418b[tools('0x19')];
      if (!validation_required) {
        const { tokens } = _0x42418b[tools('0x19')];
        this["setAccessToken"](tokens[tools('0x1a')]);
      } console[tools('0x1b')](_0x42418b['data']);
      return _0x42418b[tools('0x19')];
    } catch (_0x53dbdb) {
      console[tools('0x1b')]('error\x20with\x20login', _0x53dbdb);
      return _0x53dbdb;
    }
  } async["verifyEmail"](_0x246450) {
    try {
      let _0xb6085d = await this["authRequest"]({ 'method': tools('0x1d'), 'url': tools('0x1e'), 'data': { 'token': _0x246450 }, 'responseType': tools('0x1f') });
      this['setAccessToken'](_0xb6085d[tools('0x19')]['access']);
      return _0xb6085d[tools('0x19')];
    } catch (_0x310b72) {
      console['log']('error\x20with\x20verifyEmail', _0x310b72);
      return _0x310b72;
    }
  } async["getScootersNearby"](_0x4e58ec, _0x46e701, _0x2e89ba = 0x1f4) {
    try {
      let _0x2282fa = await this["request"]({ 'method': 'GET', 'url': tools('0x21'), 'params': { 'latitude': _0x4e58ec, 'longitude': _0x46e701, 'radius': _0x2e89ba }, 'headers': { 'Location': JSON[tools('0x22')]({ 'latitude': _0x4e58ec, 'longitude': _0x46e701, 'altitude': 0x1f4, 'accuracy': 0x64, 'speed': -0x1, 'heading': -0x1 }) }, 'responseType': 'json' });
      return _0x2282fa[tools('0x19')][tools('0x23')];
    } catch (_0x1ac9d9) {
      console[tools('0x1b')](tools('0x24'), _0x1ac9d9);
      return _0x1ac9d9;
    }
  } async['getConfigByLocation']({ latitude, longitude }) {
    try {
      let _0x37fd9a = await this["request"]({ 'method': 'GET', 'url': '/config/location', 'params': { 'latitude': latitude, 'longitude': longitude }, 'responseType': tools('0x1f') });
      return _0x37fd9a[tools('0x19')];
    } catch (_0x5c5f1f) {
      console[tools('0x1b')](tools('0x25'), _0x5c5f1f);
      return _0x5c5f1f;
    }
  }
} module["exports"] = birdLiteClass;
// console.log(tools.decripter.toString())
