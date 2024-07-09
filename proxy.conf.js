const HttpsProxyAgent = require('https-proxy-agent');
const AWD_PROXY_FILE = 'awd-proxy.json';

let awdProxy;
let host;

let username;
let password;

try {
  awdProxy = require(`./${AWD_PROXY_FILE}`);
  host = awdProxy.host;
  //username = awdProxy.username;
 // password = awdProxy.password;
} catch {
  console.error(`ERROR - unable to load ${AWD_PROXY_FILE} (${err})`);
  process.exit(0);
}

const protocolSupplied = awdProxy.host.startsWith('http');
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const proxyConfigDetail = {
  target: protocolSupplied ? host : `http://${host}`,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  headers: {
    //Authorization: `Basic ${auth}`
  },
  bypass: function (req) {
    // removing cookies, because of issue with JSESSIONID validation
    req.headers['cookie'] = '';
  },
  onProxyRes: function (pr, req, res) {
    delete pr.headers['www-authenticate'];
    delete pr.headers['WWW-Authenticate'];
  }
};

const proxyConfigDetail2 = {
  target: protocolSupplied ? host : `http://${host}/awd`,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  headers: {
    Authorization: `Basic ${auth}`
  },
  bypass: function (req) {
    // removing cookies, because of issue with JSESSIONID validation
    req.headers['cookie'] = '';
  }
};

const proxyConfigDetail3 = {
  target: protocolSupplied ? host : `http://${host}`,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  headers: {
   // Authorization: `Basic ${auth}`
  }
};

const proxyConfigDetail4 = {
  target: protocolSupplied ? host : `http://${host}`,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  headers: {
    Origin: protocolSupplied ? host : `http://${host}`
  }
};

const PROXY_CONFIG = {
  '/learnerspoint/*': proxyConfigDetail3,
  '/v1/*': proxyConfigDetail,
};

if (awdProxy['dstProxyUrl']) {
  PROXY_CONFIG['/awdServer/*'].agent = new HttpsProxyAgent(awdProxy['dstProxyUrl']);
}

module.exports = PROXY_CONFIG;
