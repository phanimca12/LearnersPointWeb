const http = require('http');
const https = require('https');
const concurrently = require('concurrently');
const commandLineArgs = require('command-line-args');
const isPortReachable = require('is-port-reachable');
const open = require('open');
const util = require('util');
const HttpsProxyAgent = require('https-proxy-agent');

const PROJECT_SETTING = 'angular.json';
const AWD_PROXY_FILE = 'awd-proxy.json';
const OPTIONS_DEF = [
  {
    name: 'port',
    alias: 'p',
    type: Number,
    defaultValue: 4200,
  },
  {
    name: 'url',
    alias: 'u',
    type: String,
    defaultValue: '',
  },
];
const checkAWDConnectivity = util.promisify(checkAWDConnectivityCallback);

let awdProxy, proxyAgent, projectName;
let AWS, EC2, awdParam;

try {
  awdProxy = require(`./${AWD_PROXY_FILE}`);
  projectName = require(`./${PROJECT_SETTING}`).defaultProject;
} catch (err) {
  console.error(`ERROR - Unable to load ${err.message.match(/'(.*?)'/g)}`);
  process.exit(0);
}

if (awdProxy.dstProxyUrl) {
  proxyAgent = new HttpsProxyAgent(awdProxy['dstProxyUrl']);
}

if (awdProxy.awsInstanceId) {
  if (!awdProxy.accessKeyId || !awdProxy.secretAccessKey || !awdProxy.region) {
    console.error(`ERROR - AWS credentials not provided in ${AWD_PROXY_FILE}`);
    process.exit(0);
  }

  try {
    AWS = require('aws-sdk');
    AWS.config.loadFromPath(AWD_PROXY_FILE);
    AWS.config.update({
      httpOptions: {
        agent: proxyAgent,
      },
    });
    EC2 = new AWS.EC2();
    awdParam = {
      InstanceIds: [awdProxy.awsInstanceId],
    };
    populateAwdProxyHost(serveApp, true);
  } catch (err) {
    console.error(
      ['ERROR - AWS SDK could not initialize properly', err.message].join('\n')
    );
    process.exit(0);
  }
} else {
  checkAWDConnectivity(awdProxy)
    .then(() => {
      console.log('√ Successfully verified AWD environment and user\n');
      serveApp();
    })
    .catch((error) => {
      console.error(`ERROR - Unable to verify AWD environment (${error})`);
      process.exit(0);
    });
}

function checkAWDConnectivityCallback(awdProxy, cb) {
  let urlPrefix;
  const protocolSupplied = awdProxy.host.startsWith('http');
  const httpsUsed = awdProxy.host.startsWith('https');
  const httpClient = httpsUsed ? https : http;

  if (protocolSupplied) {
    urlPrefix = awdProxy.host;
  } else {
    urlPrefix = `http://${awdProxy.host}`;
  }
  let url = `${urlPrefix}/awdServer/awd/services/v1/user/signon`;
  let auth = Buffer.from(awdProxy.username + ':' + awdProxy.password).toString(
    'base64'
  );
  let options = {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + auth,
    },
  };

  if (awdProxy['dstProxyUrl']) {
    options.agent = proxyAgent;
  }

  console.log(
    [
      `Verifying AWD environment and user ...\n`,
      `HOST: ${awdProxy.host}`,
      `USERNAME: ${awdProxy.username}`,
      `PASSWORD: ${awdProxy.password}`,
      `DST-PROXY-URL: ${
        awdProxy.dstProxyUrl ? awdProxy.dstProxyUrl : '<not-specified>'
      }`,
    ].join('\n') + '\n'
  );

  const req = httpClient.request(url, options, (res) => {
    if (res.statusCode !== 200) {
      cb(
        `Connection established, but unable to authenticate user credentials - ${res.statusCode}:${res.body}`,
        null
      );
    } else {
      cb(null, '');
    }
  });

  req.on('error', (err) => {
    cb(`Unable to connect to specified host - ${err.message}`, null);
  });

  req.write('');
  req.end();
}

function serveApp() {
  let options;
  try {
    options = commandLineArgs(OPTIONS_DEF);
  } catch (err) {
    console.error(`ERROR - Unknown option provided to script (${err.message})`);
  }

  openDevUrl(options.port, options.url);
  concurrently([
    `ng serve ${projectName} --proxy-config proxy.conf.js --port ${options.port}`,
  ]);
}

function openDevUrl(port, url) {
  const MAX_TRIES = 60;
  let count = 0;
  let openedBrowser = false;

  const timerHandle = setInterval(() => {
    count++;
    isPortReachable(port).then((isReachable) => {
      if (isReachable && !openedBrowser) {
        console.log('-> localhost ready, opening browser to dev url');
        clearInterval(timerHandle);
        open(`http://localhost:${port}/${url}`);
        openedBrowser = true;
      }
    });
    if (count > MAX_TRIES) {
      console.error('ERROR - Timed out waiting for localhost to be ready');
      clearInterval(timerHandle);
    }
  }, 5 * 1000);
}

function getPublicIpFromAwsInstance() {
  let publicIp;
  let instanceState;

  return new Promise((resolve, reject) => {
    try {
      EC2.describeInstances(awdParam, (err, data) => {
        if (err) {
          if (err.toString().indexOf('Invalid id') !== -1) {
            console.error(
              `ERROR - Invalid AWS Instance ID: ${awdProxy.awsInstanceId} supplied`
            );
          } else {
            console.error(
              [
                `ERROR - Could not run AWS SDK`,
                `Please configure awd-proxy.json properly or remove awsInstanceId from awd-proxy.json to proceed`,
              ].join('\n')
            );
          }
          process.exit(0);
        }
        // Let other functions to handle errors if public ip address is not available
        publicIp = data.Reservations[0].Instances[0].PublicIpAddress;
        instanceState = data.Reservations[0].Instances[0].State.Name;

        if (!instanceState || !instanceState.includes('running')) {
          reject(
            new Error(
              `ERROR - AWS Instance: ${awdProxy.awsInstanceId} is not running\n`
            )
          );
          return;
        }
        if (!publicIp) {
          reject(
            new Error(
              `ERROR - Could not retrieve Public IP Address of AWS Instance: ${awdProxy.awsInstanceId}\n`
            )
          );
          return;
        }
        if (publicIp !== awdProxy.host) {
          console.log(
            `Successfully fetched Public IP Address of AWS Instance ${awdProxy.awsInstanceId}: ${publicIp}`
          );
        }
        resolve(publicIp);
      });
    } catch (err) {
      console.err(err.message);
      process.exit(0);
    }
  });
}

async function populateAwdProxyHost(
  callback = null,
  shouldStartAwsInstance = false
) {
  let publicIp;
  try {
    // If publicIp was fetched successfully, move on to perform ng serve
    publicIp = await getPublicIpFromAwsInstance();
    if (publicIp !== awdProxy.host) {
      awdProxy.host = publicIp;
      // Save modified awd-projxy.json for proxy.conf.js to process
      try {
        await saveAwdProxyJson();
      } catch (err) {
        console.error(err.message);
        process.exit(0);
      }
    }
  } catch (err) {
    console.error(err.message);
    if (shouldStartAwsInstance) {
      try {
        await startAwsInstanceAndWait();
      } catch (err) {
        console.error(err.message);
        process.exit(0);
      }
    }
  } finally {
    if (typeof callback === 'function') {
      callback();
    }
    return Promise.resolve();
  }
}

function saveAwdProxyJson() {
  const fs = require('fs');
  const path = require('path');
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, AWD_PROXY_FILE),
      JSON.stringify(awdProxy, null, 4),
      null,
      (err) => {
        if (err) {
          reject(new Error(`ERROR - Could not write to ${AWD_PROXY_FILE}`));
          return;
        }
        console.log(
          `Successfully saved host attribute: ${awdProxy.host} to awd-proxy.json\n`
        );
        resolve();
        return;
      }
    );
  });
}

function startAwsInstanceAndWait() {
  let spawnSync;
  try {
    spawnSync = require('child_process').spawnSync;
  } catch (err) {
    console.error(`ERROR - Unable to load ${err.message.match(/'(.*?)'/g)}`);
  }
  let count = 0;
  const MAX_TRIES = 10;
  const secondsWaited = 30;
  const sleep = (ms) =>
    spawnSync(process.argv[0], ['-e', 'setTimeout(function(){},' + ms + ')']);

  return new Promise(async (resolve, reject) => {
    console.log(
      `Attempting to start AWS Instance: ${awdProxy.awsInstanceId}\n`
    );
    try {
      EC2.startInstances(awdParam, async (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(`AWS Instance: ${awdProxy.awsInstanceId} started\n`);
        console.log(
          `Waiting ${secondsWaited} seconds each time before checking the status of AWS Instance\n`
        );

        while (count < MAX_TRIES) {
          count++;
          sleep(secondsWaited * 1000);
          await populateAwdProxyHost(null, false);
          console.log(`${count}) Waiting for checkAWDConnectivity to pass\n`);
          try {
            await checkAWDConnectivity(awdProxy);
            console.log('√ Successfully verified AWD environment and user\n');
            return resolve();
          } catch (err) {
            console.error(
              `ERROR - Unable to verify AWD environment (${err})\n`
            );
          }
        }
        return reject(
          new Error('ERROR - Timed out waiting for AWS Instance to be ready\n')
        );
      });
    } catch (err) {
      console.error(err.message);
      process.exit(0);
    }
  });
}
